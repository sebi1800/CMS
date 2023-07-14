import IUser from "./user";
import IProduct from "./product";

export default interface IList {
    user?: IUser;
    quantity: number;
    expiryDate: number;
    product: IProduct;
    _id: string;
  }
  