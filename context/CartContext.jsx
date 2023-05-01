import { createContext, useReducer } from 'react';

export const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
};

export const CartContext = createContext();

const initialState = {
  cartItems: {},
};

const cartReducer = (state, action) => {
  const payload = action.payload;

  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM:
      const prevCount = state.cartItems[payload.id] ?? 0;
      const returnedValue = {
        ...state,
        cartItems: { ...state.cartItems, [payload.id]: prevCount + 1 },
      };
      return returnedValue;
    case CART_ACTIONS.REMOVE_ITEM:
      const itemCount = state.cartItems[payload.id];
      if (itemCount === 0) {
        delete state.cartItems[payload.id];
      }
      const returned = {
        ...state,
        cartItems: { ...state.cartItems, [payload.id]: itemCount - 1 },
      };
      return returned;
    default: {
      state;
    }
  }
};

const CartProvider = (props) => {
  const [cart, dispatchCart] = useReducer(cartReducer, initialState);

  const totalItems = () => {
    return Object.values(cart.cartItems).reduce((acc, curr) => {
      return acc + curr;
    }, 0);
  };

  return (
    <CartContext.Provider value={{ cart, dispatchCart, totalItems }}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
