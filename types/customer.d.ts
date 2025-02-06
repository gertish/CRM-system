export interface Customer {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	avatar?: string | File | null;
	streetAddress?: string;
	city?: string;
	state?: string;
	zipCode?: string;
}
