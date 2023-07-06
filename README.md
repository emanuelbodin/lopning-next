Run is a web application built with [Next.js](https://nextjs.org/) app router. Its purpose is to be a simple interface to store and results from amateur running competitions.

## Getting Started

After cloning this repo:

1. Install dependencies:

```bash
pnpm install
```

2. Create a `.env` and copy environment variables from `.env.example`

3. Start up local mongodb instance:

```bash
make up
```

4. Run the development server:

```bash
pnpm dev
```

## Technologies used

- [Next js](https://nextjs.org/docs) - Fullstack React framework.
- [Prisma](https://www.prisma.io/nextjs) - Type safe Database ORM.
- [Postgres] - SQL db
- [Authjs] (https://authjs.dev/) - Magic link authentication.
- [sendgrid] (https://sendgrid.com/) - Email service.
- [tailwind css](https://tailwindcss.com/) - CSS library for styling.
