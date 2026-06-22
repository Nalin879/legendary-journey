# Legendary Journey - My Modern Portfolio Blog

A beautifully minimal portfolio website built with **Next.js**, **MDX**, and **TailwindCSS**. Write Markdown, deploy static HTML.

## 🎯 What This Is

This is a static site generator for your personal blog and portfolio. Instead of using a blogging platform, you:

1. Write posts in **Markdown** or **MDX** (Markdown + React)
2. Push to GitHub
3. GitHub Actions automatically builds and deploys your static site
4. Your blog is live on GitHub Pages in seconds

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and pnpm

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open http://localhost:3000
```

### Build for Production

```bash
# Generate static HTML files
pnpm build

# Output goes to ./out folder
# This is what gets deployed to GitHub Pages
```

## 📝 Writing Posts

All posts live in the `/content` directory as `.mdx` files.

### Create a New Post

Create a file like `content/2026-06-22-my-awesome-post.mdx`:

```markdown
---
title: "My Awesome Post"
date: "2026-06-22"
tags: ["react", "web-dev"]
---

# My Awesome Post

This is my post content. You can write normal Markdown here.

## Subheadings work

- Lists work
- With bullets
- Like normal Markdown

You can also write **bold** and *italic* text.
```

### Front Matter

Each post needs front matter (the YAML section at the top):

| Field | Required | Notes |
|-------|----------|-------|
| `title` | Yes | The post title |
| `date` | Yes | Format: `YYYY-MM-DD` |
| `tags` | No | Array of tag strings |

### File Naming Convention

Name files: `YYYY-MM-DD-slug-name.mdx`

This becomes the URL: `yourblog.com/blog/YYYY-MM-DD-slug-name`

## 🎨 How It Works Under the Hood

### The Magic: Static Export

In `next.config.js`:

```javascript
const nextConfig = {
  output: 'export', // ← This one line
};
```

This tells Next.js: *"When I build, turn my entire website into static `.html` files and stop running as a server."*

### The Pipeline

1. **Build Time**: `pnpm build` runs
2. **Static Params**: `generateStaticParams()` in `src/app/blog/[slug]/page.tsx` reads all `.mdx` files
3. **HTML Generation**: Next.js renders each post as a separate `.html` file
4. **Output**: All `.html` files land in `./out` folder
5. **Deployment**: GitHub Actions copies `./out` to GitHub Pages
6. **Live**: Your site is now live on `yourusername.github.io`

### The Components

- **`src/app/page.tsx`** - Homepage with blog list
- **`src/app/blog/[slug]/page.tsx`** - Individual blog post template (dynamic)
- **`src/lib/mdx.ts`** - Utilities to read and parse `.mdx` files with `gray-matter`
- **`src/components/MDXContent.tsx`** - Markdown renderer for blog content

## 🚀 Deploy to GitHub Pages

### One-Time Setup

1. Push this repo to GitHub
2. Go to your repo **Settings → Pages**
3. Under "Source", select **GitHub Actions**
4. Save

### Auto-Deploy

Every time you push to `main`:

1. GitHub Actions triggers
2. Runs `pnpm install && pnpm build`
3. Takes the `./out` folder
4. Deploys it to GitHub Pages
5. Your site updates automatically

No manual deployment needed. Just write and push.

## 📁 File Structure

```
my-portfolio-blog/
├── content/                          # All your blog posts
│   ├── 2026-06-22-my-first-post.mdx
│   └── 2026-06-20-my-second-post.mdx
├── src/
│   ├── app/
│   │   ├── blog/
│   │   │   └── [slug]/
│   │   │       └── page.tsx          # Dynamic blog template
│   │   ├── page.tsx                  # Homepage
│   │   ├── layout.tsx                # Root layout
│   │   └── globals.css               # Global styles
│   ├── components/
│   │   └── MDXContent.tsx            # Markdown renderer
│   └── lib/
│       └── mdx.ts                    # MDX parsing utilities
├── .github/workflows/
│   └── deploy.yml                    # GitHub Actions CI/CD
├── next.config.js                    # Next.js config (enables static export)
├── tailwind.config.ts                # Tailwind configuration
└── package.json                      # Project metadata
```

## 🎨 Customization

### Edit the Homepage

Edit `src/app/page.tsx` to change how the homepage looks and add your own content.

### Customize Styling

All styling uses TailwindCSS. Edit `src/app/globals.css` for global styles.

### Change Colors

Update colors in `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      'dark': '#1a1a1a',   // ← Change this
      'light': '#fafafa',   // ← Or this
    },
  },
},
```

### Add React Components to Posts

Since posts are MDX, you can import and use React components:

```markdown
---
title: "My Post"
date: "2026-06-22"
---

import MyButton from '@/components/MyButton';

# My Post

Some content here.

<MyButton text="Click me!" />
```

## 🚨 Common Issues

### "Post not showing up"

- Check the filename: `YYYY-MM-DD-slug.mdx`
- Check front matter has `title`, `date`, and `tags`
- Run `pnpm build` - if no errors, the post is there

### "Build fails"

Run locally: `pnpm build`

Check the error message. Most likely:

- Invalid front matter YAML
- Missing required fields in a post
- Syntax error in MDX

## 📚 Learn More

- [Next.js Docs](https://nextjs.org/docs)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [MDX Docs](https://mdxjs.com)
- [gray-matter Docs](https://github.com/jonschlinkert/gray-matter)

## 💡 Pro Tips

1. **Use git tags for versions**: Tag each deploy with a version number
2. **Keep posts focused**: One idea per post
3. **Add to your resume**: "I built and maintain my own blog platform"
4. **Link to other posts**: Make internal navigation easy
5. **Monitor GitHub Actions**: Check build logs if deployment fails

## 📄 License

MIT - Do what you want with this

---

**Happy blogging! 🎉**
