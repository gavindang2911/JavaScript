module.exports.create = function(req, res, next) {
    var errors = [];
    if (!req.body.postTitle) {
        errors.push("Title is required");
    }

    if (!req.body.postBody) {
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