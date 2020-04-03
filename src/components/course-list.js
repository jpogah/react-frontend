import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { Avatar, ListItemAvatar,Grid, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Alert, AlertTitle } from '@material-ui/lab';
import { SimpleRating } from './simple-rating';

const useStyles = makeStyles(theme => ({
  root: {
    width: '200ch',
  //  maxWidth: '50%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

function ListItemLink(props) {
  return <ListItem button component={Link} {...props} />;
}

export const CourseList = ({ data, links, setState }) => {
  const classes = useStyles();

  return (
    <>
    <List className={classes.root}>
      {data.map((course) => 
      <Grid container key={course._links.self.href} direction='column'>
        <Grid item xs={8}>
      <ListItem key={course._links.self.href} alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={course.schoolName} src={course.img} />
        </ListItemAvatar>
        <ListItemLink to={'/courses/' + course._links.self.href.substr(course._links.self.href.lastIndexOf('/') + 1)}>
          <ListItemText component='div'
            primary={course.programName}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {course.schoolName + ', '}
                </Typography>
                {course.city + ', ' + course.state}
              </React.Fragment>
            }
          />
        </ListItemLink>
      </ListItem>
      </Grid>
      <Grid  item xs={2}>
      { !course.greRequired && (<Alert variant="outlined" severity="info">
                   <AlertTitle><Typography>GRE is not Required</Typography></AlertTitle>
              </Alert>) }
              <SimpleRating value={course.rating}/>
      </Grid>
      </Grid>
      )}
    </List>
    <Grid>
     {links.first &&  (<Button color="primary"  onClick={()=> {setState({url:links.first.href})}}>&lt;&lt;</Button>)}
    
     {links.prev &&  (<Button color="primary"  onClick={()=> {setState({url:links.prev.href})}}>&lt;</Button>)}
    
    
     {links.next &&  (<Button color="primary"  onClick={()=> {setState({url: links.next.href})}}>&gt;</Button>)}
    
     {links.last &&  (<Button color="primary"  onClick={()=> {setState({url:links.last.href})}}>&gt;&gt;</Button>)}
     </Grid>
     </>
    
  );
}
