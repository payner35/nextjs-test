import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Loading from '../loading';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Assignment from '@material-ui/icons/Assignment';
import Work from '@material-ui/icons/Work';
import Publish from '@material-ui/icons/Publish';
import CheckCircle from '@material-ui/icons/CheckCircle';
import ListItemText from '@material-ui/core/ListItemText';
import find from 'lodash/find';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { Image } from 'cloudinary-react';
import { makeStyles } from '@material-ui/styles';
import Router from 'next/router';
import { withAuth, withLoginRequired } from 'use-auth0-hooks';
import FlipMove from 'react-flip-move';

import SearchInput, {createFilter} from 'react-search-input';



export const useStyles = makeStyles(theme => ({
   root:{
        //color: theme.palette.text.secondary,
        flexGrow: 1,
    },
    mainHeader:{
        padding: 10,
        paddingTop: 25
    },
    avatar: {
      width: 35,
      height: 35
    },
    myListItemStyle: {
        "&$selected": {
          backgroundColor: theme.palette.text.secondary
        }
      },
    selected: {},
    dormant:{
      color: '#f44336'
    },
    checkbox: {
      color: '#43a047'
    },
    searchBox:{
        paddingLeft: 10,
        paddingRight: 10
    },
    paper:{
        marginTop: 20,
        padding: '5px 0px'
    }
}));


const KEYS_TO_FILTERS = ['globalObjectLangs.title', 'contentToDos.user.email', 'template.title'];


const AllGlobalObjects = ({globalObjects, projectId, auth}) => {

    const classes = useStyles({});
    const searchInput = React.createRef();
    const { user } = auth; 
    const [searchTerm, setSearchTerm] = React.useState("");
    const [selectedItem, setSelectedItem] = React.useState("");
    
    
    const _goObject = (someObject) => {
        setSelectedItem(someObject.id);
        Router.push(
          `/content/[projectId]/[contentId]`, 
          `/content/${projectId}/${someObject.id}`
        );
    };
    
    const _searchUpdated = (term) => {
        setSearchTerm(term);
    };

    const _isThisSignedOff = (hit) => {
        //signoff ints [0: work in progress, 1: ready for sign off, 2: ready publish, 3: live]

        switch (hit.signOff) {
          case 0:
            return <Work />;
          case 1:
            return <Assignment />;
          case 2:
            return <Publish />;
          case 3:
            return <CheckCircle className={classes.checkbox} />;
          default:
            return <Assignment/>;
        }
    } ; 

    const _isSomethingAssignedToMe = (hit) => {
      //if a todo is assigned to me.. then show my icon for reference

      if(hit.signOff >=3) return <div></div>; //if its closed.. then no need to assign

      //get my logged in name
      const myEmail = user.email;  
      const iHaveSomethingToDo = find(hit.contentToDos, ['user.email', myEmail]);
    
      //only interested in items that are not marked complete
      return (iHaveSomethingToDo)? 
      (
        <Avatar onClick={this._filterByText.bind(this, myEmail)}
          alt={iHaveSomethingToDo &&
              iHaveSomethingToDo.user &&
              iHaveSomethingToDo.user.email} 
          src={iHaveSomethingToDo &&
               iHaveSomethingToDo.user &&
               iHaveSomethingToDo.user.avatar} 
              className={classes.avatar} />
      ) :
      (<div></div>)
    }  

    const _filterByText = (hit)=> {
      searchInput.current.state.searchTerm = hit;
      _searchUpdated(hit);
    }
 
    const filteredContent = (
              globalObjects
              .filter(createFilter(searchTerm, KEYS_TO_FILTERS)) || []);
        
    return (
        <Box className={classes.root}>
          <Paper className={classes.paper}>
          <SearchInput 
            placeholder="Power Search" 
            className="search-input" 
            ref={searchInput}
            onChange={_searchUpdated} />
          <List component="nav">
          <FlipMove 
                staggerDurationBy="30"
                duration={500}>
          {filteredContent.map((hit, i) => {
              return (
                <Box key={i}>
                <ListItem  
                    button 
                    selected={selectedItem === hit.id}
                    onClick={_goObject.bind(this, hit)}>
                <ListItemIcon>
                  {_isThisSignedOff(hit)}
                </ListItemIcon>
                <Box mr={2}>
                <Image
                    cloudName={process.env.REACT_APP_CLOUDINARY_DOMAIN}
                    transformation={"microThumb"}
                    //responsive
                    publicId={
                        (hit.mainImage.length > 4)?
                            hit.mainImage : 'goContent%20assets/microThumb.png'
                    }
                  />
                </Box>
                <ListItemText
                  primary={hit.globalObjectLangs[0].title}
                  secondary={hit.globalObjectLangs[0].shortDescription}
                />
                
                <ListItemSecondaryAction>
                  <Box display="flex" flexDirection="row" alignItems="center" px={2}>
                    <ListItemAvatar>
                      {_isSomethingAssignedToMe(hit)}
                    </ListItemAvatar>
                    <Chip onClick={_filterByText.bind(this, hit.template.title)} label={hit.template && hit.template.title} className={classes.chip} variant="outlined" />
                  </Box>
                  
                </ListItemSecondaryAction>
              </ListItem>
              <Divider variant="inset" light={true} component="li" />
              </Box>
              );
            })}
          </FlipMove>
          </List>
          </Paper>
        </Box>
    );
        
}



export default withLoginRequired(
  withAuth(AllGlobalObjects)
);  
