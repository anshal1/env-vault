# 🛡️ EnvVault

**Your secrets. Safely in hand.**

EnvVault is a professional, security-focused vault for storing and managing environment variables and sensitive secrets. Designed with a "privacy-first" philosophy, it allows developers to establish a secure vault identity and manage their secrets without the friction of traditional account systems.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC)
![Drizzle](https://img.shields.io/badge/Drizzle-ORM-blue)

## ✨ Key Features

- **Zero-Knowledge Architecture**: Secrets are encrypted on the client side. The server never sees your plain-text environment variables or your master encryption key.
- **Vault Initiation**: A unique onboarding experience to establish your vault identity.
- **Client-Side Encryption**: Environment variables are hashed/encrypted in the browser using your secret key before being transmitted to the database.
- **Instant Retrieval**: Decrypt your secrets locally in the browser using your key.
- **Modern UX**: A sleek, dark-themed interface built with Tailwind CSS and Lucide icons for a developer-centric experience.
- **Full Lifecycle Management**: Easily add, search, retrieve, and delete environment secrets.

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database & ORM**: [Drizzle ORM](https://orm.drizzle.team/) with PostgreSQL
- **Security**:
    - `bcrypt` for password hashing
    - `jsonwebtoken` (JWT) for secure session management
- **Icons**: [Lucide React](https://lucide.dev/)

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/your-username/env-vault.git
    cd env-vault
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Environment Setup**
   Create a `.env` file in the root directory and add the following:

    ```env
    DATABASE_URL=postgres://user:password@localhost:5432/envvault
    # for authenticating a user
    SECRET=your_super_secret_jwt_key
    ```

4. **Database Migration**
   Push the schema to your database:

    ```bash
    npm run generate && npm run migrate
    ```

5. **Run the application**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

```text
├── app/
│   ├── initiate/       # Initiation flow (Onboarding) - Simple Username and Password
│   ├── actions/        # Server Actions (Env & User management)
│   ├── db/             # Database schema and connection
│   └── page.tsx        # Main Vault Dashboard
├── components/
│   ├── ui/             # Base UI components (Buttons, etc.)
│   ├── vault-screen.tsx # Vault listing and search
│   ├── store-screen.tsx # Secret entry form
│   └── ...             # Other modular components
└── lib/
    └── utils.ts        # Shared utility functions & security helpers
```

## 🔒 Security Model

EnvVault implements a **Zero-Knowledge** security model:

- **Client-Side Encryption**: The most critical security boundary. Encryption and decryption of environment variables happen entirely within the browser. The plain-text secrets and the encryption key **never leave the client**.
- **Vault Identity**: The `initiate` process creates your vault identity. The secret key provided during initiation is used to generate a secure JWT for authentication, allowing you to manage your vault.
- **Server-Side Storage**: The database only stores the encrypted hashes of your environment variables. Even in the event of a database breach, the secrets remain useless without the client-side master key.
- **Data Isolation**: Every secret is linked to a specific vault ID, ensuring strict ownership and access control.

## 📄 License

This project is licensed under the MIT License.
