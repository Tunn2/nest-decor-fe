import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      console.log("addToCart action dispatched:", action.payload);
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        // Nếu sản phẩm đã tồn tại, tăng số lượng
        existingItem.quantity += newItem.quantity || 1;
        existingItem.totalPrice += newItem.price * (newItem.quantity || 1);
      } else {
        // Nếu sản phẩm chưa tồn tại, thêm mới với dimensions
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          quantity: newItem.quantity || 1,
          totalPrice: newItem.price * (newItem.quantity || 1),
          image: newItem.image,
          // Thêm default dimensions
          defaultDimensions: newItem.defaultDimensions || {
            height: 0,
            width: 0,
            length: 0,
          },
          // Custom dimensions (ban đầu sẽ null, sử dụng default)
          customHeight: newItem.customHeight || null,
          customWidth: newItem.customWidth || null,
          customLength: newItem.customLength || null,
        });
      }

      // Cập nhật tổng số lượng và tổng tiền
      state.totalQuantity += newItem.quantity || 1;
      state.totalAmount += newItem.price * (newItem.quantity || 1);
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.totalPrice;
        state.items = state.items.filter((item) => item.id !== id);
      }
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem && quantity > 0) {
        const quantityDiff = quantity - existingItem.quantity;
        const priceDiff = quantityDiff * existingItem.price;

        existingItem.quantity = quantity;
        existingItem.totalPrice = existingItem.price * quantity;

        state.totalQuantity += quantityDiff;
        state.totalAmount += priceDiff;
      }
    },

    updateCustomDimensions: (state, action) => {
      const { id, dimensions } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        // Cập nhật custom dimensions
        existingItem.customHeight = dimensions.customHeight || null;
        existingItem.customWidth = dimensions.customWidth || null;
        existingItem.customLength = dimensions.customLength || null;

        // Có thể thêm logic tính toán giá dựa trên kích thước tùy chỉnh ở đây
        // Ví dụ: giá có thể thay đổi dựa trên kích thước
        // const dimensionMultiplier = calculateDimensionMultiplier(dimensions);
        // existingItem.totalPrice = existingItem.price * existingItem.quantity * dimensionMultiplier;
        // state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
      }
    },

    resetDimensions: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        // Reset về dimensions mặc định
        existingItem.customHeight = null;
        existingItem.customWidth = null;
        existingItem.customLength = null;
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  updateCustomDimensions,
  resetDimensions,
  clearCart,
} = cartSlice.actions;

export const selectCart = (store) => store.cart;
export const selectCartItems = (store) => store.cart.items;
export const selectCartTotal = (store) => store.cart.totalAmount;
export const selectCartQuantity = (store) => store.cart.totalQuantity;

export default cartSlice.reducer;
