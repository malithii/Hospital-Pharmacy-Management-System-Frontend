import { post } from "./apiManager";

export const viewInventory = (body, onSuccess) => {
  post("/inventory/view-inventory", body, onSuccess);
};
