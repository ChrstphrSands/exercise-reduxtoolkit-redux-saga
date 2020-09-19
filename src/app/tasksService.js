import axios from "axios";

const API = 'https://tasklistt-api.herokuapp.com/api/tasks';

export async function getTasks(){
    return axios.get(API);
}

export async function deleteTask(id){
    return axios.delete(`${API}/${id}`);
}

export async function addTask(task){
    return axios.post(`${API}`, task);
}