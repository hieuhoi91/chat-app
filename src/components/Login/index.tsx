import { Row, Col, Button, Typography } from 'antd';

import { signInWithPopup, FacebookAuthProvider } from 'firebase/auth';
import { auth, db } from '../../firebase/config';
import { addDoc, collection } from 'firebase/firestore';

const Login = () => {
  const fbProvider = new FacebookAuthProvider();
  const handleFbLogin = async () => {
    const { user, providerId } = await signInWithPopup(auth, fbProvider);
    addDoc(collection(db, 'users'), {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      providerId: providerId,
    });
  };

  return (
    <div>
      <Row justify="center" style={{ height: 800 }}>
        <Col span={8}>
          <Typography.Title level={3} style={{ textAlign: 'center' }}>
            Chat App
          </Typography.Title>
          <Button style={{ width: '100%', marginBottom: 5 }}>
            Đăng nhập bằng Google
          </Button>
          <Button onClick={handleFbLogin} style={{ width: '100%' }}>
            Đăng nhập bằng Facebook
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
