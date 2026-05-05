# Task Manager CRUD API

A simple REST API built with Node.js and Express. Uses in-memory storage (no database required).

## Setup

```bash
npm install
npm start        # production
npm run dev      # with auto-reload
```

Server runs on `http://localhost:3000`

---

## API Endpoints

### Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | List all tasks |
| GET | `/tasks/:id` | Get a task by ID |
| POST | `/tasks` | Create a new task |
| PUT | `/tasks/:id` | Update a task |
| PATCH | `/tasks/:id/status` | Update status only |
| DELETE | `/tasks/:id` | Delete a task |

---

### Query Parameters for GET /tasks

| Param | Values | Description |
|-------|--------|-------------|
| `status` | `To Do`, `In Progress`, `Completed` | Filter by status |
| `sort` | `title`, `status`, `createdAt` | Sort results |
| `search` | any string | Search in title or description |

**Example:**
```
GET /tasks?status=In Progress&sort=title
GET /tasks?search=bug
```

---

### Task Object

```json
{
  "id": "uuid",
  "title": "Fix login bug",
  "description": "Users can't log in with Google",
  "status": "To Do",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

Valid statuses: `"To Do"`, `"In Progress"`, `"Completed"`

---

### Examples

**Create a task**
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Build API", "description": "Build the task manager API", "status": "In Progress"}'
```

**Update a task**
```bash
curl -X PUT http://localhost:3000/tasks/<id> \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated title", "status": "Completed"}'
```

**Mark as completed**
```bash
curl -X PATCH http://localhost:3000/tasks/<id>/status \
  -H "Content-Type: application/json" \
  -d '{"status": "Completed"}'
```

**Delete a task**
```bash
curl -X DELETE http://localhost:3000/tasks/<id>
```
