# useAsyncData Hook - Usage Examples

## ✅ Current Usage (Static Data)
```tsx
// ContactsPage.tsx & ProductsPage.tsx
const { data: contacts } = useAsyncData(() => CONTACTS_DATA, [], { delay: 1500 })
```

## ✅ Real API Usage (Now Supported)

### Basic API Call
```tsx
const { data: contacts, loading, error } = useAsyncData(
  () => fetch('/api/contacts').then(res => res.json()),
  []
)
```

### API with Parameters (Re-fetch when params change)
```tsx
const [search, setSearch] = useState('')
const [page, setPage] = useState(1)

const { data: contacts, loading, error, refetch } = useAsyncData(
  () => fetch(`/api/contacts?search=${search}&page=${page}`)
    .then(res => res.json()),
  [search, page]  // Re-fetch when search or page changes
)
```

### Complex API with Headers/Auth
```tsx
const { data: contacts } = useAsyncData(
  () => fetch('/api/contacts', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }).then(res => res.json()),
  [token]  // Re-fetch when token changes
)
```

### With Axios or Custom API Client
```tsx
const { data: contacts } = useAsyncData(
  () => apiClient.get('/contacts', { 
    params: { 
      search, 
      filters: JSON.stringify(filters) 
    }
  }).then(res => res.data),
  [search, filters]
)
```

## 🛠️ How It Works

The hook now uses `useRef` to store the latest function reference:

```tsx
// Store the latest function reference to avoid stale closures
const asyncFunctionRef = useRef(asyncFunction)
asyncFunctionRef.current = asyncFunction

const execute = useCallback(async () => {
  // Always call the latest function reference
  const result = await Promise.resolve(asyncFunctionRef.current())
  // ...
}, [delay, ...dependencies])
```

## ✅ Benefits

1. **No Infinite Loops** - Function reference changes don't trigger re-execution
2. **No Stale Closures** - Always calls the latest function with latest variables
3. **Proper Dependencies** - Only `delay` and explicit dependencies trigger re-fetch
4. **Works with Inline Functions** - No need to useCallback the async function
5. **Backward Compatible** - Existing static data usage still works

## 🚫 What NOT to Include in Dependencies

```tsx
// ❌ Don't do this
const fetchData = () => fetch('/api/data')
const { data } = useAsyncData(fetchData, [fetchData]) // Wrong!

// ✅ Do this instead
const { data } = useAsyncData(
  () => fetch('/api/data'),
  [] // Only include values that should trigger re-fetch
)
```