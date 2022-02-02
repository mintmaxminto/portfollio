const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const next = require('next');
const bodyParser = require('body-parser')
const routes = require('../routes');

// SERVICES
const authService = require('./services/auth');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = routes.getRequestHandler(app);
const config = require('./config')
const Book = require('./models/book');
const blogRoutes = require('./routes/blog');
const portfolioRoutes = require('./routes/portfolio');

const robotsOptions = {
    root: path.join(__dirname, "../static"),
    headers: {
        'Content-Type': 'text/plain;charset=UTF-8'
    }
}

const secretData = [
    {
        title: 'Data 1',
        description: 'sdfhdsfhsd'
    },
    {
        title: 'Data 2',
        description: 'sdflsgdfgdngfddmngfmdn'
    }
]

mongoose.connect(config.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database Connected'))
    .catch(err => console.log(err))

app.prepare()
    .then(() => {
        const server = express();

        server.use(bodyParser.json());

        server.use('/api/v1/portfolios', portfolioRoutes)
        server.use('/api/v1/blogs', blogRoutes);

        server.get('/robots.txt', (req, res) => {
            return res.status(200).sendFile('robots.txt', robotsOptions);
        })

        server.post('/api/v1/books', (req, res) => {
            const bookData = req.body;

            const book = new Book(bookData);

            book.save((err, book) => {
                if(err) {
                    return res.status(422).send(err);
                }

                return res.json(book);
            })
        })



        server.get('/api/v1/secret', authService.checkJWT, (req, res) => {
            return res.json(secretData);
        })

        server.get('/api/v1/admin', authService.checkJWT, authService.checkRole('siteOwner'), (req, res) => {
            return res.json(secretData);
        })

        server .get('*', (req, res) => {
            return handle(req, res);
        })

        server.use(function (err, req, res, next) {
            if (err.name === 'UnauthorizedError') {
              res.status(401).send({title: 'Unauthorized', detail: 'Unauthorized Access!'});
            }
        });
          
        const PORT = process.env.PORT || 3000;

        server.use(handle).listen(PORT, (err) => {
            if(err) throw err
            console.log('> Ready on port' + PORT)
        })
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })