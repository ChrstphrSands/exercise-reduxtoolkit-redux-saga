import { put, call, all, takeLatest } from "redux-saga/effects";

import { 
    getTasksRequest, 
    getTasksSuccess, 
    getTasksFailure,
    deleteTaskRequest,
    deleteTaskSuccess,
    deleteTaskFailure,
    saveTaskRequest,
    saveTaskSuccess,
    saveTaskFailure, 
    updateTaskRequest,
    updateTaskSuccess,
    updateTaskFailure
} from "./tasksSlice";
import { getTasks, deleteTask, saveTask, updateTask } from "./tasksService";

export function* getTasksRequestSaga() {    
    try {
        const { data } = yield call(getTasks)        
        yield put(getTasksSuccess(data))
    } catch (error) {
        yield put(getTasksFailure())
    }
}

export function* deleteTaskRequestSaga({ payload }) {
   try {
       yield call(deleteTask, payload)
       yield put(deleteTaskSuccess(payload))
   } catch (error) {
       yield put(deleteTaskFailure())
   }
}

export function* saveTaskRequestSaga({ payload }) {
    try {
        const { data } = yield call(saveTask, payload)
        yield put(saveTaskSuccess(data.result))
    } catch (error) {
        yield put(saveTaskFailure())
    }
 }

 export function* updateTaskRequestSaga({ payload }) {
     try {
        const { data } = yield call(updateTask, payload)
        yield put(updateTaskSuccess(data.result))
     } catch (error) {
         yield put(updateTaskFailure())
     }
}

export default all([
    takeLatest(getTasksRequest.type, getTasksRequestSaga),
    takeLatest(deleteTaskRequest.type, deleteTaskRequestSaga),
    takeLatest(saveTaskRequest.type, saveTaskRequestSaga),
    takeLatest(updateTaskRequest.type, updateTaskRequestSaga)
])