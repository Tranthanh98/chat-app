import moment from "moment";

export function timeDifference(receivedTime) {
  // Parse the received date-time
  const receivedDate = new Date(receivedTime);

  // Get the current date-time
  const now = new Date();

  // Calculate the difference in milliseconds
  const diffMs = now - receivedDate;

  // Convert milliseconds to hours and minutes
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  // Format the result
  let result = "";
  if (diffHrs > 0) {
    result += diffHrs + "h ";
  }
  result += diffMins + "m ago";

  return result;
}

export function getSpecificTime(dateInput) {
  let date = moment(dateInput);
  let now = moment();

  let formattedDate;

  if (now.diff(date, "days") >= 1) {
    formattedDate = date.format("MMM D");
  } else {
    formattedDate = date.format("hh:mm A");
  }
  return formattedDate;
}
