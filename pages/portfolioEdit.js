import React from 'react';
import { Row, Col } from 'reactstrap';

import { updatePortfolio, getPortfolio } from '../actions';
import PortFolioForm from '../components/portfolio/PortfolioForm';
import withAuth from '../components/hoc/withAuth';
import BasePage from '../components/BasePage/BasePage';
import BaseLayout from '../components/layouts/BaseLayout';
import { Router } from '../routes';

class portfolioEdit extends React.Component {

    static async getInitialProps({query}) {
        let portfolio = {};

        try {
            portfolio = await getPortfolio(query.id);
        } catch (error) {
            console.log(error);
        }

        return {portfolio};
    }

    constructor(props) {
        super();

        this.state = {
            error: undefined
        }

        this.updatePortfolio = this.updatePortfolio.bind(this);
    }

    updatePortfolio(portfolioData, {setSubmitting}) {
        setSubmitting(true);

        updatePortfolio(portfolioData)
            .then((portfolio) => {
                setSubmitting(false);
                this.setState({error: undefined});
                Router.pushRoute('/portfolios'); 
            })
            .catch((err) => {
                setSubmitting(false);
                const error = err.message || 'Server Error!';
                this.setState({error}) 
            })
    }

    render() {
        const { error } = this.state;
        const { portfolio } = this.props;

        return (
            <BaseLayout {...this.props.auth}>
                <BasePage className='portfolio-create-page' title="Update Portfolio">
                    <Row>
                        <Col md='6'>
                            <PortFolioForm initialValues={portfolio} error={error} onSubmit={this.updatePortfolio}/>
                        </Col>
                    </Row>
                </BasePage>
            </BaseLayout>
        )
    }
}

export default withAuth('siteOwner')(portfolioEdit);