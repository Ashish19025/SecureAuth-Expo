# SecureAuth Expo

SecureAuth Expo is a cross-platform authentication starter built with Expo
and React Native. It provides email/password and OAuth sign-in through Clerk,
then synchronizes authenticated users with an Express and MongoDB backend.

## Features

- Email/password sign-up and sign-in
- Email verification during registration
- Google, Facebook, GitHub, and Apple OAuth flows
- Secure Clerk token storage with Expo SecureStore
- Protected routes using Expo Router
- Backend user synchronization at `POST /api/users/sync`
- Request validation, rate limiting, Helmet, and Morgan logging

## Project structure

```text
.
├── src/                 # Expo mobile application
│   ├── app/             # Expo Router screens and auth routes
│   ├── components/      # Reusable form and OAuth components
│   └── services/        # API clients
└── Backend/             # Express API and MongoDB models
```

## Requirements

- Node.js 20 or newer
- A Clerk application
- MongoDB (local or hosted)

## Configuration

Create a `.env` file in the project root:

```env
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key
EXPO_PUBLIC_BACKEND_URL=http://localhost:5000
```

Create a separate `Backend/.env` file:

```env
MONGO_URI=mongodb://127.0.0.1:27017/secureauth
CLERK_SECRET_KEY=sk_test_your_secret_key
```

For a physical device, set `EXPO_PUBLIC_BACKEND_URL` to the machine's
local-network IP address instead of `localhost`. Configure the OAuth providers
and redirect URLs in the Clerk dashboard before testing social sign-in.

## Getting started

Install the mobile app dependencies and start Expo:

```bash
npm install
npx expo start
```

In another terminal, install and start the backend:

```bash
cd Backend
npm install
npm run dev
```

Use Expo Go, an Android emulator, an iOS simulator, or a development build
to open the app. The backend listens on port `5000`.

## Useful commands

| Command | Description |
| --- | --- |
| `npm run start` | Start the Expo development server |
| `npm run android` | Run the app on Android |
| `npm run ios` | Run the app on iOS |
| `npm run web` | Run the web build |
| `npm run lint` | Check the Expo project |
| `cd Backend && npm run dev` | Start the API with watch mode |

## Authentication flow

Clerk manages registration, login, verification, and OAuth sessions in the
mobile app. After a successful login, the app sends the authenticated user's
details to the backend with a Clerk bearer token. The API verifies that token,
creates or updates the matching MongoDB user, and records the latest login.
