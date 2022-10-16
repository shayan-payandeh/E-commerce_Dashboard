/* eslint-disable prettier/prettier */
// import Cookies from "js-cookie";
// import { apiCallBegan } from "../apiActions";

// const setCookies = (state) => (next) => (action) => {
//   if (action.type !== apiCallBegan.type) return next(action);
//   console.log("action:", action);
//   console.log("action:", state.getState());

//   const { data, url } = action.payload;
//   const stringName = url.substring(1, url.length);
//   Cookies.set(`${stringName}`, JSON.stringify(data));
//   //   next(action);
// };

// export default setCookies;
