/****************/
/*   Nathan's   */
/****************/

User = {
    
    email*,
    firstName*,
    lastName*,
    password* (encrypted)
    workoutLogs: [WorkoutLog]
    pictures: [Picture]
}

WorkoutLog = {
    name*,
    date*,
    type*,
    description,
    duration,
    caloriesBurnt (calculated based on variables including type, duration, bodyWeight?)
}

Picture = {
    nickName,
    beforeImage* (can be a file or a pointer),
    beforeDate*,
    afterImage* (can be a file or a pointer),
    afterDate*,
    description,
}

/****************/
/*   Daniel's   */
/****************/

User = {
    email*,
    username*,
    firstName*,
    lastName*,
    password* (encrypted),
    workouts: [MyWorkout],
    pictures: [Picture],
    history: History
}

PredefinedWorkout = { //properties dynamically calculated based on bodyWeight?
    name*,
    movements*: [Movement]
    bodyWeight*,
}

MyWorkout = {
    name*,
    movements*: [Movement]
    bodyWeight* ??
}

Movement = {
    name*, 
    weight*,
    count*,
    set*
}

History = {
    date*,
    movement*,
    number_to_track
}
    /* pictures */
// return order: newer to older

Picture = {
    beforeImage* (can be a file or a pointer),
    beforeDate*,
    afterImage* (can be a file or a pointer),
    afterDate*,
    description,
}