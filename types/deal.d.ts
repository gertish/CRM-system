import { Status } from "./statusDeal";

export interface Deal {
	id: null;
	customerId: string | null | number;
	streetAddress?: string;
	avatar?: string | File | null;
	city?: string;
	state?: string;
	zipCode?: string;
	roomArea?: number | string;
	numberOfPeople: number | string;
	appointmentDate: string;
	specialInstructions: string;
	roomAccess?: string;
	price: number | string;
	status: Status;
}
