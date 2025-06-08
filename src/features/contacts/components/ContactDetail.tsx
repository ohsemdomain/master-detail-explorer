import type React from 'react'
import { memo } from 'react'
import type { Contact } from '../../../../shared/types/Contact'
import {
	CityIcon,
	CountryIcon,
	EmailIcon,
	LocationIcon,
	PhoneIcon,
} from '../../../components/Icons'

interface ContactDetailProps {
	contact: Contact
}

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
		<div className="flex-grow min-w-0">
			<h4 className="text-sm font-medium text-gray-700 mb-1">{title}</h4>
			<p className="text-gray-900 break-words">{value}</p>
		</div>
	</div>
)

const ContactDetail: React.FC<ContactDetailProps> = memo(({ contact }) => {
	const fullAddress = [
		contact.address.address_line1,
		contact.address.address_line2,
		contact.address.address_line3,
		contact.address.address_line4,
		contact.address.city,
		contact.address.state,
		contact.address.postcode,
		contact.address.country,
	]
		.filter(Boolean)
		.join(', ')

	return (
		<div className="space-y-6">
			<div className="pb-6 border-b border-gray-200">
				<h2 className="text-3xl font-bold text-primary-700 mb-2">
					{contact.name}
				</h2>
				<p className="text-lg text-gray-600">{contact.company}</p>
			</div>

			<div className="grid grid-cols-1 gap-4">
				<InfoCard
					title="Email Address"
					value={contact.email}
					icon={EmailIcon}
				/>
				<InfoCard title="Phone Number" value={contact.phone} icon={PhoneIcon} />
				<InfoCard
					title="Full Address"
					value={fullAddress}
					icon={LocationIcon}
				/>
				<InfoCard title="City" value={contact.address.city} icon={CityIcon} />
				<InfoCard
					title="Country"
					value={contact.address.country}
					icon={CountryIcon}
				/>
			</div>
		</div>
	)
})

export default ContactDetail
