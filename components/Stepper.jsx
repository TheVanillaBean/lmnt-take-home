import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import useCounter from 'hooks/useCounter';

function Stepper({ flavorId, disabled }) {
  const [count, incrementCount, decrementCount] = useCounter(flavorId);

  return (
    <div
      className={`mt-5 w-full justify-center gap-10 items-center lg:mt-8 flex ${
        disabled && 'opacity-40'
      }`}>
      <button
        className='text-white bg-[#777] p-4 rounded-lg '
        aria-label='Decrement product count'
        onClick={decrementCount}
        disabled={disabled}>
        <MinusIcon className='h-4 w-5 stroke-[5px]' />
      </button>
      <div className='border border-gray-600 rounded-xl w-fit px-12 py-2'>
        <span className='font-bold text-2xl'>{count}</span>
      </div>
      <button
        className='text-white bg-lime p-4 rounded-lg '
        aria-label='Increment product count'
        onClick={incrementCount}
        disabled={disabled}>
        <PlusIcon className='h-4 w-5 stroke-[5px]' />
      </button>
    </div>
  );
}

export default Stepper;
