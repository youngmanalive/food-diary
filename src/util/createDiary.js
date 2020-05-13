import moment from 'moment';

import { DATE_FORMATS } from '../constants';

const keyifyDay = date => date.format(DATE_FORMATS.keyDate);
const formatTitle = date => date.format(DATE_FORMATS.title);
const formatHeading = date => date.format(DATE_FORMATS.day);

export const createDiary = (data = []) =>
  data.reduce((diary, entry) => {
    const date = moment(entry.date);
    const dayKey = keyifyDay(date);

    if (!diary[dayKey]) {
      diary[dayKey] = {
        title: formatTitle(date),
        header: formatHeading(date),
        entries: {},
      };
    }

    diary[dayKey].entries[entry.id] = { ...entry, date };

    return diary;
  }, {});
