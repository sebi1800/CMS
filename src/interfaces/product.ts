import ICategory from "./category";

export default interface IProduct {
  name: string;
  description: string;
  quantity: number;
  category: ICategory;
  expiryDate: number;
  _id: string;
}
