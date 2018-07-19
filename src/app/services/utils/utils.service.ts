import {Injectable} from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class UtilsService {

  constructor() {
  }

  getAge(dateString) {
    const now = new Date();
    let a = moment(now, 'YYYY[-]MM[-]DD');
    let b = moment(dateString, 'YYYY[-]MM[-]DD');
    console.log('fecha entrante: ', dateString);
    console.log('fecha formateada: ', b);


    let yearString = '';
    let monthString = '';
    let dayString = '';
    let ageString = '';

    const years = a.diff(b, 'year');
    b.add(years, 'years');

    const months = a.diff(b, 'months');
    b.add(months, 'months');

    const days = a.diff(b, 'days');

    const age = {
      years: years,
      months: months,
      days: days
    };

    if (age.years > 1) {
      yearString = ' años';
    } else {
      yearString = ' año';
    }
    if (age.months > 1) {
      monthString = ' meses';
    } else {
      monthString = ' mes';
    }
    if (age.days > 1) {
      dayString = ' dias';
    } else {
      dayString = ' dia';
    }

    if ((age.years > 0) && (age.months > 0) && (age.days > 0)) {
      ageString = age.years + yearString + ', ' + age.months + monthString + ', y ' + age.days + dayString;
    } else if ((age.years === 0) && (age.months === 0) && (age.days > 0)) {
      ageString = age.days + dayString;
    } else if ((age.years > 0) && (age.months === 0) && (age.days === 0)) {
      ageString = age.years + yearString + '. Feliz cumpleaños';
    } else if ((age.years > 0) && (age.months > 0) && (age.days === 0)) {
      ageString = age.years + yearString + ' y ' + age.months + monthString;
    } else if ((age.years === 0) && (age.months > 0) && (age.days > 0)) {
      ageString = age.months + monthString + ' y ' + age.days + dayString;
    } else if ((age.years > 0) && (age.months === 0) && (age.days > 0)) {
      ageString = age.years + yearString + ' y ' + age.days + dayString;
    } else if ((age.years === 0) && (age.months > 0) && (age.days === 0)) {
      ageString = age.months + monthString;
    } else {
      ageString = 'Oops! No se puede calcular la edad!';
    }

    return ageString;
  }

}
