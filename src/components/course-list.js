import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { Avatar, ListItemAvatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: '50%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

function ListItemLink(props) {
  return <ListItem button component={Link} {...props} />;
}

export const CourseList = ({ data }) => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {data.map((course) => <><ListItem key={course._links.self.href} alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={course.schoolName} src={course.img} />
        </ListItemAvatar>
        <ListItemLink to={'/degreePrograms/' + course._links.self.href.substr(course._links.self.href.lastIndexOf('/') + 1)}>
          <ListItemText
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
               { !course.greRequired && (<Alert variant="outlined" severity="info">
                   <AlertTitle><Typography>GRE is not Required</Typography></AlertTitle>
              </Alert>) }
              </React.Fragment>
            }
          />
        </ListItemLink>

      </ListItem>
        <Divider /></>)}
    </List>
  );
}
