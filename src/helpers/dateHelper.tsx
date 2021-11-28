export const DateHelper = {
    ToStringYearMonthDate: (date:Date): string => {
        var getDate = date.getDate();
        var getMonth = date.getMonth() + 1;
        return `${date.getFullYear()}-${getMonth < 10 ? "0" + getMonth : getMonth}-${getDate < 10 ? "0" + getDate : getDate}`;
    },
    isDateOnlyEqual(date1:Date, date2:Date){
        return date1.getFullYear() === date2.getFullYear()
            && date1.getMonth() === date2.getMonth()
            && date1.getDate() === date2.getDate()
    }
}