const WorkoutController = require('../controllers/workout.controller')

module.exports = (app) => {
    app.get('/api/workouts/all', WorkoutController.getAll)
    app.post('/api/workouts/new', WorkoutController.createOne)
    app.get('/api/workouts/:id', WorkoutController.getOne)
    app.put('/api/workouts/:id/update', WorkoutController.updateOne)
    app.delete('/api/workouts/:id/delete', WorkoutController.deleteOne)
}
