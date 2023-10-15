import { configureStore, createStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { CartState } from "./Features/Cart/cartSlice";
import { ProductsState } from "./Features/Product/productSlice";

export interface ApplicationState {
  cart: CartState;
  product: ProductsState;
}

export const useAppDispatch = () =>
  useDispatch<ReturnType<typeof configureStore>['dispatch']>();

export const useAppSelector: TypedUseSelectorHook<ApplicationState> =
  useSelector;