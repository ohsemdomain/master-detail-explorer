import type React from 'react'
import { memo } from 'react'
import type { Contact } from '../../../../shared/types/Contact'

interface ContactListItemProps {
	contact: Contact
	isSelected: boolean
	onSelect: () => void
}

const ContactListItem: React.FC<ContactListItemProps> = memo(
	({ contact, isSelected, onSelect }) => {
		const handleKeyDown = (event: React.KeyboardEvent) => {
			if (event.key === 'Enter' || event.key === ' ') {
				event.preventDefault()
				onSelect()
			}
		}

		return (
			<li
				key={contact.id}
				onClick={onSelect}
				onKeyDown={handleKeyDown}
				className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-primary-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${
					isSelected ? 'bg-primary-100 border-l-4 border-primary-500' : ''
				}`}
				aria-selected={isSelected}
			>
				<div>
					<h3
						className={`font-semibold ${isSelected ? 'text-primary-700' : 'text-gray-800'}`}
					>
						{contact.name}
					</h3>
					<p className="text-sm text-gray-500">{contact.email}</p>
				</div>
			</li>
		)
	},
)

export default ContactListItem
