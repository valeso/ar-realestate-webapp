# API Specification

## Base URL
```
Development: http://localhost:3000/api/v1
Production: https://api.ar-realestate.com/api/v1
```

## Authentication
All endpoints (except auth endpoints) require JWT token in header:
```
Authorization: Bearer <token>
```

---

## Auth Endpoints

### POST /auth/register
Register a new user

**Request:**
```json
{
  "email": "user@example.com",
  "password": "secure_password",
  "full_name": "John Doe",
  "role": "buyer" // or "seller"
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "full_name": "John Doe",
  "role": "buyer",
  "token": "jwt_token",
  "refresh_token": "refresh_token"
}
```

### POST /auth/login
Login user

**Request:**
```json
{
  "email": "user@example.com",
  "password": "secure_password"
}
```

**Response (200):**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "full_name": "John Doe",
  "role": "buyer",
  "token": "jwt_token",
  "refresh_token": "refresh_token"
}
```

### POST /auth/refresh
Refresh access token

**Request:**
```json
{
  "refresh_token": "refresh_token"
}
```

**Response (200):**
```json
{
  "token": "new_jwt_token"
}
```

### POST /auth/logout
Logout user (revoke tokens)

**Response (200):**
```json
{
  "message": "Logged out successfully"
}
```

---

## User Endpoints

### GET /users/me
Get current user profile

**Response (200):**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "full_name": "John Doe",
  "role": "buyer",
  "avatar_url": "https://s3.amazonaws.com/...",
  "created_at": "2026-07-25T10:00:00Z"
}
```

### PUT /users/me
Update current user profile

**Request:**
```json
{
  "full_name": "Jane Doe",
  "avatar_url": "https://s3.amazonaws.com/..."
}
```

**Response (200):**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "full_name": "Jane Doe",
  "role": "buyer",
  "avatar_url": "https://s3.amazonaws.com/...",
  "updated_at": "2026-07-25T11:00:00Z"
}
```

### GET /users/:id
Get user profile by ID

**Response (200):**
```json
{
  "id": "uuid",
  "full_name": "John Doe",
  "avatar_url": "https://s3.amazonaws.com/...",
  "role": "seller",
  "properties_count": 15,
  "created_at": "2026-07-25T10:00:00Z"
}
```

---

## Property Endpoints

### POST /properties
Create new property listing

**Request (multipart/form-data):**
```
title: "Beautiful House in Downtown"
description: "3 bed, 2 bath, modern design"
price: 450000
property_type: "house"
bedrooms: 3
bathrooms: 2
square_feet: 2500
address: "123 Main St, City, State"
latitude: 40.7128
longitude: -74.0060
images: [file1.jpg, file2.jpg, file3.jpg]
```

**Response (201):**
```json
{
  "id": "uuid",
  "user_id": "uuid",
  "title": "Beautiful House in Downtown",
  "description": "3 bed, 2 bath, modern design",
  "price": 450000,
  "property_type": "house",
  "bedrooms": 3,
  "bathrooms": 2,
  "square_feet": 2500,
  "address": "123 Main St, City, State",
  "location": {
    "latitude": 40.7128,
    "longitude": -74.0060
  },
  "images": [
    {
      "id": "uuid",
      "url": "https://s3.amazonaws.com/...",
      "order": 0
    }
  ],
  "3d_model_url": null,
  "created_at": "2026-07-25T10:00:00Z",
  "updated_at": "2026-07-25T10:00:00Z"
}
```

### GET /properties
List properties with filtering and pagination

**Query Parameters:**
```
page: 1 (default)
limit: 20 (default)
property_type: house,apartment
min_price: 100000
max_price: 500000
bedrooms: 3
bathrooms: 2
latitude: 40.7128
longitude: -74.0060
radius: 5 (miles)
search: "downtown"
sort: "price_asc" // or "price_desc", "created_at", "distance"
```

**Response (200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "title": "Beautiful House in Downtown",
      "price": 450000,
      "property_type": "house",
      "bedrooms": 3,
      "bathrooms": 2,
      "square_feet": 2500,
      "location": {
        "latitude": 40.7128,
        "longitude": -74.0060
      },
      "images": [
        {
          "id": "uuid",
          "url": "https://s3.amazonaws.com/..."
        }
      ],
      "seller": {
        "id": "uuid",
        "full_name": "John Doe",
        "avatar_url": "https://s3.amazonaws.com/..."
      },
      "created_at": "2026-07-25T10:00:00Z"
    }
  ],
  "pagination": {
    "total": 156,
    "page": 1,
    "limit": 20,
    "pages": 8
  }
}
```

### GET /properties/:id
Get property details

**Response (200):**
```json
{
  "id": "uuid",
  "title": "Beautiful House in Downtown",
  "description": "3 bed, 2 bath, modern design",
  "price": 450000,
  "property_type": "house",
  "bedrooms": 3,
  "bathrooms": 2,
  "square_feet": 2500,
  "address": "123 Main St, City, State",
  "location": {
    "latitude": 40.7128,
    "longitude": -74.0060
  },
  "images": [
    {
      "id": "uuid",
      "url": "https://s3.amazonaws.com/...",
      "order": 0
    }
  ],
  "3d_model_url": "https://s3.amazonaws.com/.../model.glb",
  "seller": {
    "id": "uuid",
    "full_name": "John Doe",
    "avatar_url": "https://s3.amazonaws.com/...",
    "email": "john@example.com"
  },
  "is_favorite": false,
  "created_at": "2026-07-25T10:00:00Z",
  "updated_at": "2026-07-25T10:00:00Z"
}
```

### PUT /properties/:id
Update property (only by owner)

