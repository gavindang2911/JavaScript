const db = require('../db');

module.exports.index = (req, res) => {
    const page = +req.query.page || 1;
    const ITEMS_PER_PAGE = 9;
    // var start = (page-1)*ITEMS_PER_PAGE;
    // var end = page*ITEMS_PER_PAGE;

    var drop = (page-1)*ITEMS_PER_PAGE;

    res.render("product", {
    //   products: db.get('products').value().slice(start, end)
        products: db.get('products').drop(drop).take(ITEMS_PER_PAGE).value(),
        currentPage: page,
        hasNextPage: (ITEMS_PER_PAGE * page) < 100,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(100 / ITEMS_PER_PAGE)
    });
};