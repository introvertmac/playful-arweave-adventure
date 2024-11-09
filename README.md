

## Project info



## Current Blockchain Integration

This project currently uses Arweave for storing high scores on the blockchain. The integration works through:

1. **Score Storage**: When players complete puzzles, their scores are stored on the Arweave blockchain using the `saveScore` function in `src/utils/arweave.ts`.
2. **Transaction Creation**: Each score is stored as a JSON transaction containing:
   - The player's score
   - A timestamp
3. **High Score Retrieval**: The `getHighScores` function queries the Arweave network using GraphQL to fetch the top 10 scores.

## Future AO Integration Possibilities

While the game currently only uses Arweave, it could be enhanced with AO (Arweave Operating System) integration in several ways:

1. **Smart Contract Integration**: 
   - Implement game logic and scoring rules as AO processes
   - Create verifiable puzzle completion validation
   - Enable player rankings and achievements

2. **Multiplayer Features**:
   - Player-vs-player hacking challenges
   - Real-time leaderboards
   - Tournament systems

3. **Token Economics**:
   - Reward players with custom tokens for completing challenges
   - Enable in-game purchases of power-ups or new puzzles
   - Create a marketplace for trading hacking tools

## How can I edit this code?
 
There are several ways of editing your application.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. 


The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone [https://github.com/introvertmac/playful-arweave-adventure/](https://github.com/introvertmac/playful-arweave-adventure)

# Step 2: Navigate to the project directory.
cd playful-arweave-adventure

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Arweave SDK for blockchain integration

