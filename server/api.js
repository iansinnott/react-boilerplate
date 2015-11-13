/**
 * @module api
 *
 * API Controller. This is an example API to get you started.
 */
import { Router } from 'express';

/**
 * @exports apiWrapper
 *
 * Because of Waterline's (questionable) design, actual queryable models are not
 * available until after app initialization, at which point they are manually
 * stored on the app object. As such, we need access to the app object in order
 * to do database operations, so we wrap our Router instance such that this
 * middleware can be called as as function that takes app as an argument.
 * @param {object} app Express instance
 * @return {function}
 */
export default function apiWrapper(app) {
  const api = Router();

  api.get('/', (req, res) => {
    res.send({ success: true, message: 'You made it!' });
  });

  /* ***************************************************************************
   * RESTful routing example
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
