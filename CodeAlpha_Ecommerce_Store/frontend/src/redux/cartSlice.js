import { createSlice } from '@reduxjs/toolkit';

const getInitialCart = () => {
  const persistedCart = localStorage.getItem('cart');
  return persistedCart ? JSON.parse(persistedCart) : [];
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: getInitialCart(),
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.find((cartItem) => cartItem._id === item._id);

      if (existingItem) {
        existingItem.quantity += item.quantity || 1;
      } else {
        state.push({ ...item, quantity: item.quantity || 1 });
      }

      localStorage.setItem('cart', JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      const updatedCart = state.filter((item) => item._id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.find((cartItem) => cartItem._id === id);

      if (item) {
        item.quantity = quantity;
      }

      localStorage.setItem('cart', JSON.stringify(state));
    },
    clearCart: () => {
      localStorage.removeItem('cart');
      return [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
