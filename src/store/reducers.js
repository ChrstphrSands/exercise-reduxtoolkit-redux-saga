import { combineReducers } from "redux";

import tasksReducer from "../app/tasksSlice";

const reducers = combineReducers({
    tasks: tasksReducer
})

export default reducers;