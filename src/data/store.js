import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./reducers";
import promiseMiddleware from "data/middlewares/promise";
import notificationsMiddleware from "data/middlewares/notifications";

export default function configureStore(preloadedState) {
    const middlewares = [promiseMiddleware, notificationsMiddleware];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    const enhancers = [middlewareEnhancer];
    const composedEnhancers = composeWithDevTools(...enhancers);

    const store = createStore(rootReducer, preloadedState, composedEnhancers);

    if (process.env.NODE_ENV !== "production" && module.hot) {
        module.hot.accept("./reducers", () =>
            store.replaceReducer(rootReducer)
        );
    }

    return store;
}
