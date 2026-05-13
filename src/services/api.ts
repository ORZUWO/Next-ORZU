import axios from "axios"
import { IStudent, IStudentCreate } from "./types"

const API = "https://69945553fade7a9ec0f51007.mockapi.io/Student"

export const getStudents = async () => {
  const { data } = await axios.get<IStudent[]>(API)
  return data
}

export const addStudent = async (student: IStudentCreate) => {
  const { data } = await axios.post<IStudent>(API, student)
  return data
}

export const deleteStudent = async (id: string) => {
  await axios.delete(`${API}/${id}`)
}

export const editStudent = async (student: IStudent) => {
  const { data } = await axios.put<IStudent>(`${API}/${student.id}`, student)
  return data
}