# API Integration Guide

This project is wired to a backend API through the shared Axios instance in [lib/axios.ts](lib/axios.ts). All requests are sent to the base URL defined by the `NEXT_PUBLIC_SERVER_URL` environment variable and use `withCredentials: true` so auth cookies are included.

## 1. Shared API Configuration

- Client-side requests use: [lib/axios.ts](lib/axios.ts)
- Base URL: `process.env.NEXT_PUBLIC_SERVER_URL`
- Cookie/auth behavior: `withCredentials: true`
- Default header: `Content-Type: application/json`

Example:

```ts
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
```

---

## 2. Authentication Endpoints

| Component                                                                           | Endpoint             | Method | Purpose                                               | Request Body                       |
| ----------------------------------------------------------------------------------- | -------------------- | ------ | ----------------------------------------------------- | ---------------------------------- |
| [app/auth/\_action/handleLoginSubmit.tsx](app/auth/_action/handleLoginSubmit.tsx)   | `/api/auth/login`    | `POST` | Authenticates a user and redirects them based on role | `{ email, password }`              |
| [app/auth/\_action/handleSignupSubmit.tsx](app/auth/_action/handleSignupSubmit.tsx) | `/api/auth/register` | `POST` | Registers a new account                               | `{ name, email, password, role? }` |
| [services/auth.service.ts](services/auth.service.ts)                                | `/api/auth/me`       | `GET`  | Fetches the currently logged-in user profile          | None                               |
| [services/logout.service.ts](services/logout.service.ts)                            | `/api/auth/logout`   | `POST` | Logs the user out and clears the session              | None                               |

### Notes

- Login redirects to different dashboards depending on the returned role:
  - `customer` → `/`
  - `provider` → `/dashboard/provider/gears`
  - `admin` → `/dashboard/admin/orders`

---

## 3. Public Gear Browsing Endpoints

| Component                                                                                     | Endpoint                   | Method | Purpose                                             | Request Body            |
| --------------------------------------------------------------------------------------------- | -------------------------- | ------ | --------------------------------------------------- | ----------------------- |
| [app/(publicGroup)/\_components/GearList.tsx](<app/(publicGroup)/_components/GearList.tsx>)   | `/api/gear`                | `GET`  | Loads all available gear for the public marketplace | None                    |
| [app/(publicGroup)/\_components/Filter.tsx](<app/(publicGroup)/_components/Filter.tsx>)       | `/api/categories`          | `GET`  | Loads categories/tags for filter UI                 | None                    |
| [app/(publicGroup)/\_components/Filter.tsx](<app/(publicGroup)/_components/Filter.tsx>)       | `/api/filter?category=...` | `GET`  | Filters gear by a selected category/tag             | Query param: `category` |
| [app/(publicGroup)/\_components/SearchBar.tsx](<app/(publicGroup)/_components/SearchBar.tsx>) | `/api/search?search=...`   | `GET`  | Searches gear by name/brand/keyword                 | Query param: `search`   |
| [app/(publicGroup)/gear/[id]/page.tsx](<app/(publicGroup)/gear/[id]/page.tsx>)                | `/api/gear/:id`            | `GET`  | Fetches a single gear item for the detail page      | None                    |

### Notes

- The public home page uses three coordinated UI pieces:
  - `SearchBar` for live search
  - `Filter` for category-based narrowing
  - `GearList` for rendering the final product cards

---

## 4. Rental Order Endpoints

| Component                                                                                                   | Endpoint       | Method | Purpose                                                                     | Request Body                                             |
| ----------------------------------------------------------------------------------------------------------- | -------------- | ------ | --------------------------------------------------------------------------- | -------------------------------------------------------- |
| [app/(publicGroup)/\_components/rentForm.tsx](<app/(publicGroup)/_components/rentForm.tsx>)                 | `/api/rentals` | `POST` | Creates a rental order after the user chooses quantity, dates, and location | `{ gearId, quantity, location, rentalDate, returnDate }` |
| [app/dashboard/customer/\_components/GetAllOrders.tsx](app/dashboard/customer/_components/GetAllOrders.tsx) | `/api/rentals` | `GET`  | Fetches the current customer’s rental orders                                | None                                                     |

### Notes

- The rental form calculates a price preview locally and then sends the finalized data to the backend.
- After a successful order is created, the app navigates the customer to the checkout flow.

---

## 5. Payment Endpoints

