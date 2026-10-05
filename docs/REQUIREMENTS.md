# ApplyOff — Website Requirements

> An all-in-one hub for students applying to master's programs abroad:
> plan, prepare, track and submit applications, and connect with others doing the same.

---

## 1. Vision & positioning

- **Self-serve and neutral.** Tools students use themselves, not a funnel into paid counselling. No commission-driven university recommendations.
- **One profile drives everything.** Enter your background once; the shortlist, roadmap, documents and tracker all use it.
- **Community organised by program + intake** (e.g. "Fall 2027 · TU Munich · MSc Informatics").

## 2. Target users

| Persona | Needs |
|---|---|
| **Applicant** (main user) | Organise applications, write SOP/CV, chase LORs, know what to do next, talk to peers |
| **Recommender** (professor/manager) | A simple link to upload a letter, with no account required |
| **Admitted student / alumnus** | Share results and advice, answer questions |
| **Admin** (you) | Manage program data, moderate the community, publish guides |

---

## 3. Modules and requirements

Priority: **P0** = MVP (must have to launch), **P1** = soon after launch, **P2** = later.

### M1. Accounts & profile — P0
- Sign up / log in with email + Google.
- Profile: name, country, current location.
- **Academic record** (one per degree; usually the bachelor's, optionally a previous master's/diploma):
  - University, degree, major, country.
  - **Status:** *In progress* or *Completed*.
  - **Duration:** total semesters (or years) and semesters completed so far.
  - **Grading system:** 10-point CGPA, 4.0 GPA, percentage, German 1.0–5.0, UK classification, or other with a custom min/max. Grades are always stored with their scale, never as a bare number.
  - **Current CGPA:** the grade "up to semester N", which is what most applications ask for when a degree isn't finished.
  - **Per-semester grades** (optional): SGPA/percentage per semester; a semester can be marked *result pending*. If entered, the current CGPA can be calculated from them, and the trend (improving/declining) is shown.
  - **Expected final CGPA** (optional, labelled as an estimate) and **expected graduation date**.
  - **Backlogs / failed courses:** total and currently active (many universities ask).
  - **Grade conversions** shown for reference only, clearly labelled as approximate (e.g. German modified Bavarian formula, a rough 4.0 equivalent); the original grade is what applications use.
- Applications and requirement checks use the latest *declared* grade, flagging "degree in progress" where a program needs a final transcript.
- A reminder after each semester's results to update the record.
- Test scores: GRE, GMAT, IELTS, TOEFL, Duolingo (score + date).
- Experience: work, research, projects, publications.
- Preferences: target countries, fields, intake (e.g. Fall 2027), budget.
- Users can edit or delete their account and data.

