import IUser from "./user";

export default interface ICategory {
  user?: IUser;
  name: string;
  id: string;
  _id: string;
}
