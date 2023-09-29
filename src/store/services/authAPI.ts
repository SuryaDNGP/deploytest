import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authAPI = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://192.168.17.208:3333/api/v1/users',
  }),
  endpoints: (builder) => ({
    userLogin: builder.mutation({
      query: (payload) => {
        console.log("payload", payload);
        
        return {
          url: '/login',
          method: 'POST',
          body: payload,
        };
      },
    }),
    userRegister: builder.mutation({
      query: (payload) => {
        console.log("payload", payload);
        
        return {
          url: '/login',
          method: 'POST',
          body: payload,
        };
      },
    }),
  }),
});

export const { useUserLoginMutation, useUserRegisterMutation } = authAPI;
