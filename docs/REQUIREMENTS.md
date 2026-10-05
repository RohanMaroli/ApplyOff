# ApplyOff — Website Requirements

> An all-in-one hub for students applying to master's programs abroad:
> plan, prepare, track and submit applications, and connect with others doing the same.

---

## 1. Vision & positioning

- **Self-serve and neutral.** Tools students use themselves, not a funnel into paid counselling. No commission-driven university recommendations.
- **Start from zero.** Built for people who don't know where to begin: the site guides them from "I want to study abroad" through tests, documents and applications to an admit.
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

### M1. Accounts & login — P0
- **"Continue with Google" (Google OAuth) is the main sign-in option**, shown first.
  - One click for both sign-up and log-in; no password to remember.
  - We request only basic scopes (`openid`, `email`, `profile`): name, email, profile photo. No access to the user's Gmail or Drive.
  - Name and photo pre-fill the profile (M2); the user can change them.
  - Implemented through the auth provider (Supabase Auth), not by hand. Needs a Google Cloud project, OAuth consent screen and client ID/secret; redirect URLs set for local dev and production.
- **Email fallback** for people without/not wanting Google: email + password, with email verification and "forgot password" reset (or a magic link).
- **Account linking:** if someone signs up with email and later uses Google with the same verified email, it is the same account, not a duplicate.
- Error handling: user cancels the Google popup, Google account email not verified, provider outage.
- Stay logged in across visits; log out (including from all devices).
- Short onboarding after first sign-up that sends the user to set up their profile (M2) and roadmap (M10).
- Account settings: change email/password, notification preferences (M13).
- Export my data / delete my account and all data.
- Roles: *applicant* (default), *admin*. Recommenders never need an account (M9).

### M2. Profile — P0
- Basic info: name, country, current location.
- Preferences: target countries, fields, intake (e.g. Fall 2027), budget.
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
- **Experience**, as separate types because universities weigh them differently:
  - **Full-time work:** company, role, dates, description. Total months is calculated (some programs, e.g. MBA/management, require a minimum).
  - **Internships:** company, role, dates, description; counted separately from full-time work.
  - **Research:** lab/professor, topic, dates, outcome; important for research-based programs and German universities. A good source for SOPs and LORs.
  - **Projects:** academic/personal, tech used, link (GitHub/portfolio).
  - **Publications:** title, venue, authors, status (*Under review / Accepted / Published*), link.
  - **Certifications & courses:** e.g. Coursera, AWS.
  - **Extracurriculars & volunteering:** leadership, clubs, competitions, awards.
  - Each item can be marked *ongoing*, and can be tagged as a possible LOR source (its supervisor/manager).
  - This data later fills the CV builder (M8) and suggests SOP material (M7).

