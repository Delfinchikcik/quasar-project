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