export interface IUser {
  displayName: string;
  photoURL: string;
  uid: string;
}

export interface IRoom {
  id: string;
  members: IUser[];
}

export interface IDocument {
  id: string;
}

export interface IAddRoomVisible {
  isAddRoomVisible: boolean;
  setIsAddRoomVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IInviteMemberVisible {
  selectedRoom: IRoom;
  isInviteMemberVisible: boolean;
  setIsInviteMemberVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
