import { useLoader } from '../../../components/loader/useLoader'
import { CONTACTS_DATA } from '../../../../trpc/data/contacts'
import type { Contact } from '../../../../shared/types/Contact'

export const useContacts = () => {
	const { data: contacts, loading, error, refetch } = useLoader<Contact[]>(
		() => CONTACTS_DATA,
		[],
		{ delay: 1500 }
	)

	return {
		contacts: contacts || [],
		loading,
		error,
		refetch
	}
}