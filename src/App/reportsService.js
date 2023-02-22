import { post } from "./apiManager";

export const drugIssueReport = (body, onSuccess) => {
  post("/reports/drugIssueReport", body, onSuccess);
};

export const inventoryReport = (body, onSuccess) => {
  post("/reports/inventoryReport", body, onSuccess);
};

export const pharmacyDrugUsageChart = (body, onSuccess) => {
  post("/reports/pharmacyDrugUsageChart", body, onSuccess);
};
