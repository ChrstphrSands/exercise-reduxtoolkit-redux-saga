import { put, call, all, takeLatest } from "redux-saga/effects";

import { 
    getTasksRequest, 
    getTasksSuccess, 
    getTasksFailure,
    deleteTaskRequest,
    deleteTaskSuccess,
    deleteTaskFailure,
    addTaskRequest,
    addTaskSuccess,
    addTaskFailure,
    updateTaskRequest,
    updateTaskSuccess

} from "./tasksSlice";
import { getTasks, deleteTask, addTask, updateTask } from "./tasksService";

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

export function* addTaskRequestSaga({ payload }) {
    try {
        const { data } = yield call(addTask, payload)
        yield put(addTaskSuccess(data.result))
    } catch (error) {
        yield put(addTaskFailure())
    }
 }

 export function* updateTaskRequestSaga({ payload }) {
    try {
        const { data } = yield call(updateTask, payload)
        yield put(updateTaskSuccess(data.result))
    } catch (error) {
        console.error(error)
    }
 }


 

export default all([
    takeLatest(getTasksRequest.type, getTasksRequestSaga),
    takeLatest(deleteTaskRequest.type, deleteTaskRequestSaga),
    takeLatest(addTaskRequest.type, addTaskRequestSaga),
    takeLatest(updateTaskRequest.type, updateTaskRequestSaga)
])