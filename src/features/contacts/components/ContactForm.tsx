import type React from 'react'
import type { Contact } from '../../../../shared/types/Contact'

interface ContactFormProps {
	contact?: Contact // For edit mode
	onSave: (contact: Partial<Contact>) => void
	onCancel: () => void
	isLoading?: boolean
}

const ContactForm: React.FC<ContactFormProps> = ({ 
	contact, 
	onSave, 
	onCancel, 
	isLoading = false 
}) => {
	// TODO: Implement contact form
	return (
		<div className="p-6 bg-white rounded-lg shadow">
			<h2 className="text-2xl font-bold mb-4">
				{contact ? 'Edit Contact' : 'Create Contact'}
			</h2>
			<p className="text-gray-500">Contact form placeholder - to be implemented</p>
			<div className="mt-4 flex gap-4">
				<button 
					type="button" 
					onClick={onCancel}
					className="px-4 py-2 bg-gray-500 text-white rounded"
				>
					Cancel
				</button>
				<button 
					type="button" 
					onClick={() => onSave({})}
					disabled={isLoading}
					className="px-4 py-2 bg-blue-500 text-white rounded"
				>
					{isLoading ? 'Saving...' : 'Save'}
				</button>
			</div>
		</div>
	)
}

export default ContactForm