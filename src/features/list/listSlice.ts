import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IList from "./../../interfaces/list";

export interface IListState {
    listItems: IList[];
  }
  
  const initialState: IListState = {
    listItems: [],
  };
  
  interface IItemQuantity {
    id: string;
    quantity: number;
  }

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    changeProductQuantity: (
        state,
        { payload }: PayloadAction<IItemQuantity>
      ) => {
        state.listItems = state.listItems.map((item) => {
          if (item.product._id === payload.id) {
            return { ...item, quantity: payload.quantity };
          }
          return item;
        });
      },
  },
});

export const { changeProductQuantity } = listSlice.actions;

export default listSlice.reducer;