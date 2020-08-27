const shortid = require('shortid');
var db = require('../db');


module.exports = function(req, res, next) {
    if (!req.signedCookies.sessionId) {
        const sessionId = shortid.generate();
        res.cookie('sessionId', sessionId, {
            signed: true
        });

        db.get('session').push({
            id: sessionId
        }).write();
    }

    next();
};