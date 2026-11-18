# Esther Newton · Portfolio

A personal portfolio built as a draggable cork board. The homepage is a blush, magazine-style intro next to a framed cork board of cards and stickers you can drag, tidy up, and shuffle. Each section (Projects, Experience, Honors & Affiliations, About, Contact) slides in over the board and also has its own full page on a pink cutting-mat grid.

Built with Next.js, TypeScript, Tailwind CSS and Motion (formerly Framer Motion).

---

## Run it on your computer

Open a terminal in this folder and run:

```bash
npm install   # first time only
npm run dev
```

Then open http://localhost:3000.

> If you change colors or backgrounds in `app/globals.css` and the page doesn't update, stop the server (Ctrl+C) and run `npm run dev` again.

---

## Update your content (no component editing needed)

Everything you'd normally want to change lives in `content/`. Text that still needs filling in starts with `TODO` and shows up on the site as gray dashed text, so it's easy to spot.

| File | What it controls |
| --- | --- |
| `content/site.ts` | Name, headline, intro line, email, LinkedIn, GitHub, resume path |
| `content/currently.ts` | The "Currently" sticky note (building / reading / learning) |
| `content/projects.ts` | Project cards and case-study pages (problem, role, process, outcome, links) |
| `content/experience.ts` | Experience timeline (dates are `"YYYY-MM"`, `end: null` means present) |
| `content/highlights.ts` | Badges and polaroids on the Highlights page |
| `content/about.ts` | Your story, photo, and "What I'm looking for" |
| `content/skills.ts` | Skills grouped by Product / Engineering / Design / IE |
| `content/travel.ts` | Countries on the travel map (use the exact names listed in the file) |
| `content/testimonials.ts` | Quotes; the section stays hidden until you add one |
| `content/board.ts` | Starting positions and tilt of each item on the homepage board |

### Add your photo, resume, and project images

- **Resume:** save it as `public/resume.pdf`.
- **Photo:** save it as `public/images/esther.jpg`, then set `photo.src` in `content/about.ts` to `"/images/esther.jpg"`.
- **Project covers:** save images in `public/images/` and add `cover: { src: "/images/slate.png", alt: "Slate's weekly planner view" }` to a project.

### Swap in your own avatar

The waving character is a placeholder. Open `components/avatar/AvatarArt.tsx`; the comment at the top explains how to paste in your own SVG while keeping the eye-tracking, blinking, and waving.

### Changing the board layout

Drag things where you like them, then copy the positions into `content/board.ts`. Positions are fractions of the board: `x: 0.5` means halfway across. If you change the defaults after launch, bump `BOARD_VERSION` so returning visitors see the new layout instead of their saved one.

---

## Connect the contact form (Formspree, free)

1. Sign up at https://formspree.io and click **New form**. Name it "Portfolio" and set the email to the inbox you want messages sent to.
2. Copy the form ID. It's the last part of the endpoint, e.g. `https://formspree.io/f/`**`abcdwxyz`**.
3. For local testing, create a file called `.env.local` in this folder:
   ```
   NEXT_PUBLIC_FORMSPREE_ID=abcdwxyz
   ```
   Restart `npm run dev`, send yourself a test message, and confirm it in the Formspree email.
4. Add the same variable in Vercel (step 4 below).

The free plan covers 50 messages a month. A hidden "honeypot" field filters most spam bots.

---

## Deploy to Vercel

1. **Put the code on GitHub.** Create an empty repository at https://github.com/new (e.g. `portfolio`), then in this folder run:
   ```bash
   git remote add origin https://github.com/estnewton/portfolio.git
   git push -u origin main
   ```
2. **Import it into Vercel.** Sign in at https://vercel.com with GitHub, click **Add New → Project**, and pick the repository. Vercel detects Next.js automatically; leave the build settings as they are.
3. Click **Deploy**. In about a minute you get a live address like `portfolio-estnewton.vercel.app`.
4. **Add environment variables** under Project → Settings → Environment Variables:
   - `NEXT_PUBLIC_FORMSPREE_ID`: your Formspree form ID
   - `NEXT_PUBLIC_SITE_URL`: your custom domain once it's connected, e.g. `https://esthernewton.com` (skip this until step 5 is done; until then the Vercel address is used automatically)

   Then go to **Deployments**, open the latest one, and choose **Redeploy** so the variables take effect.

From now on, every `git push` to `main` redeploys the site automatically.

## Connect a custom domain

1. Buy a domain (Vercel → **Domains → Buy**, or Namecheap, Cloudflare, Porkbun, etc.). Expect roughly $10–15/year for a `.com`.
2. In your Vercel project, go to **Settings → Domains**, type your domain (e.g. `esthernewton.com`) and click **Add**. Accept the suggestion to also add `www.esthernewton.com` and redirect one to the other.
3. If you bought the domain on Vercel, you're done. Otherwise, log in to your registrar's DNS settings and add the records Vercel shows you. They usually look like:

   | Type | Name | Value |
   | --- | --- | --- |
   | A | `@` | the IP address Vercel shows (often `76.76.21.21`) |
   | CNAME | `www` | the value Vercel shows (often `cname.vercel-dns.com`) |

   Always copy the exact values from the Vercel dashboard; they can differ per project.
4. Wait for the check marks to turn green in Vercel (usually minutes, occasionally a few hours). HTTPS is set up automatically.
5. Set `NEXT_PUBLIC_SITE_URL` to `https://your-domain.com` in Vercel and redeploy, so link previews and the sitemap use your domain.

### Check your link preview

After deploying, paste your URL into https://www.linkedin.com/post-inspector/ to see the preview card (title, description, and the cork-board image). It's generated by `app/opengraph-image.tsx`.

---

## Project structure

```
app/
  (board)/              homepage board + slide-over panels (@modal)
  projects/[slug]/      case-study pages
  experience/ highlights/ about/ contact/ projects/   full section pages
  opengraph-image.tsx   link-preview image
  sitemap.ts, robots.ts, icon.svg
components/
  board/     draggable board, items, tidy/shuffle toolbar
  cards/     cards and stickers on the board
  avatar/    animated avatar (swap the art in AvatarArt.tsx)
  sections/  section page content (cutting-mat style)
  decor/     tape, pushpins, binder clip, disco ball
content/     ← your text lives here
```

### Accessibility

- Keyboard: Tab to a board card, use the arrow keys to move it (Shift for bigger steps), press T to tidy up. Panels close with Escape.
- Respects "reduce motion" system settings.
- Without JavaScript the homepage falls back to the stacked layout.
