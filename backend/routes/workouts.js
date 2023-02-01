const express = require('express')
const {
    createWorkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutControllers')

const router = express.Router()

//Get all workouts
router.get('/', getWorkouts)

//Get a single workout
router.get('/:id', getWorkout)


//POST a new workout
router.post('/', createWorkout)
//DELETE
router.delete('/:id', deleteWorkout)
//UPDATE
router.patch('/:id', updateWorkout)

module.exports = router