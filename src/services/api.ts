// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IStudent } from './types'

let api="http://69945553fade7a9ec0f51007.mockapi.io/Student"
// Define a service using a base URL and expected endpoints
export const Todoapi = createApi({
  reducerPath: 'Todoapi',
  baseQuery: fetchBaseQuery({ baseUrl: api }),
  endpoints: (builder) => ({
    getTodoapi: builder.query<IStudent, null>({
      query: () => ``,
    }),
    postTodoapi: builder.mutation<IStudent, null>({
      query: (newUser) =>({
        url: '',
        method: 'POST',
        body: newUser,
      }),
    }),
    deleteTodoapi: builder.mutation<IStudent, null>({
      query: (id) =>({
        url: `/${id}`,
        method: 'DELETE',
      }),
    }),
    editTodoapi: builder.mutation<IStudent, null>({
      query: (edituser) =>({
        url: `/${edituser.id}`,
        method: 'PUT',
        body: edituser,
      }),
    }),
    
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetTodoapiQuery, usePostTodoapiMutation,useDeleteTodoapiMutation,useEditTodoapiMutation } = Todoapi