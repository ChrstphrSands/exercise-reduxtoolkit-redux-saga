import axios from "axios";

const API = 'https://tasklistt-api.herokuapp.com/api/tasks';

export async function getTasks(){
    return axios.get(API);
}

export async function deleteTask(id){
    return axios.delete(`${API}/${id}`);
}

export async function saveTask(data){
    return axios.post(`${API}`, data);
}

export async function updateTask(data){
    return axios.put(`${API}/${data.id}`, data);
}