import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import RoomIcon from "@material-ui/icons/Room";
import { Divider, Button, Grid, Box , FormControl, InputLabel, Select} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  textField: {
    height: 40,
    marginBottom: 10,
 
  },
  button: {
    height: 40,
    marginBottom: 10
  },
}));

export default function Search({ state, onSearchChange, onSearch }) {
  //const [value, setValue] = React.useState('Controlled');
  const classes = useStyles();
  
  return (
    <>
      <form noValidate autoComplete="off">
        <Grid container spacing={1}>
          <Grid container item xs={2} justify='flex-start'>
            <Box height={1}>
              <TextField
                label="Search"
                placeholder="Search Course"
                multiline
                variant="outlined"
                value={state.searchTerm}
                name="searchTerm"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  className: classes.textField
                }}
                onChange={onSearchChange}
              />
            </Box>
          </Grid>

          <Grid container item xs={2} justify="center">
            <TextField
              placeholder="Location"
              multiline
              name="location"
              label="Location"
              value={state.location}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <RoomIcon />
                  </InputAdornment>
                ),
                className: classes.textField
              }}
              onChange={onSearchChange}
            />
          </Grid>
          <Grid container item xs={1} justify="flex-end">

            <Button variant="contained" color="primary" className={classes.button} onClick={onSearch}>
              Search
            </Button>

          </Grid>
        </Grid>
      </form>

      <Divider />
    </>
  );
}
