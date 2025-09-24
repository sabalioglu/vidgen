# AI Video Generator Web Application

A complete frontend web application for an AI Video Generator service with user authentication, credit system, and Telegram bot integration.

## Features

- **User Authentication**: Sign up, sign in, and session management with Supabase
- **Credit System**: Users start with 5 free credits and can purchase more
- **Telegram Integration**: Unique connection keys for bot integration
- **Payment Processing**: Stripe integration for credit purchases
- **Responsive Design**: Modern, mobile-first design with Tailwind CSS
- **Protected Routes**: Dashboard access only for authenticated users

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom gradients and animations
- **Backend**: Supabase (Auth + Database)
- **Payments**: Stripe
- **Icons**: Lucide React

## Database Schema

The application uses a `profiles` table that extends Supabase's built-in authentication:

```sql
- id (uuid, references auth.users)
- email (text)
- credits (integer, default 5)
- telegram_connection_key (text, unique)
- telegram_connected (boolean, default false)
- created_at (timestamptz)
- updated_at (timestamptz)
```

## Setup Instructions

### 1. Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Click "Connect to Supabase" in the top right of this application
3. The database migration will create the necessary tables and policies

### 2. Environment Variables

Create a `.env` file based on `.env.example`:

```env
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 3. Stripe Integration

For payment processing, you'll need to:

1. Create a Stripe account
2. Get your publishable and secret keys
3. Implement server-side webhook handling for successful payments
4. Update the credit balance in Supabase after successful payments

### 4. Run the Application

```bash
npm install
npm run dev
```

## Key Components

- **HomePage**: Landing page with hero section and feature explanation
- **SignUpPage**: User registration with automatic profile creation
- **LoginPage**: User authentication
- **Dashboard**: Main user area with credit balance, video creation, and Telegram connection
- **AuthProvider**: React context for authentication state management

## Security Features

- Row Level Security (RLS) enabled on all tables
- Users can only access their own data
- Automatic profile creation on signup
- Protected routes for authenticated content

## Future Enhancements

- Video generation workflow integration
- Telegram bot command handling
- Payment webhook processing
- Video history and management
- Advanced user settings

## License

MIT License - feel free to use this as a foundation for your own projects!