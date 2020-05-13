import moment from 'moment';

export const MEAL_TYPES = ['breakfast', 'lunch', 'dinner', 'snack'];

export const DATE_FORMATS = {
  keyDate: 'YY.M.DD',
  time: 'h:mm a',
  day: 'ddd, MMMM Do',
  title: 'M/DD',
};

export const NOON = moment('12:00 pm', 'hh:ss a').valueOf();
