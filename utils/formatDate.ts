import { format } from "date-fns";

export const formateDate = (date: string) => {
	const newDate = new Date(date);
	return format(newDate, "dd MMM yyyy");
};
