import React from "react";
import { connect } from "react-redux";
import { groupBy } from "lodash";

function BudgetCategoryList({ budgetedCategories, allCategories }) {
    const budgetedCategoriesByParent = groupBy(
        budgetedCategories,
        (item) =>
            allCategories.find((category) => category.id === item.categoryId)
                .parentCategory.name
    );

    console.log(budgetedCategories);
    console.log(budgetedCategoriesByParent);

    return <div>Budget category list</div>;
}

export default connect((state) => ({
    budgetedCategories: state.budget.budgetedCategories,
    allCategories: state.common.allCategories,
}))(BudgetCategoryList);
