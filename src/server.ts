import cors from 'cors';
import 'dotenv/config';
import express from 'express';

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

import { router } from './routes';

const port = process.env.PORT || '3333';
const corsOptions = {
    origin: '*',
    methods: ['POST', 'GET', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
const app = express();

app.use('/swagger', swaggerUi.serve);
app.get('/swagger', swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(cors(corsOptions));
app.use('/api', router);

app.listen(port, () => { console.log(`Server running on port: ${port}`); });

