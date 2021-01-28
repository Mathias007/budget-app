import React from "react";
import { Link } from "react-router-dom";

import { InlineButton, RegularButton } from "./Button.css";

function Button({ variant, children, ...props }) {
    const { to } = props;
    const Component = (() => {
        switch (variant) {
            case "inline":
                return InlineButton;

            case "regular":
                return RegularButton;

            default:
                return RegularButton;
        }
    })();

    return to ? (
        <Link {...props}>
            <Component {...props}>{children}</Component>
        </Link>
    ) : (
        <Component {...props}>{children}</Component>
    );
}

export default Button;
