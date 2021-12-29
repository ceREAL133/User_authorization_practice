"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const logger_1 = __importDefault(require("./logger"));
const connect_1 = __importDefault(require("./db/connect"));
const routes_1 = __importDefault(require("./routes"));
const middleware_1 = require("./middleware");
const port = config_1.default.get('port');
const app = (0, express_1.default)();
app.use(middleware_1.deserializeUser);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.listen(process.env.PORT || 3000, () => {
    logger_1.default.info(`Server listening at http://localhost:${port}`);
    (0, connect_1.default)();
    (0, routes_1.default)(app);
});
