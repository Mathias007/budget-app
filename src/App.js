import React, { Suspense, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ThemeProvider } from "styled-components";

import GlobalStyle from "./index.css";
import theme from "utils/theme";

import { Navigation, LoadingIndicator, Wrapper, Button } from "components";
import Budget from "pages/Budget";

function App() {
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
                        <Route exact path="/">
                            Homepage
                        </Route>
                        <Route path="/budget">
                            <Budget />
                        </Route>
                    </Switch>
                </Wrapper>
            </Router>
        </Fragment>
    );
}

function RootApp() {
    return (
        <ThemeProvider theme={theme}>
            <Suspense fallback={<LoadingIndicator />}>
                <App />
            </Suspense>
        </ThemeProvider>
    );
}

export default RootApp;
