import { Grid, Autocomplete, TextField, Skeleton } from "@mui/material";
import useAxios from "./hooks/useAxios";

const SelectCountry = (props) => {
  const { value, setValue, label } = props;

  const [data, load, error] = useAxios("https://restcountries.com/v3.1/all");

  if (load) {
    return (
      <Grid item xs={12} md={3}>
        <Skeleton variant="rounded" height={60} />
      </Grid>
    );
  }

  if (error) {
    return "Что-то пошло не так!";
  }

  const dataFilter = data.filter((item) => "currencies" in item);
  const dataCountries = dataFilter.map((item) => {
    return `${item.flag} ${Object.keys(item.currencies)[0]} - ${
      item.name.common
    } `;
  });

  //console.log(dataCountries)

  return (
    <Grid item xs={12} md={3}>
      <Autocomplete
        value={value}
        disableClearable
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        options={dataCountries}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    </Grid>
  );
};

export default SelectCountry;
