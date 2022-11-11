import { axios } from "../../helpers/axios";
import {
  USERS_ENDPOINT,
} from "./commonConstants";

export const api_users_get_list = async (params) => {
  return axios.get(`${USERS_ENDPOINT}`, { params });
};

export const api_users_add = async (data) => {
  return axios.post(USERS_ENDPOINT, data);
};

export const api_users_update = async (data) => {
  return axios.put(`${USERS_ENDPOINT}/${data.users_id}`, data);
};

export const api_users_delete = async (id) => {
  return axios.delete(`${USERS_ENDPOINT}/${id}`);
};

export const api_users_get = async (id) => {
  return axios.get(`${USERS_ENDPOINT}/${id}`);
};
