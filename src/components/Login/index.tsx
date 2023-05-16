import { Row, Col, Button, Typography } from 'antd';

import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { addDocument, generateKeywords } from '../../firebase/services';

const Login = () => {
  const googleProvider = new GoogleAuthProvider();

  const handleGoogleLogin = async () => {
    const { user, providerId } = await signInWithPopup(auth, googleProvider);

    addDocument('users', {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      providerId: providerId,
      photoURL: user.photoURL,
      keywords: generateKeywords(user.displayName?.toLowerCase()),
    });
  };

  return (
    <div>
      <Row justify="center" style={{ height: 800 }}>
        <Col span={8}>
          <Typography.Title level={3} style={{ textAlign: 'center' }}>
            Chat App
          </Typography.Title>
          <Button
            onClick={handleGoogleLogin}
            style={{ width: '100%', marginBottom: 5 }}
          >
            Đăng nhập bằng Google
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
