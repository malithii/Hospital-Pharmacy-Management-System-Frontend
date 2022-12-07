import { post } from "./apiManager";

export const userLogin = (body, onSuccess) => {
  post("/ward-users/login", body, onSuccess);
};
