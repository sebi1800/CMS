import IUser from "./user";
import IProduct from "./product";

export default interface IHistory {
  user?: IUser;
  date: number;
  quantity: number;
  product: IProduct;
  _id: string;
}
