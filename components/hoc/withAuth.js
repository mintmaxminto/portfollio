import React from "react";

import BasePage from '../BasePage/BasePage';
import BaseLayout from '../layouts/BaseLayout';

export default function(role) {
    return function(Component) {
        return class withAuth extends React.Component {
           static async getInitialProps(args) {
               const pageProps = await Component.getInitialProps && await Component.getInitialProps(args);
   
               return { ...pageProps };
           }
   
   
           renderProtectedPage() {
               const { isAuthenticated, user } = this.props.auth;
               const userRole = user && user[`${process.env.NAMESPACE}/role`];
               let isAuthorized = false;
   
               if(role) {
                   if (userRole && userRole == role) { isAuthorized = true }
               } else {
                   isAuthorized = true;
               }
   
               if(!isAuthenticated) {
                   return (
                       <BaseLayout {...this.props.auth}>
                           <BasePage>
                               <h1>Unauthorized. Please Login First.</h1>
                           </BasePage>
                       </BaseLayout>
                   )
               } else if (!isAuthorized) {
                   return (
                       <BaseLayout {...this.props.auth}>
                           <BasePage>
                               <h1>You are not authorized to access this Page.</h1>
                           </BasePage>
                       </BaseLayout>
                   )
               } else {
                   return (
                       <Component {...this.props}/>
                   )
               }
           }
      
            render() {
                return this.renderProtectedPage()
            }
        }
    }
}