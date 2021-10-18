import axios from "axios";
import { BASE_API_URL } from "../constants/chat.constants";

export const getIsAdminUser = async (token) => {
  return await axios.get(`${BASE_API_URL}/protected/is-admin`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
