import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateProductInput = {
  brand: Scalars['String'];
  categories?: Maybe<Array<Scalars['String']>>;
  description?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Scalars['String']>>;
  name: Scalars['String'];
  retailPrice?: Maybe<Scalars['Float']>;
  sku?: Maybe<Scalars['String']>;
  wholesalePrice?: Maybe<Scalars['Float']>;
};

export type CreateUserInput = {
  age?: Maybe<Scalars['Int']>;
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  username: Scalars['String'];
};

export type GeneralError = {
  __typename?: 'GeneralError';
  code?: Maybe<Scalars['String']>;
  error: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createProduct: Array<ProductResponse>;
  /** Registers a user by saving new data to the db. */
  register?: Maybe<Array<UserResponse>>;
};


export type MutationCreateProductArgs = {
  data: CreateProductInput;
};


export type MutationRegisterArgs = {
  data: CreateUserInput;
};

export type Product = {
  __typename?: 'Product';
  brand: Scalars['String'];
  categories?: Maybe<Array<Scalars['String']>>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  images?: Maybe<Array<Scalars['String']>>;
  name: Scalars['String'];
  retailPrice?: Maybe<Scalars['Float']>;
  sellerCompany?: Maybe<Scalars['String']>;
  sku: Scalars['String'];
  wholesalePrice?: Maybe<Scalars['Float']>;
};

export type ProductInput = {
  brand?: Maybe<Scalars['String']>;
  categories?: Maybe<Array<Scalars['String']>>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type ProductResponse = GeneralError | Product;

export type Query = {
  __typename?: 'Query';
  /** Logs a user in with an email and password */
  login: Array<UserResponse>;
  logout: Scalars['Boolean'];
  /** Returns the current user. */
  me: UserResponse;
  product: ProductResponse;
  products: Array<ProductResponse>;
  /** Returns a user based on id. */
  user?: Maybe<UserResponse>;
};


export type QueryLoginArgs = {
  login: Scalars['String'];
  password: Scalars['String'];
};


export type QueryProductArgs = {
  data: ProductInput;
};


export type QueryProductsArgs = {
  data: ProductInput;
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  age?: Maybe<Scalars['Int']>;
  createdAt: Scalars['String'];
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  lastName?: Maybe<Scalars['String']>;
  products?: Maybe<Array<Scalars['String']>>;
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = GeneralError | User;

export type FullUserFragment = { __typename?: 'User', id: string, username: string, email: string, firstName?: Maybe<string>, lastName?: Maybe<string>, age?: Maybe<number>, products?: Maybe<Array<string>>, createdAt: string, updatedAt: string };

export type GeneralErrorFragment = { __typename?: 'GeneralError', error: string, message: string, code?: Maybe<string> };

export type LoginQueryVariables = Exact<{
  login: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginQuery = { __typename?: 'Query', login: Array<{ __typename: 'GeneralError', error: string, message: string, code?: Maybe<string> } | { __typename: 'User', id: string, username: string, email: string, firstName?: Maybe<string>, lastName?: Maybe<string>, age?: Maybe<number>, products?: Maybe<Array<string>>, createdAt: string, updatedAt: string }> };

export const FullUserFragmentDoc = gql`
    fragment FullUser on User {
  id
  username
  email
  firstName
  lastName
  age
  products
  createdAt
  updatedAt
}
    `;
export const GeneralErrorFragmentDoc = gql`
    fragment GeneralError on GeneralError {
  error
  message
  code
}
    `;
export const LoginDocument = gql`
    query Login($login: String!, $password: String!) {
  login(login: $login, password: $password) {
    __typename
    ...FullUser
    ...GeneralError
  }
}
    ${FullUserFragmentDoc}
${GeneralErrorFragmentDoc}`;

/**
 * __useLoginQuery__
 *
 * To run a query within a React component, call `useLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginQuery({
 *   variables: {
 *      login: // value for 'login'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginQuery(baseOptions: Apollo.QueryHookOptions<LoginQuery, LoginQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
      }
export function useLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export type LoginQueryHookResult = ReturnType<typeof useLoginQuery>;
export type LoginLazyQueryHookResult = ReturnType<typeof useLoginLazyQuery>;
export type LoginQueryResult = Apollo.QueryResult<LoginQuery, LoginQueryVariables>;