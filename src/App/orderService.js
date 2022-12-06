import { post } from "./apiManager";

export const newOrder = (body, onSuccess) => {
  post("/orders/new-order", body, onSuccess);
};

export const getOrders = (onSuccess) => {
  post("/orders/get-orders", {}, onSuccess);
};
