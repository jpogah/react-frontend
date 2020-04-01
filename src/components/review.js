import { Typography, MenuItem, Select, FormControl, Grid, makeStyles, InputLabel, TextField, Button, TextareaAutosize, Box, Divider } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import history from './history';
import { USER_NAME_SESSION_ATTRIBUTE_NAME } from './authentication-service';

const API_URL = 'http://localhost:8080/api/';
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
    const { id } = useParams();
    const [review, setReview] = React.useState({
        rating: 1,
        reviewText: '',
        username: sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
    });
    

    const handleChange = (event) => {
        setReview({...review, [event.target.name]: event.target.value});
    }
    React.useEffect(() => {
        fetch(`${API_URL}courses/${id}`).then(
            response => response.json()).then(result => {
                setCourse(result);
                console.log('programs',result);
            })
    }, [id])


    const addReview = () => {
        course.totalReviews = 1 + course.totalReviews;
        course.rating = Math.ceil((course.rating + review.rating)/ (1.0 * course.totalReviews));
        const headers = new Headers({
            'Authorization' : sessionStorage.getItem('token'),
            'Content-Type': 'application/json'  
        })
        let reviewResponse={}; 
        
        // update course
        fetch(course._links.self.href, {
            method: 'PATCH',
            headers: headers,
            body: JSON.stringify(course)
        }).then(response => {
            return response.json();
        }).then(() =>{
        console.log("coourse updated");
        }
        ).catch(() => {
            console.log("cannot update course")
        })

        fetch(`${API_URL}reviews`,{
            method: 'POST',
            headers: headers,
            body: JSON.stringify(review)}

            ).then(response => {
                return response.json()}).then( (result) => {
                    console.log('second result', result)
                    reviewResponse = result;
                    fetch(result._links.user.href,{
                        method: 'PUT',
                        headers: new Headers({
                            'Authorization': sessionStorage.getItem('token'),
                            'Content-Type': 'text/uri-list'}),
                        body:  sessionStorage.getItem('reviewLink')
                        }).then(response => {
                       return  response.json()
                    }).
                    then((resource1) => {
                         console.log("added review resource to user: " , resource1)
                        })
                    .catch(() => {
                        console.log('failed to add review resource to users')
                    })

                    fetch(reviewResponse._links.course.href,{
                        method: 'PUT',
                        headers: new Headers({
                            'Authorization': sessionStorage.getItem('token'),
                            'Content-Type': 'text/uri-list'}),
                        body: course._links.self.href
                    }).then(response => {
                       return  response.json().then( resource2 => {
                         console.log("added review resource to course: " , resource2)
                        })
                    }
                    ).catch(() => {
                        console.log('failed to add review resource to courses')
                    })
                    console.log(result)
                    history.push(`/courses/${id}`)    

                })
                
               
                
            
        //setReview(formData);
    
       // console.log(currentProgramId);

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
          value={review.rating}
          label="Rating"
          name="rating"
          onChange={handleChange}
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
  value={review.reviewText}
  className={classes.textArea}
  onChange={handleChange}
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