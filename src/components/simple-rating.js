import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


export const SimpleRating = ({value}) => {
  return (
    <div>
    { value && <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend"></Typography>
        <Rating name="read-only" value={value} readOnly />
      </Box> }  

      { !value && <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend"></Typography>
        <Rating name="read-only" value={0} readOnly />
      </Box> }  
    </div>
  );
}
