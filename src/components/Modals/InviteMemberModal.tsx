import { useContext, useState, useMemo } from 'react';
import { Avatar, Form, Modal, Select, Spin } from 'antd';
import { AppContext } from '../Context/AppProvider';
import { IInviteMemberVisible, IUser } from '../../types';
import { addDocument } from '../../firebase/services';
import { AuthContext } from '../Context/AuthProvider';
import {
  collection,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../../firebase/config';

const DebounceSelect = ({
  fetchOptions,
  debounceTimeout = 300,
  ...props
}: any) => {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
  console.log(options);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: any) => {
      setOptions([]);
      setFetching(true);

      fetchOptions(value, props.curMembers).then((newOptions: any) => {
        setOptions(newOptions);
        setFetching(false);
      });
    };

    const debounceTimer = setTimeout(() => {
      loadOptions(props.value);
    }, debounceTimeout);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [debounceTimeout, fetchOptions, props.curMembers, props.value]);

  return (
    <Select
      filterOption={false}
      labelInValue
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
    >
      {options.map((opt: any) => (
        <Select.Option key={opt.value} value={opt.value} title={opt.label}>
          <Avatar src={opt.photoURL}>
            {opt.photoURL ? '' : opt.label?.charAt(0)?.toUpperCase()}
          </Avatar>
          {`${opt.label}`}
        </Select.Option>
      ))}
    </Select>
  );
};

const fetchUserList = async (search: string, curMembers: string) => {
  let collectionRef = collection(db, 'users');
  const user = query(
    collectionRef,
    where('keywords', 'array-contains', search),
    orderBy('displayName'),
    limit(20)
  );

  const querySnapshot = await getDocs(user);

  console.log(querySnapshot.docs);

  const result = querySnapshot.docs
    .map((doc: any) => ({
      label: doc.data().displayName,
      value: doc.data().uid,
      photoURL: doc.data().photoURL,
    }))
    .filter((opt: any) => !curMembers.includes(opt.value));

  console.log(result);

  return result;
};

const InviteMemberModal = () => {
  const { isInviteMemberVisible, setIsInviteMemberVisible } = useContext(
    AppContext
  ) as IInviteMemberVisible;

  const user = useContext(AuthContext) as IUser;
  const { uid } = user;

  const [value, setValue] = useState([]);
  const [form] = Form.useForm();

  const handleOK = () => {
    addDocument('rooms', { ...form.getFieldsValue(), members: [uid] });
    form.resetFields();
    setIsInviteMemberVisible(false);
  };

  const handleCancel = () => {
    setIsInviteMemberVisible(false);
  };

  return (
    <div>
      <Modal
        title="Mời thêm thành viên"
        open={isInviteMemberVisible}
        onOk={handleOK}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <DebounceSelect
            mode="multiple"
            label="Tên các thành viên"
            value={value}
            placeholder="Nhập tên thành viên"
            fetchOptions={fetchUserList}
            onChange={(newValue: any) => setValue(newValue)}
            style={{ width: '100%' }}
          />
        </Form>
      </Modal>
    </div>
  );
};

export default InviteMemberModal;
