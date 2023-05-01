function Error() {
  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
        <div className='flex flex-col items-start justify-between space-y-5 mb-12'>
          <h1 className='text-3xl font-bold text-gray-900'>Oh no :(</h1>
          <p className='text-base font-bold text-gray-900'>
            There was an error retrieving product data. Please contact customer support.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Error;
