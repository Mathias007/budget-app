import React, { Suspense, Fragment, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";

import { ThemeProvider } from "styled-components";

import GlobalStyle from "./index.css";
import { fetchBudget } from "data/actions/budget.actions";

import theme from "utils/theme";

import { Navigation, LoadingIndicator, Wrapper, Button } from "components";

function App({ budget, fetchBudget }) {
    useEffect(() => {
        fetchBudget(1);
    }, [fetchBudget]);

    const { t, i18n } = useTranslation();
    return (
        <Fragment>
            <GlobalStyle />

            <Router>
                <Navigation
                    items={[
                        { content: t("Homepage"), to: "/" },
                        { content: t("Budget"), to: "/budget" },
                    ]}
                    RightElement={
                        <div>
                            <Button
                                variant="regular"
                                onClick={() => i18n.changeLanguage("pl")}
                            >
                                pl
                            </Button>
                            <Button
                                variant="regular"
                                onClick={() => i18n.changeLanguage("en")}
                            >
                                en
                            </Button>
                        </div>
                    }
                />
                <Wrapper>
                    <Switch>
                        <Route exact patch="/">
                            Homepage
                        </Route>
                        <Route path="/budget">Budget page</Route>
                    </Switch>
                </Wrapper>
            </Router>
        </Fragment>
    );
}

const ConnectedApp = connect(
    (state) => {
        return {
            budget: state.budget.budget,
        };
    },
    {
        fetchBudget,
    }
)(App);

function RootApp() {
    return (
        <ThemeProvider theme={theme}>
            <Suspense fallback={<LoadingIndicator />}>
                <ConnectedApp />
            </Suspense>
        </ThemeProvider>
    );
}

export default RootApp;
