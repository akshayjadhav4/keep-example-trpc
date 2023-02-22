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

## Installation

```
cd keep-example-trpc
npm install
```

### Database Setup

Add postgresql **DATABASE_URL** connection string inside `packages/database/.env`

Next
```
cd packages/database

npx prisma db push
```

### Run dev server

```
cd keep-example-trpc
npm run dev
```

## Screenshots

<img width="1552" alt="Home" src="https://user-images.githubusercontent.com/34000732/220331322-4529df8e-e94c-437a-9d21-cbf577f47d20.png">


<img width="1552" alt="Create Keep" src="https://user-images.githubusercontent.com/34000732/220331410-90d2170f-74cb-4ef6-b747-b582549682eb.png">

<img width="1552" alt="Manage Tags" src="https://user-images.githubusercontent.com/34000732/220331492-3a38387c-6c25-484e-badd-fd7a9c3d2d45.png">


<img width="1552" alt="Edit Keep" src="https://user-images.githubusercontent.com/34000732/220331565-d1835c32-84db-4d0f-95ea-5c03b975537a.png">




