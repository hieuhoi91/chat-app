import { Avatar, Typography } from 'antd';
import { FC } from 'react';
import styled from 'styled-components';

const WrapperStyled = styled.div`
  margin-bottom: 10px;

  .author {
    margin-left: 5px;
    font-weight: bold;
  }

  .date {
    margin-left: 10px;
    font-size: 11px;
    color: #a7a7a7;
  }

  .content {
    margin-left: 30px;
  }
`;

interface PropsMessage {
  text: string;
  displayName: string;
  craeteAt: number;
  photoURL: string | null;
}

const Message: FC<PropsMessage> = props => {
  return (
    <WrapperStyled>
      <div>
        <Avatar size="small" src={props.photoURL}>
          A
        </Avatar>
        <Typography.Text className="author">
          {props.displayName}
        </Typography.Text>
        <Typography.Text className="date">{props.craeteAt}</Typography.Text>
      </div>
      <div>
        <Typography.Text className="content">{props.text}</Typography.Text>
      </div>
    </WrapperStyled>
  );
};

export default Message;
