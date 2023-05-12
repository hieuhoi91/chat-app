import { Avatar, Button, Typography } from 'antd';
import styled from 'styled-components';
import { auth, db } from '../../firebase/config';
import { signOut } from 'firebase/auth';
import { useEffect, useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import { IUser } from '../../types';
import { collection, onSnapshot } from 'firebase/firestore';
import { AppContext } from '../Context/AppProvider';

const StyledUserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(82, 38, 83);

  .username {
    color: white;
    margin-left: 5px;
  }
`;

const UserInfo = () => {
  useEffect(() => {
    onSnapshot(collection(db, 'users'), {
      next: snapshot => {
        snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      },
    });
  }, []);

  const user = useContext(AuthContext) as IUser;
  const { displayName, photoURL } = user;
  const { clearState } = useContext<any>(AppContext);

  return (
    <StyledUserInfo>
      <div>
        <Avatar src={photoURL}>
          {photoURL ? '' : displayName?.charAt(0).toUpperCase()}
        </Avatar>
        <Typography.Text className="username">{displayName}</Typography.Text>
      </div>
      <Button
        ghost
        onClick={() => {
          clearState();
          signOut(auth);
        }}
      >
        Đăng xuất
      </Button>
    </StyledUserInfo>
  );
};

export default UserInfo;
