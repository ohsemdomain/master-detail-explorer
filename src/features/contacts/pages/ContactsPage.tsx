import type React from 'react'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Contact } from '../../../../shared/types/Contact'
import MasterDetailLayout from '../../../components/layouts/master-detail/MasterDetailLayout'
import ContactDetail from '../components/ContactDetail'
import ContactListItem from '../components/ContactListItem'
import { useContacts } from '../hooks/useContacts'

const ContactsPage: React.FC = () => {
	const navigate = useNavigate()
	const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
	const [isLoadingDetail, setIsLoadingDetail] = useState<boolean>(false)

	// Use custom hook for data fetching
	const { contacts, loading: isLoading } = useContacts()

	const handleAddContact = () => {
		navigate('/contacts/new')
	}

	const handleEditContact = () => {
		if (selectedContact) {
			navigate(`/contacts/${selectedContact.id}/edit`)
		}
	}

	const handleSelectContact = useCallback(
		(contact: Contact | null) => {
			if (contact) {
				// Only set loading detail if it's a new contact or no contact was selected
				if (selectedContact?.id !== contact.id || !selectedContact) {
					setSelectedContact(contact)
					setIsLoadingDetail(true)
					const detailTimer = setTimeout(() => {
						setIsLoadingDetail(false)
					}, 500) // Simulate detail fetch delay
					return () => clearTimeout(detailTimer)
				}
				// If same contact is clicked again, ensure detail is shown without reloading
				setSelectedContact(contact)
				setIsLoadingDetail(false)
			} else {
				setSelectedContact(null)
				setIsLoadingDetail(false)
			}
		},
		[selectedContact],
	)

	// Auto-select first contact after initial data is loaded, ONLY ON DESKTOP
	useEffect(() => {
		if (
			!isLoading &&
			contacts &&
			contacts.length > 0 &&
			!selectedContact &&
			typeof window !== 'undefined' &&
			window.innerWidth >= 1024 // Tailwind's 'lg' breakpoint - only auto-select on desktop
		) {
			handleSelectContact(contacts[0])
		}
	}, [isLoading, contacts, selectedContact, handleSelectContact])

	const renderListItem = useCallback(
		(contact: Contact, isSelected: boolean, onSelect: () => void) => (
			<ContactListItem
				key={contact.id}
				contact={contact}
				isSelected={isSelected}
				onSelect={onSelect}
			/>
		),
		[],
	)

	const renderDetail = useCallback(
		(contact: Contact) => <ContactDetail contact={contact} />,
		[],
	)

	const itemKeyExtractor = useCallback((contact: Contact) => contact.id, [])
	const getItemTitle = useCallback((contact: Contact) => contact.name, [])

	const headerAction = (
		<button
			type="button"
			onClick={handleAddContact}
			className="bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-lg transition-colors"
			aria-label="Add Contact"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className="w-5 h-5"
				aria-hidden="true"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M12 4.5v15m7.5-7.5h-15"
				/>
			</svg>
		</button>
	)

	const detailHeaderAction = selectedContact ? (
		<button
			type="button"
			onClick={handleEditContact}
			className="bg-amber-600 hover:bg-amber-700 text-white p-2 rounded-lg transition-colors"
			aria-label="Edit Contact"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className="w-5 h-5"
				aria-hidden="true"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
				/>
			</svg>
		</button>
	) : null

	return (
		<div className="flex flex-col h-full">
			{/* Mobile Add Button - Fixed Position */}
			<button
				type="button"
				onClick={handleAddContact}
				className="lg:hidden fixed bottom-6 right-6 z-20 bg-primary-600 hover:bg-primary-700 text-white rounded-full p-4 shadow-lg transition-colors"
				aria-label="Add Contact"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={2}
					stroke="currentColor"
					className="w-6 h-6"
					aria-hidden="true"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M12 4.5v15m7.5-7.5h-15"
					/>
				</svg>
			</button>

			<MasterDetailLayout<Contact>
				items={contacts || []}
				selectedItem={selectedContact}
				onSelectItem={handleSelectContact}
				renderListItem={renderListItem}
				renderDetail={renderDetail}
				listTitle="All Contacts"
				detailTitle="Contact Details"
				itemKeyExtractor={itemKeyExtractor}
				getItemTitle={getItemTitle}
				isLoadingItems={isLoading}
				isLoadingDetail={isLoading || isLoadingDetail}
				headerAction={headerAction}
				detailHeaderAction={detailHeaderAction}
			/>
		</div>
	)
}

export default ContactsPage
