# ApplyOff — Build Guide

How we build ApplyOff so that **you write the code and understand it**.

## How we work together

For every feature:

1. **Concept** — Claude explains the idea (e.g. "what is a React component?") with a tiny example.
2. **Task** — you get a small, specific task with a clear "done when…" check.
3. **You code it** — try first, even if it's messy. Use the docs links. Stuck for 20+ minutes? Ask for a *hint*, not the answer.
4. **Review** — push your code (or paste it) and ask for a review. Claude points out bugs and better patterns and explains *why*.
5. **Commit** — small commits with clear messages ("Add landing page hero section").

Rules of thumb:
- Never paste code you can't explain line by line. If Claude writes something, ask "why?" until you could rewrite it.
- Read error messages slowly — they usually say exactly what's wrong and where.
- One feature at a time. Get it working, then make it pretty.

---

## Phase 0 — Setup your machine (do once)

1. Install **Node.js LTS** (v22+): https://nodejs.org — check with `node -v`.
2. Install **Git** (https://git-scm.com) and **VS Code** (https://code.visualstudio.com).
   - VS Code extensions: *ESLint*, *Tailwind CSS IntelliSense*, *Prettier*.
3. Clone the repo and run it:
   ```bash
   git clone https://github.com/RohanMaroli/ApplyOff.git
   cd ApplyOff
   git checkout claude/masters-app-hub-platform-6ciob7
   npm install
   npm run dev
   ```
4. Open http://localhost:3000 — you should see the default Next.js page.

**Done when:** the site runs on your laptop.

---

## Phase 0.5 — JavaScript for Python programmers (~1–2 weeks)

You already know how to program. You just need JavaScript's syntax and a few new ideas.
Do these exercises in a `learn/` folder (it's gitignored, so it's your scratch space) and run them with `node learn/01-basics.js`.

### Python → JavaScript cheat sheet

| Python | JavaScript |
|---|---|
| `name = "Rohan"` | `const name = "Rohan";` (can't reassign) / `let count = 0;` (can reassign) |
| `print(x)` | `console.log(x);` |
| `f"Hi {name}"` | `` `Hi ${name}` `` (backticks) |
| `True / False / None` | `true / false / null` (and `undefined`) |
| `and / or / not` | `&& / \|\| / !` |
| `==` | `===` (always use triple equals) |
| `if x > 5:` + indent | `if (x > 5) { ... }` |
| `elif` | `else if` |
| `for item in items:` | `for (const item of items) { ... }` |
| `def add(a, b): return a + b` | `function add(a, b) { return a + b; }` or `const add = (a, b) => a + b;` |
| list `[1, 2, 3]` | array `[1, 2, 3]` |
| `len(items)` | `items.length` |
| `items.append(4)` | `items.push(4)` |
| `[x * 2 for x in items]` | `items.map(x => x * 2)` |
| `[x for x in items if x > 1]` | `items.filter(x => x > 1)` |
| dict `{"name": "TUM"}` | object `{ name: "TUM" }` |
| `uni["name"]` | `uni.name` (or `uni["name"]`) |
| `name, city = ("TUM", "Munich")` | `const [name, city] = ["TUM", "Munich"];` |
| — | `const { name, city } = uni;` (pull fields out of an object) |
| `import x from y` | `import x from "y";` |
| `try / except` | `try { } catch (err) { }` |

### The new ideas (these matter most for React)
1. **Arrow functions:** `const double = (x) => x * 2;`
2. **`map` and `filter`:** React renders lists with `.map()` all the time.
3. **Destructuring and spread:** `const { title } = props;`, `const copy = { ...uni, city: "Berlin" };`
4. **Async/await:** like Python's `async`; used for fetching data: `const res = await fetch(url);`
5. **TypeScript:** JavaScript plus types, like Python type hints, but checked: `function add(a: number, b: number): number`.

### Exercises
**E1 – basics** (`learn/01-basics.js`): make an array of 5 universities as objects `{ name, country, tuition, deadline }`. Print each one as `"TUM (Germany) – €0"` using a `for...of` loop and a template string.

**E2 – map/filter** (`learn/02-arrays.js`): using the same array:
- get a list of only the German universities (`filter`)
- get a list of just the names (`map`)
- get the total tuition of all of them (`reduce`, or a loop)
- sort them by deadline

**E3 – functions & destructuring** (`learn/03-functions.js`): write `formatUni({ name, country })` that returns a string, using destructuring in the parameters. Write `daysUntil(dateString)` that returns how many days are left until a deadline (use `new Date()`).

**E4 – TypeScript** (`learn/04-types.ts`, run with `npx tsx learn/04-types.ts`): rewrite E1–E3 with a `type University = { ... }` and typed functions. Introduce a mistake (e.g. pass a number as `name`) and read the error.

**E5 – HTML/CSS refresh:** make `learn/index.html` with a heading, a list of universities and a card style in CSS. Open it in the browser. Then do the same with Tailwind classes inside the Next.js project in Phase 1.

Resources: https://javascript.info (Part 1, chapters 1–6 are enough for now) · https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html

**Done when:** you can do E2 without looking at the cheat sheet.

---

## The project structure (what each file is)

```
ApplyOff/
├── docs/                  ← planning docs (requirements, this guide)
├── public/                ← static files served as-is (images, icons)
├── src/
│   └── app/               ← every folder here = a page/URL (the "App Router")
│       ├── layout.tsx     ← wraps EVERY page (html/body, fonts, later: navbar)
│       ├── page.tsx       ← the home page, URL "/"
│       ├── globals.css    ← global styles + Tailwind import
│       └── favicon.ico
├── package.json           ← project info, scripts (dev/build/lint), dependencies
├── package-lock.json      ← exact installed versions (don't edit by hand)
├── tsconfig.json          ← TypeScript settings
├── next.config.ts         ← Next.js settings
├── eslint.config.mjs      ← code-quality rules
├── postcss.config.mjs     ← makes Tailwind work
└── .gitignore             ← files Git ignores (node_modules, .env secrets, build output)
```

Key idea — **file-based routing**: create `src/app/about/page.tsx` and the URL `/about` exists. No router config needed.

---

## Phase 1 — Landing page (learn React + Tailwind basics)

### Concepts to learn first
- HTML & CSS basics — https://developer.mozilla.org/en-US/docs/Learn
- JavaScript basics (variables, functions, arrays, objects, `map`) — https://javascript.info (Part 1)
- React: components, JSX, props — https://react.dev/learn (first 4 pages)
- Tailwind: utility classes — https://tailwindcss.com/docs/styling-with-utility-classes
- Next.js App Router basics — https://nextjs.org/learn

### Tasks

**1.1 Replace the default page.** Edit `src/app/page.tsx`: delete the Next.js demo content and show "ApplyOff" as a heading with a one-line tagline.
*Done when:* the home page shows your heading.

**1.2 Fix the page title.** In `src/app/layout.tsx`, change `metadata` so the browser tab says "ApplyOff — Apply to master's abroad".
*Done when:* the tab title changes.

**1.3 Build the landing page sections** in `page.tsx`:
- Hero: headline, tagline, a "Get started" button (it doesn't need to work yet).
- "How it works": 3–4 steps (Build your profile → Shortlist programs → Track applications → Get admitted).
- Features: cards for Tracker, Documents, Test prep, Community.
- Footer.
*Done when:* it looks decent on desktop **and** phone width (use your browser's device toolbar).

**1.4 Make components.** Create `src/components/FeatureCard.tsx` that takes `title`, `description` (and optionally an icon) as **props**. Render your feature cards from an **array** using `.map()`.
*Done when:* adding a feature means adding one object to the array, not copying HTML.

**1.5 Add a second page.** Create `/about` (`src/app/about/page.tsx`) and a simple navbar in `layout.tsx` with links (use Next's `<Link>`).
*Done when:* you can click between Home and About without a full page reload.

**1.6 Deploy.** Sign up at https://vercel.com with GitHub, import the repo, deploy.
*Done when:* your site has a public URL you can send to a friend.

### Check yourself (can you answer these?)
- What's the difference between `layout.tsx` and `page.tsx`?
- What is a prop? Why use `.map()` instead of copy-pasting cards?
- Why do we use `<Link>` instead of `<a>` for internal links?
- What does `npm run dev` do vs `npm run build`?

---

## Coming next

| Phase | Module | Main concepts |
|---|---|---|
| 2 | Login (M1) | Supabase project, Google OAuth setup, sessions, protected pages |
| 3 | Profile (M2) | Forms, validation, database tables, server actions |
| 4 | Tracker (M5) | CRUD, relations, dashboard |
| 5 | Programs (M4) + Admin (M12) | Queries, filters, roles |
| 6 | Documents (M6) + Test tracking (M3) | File storage, signed URLs, security rules |

Each phase gets its own section here when we start it.
