# Component Migration Guide

## Migrating Components to Use Centralized API Client

This guide demonstrates how to migrate React components from raw `fetch` calls to the centralized, type-safe API client.

## Overview

**Benefits of Migration:**
- ✅ Full TypeScript type safety with auto-completion
- ✅ Consistent error handling with `ApiError` class
- ✅ Single source of truth for all API calls
- ✅ Easier testing with centralized mocking
- ✅ Better maintainability

## Migration Steps

### Step 1: Import the API Client

**Before:**
```typescript
import { useQuery, useMutation } from "@tanstack/react-query";
```

**After:**
```typescript
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { api, ApiError } from "@/lib/api";
```

### Step 2: Update useQuery Calls

**Before:**
```typescript
const { data: notes, isLoading } = useQuery<MeetingNote[]>({
  queryKey: ["/api/meeting-notes"],
});
```

**After:**
```typescript
const { data: notes, isLoading } = useQuery<MeetingNote[]>({
  queryKey: ["meeting-notes"],
  queryFn: () => api.meetingNotes.getAll(),
});
```

**Key Changes:**
- Remove the `/api/` prefix from query keys (use domain names instead)
- Add `queryFn` that calls the appropriate API client method
- TypeScript will provide auto-completion for available methods

### Step 3: Update useMutation Calls

**Before:**
```typescript
const transcribeMutation = useMutation({
  mutationFn: async (formData: FormData) => {
    const response = await fetch("/api/meeting-notes/transcribe", {
      method: "POST",
      body: formData,
    });
    if (!response.ok) throw new Error("Transcription failed");
    return response.json();
  },
  onSuccess: (data) => {
    setResult(data);
    queryClient.invalidateQueries({ queryKey: ["/api/meeting-notes"] });
    toast({ title: "Success" });
  },
  onError: () => {
    toast({ title: "Error", variant: "destructive" });
  },
});
```

**After:**
```typescript
const transcribeMutation = useMutation({
  mutationFn: async (audioFile: File) => {
    return api.meetingNotes.transcribe(audioFile);
  },
  onSuccess: (data) => {
    setResult(data);
    queryClient.invalidateQueries({ queryKey: ["meeting-notes"] });
    toast({ title: "Success" });
  },
  onError: (error) => {
    const errorMessage = error instanceof ApiError
      ? error.message
      : "An unexpected error occurred";

    toast({
      title: "Error",
      description: errorMessage,
      variant: "destructive",
    });
  },
});
```

**Key Changes:**
- Call the API client method directly (no manual fetch)
- Use proper TypeScript types for parameters
- Add `ApiError` type checking in `onError` handler
- Update query keys to match domain names (no `/api/` prefix)

### Step 4: Handle FormData Conversion

If your component uses `FormData` but the API client expects a `File`, convert appropriately:

**Before:**
```typescript
const formData = new FormData();
formData.append("audio", audioBlob);
formData.append("title", meetingTitle);
transcribeMutation.mutate(formData);
```

**After:**
```typescript
// Convert Blob to File if needed
const audioFile = audioBlob instanceof File
  ? audioBlob
  : new File([audioBlob], meetingTitle || "recording.webm", { type: audioBlob.type });

transcribeMutation.mutate(audioFile);
```

### Step 5: Add Proper Error Handling

Always handle errors with type checking:

```typescript
try {
  const result = await api.persons.getById(personId);
  // Handle success
} catch (error) {
  if (error instanceof ApiError) {
    // Handle API errors (400, 404, 500, etc.)
    console.error(`API Error ${error.status}: ${error.message}`);

    if (error.status === 404) {
      toast({ title: "Person not found", variant: "destructive" });
    } else if (error.status === 400) {
      toast({ title: "Invalid request", variant: "destructive" });
    }
  } else {
    // Handle unexpected errors
    console.error("Unexpected error:", error);
    toast({ title: "An unexpected error occurred", variant: "destructive" });
  }
}
```

## Complete Migration Examples

### Example 1: meeting-notes.tsx

