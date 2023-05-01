import axios from 'axios';

export async function getAllFlavors() {
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
                  sku
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

    return flavors;
  } catch (e) {
    throw e;
  }
}

export function getFlavorsFromURL(bundleData, flavors) {
  let flavorsFromURL = bundleData.length > 0 ? bundleData.split(',') : [];

  const skus = flavors.map(({ sku }) => sku);
  const invalidURLBundle = flavorsFromURL.some((sku) => !skus.includes(sku));

  if (invalidURLBundle) {
    flavorsFromURL = [];
  }

  return flavorsFromURL;
}
