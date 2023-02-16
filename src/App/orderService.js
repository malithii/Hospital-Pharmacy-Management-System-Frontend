import { post } from "./apiManager";

export const newOrder = (body, onSuccess) => {
  post("/orders/new-order", body, onSuccess);
};

export const getOrders = (onSuccess) => {
  post("/orders/get-orders", {}, onSuccess);
};

export const getPendingOrders = (onSuccess) => {
  post("/orders/get-pending-orders", {}, onSuccess);
};

export const acceptOrder = (body, onSuccess) => {
  post("/orders/accept-order", body, onSuccess);
};
