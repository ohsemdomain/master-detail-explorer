import type React from 'react'
import { useCallback, useEffect, useState } from 'react'
import MasterDetailLayout from '../../../components/layouts/master-detail/MasterDetailLayout'
import ContactListItem from '../components/ContactListItem'
import ContactDetail from '../components/ContactDetail'
import { useContacts } from '../hooks/useContacts'
import type { Contact } from '../../../../shared/types/Contact'

const ContactsPage: React.FC = () => {
	const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
	const [isLoadingDetail, setIsLoadingDetail] = useState<boolean>(false)

	// Use custom hook for data fetching
	const { contacts, loading: isLoading } = useContacts()

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

	return (
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
		/>
	)
}

export default ContactsPage