export interface IUser {
  displayName: string;
  photoURL: string;
  uid: string;
}

export interface IDocument {
  id: string;
}

export interface IAddRoomVisible {
  isAddRoomVisible: boolean;
  setIsAddRoomVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IInviteMemberVisible {
  isInviteMemberVisible: boolean;
  setIsInviteMemberVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
