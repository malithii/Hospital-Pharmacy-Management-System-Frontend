import { post } from "./apiManager";

export const userLogin = (body, onSuccess) => {
  post("/users/login", body, onSuccess);
};
