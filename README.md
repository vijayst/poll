# Pollsy.co - Modern Next.js Polling Application

A modern polling application built with Next.js 15, TypeScript, and Firebase, migrated from a legacy React 16.8 create-react-app application.

## 🚀 Features

- **User Authentication**: Email/password and Google authentication via Firebase Auth
- **Poll Management**: Create, view, and manage polls
- **Real-time Updates**: Powered by Firebase Firestore
- **Modern UI**: Built with Tailwind CSS for a clean, responsive design
- **Type Safety**: Full TypeScript support
- **State Management**: Redux Toolkit for efficient state handling
- **Server-Side Rendering**: Next.js 15 App Router with server and client components

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Build Tool**: Next.js built-in

## 📦 Migration from Legacy App

This application has been successfully migrated from:

- **React 16.8.6** → **React 18.3.0**
- **React Router v5** → **Next.js App Router**
- **Redux (thunk)** → **Redux Toolkit**
- **Semantic UI** → **Tailwind CSS**
- **Create React App** → **Next.js 15**
- **Babel/Webpack** → **Next.js Turbopack**

## 🏗️ Project Structure

```
poll2/
├── app/                      # Next.js app directory
│   ├── polls/               # Poll-related pages
│   │   ├── create/          # Create poll page
│   │   └── my/              # My polls page
│   ├── login/               # Login page
│   ├── register/            # Registration page
│   ├── profile/             # User profile page
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   ├── providers.tsx        # Redux provider
│   └── globals.css          # Global styles
├── components/
│   └── layout/
│       └── Header.tsx       # Navigation header
├── store/
│   ├── store.ts             # Redux store configuration
│   └── slices/              # Redux slices
│       ├── authSlice.ts     # Authentication state
│       ├── pollsSlice.ts    # Polls state
│       └── messageSlice.ts  # UI messages
├── hooks/
│   └── useRedux.ts          # Typed Redux hooks
├── lib/
│   ├── firebase.ts          # Firebase configuration
│   ├── firebase-legacy.ts   # Legacy compatibility layer
│   ├── utils.ts             # Utility functions
│   └── auth-helpers.ts      # Authentication helpers
└── public/                  # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm
- Firebase project with Auth and Firestore enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd poll2
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Firebase API key:
   ```
   NEXT_PUBLIC_FIREBASE_KEY=your_firebase_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 🔐 Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Email/Password** authentication
3. Enable **Google** authentication
4. Create a **Firestore Database**
5. Get your API key from Project Settings
6. Add the API key to your `.env` file

### Firestore Rules

Ensure your Firestore security rules allow authenticated users to read and write polls:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /polls/{pollId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 🌟 Features Breakdown

### Authentication
- Email and password registration/login
- Google OAuth integration
- Protected routes using `requireAuth` HOC
- User profile management

### Polls
- Create polls with multiple options
- View personal polls
- Delete polls
- Real-time vote tracking (structure ready)

### UI/UX
- Responsive design with Tailwind CSS
- Clean, modern interface
- Loading states and error handling
- Success/error messages

## 🧪 Development

### Code Style

This project uses:
- **Prettier** for code formatting
- **ESLint** for linting
- **TypeScript** for type safety

### Type Safety

The entire application is written in TypeScript with proper types for:
- Redux state and actions
- Component props
- API responses
- Firebase data structures

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project to [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

### Manual Deployment

```bash
npm run build
npm run start
```

## 🔄 Migration Notes

### Key Changes from Legacy App

1. **Routing**: React Router replaced with Next.js App Router
2. **State Management**: Redux replaced with Redux Toolkit
3. **Styling**: Semantic UI replaced with Tailwind CSS
4. **Build System**: Create React App replaced with Next.js
5. **Firebase**: Updated from v5 to v10 SDK
6. **TypeScript**: Full migration from JavaScript

### Breaking Changes

- Firebase SDK v10 requires modern syntax
- Redux Toolkit uses different patterns than Redux with thunk
- Next.js App Router uses different routing conventions

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For issues and questions, please open an issue on GitHub.

## 🙏 Acknowledgments

- Original application built with React and Semantic UI
- Migrated to modern Next.js stack for better performance and developer experience
- Firebase for backend services