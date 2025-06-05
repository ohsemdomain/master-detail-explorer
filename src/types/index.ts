export interface Product {
	id: string
	name: string
	description: string
	price: number
	category: string
	imageUrl: string
}

export interface Contact {
	id: string
	firstName: string
	lastName: string
	email: string
	phone: string
	address: {
		street: string
		city: string
		zipCode: string
		country: string
	}
	company: string
	avatarUrl: string
}

// Generic type for MasterDetailLayout items, ensuring they have an 'id'
export interface Identifiable {
	id: string | number
}
