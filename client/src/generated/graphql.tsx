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
  /** Logs a user in with an email and password */
  login: Array<UserResponse>;
  logout: Scalars['Boolean'];
  /** Registers a user by saving new data to the db. */
  register?: Maybe<Array<UserResponse>>;
};


export type MutationCreateProductArgs = {
  data: CreateProductInput;
};


export type MutationLoginArgs = {
  login: Scalars['String'];
  password: Scalars['String'];
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
  /** Returns the current user. */
  me: UserResponse;
  product: ProductResponse;
  products: Array<ProductResponse>;
  /** Returns a user based on id. */
  user?: Maybe<UserResponse>;
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

export type LoginMutationVariables = Exact<{
  login: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: Array<{ __typename: 'GeneralError', error: string, message: string, code?: Maybe<string> } | { __typename: 'User', id: string, username: string, email: string, firstName?: Maybe<string>, lastName?: Maybe<string>, age?: Maybe<number>, products?: Maybe<Array<string>>, createdAt: string, updatedAt: string }> };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  age?: Maybe<Scalars['Int']>;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register?: Maybe<Array<{ __typename: 'GeneralError', error: string, message: string, code?: Maybe<string> } | { __typename: 'User', id: string, username: string, email: string, firstName?: Maybe<string>, lastName?: Maybe<string>, age?: Maybe<number>, products?: Maybe<Array<string>>, createdAt: string, updatedAt: string }>> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename: 'GeneralError', error: string, message: string, code?: Maybe<string> } | { __typename: 'User', id: string, username: string, email: string, firstName?: Maybe<string>, lastName?: Maybe<string>, age?: Maybe<number>, products?: Maybe<Array<string>>, createdAt: string, updatedAt: string } };

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
    mutation Login($login: String!, $password: String!) {
  login(login: $login, password: $password) {
    __typename
    ...FullUser
    ...GeneralError
  }
}
    ${FullUserFragmentDoc}
${GeneralErrorFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      login: // value for 'login'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($username: String!, $email: String!, $password: String!, $firstName: String, $lastName: String, $age: Int) {
  register(
    data: {username: $username, password: $password, email: $email, firstName: $firstName, lastName: $lastName, age: $age}
  ) {
    __typename
    ...FullUser
    ...GeneralError
  }
}
    ${FullUserFragmentDoc}
${GeneralErrorFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      age: // value for 'age'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    __typename
    ...FullUser
    ...GeneralError
  }
}
    ${FullUserFragmentDoc}
${GeneralErrorFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;