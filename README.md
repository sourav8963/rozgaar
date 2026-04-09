Rozgaar (Mazdoor Connect) 👷‍♂️🛠️

Rozgaar is a location-based digital platform designed to seamlessly connect daily wage workers (labourers, electricians, plumbers, painters, etc.) with customers who need their services.

The platform aims to organise the informal labour market, eliminate middlemen, ensure fair pricing, and build a trustworthy ecosystem for both workers and customers.

🌟 Key Features

🔍 Smart Discovery: Location-based search to find nearby workers instantly.

🛠️ Skill Filtering: Filter workers by categories like Plumber, Electrician, Painter, and General Labourer.

📅 Instant Booking: Real-time availability tracking with instant or scheduled booking options.

💳 Transparent Pricing: Clear, upfront standard rates (per day/per hour) with Cash and UPI payment options.

⭐ Trust & Safety: Worker profiles with ratings, reviews, and identity verification status.

📱 Mobile-First UI: A clean, responsive interface designed specifically for mobile users.

🚀 Tech Stack

Current Prototype (Frontend)

Framework: React.js (via Vite)

Styling: Tailwind CSS

Icons: Lucide React

Planned Architecture (Full-Stack)

Frontend: React.js (Web) / React Native (Mobile)

Backend: Node.js + Express

Database: MongoDB

Services: Google Maps API (Location), Firebase (Auth & OTP)

🛠️ Getting Started (Running Locally)

To run the current frontend prototype locally on your machine, follow these steps:

Prerequisites

Make sure you have Node.js installed on your system.

Installation Steps

Clone the repository:

git clone [https://github.com/sourav8963/rozgaar.git](https://github.com/sourav8963/rozgaar.git)
cd rozgaar


Install dependencies:

npm install
npm install lucide-react
npm install -D tailwindcss postcss autoprefixer


Initialize Tailwind CSS (if not already configured):

npx tailwindcss init -p


Ensure your tailwind.config.js and index.css are configured properly for standard Tailwind usage.

Start the development server:

npm run dev


View the app: Open http://localhost:5173 in your browser.

🔮 Future Scope

As outlined in the Product Requirements Document (PRD), the following features are planned for future releases:

AI-based worker recommendations.

Voice-based and SMS-based offline booking systems.

Demand heatmaps for workers to find high-opportunity areas.

Group hiring options for contractors.

Multi-language support to improve accessibility for low digital-literacy users.

🤝 Contributing

Contributions are always welcome! If you have ideas for improvements, feel free to open an issue or submit a pull request.

Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

📄 License

Distributed under the MIT License. See LICENSE for more information.