**Components Updated:**
- Query for fetching all meeting notes
- Mutation for transcribing audio files
- Error handling with `ApiError`

**Files Changed:**
- `client/src/pages/meeting-notes.tsx`

**Changes Made:**
1. Added imports: `api`, `ApiError`, `queryClient`
2. Updated `useQuery` to use `api.meetingNotes.getAll()`
3. Updated mutation to use `api.meetingNotes.transcribe(audioFile)`
4. Added `ApiError` type checking in error handlers
5. Converted `Blob` to `File` when needed

**Result:**
- Full type safety with auto-completion
- Consistent error handling
- All 540 tests passing ✅

### Example 2: ai-voice-notes.tsx

**Components Updated:**
- Query for fetching meeting notes
- Mutation with mixed audio/manual transcript support
- Error handling with `ApiError`

**Special Considerations:**
- This component supports both audio files AND manual text input
- For audio files: uses `api.meetingNotes.transcribe()`
- For manual transcripts: still uses `fetch()` since API client doesn't support this yet

**Hybrid Approach:**
```typescript
if (audioBlob) {
  // Use API client for audio
  const audioFile = audioBlob instanceof File
    ? audioBlob
    : new File([audioBlob], 'recording.webm', { type: audioBlob.type });

  data = await api.meetingNotes.transcribe(audioFile);
} else {
  // Fall back to fetch for manual transcript (not yet in API client)
  const formData = new FormData();
  formData.append('manualTranscript', manualTranscript);

  const response = await fetch('/api/meeting-notes/transcribe', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new ApiError(errorData.error || 'Processing failed', response.status);
  }

  data = await response.json();
}
```

**Note:** Even when using `fetch()`, we still throw `ApiError` for consistency.

## Common Patterns

### Pattern 1: GET All Resources

```typescript
const { data, isLoading } = useQuery({
  queryKey: ["persons"],
  queryFn: () => api.persons.getAll(),
});
```

### Pattern 2: GET with Filters

```typescript
const { data, isLoading } = useQuery({
  queryKey: ["gifts", personId],
  queryFn: () => api.gifts.getAll(personId),
  enabled: !!personId, // Only run when personId exists
});
```

### Pattern 3: GET by ID

```typescript
const { data, isLoading } = useQuery({
  queryKey: ["persons", personId],
  queryFn: () => api.persons.getById(personId),
  enabled: !!personId,
});
```

### Pattern 4: CREATE Mutation

```typescript
const createMutation = useMutation({
  mutationFn: (data: InsertPerson) => api.persons.create(data),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["persons"] });
    toast({ title: "Person created successfully" });
  },
  onError: (error) => {
    const message = error instanceof ApiError
      ? error.message
      : "Failed to create person";
    toast({ title: "Error", description: message, variant: "destructive" });
  },
});

// Usage
createMutation.mutate({
  firstName: "Jane",
  lastName: "Doe",
  primaryEmail: "jane@example.com",
});
```

### Pattern 5: UPDATE Mutation

```typescript
const updateMutation = useMutation({
  mutationFn: ({ id, data }: { id: string; data: Partial<InsertPerson> }) =>
    api.persons.update(id, data),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["persons"] });
    toast({ title: "Person updated successfully" });
  },
});

// Usage
updateMutation.mutate({
  id: "person-123",
  data: { primaryEmail: "newemail@example.com" },
});
```

### Pattern 6: DELETE Mutation

```typescript
const deleteMutation = useMutation({
  mutationFn: (id: string) => api.persons.delete(id),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["persons"] });
    toast({ title: "Person deleted successfully" });
  },
});

// Usage
deleteMutation.mutate("person-123");
```

## Testing Migrated Components

After migration, verify:

1. **TypeScript compilation succeeds**
   ```bash
   npm run typecheck
   ```

2. **All tests pass**
   ```bash
   npm test
   ```

3. **Manual testing**
   - Test happy path (success cases)
   - Test error cases (404, 400, 500)
   - Test loading states
   - Verify error messages are user-friendly

