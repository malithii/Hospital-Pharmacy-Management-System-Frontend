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

export const checkBatchQuantity = (body, onSuccess) => {
  post("/inventory/checkBatchQuantity", body, onSuccess);
};

export const getInventoryByDrug = (body, onSuccess) => {
  post("/inventory/getInventoryByDrug", body, onSuccess);
};

export const searchInventoryByDrug = (body, onSuccess) => {
  post("/inventory/searchInventoryByDrug", body, onSuccess);
};

export const getBatches = (body, onSuccess) => {
  post("/inventory/getBatches", body, onSuccess);
};

export const removeBatch = (body, onSuccess) => {
  post("/inventory/removeBatch", body, onSuccess);
};
