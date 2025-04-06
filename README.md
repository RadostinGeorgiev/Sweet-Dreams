# Sweet Dreams - Dessert Blog

![Sweet Dreams Logo](/public/images/logo1.png)

Sweet Dreams is a React-based platform for sharing dessert recipes and culinary articles, featuring user authentication, content management, and community interactions. The platform offers a collection of delicious recipes and interesting articles related to desserts.

## 🔗 Links

- [Live Version](https://sweet-dreams-react.netlify.app/)
- [Server Code](https://github.com/RadostinGeorgiev/sweet-dreams-server)

## 🛠 Key Features

- **User Authentication**: Registration, login
- **Interactive Elements**: Comments and rating system
- **Image Uploads**: Firebase Storage integration

### 🔓 Public (Available to All Users)

- **Homepage** - Displays the latest articles and recipes.
- **Blog Section** - Browse and read all articles
- **Recipes Section** - Explore a variety of dessert recipes
- **Article Details** - View detailed information about specific articles
- **Recipe Details** - View detailed recipe description

### 🔐 Registered User Features

- **Create Content**:
  - Add new articles and recipes.
  - Edit or delete your own articles and recipes.
- **Engage with Content**:
  - Comment on articles and recipes.
  - Like or dislike articles and recipes to contribute to their rating.

## 🛠 Technologies Used

### Client Side

- **Frontend** - React - JavaScript library for building user interfaces
- **Mantine** - Modern React UI framework
- **Styling**: SCSS Modules
- **State Management**: React Hooks
- **React Router** - Application routing
- **Zod** - Form validation

### Server Side

- **SoftUni Practice Server** - REST API server
- **Firebase Storage** - Image hosting

## 🖥 Installation & Setup

1. Clone the repository:

```bash
git clone https://github.com/your-username/sweet-dreams-client.git
cd sweet-dreams-client
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:
   Create `.env` file in root directory and add:

```
REACT_APP_API_URL=your-api-url
REACT_APP_FIREBASE_CONFIG=your-firebase-config
```

4. Start the application:

```bash
npm start
```

## 📂 Project Structure

```
Sweet-Dreams/
├── public/ # Static assets
│ ├── images/ # Application images
│ └── index.html # Main HTML template
│
├── src/
│ ├── assets/ # Shared assets
│ │ └── styles/ # Global styles
│ │
│ ├── components/ # Reusable UI components
│ │ ├── common/ # Generic components
│ │ ├── forms/ # Form components
│ │ └── ui/ # UI elements
│ │
│ ├── config/ # Configuration files
│ │ └── endpoints.js # API endpoints
│ │
│ ├── context/ # React contexts
│ │ ├── AuthContext.js # Authentication context
│ │ └── DataContext.js # Data management context
│ │
│ ├── elements/ # Small UI elements
│ │ ├── Loading.jsx # Loading spinner
│ │ └── UserInfo.jsx # User profile component
│ │
│ ├── hooks/ # Custom hooks
│ │ ├── useAuth.js # Auth related hooks
│ │ └── useItemsCRUD.js # CRUD operations
│ │
│ ├── layout/ # Page layouts
│ │ ├── Header.jsx # Navigation header
│ │ └── Footer.jsx # Page footer
│ │
│ ├── pages/ # Application pages
│ │ ├── auth/ # Authentication pages
│ │ ├── blog/ # Blog related pages
│ │ ├── recipes/ # Recipe related pages
│ │ └── HomePage.jsx # Homepage
│ │
│ ├── services/ # API services
│ │ ├── api.js # API configuration
│ │ └── firebase.js # Firebase setup
│ │
│ ├── utils/ # Utility functions
│ │ └── helpers.js # Helper functions
│ │
│ ├── App.js # Root component
│ └── main.jsx # Application entry point
│
├── .env.example # Environment variables template
├── package.json # Project dependencies
└── README.md # Project documentation
```

📸 Screenshots

## 📝 License

License
This project is licensed under the MIT License. See the LICENSE file for details.

Contact
For questions or feedback, please contact:

Name: Radostin Georgiev
GitHub: RadostinGeorgiev
