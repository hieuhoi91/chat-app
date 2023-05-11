import React from 'react';
import { Form, Input, Modal } from 'antd';

const AddRoomModal = () => {
  return (
    <div>
      <Modal title="Tạo phòng" onOk={handleOK} onCancel={handleCancel}>
        <Form>
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
