import * as functions from 'firebase-functions';
import express = require('express');
import * as bodyParser from 'body-parser';
import { StoryService } from './story/story.service';

const app: express.Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/story/:id', async (req, res) => res.send(await StoryService.getById(+req.params.id)));
app.get('/story/ping', (req, res) => res.status(200).send('ping'));

export const api = functions.https.onRequest(app);
