import { useContext } from 'react';
import { Form, Input, Modal } from 'antd';
import { AppContext } from '../Context/AppProvider';
import { IAddRoomVisible, IUser } from '../../types';
import { addDocument } from '../../firebase/services';
import { AuthContext } from '../Context/AuthProvider';

const AddRoomModal = () => {
  const { isAddRoomVisible, setIsAddRoomVisible } = useContext(
    AppContext
  ) as IAddRoomVisible;

  const user = useContext(AuthContext) as IUser;
  const { uid } = user;

  const [form] = Form.useForm();

  const handleOK = () => {
    addDocument('rooms', { ...form.getFieldsValue(), members: [uid] });
    form.resetFields();
    setIsAddRoomVisible(false);
  };

  const handleCancel = () => {
    setIsAddRoomVisible(false);
  };

  return (
    <div>
      <Modal
        title="Tạo phòng"
        open={isAddRoomVisible}
        onOk={handleOK}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Tên phòng" name="name">
            <Input placeholder="Nhập tên phòng" />
          </Form.Item>
          <Form.Item label="Mô tả" name="description">
            <Input.TextArea placeholder="Nhập mô tả" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddRoomModal;
