import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { IStudent, IStudentCreate } from "./types"

const apiBase = "http://localhost:8000"

export const Todoapi = createApi({
  reducerPath: "Todoapi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiBase,
  }),
  tagTypes: ["GetTodo"],

  endpoints: (builder) => ({
    getTodoapi: builder.query<IStudent[], void>({
      query: () => "/clients",
      providesTags: ["GetTodo"],
    }),

    getClientById: builder.query<IStudent, string | number>({
      query: (id) => `/clients/${id}`,
      providesTags: ["GetTodo"],
    }),

    deleteTodoapi: builder.mutation<void, string | number>({
      query: (id) => ({
        url: `/clients/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["GetTodo"],
    }),

    postTodoapi: builder.mutation<IStudent, IStudentCreate>({
      query: (newuser) => ({
        url: "/clients",
        method: "POST",
        body: newuser,
      }),
      invalidatesTags: ["GetTodo"],
    }),

    editTodoapi: builder.mutation<IStudent, IStudent>({
      query: (edituser) => ({
        url: `/clients/${edituser.id}`,
        method: "PUT",
        body: edituser,
      }),
      invalidatesTags: ["GetTodo"],
    }),
  }),
})

export const {
  useGetTodoapiQuery,
  useGetClientByIdQuery,
  useDeleteTodoapiMutation,
  usePostTodoapiMutation,
  useEditTodoapiMutation,
} = Todoapi