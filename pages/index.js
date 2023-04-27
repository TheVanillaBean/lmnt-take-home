export default function Home(props) {
  const { flavorsInBundle } = props;
  return (
    <main>
      <p className='text-lg'>{flavorsInBundle.join(' ')}</p>
    </main>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;

  const bundleData = query.bundle ?? '';

  const flavorsInBundle = bundleData.length > 0 ? bundleData.split(',') : [];

  return {
    props: {
      flavorsInBundle,
      flavors: {},
    },
  };
}
