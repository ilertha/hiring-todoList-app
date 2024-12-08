import axios from "axios";
import endpoint from "../../config/config";

const getTodoList = async () => {
  try{
    const userId = JSON.parse(sessionStorage.getItem('userId') || '""'); // Parse the value correctly
    const url = `${endpoint}/todoList/${userId}`;
    let response = await axios.get(url)
    return await response.data
  } catch (err) {
    console.log(err)
  }
}
const createTodoList = async (formdata : any) =>{
  try{
    let response = await axios.post(`${endpoint}/todoList`,formdata)
    return await response.data
  } catch (err){
    console.log(err)
  }
}

const deleteTodoList = async (_id : string) => {
  console.log("myid:",_id)
  try{
    let response = await axios.delete(`${endpoint}/todoList/${_id}`)
    return await response.data
  } catch(err) {
    console.log(err)
  }
}

const updateTodoList = async (_id : string, data: any) => {
  try {
    let response = await axios.put(`${endpoint}/todoList/${_id}`, data)
    return await response.data
  } catch (err) {
    console.log(err)
  }
}
const completedTodoList = async (_id: string, completed: boolean) => {
  try{
    let response = await axios.put(`${endpoint}/todoList/${_id}`, completed)
    return await response.data
  } catch (err) {
    console.log(err)
  }
}

export {getTodoList, createTodoList, deleteTodoList, updateTodoList, completedTodoList}