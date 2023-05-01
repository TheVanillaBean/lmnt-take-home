import { CART_ACTIONS, CartContext } from 'components/context/CartContext';
import { useContext, useState } from 'react';

export default function useCounter(id, initial = 0, maximum = 4) {
  const [count, setCount] = useState(initial);
  const { cart, dispatchCart, totalItems } = useContext(CartContext);

  function increment() {
    if (totalItems() === maximum) return;
    setCount(count + 1);
    dispatchCart({
      type: CART_ACTIONS.ADD_ITEM,
      payload: { id: id },
    });
  }

  function decrement() {
    if (count === 0) return;

    setCount(count - 1);

    dispatchCart({
      type: CART_ACTIONS.REMOVE_ITEM,
      payload: { id: id },
    });
  }

  return [count, increment, decrement];
}
