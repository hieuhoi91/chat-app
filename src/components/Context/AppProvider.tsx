import { useContext, createContext, useState, useMemo, FC } from 'react';

import useFirestore from '../../hook/useFirestore';
import { AuthContext } from './AuthProvider';
import { IUser } from '../../types';

export const AppContext = createContext({});

interface PropsAppProvider {
  children: JSX.Element | JSX.Element[];
}

const AppProvider: FC<PropsAppProvider> = props => {
  const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
  const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState('');

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

  const selectedRoom: any = useMemo(
    () => rooms.find(room => room.id === selectedRoomId) || {},
    [rooms, selectedRoomId]
  );

  const usersCondition = useMemo(() => {
    return {
      fieldName: 'uid',
      operator: 'in',
      compareValue: selectedRoom.members,
    };
  }, [selectedRoom.members]);

  const members = useFirestore('users', usersCondition);

  const clearState = () => {
    setSelectedRoomId('');
    setIsAddRoomVisible(false);
    setIsInviteMemberVisible(false);
  };

  return (
    <AppContext.Provider
      value={{
        rooms,
        members,
        selectedRoom,
        isAddRoomVisible,
        setIsAddRoomVisible,
        selectedRoomId,
        setSelectedRoomId,
        isInviteMemberVisible,
        setIsInviteMemberVisible,
        clearState,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
