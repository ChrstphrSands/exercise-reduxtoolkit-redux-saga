import { all } from "redux-saga/effects";

import TasksSagas from "../app/tasksSagas";

function* Saga() {
    yield all([
        TasksSagas
    ])
}

export default Saga;