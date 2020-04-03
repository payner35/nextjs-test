import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Router from 'next/router';


export const useStyles = makeStyles(theme => ({
  navButton: {
    textTransform: 'none',
    fontSize: 15,
    fontWeight: 500,
    marginLeft: 8,
    marginRight: 8  
  },
  logo:{
    fontSize: '1.1rem',
    letterSpacing: '-.3px',
    fontWeight: '500',
    paddingLeft: 13
  },
  navigation: {
     zIndex:'40000',
     backgroundColor: '#F2F6FC',
     paddingTop: 10,
     height: 69
  },
  avatar:{
      width: 30,
      height: 30
  }
}));




const TopNav = ({projectId, user, loading}) => {

  const classes = useStyles({});
    
  return (
      <div className={classes.navigation} >
        <Box 
          px={2}
          display="flex"
          alignItems="center">
          <Box flexGrow={1}>
              <Typography variant="h4" component="h4" className={classes.logo}>
                GO CONTENT
              </Typography>
          </Box>
          <Box flexGrow={0}>
                <Button 
                  className={classes.navButton} 
                  onClick={() => Router.push(`/${params.projectId}/project`)}
                  color="inherit">project</Button>
              <Button 
                  className={classes.navButton} 
                  onClick={() => Router.push(`/${params.projectId}/content`)}
                  color="inherit">content</Button>

              <Button 
                  className={classes.navButton} 
                  onClick={() => Router.push(`/${params.projectId}/sitemap`)}
                  color="inherit">sitemap</Button>

              <Button 
                  className={classes.navButton} 
                  onClick={() => Router.push(`/${params.projectId}/team`)}
                  color="inherit">team</Button>  

                <IconButton
                  //onClick={_openUserMenu}
                  //aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  color="inherit">
                  <Avatar alt=" " src={user.picture} className={classes.avatar} />
              </IconButton>       

          </Box>
        </Box>
      </div>  
      );
};
  

export default TopNav;

   
   