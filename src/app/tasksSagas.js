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
    addTaskFailure

} from "./tasksSlice";
import { getTasks, deleteTask, addTask } from "./tasksService";

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

export default all([
    takeLatest(getTasksRequest.type, getTasksRequestSaga),
    takeLatest(deleteTaskRequest.type, deleteTaskRequestSaga),
    takeLatest(addTaskRequest.type, addTaskRequestSaga)
])