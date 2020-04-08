import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Grid, TableHead, TableContainer, TableCell, TableBody, TableRow, Link, Button, CircularProgress, ListItemText, List , ListItem, makeStyles, Divider} from '@material-ui/core';
import { SimpleRating } from './simple-rating';
import moment from 'moment';
import history from './history';
import { headers, API_BASE_URL } from '../constants';
import { TuitionDialog } from './tuition-dialog';

const useStyles = makeStyles((theme) => ({
    grid : {
        marginBottom: 20
    }
    
  }));

export const Course = () => {
    const classes = useStyles();
    const [course, setCourse] = React.useState({});
    const { id } = useParams();
    const [reviews, setReviews]=React.useState([]);
    const [isLoading, setIsLoading]= React.useState(true);
    const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

    React.useEffect(() => {
        fetch(`${API_BASE_URL}/courses/${id}`).then(
            response => response.json()).then(result => {
                setCourse(result);
                setIsLoading(false)
                console.log('programs',result);
            });

    }, [])


    React.useEffect(()=> {

        fetch(`${API_BASE_URL}/courses/${id}/reviews`,
        {
            method: 'GET',

        }).then(
            response => response.json()).then(result => {
                setReviews(result._embedded.reviews);
                console.log('reviews',result);
              
            });
    }, [])
   
    const handleReview = () => {
        history.push('/course/' + id + '/reviews');
    }

  if (isLoading) return (<Grid alignContent='center'><CircularProgress disableShrink  alignitems='center'/></Grid>)
  else return  (
        <>
        <Grid container  spacing={1}>
            <Grid container item xs={6}>
          <Box>
           <Typography variant="h6" color='primary'>{course.programName}</Typography><SimpleRating value={course.averageReview}/>
           <List>
          {course.programDetails.map(( section, index) => {
              return (<ListItem>
                  <ListItemText primary={section}></ListItemText>
              </ListItem>)

          })} 
          </List>
           </Box>
           </Grid>
           <Grid container item xs={2}/>
           <Grid item xs={4} >
               <TableContainer>
                   <TableHead>
                       <TableRow>
                       <TableCell><Typography variant="h6">Program Links</Typography></TableCell>
                       </TableRow>
                       </TableHead>
                       <TableBody >
                           <TableRow>
                           <TableCell><Typography><Link href={course.website}>{course.programName + ' Website'}</Link></Typography></TableCell>
                           </TableRow>
                           <TableRow>
                           <TableCell><Typography><Link href={course.email}>{course.programName + ' Email'}</Link></Typography></TableCell>
                           </TableRow>
                           <TableRow>
                           <TableCell><Button  color="primary" onClick={handleClickOpen}>
        Click to see tuition info
      </Button></TableCell>
      <TuitionDialog  open={open} schoolName={course.schoolName} handleClose={handleClose} tuitioninfo={course.tuitionCost} />
                           </TableRow>
                       </TableBody>
                   
               </TableContainer>
               </Grid>
               <Grid>
             </Grid>
             <Grid container className={classes.grid}>
                 <Grid item xs={4}>
               
                <Typography variant='h6'>Student reviews</Typography>
            
               </Grid>
               <Grid item xs={2}>
               <Button  color='primary' variant='contained' onClick={handleReview}>Add a Review</Button>
               </Grid>
               </Grid>
               
                   { reviews && reviews.map((review) => {
                     return (<Grid key={review._links.self.href} container  alignitems='center' spacing={2} >
                         <Divider />
                         <Grid item xs={false} />
                       <SimpleRating value={review.rating}  />
                     <Grid item xs={2}>{review.username}</Grid>
                     <Grid item xs={2}>{review.reviewText}</Grid>
                     <Grid item xs={2}>{moment(review.createdTime).format('MMMM Do YYYY')}</Grid>
                     </Grid>)
                   })}
               
               </Grid>
            
            </>
           )
}