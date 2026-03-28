# 🔐 Auth API REST

A production-ready **Authentication REST API** built with **Node.js**, **TypeScript**, and **Express**. This project is designed with a strong focus on scalability, security, and clean architecture, making it suitable for real-world applications.

---

## 🚀 Features

- User registration with email verification (OTP)
- Secure password hashing
- Email confirmation system
- OTP resend (refresh) functionality
- Login with optional persistent session (`rememberMe`)
- Logout endpoint
- Authenticated user retrieval (`/me`)
- Password recovery and reset flow
- Modular and scalable architecture
- Fully typed with TypeScript

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB
- JWT / Session-based authentication
- Email service (e.g., Nodemailer)

---

## 📁 Project Structure

```
src/
├── controllers/
├── services/
├── routes/
├── middlewares/
├── models/
├── utils/
├── config/
└── index.ts
```

---

## ⚙️ Installation

Clone the repository and install dependencies:

```
git clone https://github.com/your-username/auth-api-rest.git
cd auth-api-rest
npm install
```

Or using pnpm:

```
pnpm install
```

---

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```
PORT=3000
BASE_URL=your_production_api_url
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
EMAIL_HOST=your_email_host
EMAIL_PORT=your_email_port
EMAIL_USER=your_email_user
EMAIL_PASS=your_email_password
```

---

## ▶️ Running the Project

Development:

```
npm run dev
```

Production:

```
npm run build
npm start
```

---

## 📧 Email Verification Flow

1. User registers
2. API sends an OTP code via email
3. User confirms account using `/api/auth/email/confirm`
4. User can request a new code via `/api/auth/email/refresh` if needed

**Important:**  
A valid OTP code is required. If the code is missing or incorrect, verification will fail.

---

## 🔒 Security Considerations

- Passwords should be hashed using bcrypt
- Use JWT or secure cookies for authentication
- Validate all incoming data
- Implement rate limiting
- Store OTP codes securely with expiration
- Use HTTPS in production

---

## 📦 Build Output

Compiled files are generated inside the `dist/` directory.

---

## 📌 Best Practices

- Separation of concerns (Controller / Service / Routes)
- Environment-based configuration
- Strong typing with TypeScript
- Scalable architecture
- Reusable utilities and middlewares

---

## 🤝 Contributing

Contributions are welcome. Feel free to fork the repository and submit a pull request.

---

## 📄 License

ISC License

---

## 👨‍💻 Author

Wilfryn Viloria Rosario

---

> If you find this project useful, consider giving it a ⭐ on GitHub.
