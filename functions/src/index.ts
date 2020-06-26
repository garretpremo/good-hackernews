import * as functions from 'firebase-functions';
import * as bodyParser from 'body-parser';
import { StoryService } from './story/story.service';
import express = require('express');

const app: express.Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/story/:id', async (req, res) => res.send(await StoryService.getStoryById(+req.params.id)));
app.get('/story/ping', (req, res) => res.status(200).send('ping'));

export const api = functions.https.onRequest(app);
