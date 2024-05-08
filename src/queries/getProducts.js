import { gql } from 'graphql-tag';

export const GET_PRODUCTS = gql`
query GetProducts @cached {
  products {
    id
    created_at
    updated_at
    availability
    description
    destination
    duration
    favourite
    group
    name
    price
    shop_add
    type
    img_1
    img_2
    img_3
    img_4
    img_5
  }
}
`;

export const GET_SORTED_PRODUCTS = (destination, type, sortOrder) => {
    console.log(`
    query GetSortedProducts {
    products(where: {destination: {_eq: "${destination}"}, type: {_eq: "${type}"}}, order_by: { price: ${sortOrder}} ) {
    id
    created_at
    updated_at
    availability
    description
    destination
    duration
    favourite
    group
    name
    price
    shop_add
    type
    img_1
    img_2
    img_3
    img_4
    img_5
    }
    }
`)
    return gql`
    query GetSortedProducts {
    products(where: {destination: {_eq: "${destination}"}, type: {_eq: "${type}"}}, order_by: { price: ${sortOrder}} ) {
    id
    created_at
    updated_at
    availability
    description
    destination
    duration
    favourite
    group
    name
    price
    shop_add
    type
    img_1
    img_2
    img_3
    img_4
    img_5
    }
    }
`}



// query GetProductsVar($filter: products_bool_exp, $sortOrder: order_by) @cached {
// products(where: $filter, order_by: [{price: $sortOrder}]) {
// id
// created_at
// updated_at
// availability
// description
// destination
// duration
// favourite
// group
// name
// price
// shop_add
// type
// img_1
// img_2
// img_3
// img_4
// img_5
// }
// }
// ;
// export const getProducts = async (filters, sortOption) => {
//   const variables = {
//     filterType: filters.type,
//     filterDestination: filters.destination,
//     sortField: sortOption.field,
//     sortOrder: sortOption.order,
//   };

//   const { result, loading } = await useQuery(GET_PRODUCTS, variables);
//   //...
// };

// query GetProducts @cached {
//   products {
//     id
//     created_at
//     updated_at
//     availability
//     description
//     destination
//     duration
//     favourite
//     group
//     name
//     price
//     shop_add
//     type
//     img_1
//     img_2
//     img_3
//     img_4
//     img_5
//   }
// }
// ;

// // От дешевых к дорогим
// export const SORT_PRICE_ASC = gql`
//   query SortPriceAsc {
//     products(order_by: {price: asc_nulls_last}) {
//       availability
//       created_at
//       description
//       destination
//       duration
//       favourite
//       group
//       id
//       img_1
//       img_2
//       img_3
//       img_4
//       img_5
//       name
//       shop_add
//       type
//       updated_at
//       price
//     }
//   }
// `;
// // От дорогих к дешевым
// export const SORT_PRICE_DESC = gql`
//   query SortPriceDesc {
//     products(order_by: {price: desc_nulls_last}) {
//       availability
//       created_at
//       description
//       destination
//       duration
//       favourite
//       group
//       id
//       img_1
//       img_2
//       img_3
//       img_4
//       img_5
//       name
//       shop_add
//       type
//       updated_at
//       price
//     }
//   }
// `;