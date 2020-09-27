// req with auth token
const privateRoutes = {
    // 'GET /users': 'UserController.getAll',
};

const publicRoutes = {

    'GET /': 'static.isOnline',

};

module.exports.public = publicRoutes;

module.exports.private = privateRoutes;