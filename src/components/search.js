import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import RoomIcon from "@material-ui/icons/Room";
import { Divider, Button, Grid, Box} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  textField: {
    height: 60,
   marginBottom: 10,
   marginRight: 40,
   width: '50ch',
 
  },
  button: {
   height: 58,
    marginBottom: 10
  },
}));

export default function Search({ setSearchTerm,setLocation,searchTerm, location, onSearch }) {
  //const [value, setValue] = React.useState('Controlled');
  const classes = useStyles();
  
  return (
    <>
   
            <Box height={1}>
              <TextField
                label="Search"
                placeholder="Search Course"
                multiline
                variant="outlined"
                value={searchTerm}
                name="searchTerm"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  className: classes.textField
                }}
                onChange={(e) => { setSearchTerm(e.target.value)}}
              />
            </Box> 
            <TextField
              placeholder="Location"
              multiline
              name="location"
              label="Location"
              value={location}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <RoomIcon />
                  </InputAdornment>
                ),
                className: classes.textField
              }}
              onChange={(e)=>{setLocation(e.target.value)} }
            />

            <Button variant="contained" color="primary" className={classes.button} onClick={onSearch}>
              Search
            </Button>
      <Divider />
    </>
  );
}
