import { post } from "./apiManager";

export const getRecieved = (body, onSuccess) => {
  post("/recieved-drugs/get", body, onSuccess);
};
