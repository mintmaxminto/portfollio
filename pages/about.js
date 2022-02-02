import React from 'react';
import { Row, Col } from 'reactstrap';

import BasePage from '../components/BasePage/BasePage';
import BaseLayout from '../components/layouts/BaseLayout';

class About extends React.Component {
    render() {
        return (
            <BaseLayout title='Waqas Hassan | Learn More About Me' {...this.props.auth}>
                <BasePage className='about-page'>
                    <Row className='mt-5'>
                        <Col md='6'>
                            <div className='left-side'>
                                <h1 className='title fadein'>Hello, Welcome</h1>
                                <h4 className='subtitle fadein'>To About Page</h4>
                                <p className='subsubTitle fadein'>Feel free to read short description about me.</p>
                            </div>
                        </Col>
                        <Col md='6'>
                            <div className='fadein'>
                                <p>My name is Waqas Hassan and I am an experienced software developer and freelancer developer.</p>
                                <p>
                                    I have a Bachelor's Degree in Science of Computer Science. I have working experience on JAVA, C#, JavaScript
                                    and MERN Stack as well.
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                    In metus vulputate eu scelerisque felis imperdiet. Eget aliquet nibh praesent tristique magna sit. 
                                    Vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique. Lacinia at quis risus sed vulputate odio. 
                                    Sem viverra aliquet eget sit.
                                </p>
                            </div>
                        </Col>
                    </Row>
                </BasePage>
            </BaseLayout>
        )
    }
}

export default About