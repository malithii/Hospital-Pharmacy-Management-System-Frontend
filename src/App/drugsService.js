import { post } from "./apiManager";

export const newDrug = (body, onSuccess, onComplete) => {
  post("/drugs/new-drug", body, onSuccess, () => {}, onComplete);
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

export const newStoreTemp = (body, onSuccess) => {
  post("/store-temp/new-storeTemp", body, onSuccess);
};

export const drugCategoryChart = (onSuccess) => {
  post("/category/drugcategorychart", {}, onSuccess);
};
