# 🔫 ROUND App Backend (NestJS + MongoDB)

**ROUND** is a mobile and web application designed to help responsible firearm owners keep track of their equipment. It allows users to log rounds fired, track firearm maintenance, and manage their personal firearm inventory.

This backend is built using **NestJS** and **MongoDB**, with a RESTful API architecture.

---

## 📁 Collections Overview

### 1. Users

This collection stores user information including:
- First Name
- Last Name
- Email (unique)
- Password (hashed)
- Reset Password Token
- Reset Password Expiration
- Timestamps (createdAt, updatedAt)

### 2. Firearms

The firearms collection contains details about each user's firearms:
- Make
- Model
- Type
- Caliber
- Action
- Round Count
- Last Cleaned Date
- Reminder Interval
- User ID (reference to Users collection)
- Timestamps (createdAt, updatedAt)

### 3. UserProfile (Planned Feature)

This collection will store user dashboard and profile information:
- User ID (reference to Users collection)
- Total Rounds Fired
- Total Firearms
- Last Range Visit
- Preferred Range
- Favorite Firearms (array of Firearm references)
- Recent Activities
- Statistics
  - Monthly Rounds
  - Yearly Rounds
  - Maintenance Due
- Preferences
  - Default View
  - Notifications
  - Theme
- Timestamps (createdAt, updatedAt)

### 4. Rounds Log (Planned Feature)

This collection will track shooting sessions. It will log:
- Number of rounds fired
- Date
- Ammo type
- Location
- Additional notes
- User ID (reference to Users collection)
- Firearm ID (reference to Firearms collection)
- Timestamps (createdAt, updatedAt)

### 5. Maintenance Log (Planned Feature)

This collection will be used to record and schedule firearm maintenance:
- Type of maintenance (cleaning, inspection, etc.)
- Date
- Notes
- Status (completed/scheduled)
- User ID (reference to Users collection)
- Firearm ID (reference to Firearms collection)
- Timestamps (createdAt, updatedAt)

---

## 🌐 REST API Endpoints

### 🔐 Auth & User

| Method | Endpoint            | Description                          |
|--------|---------------------|--------------------------------------|
| POST   | `/auth/signup`      | Register a new user                  |
| POST   | `/auth/login`       | Authenticate and receive JWT token   |
| DELETE | `/auth/delete`      | Delete a user account                |
| POST   | `/auth/forgot-password` | Request password reset email     |

### 🔫 Firearms

| Method | Endpoint          | Description                        |
|--------|-------------------|------------------------------------|
| POST   | `/firearm/create` | Add a new firearm                  |
| GET    | `/firearm/userId` | Get all firearms for a user        |
| PUT    | `/firearm/:firearmId` | Update firearm details         |
| DELETE | `/firearm/:firearmId` | Delete a firearm              |

### 👤 UserProfile (Planned Feature)

| Method | Endpoint            | Description                          |
|--------|---------------------|--------------------------------------|
| GET    | `/profile`          | Get user's profile information       |
| POST   | `/profile`          | Create user profile                  |
| PUT    | `/profile`          | Update user profile                  |
| GET    | `/profile/stats`    | Get user statistics                  |
| PUT    | `/profile/preferences` | Update user preferences         |

### 📊 Rounds Log (Planned Feature)

| Method | Endpoint            | Description                          |
|--------|---------------------|--------------------------------------|
| GET    | `/rounds-log`       | Get all rounds fired logs            |
| POST   | `/rounds-log`       | Add a new rounds fired entry         |
| GET    | `/rounds-log/:id`   | Get a specific round log entry       |
| PUT    | `/rounds-log/:id`   | Update a round log entry             |
| DELETE | `/rounds-log/:id`   | Delete a round log entry             |

### 🧰 Maintenance Log (Planned Feature)

| Method | Endpoint                 | Description                            |
|--------|--------------------------|----------------------------------------|
| GET    | `/maintenance-log`       | Get all maintenance entries            |
| POST   | `/maintenance-log`       | Add a new maintenance entry            |
| GET    | `/maintenance-log/:id`   | Get a specific maintenance entry       |
| PUT    | `/maintenance-log/:id`   | Update a maintenance entry             |
| DELETE | `/maintenance-log/:id`   | Delete a maintenance entry             |

---

## ⚙️ Tech Stack

- **Backend Framework:** NestJS
- **Database:** MongoDB
- **Authentication:** JWT-based
- **Validation:** DTOs using `class-validator`
- **Email Service:** Integrated for password reset functionality

---

## 🛠️ Getting Started

### 📦 Install dependencies

```bash
npm install
```

### 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:
```
DB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=your_jwt_expiration_time
```

### 🚀 Running the Application

```bash
# Development
npm run start

# Watch mode
npm run start:dev

# Production
npm run start:prod