import type React from 'react'
import { memo, useCallback, useEffect, useState } from 'react'
import {
	CityIcon,
	CountryIcon,
	EmailIcon,
	LocationIcon,
	PhoneIcon,
} from '../components/Icons'
import MasterDetailLayout from '../components/layouts/master-detail/MasterDetailLayout'
import { CONTACTS_DATA } from '../../trpc/data/contacts'
import { useLoader } from '../components/loader/useLoader'
import type { Contact } from '../../shared/types/Contact'

const ContactListItem: React.FC<{
	contact: Contact
	isSelected: boolean
	onSelect: () => void
}> = memo(({ contact, isSelected, onSelect }) => {
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
})

const ContactDetailView: React.FC<{ contact: Contact }> = memo(
	({ contact }) => {
		return (
			<div className="space-y-6">
				<div className="pb-6 border-b border-gray-200">
					<h2 className="text-3xl font-bold text-primary-700 mb-2">
						{contact.name}
					</h2>
					<p className="text-lg text-gray-600">{contact.company}</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					<InfoCard
						title="Email Address"
						value={contact.email}
						icon={EmailIcon}
					/>
					<InfoCard
						title="Phone Number"
						value={contact.phone}
						icon={PhoneIcon}
					/>
					<InfoCard
						title="Address Line 1"
						value={contact.address.address_line1}
						icon={LocationIcon}
					/>
					<InfoCard title="City" value={contact.address.city} icon={CityIcon} />
					<InfoCard
						title="State"
						value={contact.address.state}
						icon={LocationIcon}
					/>
					<InfoCard
						title="Postcode"
						value={contact.address.postcode}
						icon={LocationIcon}
					/>
					<InfoCard
						title="Country"
						value={contact.address.country}
						icon={CountryIcon}
					/>
				</div>
			</div>
		)
	},
)

interface InfoCardProps {
	title: string
	value: string
	icon: React.FC<{ className?: string }>
}

const InfoCard: React.FC<InfoCardProps> = ({ title, value, icon: Icon }) => (
	<div className="bg-gray-50 p-4 rounded-lg shadow flex items-start space-x-3">
		<Icon
			className="w-6 h-6 text-primary-500 mt-1 flex-shrink-0"
			aria-hidden="true"
		/>
		<div>
			<h4 className="font-semibold text-gray-700">{title}</h4>
			<p className="text-gray-600">{value}</p>
		</div>
	</div>
)

const ContactsPage: React.FC = () => {
	const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
	const [isLoadingDetail, setIsLoadingDetail] = useState<boolean>(false)

	// Use custom hook for data fetching
	const { data: contacts, loading: isLoading } = useLoader(
		() => CONTACTS_DATA,
		[],
		{ delay: 1500 },
	)

	const handleSelectContact = useCallback(
		(contact: Contact | null) => {
			if (contact) {
				if (selectedContact?.id !== contact.id || !selectedContact) {
					setSelectedContact(contact)
					setIsLoadingDetail(true)
					const detailTimer = setTimeout(() => {
						setIsLoadingDetail(false)
					}, 500) // Simulate detail fetch delay
					return () => clearTimeout(detailTimer)
				}
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
		(contact: Contact) => <ContactDetailView contact={contact} />,
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
