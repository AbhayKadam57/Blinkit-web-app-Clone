import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    products: JSON.parse(localStorage.getItem("products")) || [],
    quantity: parseInt(localStorage.getItem("quantity")) || 0,
    total: parseInt(localStorage.getItem("total")) || 0,
    selected: JSON.parse(localStorage.getItem("selected")) || [],
    openCart: false,
    openaddressBook: false,
  },
  reducers: {
    AddProducts: (state, action) => {
      const Id = action.payload._id;

      const index = state.products.findIndex((p, id) => p._id === Id);

      if (index === -1) {
        state.products.push({ ...action.payload, quantity: 1 });
        state.quantity += 1;
      } else {
        state.products[index].quantity += 1;
        state.quantity += 1;
      }

      state.total += action.payload.price * 1;
      state.selected.push(action.payload._id);
      localStorage.setItem("products", JSON.stringify(state.products));
      localStorage.setItem("quantity", state.quantity);
      localStorage.setItem("total", state.total);
      localStorage.setItem("selected", JSON.stringify(state.selected));
    },

    UpdateProducts: (state, action) => {
      const type = action.payload.type;

      const Id = action.payload.product._id;

      const index = state.products.findIndex((p, id) => p._id === Id);

      const selectedIndex = state.selected.findIndex((s, id) => s._id === Id);

      console.log(index);

      if (type === "add") {
        state.products[index].quantity += 1;
        state.total += 1 * state.products[index].price;
        state.quantity += 1;
      } else {
        if (state.products[index].quantity > 0) {
          state.products[index].quantity -= 1;
          state.total -= 1 * state.products[index].price;
          state.quantity -= 1;
        } else {
          state.products.splice(index, 1);
          state.selected.splice(selectedIndex, 1);
          // state.quantity = 0;
          // state.total -= 1 * state.products[index].price;
        }
      }

      localStorage.setItem("products", JSON.stringify(state.products));
      localStorage.setItem("quantity", state.quantity);
      localStorage.setItem("total", state.total);
      localStorage.setItem("selected", JSON.stringify(state.selected));
    },

    OpenCart: (state, action) => {
      state.openCart = !state.openCart;
    },
    OpenaddressBook: (state, action) => {
      state.openaddressBook = !state.openaddressBook;
    },
  },
});

export const { AddProducts, UpdateProducts, OpenCart, OpenaddressBook } =
  CartSlice.actions;

export default CartSlice.reducer;
