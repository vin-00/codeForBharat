# PrepWise - AI-Powered Interview Practice Platform

![PrepWise Logo](/public/logo.svg)

## Overview

PrepWise is an AI-powered interview preparation platform designed to help job seekers practice and improve their interview skills. The application uses advanced AI technology to generate customized interview questions, conduct realistic interview simulations, and provide detailed feedback and scoring to help users identify their strengths and areas for improvement.

## Features

### 1. Customized Interview Generation
- Create personalized interview experiences based on:
  - Job role (e.g., Frontend Developer, Data Scientist)
  - Experience level (Entry, Mid, Senior)
  - Interview type (Behavioral, Technical, Mixed)
  - Tech stack (e.g., React, Node.js, MongoDB)
  - Number of questions (1-20)
  - Visibility settings (Public or Private)

### 2. AI-Powered Interview Simulation
- Voice-based interview conducted by an AI interviewer
- Natural conversation flow with realistic questions
- Real-time transcription of responses

### 3. Comprehensive Feedback
- Detailed performance analysis across multiple categories:
  - Communication Skills
  - Technical Knowledge
  - Problem-Solving
  - Cultural & Role Fit
  - Confidence & Clarity
- Overall score out of 100
- Identified strengths and areas for improvement
- Final assessment with actionable recommendations

### 4. User Profiles & Interview Library
- Personal user profiles with interview history
- Access to public interviews created by other users
- Rating system for interview quality
- Analytics for interview creators

### 5. Community Features
- Discover and practice with interviews created by other users
- Share your custom interviews with the community
- View profiles of other users and their public interviews

## Technology Stack

### Frontend
- **Next.js**: React framework for server-rendered applications
- **Tailwind CSS**: Utility-first CSS framework for styling
- **React Hook Form**: Form validation and handling
- **Zod**: TypeScript-first schema validation
- **Sonner**: Toast notifications

### Backend
- **Next.js API Routes**: Server-side API endpoints
- **Firebase**: Authentication and database
- **Google Gemini AI**: AI model for interview question generation and feedback
- **Vapi AI**: Voice interface for natural conversation

### Authentication
- Firebase Authentication for secure user management

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Firebase account
- Google AI API key
- Vapi AI account

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/prepwise.git
cd prepwise
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
Create a `.env.local` file in the root directory with the following variables:
```
# Firebase
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
FIREBASE_APP_ID=your_firebase_app_id

# Google AI
GOOGLE_AI_API_KEY=your_google_ai_api_key

# Vapi AI
VAPI_API_KEY=your_vapi_api_key
```

4. Run the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Creating an Interview
1. Sign in to your account
2. Click on "Create an Interview" on the homepage
3. Fill out the form with your desired parameters:
   - Job role
   - Experience level
   - Interview type
   - Tech stack
   - Number of questions
   - Visibility setting
4. Click "Generate Interview"

### Taking an Interview
1. From the homepage, select an interview from "Your Interviews" or "Take an Interview"
2. Click on the interview card to start
3. Allow microphone access when prompted
4. Respond to the AI interviewer's questions verbally
5. After completing all questions, you'll receive detailed feedback

### Viewing Feedback
1. Access feedback from your completed interviews on your profile page
2. Review your overall score, category scores, strengths, and areas for improvement
3. Rate the interview experience to help improve the platform

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Google Gemini AI for powering the question generation and feedback
- Vapi AI for the voice interface
- All contributors who have helped shape this project