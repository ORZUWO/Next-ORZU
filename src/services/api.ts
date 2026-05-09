import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { IStudent, IStudentCreate } from "./types"

const api = "https://69945553fade7a9ec0f51007.mockapi.io/Student"

export const Todoapi = createApi({
  reducerPath: "Todoapi",
  baseQuery: fetchBaseQuery({
    baseUrl: api,
  }),
  tagTypes: ["GetTodo"],

  endpoints: (builder) => ({
    getTodoapi: builder.query<IStudent[], void>({
      query: () => "",
      providesTags: ["GetTodo"],
    }),

    deleteTodoapi: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["GetTodo"],
    }),

    postTodoapi: builder.mutation<IStudent, IStudentCreate>({
      query: (newuser) => ({
        url: "",
        method: "POST",
        body: newuser,
      }),
      invalidatesTags: ["GetTodo"],
    }),

    editTodoapi: builder.mutation<IStudent, IStudent>({
      query: (edituser) => ({
        url: `/${edituser.id}`,
        method: "PUT",
        body: edituser,
      }),
      invalidatesTags: ["GetTodo"],
    }),
  }),
})

export const {
  useGetTodoapiQuery,
  useDeleteTodoapiMutation,
  usePostTodoapiMutation,
  useEditTodoapiMutation,
} = Todoapi