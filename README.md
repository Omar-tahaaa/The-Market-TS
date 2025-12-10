# The Market TS

A modern, responsive e-commerce application built with Next.js 16 (App Router), TypeScript, and Material UI. This project demonstrates a scalable architecture using Redux Toolkit for state management and MongoDB for user authentication.

## 🚀 Live Demo

**[View Live Application](https://the-market-ts.vercel.app/)**

## 🚀 Features

- **User Authentication**: Secure Login and Registration system using JWT (via generic backend/Next.js API routes) and MongoDB.
- **Protected Routes**: Middleware/Component-level protection for authenticated-only pages.
- **Product Browsing**: Dynamic product fetching from external API (DummyJSON).
- **Category Filtering**: Real-time filtering of products by category.
- **Responsive Design**: Mobile-first UI built with Material UI, featuring a responsive Navbar and Grid layout.
- **State Management**: Centralized state using Redux Toolkit (Users, Products, Categories).
- **Form Handling**: Robust form validation using React Hook Form and Zod.
- **Notifications**: User feedback using React Toastify.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Library**: [Material UI (MUI)](https://mui.com/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Database**: [MongoDB](https://www.mongodb.com/) (with Mongoose)
- **Form Validation**: [Zod](https://zod.dev/) + [React Hook Form](https://react-hook-form.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)

## 📂 Project Structure

```
the-market-ts/
├── app/                    # Next.js App Router Pages & API
│   ├── api/                # Backend API Routes (Users, etc.)
│   ├── login/              # Login Page
│   ├── products/           # Protected Products Page
│   ├── register/           # Registration Page
│   ├── slices/             # Redux Slices (State Logic)
│   └── store/              # Redux Store Configuration
├── components/             # Reusable React Components (UI, Forms)
├── lib/                    # Library configurations (MongoDB connection)
├── models/                 # Mongoose Data Models
├── utils/                  # Utility functions & key constants
└── validations/            # Zod schemas for form validation
```
