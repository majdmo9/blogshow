import Axios from "@blogshow/lib/axiosConfig";
import { kvAPI } from "./api";
import { KVUser } from "@blogshow/types/kvUser";

export const getUser = async (userId: string): Promise<KVUser> => {
  const res = await Axios.get<KVUser>(kvAPI.getUser(userId));
  return res.data;
};
