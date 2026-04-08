# Implementation Plan: AI-Native Agency Platform (MVP)

This implementation plan outlines the steps to build the Minimum Viable Product (MVP) for the AI-Native Agency Platform, focusing specifically on the **Ad Creative Vertical** as recommended in the architecture document.

The goal of this MVP is to prove the core thesis: successfully executing client briefs automatically via AI pipelines with a "human-in-the-loop" approval process, before delivering the final assets via a client-facing portal.

---

## Phase 1: Foundation & Monorepo Setup (Days 1-3)
**Goal:** Establish the development environment, project structure, and database schema.

1. **Initialize Turborepo Workspace:**
   - Create monorepo structure with Next.js (client portal) and Python (services) boundaries.
   - Set up ESLint, Prettier, and shared TS configs.
2. **Database Setup (PostgreSQL):**
   - Provision local PostgreSQL instance (Docker) or remote (Supabase/Neon).
   - Set up Drizzle ORM or Prisma for schema management.
   - Define core schemas: `User`, `Organization`, `Project`, `Brief`, `Task`, `Deliverable`.
3. **Authentication:**
   - Integrate NextAuth.js or Clerk into the Next.js app for Client and Operator roles.
   - Secure API routes.
4. **Queue & Background Worker Setup:**
   - Set up Redis.
   - Implement BullMQ for async job processing between Node.js and Python workers.

---

## Phase 2: Python Orchestration Core (Days 4-7)
**Goal:** Build the brain of the agency using LangGraph to route tasks and manage states.

1. **Agent Server Setup:**
   - Initialize FastAPI server in Python.
   - Set up LangChain/LangGraph environment.
2. **Implement Project Manager Agent:**
   - Write prompts to parse JSON briefs (from the frontend) into a structured array of generic tasks.
   - Build a LangGraph state machine to track the status of a `Project` (Brief Received -> Requirements Generated -> Production -> QA -> Final Review).
3. **Model Router Abstraction:**
   - Create wrapper functions to call OpenAI (GPT-4o) and Anthropic (Claude 3.5 Sonnet) APIs.
   - Implement basic retry logic and fallback mechanisms.

---

## Phase 3: The Ad Creative Pipeline (Days 8-12)
**Goal:** Implement the specific AI generation tasks for Ad Creation.

1. **Copywriting Node:**
   - Create an LLM chain that takes target audience and tone, outputting 3-5 variants of ad copy (Headline, Primary Text, Call To Action).
2. **Image Generation Node:**
   - Integrate Replicate or Fal.ai to access Flux Pro / Stable Diffusion models.
   - Write an LLM chain to translate the visual concept from the brief into detailed image generation prompts.
   - Execute image generation and save URLs to cloud storage (S3/R2).
3. **Assembly & Finalization Node:**
   - Combine copy and image references into a structured `Deliverable` JSON object.
4. **Internal QA Node (Human-in-the-loop):**
   - For MVP, the AI Reviewer just formats the output and pauses the graph (via LangGraph checkpoints) waiting for manual Human approval before marking it "Ready for Client".

---

## Phase 4: Client Portal (Next.js) (Days 13-17)
**Goal:** Build the web interface for clients to submit requests and operators to review them.

1. **UI Component Library:**
   - Set up Vanilla CSS / CSS Modules with standard design tokens (colors, typography).
   - Implement core components (Buttons, Modals, Forms, Cards).
2. **Brief Submission Flow:**
   - Create a multi-step form for clients: Project Name, Objective, Target Audience, Brand Voice, Budget.
   - Write API route to ingest brief and dispatch a job to the Python Orchestrator.
3. **Client Dashboard:**
   - List active projects and their current status (e.g., "In Production", "Ready for Review").
4. **Deliverable Review Interface:**
   - Create a feed or gallery view for clients to see completed ad variants.
   - Add Approve / Request Revision buttons.

---

## Phase 5: Internal Ops Dashboard & Integration (Days 18-20)
**Goal:** Connect the frontend requests to the backend AI and allow internal team review.

1. **Operator View:**
   - Build a dashboard path (`/ops-dashboard`) accessible only to team members.
   - List tasks currently paused awaiting "Internal QA".
2. **Approval Action:**
   - Wire up UI buttons for the operator to approve an AI-generated draft.
   - Upon approval, resume the LangGraph workflow to notify the client.
3. **End-to-End Testing:**
   - Mock a user submission and watch the data flow through DB -> Worker -> LangGraph -> Image Gen -> Back to UI.

---

## Phase 6: Infrastructure & Deployment (Days 21-24)
**Goal:** Launch the MVP securely on live servers.

1. **Storage Setup:**
   - Configure AWS S3 or Cloudflare R2 properly for saving generated images and managing presigned URLs.
2. **Backend Deployment:**
   - Deploy PostgreSQL (e.g., Supabase, Neon) and Redis (e.g., Upstash).
   - Containerize the Python/FastAPI worker service and deploy to Railway or Fly.io.
3. **Frontend Deployment:**
   - Deploy Next.js to Vercel, pointing environment variables to production DB, Redis, and Python API endpoints.
4. **Final Security Audit:**
   - Ensure clients cannot access other clients' projects.
   - Lock down API endpoints.

---

## Immediate Next Actions to Start Programming:

1. **Initialize the Monorepo:** Run standard setup commands (`npx create-turbo@latest`).
2. **Setup the Database:** Define the `Project` and `Brief` tables.
3. **Build the Brief Intake Form:** Give clients a way to request the work.
