import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import {  useNavigate } from 'react-router-dom'

const Home = () => {

    const [todos, setTodos] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoding] = useState(false)
    const [newTodo, setNewTodo] = useState("")

    const navigate = useNavigate()


    

    useEffect(()=>{
        const fetchTodos = async() =>{
            try {

                setLoding(true)
                const response = await axios.get("https://full-stack-todo-app-backend-30vb.onrender.com/todo/gettodos",{
                    withCredentials:true,
                    headers:{"Content-Type": "application/json"}
                })
                
                setTodos(response.data.todos)
                console.log(response.data.todos)
                console.log(todos)
                setError(null)
            } catch (error) {
                setError("Failed to fetch Todos ")
            }
            finally{
                setLoding(false)
            }
        }

        fetchTodos()
    }, [])

    const todoCreate = async() =>{
        if(!newTodo) return
        try {
            const response = await axios.post("https://full-stack-todo-app-backend-30vb.onrender.com/todo/create",{
                text:newTodo,
                completed:false
            },{
                withCredentials:true
            })
            setTodos([...todos,response.data.todo])
            setNewTodo("")
        } catch (error) {
            setError("Failed to Create Todos ")
        }
    }


    const todoStatus = async(id)=>{

        const todo = todos.find((t)=>t._id === id)
        try {
            const response = await axios.post(`https://full-stack-todo-app-backend-30vb.onrender.com/todo/update/${id}`,{
                ...todo,
                completed:!todo.completed
            },{
                withCredentials:true
            })
            setTodos(todos.map((t)=>t._id === id ? response.data : t))
        } catch (error) {
            setError("Failed to find Todo Status ")
        }
    }


    const todoDelete = async(id) =>{
        try {
            await axios.delete(`https://full-stack-todo-app-backend-30vb.onrender.com/todo/delete/${id}`,{
                withCredentials:true
            })

            setTodos(todos.filter((t)=>t._id !== id))
        } catch (error) {
            setError("Failed to Delete Todo ")
        }
    }


    const logout = async(req,res)=>{
        try {

            await axios.get("https://full-stack-todo-app-backend-30vb.onrender.com/user/logout", {
                withCredentials: true
            })
            toast.success("Logout Successfully")
            
            localStorage.removeItem("jwt")
            navigate("/login")
            
        } catch (error) {
            toast.error("Error while logging Out")
        }
    }
  return (
    <div className='bg-gray-100 max-w-lg lg:max-w-xl rounded-lg shadow-lg mx-8 sm:mx-auto p-6'>
        <h1 className='text-2xl font-bold text-center'>Todo App</h1>
        <div className='mb-4 flex'>
            <input type="text" 
            placeholder='Add a new Todo' 
            className='flex-grow p-2 border rounded-l-md focus:outline-none' 
            onChange={(e)=>setNewTodo(e.target.value)} 
            value={newTodo} 
            onKeyPress={(e)=>e.key === "Enter" && todoCreate(e.target.value)}
            />
            <button className='bg-blue-600 border rounded-r-md text-white py-2 px-4 hover:bg-blue-900 duration-300' onClick={todoCreate} >Add</button>
        </div>

        <ul className='space-y-2'>
            {todos.map((todo,index)=>(
                <li key={todo._id || index} className='flex items-center justify-between p-3 bg-gray-100 rounded-md'>
                <div className='flex items-center'>
                    <input type="checkbox" className='mr-2'  />
                    <span className='text-gray-500 '>{todo.text}</span>
                </div>
                <button onClick={()=>todoDelete(todo._id)} className='text-red-500 hover:text-red-800 duration-300'>Delete</button>
            </li>
            ))}
        </ul>

        <p className='mt-4 text-center text-sm text-gray-700'>{todos.length} Todo Remaning</p>
        <button className='mt-6 px-4 py-2 bg-red-500 text-white hover:bg-red-700 duration-300 rounded-md mx-auto block' onClick={()=>logout()} >Logout</button>
    </div>
  )
}

export default Home
