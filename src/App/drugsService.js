import { post } from "./apiManager";

export const newDrug = (body, onSuccess) => {
  post("/drugs/new-drug", body, onSuccess);
};

export const getAllDrugs = (onSuccess) => {
  post("/drugs/all-drugs", {}, onSuccess);
};

export const updateDrugs = (body, onSuccess) => {
  post("/drugs/update-drug", body, onSuccess);
};

export const deleteDrugs = (body, onSuccess) => {
  post("/drugs/remove-drug", body, onSuccess);
};

export const getCategories = (onSuccess) => {
  post("/category/get-categories", {}, onSuccess);
};

export const newCategory = (body, onSuccess) => {
  post("/category/new-category", body, onSuccess);
};

export const getStoreTemps = (onSuccess) => {
  post("/store-temp/get-storeTemps", {}, onSuccess);
};
