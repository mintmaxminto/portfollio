import React from 'react';
import { Col, Row, Button } from 'reactstrap';
import { Router } from '../routes';

import BasePage from '../components/BasePage/BasePage';
import BaseLayout from '../components/layouts/BaseLayout';
import PortfolioCard from '../components/portfolio/PortfolioCard';
import { getPortfolios, deletePortfolio } from '../actions';

class Portfolios extends React.Component {

    static async getInitialProps(){
        let portfolios = [];

        try {
            portfolios = await getPortfolios(); 
        } catch (error) {
            console.error(error);
        }

        return { portfolios };
    }

    naviagteToEdit(portfolioId, e) {
        e.stopPropagation();
        Router.pushRoute(`/portfolios/${portfolioId}/edit`)
    }

    displayDeleteWarning(portfolioId, portfolioName, e) {
        e.stopPropagation();
        const isConfirm = confirm(`Are you sure you want to delete ${portfolioName} portfolio?`);

        if(isConfirm) {
            this.deletePortfolio(portfolioId);
        }
    }

    deletePortfolio(portfolioId) {
        deletePortfolio(portfolioId)
            .then(() => {
                Router.pushRoute('/portfolios')
            })
            .catch(err => console.log(err));
    }


    renderPortfolios(portfolios) {
        const { isAuthenticated, isSiteOwner } = this.props.auth;

        return portfolios.map((portfolio, index) => {
            return (
                <Col key={index} md="4">
                    <PortfolioCard portfolio={portfolio}>
                        {   isAuthenticated && isSiteOwner &&
                            <React.Fragment>
                                <Button onClick={(e) => this.naviagteToEdit(portfolio._id, e)} color="warning">Edit</Button>{' '}
                                <Button onClick={(e) => this.displayDeleteWarning(portfolio._id, portfolio.position, e)} color="danger">Delete</Button>
                            </React.Fragment>
                        }
                    </PortfolioCard>
                </Col>

            )
        })
    }

    render() {
        const { portfolios } = this.props;
        const { isAuthenticated, isSiteOwner } = this.props.auth;

        return (
            <BaseLayout title='Waqas Hassan | My Experience' {...this.props.auth}>
                <BasePage className='portfolio-page' title="Portfolios Page">
                    {    isAuthenticated && isSiteOwner &&
                        <Button onClick={() => Router.pushRoute('/portfolios/new')} color="success" className="create-port-btn">Create Portfolio</Button>
                    }
                    <Row>
                        { this.renderPortfolios(portfolios) }
                    </Row>
                </BasePage>
            </BaseLayout>
        )
    }
}

export default Portfolios;