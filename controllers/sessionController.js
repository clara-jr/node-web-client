// MW de autorización de accesos HTTP restringidos
exports.loginRequired = function(req, res, next){
    if (req.session.user) {
        console.log("login ok");
        next();
    } else {
        console.log("login not ok");
        res.redirect('/');
    }
};

// Get /login   -- Formulario de login
exports.index = function(req, res) {
    var errors = req.session.errors || {};
    console.log("Error: " + errors.message);
    req.session.errors = {};
    res.render('index', {title: "Welcome", errors: errors});
};

// POST /login   -- Crear la sesion si usuario se autentica
exports.login = function(req, res) {
    console.log('POST');
    console.log(req.body);
    if (req.body.login && req.body.password) {
        if (req.body.login === "admin" && req.body.password === "password") {
            req.session.user = {id:req.body.login};
            console.log(req.session.user);
        } else {
            req.session.errors = {"message": 'Incorrect user or password'};
            console.log(req.session.errors);
            console.log(req.session.errors.message);
        }
    } else {
        req.session.errors = {"message": 'Required inputs can not be empty'};
        console.log(req.session.errors);
        console.log(req.session.errors.message);
    }
    res.redirect('/');
};

// DELETE /logout   -- Destruir sesion 
exports.logout = function(req, res) {
    delete req.session.user;
    res.redirect('/');
};