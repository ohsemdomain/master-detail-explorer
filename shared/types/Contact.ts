export interface Contact {
	id: string
	name: string
	email: string
	phone: string
	address: {
		address_line1: string
		address_line2: string
		address_line3: string
		address_line4: string
		city: string
		state: string
		postcode: string
		country: string
	}
	company: string
}
