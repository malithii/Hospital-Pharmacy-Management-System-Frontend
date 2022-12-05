import { post } from "./apiManager";

export const newDrugUsage = (body, onSuccess) => {
  post("/drug-usage//new-drug-usage", body, onSuccess);
};

export const getDrugUsageByDate = (body, onSuccess) => {
  post("/drug-usage/view-bydate", body, onSuccess);
};
