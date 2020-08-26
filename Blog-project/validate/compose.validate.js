module.exports.create = function(req, res, next) {
    var errors = [];
    if (!req.body.title) {
        errors.push("Title is required");
    }

    if (!req.body.content) {
        errors.push('Body is required');
    }

    if (errors.length) {
        res.render("compose", {
            errors: errors
        });
        return;
    }

    next();
};