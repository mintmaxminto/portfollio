import React from 'react';
import App, { Container } from 'next/app';
import { ToastContainer } from 'react-toastify';

import auth0 from '../services/auth0';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import  Fonts from '../helpers/Fonts';
import '../styles/main.scss';

export default class MyApp extends App {
    static async getInitialProps({ Component, router, ctx }) {
        let pageProps = {}
        const user = process.browser ? await auth0.clientAuth() : await auth0.serverAuth(ctx.req);

        if(Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }

        const isSiteOwner = user && user[process.env.NAMESPACE + '/role'] == 'siteOwner';
        // const userId = user && user.sub;
        const auth = { user, isAuthenticated: !!user, isSiteOwner };

        return { pageProps, auth }
    }

    componentDidMount() {
        //Fonts();
    }

    render() {
         const { Component, pageProps, auth }  = this.props

         return (
             <Container>
                <ToastContainer position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    theme='dark'
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover/>
                <Component {...pageProps} auth={auth}/>
             </Container>
         )
     }
}