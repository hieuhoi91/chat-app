import { Avatar, Typography } from 'antd';
import { formatRelative } from 'date-fns';
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
  createAt: any;
  photoURL: string | null;
}

const Message: FC<PropsMessage> = props => {
  const formatDate = (seconds: number) => {
    let formattedDate = '';
    if (seconds) {
      formattedDate = formatRelative(new Date(seconds * 1000), new Date());
      formattedDate =
        formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }
    return formattedDate;
  };

  return (
    <WrapperStyled>
      <div>
        <Avatar size="small" src={props.photoURL}>
          {props.photoURL ? '' : props.displayName?.charAt(0)?.toUpperCase()}
        </Avatar>
        <Typography.Text className="author">
          {props.displayName}
        </Typography.Text>
        <Typography.Text className="date">
          {formatDate(props.createAt.seconds)}
        </Typography.Text>
      </div>
      <div>
        <Typography.Text className="content">{props.text}</Typography.Text>
      </div>
    </WrapperStyled>
  );
};

export default Message;
