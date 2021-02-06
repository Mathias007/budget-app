import React, { useMemo } from "react";
import { connect } from "react-redux";
import { groupBy } from "lodash";

import { formatCurrency, formatDate } from "utils";

import { List, ListItem } from "./BudgetTransactionList.css";

function BudgetTransactionList({
    transactions,
    budgetedCategories,
    allCategories,
    selectedParentCategoryId,
}) {
    const filteredTransactionsBySelectedParentCategory = useMemo(() => {
        if (typeof selectedParentCategoryId === "undefined") {
            return transactions;
        }

        if (selectedParentCategoryId === null) {
            return transactions.filter((transaction) => {
                const hasBudgetCategory = budgetedCategories.some(
                    (budgetedCategory) =>
                        budgetedCategory.categoryId === transaction.categoryId
                );

                return !hasBudgetCategory;
            });
        }

        return transactions.filter((transaction) => {
            try {
                const category = allCategories.find(
                    (category) => category.id === transaction.categoryId
                );
                const parentCategoryName = category.parentCategory.name;

                return parentCategoryName === selectedParentCategoryId;
            } catch {
                return false;
            }
        });
    }, [
        allCategories,
        budgetedCategories,
        selectedParentCategoryId,
        transactions,
    ]);

    const groupedTransactions = useMemo(
        () =>
            groupBy(
                filteredTransactionsBySelectedParentCategory,
                (transaction) => new Date(transaction.date).getUTCDate()
            ),
        [filteredTransactionsBySelectedParentCategory]
    );

    return (
        <List>
            {Object.entries(groupedTransactions).map(([key, transactions]) => (
                <li>
                    <ul>
                        {transactions.map((transaction) => (
                            <ListItem>
                                <div>{transaction.description}</div>
                                <div>{formatCurrency(transaction.amount)}</div>
                                <div>{formatDate(transaction.date)}</div>
                                <div>
                                    {
                                        (
                                            allCategories.find(
                                                (category) =>
                                                    category.id ===
                                                    transaction.categoryId
                                            ) || {}
                                        ).name
                                    }
                                </div>
                            </ListItem>
                        ))}
                    </ul>
                </li>
            ))}
        </List>
    );
}

export default connect((state) => ({
    transactions: state.budget.budget.transactions,
    budgetedCategories: state.budget.budgetedCategories,
    allCategories: state.common.allCategories,
    selectedParentCategoryId: state.budget.selectedParentCategoryId,
}))(BudgetTransactionList);
