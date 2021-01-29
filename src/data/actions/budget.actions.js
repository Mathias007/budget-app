import {
    BUDGET_GET_REQUEST,
    BUDGET_GET_SUCCESS,
    BUDGET_GET_FAILURE,
} from "data/constans";

import API from "data/fetch";

export const fetchBudget = (id) => async (dispatch) => {
    dispatch({
        type: BUDGET_GET_REQUEST,
    });

    try {
        const response = await API.budget.fetchBudget(id);
        const data = await response.json();
        dispatch({
            type: BUDGET_GET_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: BUDGET_GET_FAILURE,
        });
    }
};

const fetchBudgetedCategories = () => {
    //
};
