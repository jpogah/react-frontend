import { CourseList } from "./course-list";
import React from 'react';
import Search from "./search";
import { Button, Grid } from "@material-ui/core";


const getUrl = (href) =>{
   return href.substr(href.indexOf('/api'));
}

export const Home = ({state, courses, handleChange, handleSearch, setState, links}) => {
    return (
        <>
         <Search state={state} onSearchChange={handleChange} onSearch={handleSearch} />
         {courses && courses.length > 0 && (<div><CourseList data={courses} /></div>)}
         <Grid container>
             <Grid item xs={4}/>
             <Grid item>
              {links.first &&  (<Button color="primary"  onClick={()=> {setState({url:getUrl(links.first.href)})}}>&lt;&lt;</Button>)}
             </Grid>
             <Grid item>
              {links.prev &&  (<Button color="primary"  onClick={()=> {setState({url:getUrl(links.prev.href)})}}>&lt;&lt;</Button>)}
             </Grid>
             <Grid item>
              {links.next &&  (<Button color="primary"  onClick={()=> {setState({url: getUrl(links.next.href)})}}>&gt;</Button>)}
             </Grid>
             <Grid item>
              {links.last &&  (<Button color="primary"  onClick={()=> {setState({url:getUrl(links.last.href)})}}>&gt;&gt;</Button>)}
             </Grid>
         </Grid>
         
        </>

    )

}