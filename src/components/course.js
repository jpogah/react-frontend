import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Grid, List, TableHead, TableContainer, TableCell, TableBody, TableRow, Link, Button, Divider, ListItem, ListItemText } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { SimpleRating } from './simple-rating';
import { fetchData } from './authentication-service';
import moment from 'moment';


const API_URL = 'http://localhost:8080/api/';

export const Course = () => {
    const [course, setCourse] = React.useState({});
    const { id } = useParams();
    const [reviews, setReviews]=React.useState([]);
    const [rating, setRating] = React.useState(0);
    
    React.useEffect(()=> {
        const res = fetchData(`${API_URL}course/rating?id=${id}`);
        console.log('res', res);
        setRating(res);

    }, [])


    React.useEffect(() => {
        fetch(`${API_URL}courses/${id}`).then(
            response => response.json()).then(result => {
                setCourse(result);
                console.log('programs',result);
            });

    }, [id])

    React.useEffect(()=> {

        fetch(`${API_URL}courses/${id}/reviews`).then(
            response => response.json()).then(result => {
                setReviews(result._embedded.reviews);
                console.log('reviews',result);
                setNoOfReviews(reviews.length);
            });
    }, [id])





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
           <Grid item xs={4} justify="flex-end">
               <TableContainer>
                   <TableHead>
                       <TableRow>
                       <TableCell><Typography variant="h6">Program Links</Typography></TableCell>
                       </TableRow>
                       </TableHead>
                       <TableBody>
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
               <Box>
               <Button  component={RouterLink} to={ '/' + id + '/reviews'} color='primary' variant='contained'>Add a Review</Button>
               </Box>
               </Grid>
               
                   { reviews && reviews.map((review) => {
                     return (<Grid container alignitems='center'  spacing={3} >
                         <Grid item xs={0} />
                       <Grid item><SimpleRating value={review.rating}/></Grid>
                     <Grid item>{review.username}</Grid>
                     <Grid item>{review.reviewText}</Grid>
                     <Grid item>{moment(review.createdTime).startOf('hour').fromNow()}</Grid>
                     </Grid>)
                   })}
               
               </Grid>
            
            </>
           )
}