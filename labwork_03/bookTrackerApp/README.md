# Book Tracker App 📚
A cross-platform React Native app built with Expo, allowing users to track books, take notes, and manage reading progress. Uses Firebase for authentication and database.

* Setup
1. Clone the repo
git clone https://github.com/KedarKandel/building-deploying_cross_platfrom_apps/tree/main/labwork_03/bookTrackerApp
cd book-tracker-app

2. Install dependencies
npm install /or/ yarn install


3. Configure Firebase
Create a Firebase project, enable Email/Password Authentication and Cloud Firestore.

4. Create a .env file in the project root:
- FIREBASE_API_KEY=your-api-key
- FIREBASE_AUTH_DOMAIN=your-auth-domain
- FIREBASE_PROJECT_ID=your-project-id
- FIREBASE_STORAGE_BUCKET=your-storage-bucket
- FIREBASE_MESSAGING_SENDER_ID=your-sender-id
- FIREBASE_APP_ID=your-app-id
- FIREBASE_MEASUREMENT_ID=your-measurement-id


5. Run the app
npx expo start
Open on Android/iOS simulator, Expo Go, or web browser.

# Features
- Welcome screen → Login/Register → Home
- Firebase authentication (email/password)
- Add, view, and delete books
- Book details page
- User profile and contact page