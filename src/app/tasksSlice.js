import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    tasks: [],
    task: null,
    paging: {
      limit: 10,
      offset: 0,
      totalElements: 0,
    }
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: { 
    getTasksRequest: state => {
        state.loading = true
     },
    getTasksSuccess: (state, { payload }) => { 
      state.tasks = payload.elements
      state.paging.limit = payload.limit
      state.paging.offset = payload.offset
      state.paging.totalElements = payload.totalElements
      state.loading = false
    },
    getTasksFailure: state => { 
      state.loading = false
    },
    deleteTaskRequest: (state) => {
      state.loading = true
     },
    deleteTaskSuccess: (state, { payload }) => { 
      state.tasks = state.tasks.filter(task => task.id !== payload)
      state.loading = false
    },
    deleteTaskFailure: state => {
      state.loading = false
     },
    addTaskRequest: (state) => { 
      state.loading = true
    },
    addTaskSuccess: (state, { payload }) => {
      state.tasks.push(payload)
      state.loading = false
    },
    addTaskFailure: state => {
      state.loading = false
     },
    
  }
})

export const { 
  getTasksRequest, 
  getTasksSuccess, 
  getTasksFailure,
  deleteTaskRequest,
  deleteTaskSuccess,
  deleteTaskFailure,
  addTaskRequest,
  addTaskSuccess,
  addTaskFailure
} = tasksSlice.actions

export default tasksSlice.reducer