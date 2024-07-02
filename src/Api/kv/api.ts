import { createUser } from "./createUser";
import { getUser } from "./getUser";
import { updateUser } from "./updateUser";

export const kvAPI = {
  baseUrl: String(process.env.NEXT_PUBLIC_API_BASE_URL),
  CRUD: {
    getUser,
    createUser,
    updateUser,
  },
  createUser: function (userId: string) {
    return `${this.baseUrl}/api/kv/create-user?userId=${userId}`;
  },
  getUser: function (userId: string) {
    return `${this.baseUrl}/api/kv/get-user?userId=${userId}`;
  },
  updateUser: function () {
    return `${this.baseUrl}/api/kv/update-user`;
  },
};
