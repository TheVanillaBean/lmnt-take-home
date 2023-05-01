import { CART_ACTIONS, CartContext } from 'context/CartContext';
import { useContext, useEffect, useState } from 'react';

export default function useCounter(id, initial = 0, maximum = 4) {
  const [count, setCount] = useState(initial);
  const { cart, dispatchCart, totalItems } = useContext(CartContext);

  useEffect(() => {
    const count = cart.cartItems[id] ?? 0;
    setCount(count);
  }, [cart]);

  function increment() {
    if (totalItems === maximum) return;

    dispatchCart({
      type: CART_ACTIONS.ADD_ITEM,
      payload: { id: id },
    });
  }

  function decrement() {
    if (count === 0) return;

    dispatchCart({
      type: CART_ACTIONS.REMOVE_ITEM,
      payload: { id: id },
    });
  }

  return [count, increment, decrement];
}
