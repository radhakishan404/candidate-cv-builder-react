import { get } from "lodash-es";

export const parser_users_get_list = (response) => {
    try {
        let data = {};
        data.count = response.count || 0;
        if (response?.data) {
            response = response.data;
        }
        if (!response) {
            return [];
        }

        response = response.map((e) => ({
            users_id: get(e, "_id", ""),
            ...e
        }));


        data.data = response;
        return data;
    } catch (error) {
        throw new Error(error);
    }
};

export const parser_users_get = (response) => {
    try {
        if (response?.data) {
            response = response.data;
        }
        if (!response) {
            return {};
        }

        return {
            users_id: get(response, "_id", ""),
            name: get(response, "name", ""),
            img: get(response, "img", ""),
            location: get(response, "location", ""),
        }

    } catch (error) {
        throw new Error(error);
    }
};