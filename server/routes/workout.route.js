const WorkoutController = require('../controllers/workout.controller')
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    app.post('/api/workouts/new', WorkoutController.createOne)
    app.get('/api/workouts/all/:id', WorkoutController.getAll)
    app.get('/api/workouts/:id', WorkoutController.getOne)
    app.put('/api/workouts/:id/update', WorkoutController.updateOne)
    app.delete('/api/workouts/:id/delete', WorkoutController.deleteOne)
}
