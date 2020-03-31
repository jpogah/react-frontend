import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Grid, List, TableHead, TableContainer, TableCell, TableBody, TableRow, Link, Button, Divider } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';


const API_URL = 'http://localhost:8080/api/courses';

export const Course = () => {
    const [course, setCourse] = React.useState({});
    const { id } = useParams();

    React.useEffect(() => {
        fetch(`${API_URL}/${id}`).then(
            response => response.json()).then(result => {
                setCourse(result);
                console.log('programs',result);
            })
    }, [id])


    return (
        <>
        <Grid container spacing={10}>
            <Grid container item xs={6}>
          <Box>
           <Typography variant="h6">{course.programName}</Typography>
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
               </Grid>
            
            </>
           )
}