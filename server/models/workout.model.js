const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const WorkoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Workout name is required'],
        minLength: [2, 'Workout name must be at least 2 characters long']
    },
    date: {
        type: Date,
        required: [true, 'Date is required']
    },
    type: {
        type: String,
        required: [true, "Type is required"],
        enum: [
            "Cardio",
            "Strength",
            "Flexibility",
            "Others"
        ]
    },
    description: {
        type: String,
        minLength: [2, 'Description must be at least 2 characters long']
    },
    duration: {
        type: Number,
        default: 0
    },
    caloriesBurnt: {
        type: Number,
        default: 0
    },
    userid: {
        type: ObjectId,
        required: [true, 'UserID missing from request.  Please Contact a System Administrator']     
    }
}, {timestamps: true})

const Workout = mongoose.model("Workout", WorkoutSchema)

module.exports = Workout;