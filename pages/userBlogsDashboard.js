import React from 'react';
import moment from 'moment';
import { toast } from 'react-toastify';
import { Container, Row, Col, Table, Button } from 'reactstrap';

import { Link, Router } from '../routes';
import withAuth from '../components/hoc/withAuth';
import ButtonDropdown from '../components/ButtonDropDown';
import BasePage from '../components/BasePage/BasePage';
import BaseLayout from '../components/layouts/BaseLayout';
import { getUserBlogs, updateBlog, deleteBlog } from '../actions';


class UserBlogsDashboard extends React.Component {
    static async getInitialProps({req}) {
        let blogs = [];

        try {
            blogs = await getUserBlogs(req);
            console.log(blogs);
        } catch (error) {
            console.error(error);
        }

        return {blogs};
    }

    changeBlogStatus(status, blogId) {
        updateBlog({status}, blogId).then(() => {
            Router.pushRoute('/userBlogsDashboard');
        }).catch(err => {
            console.error(err.message)
        })
    }

    deleteBlogWarning(blogId, blogTitle) {
        const res = confirm(`Are You Sure You Want To Delete ${blogTitle}`);

        if(res) {
            this.deleteBlog(blogId)
        }
    }

    deleteBlog(blogId) {
        deleteBlog(blogId).then(status => {
            Router.pushRoute('/userBlogsDashboard');
            toast.success("🦄 Blog Deleted Successfully!");
        }).catch(err => console.error(err.message))
    }

    createStatus(status) {
        return status === 'draft' ? { view: 'Publish Story', value: 'published' }
                                  : { view: 'Make Draft', value: 'draft'} 
    }

    dropdownOptions = (blog) => {
        const blogStatus = this.createStatus(blog.status);

        return [
            { text: blogStatus.view, handlers: { onClick: () => this.changeBlogStatus(blogStatus.value, blog._id)} },
            { text: 'Delete', handlers: { onClick: () => this.deleteBlogWarning(blog._id, blog.title) } }
        ]
    }
    

    render() {
        const { blogs } = this.props;

        return (
            <BaseLayout {...this.props.auth} headerType={'landing'}>
                <div className="masthead" style={{"backgroundImage": "url('/static/images/home-bg.jpg')"}}>
                <div className="overlay"></div>
                <Container>
                    <div className="row">
                    <div className="col-lg-8 col-md-10 mx-auto">
                        <div className="site-heading">
                        <h1>My Blogs</h1>
                        <span className="subheading">
                            <Link route='/blogs/new'>
                                <Button className='mt-3' color="secondary" size="lg">Create New Blog</Button>
                            </Link>
                        </span>
                        </div>
                    </div>
                    </div>
                </Container>
                </div>
                <BasePage className="blog-user-page">
                    <Row>
                        <Col md='12' className='max-auto text-center'>
                            <Table striped bordered responsive hover dark>
                                <thead>
                                    <tr>
                                    <th>Blog Title</th>
                                    <th>Blog Status</th>
                                    <th>Crated At</th>
                                    <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        blogs.map((blog, index) =>  
                                            (
                                                <tr key={index}>
                                                    <td> 
                                                        <Link route={`/blogs/${blog._id}/edit`}>
                                                            <a className='blog-title-a' style={{color: 'white'}}>{blog.title}</a>
                                                        </Link>
                                                    </td>
                                                    <td>{blog.status}</td>
                                                    <td>{moment.utc(blog.createdAt).local().format('DD MMMM YYYY HH:mm')}</td>
                                                    <td>
                                                       <ButtonDropdown items={this.dropdownOptions(blog)} />
                                                    </td>
                                                </tr>
                                            )
                                        
                                        )
                                    }
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </BasePage>
            </BaseLayout>
        )
    }
}

export default withAuth('siteOwner')(UserBlogsDashboard);