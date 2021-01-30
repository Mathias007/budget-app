import { ALL_CATEGORIES_GET } from "data/constans";

import API from "data/fetch";

export const fetchAllCategories = () => {
    const promise = API.common.fetchAllCategories();

    return {
        type: ALL_CATEGORIES_GET,
        promise,
    };
};
