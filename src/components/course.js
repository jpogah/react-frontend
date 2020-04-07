import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Grid, TableHead, TableContainer, TableCell, TableBody, TableRow, Link, Button, CircularProgress, ListItemText, List , ListItem, makeStyles, Divider} from '@material-ui/core';
import { SimpleRating } from './simple-rating';
import moment from 'moment';
import history from './history';
import { headers, API_BASE_URL } from '../constants';

const useStyles = makeStyles((theme) => ({
    
  }));

export const Course = () => {
    const classes = useStyles();
    const [course, setCourse] = React.useState({});
    const { id } = useParams();
    const [reviews, setReviews]=React.useState([]);
    const [isLoading, setIsLoading]= React.useState(true);
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
        <Grid container  spacing={10}>
            <Grid container item xs={6}>
          <Box>
           <Typography variant="h6" color='secondary'>{course.programName}</Typography><SimpleRating value={course.averageReview}/>
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
                       </TableBody>
                   
               </TableContainer>
               </Grid>
               <Grid>
             </Grid>
             <Grid container>
                 <Grid item xs={8}>
               <Box marginLeft={5}>
                <Typography variant='h6'>Student reviews</Typography>
               </Box>
               </Grid>
               <Button  color='primary' variant='contained' onClick={handleReview}>Add a Review</Button>
               </Grid>
               
                   { reviews && reviews.map((review) => {
                     return (<Grid key={review._links.self.href} container  alignitems='center' spacing={3} >
                         <Divider />
                         <Grid item xs={false} />
                       <SimpleRating value={review.rating}  />
                     <Grid item>{review.username}</Grid>
                     <Grid item>{review.reviewText}</Grid>
                     <Grid item>{moment(review.createdTime).format('MMMM Do YYYY')}</Grid>
                     </Grid>)
                   })}
               
               </Grid>
            
            </>
           )
}