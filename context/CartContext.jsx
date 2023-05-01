import { createContext, useEffect, useReducer, useState } from 'react';

export const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  PRELOAD_BUNDLED_ITEMS: 'PRELOAD_BUNDLED_ITEMS',
};

export const CartContext = createContext();

const initialState = {
  cartItems: {},
};

const cartReducer = (state = initialState, action) => {
  const payload = action.payload;

  switch (action.type) {
    case CART_ACTIONS.PRELOAD_BUNDLED_ITEMS:
      const preloadedIds = payload;
      const cartItems = state.cartItems;

      let preloadedCartItems = {};

      for (const id of preloadedIds) {
        preloadedCartItems[id] = preloadedCartItems[id] ? preloadedCartItems[id] + 1 : 1;
      }

      return {
        ...state,
        cartItems: { ...state.cartItems, ...preloadedCartItems },
      };

    case CART_ACTIONS.ADD_ITEM:
      const prevCount = state.cartItems[payload.id] ?? 0;
      return {
        ...state,
        cartItems: { ...state.cartItems, [payload.id]: prevCount + 1 },
      };
    case CART_ACTIONS.REMOVE_ITEM:
      const itemCount = state.cartItems[payload.id];
      if (itemCount === 1) {
        const { [payload.id]: value, ...withoutItem } = state.cartItems;
        return {
          ...state,
          cartItems: { ...withoutItem },
        };
      }
      return {
        ...state,
        cartItems: { ...state.cartItems, [payload.id]: itemCount - 1 },
      };
    default: {
      return state;
    }
  }
};

const CartProvider = (props) => {
  const [cart, dispatchCart] = useReducer(cartReducer, initialState);
  const [bundleURL, setBundleURL] = useState('');
  const [totalItems, setTotalItems] = useState('');

  useEffect(() => {
    const totalItems = Object.values(cart.cartItems).reduce((acc, curr) => {
      return acc + curr;
    }, 0);
    setTotalItems(totalItems);
  }, [cart]);

  useEffect(() => {
    const url = Object.keys(cart.cartItems)
      .map((currSku) => {
        if (cart.cartItems[currSku] > 1) {
          return Array(cart.cartItems[currSku]).fill(currSku).join();
        }
        return currSku;
      }, [])
      .join();
    setBundleURL(url);
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatchCart, totalItems, bundleURL }}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
