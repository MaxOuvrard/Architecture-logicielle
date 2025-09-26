export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;

  create?(data: Partial<IUser>): Promise<IUser>;
  list?(): Promise<IUser[]>;
  get?(id: number): Promise<IUser | null>;
  update?(id: number, data: Partial<IUser>): Promise<IUser | null>;
  remove?(id: number): Promise<boolean>;
}