export interface UserBasicModel {
  id: string;
  name: string;
  email: string;
}

export interface UserCheckedModel extends UserBasicModel {
  checked: boolean;
}
