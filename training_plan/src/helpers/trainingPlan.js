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