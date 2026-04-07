# Sports Management Hub

## Current State
- 5 sports: Basketball, Soccer, Tennis, Swimming, Volleyball
- Backend Place type with getAllPlaces()
- initializePlaces() seeds only one generic Karate Club entry
- No sport-to-place association

## Requested Changes (Diff)

### Add
- 5 Chennai locations per sport: Ramapuram, Anna Nagar, Kolathur, Mylapore, Santhome
- sport field to Place type
- getPlacesBySport query in backend
- 25 seeded places total (5 sports x 5 locations)

### Modify
- Backend Place type: add sport Text field
- initializePlaces: seed all 25 sport+location entries with Chennai coordinates
- Frontend: show academies grouped by sport with all 5 locations

### Remove
- Generic non-Chennai place entries

## Implementation Plan
1. Update backend Place type to include sport field
2. Add getPlacesBySport query
3. Seed 25 entries in initializePlaces
4. Update frontend to show sport-specific academy locations
5. Update useQueries to support sport filtering
