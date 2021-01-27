import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { ThemeProvider } from "styled-components";

import GlobalStyle from "./index.css";

import theme from "utils/theme";

import { Navigation, Wrapper } from "components";

function App() {
    const { t, i18n } = useTranslation();
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />

            <Router>
                <Navigation
                    items={[
                        { content: t("Homepage"), to: "/" },
                        { content: t("Budget"), to: "/budget" },
                    ]}
                    RightElement={
                        <div>
                            <button onClick={() => i18n.changeLanguage("pl")}>
                                pl
                            </button>
                            <button onClick={() => i18n.changeLanguage("en")}>
                                en
                            </button>
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
        </ThemeProvider>
    );
}

function RootApp() {
    return (
        <Suspense fallback="Loading...">
            <App />
        </Suspense>
    );
}

export default RootApp;
