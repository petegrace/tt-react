import dateFns from "date-fns";

export function filterPlannedActivities(plannedActivities, day) {
    const jsonDate = dateFns.format(day, "YYYY-MM-DD");
    const plannedActivitiesFiltered = plannedActivities.filter(plannedActivity => plannedActivity.planned_date === jsonDate);
    return plannedActivitiesFiltered;
}

export function filterPlannedActivitiesById(plannedActivities, id) {
    const plannedActivitiesFiltered = plannedActivities.filter(plannedActivity => plannedActivity.id === id);
    return plannedActivitiesFiltered[0];
}

export function filterPlannedExercises(plannedExercises, day) {
    const jsonDate = dateFns.format(day, "YYYY-MM-DD");
    const plannedExercisesFiltered = plannedExercises.filter(plannedExerciseCategory => plannedExerciseCategory.planned_date === jsonDate);
    return plannedExercisesFiltered;
}

export function filterCompletedActivities(completedActivities, day) {
    const jsonDate = dateFns.format(day, "YYYY-MM-DD");
    const completedActivitiesFiltered = completedActivities.filter(completedActivity => completedActivity.activity_date === jsonDate);
    return completedActivitiesFiltered;
}