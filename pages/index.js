import React from 'react';
import Typed from 'react-typed';
import BaseLayout from '../components/layouts/BaseLayout';
import { Button, Container, Row, Col } from 'reactstrap';

class index extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isFlipping: false
        }

        this.roles = ['Developer', 'Tech Lover', 'Team Player', 'React.JS', 'Node.JS', 'Next JS', 'MERN Stack'];
    }

    componentDidMount() {
        this.animateCard();
    }

    componentWillUnmount() {
        this.cardAnimationInterval && clearInterval(this.cardAnimationInterval);
    }

    animateCard() {
        this.cardAnimationInterval = setInterval(() => {
            this.setState({
                isFlipping: !this.state.isFlipping
            })
        }, 5000)
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;
        const { isFlipping } = this.state;

        return (
            <BaseLayout className={`cover ${isFlipping ? 'cover-1' : 'cover-0'}`} 
                        {...this.props.auth} headerType='index'
                        title='Waqas Hassan | Portfolio'
                        >
                <div className="main-section">
                    <div className="background-image">
                        <img alt='background image' src="/static/images/background-index.png" />
                    </div>
                
                    <Container>
                        <Row>
                            <Col md="6">
                                <div className="hero-section">
                                    <div className={`flipper ${isFlipping ? 'isFlipping': ''}`}>
                                        <div className="front">
                                            <div className="hero-section-content">
                                                <h2> Full Stack Web Developer </h2>
                                                <div className="hero-section-content-intro">
                                                Have a look at my portfolio and job history.
                                                </div>
                                            </div>
                                            <img className="image" alt='Full Stack Web Developer' src="/static/images/section-1.jpg"/>
                                            <div className="shadow-custom">
                                                <div className="shadow-inner"> </div>
                                            </div>
                                        </div>
                                        <div className="back">
                                            <div className="hero-section-content">
                                                <h2> Get Your Projects Done </h2>
                                                <div className="hero-section-content-intro">
                                                    Professional and top quality Services in MERN Stack and React Native.
                                                </div>
                                            </div>
                                            <img className="image" alt='Get Your Projects Done' src="/static/images/section-2.jpg"/>
                                            <div className="shadow-custom shadow-custom-2">
                                                <div className="shadow-inner"> </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col md="6" className="hero-welcome-wrapper">
                                <div className="hero-welcome-text">
                                    <h1>
                                        { isAuthenticated && <span><b>{user.nickname}</b> </span>}
                                        Welcome to the portfolio website of Waqs Hassan.
                                        Get informed, collaborate and discover projects I was working on through the years!
                                    </h1>
                                </div>
                                <Typed
                                    loop
                                    typeSpeed={60}
                                    backSpeed={60}
                                    strings={this.roles}
                                    backDelay={1000}
                                    loopCount={0}
                                    showCursor
                                    className="self-typed"
                                    cursorChar="|"
                                />
                                <div className="hero-welcome-bio">
                                    <h1>
                                        Let's take a look on my work.
                                    </h1>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    <span className='service-link'><a href="https://www.vecteezy.com/free-vector/programming">Programming Vectors by Vecteezy</a></span>
                </div>
            </BaseLayout>
          
        )
    }
}

export default index;