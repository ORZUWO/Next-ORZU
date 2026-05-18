import axios from "axios";


 const Api="https://69945553fade7a9ec0f51007.mockapi.io/Student"


export const GetTodo = async()=>{
        const {data} = await axios.get(Api)
        console.log(data); 
        return data
}
export const getid = async(id:string)=>{
    const {data} = await axios.get(`${Api}/${id}`)
    return data
}
export const addTodo = async(newuser:any)=>{
    const {data} = await axios.post(Api,newuser)
    return data
}
export const deleteTodo = async(id:string)=>{
    const {data} = await axios.delete(`${Api}/${id}`)
    return data
}
export const editTodo = async(id:string,newuser:any)=>{
    const {data} = await axios.put(`${Api}/${id}`,newuser)
    return data
}
export const editcheck = async(user:any)=>{
    const {data} = await axios.put(`${Api}/${user.id}`,
        {
            name:user.name,
            age:user.age,
            status:!user.status,
            img:user.img
        }
    )
    return data
}
