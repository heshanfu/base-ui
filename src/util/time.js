/**
 * @author KylesLight
 * @date 05/01/2018-4:52 PM
 * @file filter-util
 */

const DatePresentationReg = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).(\d{3})/;
const DateFormat = 'YYYY-MM-DD';
const DateMinuteFormat = 'YYYY-MM-DD HH:mm';
const DateTimeFormat = 'YYYY-MM-DD HH:mm:ss';
const MillisecondInMinute = 60 * 1e3;
const MillisecondInDay = MillisecondInMinute * 60 * 24;

const getTimestamp = (time) => {
    if (typeof time === typeof 0) return time;

    return (new Date(time)).getTime();
};

export const DayTypeList = ['日', '一', '二', '三', '四', '五', '六'];
export const MonthTypeList = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
export const DailyMillisecond = 24 * 60 * MillisecondInMinute;

export const getTimeComponent = (time) => {
    const timeStamp = getTimestamp(time);

    if (Number.isNaN(timeStamp)) return {};

    const offset = (new Date()).getTimezoneOffset() * MillisecondInMinute;
    const day = (new Date(timeStamp - offset)).getDay();
    const timePresentation = new Date(timeStamp - offset).toJSON();
    const [
        entity, // eslint-disable-line no-unused-vars
        year,
        month,
        date,
        hour,
        minute,
        second,
        millisecond
    ] = timePresentation.match(DatePresentationReg);

    return {
        year,
        month,
        date,
        hour,
        minute,
        second,
        millisecond,
        day
    };
};

export const getTimeDigitalComponent = (timeStamp) => {
    const {
        year,
        month,
        date,
        hour,
        minute,
        second,
        millisecond,
        day
    } = getTimeComponent(timeStamp);

    return {
        year: +year,
        month: +month,
        date: +date,
        hour: +hour,
        minute: +minute,
        second: +second,
        millisecond: +millisecond,
        day: +day
    };
};

export const genDateStringWithFormat = (timeStamp, format) => {
    const {year, month, date, hour, minute, second, millisecond} = getTimeComponent(timeStamp);

    return format
        .replace(/YYYY/g, () => year)
        .replace(/MM/g, () => month)
        .replace(/DD/g, () => date)
        .replace(/HH/g, () => hour)
        .replace(/mm/g, () => minute)
        .replace(/ss/g, () => second)
        .replace(/SSS/g, () => millisecond); // TODO: 增加 format 支持
};

export const getDate = (time) => {
    const timeStamp = getTimestamp(time);
    if (Number.isNaN(timeStamp)) return time;

    return genDateStringWithFormat(timeStamp, DateFormat);
};

export const getDateMinute = (time) => {
    const timeStamp = getTimestamp(time);
    if (Number.isNaN(timeStamp)) return time;

    return genDateStringWithFormat(timeStamp, DateMinuteFormat);
};

export const getDateTime = (time) => {
    const timeStamp = getTimestamp(time);
    if (Number.isNaN(timeStamp)) return time;

    return genDateStringWithFormat(timeStamp, DateTimeFormat);
};

export const isValidDateString = (dateStr) => {
    if (!/\d+-\d{2}-\d{2}/.test(dateStr)) return false;
    const date = new Date(dateStr);
    if (!date.getTime() && date.getTime() !== 0) return false;
    return date.toISOString().slice(0, 10) === dateStr;
};

export const roundTimestamp = (timestamp, type) => { // eslint-disable-line
    const time = new Date(timestamp);
    const year = time.getFullYear();
    const month = time.getMonth();
    const date = time.getDate();

    switch (type) {
        case 'dayEnd': {
            const roundMilliseconds = MillisecondInDay - 1;
            return timestamp && new Date(year, month, date).getTime() + roundMilliseconds;
        }
        case 'dayStart': {
            return timestamp && new Date(year, month, date).getTime();
        }
        default: {
            return timestamp;
        }
    }

};
