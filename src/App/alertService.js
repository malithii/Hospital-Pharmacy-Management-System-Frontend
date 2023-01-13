import { show } from "../reducers/alertSlice";
import { store } from "./store";

export const showAlert = (message, severity) => {
  store.dispatch(
    show({
      message: message,
      severity: severity,
    })
  );
};
