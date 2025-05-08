Implementation Plan - Waka Waka
This document outlines a step-by-step implementation plan for the "Waka Waka" web application, based on the provided Product Requirements Document. Each step includes a specific task and a corresponding test for validation.
1. Project Setup & Foundation
Task: Initialize a new Quasar project using the recommended tech stack (Quasar, Vue 3, TypeScript, Pinia).
Test: Verify that the project directory is created, dependencies are installed, and the basic Quasar development server starts without errors.
Task: Configure TypeScript within the Quasar project.
Test: Create a simple .ts file and ensure it compiles correctly without TypeScript errors.
Task: Integrate Pinia for state management.
Test: Create a basic Pinia store and verify it can be accessed and modified in a component.
Task: Set up basic project structure for pages, components, stores, and API services.
Test: Verify that the designated folders (e.g., src/pages, src/components, src/stores, src/services) are created within the project structure.
Task: Initialize Supabase integration by installing the Supabase JavaScript client library.
Test: Verify the Supabase library is added to the project dependencies.
Task: Configure Supabase client with project URL and anon key (using environment variables).
Test: Write a simple function to connect to Supabase and verify no connection errors occur (without performing data operations yet).
2. Authentication Module
Task: Implement user registration functionality using Supabase Auth (email and password).
Test: Successfully register a new test user via the application interface. Verify the user appears in the Supabase Auth dashboard.
Task: Implement user login functionality using Supabase Auth (email and password).
Test: Successfully log in with the registered test user. Verify that a session is created (e.g., in browser local storage or cookies).
Task: Implement user logout functionality using Supabase Auth.
Test: Log in, then log out. Verify that the user session is terminated and the user is no longer authenticated.
Task: Implement password reset functionality using Supabase Auth.
Test: Initiate a password reset flow for a test user's email. Verify that a password reset email is sent by Supabase.
Task: Implement email verification after registration using Supabase Auth.
Test: Register a new user. Verify that a verification email is sent. Click the verification link and confirm the user's email status is updated in Supabase.
Task: Create protected routes that require authentication to access.
Test: Attempt to access a protected route without logging in. Verify that the user is redirected to the login page. Log in and verify access is granted.
3. User Profile (Fiche Profil détaillée)
Task: Design and implement the database schema for user profiles in Supabase (including fields for name, profession, passions, city, quote, description, photo URLs).
Test: Verify that the profiles table (or similar) is created in the Supabase database with the required columns and appropriate data types.
Task: Implement the UI for displaying a user's detailed profile.
Test: Create a static profile page component and verify it renders correctly with placeholder data.
Task: Implement functionality to fetch a user's profile data from Supabase.
Test: Log in as a user. Navigate to their profile page. Verify that their profile data is fetched and displayed correctly from the database.
Task: Implement functionality for users to edit their profile information.
Test: Log in as a user. Go to the profile edit page. Modify profile fields and save. Verify that the changes are persisted in the Supabase database.
Task: Implement functionality to upload and manage profile photos using Supabase Storage. Allow up to 3 symbolic photos.
Test: On the profile edit page, upload 3 image files. Verify that the files are successfully uploaded to Supabase Storage and the corresponding URLs are saved in the user's profile data in the database. Verify the images are displayed on the profile page.
4. Home - Living Address Book
Task: Implement functionality to fetch a list of user profiles (excluding the logged-in user).
Test: Log in. Navigate to the Home page. Verify that a list of other users' profile data is fetched from Supabase.
Task: Implement the UI for displaying user profiles as colorful cards.
Test: On the Home page, verify that the fetched profile data is rendered as visually 
distinct cards, showing photo, name, profession, city, and interests.
Task: when click on the card show page/UserProfilePage.vue , it will show the user clicked , there is a button return to be back on adress book 
Test: the click work and show the user clicked 
Task: Implement horizontal scrolling for the profile cards.
Test: On a device or browser window where not all cards fit horizontally, verify that the user can scroll left and right to see more cards.
Task: Implement simple filters (city, professional field, passion) for the profile list.
Test: Apply a filter (e.g., filter by a specific city). Verify that only profiles matching the filter criteria are displayed. Clear the filter and verify all profiles are shown again.
Task: Implement the "Discovery" feature to show 5 random inspiring profiles on load/refresh.
Test: Log in and load the Home page. Note the 5 profiles displayed. Refresh the page. Verify that a different set of 5 random profiles is displayed.
5. Events Module
Task: Design and implement the database schema for Events in Supabase (title, date, location, organizer_id, participant_ids, photo_urls).
Test: Verify that the events table (or similar) is created in the Supabase database with the necessary columns.
Task: Implement the UI for displaying a list of upcoming events.
Test: Create a static Events page component and verify it renders correctly with placeholder event data.
Task: Implement functionality to fetch the list of events from Supabase.
Test: Navigate to the Events page. Verify that event data is fetched and displayed in a list format.
Task: Implement the UI for displaying a detailed Event card.
Test: Click on an event in the list. Verify that a detailed view of the event is displayed, showing all its information.
Task: Implement the "Je participe" (I'm Participating) button functionality, updating the participant list in Supabase.
Test: Log in. On an event detail page, click "Je participe". Verify that the logged-in user's ID is added to the event's participant list in the Supabase database. Verify the button state changes (e.g., to "Participating").
Task: Implement the ability to comment on events.
Test: Log in. On an event detail page, add a comment. Verify that the comment is saved to the database (requires a comments table or similar, linked to events) and appears in the event's comment section.
Task: Implement the ability to share events (e.g., copy link or basic social share).
Test: On an event detail page, click the share button. Verify that a share action is initiated (e.g., the event URL is copied to the clipboard).
Task: Implement functionality to add events (Admin/Organizer feature - scope dependent, but plan for it).

6. Ideas & Projects Module
Task: Design and implement the database schema for Ideas/Projects in Supabase (title, description, creator_id, category, likers_ids, joiners_ids, comments, etc.).
Test: Verify that the ideas or projects table is created in the Supabase database with the necessary columns.
Task: Implement the UI for displaying a list of Ideas/Projects.
Test: Create a static Ideas/Projects page component and verify it renders correctly with placeholder data.
Task: Implement functionality to fetch the list of Ideas/Projects from Supabase.
Test: Navigate to the Ideas/Projects page. Verify that data is fetched and displayed in a list format.
Task: Implement the UI for displaying a detailed Idea/Project view.
Test: Click on an item in the list. Verify that a detailed view is displayed.
Task: Implement the "Like" functionality for Ideas/Projects.
Test: Log in. On an Idea/Project detail page, click the like button. Verify that the logged-in user's ID is added to the likers list in the database and the like count updates.
Task: Implement the "Comment" functionality for Ideas/Projects.
Test: Log in. On an Idea/Project detail page, add a comment. Verify that the comment is saved to the database and appears in the comments section.
Task: Implement the "Join" functionality for collaborative projects.
Test: Log in. On a project detail page, click the join button. Verify that the logged-in user's ID is added to the joiners list in the database.
Task: Implement functionality for members to submit new Ideas/Projects.
Test: Log in. Navigate to the "Submit Idea/Project" form. Fill in details and save. Verify that a new item is created and appears in the list.
7. Wall of Inspiring Stories
Task: Design and implement the database schema for Stories in Supabase (title, content_text, author_id, photo_urls, audio_url, video_url).
Test: Verify that the stories table is created in the Supabase database with the necessary columns.
Task: Implement the UI for displaying a list of Inspiring Stories with a narrative design.
Test: Create a static Stories page component and verify it renders correctly with placeholder data, focusing on the visual layout.
Task: Implement functionality to fetch the list of Stories from Supabase.
Test: Navigate to the Stories page. Verify that story data is fetched and displayed.
Task: Implement functionality to display individual Story content, including mixed media (text, photos, optional audio/video).
Test: Click on a story. Verify that the full content, including all associated media, is displayed correctly.
Task: Implement functionality for members to submit new Stories, including uploading media to Supabase Storage.
Test: Log in. Navigate to the "Submit Story" form. Add text and upload media files. Save the story. Verify that the story and its media are saved to Supabase.
8. Suggestions Croisées (Cross-Suggestions)
Task: Design and implement the database logic or initial algorithm for suggesting connections between members based on profile data (passions, city, profession).
Test: Create a test function that takes a user ID and returns a list of suggested user IDs based on matching criteria. Verify that the function returns plausible suggestions based on test data.
Task: Implement the UI component to display suggested connections add a menu called 'Acceuil' that redirect to the page that show the Cross-Suggestions.
Test: Verify that a section or page for suggestions is rendered.
Task: Implement functionality to fetch and display suggested profiles for the logged-in user.
Test: Log in. Navigate to the suggestions area. Verify that a list of suggested user profiles (fetched using the suggestion logic) is displayed.
9. Mur de Recommandations Authentiques
Task: Design and implement the database schema for Recommendations in Supabase (recommender_id, recommended_id, recommendation_text).
Test: Verify that the recommendations table is created with the necessary columns.
Task: Implement functionality for a user to leave a short recommendation for another user.
Test: Log in. Navigate to another user's profile. Find/create a "Leave Recommendation" button/form. Submit a short text recommendation. Verify that the recommendation is saved to the database.
Task: Implement functionality to display recommendations received on a user's profile page.
Test: Navigate to a user's profile page (who has received recommendations). Verify that the list of recommendations is fetched and displayed.
10. Mini-Défis Communautaires
Task: Design and implement the database schema for Mini-Challenges and Responses in Supabase (challenge_title, description, response_text, response_media_urls, respondent_id).
Test: Verify that challenges and challenge_responses tables are created.
Task: Implement the UI to display the current week's Mini-Challenge.
Test: Create a component to display a challenge description and verify it renders.
Task: Implement functionality for members to submit responses to the Mini-Challenge (text and optional media upload).
Test: Log in. Find/create the challenge response form. Submit text and upload a photo. Verify the response and media are saved to the database.
Task: Implement the UI to display a feed or list of responses to the current Mini-Challenge.
Test: Navigate to the responses section. Verify that submitted responses from other users are displayed.
11. UI/UX & Styling
Task: Implement the Mobile-first responsive layout using Quasar's grid and responsive utilities.
Test: View the application on different screen sizes (mobile portrait/landscape, tablet, desktop). Verify that the layout adapts correctly and elements are not cut off or misaligned.
Task: Implement the core color palette (Water Green, Soft Blue, Light Beige, Coral/Yellow for CTAs) using Quasar's theming or CSS variables.
Test: Verify that the main background colors, text colors, and button colors match the specified palette throughout the application.
Task: Implement the chosen typography (Poppins, Inter, or Raleway).
Test: Verify that the application's text uses the selected font family.
Task: Implement the fixed bottom navigation bar with the specified icons and links.
Test: On mobile view, verify that the navigation bar is fixed at the bottom, contains the correct icons/labels, and that clicking each icon navigates to the corresponding page.
Task: Implement soft visual effects (fade-in, light slides, subtle zoom on hover for cards).
Test: Interact with elements like profile cards or event listings. Verify that subtle animations occur on hover or when elements appear.
Task: Implement rounded corners and soft shadows for cards and key UI elements.
Test: Visually inspect cards (profiles, events, ideas) and other interactive elements. Verify that they have rounded corners and a subtle shadow effect.
Task: Implement the display of inspiring quotes with animation (e.g., on Home page load).
Test: Load the Home page or return to it. Verify that an inspiring quote appears with a noticeable animation.
Task: Integrate stylized illustrations or human avatars as background or decorative elements.
Test: Verify that illustrative elements are present in key areas of the application, enhancing the visual theme.
12. Deployment
Task: Configure the project for deployment on the chosen hosting platform (Vercel or Netlify).
Test: Set up the project on the hosting platform, linking it to the source code repository.
Task: Deploy the application to the hosting platform.
Test: Verify that the application builds successfully on the platform and is accessible via the deployed URL.
Task: Configure environment variables for Supabase URL and keys on the hosting platform.
Test: After deployment, verify that the application can successfully connect to the Supabase backend and fetch data.
13. Refinement & Testing
Task: Conduct comprehensive testing of all implemented features.
Test: Follow all the individual tests listed above for each feature. Perform end-to-end testing of user flows (registration -> profile creation -> browsing -> joining event -> posting idea, etc.).
Task: Optimize application performance (loading times, responsiveness).
Test: Use browser developer tools (Lighthouse, Performance tab) to profile the application. Identify and address performance bottlenecks.
Task: Ensure accessibility standards are met (keyboard navigation, ARIA attributes, color contrast).
Test: Use accessibility testing tools (e.g., Axe DevTools) and manual testing (keyboard navigation) to identify and fix accessibility issues.
Task: Gather user feedback and iterate on the design and features.
Test: Collect feedback from a group of testers. Prioritize and implement necessary adjustments based on feedback.
