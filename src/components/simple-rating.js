import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const getRating=(reviews)=>{
  let sum = 0;
  reviews.map((item) => {
    sum += item.rating;
  })
  return sum/reviews.length;
}

export const SimpleRating = ({value, reviews}) => {
  return (
    <div>
    { value && <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend"></Typography>
        <Rating name="read-only" value={value} readOnly />
      </Box> }  
      {reviews && <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend"></Typography>
        <Rating name="read-only" value={getRating(reviews)} readOnly />
      </Box> }
    </div>
  );
}
