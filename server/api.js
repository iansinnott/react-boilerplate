/**
 * @module api
 *
 * API Controller. This is an example API to get you started. Below you will see
 * me using the new es7 functional bind syntax `::res.send`. If you're not
 * fammiliar with this, it is the equivalent of saying `res.send.bind(res)`. See
 * this article for more info: https://github.com/zenparsing/es-function-bind
 */
import { Router } from 'express';

// import db from './config/database.js';
// import Thing from './models/Thing.js';

const api = Router();

api.get('/', (req, res) => {
  res.json({ success: true, message: 'You made it!' });
});

/*****************************************************************************
 * RESTful route example
 ****************************************************************************/

api.get('/things', (req, res, next) => {
  Thing.find({})
    .then(data => res.send(data))
    .catch(next);
});

api.get('/things/:id', (req, res, next) => {
  Thing.findById(req.params.id)
    .then(data => res.send(data))
    .catch(next);
});

api.post('/things', (req, res, next) => {
  const thing = new Thing(req.body);
  thing.save()
    .then(data => res.send(data))
    .catch(next);
});

api.put('/things/:id', (req, res, next) => {
  Thing.findByIdAndUpdate(req.params.id, req.body)
    .then(data => res.send(data))
    .catch(next);
});

api.put('/things/:id', (req, res, next) => {
  Thing.findByIdAndRemove(req.params.id)
    .then(data => res.send(data))
    .catch(next);
});

export default api;

