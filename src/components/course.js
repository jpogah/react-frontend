import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Grid, List, TableHead, TableContainer, TableCell, TableBody, TableRow, Link } from '@material-ui/core';


export const Course = () => {
    const [course, setCourse] = React.useState({});
    const { id } = useParams();

    React.useEffect(() => {
        fetch(`/api/degreePrograms/${id}`).then(
            response => response.json()).then(result => {
                setCourse(result);
                console.log('programs',result);
            })
    }, [id])


    return (
        <Grid container spacing={3}>
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
           </Grid>)
}