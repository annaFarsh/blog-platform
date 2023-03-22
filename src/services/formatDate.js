import { format, parseISO } from "date-fns";
export function formatDate(date) {
  return format(parseISO(date), "MMMM dd, yyyy");
}
