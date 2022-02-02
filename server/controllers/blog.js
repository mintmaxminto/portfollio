const Blog = require('../models/blog');
const AsyncLock = require('async-lock');
const slugify = require('slugify');

const lock = new AsyncLock();

exports.getBlogById = (req, res) => {
    const blogId = req.params.id;

    Blog.findById(blogId, (err, foundedBlog) => {
        if(err) {
            return res.status(422).send(err);
        }

        return res.json(foundedBlog);
    })
}

exports.createBlog = (req, res) => {
    const lockId = req.query.lockId;

    if(!lock.isBusy(lockId)) {
        lock.acquire(lockId, function(done) {
            const blogData = req.body;
            const blog = new Blog(blogData);
            if(req.user) {
                blog.userId = req.user.sub;
                blog.author = req.user.nickname;
            }

            blog.save((err, createdBlog) => {
                setTimeout(() => done(), 5000);

                if(err) {
                    return res.status(422).send(err);
                }

                return res.json(createdBlog);
            })
        }, function(err, ret) {
            err && console.error(err);
        })
    } else {
        return res.status(422).send({message: 'Blog is Saving!'});
    }
}

exports.updateBlog = (req, res) => {
    const blogData = req.body;

    Blog.findById(req.params.id, function(err, foundBlog) {
        if(err) {
            return res.status(422).send(err);
        }

        if(blogData.status && blogData.status === 'published' && !foundBlog.slug) {
            foundBlog.slug = slugify(foundBlog.title, {
                                    replacement: '-',
                                    remove: null,
                                    lower: true
                                })
        }

        foundBlog.set(blogData);
        foundBlog.updatedAt = new Date();
        foundBlog.save(function(err, updatedBlog) {
            if(err) {
                return res.status(422).send(err);
            }

            return res.json(updatedBlog);
        })
    })
}

exports.getUserBlogs = (req, res) => {
    Blog.find({userId: req.user.sub}, function(err, userBlogs) {
        if(err) {
            return res.status(422).send(err)
        }

        return res.json(userBlogs)
    })
}

exports.deleteBlog = (req, res) => {
    const blogId = req.params.id;

    Blog.deleteOne({_id: blogId}, (err) => {
        if(err) {
            return res.status(422).send(err);
        }

        return res.json({status: 'DELETED!'});
    })
}

exports.getPublishedBlogs = (req, res) => {
    Blog.find({status: 'published'})
        .sort({'createdAt': -1})
        .exec((err, publishedBlogs) => {
            if(err) {
                return res.status(422).send(err);   
            }
    
            return res.json(publishedBlogs);
        })
}

exports.getBlogBySlug = (req, res) => {
    const slug = req.params.slug;

    Blog.findOne({slug}, (err, foundedBlog) => {
        if(err) {
            return res.status(422).send(err);   
        }
        
        return res.json(foundedBlog)
    })
}