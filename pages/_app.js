import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../util/theme';
import { CloudinaryContext } from 'cloudinary-react';
import { ApolloProvider } from '@apollo/react-hooks';
import { responsiveFontSizes } from '@material-ui/core/styles';
import { Auth0Provider } from "use-auth0-hooks";


const responsiveTheme = responsiveFontSizes(theme); //add responsive text

class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
          <CloudinaryContext cloudName="sonik" secure>
          <ThemeProvider theme={responsiveTheme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
         
            <Auth0Provider
              domain={process.env.AUTH0_DOMAIN}
              clientId={process.env.AUTH0_CLIENT_ID}
              redirectUri={process.env.REDIRECT_URI}>
              
              <Component {...pageProps} />

            </Auth0Provider>
          </ThemeProvider>
          </CloudinaryContext>  
      </React.Fragment>
    );
  }
}

export default MyApp;
