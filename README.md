# Restaurant Review API

> A RESTful Node.js API for creating, managing, and discovering geo-located restaurant reviews — with built-in user authentication and photo upload support.

---

## Overview

This API powers a full restaurant review platform. Users can register accounts, submit reviews with photos and geographic coordinates, edit or delete their own reviews, and query for restaurants near a given location. All routes were tested with **Postman** and follow REST conventions throughout.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Runtime** | Node.js |
| **Framework** | Express |
| **Architecture** | MVC (Models, Controllers, Routes, Handlers) |
| **Database** | MongoDB (remote, via `variables.env`) |
| **Auth** | Session-based login / registration |
| **File Uploads** | Multipart form-data (photo support) |
| **Geo Queries** | Coordinate-based proximity search |
| **Testing** | Postman |

---

## Getting Started

### Prerequisites

- Node.js
- npm
- A `variables.env` file with database credentials (place in the root `restaurantReviewAPI/` directory)

### Installation

```bash
npm install
```

### Run the Server

```bash
node start
```

---

## API Endpoints

### Reviews

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/reviews` | Get all reviews |
| `POST` | `/review/create` | Create a new review |
| `POST` | `/reviews/:id/edit` | Edit an existing review |
| `DELETE` | `/reviews/:id/delete` | Delete a review |
| `GET` | `/account/` | Get all reviews for the logged-in user |

### Geo Search

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/reviews/near?lat=&lng=` | Find reviews within 10 miles of a location |

**Example:**
```
GET /api/reviews/near?lat=37.775866&lng=-122.412446
```

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/register` | Register a new account |
| `POST` | `/login` | Log into an account |
| `GET` | `/logout` | Log out |

---

## Request Formats

### Create / Edit a Review (`form-data`)

| Field | Type | Description |
|---|---|---|
| `location.coordinates[0]` | Number | Longitude |
| `location.coordinates[1]` | Number | Latitude |
| `text` | String | Review body |
| `photo` | File | Photo of the restaurant |

### Register (`urlencoded`)

| Field | Type |
|---|---|
| `name` | String |
| `email` | String |
| `password` | String |
| `password-confirm` | String |

### Login (`urlencoded`)

| Field | Type |
|---|---|
| `email` | String |
| `password` | String |

---

## Project Structure

```
restaurantReviewAPI/
├── controllers/    # Business logic
├── handlers/       # Middleware and request handling
├── models/         # MongoDB data models
├── routes/         # Route definitions
├── public/images/  # Uploaded images
├── app.js          # Express app setup
└── start.js        # Server entry point
```

---

## Notes

- The `variables.env` file required for database access is not included in the repository.
- `:id` in route parameters refers to the MongoDB `_id` field of a review document.
