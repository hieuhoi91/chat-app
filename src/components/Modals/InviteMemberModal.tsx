import { useContext, useState, useMemo } from 'react';
import { Avatar, Form, Modal, Select, Spin } from 'antd';
import { AppContext } from '../Context/AppProvider';
import { IInviteMemberVisible, IUser } from '../../types';
import { addDocument } from '../../firebase/services';
import { AuthContext } from '../Context/AuthProvider';
import { debounce } from 'lodash';
import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
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

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: any) => {
      setOptions([]);
      setFetching(true);

      fetchOptions(value, props.curMembers).then((newOptions: any) => {
        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchOptions, props.curMembers]);

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

  const q = query(
    collectionRef,
    where('keywords', 'array-contains', search?.toLowerCase()),
    orderBy('name'),
    limit(20)
  );

  const querySnapshot = await getDocs(q);

  const result = querySnapshot.docs
    .map(doc => ({
      label: doc.data().name,
      value: doc.data().uid,
      photoURL: doc.data().photoURL,
    }))
    .filter(opt => !curMembers.includes(opt.value));

  return result;
};

const InviteMemberModal = () => {
  const { isInviteMemberVisible, setIsInviteMemberVisible, selectedRoom } =
    useContext(AppContext) as IInviteMemberVisible;

  const user = useContext(AuthContext) as IUser;
  const { uid } = user;

  const [value, setValue] = useState([]);
  const [form] = Form.useForm();

  const handleOK = () => {
    addDocument('rooms', { ...form.getFieldsValue(), members: [uid] });
    form.resetFields();
    //update members in current room

    const roomRef = doc(db, 'rooms', selectedRoom.id);

    updateDoc(roomRef, {
      members: [...selectedRoom.members, ...value.map((val: any) => val.value)],
    });

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
            curMembers={selectedRoom.members}
          />
        </Form>
      </Modal>
    </div>
  );
};

export default InviteMemberModal;
