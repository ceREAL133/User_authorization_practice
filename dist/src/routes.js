"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("./controller/user.controller");
const session_controller_1 = require("./controller/session.controller");
const post_controller_1 = require("./controller/post.controller");
const user_schema_1 = require("./schema/user.schema");
const post_schema_1 = require("./schema/post.schema");
const middleware_1 = require("./middleware");
function routes(app) {
    app.get("/healthcheck", (req, res) => {
        res.sendStatus(200);
    });
    // register user
    app.post("/api/users", (0, middleware_1.validateRequest)(user_schema_1.createUserSchema), user_controller_1.createUserHandler);
    // get users list
    app.get("/api/users", user_controller_1.getAllUsersHandler);
    // get user by id
    app.get("/api/users/:userId", middleware_1.checkId, user_controller_1.getUserByIdHandler);
    // delete user (by id)
    app.delete("/api/users/:userId", [middleware_1.requiresUser, middleware_1.checkId], user_controller_1.deleteUserHandler);
    // login
    app.post("/api/sessions", (0, middleware_1.validateRequest)(user_schema_1.createUserSessionSchema), session_controller_1.createUserSessionHandler);
    // get users session
    app.get("/api/sessions", middleware_1.requiresUser, session_controller_1.getUserSessionsHandler);
    // logout
    app.delete("/api/sessions", middleware_1.requiresUser, session_controller_1.invalidateUserSessionHandler);
    // create a post
    app.post("/api/posts", [middleware_1.requiresUser, (0, middleware_1.validateRequest)(post_schema_1.createPostSchema)], post_controller_1.createPostHandler);
    // update a post
    app.put("/api/posts/:postId", [middleware_1.requiresUser, (0, middleware_1.validateRequest)(post_schema_1.updatePostSchema)], post_controller_1.updatePostHandler);
    // get post
    app.get("/api/posts/:postId", post_controller_1.getSinglePostHandler);
    // get user's posts
    app.get("/api/posts/", middleware_1.requiresUser, post_controller_1.getPostsHandler);
    // delete a post
    app.delete("/api/posts/:postId", [middleware_1.requiresUser, (0, middleware_1.validateRequest)(post_schema_1.deletePostSchema)], post_controller_1.deletePostHandler);
}
exports.default = routes;
