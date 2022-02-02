import React from 'react';
import { withRouter } from 'next/router';

import BasePage from '../components/BasePage/BasePage';
import BaseLayout from '../components/layouts/BaseLayout';

import auth0 from '../services/auth0';


class Callback extends React.Component {

    async componentDidMount() {
        await auth0.handleAuthentication();
        this.props.router.push('/');
    }

    render() {
        return (
            <BaseLayout>
                <BasePage>
                    <h1>Verifying User.....</h1>
                </BasePage>
            </BaseLayout>
            
        )
    }
}

export default withRouter(Callback);