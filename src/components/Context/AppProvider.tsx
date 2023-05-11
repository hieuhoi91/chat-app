import { useContext, createContext, useState, useMemo, FC } from 'react';

import useFirestore from '../../hook/useFirestore';
import { AuthContext } from './AuthProvider';
import { IUser } from '../../types';

export const AppContext = createContext({});

interface PropsAuthProvider {
  children: React.ReactElement;
}

const AppProvider: FC<PropsAuthProvider> = props => {
  const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);

  const user = useContext(AuthContext) as IUser;
  const { uid } = user;

  const roomsCondition = useMemo(() => {
    return {
      fieldName: 'members',
      operator: 'array-contains',
      compareValue: uid,
    };
  }, [uid]);

  const rooms = useFirestore('rooms', roomsCondition);
  return (
    <AppContext.Provider value={rooms}>{props.children}</AppContext.Provider>
  );
};

export default AppProvider;
