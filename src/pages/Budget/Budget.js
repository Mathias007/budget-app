import React, { Fragment, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";

import {
    fetchBudget,
    fetchBudgetedCategories,
    addTransaction,
} from "data/actions/budget.actions";
import { fetchAllCategories } from "data/actions/common.actions";

import { Grid } from "./Budget.css";
import { LoadingIndicator, Modal, Button } from "components";

import BudgetCategoryList from "pages/Budget/components/BudgetCategoryList";
import BudgetTransactionList from "pages/Budget/components/BudgetTransactionList";
import AddTransactionForm from "pages/Budget/components/AddTransactionForm";

function Budget({
    budget,
    commonState,
    budgetState,
    allCategories,
    fetchBudget,
    fetchBudgetedCategories,
    fetchAllCategories,
    addTransaction,
}) {
    useEffect(() => {
        fetchBudget(1);
        fetchBudgetedCategories(1);
        fetchAllCategories();
    }, [fetchBudget, fetchBudgetedCategories, fetchAllCategories]);

    const handleSubmitAddTransaction = (values) => {
        addTransaction({ budgetId: budget.id, data: values });
        console.log(budget.id);
    };

    const isLoaded = useMemo(
        () =>
            !!commonState &&
            Object.keys(commonState).length === 0 &&
            !!budgetState &&
            Object.keys(budgetState).length === 0,
        [commonState, budgetState]
    );

    return (
        <Fragment>
            <Grid>
                <section>
                    {isLoaded ? <BudgetCategoryList /> : <LoadingIndicator />}
                </section>
                <section>
                    {isLoaded ? (
                        <Fragment>
                            <Button to="/budget/transactions/new">
                                Add new transaction
                            </Button>
                            <BudgetTransactionList />
                        </Fragment>
                    ) : (
                        <LoadingIndicator />
                    )}
                </section>
            </Grid>
            <Switch>
                <Route path="/budget/transactions/new">
                    <Modal>
                        <AddTransactionForm
                            onSubmit={handleSubmitAddTransaction}
                            categories={allCategories}
                            groupCategoriesBy="parentCategory.name"
                        />
                    </Modal>
                </Route>
            </Switch>
        </Fragment>
    );
}

export default connect(
    (state) => {
        return {
            budget: state.budget.budget,
            commonState: state.common.loadingState,
            budgetState: state.budget.loadingState,
            allCategories: state.common.allCategories,
        };
    },
    {
        fetchBudget,
        fetchBudgetedCategories,
        fetchAllCategories,
        addTransaction,
    }
)(Budget);
