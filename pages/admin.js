import React from 'react';

import withAuth from '../components/hoc/withAuth';
import BasePage from '../components/BasePage/BasePage';
import BaseLayout from '../components/layouts/BaseLayout';


class Admin extends React.Component {
    render() {
        return (
            <BaseLayout {...this.props.auth}>
                <BasePage>
                    <h1>Admin Page</h1>
                </BasePage>
            </BaseLayout>
            
        )
    }
}

export default withAuth('siteOwner')(Admin);