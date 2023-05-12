import { useEffect, createContext, useState, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { Spin } from 'antd';

export const AuthContext = createContext({});

interface PropsAuthProvider {
  children: JSX.Element | JSX.Element[];
}

const AuthProvider: FC<PropsAuthProvider> = props => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscibed = onAuthStateChanged(auth, user => {
      if (user) {
        const { displayName, email, uid, photoURL } = user;
        setUser({ displayName, email, uid, photoURL });
        setIsLoading(false);
        navigate('/');
      } else {
        setIsLoading(false);
        navigate('/login');
      }
    });

    return () => {
      unsubscibed();
    };
  }, [navigate]);
  return (
    <AuthContext.Provider value={user}>
      {isLoading ? <Spin /> : props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
