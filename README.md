# GearUp Client

GearUp Client is the frontend of a modern gear rental marketplace built with Next.js, React, TypeScript, and Tailwind CSS. The platform allows customers to browse and rent equipment, providers to manage gear listings and rental orders, and admins to oversee the whole system.

## Project Overview

This project is designed to make gear rental simple and user-friendly. Customers can explore available gear, view detailed product information, place rental requests, complete secure checkout through Stripe, and review their rentals. Providers can add or update gear, manage availability, and handle incoming orders. Admins can monitor users, gears, and rental activity from a dedicated dashboard.

## Main Features

### Customer Experience

- Browse gear with search and category filters
- View detailed gear pages with pricing and availability
- Rent gear by selecting start and return dates
- Complete secure payment using Stripe
- Track rental orders in the customer dashboard
- Leave reviews for rented gear

### Provider Experience

- Add new gear items to the marketplace
- Update existing gear information and availability
- Manage rental orders from customers
- Monitor provider-specific inventory and transactions

### Admin Experience

- Manage all registered users
- Review and oversee gear listings
- Monitor rental orders across the platform

## Demo Accounts

Use these demo accounts to explore the different roles in the application:

| Role     | Email             | Password |
| -------- | ----------------- | -------- |
| Customer | rifat@example.com | rifat123 |
| Provider | islam@example.com | islam123 |
| Admin    | reyan@example.com | reyan123 |

## Technology Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui
- Stripe for payments
- Axios for API requests
- Sonner for toast notifications
- Lucide React for icons

## Project Structure

- app/ - pages and route-based UI for public, auth, customer, provider, and admin views
- components/ - reusable UI components
- lib/ - shared client utilities such as Axios setup
- services/ - auth and logout service logic
- public/ - static assets

## Getting Started

### Prerequisites

- Node.js installed on your machine
- A running backend API that supports the routes used by this frontend

### Installation

```bash
git clone <your-repository-url>
cd nextjs_ninja
npm install
```

### Environment Variables

This project expects the following environment variables:

```env
NEXT_PUBLIC_SERVER_URL=http://localhost:4000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### Run the App

```bash
npm run dev
```

Then open http://localhost:3000 in your browser.

## Usage Flow

1. Sign in using one of the demo accounts above.
2. Browse available gear from the home page.
3. Choose a rental item and place a booking request.
4. Complete checkout and view your order history.
5. Switch between customer, provider, and admin views to explore the platform roles.

## Notes

This frontend is designed to work with a backend API. Make sure your backend server is running and configured to respond to the endpoints used by the application for authentication, gear management, rentals, reviews, and payments.
