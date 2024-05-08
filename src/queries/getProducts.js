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
      img_1
      img_2
      img_3
      img_4
      img_5
      name
      price
      shop_add
      type
    }
  }
`;

export const SET_FAVORITE = gql`
mutation MyMutation($User_id: uuid!, $description: String!, $destination: String!, $duration: Int!, $group: Int!, $img_1: String!, $img_2: String!, $img_3: String!, $img_4: String!, $img_5: String!, $name: String!, $price: Int!, $type: String!) {
  insert_favorite(objects: {User_id: $User_id, description: $description, destination: $destination, duration: $duration, group: $group, img_1: $img_1, img_2: $img_2, img_3: $img_3, img_4: $img_4, img_5: $img_5, name: $name, price: $price, type: $type}) {
    affected_rows
  }
}`

export const GET_FAVORITE = gql`
query MyQuery($User_id: uuid = "1ef4a1d2-1bf2-4c81-b279-a7ca641175ac") {
  favorite(where: {User_id: {_eq: $User_id}}) {
    User_id
    description
    destination
    name
    price
    type
    id
    group
    img_1
    img_2
    img_3
    img_4
    img_5
    duration
  }
}
`

export const REMOVE_FAVORITE = gql`
  mutation MyMutation($User_id: uuid!, $name: String!) {
    delete_favorite(where: { name: { _eq: $name }, User_id: { _eq: $User_id } }) {
      affected_rows
    }
  }
`;

export const GET_SHOP = gql`
query MyQuery($User_id: uuid = "1ef4a1d2-1bf2-4c81-b279-a7ca641175ac") {
  Shop(where: {User_id: {_eq: $User_id}}) {
    User_id
    description
    destination
    duration
    group
    id
    img_1
    img_2
    img_3
    img_4
    img_5
    name
    price
    type
  }
}`

export const SET_SHOP = gql`
mutation MyMutation($User_id: uuid!, $description: String!, $destination: String!, $duration: Int!, $group: Int!, $img_1: String!, $img_2: String!, $img_3: String!, $img_4: String!, $img_5: String!, $name: String!, $price: Int!, $type: String!) {
  insert_Shop(objects: {User_id: $User_id, description: $description, destination: $destination, duration: $duration, group: $group, img_1: $img_1, img_2: $img_2, img_3: $img_3, img_4: $img_4, img_5: $img_5, name: $name, price: $price, type: $type}) {
    affected_rows
  }
}`

export const REMOVE_SHOP = gql`
  mutation MyMutation($User_id: uuid!, $name: String!) {
    delete_Shop(where: { name: { _eq: $name }, User_id: { _eq: $User_id } }) {
      affected_rows
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