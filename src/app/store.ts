import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import userReducer from "../features/user/userSlice";
import listReducer from "../features/list/listSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    listState: listReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
