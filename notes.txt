
# 📘 TanStack Query – Complete Notes

---

## ✅ 1. `useQuery` Basic Syntax

```js
const { data, isLoading, error } = useQuery({
  queryKey: ['key'],
  queryFn: fetchFunction
});
```

### Keys:

* **`queryKey`**: Unique cache key.
* **`queryFn`**: Function to fetch the data (axios, fetch, etc.).

---

## 🔁 2. Polling / Live Data Updates

### 🔹 `refetchInterval`

Auto-refetch data every X milliseconds.

```js
useQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts,
  refetchInterval: 5000, // Refetch every 5 seconds
});
```

### 🔹 `refetchIntervalInBackground`

Even if the tab is inactive, this keeps polling.

```js
useQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts,
  refetchInterval: 5000,
  refetchIntervalInBackground: true,
});
```

🔸 Without `refetchIntervalInBackground: true`, polling stops when the tab is in the background.

---

## 🎯 3. Placeholder & Cache Handling

### 🔹 `placeholderData`

Temporary data shown while loading. Good for showing a shape or previous format.

```js
useQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts,
  placeholderData: [],
});
```

### 🔹 `keepPreviousData: true`

Keeps the old data on screen while new data is fetched (useful in pagination).

```js
useQuery({
  queryKey: ['page', pageNumber],
  queryFn: fetchPageData,
  keepPreviousData: true,
});
```

---

## 🔁 4. Refetching Options

### Manual Refetch:

```js
const query = useQuery({ queryKey: ['data'], queryFn: fetchData });
<button onClick={() => query.refetch()}>Refetch</button>
```

---

## 📦 5. Pagination / Infinite Scroll

### Intersection Observer with `react-intersection-observer`

Install:

```bash
npm i react-intersection-observer
```

### Example for infinite scroll:

```js
import { useInView } from 'react-intersection-observer';

const { ref, inView } = useInView();

useEffect(() => {
  if (inView && hasNextPage) {
    fetchNextPage(); // from useInfiniteQuery
  }
}, [inView]);
```

Use `ref` on the last item to detect scroll and load more.

---

## 💡 Useful Options Summary

| Option                        | Description                                |
| ----------------------------- | ------------------------------------------ |
| `refetchInterval`             | Time interval to auto-refetch              |
| `refetchIntervalInBackground` | Keep fetching even when tab is inactive    |
| `refetchOnWindowFocus`        | Auto refetch when window becomes active    |
| `placeholderData`             | Temporary data to show during loading      |
| `keepPreviousData`            | Keeps old data during refetch (pagination) |
| `staleTime`                   | How long data is considered fresh          |
| `cacheTime`                   | How long data stays in memory after unused |

---

## 🔄 useMutation (for POST, PUT, DELETE)

```js
const mutation = useMutation({
  mutationFn: postData,
  onSuccess: () => {
    queryClient.invalidateQueries(['posts']); // Refetch after mutation
  },
});
```

