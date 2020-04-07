import { Typography, MenuItem, Select, FormControl, Grid, makeStyles, InputLabel, Button, TextareaAutosize } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import history from './history';
import { headers, API_BASE_URL,headersForAssociationUpdate } from '../constants';

const useStyles = makeStyles(theme => ({
    TextField: {
      width: '45ch'
    },
    textArea: {
        width: '50ch',
        height: '50ch'

    },
    select: {
        width: '20ch',
        margin: theme.spacing(0),
        
    },
    button: {
      marginLeft: 60
    }
  }));
  

export const Review = () => {
    const classes = useStyles();
    const [course, setCourse] = React.useState({});
    const [rating, setRating] = React.useState(1);
    const [reviewText, setReviewText] = React.useState('');
    
    const { id } = useParams();
   
    React.useEffect(() => {
        fetch(`${API_BASE_URL}/courses/${id}`, {
            method: 'GET',
            headers: headers
        }).then(
            response => response.json()).then(result => {
                setCourse(result);
                console.log('programs',result);
            })
    }, [id])

    const fetchPut = async(url, data) => {
        const result = await fetch(url, { headers: headersForAssociationUpdate, method: 'PUT', body: data});
        console.log("result", result);

    }
    const addReviewToCourse= ((courseReviewLink)=> {
        console.log('course link',courseReviewLink)
        fetch(courseReviewLink,{
            method: 'PATCH',
            headers: headersForAssociationUpdate,
            body: course._links.self.href
        }).then(resp=> {
             return resp.json();
        }).then( resource2 => {
             console.log("added review resource to course: " , resource2)
            })
    })


    const addReviewToUser = ((userReviewLink) => {
        console.log('review link',userReviewLink)
        fetch(userReviewLink,{
            method: 'PATCH',
            headers: headersForAssociationUpdate,
            body:  sessionStorage.getItem('userLink')
            }).then(resp => {
                return resp.json();
            })
        .then((resource1) => {
             console.log("added review resource to user: " , resource1)
            })

    })


    const addReview = async () => {
       // newReview.username = sessionStorage.getItem('username');
       const username = sessionStorage.getItem('username');
        console.log('username', username );
        const review = {
            'rating' : rating,
            'reviewText': reviewText,
            'username': username
        }
        console.log('reviews', review);
        
        // update course

        const response = await fetch(`${API_BASE_URL}/reviews`,{
            method: 'POST',
            headers: headers,
            body: JSON.stringify(review)}

            );
        const result = await response.json();
        
        if (response.ok){

            fetchPut(result._links.course.href, course._links.self.href);
            fetchPut(result._links.user.href, sessionStorage.getItem('userLink'));
            history.push('/courses/' + id);
        }

    }
   



    return (<>
    <Grid container direction='column' alignItems='center' spacing={4}>
    <Grid item>
    <Typography align='left'  variant='h6'>Review {course.programName} at {course.schoolName}</Typography>
    
    </Grid>
   <form  noValidate autoComplete="off">
      
    <Grid container direction="column"  spacing={4} >
    
     <Grid item>
     <FormControl   className={classes.select} variant="outlined" >
        <InputLabel id="demo-simple-select-outlined-label">Rating</InputLabel>
        <Select
          value={rating}
          label="Rating"
          name="rating"
          onChange={(e) => {setRating(e.target.value)}}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
        </Select>
      </FormControl>
      </Grid> 
      <Grid item>
      <TextareaAutosize
  rowsMax={8}
  aria-label="maximum height"
  name="reviewText"
  rowsMin={8}
  value={reviewText}
  className={classes.textArea}
  onChange={(e)=> {setReviewText(e.target.value)} }
/>
      </Grid>

      <Grid item>
        <Button variant="contained"  color="primary" onClick={addReview}>Add my review</Button>
        </Grid>  
    </Grid>
  </form>
  </Grid>
    </>
    )


}