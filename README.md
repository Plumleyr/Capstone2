![image](https://github.com/user-attachments/assets/9f3635e6-0fe7-4c54-9b73-b5a44269bacf)

[API Link](https://platform.openai.com/overview)

[Gutsy](https://gutsy.onrender.com/)

# Gutsy

Gutsy is an innovative app designed to help users with stomach diseases such as Crohn's, Ulcerative Colitis, and IBS track their food intake and stomach status. By logging daily meals and symptoms, users receive personalized insights and monthly overviews, empowering them to manage their health effectively.

## Purpose

The primary goal of Gutsy is to provide a user-friendly platform for individuals with stomach conditions to:
- Track daily food consumption and stomach status.
- Receive ingredient ratings tailored to their specific health conditions.
- Access explanations for each ingredient's impact on their stomach health.

## Key Features

- **Anonymity**: Users can start as a guest without signing up, allowing for a seamless experience.
- **Easy Onboarding**: A quick setup process lets users select their disease and get started immediately.
- **Interactive Calendar**: Visualize daily stomach status with color-coded entries (green for good, orange for meh, red for bad).
- **Ingredient Tracking**: After entering ingredients, users receive ratings based on their condition, displayed in an easy-to-understand format.
- **Profile Management**: Users can sign up, log in, and edit their profiles at any time.

## User Flow

1. Start on the landing page and click "Get Started."
2. On the getting started page, enter your name or continue as a guest.
3. Select your disease from the provided options.
4. Navigate to the tracker, where you'll select your stomach status for the day (good, meh, or bad).
5. Enter a list of ingredients consumed throughout the day.
6. Upon submission, a tracker is created, displaying:
   - A color-coded entry on the calendar.
   - Ingredients eaten for selected day.
   - Ratings for each ingredient displayed in two respective boxes:
     - **Good Ingredients**: Listed in a "Good" box.
     - **Sensitive Ingredients**: Listed in a "Sensitive Ingredients" box.
7. Click on different days to view past trackers or receive notifications if no ingredients were logged.

## Tech Stack

- **Supabase**: Backend as a Service for database management and user authentication.
- **OpenAI API**: For generating ratings and insights based on ingredient data.
- **React**: Frontend framework for building interactive user interfaces.
- **CSS**: Styling for the web application.
- **HTML**: Markup for structuring content.

---

Gutsy is here to help you navigate your dietary choices with confidence, ensuring you have the information you need to manage your health effectively.
