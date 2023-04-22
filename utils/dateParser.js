const dayjs = require('dayjs');
const NepaliDate = require('nepali-date-converter');
const utc = require('dayjs/plugin/utc');

dayjs.extend(utc);

export const parseDateToString = (date) => dayjs(date).utc().format('YYYY-MM-DD');

export const generateNoOfDaysDiff = (start, end) => dayjs(end).diff(start, 'day');

export const setDateToPreviousMonth = (date) => new Date(date.getFullYear(), date.getMonth() - 1);

export const addSubMonth = (date, num) => dayjs(date).utc().add(num, 'month').toDate();

export const convertNepaliMonthToEnglishDate = (month = 1) => {
    const date = new NepaliDate();
    date.setMonth(month - 1);
    date.setDate(date.getDate());
    return date.toJsDate();
};

export const generateEngStartOrEndDateOfMonth = (date = new Date(), isStart = true) => {
    const currDate = new NepaliDate(date);
    const startDate = new NepaliDate(currDate.getYear(), currDate.getMonth() + Number(!isStart) + 1, Number(isStart));
    const adDate = startDate.getAD();
    const newDate = new Date(adDate.year, adDate.month - 1, adDate.date);
    newDate.setDate(newDate.getDate() + 1);
    return newDate;
};

export const getCurrentAndPreviousStartAndEndDate = (date = new Date()) => {

    const currentdate = new NepaliDate();
    currentdate.setDate(currentdate.getDate() + 1);
    const currentMonthStartDate = generateEngStartOrEndDateOfMonth(date, true);
    currentMonthStartDate.setDate(currentMonthStartDate.getDate() + 1);
    const currentMonthEndDate = currentdate.toJsDate();
    const noOfDaysInCurrentMonth = generateNoOfDaysDiff(currentMonthStartDate, currentMonthEndDate);

    const nepaliDate = new NepaliDate(date);
    const previousMonthDate = (new NepaliDate(nepaliDate.getYear(), nepaliDate.getMonth(), 0)).getAD();

    const previousMonthStartDate = generateEngStartOrEndDateOfMonth(new Date(previousMonthDate.year, previousMonthDate.month, previousMonthDate.date), true);
    previousMonthStartDate.setDate(previousMonthStartDate.getDate() + 1);
    const previousMonthEndDate = generateEngStartOrEndDateOfMonth(new Date(previousMonthDate.year, previousMonthDate.month, 1), false);
    previousMonthEndDate.setDate(previousMonthEndDate.getDate() + 1);
    const noOfDaysInPreviousMonth = generateNoOfDaysDiff(previousMonthStartDate, previousMonthEndDate);

    return {
        currentMonthStartDate,
        currentMonthEndDate,
        noOfDaysInCurrentMonth,
        previousMonthStartDate,
        previousMonthEndDate,
        noOfDaysInPreviousMonth,
    };
};
export const generateSearchParams = (record) => {
    const query = {
        startDate: new Date(String(record.startDate)),
        endDate: new Date(String(record.endDate)),
    };

    const noOfDaysInCurrentMonth = generateNoOfDaysDiff(query.startDate, query.endDate);
    const noOfDaysInPreviousMonth = generateNoOfDaysDiff(addSubMonth(query.startDate, -1), addSubMonth(query.endDate, -1));

    return {
        ...query,
        noOfDaysInCurrentMonth,
        noOfDaysInPreviousMonth,
    };
};

