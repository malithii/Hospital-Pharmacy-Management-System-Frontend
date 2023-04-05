import { post } from "./apiManager";

export const expireDateNotification = (body, onSuccess) => {
  post("/notifications/expireDateNotification", body, onSuccess);
};

export const getUnreadNotifications = (body, onSuccess) => {
  post("/notifications/getUnreadNotifications", body, onSuccess);
};

export const readNotification = (body, onSuccess) => {
  post("/notifications/readNotification", body, onSuccess);
};
