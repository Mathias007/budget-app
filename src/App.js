import React from "react";
import { ThemeProvider } from "styled-components";

import GlobalStyle from "./index.css";

import theme from "utils/theme";

import { Navigation } from "components";


function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <div className="App">
                <Navigation items={[]} />
            </div>
        </ThemeProvider>
    );
}

export default App;
