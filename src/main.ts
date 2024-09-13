import 'dotenv/config';
import { AppModule } from './app.module';
import { bootstrap } from './utils/bootstrap';

bootstrap(AppModule, {
  name: 'campaign-server',
  prefix: process.env.PREFIX,
  apiDocs: process.env.API_DOCS && process.env.API_DOCS === 'true',
  port: process.env.PORT,
});
