import React from 'react';
import { Row, Col } from 'reactstrap';

import BasePage from '../components/BasePage/BasePage';
import BaseLayout from '../components/layouts/BaseLayout';

class CV extends React.Component {
    render() {
        return (
            <BaseLayout title='Waqas Hassan | My CV' {...this.props.auth}>
                <BasePage title='Preview of My CV' className='cv-page'>
                    <Row>
                        <Col md={{size: 8, offset: 2}}>
                            <div className='cv-title'>
                                <a 
                                    download='Waqas_Hassan.pdf' 
                                    className='btn btn-success' 
                                    href='/static/Waqas_Hassan.pdf'
                                >
                                    Download
                                </a>
                            </div>
                            <iframe 
                                style={{ width: '100%', height:'800px' }} 
                                src='/static/Waqas_Hassan.pdf'
                            >

                            </iframe>
                        </Col>
                    </Row>
                </BasePage>
            </BaseLayout>
        )
    }
}

export default CV;