🚗 Vehicle Rental System

A web-based Vehicle Rental System that allows users to browse vehicles, book them for specific dates, and manage bookings. The system includes an Admin Dashboard for managing vehicles, bookings, and revenue.
---
📌 Features

👤 User Features

- User Registration and Login
- Browse available vehicles
- Vehicle booking with start and end date
- Automatic price calculation
- View booking history
- Cancel bookings before the start date
- Vehicle availability tracking

---

🛠️ Admin Features

- Admin authentication
- Add new vehicles
- Edit vehicle details
- Delete vehicles
- Manage vehicle quantity
- Approve booking requests
- Cancel bookings
- View booking list
- Filter bookings by status and date
- View system statistics
- Track admin revenue

---

🧠 System Logic

Vehicle Availability

Available Vehicles = Total Quantity − Active Bookings

---

Booking Validation

The system ensures:

- Start date cannot be in the past
- End date must be after start date
- Vehicles cannot be double booked
- Bookings cannot exceed vehicle quantity

---

Booking Status

Bookings can have the following status:

- Status| Meaning
- Pending| Waiting for admin approval
- Booked| Approved by admin
- Cancelled| Cancelled by user or admin

---

Cancellation Rules

Users can cancel bookings only if:

- Current Date < Booking Start Date

This prevents cancellation after the booking period begins.

---

Revenue Calculation

- Admin revenue is calculated using confirmed bookings.

- Revenue = Price per Day × Number of Days

- Only bookings with status Booked are included.

---

🧑‍💻 Technologies Used

Frontend

- HTML5
- Tailwind CSS

Programming

- TypeScript
- JavaScript

Storage

- Browser LocalStorage

Tools

- Visual Studio Code
- Git
- GitHub

⚙️ Installation

Clone the repository:

git clone 

Navigate into the project folder:

cd vehicle-rental-system

Open the project in VS Code and run using Live Server.

---

▶️ How to Use

User

1. Register an account
2. Login
3. Browse vehicles
4. Select start and end dates
5. Book vehicle
6. Wait for admin approval

---

Admin

1. Login as admin
2. Manage vehicles
3. Approve bookings
4. View booking details
5. Monitor system revenue

---

📊 Admin Dashboard Features

The dashboard shows:

- Total vehicles
- Total users
- Total bookings
- Pending bookings
- Confirmed bookings
- Admin revenue

---

🔐 Security Features

- Role Based Access Control (RBAC)
- Session management
- Booking validation
- Admin-only management features

---

🚀 Future Improvements

Possible future enhancements:

- Online payment integration
- Real-time database (Firebase / MySQL)
- Email notifications
- Vehicle image uploads
- Booking analytics
- Mobile application support

---

📚 Learning Outcomes

Through this project I learned:

- Role Based Access Control
- Booking system logic
- Frontend state management
- UI design with Tailwind CSS
- TypeScript based web development

---

