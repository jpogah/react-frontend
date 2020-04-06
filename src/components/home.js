import { CourseList } from "./course-list";
import React from 'react';
import Search from "./search";
import { Button, Grid } from "@material-ui/core";



export const Home = ({setSearchTerm,setLocation, courses, handleSearch, setState, links, searchTerm, location}) => {
    return (
        <>
        <Grid container direction='column'   >
           <Grid container item  >
         <Search setSearchTerm={setSearchTerm} setLocation={setLocation}  searchTerm={searchTerm} location={location} onSearch={handleSearch} />
         </Grid> 
         <Grid item   direction='column'>
             <Grid item>
         {courses && courses.length > 0 && (<div><CourseList setState={setState} links={links} data={courses} /></div>)}
         </Grid>
        
         </Grid>
         </Grid>
         
        </>

    )

}