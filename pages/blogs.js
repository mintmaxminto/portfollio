import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import moment from 'moment';

import BasePage from '../components/BasePage/BasePage';
import BaseLayout from '../components/layouts/BaseLayout';
import { getPublishedBlogs } from '../actions';
import { shortenText } from '../helpers/utils';
import { Link } from '../routes';


class Blog extends React.Component {
    static async getInitialProps({req}) {
        let blogs = [];
        
        try {
            blogs = await getPublishedBlogs(req);
        } catch (error) {
            console.error(error);
        }

        return { blogs }
    }

    renderBlogs = (blogs) => (
        blogs.map((blog, index) => (
                <div key={index} className="post-preview">
                    <Link route={`/blogs/${blog.slug}`}>
                        <a>
                            <h2 className="post-title">
                                {blog.title}
                            </h2>
                            <h3 className="post-subtitle">
                                {shortenText(blog.subTitle, 80)}
                            </h3>
                        </a>
                    </Link>
                    <p className="post-meta">
                        Posted by <a href="#"> {blog.author} </a>
                        {moment.utc(blog.createdAt).local().format('LLLL')}
                    </p>
                </div>
            )
        )
    )

    render() {
        const { blogs } = this.props;
    
        return (
            <BaseLayout title='Waqas Hassan | My Published Blogs' {...this.props.auth} headerType={'landing'} className="blog-listing-page">
                <div className="masthead" style={{"backgroundImage": "url('/static/images/home-bg.jpg')"}}>
                    <div className="overlay"></div>
                    <Container>
                        <div className="row">
                            <div className="col-lg-8 col-md-10 mx-auto">
                                <div className="site-heading">
                                    <h1>Fresh Blogs</h1>
                                    <span className="subheading">Programming, travelling...</span>
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
                <BasePage className="blog-body">
                    <Row>
                        <Col md="10" lg="8" className="mx-auto">
                            {
                                this.renderBlogs(blogs)
                            }
                            <div className="clearfix">
                                <a className="btn btn-primary float-right" href="#">Older Posts &rarr;</a>
                            </div>
                        </Col>
                    </Row>
                
                    <footer>
                        <Container>
                            <Row>
                                <div className="col-lg-8 col-md-10 mx-auto">
                                    <ul className="list-inline text-center">
                                        <li className="list-inline-item">
                                            <a href="#">
                                                <span className="fa-stack fa-lg">
                                                    <i className="fas fa-circle fa-stack-2x"></i>
                                                    <i className="fab fa-twitter fa-stack-1x fa-inverse"></i>
                                                </span>
                                            </a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="#">
                                                <span className="fa-stack fa-lg">
                                                    <i className="fas fa-circle fa-stack-2x"></i>
                                                    <i className="fab fa-facebook-f fa-stack-1x fa-inverse"></i>
                                                </span>
                                            </a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a target='_blank' href="https://github.com/mintmaxminto">
                                                <span className="fa-stack fa-lg">
                                                    <i className="fas fa-circle fa-stack-2x"></i>
                                                    <i className="fab fa-github fa-stack-1x fa-inverse"></i>
                                                </span>
                                            </a>
                                        </li>
                                    </ul>
                                    <p className="copyright text-muted">Copyright &copy; Waqas Hassan 2022</p>
                                </div>
                            </Row>
                        </Container>
                    </footer>
                </BasePage>
                <style jsx>
                    {`
                        @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.5.0/css/all.min.css");
                    `}
                </style>
            </BaseLayout>
        )
    }
}

export default Blog;