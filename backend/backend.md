# Backend Home Assignment: Todo List Application Migration

## Objective  
Migrate the existing backend code for the Todo List application from Node.js (Express.js) to ASP.NET. The new backend should provide the necessary endpoints to support the frontend functionality of the Todo List application.

## Requirements

### 1. Migration:
- Migrate the existing backend codebase from Node.js (Express.js) to ASP.NET Core.
- Ensure that the new backend maintains the same functionality as the original, including user authentication and CRUD operations for todo items.

### 2. Authentication:
- Implement user authentication using ASP.NET Identity or a similar authentication mechanism.
- Ensure secure login and registration processes.
- Use JWT or session-based authentication as per the ASP.NET architecture.

### 3. Todo List Features:
- **CRUD Operations:** 
  - Implement endpoints for creating, reading, updating, and deleting todo items.
- **Todo Item Structure:**
  - Each todo item should have at least the following properties:
    - Title (string)
    - Description (string)
    - Status (boolean: completed or not)
    - Due Date (date)
- **User-specific Todos:**
  - Ensure that each user can only manage their own todo items.

### 4. Endpoints:
- Create the following endpoints:
  - `POST /api/v1/auth/register` - for user registration.
  - `POST /api/v1/auth/login` - for user login.
  - `GET /api/v1/todos` - to retrieve all todo items for the authenticated user.
  - `POST /api/v1/todos` - to create a new todo item.
  - `PUT /api/v1/todos/{id}` - to update an existing todo item.
  - `DELETE /api/v1/todos/{id}` - to delete a todo item.

### 5. Frontend Integration:
- Ensure that the new ASP.NET backend can be easily integrated with the existing React.js frontend.
- Maintain the same API structure to avoid breaking changes in the frontend.

### 6. Testing:
- Write unit tests for critical components and functions in the ASP.NET application.
- Ensure the application is free of critical bugs.

### 7. Documentation:
- Provide clear documentation on how to set up and run the ASP.NET application.
- Include comments in the code to explain key functionalities.

### 8. Submission Guidelines:
- Submit the code repository (e.g., GitHub) with a clear commit history.
- Include a README file with instructions on how to run the application.
- Provide a demo link if hosted online.

## Evaluation Criteria
- Code quality and organization.
- Functionality and adherence to requirements.
- User interface design and user experience.
- Testing coverage and documentation.
