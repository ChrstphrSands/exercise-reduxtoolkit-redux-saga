import { combineReducers } from "redux";

import tasksReducer from "../task/tasksSlice";

const reducers = combineReducers({
    tasks: tasksReducer
})

export default reducers;