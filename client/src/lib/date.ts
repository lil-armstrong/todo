import moment from "moment";

/**
 * Formats a given date string or Date object into a human-readable string.
 *
 * - If the date is the same as the current day, it returns a string in the format:
 *   "Today, {hour}{am/pm}" (e.g., "Today, 5pm").
 * - If the date is the day before the current day, it returns the string:
 *   "Yesterday".
 * - Otherwise, it returns a string in the format:
 *   "{day}, {day} {month}, {hour}{am/pm}" (e.g., "Fri, 30 May, 6pm").
 *
 * @param dateString - The date to format, provided as a string or a Date object.
 * @returns A formatted string representing the date.
 */
export function formatDate(dateString: string | Date): string {
  const date = moment(dateString);
  const now = moment();

  if (date.isSame(now, "day")) {
    return `Today, ${date.format("hA").toLowerCase()}`; // e.g., "Today, 5pm"
  }

  if (date.isSame(now.clone().subtract(1, "day"), "day")) {
    return `Yesterday`;
  }

  return date.format("ddd, D MMM, hA").toLowerCase(); // e.g., "Fri, 30 May, 6pm"
}
