import Axios from "@blogshow/lib/axiosConfig";
import { kvAPI } from "./api";

export const createUser = async (userId: string): Promise<{ message: string }> => {
  const res = await Axios.post(kvAPI.createUser(userId));
  return res.data;
};
