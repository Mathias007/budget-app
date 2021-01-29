import { combineReducers } from "redux";

import budget from "./budget.reducer";

const rootReducer = combineReducers({
    budget,
});

export default rootReducer;
