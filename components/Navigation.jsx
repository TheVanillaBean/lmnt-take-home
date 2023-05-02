import { Disclosure } from '@headlessui/react';
import { Bars3Icon, ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

const navigation = [
  { name: 'Our Story', href: '/', current: false },
  { name: 'Formulation', href: '/', current: false },
  { name: 'Science', href: '/', current: false },
  { name: 'Recipes', href: '/', current: false },
  { name: 'Bundle Builder', href: '/', current: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Navigation() {
  return (
    <Disclosure as='nav' className='bg-black'>
      {({ open }) => (
        <>
          <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
            <div className='relative flex h-full py-4 items-center justify-start'>
              <div className='absolute flex items-center sm:hidden'>
                {/* Mobile menu button*/}
                <Disclosure.Button className='p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none  focus:ring-white'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                  ) : (
                    <Bars3Icon className='h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
              <div className='flex flex-auto items-center justify-center sm:justify-start'>
                <Image
                  className='block h-8 w-auto'
                  src='/images/logo.webp'
                  alt='DrinkLMNT'
                  width={250}
                  height={250}
                />
                <div className='hidden sm:ml-6 sm:block'>
                  <div className='flex space-x-4'>
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-black text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'px-3 py-2 text-base font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}>
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className='absolute right-0 flex items-center pr-2 sm:relative'>
                <button
                  type='button'
                  className='bg-black p-1 text-white hover:text-gray-400 focus:ring-white'>
                  <span className='sr-only'>View shopping cart</span>
                  <ShoppingCartIcon className='h-6 w-6' aria-hidden='true' />
                </button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className='sm:hidden'>
            <div className='space-y-1 px-5 pb-3 '>
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as='Link'
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-black text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'flex py-2 text-base font-base'
                  )}
                  aria-current={item.current ? 'page' : undefined}>
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default Navigation;
