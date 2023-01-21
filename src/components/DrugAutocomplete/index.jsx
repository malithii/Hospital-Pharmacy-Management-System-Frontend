import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getDrugById } from "../../App/drugsService";

const DrugAutocomplete = () => {
  const [drugs, setDrugs] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    setValue,
  } = useForm();

  useEffect(() => {
    getDrugById((response) => {
      console.log(response.drug);
      setDrugs(response.drug);
    });
  }, []);
  return (
    <Autocomplete
      disablePortal
      {...register("drug", {
        required: {
          value: true,
          message: "drug is required",
        },
      })}
      onChange={(e, value) => {
        setValue("drug", value);
      }}
      id="combo-box-demo"
      getOptionLabel={(option) => option.drugId}
      options={drugs}
      sx={{
        mt: "0.5rem",
        width: "100%",
        ...(errors.drug && {
          border: "1px solid red",
        }),
      }}
      renderInput={(params) => {
        return (
          <TextField
            sx={{ color: "red" }}
            {...params}
            size="small"
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
            // {...register("storeTemp", {
            //   required: {
            //     value: true,
            //     message: "Store temperature is required",
            //   },
            // })}
            // {...(errors.storeTemp && {
            //   error: true,
            //   helperText: errors.storeTemp.message,
            // })}
          />
        );
      }}
    />
  );
};

export default DrugAutocomplete;
