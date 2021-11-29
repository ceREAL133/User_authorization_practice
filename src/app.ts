import express from 'express';
import config from 'config';
import log from './logger';
import connect from './db/connect';
import routes from './routes';
import { deserializeUser } from './middleware';

const port = config.get('port') as number;

const app = express();
app.use(deserializeUser);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(process.env.PORT || 3000, () => {
  log.info(`Server listening at http://localhost:${port}`);

  connect();
  routes(app);
});
