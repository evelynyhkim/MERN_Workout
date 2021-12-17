const Workout = require('../models/workout.model');

module.exports = {
    getAll: (req, res) => {
        Workout.find({userid: req.params.id})
        .then(workouts => {
            console.log('getAll')
            res.json(workouts)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },
    createOne: (req, res) => {
        Workout.create(req.body)
        .then(workout => {
            console.log('createOne')
            res.json(workout)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },
    getOne: (req, res) => {
        Workout.findById(req.params.id)
        .then(workout => {
            console.log('getOne')
            res.json(workout)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },
    updateOne: (req, res) => {
        console.log('updateOne')
        Workout.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true})
        .then(workout => {
            res.json(workout)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },    
    deleteOne: (req, res) => {
        Workout.findByIdAndDelete(req.params.id)
        .then(workout => {
            console.log('deleteOne')
            res.json(workout)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    }    
}      