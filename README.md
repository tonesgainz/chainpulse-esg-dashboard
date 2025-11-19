# Welcome to your Lovable project

## Snf Factor

**URL**: https://lovable.dev/projects/4d9cc67a-9f34-4173-b9e1-cbaae86219ac

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/4d9cc67a-9f34-4173-b9e1-cbaae86219ac) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

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

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

### Deploy to Netlify

This project is configured for easy deployment to Netlify:

1. **Push your code to GitHub** (if not already done)

2. **Connect to Netlify:**
   - Go to [Netlify](https://app.netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - Netlify will auto-detect the build settings from `netlify.toml`

3. **Set Environment Variables in Netlify:**
   - Go to Site settings → Environment variables
   - Add the following variables:
     ```
     VITE_SUPABASE_URL=your-supabase-url
     VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-key
     VITE_SUPABASE_PROJECT_ID=your-project-id
     ```

4. **Deploy:**
   - Click "Deploy site"
   - Netlify will build and deploy your app automatically

### Deploy via Lovable

Simply open [Lovable](https://lovable.dev/projects/4d9cc67a-9f34-4173-b9e1-cbaae86219ac) and click on Share → Publish.

## Environment Setup

1. Copy [.env.example](.env.example) to `.env`:
   ```sh
   cp .env.example .env
   ```

2. Fill in your Supabase credentials in `.env`:
   - Get these from your [Supabase project settings](https://app.supabase.com/project/_/settings/api)

## Supabase Integration

This project uses Supabase for backend services. The integration is already set up in:
- [src/integrations/supabase/client.ts](src/integrations/supabase/client.ts) - Supabase client configuration
- [src/integrations/supabase/types.ts](src/integrations/supabase/types.ts) - Database type definitions

Make sure to configure your environment variables before running the project.

## Custom Domain

For custom domains, we recommend using Netlify. The project includes a [netlify.toml](netlify.toml) configuration file that handles:
- Build settings
- SPA routing redirects
- Environment configuration

Visit [Lovable docs](https://docs.lovable.dev/tips-tricks/custom-domain/) for more details.
