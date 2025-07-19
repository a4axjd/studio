
# Portfolio Website - Complete Guide

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. This project features dynamic content loading for articles and projects from markdown files.

## 🏗️ Project Architecture

### Core Technologies
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe JavaScript for better development experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality, accessible UI components
- **React Router DOM** - Client-side routing
- **Tanstack Query** - Data fetching and state management

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── DynamicProjects.tsx
│   └── DynamicResearchArticles.tsx
├── pages/              # Route components
│   ├── Index.tsx       # Main homepage
│   ├── AllArticles.tsx # All articles page
│   ├── AllProjects.tsx # All projects page
│   ├── ArticleDetail.tsx
│   ├── ProjectDetail.tsx
│   └── NotFound.tsx
├── utils/              # Utility functions
│   └── markdownLoader.ts
└── App.tsx             # Main app component with routing

public/
├── articles/           # Article markdown files
│   ├── index.json     # List of article files
│   └── *.md           # Individual article files
└── projects/          # Project markdown files
    ├── index.json     # List of project files
    └── *.md           # Individual project files
```

## 📝 Managing Articles

### Creating a New Article

1. **Create the markdown file** in `public/articles/` directory:
   ```markdown
   ---
   title: Your Article Title
   abstract: Brief description of your article (1-2 sentences)
   journal: Publication name or platform
   date: 2024-01-15
   tags: tag1, tag2, tag3
   image: /path/to/image.jpg (optional)
   url: https://external-link.com (optional)
   ---

   # Your Article Content

   Write your article content here using standard markdown syntax.

   ## Subheading
   - Bullet points
   - **Bold text**
   - *Italic text*

   More paragraphs...
   ```

2. **Update the index file** `public/articles/index.json`:
   ```json
   [
     "existing-article.md",
     "your-new-article.md"
   ]
   ```

### Article Frontmatter Fields
- `title` (required) - Article title displayed on the website
- `abstract` (required) - Brief summary shown in article previews
- `journal` (required) - Publication or platform name
- `date` (required) - Publication date (YYYY-MM-DD format)
- `tags` (required) - Comma-separated list of tags
- `image` (optional) - Path to article image
- `url` (optional) - External link to full article

### Editing an Article
Simply edit the corresponding `.md` file in `public/articles/`. Changes will be reflected immediately.

### Deleting an Article
1. Delete the `.md` file from `public/articles/`
2. Remove the filename from `public/articles/index.json`

## 🚀 Managing Projects

### Creating a New Project

1. **Create the markdown file** in `public/projects/` directory:
   ```markdown
   ---
   title: Your Project Name
   description: Brief project description
   tech: React, TypeScript, Node.js
   image: /path/to/project-image.jpg (optional)
   url: https://live-demo.com (optional)
   github: https://github.com/username/repo (optional)
   ---

   # Project Name

   Detailed description of your project.

   ## Features
   - Feature 1
   - Feature 2
   - Feature 3

   ## Technical Details
   Explain the technical implementation...
   ```

2. **Update the index file** `public/projects/index.json`:
   ```json
   [
     "existing-project.md",
     "your-new-project.md"
   ]
   ```

### Project Frontmatter Fields
- `title` (required) - Project name
- `description` (required) - Brief project description
- `tech` (required) - Comma-separated list of technologies used
- `image` (optional) - Path to project screenshot/image
- `url` (optional) - Live demo URL
- `github` (optional) - GitHub repository URL

### Editing a Project
Edit the corresponding `.md` file in `public/projects/`. Changes are reflected immediately.

### Deleting a Project
1. Delete the `.md` file from `public/projects/`
2. Remove the filename from `public/projects/index.json`

## 🧩 Component Breakdown

### Core Pages

#### `src/pages/Index.tsx` (Main Homepage)
- **Purpose**: Landing page with hero section, about, experience, featured projects, and articles
- **Key Features**:
  - Responsive navigation with mobile drawer
  - Hero section with personal branding
  - About section with skills
  - Experience timeline
  - Featured content previews
- **State Management**: Uses `useState` for drawer navigation
- **Responsive Design**: Extensive Tailwind breakpoints for mobile-first design

#### `src/pages/AllArticles.tsx`
- **Purpose**: Displays all research articles
- **Features**: Grid layout, search/filter functionality, pagination

#### `src/pages/AllProjects.tsx`
- **Purpose**: Displays all projects
- **Features**: Grid layout with project cards, filtering by technology

#### `src/pages/ArticleDetail.tsx` & `src/pages/ProjectDetail.tsx`
- **Purpose**: Individual content pages
- **Features**: Full markdown rendering, breadcrumb navigation, related content

### Dynamic Components

#### `src/components/DynamicProjects.tsx`
- **Purpose**: Loads and displays project data dynamically
- **Key Functions**:
  - Fetches project data from markdown files
  - Renders project cards with tech badges
  - Handles loading states
  - Links to individual project pages
- **Data Flow**: `useEffect` → `loadMarkdownFiles` → state update → render

#### `src/components/DynamicResearchArticles.tsx`
- **Purpose**: Loads and displays article data dynamically
- **Key Functions**:
  - Fetches article data from markdown files
  - Renders article cards with metadata
  - Handles loading states
  - Links to individual article pages
- **Data Flow**: Similar to DynamicProjects

### Utility Functions

#### `src/utils/markdownLoader.ts`
- **Purpose**: Core content management system
- **Key Functions**:
  - `loadMarkdownFiles(type)` - Fetches markdown files for articles or projects
  - `parseFrontmatter(content)` - Extracts YAML frontmatter from markdown
  - `parseYamlLikeFrontmatter(text)` - Parses YAML-like frontmatter
  - `parseMarkdown(markdown)` - Converts markdown to HTML with Tailwind classes

**How it works**:
1. Fetches `index.json` to get list of markdown files
2. Fetches each markdown file
3. Parses frontmatter (metadata between `---` tags)
4. Returns structured data with frontmatter and content

### UI Components

All UI components are from **shadcn/ui** library:
- `Button` - Consistent button styling with variants
- `Card` - Content containers with consistent styling
- `Badge` - Small labels for tags and technologies
- `Drawer` - Mobile navigation drawer
- `Avatar`, `Alert`, `Accordion` - Additional UI elements

### Styling System

#### Tailwind CSS Classes
- **Responsive Breakpoints**: `xs:`, `sm:`, `md:`, `lg:`, `xl:`
- **Typography**: Custom font classes `font-electric`, `font-electrolize`
- **Spacing**: Consistent padding/margin using Tailwind spacing scale
- **Colors**: Theme-based colors using CSS variables

#### Custom Fonts
- **Electric** (`font-electric`) - Used for headings and branding
- **Electrolize** (`font-electrolize`) - Used for body text and UI elements

## 🔧 Development

### Getting Started
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Adding New Features

1. **New Page**: Create in `src/pages/` and add route to `App.tsx`
2. **New Component**: Create in `src/components/` with proper TypeScript types
3. **New Utility**: Add to `src/utils/` with proper exports

### Content Management Workflow

1. **Local Development**:
   - Add markdown files to `public/articles/` or `public/projects/`
   - Update corresponding `index.json`
   - Content loads automatically in development

2. **Production Deployment**:
   - Ensure all markdown files are in the `public` directory
   - Index files must be updated
   - Static files are served directly by the web server

## 🎨 Customization

### Changing Colors
Edit the CSS variables in your theme configuration or Tailwind config.

### Adding New Content Types
1. Create new directory in `public/`
2. Add index.json file
3. Create corresponding dynamic component
4. Add routing and pages

### Modifying Layout
- **Navigation**: Edit the nav section in `Index.tsx`
- **Hero Section**: Modify the hero content in `Index.tsx`
- **Cards**: Customize card layouts in dynamic components

## 📱 Responsive Design

The website is fully responsive with:
- **Mobile-first approach** using Tailwind CSS
- **Breakpoints**: xs (475px), sm (640px), md (768px), lg (1024px), xl (1280px)
- **Flexible layouts** that adapt to screen size
- **Touch-friendly** navigation and interactions

## 🚀 Deployment

The project can be deployed to any static hosting service:
- **Vercel**: Connect GitHub repository
- **Netlify**: Drag and drop build folder
- **GitHub Pages**: Use GitHub Actions
- **Lovable**: Use the built-in publish feature

## 🔍 Troubleshooting

### Common Issues

1. **Content not loading**: Check that `index.json` files are updated
2. **Build errors**: Ensure all imports are correct and files exist
3. **Styling issues**: Verify Tailwind classes and responsive breakpoints
4. **Routing problems**: Check that all routes are defined in `App.tsx`

### Debug Tips

- Use browser developer tools to inspect network requests
- Check console for JavaScript errors
- Verify markdown frontmatter format
- Ensure file paths are correct (case-sensitive on some systems)

## 📄 License

This project is built with Lovable and can be customized according to your needs.
