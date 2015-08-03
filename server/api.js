/**
 * @module api
 *
 * API Controller. This is an example API to get you started. Below you will see
 * me using the new es7 functional bind syntax `::res.send`. If you're not
 * fammiliar with this, it is the equivalent of saying `res.send.bind(res)`. See
 * this article for more info: https://github.com/zenparsing/es-function-bind
 */
import { Router } from 'express';

export default function apiWrapper(app) {
  const api = Router();

  api.get('/', (req, res) => {
    console.log(app.models);
    res.send({ success: true, message: 'You made it!' });
  });

  /* ***************************************************************************
   * RESTful route example
   * **************************************************************************/

  api.get('/things', (req, res, next) => {
    app.models.thing.find()
      .then(data => res.send(data))
      .catch(next);
  });

  api.get('/things/:id', (req, res, next) => {
    app.models.thing.findOne({ id: req.params.id })
      .then(data => res.send(data))
      .catch(next);
  });

  api.post('/things', (req, res, next) => {
    app.models.thing.create(req.body)
      .then(data => res.send(data))
      .catch(next);
  });

  api.put('/things/:id', (req, res, next) => {
    app.models.thing.update({ id: req.params.id }, req.body)
      .then(data => res.send(data))
      .catch(next);
  });

  api.delete('/things/:id', (req, res, next) => {
    app.models.thing.destroy({ id: req.params.id })
      .then(data => res.send(data))
      .catch(next);
  });

  return api;
}
