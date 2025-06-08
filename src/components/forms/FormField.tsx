import type React from 'react'

interface FormFieldProps {
	label: string
	name: string
	type?: string
	value: string
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	error?: string
	required?: boolean
	placeholder?: string
}

const FormField: React.FC<FormFieldProps> = ({
	label,
	name,
	type = 'text',
	value,
	onChange,
	error,
	required = false,
	placeholder,
}) => {
	return (
		<div className="mb-4">
			<label
				htmlFor={name}
				className="block text-sm font-medium text-gray-700 mb-2"
			>
				{label} {required && <span className="text-red-500">*</span>}
			</label>
			<input
				type={type}
				id={name}
				name={name}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
					error ? 'border-red-500' : 'border-gray-300'
				}`}
			/>
			{error && <p className="mt-1 text-sm text-red-600">{error}</p>}
		</div>
	)
}

export default FormField
