import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

import axios from 'axios';
import useCounter from 'components/hooks/useCounter';
import Image from 'next/image';
import { Fragment, useState } from 'react';

const frequencies = [
  { option: 'Delivered only once', discount: 0 },
  { option: 'Delivered every 1 month', discount: 10 },
  { option: 'Delivered every 2 months', discount: 10 },
  { option: 'Delivered every 3 months', discount: 10 },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Home(props) {
  const { flavorsInBundle, flavors } = props;

  const [selected, setSelected] = useState(frequencies[1]);

  const [count, incrementCount, decrementCount] = useCounter(1, 4);

  return (
    <main>
      <div className='bg-white'>
        <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
          <div className='flex flex-col items-start justify-between space-y-5 mb-12'>
            <h1 className='text-3xl font-bold text-gray-900'>Build Your Own Bundle (Save 25%)</h1>
            <p className='text-base font-bold text-gray-900'>Choose up to 4 flavors</p>
          </div>
          <div className='flex items-center space-x-2 mb-5'>
            <h1 className='text-xl font-medium text-gray-700 line-through'>$180.00</h1>
            <p className='text-3xl font-bold text-gray-700'>$135.00</p>
          </div>
          {/* Dropdown */}
          <Listbox value={selected} onChange={setSelected}>
            {({ open }) => (
              <>
                <Listbox.Label className='block text-base font-bold leading-6 text-gray-90'>
                  Frequency
                </Listbox.Label>
                <div className='relative mt-2'>
                  <Listbox.Button className='relative w-fit cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6'>
                    <span className='inline-flex w-full truncate'>
                      <span className='truncate'>{selected.option}</span>
                      {selected.discount > 0 && (
                        <span className={'ml-2 truncate text-gray-500'}>
                          {selected.discount}% Off
                        </span>
                      )}
                    </span>
                    <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                      <ChevronUpDownIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                    </span>
                  </Listbox.Button>

                  <Transition
                    show={open}
                    as={Fragment}
                    leave='transition ease-in duration-100'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'>
                    <Listbox.Options className='absolute z-10 mt-1 max-h-60 w-fit overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                      {frequencies.map((frequency) => (
                        <Listbox.Option
                          key={frequency.option}
                          className={({ active }) =>
                            classNames(
                              active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                              'relative cursor-default select-none py-2 pl-3 pr-9'
                            )
                          }
                          value={frequency}>
                          {({ selected, active }) => (
                            <>
                              <div className='flex'>
                                <span
                                  className={classNames(
                                    selected ? 'font-semibold' : 'font-normal',
                                    'truncate'
                                  )}>
                                  {frequency.option}
                                </span>
                                {frequency.discount > 0 && (
                                  <span
                                    className={classNames(
                                      active ? 'text-indigo-200' : 'text-gray-500',
                                      'ml-4 truncate'
                                    )}>
                                    {frequency.discount}% Off
                                  </span>
                                )}
                              </div>

                              {selected ? (
                                <span
                                  className={classNames(
                                    active ? 'text-white' : 'text-indigo-600',
                                    'absolute inset-y-0 right-0 flex items-center pr-4'
                                  )}>
                                  <CheckIcon className='h-5 w-5' aria-hidden='true' />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>

          {/* Flavor Item */}
          <div className='mt-6 grid grid-cols-1 gap-x-8 gap-y-20 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-3'>
            {flavors.map((flavor) => (
              <div key={flavor.id} className='group relative'>
                <div className='aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100'>
                  <Image
                    src={flavor.image.originalSrc}
                    alt={flavor.title}
                    className='object-cover object-center'
                    width={150}
                    height={150}
                  />
                  <div
                    className='flex items-end p-4 opacity-0 group-hover:opacity-100'
                    aria-hidden='true'>
                    <div className='w-full rounded-md bg-white bg-opacity-75 px-4 py-2 text-center text-sm font-medium text-gray-900 backdrop-blur backdrop-filter'>
                      More Details
                    </div>
                  </div>
                </div>
                <div className='mt-5 flex items-center justify-between space-x-8 text-base font-bold text-gray-900 px-3'>
                  <h3>{flavor.title}</h3>
                  <div className='flex items-center space-x-2'>
                    <p className='text-base font-medium line-through'>{flavor.price}</p>
                    <p className='text-base font-bold'>{flavor.price * 0.75}</p>
                  </div>
                </div>
                <div className='mt-5 w-full justify-center gap-10 items-center lg:mt-8 flex'>
                  <button
                    className='text-white bg-[#777] p-4 rounded-lg '
                    aria-label='Decrement product count'
                    onClick={decrementCount}>
                    <MinusIcon className='h-4 w-5 stroke-[5px]' />
                  </button>
                  <div className='border border-gray-600 rounded-xl w-fit px-12 py-2'>
                    <span className='font-bold text-2xl'>{count}</span>
                  </div>
                  <button
                    className='text-white bg-lime p-4 rounded-lg '
                    aria-label='Increment product count'
                    onClick={incrementCount}>
                    <PlusIcon className='h-4 w-5 stroke-[5px]' />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export async function getServerSideProps(context) {
  try {
    const endpoint = process.env.SHOPIFY_ENDPOINT;
    const headers = {
      'content-type': 'application/json',
      'X-Shopify-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN,
    };
    const graphqlQuery = {
      query: `
        query {
          product(id: "${process.env.SHOPIFY_PRODUCT_ID}") {
            variants(first: 15) {
              edges {
                node {
                  id
                  title
                  price
                  image {
                      id
                      originalSrc
                  }
                }
              }
            }
          }
        }
      `,
    };

    const {
      data: { data },
    } = await axios({
      url: endpoint,
      method: 'post',
      headers: headers,
      data: graphqlQuery,
    });

    const flavors = data.product.variants.edges.map((edge) => edge.node);

    const { query } = context;

    const bundleData = query.bundle ?? '';

    const flavorsInBundle = bundleData.length > 0 ? bundleData.split(',') : [];

    return {
      props: {
        flavorsInBundle,
        flavors,
      },
    };
  } catch (e) {
    return {
      redirect: {
        destination: '/error',
        permanent: false,
      },
    };
  }
}
