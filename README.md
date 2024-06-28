# BlogShow

BlogShow is a modern blog platform built with a robust stack to provide a seamless experience for both developers and users. This platform allows users to create, edit, and delete blog posts, as well as manage user authentication and profiles.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [AWS Services](#aws-services)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication and authorization
- Create, read, update, and delete (CRUD) operations for blog posts
- User profiles
- Responsive design

## Tech Stack

- **Frontend:** Nextjs, TailwindCSS
- **Backend:** Nextjs api functions
- **Authentication:** AWS Cognito, Amplify
- **Database:** AWS DynamoDB
- **Cloud Services:** AWS (DynamoDB, Cognito)

## Installation

### Prerequisites

- Node.js

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/majdmo9/blogshow.git
   cd blogshow
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the necessary environment variables:
   ```env
    AMPLIFY_AMAZON_CLIENT_SECRET=your_amplify_amazon_client_secret
    AMPLIFY_AMAZON_CLIENT_ID=your_amplify_amazon_client_id
    AMPLIFY_AMAZON_REGION=your_amplify_amazon_region
    NEXT_PUBLIC_USER_POOL_ID=your_user_pool_id
    NEXT_PUBLIC_USER_POOL_CLIENT_ID=your_user_pool_client_id
    NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
   ```

## Usage

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:3000`.

## AWS Services

This project leverages several AWS services to enhance functionality and performance:

- **Amazon DynamoDB:** Provides a scalable NoSQL database for storing and querying structured data with low-latency access.
- **Amazon Cognito:** Handles user authentication and authorization, offering secure access control and user management functionalities.

These services ensure the application is highly available, scalable, and secure.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
