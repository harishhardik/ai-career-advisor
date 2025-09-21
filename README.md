<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# AI Career Advisor by EPIC BYTES

The Career Advisor AI system is an intelligent, cloud-based system that aims to transform career advising for students and professionals. By using deep learning and natural language generation technologies, the solution will analyze the individual users profile, such as skills, interests, personality, academic background along with real-time job habits and market opportunities. Unlike traditional career advisory tools, which rely on a static test or generic ideas, our AI system can provide actionable, personalized recommendations, career maps which depict the possible pathways alongside a skill gap analysis.

The system includes user-friendly assessments, automated CV and resume application analysis, and a conversational AI chat application for career advice. The system integrates third-party APIs for real-time job listings, learning resources, and professional networks to ensure that users receive up to date information on job opportunities, skills required, and job market gaps. The system's self-automated engine will change, as users make their journey and as the job market and industry changes, so too can the advice and recommendations.

By automating the career mapping process, while continuously updating options, the system assists in empowering users and their able to make informed, future-fit decisions about their career development. Its holistic, data-driven, user-centered approach allows users to bridge aspirations with market/job realities and provide potential investment in greater satisfaction and success within an competitive marketplace.

## Features

- 🤖 **AI-Powered Career Guidance**: Personalized recommendations based on user profile analysis
- 📊 **Skill Gap Analysis**: Identify areas for professional development
- 🗺️ **Career Pathway Mapping**: Visualize potential career trajectories
- 📝 **Resume Review**: Automated CV and resume analysis
- 💬 **Conversational AI**: Interactive chat for career advice
- 🔄 **Real-time Updates**: Dynamic recommendations based on market changes
- 📈 **Market Intelligence**: Integration with job listings and market trends

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Backend**: Node.js, Express
- **AI Integration**: Google Gemini API
- **Authentication**: JWT
- **Database**: In-memory (demo mode)

## Prerequisites

- Node.js (v16 or higher)
- Gemini API Key

## Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd career-advisor
```

### 2. Install Dependencies

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd backend
npm install
cd ..
```

### 3. Environment Configuration

Create a `.env` file in the root directory:
```env
# Required for AI features
GEMINI_API_KEY=your_gemini_api_key_here

# JWT Secret for authentication
JWT_SECRET=a_very_long_random_secret_string_for_demo

# Optional - for contact form email functionality
GMAIL_USER=your_gmail@gmail.com
GMAIL_APP_PASS=your_gmail_app_password
RECIPIENT_EMAIL=your_recipient_email@gmail.com
```

### 4. Run the Application

**Start Backend Server:**
```bash
cd backend
npm start
```

**Start Frontend Development Server:**
```bash
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5001`

## Usage

1. **Sign Up/Login**: Create an account or login to access personalized features
2. **Profile Setup**: Complete your profile with skills, interests, and career goals
3. **AI Assessment**: Take assessments to get personalized career insights
4. **Resume Review**: Upload your resume for AI-powered analysis
5. **Career Guidance**: Chat with the AI advisor for personalized recommendations
6. **Market Trends**: Explore current job market trends and opportunities

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@careeradvisor.ai or join our Slack channel.
