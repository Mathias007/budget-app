import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { ThemeProvider } from "styled-components";

import GlobalStyle from "./index.css";

import theme from "utils/theme";

import { Navigation } from "components";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />

            <Router>
                <Navigation
                    items={[
                        { content: "Homepage", to: "/" },
                        { content: "Budget", to: "/budget" },
                    ]}
                />
                <Switch>
                    <Route exact patch="/">
                        Homepage
                    </Route>
                    <Route path="/budget">Budget page</Route>
                </Switch>
            </Router>
        </ThemeProvider>
    );
}

export default App;
