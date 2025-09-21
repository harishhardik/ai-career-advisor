# AI Career Advisor Backend (Demo Mode)

This folder contains the Node.js and Express backend for the AI Career Advisor application.

**This version runs in a simplified demo mode.** User data is stored in memory and will be cleared when the server stops.

## How to Run the Backend

Follow these steps to get the server running. This will fix any "Failed to fetch" errors in the application.

### Step 1: Install Dependencies

Open a terminal window, navigate into this `backend` directory, and run the following command to install all the necessary packages:

```bash
npm install
```

### Step 2: Configure Email Functionality (Optional, but required for Contact Form)

To allow the contact form to send emails to your Gmail account, you need to provide your credentials securely.

1.  **Create a `.env` file:** In the `backend` directory, create a new file named `.env`.
2.  **Copy the contents:** Copy the entire content from the `backend/.env.example` file and paste it into your new `.env` file.
3.  **Generate a Google App Password:** For security reasons, you cannot use your regular Google password. You must generate a special "App Password".
    *   Go to your Google Account settings: [myaccount.google.com](https://myaccount.google.com/)
    *   Navigate to **Security**.
    *   Make sure **2-Step Verification** is turned ON. You cannot create an App Password without it.
    *   In the "Signing in to Google" section, click on **App passwords**.
    *   For the app, select **Mail**. For the device, select **Other (Custom name)** and call it "Career Advisor Backend".
    *   Click **Generate**.
    *   Google will give you a 16-character password. **Copy this password immediately.** This is your `GMAIL_APP_PASS`.
4.  **Fill in your `.env` file:**
    *   `GMAIL_USER`: Your full Gmail address (e.g., `your.email@gmail.com`).
    *   `GMAIL_APP_PASS`: The 16-character App Password you just generated.
    *   `RECIPIENT_EMAIL`: The email address where you want to receive the contact messages (this can be the same as your `GMAIL_USER` or a different one).

### Step 3: Start the Server

Once your dependencies are installed and your `.env` file is configured, run the following command in your terminal (while still in the `backend` directory):

```bash
npm start
```

You should see the following message in your terminal:

```
Server running in demo mode on port 5001
```

**That's it!** Your backend is now running. Keep this terminal window open. You can now use the "Create Account", "Login", and "Contact Us" features in the web application without any connection errors.