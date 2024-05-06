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
      images
      name
      price
      shop_add
      type
    }
  }
`;

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
