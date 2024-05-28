# Attendance System with Active Notifications

This project is an attendance system with active notifications. It features a role-based login system with two roles: `ADMIN` and `EMPLOYEE`. Each role has specific functionalities to manage attendance and leaves effectively.

## Table of Contents
- [Features](#features)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Features

### General
- Role-based login system with `ADMIN` and `EMPLOYEE` roles.

### Employee Dashboard
- **Check In/Out**: Button to start and end the workday.
- **Time Tracker**: Stopwatch to track total work time, displayed prominently.
- **Break Button**: Button to record breaks without stopping the stopwatch. Displays "On Break" or "Lunch Break" messages.
- **Reminders**: Notification system to remind employees of check-in and check-out timings.
- **Leaves**: Form to request leave, which sends a request to the admin for approval. Notifications are triggered for approved leaves.
- **Attendance History**: Table showing attendance history, including time spent each day and leave details.

### Admin Dashboard
- All features of the employee dashboard.
- **View All Employees**: View all employee data, including quick view for check-in, check-out, break, or leave status.
- **Manage Employees**: Features to add, block, or remove employees.

## Installation


1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/attendance-system.git
   cd attendance-system

2. **add .env file**

    there include

    **PORT**
    **DB_URL** 
    **JWT_SECRET_KEY** 
    **USER_PASS**
    **EMAL_ID**

3.  **Run the code Using npm start**