Tutorial from The Complete 2020 Web Development Bootcamp by Dr. Angela Yu

Learned from the lesson:
- How to use ejs template engines
    + app.set('view engine', 'ejs');

- Using body parser  
    + app.use(bodyParser.urlencoded({extended: true}));
    + req.body... to get infor from input method POST

- Render syntax 
    + res.render("/views/..", {x: x', y: y'});
    + res.redirect("/");

- When do search, remember the method is GET, input name is q represent for query, not a submit button
    + req.query.q to get infor from input method GET
 