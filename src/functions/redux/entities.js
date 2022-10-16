/* eslint-disable prettier/prettier */
import { combineReducers } from "redux";
import sliceBrands from "./sliceBrands";
import sliceCategories from "./sliceCategories";
import sliceProducts from "./sliceProducts";

export default combineReducers({
  products: sliceProducts,
  categories: sliceCategories,
  brands: sliceBrands,
});
