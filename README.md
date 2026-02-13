# Go Opportunities - Frontend

A production-ready frontend for the **Go Opportunities** platform — a job opportunity management application built with React, Next.js, and Tailwind CSS.

> **Live app:** [https://gopportunities-front-end.vercel.app](https://gopportunities-front-end.vercel.app)
>
> **Production API:** [https://gopportunities-cwm0.onrender.com/api/v1](https://gopportunities-cwm0.onrender.com/api/v1)
>
> **Backend repository:** [github.com/lirajoaop/gopportunities](https://github.com/lirajoaop/gopportunities)

## Features

- **Full CRUD Operations** — Create, read, update, and delete job openings
- **Real-time Search** — Filter jobs by role, company, or location
- **Advanced Filtering** — Filter by work type (all, remote, on-site)
- **Responsive Design** — Works seamlessly on desktop, tablet, and mobile
- **Dark Mode** — Toggle between light and dark themes
- **Statistics Dashboard** — View total openings, remote positions, and filtered results
- **Form Validation** — Client-side validation with helpful error messages
- **Toast Notifications** — User-friendly success and error messages

## Tech Stack

- **Next.js 16** — React framework for production
- **React 19** — UI library
- **Tailwind CSS 4** — Utility-first CSS framework
- **JavaScript (ES6+)** — Pure JavaScript, no TypeScript
- **Fetch API** — Backend communication

## Infrastructure

| Service  | Platform |
|----------|----------|
| Frontend | Vercel   |
| Backend  | Render   |
| Database | Neon (PostgreSQL) |

## Getting Started (Local Development)

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/lirajoaop/gopportunities-front-end.git
   cd gopportunities-front-end
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the API URL (optional):
   By default the app points to the production API. For local development, edit `.env.local`:
   ```
   NEXT_PUBLIC_API_URL=http://127.0.0.1:8080/api/v1
   ```

### Running

**Development:**
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

**Production build:**
```bash
npm run build && npm start
```

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and Tailwind directives
│   ├── layout.js            # Root layout component
│   ├── page.js              # Main page with job listings
│   └── favicon.ico          # App icon
├── components/
│   ├── Button.jsx           # Reusable button component
│   ├── Card.jsx             # Card container component
│   ├── DarkModeToggle.jsx   # Dark mode toggle button
│   ├── Input.jsx            # Form input component
│   ├── LoadingSpinner.jsx   # Loading indicator
│   ├── Modal.jsx            # Modal dialog component
│   ├── OpeningCard.jsx      # Job opening card
│   ├── OpeningForm.jsx      # Job opening form (create/edit)
│   ├── Toast.jsx            # Toast notification component
│   └── Toggle.jsx           # Toggle switch component
├── contexts/
│   └── DarkModeContext.js   # Dark mode context provider
├── lib/
│   └── api.js               # API service layer
└── utils/
    └── formatters.js        # Utility functions for formatting
```

## API Integration

The frontend consumes the Go Opportunities REST API:

| Method   | Endpoint                  | Description              |
|----------|---------------------------|--------------------------|
| `GET`    | `/api/v1/openings`        | List all job openings    |
| `GET`    | `/api/v1/opening?id={id}` | Get opening by ID        |
| `POST`   | `/api/v1/opening`         | Create a new opening     |
| `PUT`    | `/api/v1/opening?id={id}` | Update an opening        |
| `DELETE` | `/api/v1/opening?id={id}` | Delete an opening        |

## Usage

### Creating a Job Opening

1. Click "Add New Opening"
2. Fill in the required fields (role, company, location, link, salary)
3. Click "Create Opening"

### Editing / Deleting

- Click "Edit" on a job card to modify it
- Click "Delete" to remove it (with confirmation)

### Search and Filters

- Use the search bar to filter by role, company, or location
- Use the work type filter (remote / on-site)
- Statistics update automatically based on active filters

## Troubleshooting

### API Connection Issues

1. Check the API URL in `.env.local`
2. Check browser console for CORS errors
3. For local development, ensure the backend is running on `http://127.0.0.1:8080`

> **Note:** The backend on Render may take a few seconds to wake up on the first request (free tier cold start).

### Build Errors

1. Delete `node_modules` and `.next`
2. Run `npm install` again
3. Clear cache: `npm cache clean --force`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes and test
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- [Next.js](https://nextjs.org/) and [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Heroicons](https://heroicons.com/)
- [Google Fonts](https://fonts.google.com/)