**Request:**
```json
{
  "title": "Updated Title",
  "price": 475000,
  "description": "Updated description"
}
```

**Response (200):**
```json
{
  "id": "uuid",
  "title": "Updated Title",
  "price": 475000,
  "description": "Updated description",
  "updated_at": "2026-07-25T11:00:00Z"
}
```

### DELETE /properties/:id
Delete property (only by owner)

**Response (200):**
```json
{
  "message": "Property deleted successfully"
}
```

### POST /properties/:id/images
Upload additional images to property

**Request (multipart/form-data):**
```
images: [file1.jpg, file2.jpg]
```

**Response (201):**
```json
{
  "images": [
    {
      "id": "uuid",
      "url": "https://s3.amazonaws.com/...",
      "order": 3
    }
  ]
}
```

---

## Favorites Endpoints

### POST /favorites/:property_id
Add property to favorites

**Response (201):**
```json
{
  "id": "uuid",
  "property_id": "uuid",
  "created_at": "2026-07-25T10:00:00Z"
}
```

### DELETE /favorites/:property_id
Remove property from favorites

**Response (200):**
```json
{
  "message": "Removed from favorites"
}
```

### GET /favorites
Get user's favorite properties

**Query Parameters:**
```
page: 1
limit: 20
```

**Response (200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "property_id": "uuid",
      "property": {
        "id": "uuid",
        "title": "Beautiful House",
        "price": 450000,
        "images": []
      },
      "created_at": "2026-07-25T10:00:00Z"
    }
  ],
  "pagination": {
    "total": 45,
    "page": 1,
    "limit": 20,
    "pages": 3
  }
}
```

---

## Messages Endpoints

### POST /messages
Send message

**Request:**
```json
{
  "recipient_id": "uuid",
  "property_id": "uuid", // optional
  "content": "I'm interested in this property!"
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "sender_id": "uuid",
  "recipient_id": "uuid",
  "property_id": "uuid",
  "content": "I'm interested in this property!",
  "read": false,
  "created_at": "2026-07-25T10:00:00Z"
}
```

### GET /messages
Get user's messages (conversations)

**Query Parameters:**
```
page: 1
limit: 20
unread_only: false
```

**Response (200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "sender_id": "uuid",
      "recipient_id": "uuid",
      "other_user": {
        "id": "uuid",
        "full_name": "Jane Smith",
        "avatar_url": "https://s3.amazonaws.com/..."
      },
      "last_message": "Yes, available for viewing tomorrow!",
      "unread_count": 2,
      "created_at": "2026-07-25T10:00:00Z"
    }
  ],
  "pagination": {
    "total": 12,
    "page": 1,
    "limit": 20,
    "pages": 1
  }
}
```

### GET /messages/:conversation_id
Get message history with user

**Query Parameters:**
```
page: 1
limit: 50
```

**Response (200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "sender_id": "uuid",
      "recipient_id": "uuid",
      "content": "Is this property still available?",
      "read": true,
      "created_at": "2026-07-25T10:00:00Z"
    }
  ],
  "pagination": {
    "total": 8,
    "page": 1,
    "limit": 50,
    "pages": 1
  }
}
```

### PUT /messages/:id/read
Mark message as read

**Response (200):**
```json
{
  "id": "uuid",
  "read": true
}
```

---

## AR Endpoints

### POST /ar/generate-model
Generate 3D model from property images (async)

**Request:**
```json
{
  "property_id": "uuid"
}
```

**Response (202):**
```json
{
  "job_id": "uuid",
  "status": "processing",
  "message": "Model generation started. Check back soon."
}
```

### GET /ar/model-status/:job_id
Check 3D model generation status

**Response (200):**
```json
{
  "job_id": "uuid",
  "status": "completed", // or "processing", "failed"
  "model_url": "https://s3.amazonaws.com/.../model.glb",
  "created_at": "2026-07-25T10:00:00Z"
}
```

### POST /ar/sessions
Create AR viewing session (for analytics)

**Request:**
```json
{
  "property_id": "uuid",
  "duration_seconds": 120,
  "actions": ["rotate", "scale", "measure"]
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "property_id": "uuid",
  "duration_seconds": 120,
  "actions": ["rotate", "scale", "measure"],
  "created_at": "2026-07-25T10:00:00Z"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "BAD_REQUEST",
  "message": "Invalid input parameters",
  "details": {
    "email": "Invalid email format"
  }
}
```

### 401 Unauthorized
```json
{
  "error": "UNAUTHORIZED",
  "message": "Missing or invalid authentication token"
}
```

### 403 Forbidden
```json
{
  "error": "FORBIDDEN",
  "message": "You don't have permission to perform this action"
}
```

### 404 Not Found
```json
{
  "error": "NOT_FOUND",
  "message": "Resource not found"
}
```

### 409 Conflict
```json
{
  "error": "CONFLICT",
  "message": "Resource already exists"
}
```

### 429 Too Many Requests
```json
{
  "error": "RATE_LIMIT_EXCEEDED",
  "message": "Too many requests. Try again later."
}
```

### 500 Internal Server Error
```json
{
  "error": "INTERNAL_SERVER_ERROR",
  "message": "An unexpected error occurred"
}
```

---

## Rate Limiting

- **Auth endpoints**: 5 requests per minute per IP
- **Other endpoints**: 100 requests per minute per user
- **Upload endpoints**: 10 requests per minute per user

Headers returned:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1690360000
```

---

## Pagination

All list endpoints support pagination:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20, max: 100)

Response includes:
```json
{
  "pagination": {
    "total": 156,
    "page": 1,
    "limit": 20,
    "pages": 8
  }
}
```
