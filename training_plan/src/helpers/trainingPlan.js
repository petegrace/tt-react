import dateFns from "date-fns";

export function filterPlannedActivities(plannedActivities, day, planningPeriod) {
    const jsonDate = dateFns.format(day, "YYYY-MM-DD");
    const plannedActivitiesFiltered = plannedActivities.filter(plannedActivity => plannedActivity.planned_date === jsonDate && plannedActivity.planning_period === planningPeriod);
    return plannedActivitiesFiltered;
}

export function filterPlannedActivitiesById(plannedActivities, id) {
    const plannedActivitiesFiltered = plannedActivities.filter(plannedActivity => plannedActivity.id === id);
    return plannedActivitiesFiltered[0];
}

export function filterPlannedRacesById(plannedRaces, id) {
    const plannedRacesFiltered = plannedRaces.filter(plannedRace => plannedRace.id === id);
    return plannedRacesFiltered[0];
}

export function filterPlannedRaces(plannedRaces, day) {
    const jsonDate = dateFns.format(day, "YYYY-MM-DD");
    const plannedRacesFiltered = plannedRaces.filter(plannedRace => plannedRace.planned_date === jsonDate);
    return plannedRacesFiltered;
}

export function filterPlannedExercises(plannedExercises, day, planningPeriod) {
    const jsonDate = dateFns.format(day, "YYYY-MM-DD");
    const plannedExercisesFiltered = plannedExercises.filter(plannedExerciseCategory => plannedExerciseCategory.planned_date === jsonDate && plannedExerciseCategory.planning_period === planningPeriod);
    return plannedExercisesFiltered;
}

export function filterCompletedActivities(completedActivities, day) {
    const jsonDate = dateFns.format(day, "YYYY-MM-DD");
    const completedActivitiesFiltered = completedActivities.filter(completedActivity => completedActivity.activity_date === jsonDate);
    return completedActivitiesFiltered;
}

export function filterCompletedExercises(completedExercises, day) {
    const jsonDate = dateFns.format(day, "YYYY-MM-DD");
    const completedExercisesFiltered = completedExercises.filter(completedExerciseCategory => completedExerciseCategory.exercise_date === jsonDate);
    return completedExercisesFiltered;
}