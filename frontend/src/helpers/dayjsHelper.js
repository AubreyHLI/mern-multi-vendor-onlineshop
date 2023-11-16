import * as dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';
import calendar from 'dayjs/plugin/calendar';

dayjs.locale('zh-cn');
dayjs.extend(relativeTime);
dayjs.extend(calendar);

export const dashDateFormat = (date) => {
    return dayjs(date).format('YYYY-MM-DD');
}

export const dotDateFormat = (date) => {
    return dayjs(date).format('YYYY.MM.DD');
}

export const slashDateFormat = (date) => {
    return dayjs(date).format('YYYY/MM/DD');
}

export const compareDate = (d1, d2) => {
    const date1 = dayjs(d1);
    const date2 = dayjs(d2);
    return date1.diff(date2, 'day');
}

export const timeDateFormat = (date) => {
    return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
}

export const calendarFormat = (date) => {
    const calendarDate = dayjs(date).calendar(null, {
        sameDay: '[今天] HH:mm', 
        nextDay: '[明天] HH:mm',
        lastDay: '[昨天] HH:mm',
        nextWeek: 'MM-DD HH:mm', 
        lastWeek: 'MM-DD HH:mm', 
        sameElse: 'YYYY-MM-DD HH:mm' // Everything else ( 17/10/2011 )
    })
    return calendarDate;
}



export default dayjs;
