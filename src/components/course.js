import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Grid, TableHead, TableContainer, TableCell, TableBody, TableRow, Link, Button } from '@material-ui/core';
import { SimpleRating } from './simple-rating';
import moment from 'moment';
import history from './history';


const API_URL = 'http://localhost:8080/api/';

export const Course = ({newReview, setNewReview}) => {
    const [course, setCourse] = React.useState({});
    const { id } = useParams();
    const [reviews, setReviews]=React.useState([]);

    React.useEffect(() => {
        fetch(`${API_URL}courses/${id}`).then(
            response => response.json()).then(result => {
                setCourse(result);
                console.log('programs',result);
            });

    }, [id, newReview])

    React.useEffect(()=> {

        fetch(`${API_URL}courses/${id}/reviews`).then(
            response => response.json()).then(result => {
                setReviews(result._embedded.reviews);
                console.log('reviews',result);
              
            });
    }, [id, newReview])

    const handleReview = () => {
        setNewReview = setNewReview({ rating: 1,
            reviewText: '',
            username: ''});
        history.push('/' + id + '/reviews');
    }




    return (
        <>
        <Grid container spacing={10}>
            <Grid container item xs={6}>
          <Box>
           <Typography variant="h6">{course.programName}</Typography><SimpleRating value={course.rating}/>
           <Typography variant="body2">{course.programDetails}</Typography>
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
               {/* <Box>
               <Button  component={RouterLink} to={ '/' + id + '/reviews'} color='primary' variant='contained'>Add a Review</Button>
               </Box> */}

                <Button  color='primary' variant='contained' onClick={handleReview}>Add a Review</Button>
               </Grid>
               
                   { reviews && reviews.map((review) => {
                     return (<Grid key={review._links.self.href} container alignitems='center'  spacing={3} >
                         <Grid item xs={false} />
                       <Grid item><SimpleRating value={review.rating}/></Grid>
                     <Grid item>{review.username}</Grid>
                     <Grid item>{review.reviewText}</Grid>
                     <Grid item>{moment(review.createdTime).format('MMMM Do YYYY')}</Grid>
                     </Grid>)
                   })}
               
               </Grid>
            
            </>
           )
}