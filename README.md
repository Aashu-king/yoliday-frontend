# Yoliday Frontend

![Yoliday Logo](https://yoliday.vercel.app/images/light-logo.png)

## Overview

Yoliday is a modern travel booking platform designed to make your holiday planning seamless and enjoyable. This repository contains the frontend codebase for Yoliday, built with Next.js, React, and other cutting-edge technologies.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **User Authentication**: Secure login, signup, and profile management
- **Search & Filtering**: Find perfect accommodations based on various criteria
- **Booking Management**: Create, view, and manage bookings
- **Reviews & Ratings**: Leave and view reviews for properties
- **Responsive Design**: Seamless experience across all devices
- **Dark/Light Mode**: Choose your preferred theme
- **Interactive Maps**: View properties on maps with location details
- **Wishlist**: Save your favorite properties for later

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Frontend Library**: [React](https://reactjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **UI Components**: Custom components with [HeadlessUI](https://headlessui.dev/)
- **Maps Integration**: [Mapbox](https://www.mapbox.com/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/)
- **Validation**: [Yup](https://github.com/jquense/yup)
- **API Calls**: [Axios](https://axios-http.com/)
- **Linting**: [ESLint](https://eslint.org/)
- **Formatting**: [Prettier](https://prettier.io/)

## Getting Started

### Prerequisites

- Node.js (v16.x or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Aashu-king/yoliday-frontend.git
   cd yoliday-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_API_URL=your_backend_api_url
   NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
   ```

### Running Locally

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
yoliday-frontend/
├── app/                  # Next.js app directory
│   ├── (dashboard)/      # Dashboard related pages
│   ├── (input)/      # it is not developed yet as the requirement is not there
│   ├── (portfolio)/      # it contains the project list and the addto cart option
│   ├── (projects)/      # just to make it available on routing as ssr component i had imported the form in it
│   ├── (search)/      # it is not developed yet as the requirements is not there
│   ├── (user)/      # it is not developed yet as the requirements is not there
│   ├── (cart)/      # it is developed to show the items in the cart
│   └── ...
├── components/           # Reusable React components
│   ├── header           #  header for phone
│   ├── mobileFooter            # footer for mobile
│   ├── mobileHeader           # Header for mobile
│   └── ...
├── contexts/             # React context providers
├── lib/                  # Utility functions and libraries
├── public/               # Static assets
├── styles/               # Global styles and Tailwind config
├── .env.example          # Example environment variables
├── next.config.js        # Next.js configuration
├── package.json          # Project dependencies
└── tailwind.config.js    # Tailwind CSS configuration
```

## Deployment

The application is set up for easy deployment on Vercel:

1. Fork this repository
2. Connect your GitHub account to Vercel
3. Import the repository
4. Set the required environment variables
5. Deploy!

## Contributing

We welcome contributions to improve Yoliday! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

Please ensure your code follows our coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Project Owner: [Aashu-king](https://github.com/Aashu-king)

Project Link: [https://github.com/Aashu-king/yoliday-frontend](https://github.com/Aashu-king/yoliday-frontend)
