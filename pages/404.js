function NoRoute() {
  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
        <div className='flex flex-col items-start justify-between space-y-5 mb-12'>
          <h1 className='text-3xl font-bold text-gray-900'>Page not found</h1>
          <p className='text-base font-bold text-gray-900'>
            It looks like you are snooping where you shouldn&apos;t be snooping. But here is a fun
            fact: a duck can see almost 340 degrees around and can sleep with one eye open.
          </p>
        </div>
      </div>
    </div>
  );
}

export default NoRoute;
