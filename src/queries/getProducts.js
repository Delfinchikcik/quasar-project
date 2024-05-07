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