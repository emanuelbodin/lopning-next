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
- [tailwind css](https://tailwindcss.com/) - CSS library for styling.

## OBS

A custom Dockerfile in `mongodb-rs/Dockerfile` is used since Prisma requires the MongoDB server to be run as a replica set in order to perform transactions. A replica set is a group of MongoDB servers that maintain the same data set, providing redundancy and high availability.
