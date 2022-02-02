import React from 'react';
import moment from 'moment';
import { Row, Col } from 'reactstrap';

import { createPortfolio } from '../actions';
import PortFolioForm from '../components/portfolio/PortfolioForm';
import withAuth from '../components/hoc/withAuth';
import BasePage from '../components/BasePage/BasePage';
import BaseLayout from '../components/layouts/BaseLayout';
import { Router } from '../routes';

const INITIAL_VALUES = { 
    title: '', 
    company: '', 
    location: '', 
    position: '', 
    description: '', 
    startDate: moment(), 
    endDate: moment()
};

class NewPortfolio extends React.Component {

    constructor(props) {
        super();

        this.state = {
            error: undefined
        }

        this.savePortfolio = this.savePortfolio.bind(this);
    }

    savePortfolio(portfolioData, {setSubmitting}) {
        setSubmitting(true);

        createPortfolio(portfolioData)
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

        return (
            <BaseLayout {...this.props.auth}>
                <BasePage className='portfolio-create-page' title="Create New Portfolio">
                    <Row>
                        <Col md='6'>
                            <PortFolioForm initialValues={INITIAL_VALUES} error={error} onSubmit={this.savePortfolio}/>
                        </Col>
                    </Row>
                </BasePage>
            </BaseLayout>
        )
    }
}

export default withAuth('siteOwner')(NewPortfolio);