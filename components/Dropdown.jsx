import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Dropdown({ frequencies, selected, setSelected }) {
  return (
    <>
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
                    <span className={'ml-2 truncate text-gray-500'}>{selected.discount}% Off</span>
                  )}
                </span>
                <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 '>
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
                                  'ml-4 truncate pr-3'
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
    </>
  );
}

export default Dropdown;
