import { CartContext } from 'context/CartContext';
import Image from 'next/image';
import { useContext } from 'react';
import Stepper from './Stepper';

function FlavorItem({ flavor }) {
  const { cart, totalItems } = useContext(CartContext);

  const disabled = totalItems === 4 && !cart.cartItems[flavor.sku] > 0;

  return (
    <div className='group relative'>
      <div className='aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100'>
        <Image
          src={flavor.image.originalSrc}
          alt={flavor.title}
          className='object-cover object-center'
          width={350}
          height={350}
        />
      </div>
      <div
        className={`mt-5 flex items-center justify-between space-x-8 text-base font-bold px-3 text-gray-900 ${
          disabled && 'opacity-40'
        }`}>
        <h3>{flavor.title}</h3>
        <div className='flex items-center space-x-2'>
          <p className='text-base font-medium line-through'>${flavor.price}</p>
          <p className='text-base font-bold'>${flavor.price * 0.75}</p>
        </div>
      </div>
      <Stepper flavorSku={flavor.sku} disabled={disabled} />
    </div>
  );
}

export default FlavorItem;
