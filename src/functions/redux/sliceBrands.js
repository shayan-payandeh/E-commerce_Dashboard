/* eslint-disable prettier/prettier */
const { createSlice } = require("@reduxjs/toolkit");

const slice = createSlice({
  name: "brands",
  initialState: [],
  reducers: {
    brandsRequested: (brands, action) => {},
    brandsRequestedFailed: (brands, action) => {},
    brandsReceived: (brands, action) => {},
    brandAdded: (brand, action) => {},
    brandDeleted: (brand, action) => {},
    brandUpdated: (brand, action) => {},
  },
});

export default slice.reducer;
