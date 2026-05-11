export interface IStudent {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  image: string;
  address: string;
}

export interface IStudentCreate {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  image: string;
  address: string;
}