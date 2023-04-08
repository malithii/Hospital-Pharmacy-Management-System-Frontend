import { post } from "./apiManager";

export const userLogin = (body, onSuccess) => {
  post("/users/login", body, onSuccess);
};

export const userSignUp = (body, onSuccess) => {
  post("/users/new-user", body, onSuccess);
};
