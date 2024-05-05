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