import { all } from "redux-saga/effects";

import tasksSagas from "./../task/tasksSagas";

function* Saga() {
    yield all([
        tasksSagas
    ])
}

export default Saga;