import { useState } from 'react';

export default function useCounter(initial = 0, maximum = 4) {
  const [count, setCount] = useState(initial);

  function increment() {
    if (count === maximum) return;
    setCount(count + 1);
  }

  function decrement() {
    if (count === 0) return;

    setCount(count - 1);
  }

  return [count, increment, decrement];
}