| Component                                                                                                                  | Endpoint                                                | Method | Purpose                                                          | Request Body        |
| -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | ------ | ---------------------------------------------------------------- | ------------------- |
| [app/dashboard/customer/checkout/[orderId]/page.tsx](app/dashboard/customer/checkout/[orderId]/page.tsx)                   | `http://localhost:4000/api/payments/create`             | `POST` | Creates a Stripe payment intent for a rental order               | `{ rentalOrderId }` |
| [app/(publicGroup)/\_components/checkoutForm.tsx](<app/(publicGroup)/_components/checkoutForm.tsx>)                        | `/api/payments/confirm`                                 | `POST` | Confirms the completed Stripe payment and stores the transaction | `{ transactionId }` |
| [app/dashboard/customer/payment-success/[paymentId]/page.tsx](app/dashboard/customer/payment-success/[paymentId]/page.tsx) | `http://localhost:4000/api/payments/success/:paymentId` | `GET`  | Loads the successful payment result page                         | None                |

### Notes

- The checkout and success pages call the backend from the server-side route handlers and forward cookies to preserve the authenticated session.
- The payment confirmation step is triggered only after Stripe reports a successful payment.

---

## 6. Review Endpoints

| Component                                                                                          | Endpoint       | Method | Purpose                                 | Request Body                  |
| -------------------------------------------------------------------------------------------------- | -------------- | ------ | --------------------------------------- | ----------------------------- |
| [app/dashboard/customer/review/[gearId]/page.tsx](app/dashboard/customer/review/[gearId]/page.tsx) | `/api/reviews` | `POST` | Submits a review for a rented gear item | `{ gearId, rating, comment }` |

### Notes

- Reviews are only available after a customer has completed a rental flow and reaches the review page.

---

## 7. Provider Dashboard Endpoints

| Component                                                                                | Endpoint                        | Method   | Purpose                                                | Request Body                                            |
| ---------------------------------------------------------------------------------------- | ------------------------------- | -------- | ------------------------------------------------------ | ------------------------------------------------------- |
| [app/dashboard/provider/add-gear/page.tsx](app/dashboard/provider/add-gear/page.tsx)     | `/api/provider/gear`            | `POST`   | Creates a new gear item for the authenticated provider | `{ name, description, pictureLink, brand, tag, price }` |
| [app/dashboard/provider/gears/page.tsx](app/dashboard/provider/gears/page.tsx)           | `/api/provider/gear`            | `GET`    | Loads all gear belonging to the current provider       | None                                                    |
| [app/dashboard/provider/gears/page.tsx](app/dashboard/provider/gears/page.tsx)           | `/api/provider/gear/:gearId`    | `DELETE` | Deletes a provider-owned gear item                     | None                                                    |
| [app/dashboard/provider/gears/[id]/page.tsx](app/dashboard/provider/gears/[id]/page.tsx) | `/api/provider/gear`            | `GET`    | Loads provider gear list to find the item being edited | None                                                    |
| [app/dashboard/provider/gears/[id]/page.tsx](app/dashboard/provider/gears/[id]/page.tsx) | `/api/provider/gear/:id`        | `PUT`    | Updates a provider-owned gear item                     | Full gear update payload                                |
| [app/dashboard/provider/orders/page.tsx](app/dashboard/provider/orders/page.tsx)         | `/api/provider/orders`          | `GET`    | Loads all rental orders associated with the provider   | None                                                    |
| [app/dashboard/provider/orders/page.tsx](app/dashboard/provider/orders/page.tsx)         | `/api/provider/orders/:orderId` | `PATCH`  | Updates the rental order status                        | `{ status }`                                            |

### Notes

- The provider flow is fully CRUD-oriented for gear and status-oriented for orders.
- The update gear page fetches the provider gear list first, selects the matching item by `id`, and pre-fills the form.

---

## 8. Admin Dashboard Endpoints

| Component                                                                          | Endpoint               | Method  | Purpose                                       | Request Body |
| ---------------------------------------------------------------------------------- | ---------------------- | ------- | --------------------------------------------- | ------------ |
| [app/dashboard/admin/gears/page.tsx](app/dashboard/admin/gears/page.tsx)           | `/api/admin/gear`      | `GET`   | Loads all gear visible to the admin dashboard | None         |
| [app/dashboard/admin/orders/page.tsx](app/dashboard/admin/orders/page.tsx)         | `/api/admin/rentals`   | `GET`   | Loads all rental orders across the platform   | None         |
| [app/dashboard/admin/users/page.tsx](app/dashboard/admin/users/page.tsx)           | `/api/admin/users`     | `GET`   | Loads all registered users                    | None         |
| [app/dashboard/admin/users/[id]/page.tsx](app/dashboard/admin/users/[id]/page.tsx) | `/api/admin/users/:id` | `PATCH` | Toggles or updates a user’s account status    | `{}`         |

### Notes

- Admin pages are read-focused, with a single action endpoint for updating user status.

---

## 9. Current Integration Summary

The frontend currently consumes the main backend API surface for:

- Authentication and session management
- Public gear browsing, filtering, and search
- Rental order creation and tracking
- Stripe payment initiation and confirmation
- Customer review submission
- Provider gear and order management
- Admin user and order oversight

This documentation should be used as the reference point when extending the frontend with new API features or debugging existing integrations.
