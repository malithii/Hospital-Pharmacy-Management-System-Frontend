import { post } from "./apiManager";

export const getRecieved = (body, onSuccess) => {
  post("/recieved-drugs/get", body, onSuccess);
};

export const newRecievedDrugs = (body, onSuccess) => {
  post("/recieved-drugs/new", body, onSuccess);
};
