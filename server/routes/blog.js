const express = require('express');
const router = express.Router();
const authService = require('../services/auth');

const blogCtrl = require('../controllers/blog');

router.get('', blogCtrl.getPublishedBlogs);

router.get('/myBlogs', authService.checkJWT, 
                authService.checkRole('siteOwner'),
                blogCtrl.getUserBlogs)

router.get('/:id', blogCtrl.getBlogById);

router.get('/s/:slug', blogCtrl.getBlogBySlug);

router.post('', authService.checkJWT, 
                authService.checkRole('siteOwner'), 
                blogCtrl.createBlog);

router.patch('/:id', authService.checkJWT, 
                authService.checkRole('siteOwner'), 
                blogCtrl.updateBlog);

router.delete('/:id', authService.checkJWT, 
                authService.checkRole('siteOwner'), 
                blogCtrl.deleteBlog);

module.exports = router;