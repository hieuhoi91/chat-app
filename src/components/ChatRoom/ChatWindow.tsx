import { Alert, Avatar, Button, Form, Input, Tooltip } from 'antd';
import { useContext, useState, ChangeEvent, useMemo } from 'react';
import styled from 'styled-components';
import { UserAddOutlined } from '@ant-design/icons';
import Message from './Message';
import { AppContext } from '../Context/AppProvider';
import { addDocument } from '../../firebase/services';
import { AuthContext } from '../Context/AuthProvider';
import useFirestore from '../../hook/useFirestore';

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  box-sizing: border-box;
  padding: 0 16px;
  align-items: center;
  border-bottom: 1px solid rgb(230, 230, 230);

  .header {
    &__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &__title {
      margin: 0;
      font-weight: bold;
    }

    &__description {
      font-size: 12px;
    }
  }
`;

const ButtonGroupStyled = styled.div`
  display: flex;
  align-items: center;
`;

const WrapperStyled = styled.div`
  height: 100vh;
`;

const ContentStyled = styled.div`
  height: calc(97% - 56px);
  display: flex;
  flex-direction: column;
  padding: 11px;
  justify-content: flex-end;
`;

const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 2px;

  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`;

const MessagelistStyled = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;

const ChatWindow = () => {
  const { selectedRoom, members, setIsInviteMemberVisible } =
    useContext<any>(AppContext);

  const user = useContext<any>(AuthContext);
  const { uid, photoURL, displayName } = user;

  const [inputValue, setInputValue] = useState('');
  const [form] = Form.useForm();
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleOnSubmit = () => {
    addDocument('messages', {
      text: inputValue,
      uid,
      photoURL,
      displayName,
      createAt: new Date(),
      room: selectedRoom.id,
    });
    form.resetFields(['message']);
  };

  const condition = useMemo(
    () => ({
      fieldName: 'room',
      operator: '==',
      compareValue: selectedRoom.id,
    }),
    [selectedRoom.id]
  );

  const message = useFirestore('messages', condition);

  console.log(message);

  return (
    <WrapperStyled>
      {selectedRoom.id ? (
        <>
          <HeaderStyled>
            <div className="header__info">
              <p className="header__title">{selectedRoom.name}</p>
              <span className="header__description">
                {selectedRoom.description}
              </span>
            </div>
            <ButtonGroupStyled>
              <Button
                icon={<UserAddOutlined />}
                type="text"
                onClick={() => setIsInviteMemberVisible(true)}
              >
                Mời
              </Button>
              <Avatar.Group size="small" maxCount={2}>
                {members.map((member: any) => (
                  <Tooltip key={member.uid} title={member.displayName}>
                    <Avatar src={member.photoURL}>
                      {member.photoURL
                        ? ''
                        : member.name.charAt(0).toUpperCase()}
                    </Avatar>
                  </Tooltip>
                ))}
              </Avatar.Group>
            </ButtonGroupStyled>
          </HeaderStyled>
          <ContentStyled>
            <MessagelistStyled>
              {message.map((mes: any) => (
                <Message
                  key={mes.id}
                  text={mes.text}
                  photoURL={mes.photoURL}
                  displayName={mes.displayName}
                  createAt={mes.createdAt}
                />
              ))}
            </MessagelistStyled>
            <FormStyled form={form}>
              <Form.Item name="message">
                <Input
                  onChange={handleInputChange}
                  onPressEnter={handleOnSubmit}
                  placeholder="Nhập tin nhắn ..."
                  bordered={false}
                  autoComplete="off"
                  value={inputValue}
                ></Input>
              </Form.Item>
              <Button type="primary" onClick={handleOnSubmit}>
                Gửi
              </Button>
            </FormStyled>
          </ContentStyled>
        </>
      ) : (
        <Alert
          message="Hãy chọn phòng"
          type="info"
          showIcon
          style={{ margin: 5 }}
          closable
        />
      )}
    </WrapperStyled>
  );
};

export default ChatWindow;
