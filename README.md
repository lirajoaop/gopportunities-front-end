# Go Opportunities - Frontend

A modern, professional frontend application for managing job opportunities, built with React, Next.js, and Tailwind CSS.

## Features

- **Full CRUD Operations**: Create, read, update, and delete job openings
- **Real-time Search**: Filter jobs by role, company, or location
- **Advanced Filtering**: Filter by work type (all, remote, on-site)
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Professional UI**: Clean, modern interface with smooth animations
- **Statistics Dashboard**: View total openings, remote positions, and filtered results
- **Form Validation**: Client-side validation with helpful error messages
- **Toast Notifications**: User-friendly success and error messages

## Tech Stack

- **Next.js 16** - React framework for production
- **React 19** - UI library
- **Tailwind CSS 4** - Utility-first CSS framework
- **JavaScript (ES6+)** - No TypeScript, pure JavaScript
- **Fetch API** - For backend communication

## Prerequisites

Before running this application, make sure you have:

- Node.js 16.x or later
- npm or yarn
- Go Opportunities Backend API running on `http://127.0.0.1:8080`

## Installation

1. Clone the repository:
   ```bash
   cd gopportunities-front-end
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the API URL (optional):
   The default API URL is `http://127.0.0.1:8080/api/v1`. To change it, edit the `.env.local` file:
   ```
   NEXT_PUBLIC_API_URL=http://your-api-url/api/v1
   ```

## Running the Application

### Development Mode

Start the development server:
```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Production Build

Build the application for production:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## Project Structure

```
gopportunities-front-end/
├── app/
│   ├── globals.css          # Global styles and Tailwind directives
│   ├── layout.js            # Root layout component
│   └── page.js              # Main page with job listings
├── components/
│   ├── Button.jsx           # Reusable button component
│   ├── Card.jsx             # Card container component
│   ├── Input.jsx            # Form input component
│   ├── LoadingSpinner.jsx   # Loading indicator
│   ├── Modal.jsx            # Modal dialog component
│   ├── OpeningCard.jsx      # Job opening card
│   ├── OpeningForm.jsx      # Job opening form
│   ├── Toast.jsx            # Toast notification component
│   └── Toggle.jsx           # Toggle switch component
├── lib/
│   └── api.js               # API service layer
├── utils/
│   └── formatters.js        # Utility functions for formatting
├── .env.local               # Environment variables
├── .gitignore              # Git ignore file
├── next.config.js          # Next.js configuration
├── package.json            # Project dependencies
├── postcss.config.js       # PostCSS configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── README.md               # This file
```

## API Integration

The frontend integrates with the Go Opportunities backend API with the following endpoints:

- `GET /api/v1/openings` - Fetch all job openings
- `GET /api/v1/opening?id={id}` - Fetch a single job opening
- `POST /api/v1/opening` - Create a new job opening
- `PUT /api/v1/opening?id={id}` - Update a job opening
- `DELETE /api/v1/opening?id={id}` - Delete a job opening

## Usage Guide

### Adding a New Job Opening

1. Click the "Add New Opening" button in the header
2. Fill in all required fields:
   - Job Role
   - Company
   - Location
   - Remote Position (toggle)
   - Application Link
   - Annual Salary (USD)
3. Click "Create Opening"

### Editing a Job Opening

1. Find the job opening card
2. Click the "Edit" button
3. Modify the fields
4. Click "Update Opening"

### Deleting a Job Opening

1. Find the job opening card
2. Click the "Delete" button
3. Confirm the deletion

### Searching and Filtering

- Use the search bar to filter by role, company, or location
- Use the "Work Type" dropdown to filter by remote/on-site positions
- The statistics cards update automatically based on your filters

## Component Documentation

### API Service (`lib/api.js`)

Provides methods for interacting with the backend API:
- `openingsApi.getAll()` - Fetch all openings
- `openingsApi.getById(id)` - Fetch opening by ID
- `openingsApi.create(data)` - Create new opening
- `openingsApi.update(id, data)` - Update opening
- `openingsApi.delete(id)` - Delete opening

### Formatters (`utils/formatters.js`)

Utility functions for data formatting:
- `formatSalary(amount)` - Format number as USD currency
- `formatDate(dateString)` - Format date as "Month DD, YYYY"
- `formatRelativeTime(dateString)` - Format as relative time (e.g., "2 days ago")

## Customization

### Colors

The primary color scheme is defined in `tailwind.config.js`. To change the primary color:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Modify these values
        500: '#0ea5e9',
        600: '#0284c7',
        700: '#0369a1',
      },
    },
  },
}
```

### Fonts

The application uses the Inter font family. To change it, edit `app/layout.js`:

```javascript
<link
  href="https://fonts.googleapis.com/css2?family=YourFont:wght@300;400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

And update `tailwind.config.js`:

```javascript
fontFamily: {
  sans: ['YourFont', 'system-ui', 'sans-serif'],
},
```

## Troubleshooting

### API Connection Issues

If the frontend cannot connect to the API:

1. Verify the backend is running on `http://127.0.0.1:8080`
2. Check the API URL in `.env.local`
3. Check browser console for CORS errors
4. Ensure the backend has CORS enabled

### Build Errors

If you encounter build errors:

1. Delete `node_modules` and `.next` folders
2. Run `npm install` again
3. Clear npm cache: `npm cache clean --force`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
- Open an issue on GitHub
- Check the backend API documentation
- Review the browser console for errors

## Acknowledgments

- Built with Next.js and React
- Styled with Tailwind CSS
- Icons from Heroicons
- Fonts from Google Fonts
