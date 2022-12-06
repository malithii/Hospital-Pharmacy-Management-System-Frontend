import { post } from "./apiManager";

export const newDrugUsage = (body, onSuccess) => {
  post("/drug-usage//new-drug-usage", body, onSuccess);
};

export const getDrugUsageByDate = (body, onSuccess) => {
  post("/drug-usage/view-all", body, onSuccess);
};

export const allDrugUsages = (body, onSuccess) => {
  post("/drug-usage/view-all", body, onSuccess);
};
