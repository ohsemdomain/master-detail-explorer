import { useCallback, useEffect, useState } from 'react'

interface UseAsyncDataState<T> {
	data: T | null
	loading: boolean
	error: Error | null
}

interface UseAsyncDataOptions {
	immediate?: boolean
	delay?: number
}

export function useAsyncData<T>(
	asyncFunction: () => Promise<T> | T,
	dependencies: React.DependencyList = [],
	options: UseAsyncDataOptions = {},
): UseAsyncDataState<T> & { refetch: () => Promise<void> } {
	const { immediate = true, delay = 0 } = options
	const [state, setState] = useState<UseAsyncDataState<T>>({
		data: null,
		loading: immediate,
		error: null,
	})

	const execute = useCallback(async () => {
		setState((prev) => ({ ...prev, loading: true, error: null }))

		try {
			if (delay > 0) {
				await new Promise((resolve) => setTimeout(resolve, delay))
			}

			const result = await Promise.resolve(asyncFunction())
			setState({ data: result, loading: false, error: null })
		} catch (error) {
			setState({
				data: null,
				loading: false,
				error: error instanceof Error ? error : new Error(String(error)),
			})
		}
	}, dependencies)

	useEffect(() => {
		if (immediate) {
			execute()
		}
	}, [execute, immediate])

	return {
		...state,
		refetch: execute,
	}
}
