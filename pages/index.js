import Dropdown from '@/components/Dropdown';
import FlavorItem from '@/components/FlavorItem';
import axios from 'axios';
import { CartContext } from 'context/CartContext';
import { useContext, useState } from 'react';

const frequencies = [
  { option: 'Delivered only once', discount: 0 },
  { option: 'Delivered every 1 month', discount: 10 },
  { option: 'Delivered every 2 months', discount: 10 },
  { option: 'Delivered every 3 months', discount: 10 },
];

export default function Home(props) {
  const { flavorsInBundle, flavors } = props;

  const [selected, setSelected] = useState(frequencies[1]);
  const { totalItems } = useContext(CartContext);

  const addToCartBtnText =
    totalItems() === 4 ? 'Add to cart' : `Add ${4 - totalItems()} more items`;

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

          <Dropdown frequencies={frequencies} selected={selected} setSelected={setSelected} />

          {/* Flavor Item */}
          <div className='mt-6 grid grid-cols-1 gap-x-8 gap-y-20 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-3'>
            {flavors.map((flavor) => (
              <FlavorItem key={flavor.id} flavor={flavor} />
            ))}
          </div>

          <div className='flex justify-center w-full mt-12 sticky bottom-0 lg:relative'>
            <button className='bg-lime text-white text-center px-5 py-4 rounded-xl mb-4 lg:mb-0'>
              {addToCartBtnText}
            </button>
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
