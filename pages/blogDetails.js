import React from 'react';
import { Row, Col } from 'reactstrap';

import BasePage from '../components/BasePage/BasePage';
import BaseLayout from '../components/layouts/BaseLayout';
import { getBlogBySlug } from '../actions';

class BlogDetails extends React.Component {
    static async getInitialProps({query}) {
        let blog = {};
        const slug = query.slug;

        try {
            blog = await getBlogBySlug(slug);
        } catch (err) {
            console.error(err)
        }

        return {blog}
    }

    render() {
        const { blog } = this.props;
        
        return (
            <BaseLayout {...this.props.auth}>
                <BasePage className='blog-detail-page'>
                    <Row>
                        <Col md={{ size: 8, offset: 2 }}>
                            <div dangerouslySetInnerHTML={{ __html: blog.story }}></div>
                        </Col>
                    </Row>
                </BasePage>
            </BaseLayout>
        )
    }
}

export default BlogDetails;