## Migration Checklist

When migrating a component, ensure you've completed:

- [ ] Import `api` and `ApiError` from `@/lib/api`
- [ ] Import `queryClient` from `@/lib/queryClient` (if using mutations)
- [ ] Update all `useQuery` calls to use API client methods
- [ ] Update all `useMutation` calls to use API client methods
- [ ] Add proper error handling with `ApiError` type checking
- [ ] Update query keys to use domain names (no `/api/` prefix)
- [ ] Convert data formats (e.g., Blob → File) as needed
- [ ] Remove raw `fetch()` calls (or document why they remain)
- [ ] Test the component manually
- [ ] Run the test suite to verify no regressions
- [ ] Update component tests if needed

## API Client Reference

### Available API Modules

The centralized API client provides methods for 20 domains:

**Core Resources:**
- `api.persons` - Donor and contact management
- `api.gifts` - Gift tracking
- `api.opportunities` - Pipeline management
- `api.calendar` - Calendar events
- `api.grants` - Grant management
- `api.campaigns` - Campaign tracking
- `api.tasks` - Task management
- `api.interactions` - Donor interactions
- `api.fundraisingEvents` - Event management

**AI & Intelligence:**
- `api.ai` - AI features (predictive timing, wealth events, meeting briefs)
- `api.impactIntelligence` - AI chat for impact stories
- `api.analytics` - Analytics and reporting

**Content & Communication:**
- `api.content` - AI-generated content
- `api.meetingNotes` - Meeting transcription

**Dashboards & Reporting:**
- `api.dashboards` - Role-based dashboards
- `api.dataHealth` - Data quality metrics

**Workflow Automation:**
- `api.workflows` - Workflow builder
- `api.workflowUtilities` - Workflow utilities

**Organization:**
- `api.organizationCanvases` - Org mapping

**System:**
- `api.health` - System health checks

### Common Methods

All resource APIs follow a consistent pattern:

```typescript
api.<resource>.getAll(filters?)     // GET /api/<resource>
api.<resource>.getById(id)          // GET /api/<resource>/:id
api.<resource>.create(data)         // POST /api/<resource>
api.<resource>.update(id, data)     // PATCH /api/<resource>/:id
api.<resource>.delete(id)           // DELETE /api/<resource>/:id
```

## Troubleshooting

### Issue: TypeScript errors after migration

**Solution:** Ensure you're importing the correct types:
```typescript
import type { Person, InsertPerson } from "@shared/schema";
```

### Issue: Query not refetching after mutation

**Solution:** Make sure you're invalidating the correct query key:
```typescript
queryClient.invalidateQueries({ queryKey: ["persons"] });
```

### Issue: Error messages not showing properly

**Solution:** Check for `ApiError` instance:
```typescript
onError: (error) => {
  if (error instanceof ApiError) {
    console.log(error.message); // User-friendly message
    console.log(error.status);   // HTTP status code
  }
}
```

### Issue: File upload not working

**Solution:** Ensure you're passing a `File` object, not `FormData`:
```typescript
// Convert Blob to File if needed
const file = blob instanceof File
  ? blob
  : new File([blob], "filename.ext", { type: blob.type });

api.meetingNotes.transcribe(file);
```

## Next Steps

After migrating components to use the centralized API client:

1. **Remove unused utility functions** - Delete old API helper functions that are no longer needed
2. **Add more API endpoints** - Extend the API client with missing endpoints as needed
3. **Write component tests** - Add tests for components using MSW to mock API calls
4. **Document domain-specific patterns** - Add examples for complex domains (workflows, dashboards)

## Further Reading

- [API Client Documentation](./client/src/lib/api/README.md)
- [Complete API Client Summary](./API_CLIENT_COMPLETE.md)
- [React Query Documentation](https://tanstack.com/query/latest/docs/react/overview)

---

**Last Updated:** January 28, 2026
**Migrated Components:** 2 (meeting-notes.tsx, ai-voice-notes.tsx)
**Tests Passing:** 540 ✅
