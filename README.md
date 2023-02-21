# Keep

Implementing trpc in turborepo with Nextjs and express application using postgresql and prisma.

## Project structure

```
.
├── README.md
├── apps
│   └── web
├── package-lock.json
├── package.json
├── packages
│   ├── database
│   ├── eslint-config-custom
│   ├── services
│   ├── tsconfig
│   ├── twconfig
│   └── ui
└── turbo.json
```
`apps/web`: A Next.js app.

`packages/database`: Prisma setup.

`packages/services`: Expree server application.

`packages/ui`: UI lib containing components. 

### Database Setup

Add postgresql **DATABASE_URL** connection string inside `packages/database/.env`

