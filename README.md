# Scoreboard List

The Scoreboard List project is a web application that displays a list of games with their corresponding goals (home/away) and the status of each game. The status can be one of the following: Scheduled, In Progress, or Finished.

## Features

- Displays a list of games with their goals and status.
- Games are sorted based on the total number of goals, with the highest-scoring games at the top.
- Finished games are not displayed in the list.
- If multiple games have the same number of goals, they are sorted based on the order in which they were added.
- Clicking on a game in the list opens a dialog modal where the game can be edited.
- Provides an option to add a new game.

## Incomplete Code/Feature.

- Replace in memory data for real API calls
- Add extra tests for Home, Dialog, valid data, etc..
- Add form validation to avoid not valid data.
- Handle Errors on fetch data
- Improve UI

The application utilizes the `useQuery` hook from `@tanstack/react-query` to fetch fake data on start. It fetches data from a mock API endpoint and displays it in the scoreboard list.
`useQuery` handles the loading state, error handling, and caching of the data. By configuring it to automatically refetch the data at a specified interval or when specific conditions are met, it can provide automatic updates.

In a typical scenario, instead of using setState to manually update the game list, the application would make a POST request to an actual API endpoint. This would trigger automatic updates in the client-side application using useQuery.

Since we're using fake data, the data will be updated with a setState to keep track of the list of games. However, by replacing this with a real API and configuring `useQuery` accordingly, changes to the game list on the server would trigger automatic updates in the application.
This setup allows for a seamless and real-time experience, with data updates reflecting changes made on the server side without manual intervention.

## Technologies Used

- ReactJS: A JavaScript library for building user interfaces.
- Tailwind CSS: A utility-first CSS framework for rapid UI development.
- Material Tailwind: A Material-UI inspired CSS library for Tailwind CSS.
- Vite: A fast development build tool for modern web applications.
- Vite Test: A testing framework for Vite applications.
- Prettier: A code formatter that helps maintain consistent code style.
- ESLint: A linter tool to analyze and enforce code quality rules.

## Usage

    npm install
    npm run dev

The application will be accessible at http://localhost:3000.
    
## Code Formatting and Linting

The project uses Prettier and ESLint for code formatting and linting. To format your code using Prettier, run the following command:

    npm run format

To run ESLint and check for code quality issues, use the following command:

    npm run lint
    
 ## Screenshots

![image](https://github.com/jordisabat/scoreboard/assets/8877242/65142515-f10c-4252-8161-d4bbc8eddcc8)

![image](https://github.com/jordisabat/scoreboard/assets/8877242/a433b571-05ed-4cc5-82bb-8f1773102fe5)

![image](https://github.com/jordisabat/scoreboard/assets/8877242/92bb78c3-40e0-432b-bdae-cdb9ebc8197a)

# UPDATE
Task 1:
Refactor the solution to allow only incremental score changes where the time of the goal is saved and displayed in the scoreboard.

Task 2:
Refactor the solution to include the player name who scored a goal, the player name initials should be displayed along with the goal time in the scoreboard.

Task 3:
Refactor the solution to support yellow/red cards information, similar to how the match score is displayed, the score board should display the cards information.


## SOLUTION
This solution introduces several changes to the existing codebase to support an updated structure for the GameType and introduces additional functionality related to game events and player information.
This change allows for more flexible and comprehensive storage of game events, such as goals, red or yellow cards, and other significant occurrences during the game.

Here's an overview of the changes:

- **Restructured GameType**: The GameType structure has been modified to remove the home and away goals and replace them with a new type called GameEvent that is a list of events that happens in a game. 
 
- **New GameEvent type**: Each GameEvent now includes properties to store information about the event, such as the type of event (goal, red card, yellow card), the player involved, and the time at which the event occurred.

- **StartTime**: A startTime property has been added to the game, enabling the calculation of event times relative to the start of the game. This information will help to diplay the minute of occurrence for a better representation of game progress.

- **Player Initials**: The updated code includes functionality to extract the initials of a player's name to show next to each event on the ScoreBoard.
  
- **Sort of games**: The sorting of the games based of the number of goals is updated to work with the new GameEvent type.

- **Update Control Board Form**: I updated the control board fields and actions. Now we can start or end a game with a button. On start is asking for home/away team names and during the game we can add game events.

- **Update tests**: The tests have been updated to ensure proper functionality with the updated requirements.

<img width="440" alt="image" src="https://github.com/jordisabat/scoreboard/assets/8877242/93cfbeaa-3967-4dc5-94fb-aed5e36f3b48">
  
<img width="432" alt="image" src="https://github.com/jordisabat/scoreboard/assets/8877242/52a122ea-67d9-4860-949d-f3d3af0b5182">
  
<img width="494" alt="image" src="https://github.com/jordisabat/scoreboard/assets/8877242/f21c875b-5b16-4b69-8fa4-dc8aa6530ff8">  

# Test coverage

<img width="683" alt="image" src="https://github.com/jordisabat/scoreboard/assets/8877242/7c177cb4-b64a-4b30-ba0f-c12f6a4dc35a">

<img width="845" alt="image" src="https://github.com/jordisabat/scoreboard/assets/8877242/5a40238d-2dd9-4c9f-ab82-253f991a0040">



