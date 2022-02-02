const Portfolio = require('../models/portfolio');

exports.getPortfolios = (req, res) => {
    Portfolio.find({})
        .sort({'startDate': 1})
        .exec((err, allPortfolios) => {
            if(err) {
                return res.status(422).send(err);
            }
    
            return res.json(allPortfolios);
    })
}

exports.savePortfolio = (req, res) => {
    const portfolioData = req.body;
    const userId = req.user && req.user.sub;

    const portfolio = new Portfolio(portfolioData);
    portfolio.userId = userId;
    portfolio.save((err, createdPortfolio) => {
        if(err) {
            return res.status(422).send(err);
        }

        return res.json(createdPortfolio);
    });

}

exports.getPortfolio = (req, res) => {
    Portfolio.findById(req.params.id)
             .select('-__v')
             .exec((err, foundPortfolio) => {
        if(err) {
            return res.status(422).send(err);
        }
        
        return res.json(foundPortfolio);
    })
}


exports.updatePortfolio = (req, res) => {
    const portfolioId = req.params.id;
    const portfolioData = req.body;
    
    Portfolio.findById(portfolioId, (err, foundedPortfolio) => {
        if(err) {
            return res.status(422).send(err);
        }

        foundedPortfolio.set(portfolioData);
        foundedPortfolio.save((err, updatedPortfolio) => {
            if(err) {
                return res.status(422).send(err);
            }

            return res.json(updatedPortfolio)
        })
    })
}


exports.deletePortfolio = (req, res) => {
    const portfolioId = req.params.id;

    Portfolio.deleteOne({_id: portfolioId}, (err, deletedPortfolio) => {
        if(err) {
            return res.status(422).send(err);
        }

        return res.json({status: 'DELETED!'});
    })
}