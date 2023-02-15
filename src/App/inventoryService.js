import { post } from "./apiManager";

export const viewInventory = (body, onSuccess) => {
  post("/inventory/view-inventory", body, onSuccess);
};

export const getWardInventory = (onSuccess) => {
  post("/inventory/ward-inventory", {}, onSuccess);
};

export const getNearestExpireDates = (body, onSuccess) => {
  post("/inventory/getNearestExpireDates", body, onSuccess);
};

export const inventoryChart = (body, onSuccess) => {
  post("/inventory/inventoryChart", body, onSuccess);
};

export const updateReorderLevel = (body, onSuccess) => {
  post("/inventory/updateReorderLevel", body, onSuccess);
};
