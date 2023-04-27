import axios from 'axios';
import Image from 'next/image';
import { Fragment } from 'react';

export default function Home(props) {
  const { flavorsInBundle, flavors } = props;
  return (
    <main>
      {flavors.map((flavor) => (
        <Fragment key={flavor.id}>
          <h1>{flavor.title}</h1>
          <Image src={flavor.image.originalSrc} width={100} height={100} />
        </Fragment>
      ))}
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