### M3. Tests — tracking P0 / prep P1
**Tracking** (GRE, GMAT, IELTS, TOEFL, PTE, Duolingo, language tests like TestDaF/Goethe):
- Which tests are needed is worked out from the user's target programs (M4), so beginners don't have to know.
- Status per test: *Not needed → Needed → Preparing → Booked (date) → Taken → Score received*.
- Target score (suggested from target programs' requirements) and test date.
- **Score fields stay blank until results arrive**; the user enters them then. Section scores too (e.g. GRE Verbal/Quant/AWA, IELTS L/R/W/S).
- Score expiry date shown (e.g. GRE 5 years, IELTS/TOEFL 2 years) with a warning if it expires before the intake.

**Prep:**
- Hub per test (IELTS, GRE first; TOEFL, GMAT, Duolingo, PTE later): format explained, scoring, what score is "good" for the user's targets.
- Study plan generated from test date + target score + available hours per week; shows on the roadmap.
- Curated free resources per section (official materials first), plus practice question sets.
- Diagnostic test to find a starting level (P2); practice tests with score tracking over time (P2).
- AI help (P2): IELTS writing/essay feedback, GRE AWA feedback, speaking practice prompts.
- Booking guidance: where/how to book, fees, how early to book, sending scores to universities.

### M4. Program database — P0 (basic) / P1 (rich)
The data behind tests (M3), the tracker's checklists (M5) and the roadmap (M10). **Accuracy matters more than size.**

**Structure:** University → Program → Intake → Deadlines.
A *program* is one specific degree at one university (e.g. "MSc Informatics at TU Munich", "MS in Computer Science at Georgia Tech"). It is the thing a student actually applies to; each has its own requirements, deadlines and fees, so one university has many programs.

**University page**
- Name, country, city, website, type (public/private), rankings shown with their source (e.g. QS 2026), campus photo/logo.
- Country-level info inherited from a country page: cost of living, visa, post-study work rights, language.

**Program page**
- Name, degree (MSc/MS/MA/MEng/MBA…), field + specialisations, duration, language of instruction, mode (full-time/part-time), course structure link.
- **Intakes:** Winter/Fall, Summer/Spring; each with **deadlines** (several rounds where relevant, e.g. US priority/final, UK rolling, Germany EU vs non-EU dates) and the time zone.
- **Costs:** tuition per year/semester with currency (and converted to the user's currency as an estimate), semester contribution (Germany), application fee, fee waivers.
- **Requirements:**
  - Minimum grade (stored with its scale), required background/prerequisites (e.g. "bachelor's in CS or related", ECTS credits in maths/programming for German programs).
  - Tests: which are required/optional/waived, minimum overall and section scores, accepted alternatives (e.g. IELTS 6.5 *or* TOEFL 90 *or* Duolingo 120), GRE optional/required.
  - Documents: SOP (word limit, prompt), CV format, number and type of LORs (academic/professional), transcripts, degree certificate, portfolio, writing sample, essays.
  - Country/process extras: e.g. APS certificate (Indian/Chinese/Vietnamese applicants to Germany), uni-assist/VPD, financial proof/blocked account, interviews.
- **How to apply:** portal type (university portal, uni-assist, other) with link, step-by-step notes.
- **Sources & freshness:** source URL for each piece of data, "last verified" date, and a "Report incorrect info" button. Stale data (not verified this cycle) is clearly flagged.

**Search & discovery**
- Search by name; filters: country, city, field, degree, intake, tuition range, language, GRE required or not, deadline range, application fee.
- Sort by deadline, tuition, name, ranking.
- **Eligibility hint** from the user's profile (M2/M3): "Meets requirements / Missing IELTS score / Grade below listed minimum." Always labelled as a hint, not an admission prediction.
- **Shortlist:** save programs; one click to move a saved program into the tracker (M5).
- **Compare** 2–4 programs side by side (P1).
- Admit/reject stats from the community (M11) shown on the program page (P2).

**Data sourcing**
- P0: admin-entered from official university pages, for 1–2 countries and a limited set of fields (e.g. CS/Data Science/Engineering), ~50–100 programs done properly.
- P1: users can suggest corrections or new programs; an admin approves them (M12). Bulk import from CSV for the admin.
- P2: scheduled checks that flag when a source page has changed; possibly scraping where allowed by the site's terms.
- Annual "new cycle" workflow: copy last year's deadlines as *unconfirmed* until verified.

### M5. Application tracker — P0 ⭐
The user's home base: every application, what's left to do, and what's due next.

**Adding applications**
- From a program page or the shortlist (M4) in one click; requirements, deadlines and fees are copied in automatically.
- **Custom application** for programs not in the database: the user types name, university, deadline and requirements themselves.
- Choose the intake and deadline round (e.g. US priority vs final, Germany non-EU date).
- Priority tag: *Dream / Target / Safe*.

**Status pipeline** (same core for every country, with country-specific steps where needed)
- *Shortlisted → Preparing → Submitted → Under review → Interview (optional) → Decision → Final choice*
- Germany via uni-assist adds: *Submitted to uni-assist → Forwarded to university*.
- Decisions: *Admitted / Conditionally admitted / Waitlisted / Rejected*.
- Final choice: *Accepted / Declined / Deferred*.
- Each status change is timestamped (history), which later feeds community stats (M11, opt-in).

**Per-application checklist** (generated from the program's requirements, M4)
- Items like: SOP (word limit), CV, 2 LORs, transcripts, IELTS score sent, GRE score sent, APS certificate, application fee paid, uni-assist fee paid.
- Items tick themselves when linked data exists: a document uploaded and linked (M6), a test score received (M3), a LOR submitted (M9). The user can also tick manually.
- Users can add their own items.
- **Readiness %** per application, plus "blocking" items highlighted (e.g. IELTS not taken yet but deadline in 30 days).

**Deadlines**
- Countdown ("12 days left"), shown in the user's time zone with the university's time zone on hover.
- Warnings: deadline in 14 / 7 / 2 days, overdue, test score not received in time.
- Email reminders (P1, via M13).

**Fees & money**
- Application fee per application, paid / not paid; total spent and total still to pay.
- Fee waiver flag.

**Decisions & offers**
- Record decision date, scholarship/funding/assistantship offered (amount + currency), deposit amount and deadline, deadline to accept the offer, conditions (e.g. "submit final transcript").
- **Compare offers** side by side: tuition, funding, net cost, ranking, location (P1).

**Views**
- **Table:** sortable/filterable list (default on mobile).
- **Kanban board:** columns per status, drag to move.
- **Calendar:** all deadlines, test dates and interviews (P1); export to Google Calendar via .ics (P1).

**Dashboard (home page after login)**
- Counts by status, next 3 deadlines, overdue checklist items, readiness of each application, total fees.
- "What to do next" suggestions linked to the roadmap (M10).

**Other**
- Notes per application; portal link and portal username.
- **Never store portal passwords** (security risk); suggest a password manager instead.
- Archive / delete an application.

### M6. Document hub — P0 (upload/store) / P1 (editors)
- Upload and store SOPs, CVs, transcripts, test reports, LORs (PDF/DOCX, size limit).
- Version history per document ("SOP v3").
- Link documents to one or more applications; checklist ticks itself when linked.
- Files are private to the owner by default.

### M7. SOP builder — P1
- Guided questionnaire (why this field, why this program, career goals, key experiences).
- Rich-text editor with word count and program-specific word limits.
- Tailored versions per program, all derived from a base SOP.
- AI assist (P1): generate an outline, give feedback on clarity/structure, flag generic phrases. **The AI suggests; the user writes.** Show a clear disclaimer about honesty and plagiarism policies.

### M8. CV / resume builder — P1
- Academic CV template(s) built from profile data (education, research, publications, projects, skills).
- Live preview and PDF export.
- AI bullet-point improvement (P1).

### M9. LOR manager — P1
- Add recommenders (name, email, relation, which applications).
- Send a request email with a unique secure link; recommender can upload a letter without signing up.
- Status per recommender per application: *Not asked → Asked → Agreed → Submitted*.
- Automatic polite reminders; the applicant can't read the letter unless the recommender allows it.

### M10. Roadmap & guides — P1
- Generate a personalised timeline from intake + target countries + profile (e.g. "T-12 months: shortlist; T-9: take GRE; T-6: request LORs").
- Onboarding for beginners: a short questionnaire (field, countries, intake, budget, where you are now) gives a starting roadmap, so a user with nothing figured out knows their first step.
- Roadmap items become checkable tasks with dates, including test prep milestones from M3.
- Prep library: guides per country (visa, costs, timelines), per test (GRE/IELTS resources), sample SOPs (with permission), FAQ.
- Guides are public pages (good for SEO / bringing in users).

### M11. Community — P2
- Public profile (opt-in, anonymity allowed): background, targets, results.
- Results feed: "Admitted to X with GPA Y, GRE Z" (like GradCafe), searchable per program.
- Discussion groups per program/intake and per country; posts, comments, upvotes.
- Direct messages (P2+).
- Moderation: report button, admin review queue, basic spam/profanity filtering.

### M12. Admin panel — P0 (minimal)
- CRUD for universities/programs and guides.
- Approve user-submitted program corrections (P1) and handle reports (P2).
- Basic stats: users, applications created.

### M13. Notifications — P1
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
tests            id, user_id, test, status, target_score, test_date, score (null until received),
                 section_scores(json), expiry_date
experiences      id, user_id, type(work|internship|research|project|publication|certification|extracurricular),
                 title, organisation, start_date, end_date (null = ongoing), description, link, details(json)
countries        code, name, currency, info(json: visa, living costs, work rights)
universities     id, name, country_code, city, website, type, rankings(json)
programs         id, university_id, name, degree, field, language, duration_months, tuition, tuition_currency,
                 application_fee, portal_type, portal_url, sources(json), last_verified
program_requirements  program_id, min_grade, grade_scale, background(text), documents(json), extras(json)
program_tests    program_id, test, required(required|optional|not_needed), min_overall, min_sections(json)
intakes          id, program_id, term (winter|summer|fall|spring), year
deadlines        id, intake_id, round, applicant_group (all|eu|non_eu), date, timezone, confirmed
shortlists       user_id, program_id, created_at
corrections      id, program_id, user_id, field, suggested_value, status (pending|approved|rejected)
applications     id, user_id, program_id (null = custom), intake_id, deadline_id, custom_name, custom_university,
                 deadline (copied, editable), status, priority, fee, fee_paid, fee_waiver, portal_url,
                 portal_username, notes, archived
application_status_history  id, application_id, status, changed_at
checklist_items  id, application_id, title, type (document|test|lor|fee|custom), linked_id, done, due_date
decisions        application_id, result, decided_at, funding_amount, funding_currency, deposit_amount,
                 deposit_deadline, accept_by, conditions
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
| **2. Login** (M1) | Google sign-in first, then email fallback, protected pages | How OAuth works, sessions, cookies, route protection |
| **3. Profile** (M2) | Profile, academics, experience forms | Forms + validation, database tables & relations, editing/deleting data |
| **4. Tracker** (M5) ⭐ | Add/edit/delete applications, table + kanban, dashboard | CRUD, relational data, state, server actions/API routes |
| **5. Program database** (M4, M12) | Program search + filters, simple admin page | Queries, filtering, pagination, roles/permissions |
| **6. Documents + test tracking** (M6, M3 tracking) | Uploads, versions, link to applications; test status & scores | File storage, security rules, signed URLs |
| **→ Launch MVP** | Get 10–20 real applicants using it | Feedback, analytics, bug fixing |
| **7. LOR manager** (M9) | Recommender links + emails | Transactional email, secure tokens, background jobs |
| **8. SOP/CV + AI** (M7, M8) | Editors, PDF export, AI feedback | Rich-text editors, LLM APIs, prompt design, rate limiting |
| **9. Roadmap, guides & test prep** (M10, M3 prep) | Generated timeline, test hubs + study plans, public guide pages | Date logic, content/SEO, static generation |
| **10. Community** (M11) | Results feed, groups, moderation | Realtime, moderation, scaling |

**MVP = phases 1–6.** Everything after that ships one module at a time.

## 8. Decisions made

- **Launch countries: Germany and the USA.** (Very different systems, which tests that the data model is flexible.)
- **Rankings:** shown, always with their source and year.
- **Program data:** admin-only for the MVP; user suggestions come in P1.
- **Sign-in:** Google OAuth first, email as fallback.

## 9. Open questions

- Fields to cover first (e.g. CS / Data Science / Engineering)?
- Who maintains program data long-term, and how often is it re-verified?
- Monetisation: free core + paid AI credits? University partnerships (with neutrality kept)?
- Anonymity rules for the community and results feed.