### M2. Program database — P0 (basic) / P1 (rich)
- Searchable list of universities and programs: name, country, degree, field, intake(s).
- Per program: deadlines, application fee, tuition, required tests + minimum scores, required documents (SOP, CV, # of LORs, transcripts, portfolio), application portal link.
- Filters: country, field, tuition range, test requirements, deadline.
- Data source: admin-entered first; later user-submitted corrections (P1) that an admin approves.
- Every program shows a "last verified" date.

### M3. Application tracker — P0 ⭐ (build first)
- Add a program to "My applications" (from the database or as a custom entry).
- Status pipeline: *Researching → Preparing → Submitted → Interview → Admitted / Rejected / Waitlisted → Accepted / Declined*.
- Per application: deadline, fee paid, portal login link, notes, priority (dream / target / safe).
- Auto-generated document checklist based on the program's requirements.
- Views: table, kanban board (drag between statuses), calendar of deadlines.
- Dashboard: count by status, next 3 deadlines, overdue items.
- Email reminders before deadlines (P1).

### M4. Document hub — P0 (upload/store) / P1 (editors)
- Upload and store SOPs, CVs, transcripts, test reports, LORs (PDF/DOCX, size limit).
- Version history per document ("SOP v3").
- Link documents to one or more applications; checklist ticks itself when linked.
- Files are private to the owner by default.

### M5. SOP builder — P1
- Guided questionnaire (why this field, why this program, career goals, key experiences).
- Rich-text editor with word count and program-specific word limits.
- Tailored versions per program, all derived from a base SOP.
- AI assist (P1): generate an outline, give feedback on clarity/structure, flag generic phrases. **The AI suggests; the user writes.** Show a clear disclaimer about honesty and plagiarism policies.

### M6. CV / resume builder — P1
- Academic CV template(s) built from profile data (education, research, publications, projects, skills).
- Live preview and PDF export.
- AI bullet-point improvement (P1).

### M7. LOR manager — P1
- Add recommenders (name, email, relation, which applications).
- Send a request email with a unique secure link; recommender can upload a letter without signing up.
- Status per recommender per application: *Not asked → Asked → Agreed → Submitted*.
- Automatic polite reminders; the applicant can't read the letter unless the recommender allows it.

### M8. Roadmap & prep — P1
- Generate a personalised timeline from intake + target countries + profile (e.g. "T-12 months: shortlist; T-9: take GRE; T-6: request LORs").
- Roadmap items become checkable tasks with dates.
- Prep library: guides per country (visa, costs, timelines), per test (GRE/IELTS resources), sample SOPs (with permission), FAQ.
- Guides are public pages (good for SEO / bringing in users).

### M9. Community — P2
- Public profile (opt-in, anonymity allowed): background, targets, results.
- Results feed: "Admitted to X with GPA Y, GRE Z" (like GradCafe), searchable per program.
- Discussion groups per program/intake and per country; posts, comments, upvotes.
- Direct messages (P2+).
- Moderation: report button, admin review queue, basic spam/profanity filtering.

### M10. Admin panel — P0 (minimal)
- CRUD for universities/programs and guides.
- Approve user-submitted program corrections (P1) and handle reports (P2).
- Basic stats: users, applications created.

### M11. Notifications — P1
- In-app notification bell + email for deadlines, LOR updates, replies.
- User-controlled notification settings.

---

## 4. Non-functional requirements

- **Privacy & security:** documents and LORs are sensitive. Per-user access control (database row-level security), private file storage with signed URLs, HTTPS, no sharing data with third parties. Clear privacy policy; GDPR-style "export / delete my data".
- **Responsive:** works well on mobile (many students will use their phones).
- **Performance:** pages load in under ~2s on average connections.
- **Accessibility:** keyboard navigation, readable contrast, labelled forms.
- **Cost:** stay on free tiers until there are real users; rate-limit AI features.
- **Reliability:** daily database backups (provided by the host).

## 5. Out of scope (for now)

- Submitting applications directly to universities (they each have their own portals).
- Paid counselling / human reviewers.
- Loans, visa filing, accommodation booking.
- Native mobile apps (the web app is responsive instead).

---

## 6. Core data model (first draft)

```
users            id, email, name, created_at
profiles         user_id, country, intake, target_countries, ...
academic_records id, user_id, university, degree, major, status(in_progress|completed),
                 total_semesters, semesters_completed, grading_system, scale_min, scale_max,
                 current_grade, expected_final_grade, expected_grad_date, backlogs_total, backlogs_active
semester_results id, academic_record_id, semester_no, grade (null = result pending)
test_scores      id, user_id, test, score, date
universities     id, name, country, city, website
programs         id, university_id, name, degree, field, tuition, fee, requirements(json), portal_url, last_verified
deadlines        id, program_id, intake, round, date
applications     id, user_id, program_id (nullable for custom), status, priority, deadline, notes
documents        id, user_id, type, title, current_version_id
document_versions id, document_id, file_path, created_at
application_documents  application_id, document_id
recommenders     id, user_id, name, email, relation
lor_requests     id, recommender_id, application_id, status, token, letter_path
roadmap_tasks    id, user_id, title, due_date, done
posts / comments / results   (community, later)
```

---

## 7. Build phases (each one is a learning milestone)

| Phase | What you build | What you learn |
|---|---|---|
| **0. Foundations** (2–4 wks) | Static landing page | HTML, CSS, JavaScript, Git/GitHub |
| **1. Setup** | Next.js + Tailwind project, deployed to Vercel | React components, routing, deployment |
| **2. Auth & profile** (M1) | Sign up, log in, profile form | Supabase auth, forms, database basics, sessions |
| **3. Tracker** (M3) ⭐ | Add/edit/delete applications, table + kanban, dashboard | CRUD, relational data, state, server actions/API routes |
| **4. Program database** (M2, M10) | Program search + filters, simple admin page | Queries, filtering, pagination, roles/permissions |
| **5. Documents** (M4) | Uploads, versions, link to applications | File storage, security rules, signed URLs |
| **→ Launch MVP** | Get 10–20 real applicants using it | Feedback, analytics, bug fixing |
| **6. LOR manager** (M7) | Recommender links + emails | Transactional email, secure tokens, background jobs |
| **7. SOP/CV + AI** (M5, M6) | Editors, PDF export, AI feedback | Rich-text editors, LLM APIs, prompt design, rate limiting |
| **8. Roadmap & guides** (M8) | Generated timeline, public guide pages | Date logic, content/SEO, static generation |
| **9. Community** (M9) | Results feed, groups, moderation | Realtime, moderation, scaling |

**MVP = phases 1–5.** Everything after that ships one module at a time.

## 8. Open questions

- Which countries first? (Suggest: start with 1–2, e.g. Germany + US, and do their data well.)
- Who maintains program data, and how often is it re-verified?
- Monetisation: free core + paid AI credits? University partnerships (with neutrality kept)?
- Anonymity rules for the community and results feed.
