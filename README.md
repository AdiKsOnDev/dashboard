# Portfolio Template

A modern, dashboard-style portfolio template built with Next.js, TypeScript, and shadcn/ui. All content is managed through JSON files for easy customization.

## Features

- **Dashboard Layout**: Clean, professional dashboard-style interface
- **Dark/Light Mode**: Built-in theme toggle with system preference support
- **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile
- **JSON-Driven**: All content stored in JSON files for easy updates
- **Modern Stack**: Built with Next.js 15, TypeScript, and Tailwind CSS
- **Beautiful UI**: Uses shadcn/ui components for a polished look
- **Easy Navigation**: Sidebar navigation with mobile menu support
- **Blog Section**: Showcase your writing and technical articles

## Project Structure

```
portfolio/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Overview/Dashboard page
│   ├── projects/          # Projects showcase
│   ├── experience/        # Work experience timeline
│   ├── blog/              # Blog posts
│   └── contact/           # Contact information
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── sidebar.tsx       # Desktop sidebar navigation
│   ├── mobile-nav.tsx    # Mobile navigation
│   ├── theme-provider.tsx # Theme context provider
│   └── theme-toggle.tsx  # Dark/light mode toggle
├── data/                 # JSON data files
│   ├── profile.json      # Personal information
│   ├── projects.json     # Project portfolio
│   ├── experience.json   # Work history
│   ├── blog.json         # Blog posts
│   └── contact.json      # Contact details and services
└── types/                # TypeScript type definitions
```

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Customize your data**:
   Edit the JSON files in the `data/` directory:
   - `profile.json` - Your personal information and stats
   - `projects.json` - Your project portfolio
   - `experience.json` - Your work experience
   - `blog.json` - Your blog posts and articles
   - `contact.json` - Contact information and services

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Customization Guide

### Update Profile Information

Edit `data/profile.json`:
```json
{
  "name": "Your Name",
  "title": "Your Title",
  "email": "your.email@example.com",
  ...
}
```

### Add Projects

Edit `data/projects.json` to add or modify projects:
```json
{
  "projects": [
    {
      "title": "Project Name",
      "description": "Short description",
      "tags": ["React", "Node.js"],
      ...
    }
  ]
}
```

### Update Experience

Edit `data/experience.json` to add work experience:
```json
{
  "experience": [
    {
      "company": "Company Name",
      "position": "Your Position",
      "startDate": "2023-01",
      "current": true,
      ...
    }
  ]
}
```

### Add Blog Posts

Edit `data/blog.json` to add blog posts:
```json
{
  "posts": [
    {
      "title": "Post Title",
      "excerpt": "Short description",
      "category": "Frontend",
      "tags": ["React", "TypeScript"],
      "featured": true,
      ...
    }
  ]
}
```

## Build for Production

```bash
npm run build
npm start
```

## Deploy

This portfolio can be deployed to:
- **Vercel** (recommended): `vercel deploy`
- **Netlify**: Connect your Git repository
- **Any Node.js hosting**: Build and deploy the `.next` folder

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Theme**: next-themes (dark/light mode)
- **Icons**: Lucide React
- **Fonts**: Inter

## License

MIT License - feel free to use this template for your own portfolio!
