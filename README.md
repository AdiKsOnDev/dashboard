# Portfolio 
A modern, dashboard-style portfolio built with Next.js, TypeScript, and shadcn/ui. All content is managed through JSON files.

>[!NOTE]
>This can be easily customized, check the data/ folder and you'll understand what to change fairly easily. I tried my best to keep
>the project modular for code modifications to be seamless as well, so feel free to have your fun with this. Just give me a star please ;)

![627_1x_shots_so](https://github.com/user-attachments/assets/071faa75-e057-4148-bd1b-7e9aff01a5e9)

## Features

- **Dashboard Layout**: Clean, professional dashboard-style interface
- **Dark/Light Mode**: Built-in theme toggle with system preference support
- **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile
- **JSON-Driven**: All content stored in JSON files for easy updates
- **Modern Stack**: Built with Next.js 15, TypeScript, and Tailwind CSS
- **Beautiful UI**: Uses shadcn/ui components for a polished look
- **Easy Navigation**: Sidebar navigation with mobile menu support
- **Blog Section**: Showcase your writing and technical articles
- **Blog Writer**: When in development mode (i.e. `pnpm run dev`)

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
│   ├── config/           # Configuration data
│   │   ├── profile.json  # Personal information
│   │   └── contact.json  # Contact details
│   └── content/          # Content data
│       ├── projects.json # Project portfolio
│       ├── experience.json # Work history
│       ├── skills.json   # Skills and proficiencies
│       └── blogs/        # Blog posts
│           ├── index.json # Blog index
│           └── *.json    # Individual blog posts
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
│   ├── utils.ts          # General utilities
│   ├── navigation.ts     # Navigation configuration
│   └── blog-utils.ts     # Blog-specific utilities
└── types/                # TypeScript type definitions
```
