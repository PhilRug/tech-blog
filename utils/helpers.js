module.exports = {
  format_time: (date) => {
    // add time of post
    return date.toLocaleTimeString();
  },
  format_date: (date) => {
    // add date to post
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/
    ${new Date(date).getFullYear()}`;
  },
};