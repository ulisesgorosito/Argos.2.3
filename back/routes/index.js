var express = require('express');

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

    console.log('INDEX SESSION:', req.session);

    if (req.session.id_usuario) {
        return res.render('index', {
            layout: 'layout',
            userName: req.session.user_name
        });
    }

    res.redirect('/admin/login');
});

router.get('/logout', function (req, res) {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

module.exports = router;