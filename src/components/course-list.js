import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { Avatar, ListItemAvatar,Grid, Button, Divider } from '@material-ui/core';
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
  return <ListItem  button component={Link} {...props} />;
}

export const CourseList = ({ data, links, setCurrentUrl }) => {
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
            primary={<React.Fragment>
             <Button color='secondary'><Typography>{course.programName}</Typography></Button>
            </React.Fragment>}
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
      { !course.greRequired && (<Alert variant="outlined" color='primary' severity="info">
                   <AlertTitle><Typography color='primary'>GRE is not Required</Typography></AlertTitle>
              </Alert>) }
              <SimpleRating value={course.averageReview}/>
      </Grid>
      <Divider/>
      </Grid>
      )}
    </List>
    <Grid container spacing={2}>
      <Grid item>
     {links.first &&  (<Button color="secondary"  variant='contained' onClick={()=> {setCurrentUrl(links.first.href)}}>First</Button>)}
     </Grid>
     <Grid item>
     {links.prev &&  (<Button variant='contained' color="secondary"  onClick={()=> {setCurrentUrl(links.prev.href)}}>Prev</Button>)}
     </Grid>
     <Grid item>
     {links.next &&  (<Button color="secondary" variant='contained'  onClick={()=> {setCurrentUrl(links.next.href)}}>Next</Button>)}
     </Grid>
     <Grid item>
     {links.last &&  (<Button color="secondary"  variant='contained' onClick={()=> {setCurrentUrl(links.last.href)}}>Last</Button>)}
     </Grid>
     </Grid>
     </>
    
  );
}
