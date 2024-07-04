import Axios from "../../lib/axiosConfig";
import { KVUser } from "@blogshow/types/kvUser";
import { kvAPI } from "./api";

export const updateUser = async ({ userId, create, read }: KVUser): Promise<{ message: string }> => {
  const res = await Axios.put(kvAPI.updateUser(), { userId, create, read });
  return res.data;
};
