# Typed API Client

Centralized, type-safe API client for all backend operations with full TypeScript support.

## Features

- ✅ **Type Safety**: Full TypeScript types from shared schema
- ✅ **Auto-complete**: IDE auto-completion for all API methods
- ✅ **Error Handling**: Consistent error handling with `ApiError`
- ✅ **Domain Organization**: Organized by business domain (persons, gifts, etc.)
- ✅ **Query Parameters**: Type-safe query parameter handling

## Usage

### Basic Example

```typescript
import { api } from '@/lib/api';

// Get all persons
const persons = await api.persons.getAll();

// Search persons
const results = await api.persons.getAll('John Doe');

// Get a single person
const person = await api.persons.getById('person-123');

// Create a new person
const newPerson = await api.persons.create({
  firstName: 'Jane',
  lastName: 'Smith',
  primaryEmail: 'jane@example.com',
  primaryPhone: '555-0100',
});

// Update a person
const updated = await api.persons.update('person-123', {
  primaryEmail: 'newemail@example.com',
});

// Delete a person
await api.persons.delete('person-123');
```

### With React Query

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

// Query
function PersonsList() {
  const { data: persons, isLoading } = useQuery({
    queryKey: ['persons'],
    queryFn: () => api.persons.getAll(),
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {persons?.map(person => (
        <div key={person.id}>{person.firstName} {person.lastName}</div>
      ))}
    </div>
  );
}

// Mutation
function CreatePersonForm() {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data: InsertPerson) => api.persons.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['persons'] });
    },
  });

  const handleSubmit = (data: InsertPerson) => {
    createMutation.mutate(data);
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### Error Handling

```typescript
import { api, ApiError } from '@/lib/api';

try {
  const person = await api.persons.getById('invalid-id');
} catch (error) {
  if (error instanceof ApiError) {
    console.error(`API Error ${error.status}: ${error.message}`);

    if (error.status === 404) {
      // Handle not found
    } else if (error.status === 400) {
      // Handle validation error
    }
  }
}
```

## Available APIs

### Persons
- `api.persons.getAll(search?: string)` - Get all persons with optional search
- `api.persons.getById(id: string)` - Get single person by ID
- `api.persons.create(data: InsertPerson)` - Create new person
- `api.persons.update(id: string, data: Partial<InsertPerson>)` - Update person
- `api.persons.delete(id: string)` - Delete person
- `api.persons.getDonors()` - Get donors for quadrant view
- `api.persons.updateEnergyScore(id: string, score: number)` - Update donor energy score
- `api.persons.updateStructureScore(id: string, score: number)` - Update donor structure score

### Gifts
- `api.gifts.getAll(personId?: string)` - Get all gifts (optional person filter)
- `api.gifts.getById(id: string)` - Get single gift by ID
- `api.gifts.create(data: InsertGift)` - Create new gift
- `api.gifts.update(id: string, data: Partial<InsertGift>)` - Update gift
- `api.gifts.delete(id: string)` - Delete gift

### Opportunities
- `api.opportunities.getAll(ownerId?: string)` - Get all opportunities (optional owner filter)
- `api.opportunities.getById(id: string)` - Get single opportunity by ID
- `api.opportunities.create(data: InsertOpportunity)` - Create new opportunity
- `api.opportunities.update(id: string, data: Partial<InsertOpportunity>)` - Update opportunity
- `api.opportunities.delete(id: string)` - Delete opportunity

### Calendar
- `api.calendar.getAll(userId?: string, startDate?: Date, endDate?: Date)` - Get calendar events with filters
- `api.calendar.getById(id: string)` - Get single calendar event by ID
- `api.calendar.create(data: InsertCalendarEvent)` - Create new calendar event
- `api.calendar.update(id: string, data: Partial<InsertCalendarEvent>)` - Update calendar event
- `api.calendar.delete(id: string)` - Delete calendar event

### Grants
- `api.grants.getAll(ownerId?: string, stage?: string)` - Get all grants with optional filters
- `api.grants.getById(id: string)` - Get single grant by ID
- `api.grants.create(data: InsertGrant)` - Create new grant
- `api.grants.update(id: string, data: Partial<InsertGrant>)` - Update grant
- `api.grants.delete(id: string)` - Delete grant

### Campaigns
- `api.campaigns.getAll()` - Get all campaigns
- `api.campaigns.getById(id: string)` - Get single campaign by ID
- `api.campaigns.create(data: InsertCampaign)` - Create new campaign
- `api.campaigns.update(id: string, data: Partial<InsertCampaign>)` - Update campaign
- `api.campaigns.delete(id: string)` - Delete campaign

### Tasks
- `api.tasks.getAll(ownerId?: string, completed?: boolean)` - Get all tasks with optional filters
- `api.tasks.getById(id: string)` - Get single task by ID
- `api.tasks.create(data: InsertTask)` - Create new task
- `api.tasks.update(id: string, data: Partial<InsertTask>)` - Update task
- `api.tasks.delete(id: string)` - Delete task

### Interactions
- `api.interactions.getAll(personId?: string)` - Get all interactions (optional person filter)
- `api.interactions.getById(id: string)` - Get single interaction by ID
- `api.interactions.create(data: InsertInteraction)` - Create new interaction
- `api.interactions.update(id: string, data: Partial<InsertInteraction>)` - Update interaction
- `api.interactions.delete(id: string)` - Delete interaction

### Fundraising Events
- `api.fundraisingEvents.getAll()` - Get all fundraising events

### AI Features
- `api.ai.getPredictiveTiming()` - Get predictive major gift timing scores
- `api.ai.getWealthEvents()` - Get wealth event monitoring data
- `api.ai.getMeetingBriefs()` - Get AI-generated meeting briefs
- `api.ai.getVoiceNotes()` - Get voice note transcriptions

### Analytics
- `api.analytics.getPeerBenchmarks()` - Get peer benchmarking data
- `api.analytics.getSentimentAnalysis()` - Get sentiment analysis for donors
- `api.analytics.getPortfolioOptimization()` - Get portfolio optimization recommendations

### Content (AI-Generated)
- `api.content.getOutreachTemplates()` - Get AI-generated outreach templates
- `api.content.getGrantProposals()` - Get AI-generated grant proposals
- `api.content.getImpactReports()` - Get AI-generated impact reports

### Data Health
- `api.dataHealth.getMetrics()` - Get data quality and health metrics

### Dashboards
- `api.dashboards.getHome()` - Get executive overview dashboard
- `api.dashboards.getMGO()` - Get Major Gifts Officer dashboard
- `api.dashboards.getDevDirector()` - Get Development Director dashboard
- `api.dashboards.getCEO()` - Get CEO strategic dashboard

### Workflows
- `api.workflows.getAll(filters?)` - Get all workflows with optional filters
- `api.workflows.getById(id)` - Get workflow by ID with blocks and connections
- `api.workflows.create(data)` - Create new workflow
- `api.workflows.update(id, data)` - Update workflow
- `api.workflows.delete(id)` - Delete workflow
- `api.workflows.clone(id)` - Clone workflow
- `api.workflows.getBlocks(workflowId)` - Get workflow blocks
- `api.workflows.createBlock(workflowId, data)` - Create workflow block
- `api.workflows.updateBlockPositions(workflowId, positions)` - Update block positions
- `api.workflows.updateBlock(workflowId, blockId, data)` - Update workflow block
- `api.workflows.deleteBlock(workflowId, blockId)` - Delete workflow block
- `api.workflows.getConnections(workflowId)` - Get workflow connections
- `api.workflows.createConnection(workflowId, data)` - Create workflow connection
- `api.workflows.deleteConnection(workflowId, connectionId)` - Delete workflow connection

### Workflow Utilities
- `api.workflowUtilities.getCalendarEvents()` - Get calendar events (workflow context)
- `api.workflowUtilities.getStewardshipWorkflows()` - Get stewardship workflows
- `api.workflowUtilities.getTaskPriorities()` - Get AI-calculated task priorities
- `api.workflowUtilities.getGiftRegistries()` - Get gift registries

### Meeting Notes
- `api.meetingNotes.getAll()` - Get all meeting notes
- `api.meetingNotes.transcribe(audioFile)` - Transcribe and analyze audio file

### Organization Canvases
- `api.organizationCanvases.getAll(ownerId?)` - Get all organization canvases
- `api.organizationCanvases.getById(id)` - Get organization canvas by ID
- `api.organizationCanvases.create(data)` - Create organization canvas
- `api.organizationCanvases.update(id, data)` - Update organization canvas
- `api.organizationCanvases.delete(id)` - Delete organization canvas

### Impact Intelligence
- `api.impactIntelligence.chat(request)` - Chat with AI for impact stories and outcomes

### Health & Monitoring
- `api.health.getHealth()` - Get overall system health
- `api.health.getLiveness()` - Get Kubernetes liveness probe
- `api.health.getReadiness()` - Get Kubernetes readiness probe

## Migration from Old API

### Before (old pattern)
```typescript
const response = await fetch('/api/persons', {
  method: 'GET',
  credentials: 'include',
});
const persons = await response.json();
```

### After (typed client)
```typescript
const persons = await api.persons.getAll();
```

### Before (with apiRequest)
```typescript
const response = await apiRequest('POST', '/api/gifts', giftData);
const gift = await response.json();
```

### After (typed client)
```typescript
const gift = await api.gifts.create(giftData);
```

## Benefits

1. **Compile-time Type Checking**: Catch errors before runtime
2. **Auto-completion**: IDE suggests available methods and parameters
3. **Consistent Error Handling**: All errors are `ApiError` instances
4. **Easier Testing**: Mock at the API layer instead of fetch
5. **Single Source of Truth**: All API calls go through one client
6. **Refactoring Safe**: Rename/change types and get instant feedback
