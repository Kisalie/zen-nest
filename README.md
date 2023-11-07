# Zen Nest

Zen Nest is a meditation web application with a React front end and a Django REST framework backend. Users are able to login/register, create meditation sessions, with full CRUD functionality. 

## Deployment Link
[Live Deployment](https://zen-nest-2f1daef67211.herokuapp.com/register)

## Timeframe
This was a solo project and I had to create a react based web application within 12 days using the Django REST Framework.

## Technologies Used 💡

- HTML
- CSS
- JavaScript
- React
- Django
- PostgresSQL
- Eleven Labs
- Tailwind CSS
- Quick Database Diagram
- Trello
- Figma
- TablePlus

## Brief

- Build a full-stack application by making your own backend and your own front-end
- Use a Python Django API using Django REST Framework to serve your data from a Postgres database.
- Consume your API with a separate front-end built with React.
- Be a complete product which most likely means multiple relationships and CRUD functionality for at least a couple of models.
- Implement thoughtful user stories/wireframes that are significant enough to help you know which features are core MVP and which you can cut.
- Have a visually impressive design.
- Be deployed online so it's publicly accessible.

## Planning

### Wireframe

 I made my wireframe using Figma, I wanted to plan the structure of it by doing the mobile view. Then I chose my colour scheme, although I changed some of the colours for my final implementation. I wanted to go for more of a simplistic design as it was a meditation application.

![Wireframe](/client/src/images/wireframe-project-4.png)

### Trello

Using Trello to track my progress for the project.

![Trello](/client/src/images/trello.png)

### Database Visualiser

I wanted to visualise how my database will be structured so I can get straight into implementing my plan. I used Quick Database Diagrams to do this.

![ERD](/client/src/images/database-diagram.png)

## Build Process

Firstly I created a logo for my meditation app using DALLE. Then I started assembling the back-end. Most importantly, I needed to find enough audio files for the guided-meditation audio, so instead of searching the internet I decided to create my own. First of all, I used a prompt on ChatGPT API to generate the text, then used Eleven Labs to convert the text into audio.

Once I had all of my guided meditation mp3 files, I went onto collecting the self-guided meditation audio which was just ambient sounds. I found these sounds on Youtube and converted them into mp3 files.

### Python Script

I wrote a Python script that handles audio files for a meditation app. It's designed to calculate the duration of MP3 files, generate AWS S3 URLs for them, and then create JSON-formatted seed data for database initialisation. I process the audio files, extract necessary data like the theme and intensity, and determine if they're guided meditations. Then, my script writes it to JSON files, which makes it easy to add the audio details to the database.

![Script](/client/src/images/script.png)

### Challenges

Initially, I struggled to present the sessions in a nicely formatted table with options to create, edit and delete, due to it being difficult to manage state.  This is because the EditModal's state must be properly managed to ensure that it displays the correct session data for editing and that it resets or closes appropriately after the edit is done.

The solution for editing a session was to filter that specific session from my sessions array and set it in the `singleSession` state, then I open the `EditModal` component by setting `open` to `true`. 

For deletion, I send a delete request, and upon confirmation, I update the `sessions` state to reflect this change, giving immediate feedback to the user with a success toast notification.

Also, I implemented a side effect, using `useEffect` on the HTML table, so that whenever an item was edited or deleted, the table would re-render.

I've created a dynamic and responsive UI for managing meditation sessions, complete with real-time add, edit, and delete functionalities, and I've made sure to keep the user informed every step of the way

![meditations](/client/src/images/meditation-sessions.png)

### Wins

- Using ChatGPT API and Eleven Labs API I was able to create a large number of meditation sessions, this shows how it’s possible to automatically create quality content at scale using AI. 
- Implementation of  toast notifications using Toastify to create a better user experience with error handling.

### Key Learnings

- Python made it possible to effortlessly translate my thoughts into code and it gave me the chance to reinforce my grasp of the subject.

### Future Improvements

- Add a journaling feature, where users can journal after each meditation session.
- Allow users to undo deleting a session.

