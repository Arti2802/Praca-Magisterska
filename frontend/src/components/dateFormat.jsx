export const dateFormat = (date) => {
    return date && date?.substring(0, 10) + ' ' + date?.substring(11, 16);
}