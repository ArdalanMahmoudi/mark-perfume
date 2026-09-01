# activeClassName example

ReactRouter has a convenience property on the `Link` element to allow an author to set the _active_ className on a link. This example replicates that functionality using Next's own `Link` component with the new app router.

## Deploy your own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vercel/next.js/tree/canary/examples/active-class-name&project-name=active-class-name&repository-name=active-class-name)

## How to use

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init), [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/), or [pnpm](https://pnpm.io) to bootstrap the example:

```bash
npx create-next-app --example active-class-name active-class-name-app
```

```bash
yarn create next-app --example active-class-name active-class-name-app
```

```bash
pnpm create next-app --example active-class-name active-class-name-app
```

Deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/app/building-your-application/deploying)).


# Mark Perfume

A full-stack e-commerce application for managing and selling perfume products, built with Next.js and TypeScript.

The project includes a customer-facing storefront, authentication, product management, shopping cart, wishlist, order management, comments, an admin dashboard, and online payment integration.

## Features

### Customer

* User registration and authentication
* Product browsing and search
* Product details with image gallery
* Shopping cart
* Wishlist
* Product comments and replies
* Order creation and order history
* Online payment
* User profile and account management

### Admin

* Admin dashboard
* Product creation, editing and deletion
* Product image and gallery management
* User management
* User ban/unban
* Comment moderation
* Admin replies to comments

## Technical Highlights

* Authentication and authorization with JWT
* Role-based access control
* Server Actions for server-side mutations
* Prisma ORM for database access
* Zod for schema validation
* React Hook Form for form management
* Zustand for client-side state management
* Database transactions for critical order operations
* Product stock management
* Payment integration with ZarinPal
* Responsive UI
* Search with debouncing
* Protected routes and middleware

## Tech Stack

**Frontend**

* Next.js
* React
* TypeScript
* Tailwind CSS
* shadcn/ui

**Backend**

* Next.js Server Actions
* Prisma
* JWT
* Zod

**Database**

* PostgreSQL / SQLite

**Other**

* React Hook Form
* Zustand
* ZarinPal

## Getting Started

### Prerequisites

* Node.js
* npm / pnpm / yarn
* Database

### Installation

```bash
git clone <repository-url>
cd mark-perfume
npm install
```

Create a `.env` file and add the required environment variables.

```env
DATABASE_URL=
JWT_SECRET=
ZARINPAL_MERCHANT_ID=
```

Then run the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Project Structure

```text
src/
├── app/
├── actions/
├── components/
├── lib/
├── queries/
├── schemas/
└── templates/
```

## Future Improvements

* Move file storage to a dedicated object storage service
* Improve automated testing
* Add more advanced product filtering
* Improve caching and performance
* Add additional payment and order management features
