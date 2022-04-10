import moment from "moment";

const MIN_DISPLAYED_LENGTH = 20;

export const checkForEmpty = value => value === '' ? '-' : value;
export const dateFormatter = value => moment(value).format('DD.MM.YYYY HH:mm');
export const trimLongString = value =>
    value.length >= MIN_DISPLAYED_LENGTH ? value.slice(0, MIN_DISPLAYED_LENGTH).trim() + "..." : value;

export const trimAttendees = value => {
    if (value.length) {
        let attendees = [];
        for (let i = 0; i < value.length; i++) {
            attendees.push(value[i].emailAddress.name);
        }
        return attendees.join(", ");
    }
    return '-';
}
