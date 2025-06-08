import type React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import type { Contact } from '../../../../shared/types/Contact'
import ContactForm from '../components/ContactForm'

const ContactFormPage: React.FC = () => {
	const { id: _id } = useParams<{ id: string }>()
	const navigate = useNavigate()
	// TODO: Use id for edit mode

	const handleSave = (contactData: Partial<Contact>) => {
		// TODO: Implement save logic
		console.log('Save contact:', contactData)
		navigate('/contacts')
	}

	const handleCancel = () => {
		navigate('/contacts')
	}

	// TODO: Load contact data if editing
	const contact = undefined // Will be loaded from API

	return (
		<div className="container mx-auto px-4 py-6">
			<ContactForm
				contact={contact}
				onSave={handleSave}
				onCancel={handleCancel}
			/>
		</div>
	)
}

export default ContactFormPage
