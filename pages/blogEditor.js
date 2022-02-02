import React from 'react';
import { Router } from '../routes';
import { toast } from 'react-toastify';

import BasePage from '../components/BasePage/BasePage';
import BaseLayout from '../components/layouts/BaseLayout';
import SlateEditor from '../components/slate-editor/Editor';
import withAuth from '../components/hoc/withAuth';
import { createBlog } from '../actions';
import head from 'next/head';

class BlogEditor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isSaving: false,
            lockId: Math.floor(1000 + Math.random() * 9000)
        }

        this.saveBlog = this.saveBlog.bind(this);
    }

    saveBlog(story, heading) {
        const { lockId } = this.state;
        const blog = {};
        blog.title = heading.title;
        blog.subTitle = heading.subTitle;
        blog.story = story;
        this.setState({ isSaving: true })
        createBlog(blog, lockId).then(createdBlog => {
            toast.success("🦄 Blog Saved Successfully");
            this.setState({ isSaving: false });
            Router.pushRoute(`/blogs/${createdBlog._id}/edit`)
        }).catch(err => {
            this.setState({ isSaving: false });
            const message = err.message || 'Server Error';
            toast.error('Something is Missing!');
            console.log(message);
        })
    }

    render() {
        const { isSaving } = this.state;

        return (
            <BaseLayout {...this.props.auth}>
                <BasePage containerClass="editor-wrapper" className="blog-editor-page">
                   <SlateEditor isLoading={isSaving} save={this.saveBlog}/>
                </BasePage>
            </BaseLayout>
        )
    }
}

export default withAuth('siteOwner')(BlogEditor);