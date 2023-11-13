type PartId = string;
type UID = string

export interface User {
  userId: string;
  username: string;
  password: string;
  token: string;
  inventory: [UID, PartId][]
}
