import { Typography, MenuItem, Select, FormControl, Grid, makeStyles, InputLabel, Button, TextareaAutosize } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import history from './history';
import { USER_NAME_SESSION_ATTRIBUTE_NAME } from './authentication-service';
import { headers } from '../constants';

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
  

export const Review = ({newReview, setNewReview}) => {
    const classes = useStyles();
    const [course, setCourse] = React.useState({});
    const { id } = useParams();
    const handleChange = (event) => {
        setNewReview({...newReview, [event.target.name]: event.target.value});
    }
    React.useEffect(() => {
        fetch(`${API_URL}courses/${id}`, {
            headers: headers,
            method: 'GET'
        }).then(
            response => response.json()).then(result => {
                setCourse(result);
                console.log('programs',result);
            })
    }, [id])

    const addReviewToCourse= ((courseReviewLink)=> {
        fetch(courseReviewLink,{
            method: 'PUT',
            headers: headers,
            body: course._links.self.href
        }).then( resource2 => {
             console.log("added review resource to course: " , resource2)
            })
        .catch(() => {
            console.log('failed to add review resource to courses')
        })
    })


    const addReviewToUser = ((userReviewLink) => {
        fetch(userReviewLink,{
            method: 'PUT',
            headers: headers,
            body:  sessionStorage.getItem('reviewLink')
            }).
        then((resource1) => {
             console.log("added review resource to user: " , resource1)
            })
        .catch(() => {
            console.log('failed to add review resource to users')
        })


    })


    const addReview = () => {
        newReview.username = sessionStorage.getItem('username');
        console.log('username', sessionStorage.getItem('username'));
        
        // update course
        
        fetch(`${API_URL}reviews`,{
            method: 'POST',
            headers: headers,
            body: JSON.stringify(newReview)}

            ).then(response => {return response.json()})
                .then( (result) => {
                 console.log('second result', result)
                  addReviewToCourse(result._links.course.href)
                  addReviewToUser(result._links.user.href);            
                console.log(result)
                history.push(`/courses/${id}`)    

                }).catch(()=> console.error("error posting review"))

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
          value={newReview.rating}
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
  value={newReview.reviewText}
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