<div align="center">
  <img src="frontend/public/stylesense_logo.png" alt="StyleSense Logo" width="180" />

  <h1>StyleSense</h1>
  <p><strong>The intelligent salon management platform for the modern beauty industry.</strong></p>
  <p>AI-powered bookings · Virtual try-on · Multi-role dashboards · Real-time queue · Loyalty & CRM</p>

  <br/>

![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=next.js&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Go](https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)

  <br/>

![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-443E38?style=flat-square&logo=react&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=flat-square&logo=reactquery&logoColor=white)

  <br/>

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)
![Status](https://img.shields.io/badge/status-active_development-brightgreen?style=flat-square)
![Platform](https://img.shields.io/badge/platform-web-blue?style=flat-square)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
  - [Public Platform](#-public-platform)
  - [Client Dashboard](#-client-dashboard)
  - [Salon Admin Dashboard](#-salon-admin-dashboard)
  - [Stylist Portal](#-stylist-portal)
  - [AI Features](#-ai-features)
- [Data Flow](#data-flow)
- [Database Schema](#database-schema)
- [API Design](#api-design)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**StyleSense** is a full-stack smart salon management platform built for the modern beauty industry. It connects clients with salons through a seamless digital experience — from discovery and booking to AI-powered style recommendations and virtual try-on.

The platform is built around **three distinct user roles**:

| Role            | Portal       | Key Capabilities                                                                |
| --------------- | ------------ | ------------------------------------------------------------------------------- |
| **Client**      | `/client`    | Browse salons & stylists, book, loyalty rewards, AI hair studio, virtual try-on |
| **Salon Admin** | `/dashboard` | Full business ops — queue, POS, CRM, marketing, analytics                       |
| **Stylist**     | `/stylist`   | Schedule, clients, commissions, gallery, consultation forms                     |

> **Note:** The backend is currently under active development. All frontend pages use local mock data. This document describes the intended full-stack architecture.

---

## Architecture

### System Architecture

```mermaid
graph TB
    subgraph Client["Client Layer"]
        direction LR
        Web["Next.js 16 Web App<br/>(React 19 + TypeScript)"]
    end

    subgraph Gateway["API Gateway Layer"]
        direction LR
        GW["API Gateway / Load Balancer<br/>(Nginx / Caddy)"]
    end

    subgraph Services["Microservices Layer"]
        direction LR
        Auth["Auth Service<br/>(Node.js + JWT)"]
        Core["Core API<br/>(Node.js + Express)"]
        AI["AI Service<br/>(Python + FastAPI)"]
        RT["Realtime Service<br/>(Go + WebSocket)"]
    end

    subgraph Data["Data Layer"]
        direction LR
        PG[("PostgreSQL<br/>Primary DB")]
        Redis[("Redis<br/>Cache + Sessions")]
        S3["Object Storage<br/>(Images / Media)"]
    end

    subgraph External["External Services"]
        direction LR
        Pay["Payment Gateway<br/>(PayHere / Stripe)"]
        SMS["SMS Gateway<br/>(Dialog / Notify.lk)"]
        AI_API["OpenAI API<br/>(GPT-4o)"]
    end

    Web --> GW
    GW --> Auth
    GW --> Core
    GW --> AI
    GW --> RT
    Auth --> PG
    Auth --> Redis
    Core --> PG
    Core --> Redis
    Core --> S3
    AI --> AI_API
    AI --> PG
    RT --> Redis
    Core --> Pay
    Core --> SMS

    classDef frontend fill:#0B0B0F,stroke:#22D3EE,color:#F5F5F7
    classDef gateway fill:#141419,stroke:#8B5CF6,color:#F5F5F7
    classDef service fill:#1C1C22,stroke:#10B981,color:#F5F5F7
    classDef data fill:#1C1C22,stroke:#F59E0B,color:#F5F5F7
    classDef external fill:#1C1C22,stroke:#E8B4B8,color:#F5F5F7

    class Web frontend
    class GW gateway
    class Auth,Core,AI,RT service
    class PG,Redis,S3 data
    class Pay,SMS,AI_API external
```

### Frontend Application Architecture

```mermaid
graph LR
    subgraph App["Next.js App Router"]
        direction TB
        Public["Public Routes<br/>/ · /about · /services<br/>/stylists · /pricing · /booking"]
        Auth["Auth Routes<br/>/auth/login · /auth/signup<br/>/auth/otp · /auth/reset-password"]
        ClientPortal["Client Portal<br/>/client/*"]
        AdminDash["Admin Dashboard<br/>/dashboard/*"]
        StylistPortal["Stylist Portal<br/>/stylist/*"]
        AIHub["AI Hub<br/>/ai/analysis · /ai/chatbot<br/>/ai/virtual-tryon"]
    end

    subgraph State["State Management"]
        direction TB
        Zustand["Zustand Stores<br/>authStore · bookingStore"]
        ReactQuery["TanStack Query<br/>Server state cache"]
    end

    subgraph UILayer["UI Layer"]
        direction TB
        Components["Shared Components<br/>SSButton · SSCard · Badge"]
        Layouts["Layouts<br/>PublicLayout · AuthLayout<br/>DashboardLayout · StylistLayout · ClientLayout"]
        Nav["Navigation<br/>Navbar · Footer<br/>DashboardSidebar · StylistSidebar · ClientSidebar"]
    end

    App --> State
    App --> UILayer
```

### Authentication Flow

```mermaid
sequenceDiagram
    actor User
    participant FE as Next.js Frontend
    participant GW as API Gateway
    participant Auth as Auth Service
    participant DB as PostgreSQL
    participant Cache as Redis

    User->>FE: Enter credentials
    FE->>GW: POST /api/auth/login
    GW->>Auth: Forward request
    Auth->>DB: Verify user credentials
    DB-->>Auth: User record
    Auth->>Cache: Store session + refresh token
    Auth-->>GW: JWT access token (15m) + refresh token (7d)
    GW-->>FE: Set HttpOnly cookie (refresh) + access token
    FE->>FE: Store access token in Zustand
    FE-->>User: Redirect to role-based dashboard

    Note over FE,Auth: OTP verification for new signups
    Note over Auth,Cache: Refresh token rotation on every use
```

### Booking Flow

```mermaid
sequenceDiagram
    actor Client
    participant FE as Frontend
    participant API as Core API
    participant RT as Realtime (Go)
    participant DB as PostgreSQL
    participant SMS as SMS Gateway

    Client->>FE: Select service + stylist + slot
    FE->>API: POST /api/bookings
    API->>DB: Check slot availability
    DB-->>API: Slot free
    API->>DB: Create booking record
    API->>RT: Emit booking:created event
    RT-->>FE: Real-time notification to salon dashboard
    API->>SMS: Send confirmation SMS to client
    API-->>FE: Booking confirmation + ID
    FE-->>Client: Show confirmation screen

    Note over RT,FE: WebSocket keeps live queue updated
```

---

## Tech Stack

### Frontend

| Technology                                                                                                                     | Version | Purpose                            |
| ------------------------------------------------------------------------------------------------------------------------------ | ------- | ---------------------------------- |
| ![Next.js](https://img.shields.io/badge/-Next.js-000?logo=next.js&logoColor=white&style=flat-square) Next.js                   | 16.2.6  | App framework, SSR/SSG, App Router |
| ![React](https://img.shields.io/badge/-React-20232A?logo=react&logoColor=61DAFB&style=flat-square) React                       | 19.2.4  | UI component library               |
| ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white&style=flat-square) TypeScript    | 5.x     | Static typing                      |
| ![Tailwind](https://img.shields.io/badge/-Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white&style=flat-square) Tailwind CSS | v4      | Utility-first styling              |
| ![Framer](https://img.shields.io/badge/-Framer_Motion-0055FF?logo=framer&logoColor=white&style=flat-square) Framer Motion      | 12.38   | Animations & transitions           |
| Zustand                                                                                                                        | 5.x     | Client-side global state           |
| TanStack Query                                                                                                                 | 5.x     | Server state, caching, mutations   |
| Recharts                                                                                                                       | 3.x     | Analytics charts                   |
| React Hook Form                                                                                                                | 7.x     | Form validation                    |
| Zod                                                                                                                            | 3.x     | Schema validation                  |
| Radix UI                                                                                                                       | —       | Accessible headless UI primitives  |
| Lucide React                                                                                                                   | 1.x     | Icon library                       |

### Backend _(in development)_

| Technology                                                                                                                  | Purpose                                                 |
| --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| ![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white&style=flat-square) Node.js + Express   | Core REST API — bookings, users, services, payments     |
| ![Go](https://img.shields.io/badge/-Go-00ADD8?logo=go&logoColor=white&style=flat-square) Go                                 | Realtime service — WebSocket, live queue, notifications |
| ![Python](https://img.shields.io/badge/-Python-3776AB?logo=python&logoColor=white&style=flat-square) Python + FastAPI       | AI service — recommendations, analysis, chatbot         |
| ![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-4169E1?logo=postgresql&logoColor=white&style=flat-square) PostgreSQL | Primary relational database                             |
| Redis                                                                                                                       | Session cache, rate limiting, pub/sub                   |
| JWT + Refresh Tokens                                                                                                        | Stateless authentication with rotation                  |
| Nginx                                                                                                                       | Reverse proxy + API gateway                             |

---

## Project Structure

```
stylesense/
├── frontend/                          # Next.js 16 application
│   ├── src/
│   │   ├── app/                       # App Router pages
│   │   │   ├── page.tsx               # Landing page
│   │   │   ├── about/
│   │   │   ├── services/
│   │   │   ├── stylists/
│   │   │   ├── pricing/
│   │   │   ├── booking/
│   │   │   ├── auth/                  # Login, signup, OTP, reset
│   │   │   ├── ai/                    # AI analysis, chatbot, virtual try-on
│   │   │   ├── client/                # Client portal
│   │   │   │   ├── page.tsx           # Client home overview
│   │   │   │   ├── bookings/          # Appointment history & upcoming
│   │   │   │   ├── salons/            # Browse & discover salons
│   │   │   │   ├── stylists/          # Browse & discover stylists
│   │   │   │   ├── favorites/         # Saved stylists
│   │   │   │   ├── loyalty/           # Points balance, tiers, rewards
│   │   │   │   ├── reviews/           # Submit and view reviews
│   │   │   │   ├── ai/                # AI Hair Studio + virtual try-on
│   │   │   │   ├── profile/           # Account profile editor
│   │   │   │   └── settings/          # Notification & account settings
│   │   │   ├── dashboard/             # Salon admin dashboard
│   │   │   │   ├── page.tsx           # Overview
│   │   │   │   ├── bookings/
│   │   │   │   ├── calendar/
│   │   │   │   ├── queue/             # Live queue board
│   │   │   │   ├── waitlist/          # Waitlist manager
│   │   │   │   ├── stylists/
│   │   │   │   ├── services/
│   │   │   │   ├── customers/
│   │   │   │   ├── inventory/         # Product inventory + CRUD
│   │   │   │   ├── pos/               # POS / checkout
│   │   │   │   ├── earnings/
│   │   │   │   ├── analytics/
│   │   │   │   ├── marketing/         # Campaign manager
│   │   │   │   ├── rfm/               # RFM client segmentation
│   │   │   │   ├── utilisation/       # Staff heatmap
│   │   │   │   ├── reviews/
│   │   │   │   ├── notifications/
│   │   │   │   ├── subscription/
│   │   │   │   └── settings/
│   │   │   └── stylist/               # Stylist portal
│   │   │       ├── page.tsx           # Stylist overview
│   │   │       ├── bookings/
│   │   │       ├── schedule/
│   │   │       ├── clients/
│   │   │       ├── earnings/
│   │   │       ├── ai-insights/
│   │   │       ├── trends/            # Trending styles guide
│   │   │       ├── colors/            # Colour reference
│   │   │       ├── gallery/           # Before/after gallery
│   │   │       ├── consultation/      # Client consultation forms
│   │   │       ├── goals/             # Monthly goal tracker
│   │   │       ├── timer/             # Service timer
│   │   │       ├── calculator/        # Commission calculator
│   │   │       ├── profile/
│   │   │       └── settings/
│   │   ├── components/                # Shared UI components
│   │   │   ├── animations/
│   │   │   ├── common/                # SSButton, SSCard, Badge
│   │   │   ├── layouts/               # PublicLayout, AuthLayout
│   │   │   ├── navigation/            # Navbar, Sidebar, Footer
│   │   │   └── ui/                    # Radix-based primitives
│   │   ├── features/                  # Domain feature modules
│   │   │   ├── landing/               # Hero, Features, Pricing, CTA
│   │   │   ├── authentication/        # LoginForm, SignupForm
│   │   │   ├── booking/
│   │   │   ├── dashboard/
│   │   │   ├── ai-analysis/
│   │   │   ├── ai-recommendation/
│   │   │   ├── chatbot/
│   │   │   ├── virtual-tryon/
│   │   │   ├── services/
│   │   │   ├── stylists/
│   │   │   ├── analytics/
│   │   │   ├── loyalty/
│   │   │   ├── payments/
│   │   │   ├── reviews/
│   │   │   └── notifications/
│   │   ├── hooks/                     # useAuth, useBooking, useServices, useStylists
│   │   ├── services/                  # API client + domain services
│   │   │   ├── api/client.ts          # Axios instance
│   │   │   ├── auth/
│   │   │   ├── booking/
│   │   │   ├── stylists/
│   │   │   ├── services/
│   │   │   ├── payments/
│   │   │   └── ai/
│   │   ├── store/                     # Zustand stores
│   │   │   ├── authStore.ts
│   │   │   └── bookingStore.ts
│   │   ├── types/                     # TypeScript interfaces
│   │   └── schemas/                   # Zod validation schemas
│   ├── public/
│   │   └── stylesense_logo.png
│   ├── next.config.ts
│   ├── tailwind.config.ts
│   └── package.json
│
└── backend/                           # ⚙️ In development
    ├── auth-service/                  # Node.js — JWT auth, OTP
    ├── core-api/                      # Node.js — bookings, users, services
    ├── ai-service/                    # Python — recommendations, chatbot
    ├── realtime-service/              # Go — WebSocket, live queue
    └── gateway/                       # Nginx config
```

---

## Features

### 🌐 Public Platform

The consumer-facing side of StyleSense for clients discovering and booking salon services.

| Page           | Route            | Description                                              |
| -------------- | ---------------- | -------------------------------------------------------- |
| Landing        | `/`              | Hero, features, services showcase, testimonials, pricing |
| About          | `/about`         | Brand story and mission                                  |
| Services       | `/services`      | Full service catalogue with pricing                      |
| Service Detail | `/services/[id]` | Individual service page                                  |
| Stylists       | `/stylists`      | Stylist profiles and ratings                             |
| Pricing        | `/pricing`       | Membership tier comparison                               |
| Booking        | `/booking`       | Multi-step appointment booking flow                      |

**Membership Tiers:**

```mermaid
graph LR
    Free["🔓 Free<br/>Basic booking"] -->|Upgrade| Essential["⭐ Essential<br/>Priority booking<br/>5% discount"]
    Essential -->|Upgrade| Premium["💜 Premium<br/>10% discount<br/>AI recommendations"]
    Premium -->|Upgrade| Elite["👑 Elite<br/>15% discount<br/>VIP perks + free sessions"]

    style Free fill:#1C1C22,stroke:#52525B,color:#F5F5F7
    style Essential fill:#1C1C22,stroke:#22D3EE,color:#F5F5F7
    style Premium fill:#1C1C22,stroke:#8B5CF6,color:#F5F5F7
    style Elite fill:#1C1C22,stroke:#F59E0B,color:#F5F5F7
```

---

### 👤 Client Dashboard

Personal portal for clients at `/client`, with its own sidebar navigation and glassmorphism card design.

```mermaid
mindmap
  root((Client Portal))
    Discover
      Browse Salons
      Browse Stylists
      Saved Favorites
    Bookings
      Upcoming Appointments
      Booking History
    AI Studio
      Face Shape Analysis
      Hairstyle Matching
      Color Simulation
      Virtual Try-On
    Loyalty
      Points Balance
      Membership Tiers
      Redeem Rewards
      Points History
    Account
      Reviews
      Profile Editor
      Settings
```

| Section            | Route               | Key Features                                                           |
| ------------------ | ------------------- | ---------------------------------------------------------------------- |
| **Home**           | `/client`           | Welcome overview, upcoming bookings, quick stats, AI feature shortcuts |
| **Salons**         | `/client/salons`    | Browse and discover nearby salons, ratings, services                   |
| **Stylists**       | `/client/stylists`  | Discover stylists, filter by specialty and rating                      |
| **Bookings**       | `/client/bookings`  | Upcoming and past appointment history, status tracking                 |
| **Favorites**      | `/client/favorites` | Saved stylists for quick re-booking                                    |
| **Loyalty**        | `/client/loyalty`   | Points balance, tier progress, reward redemption, transaction history  |
| **Reviews**        | `/client/reviews`   | Submit and manage salon/stylist reviews                                |
| **AI Hair Studio** | `/client/ai`        | Gender-based face shape analysis, hairstyle matching, color simulation |
| **Profile**        | `/client/profile`   | Edit personal info, preferred styles                                   |
| **Settings**       | `/client/settings`  | Notification preferences, privacy, account management                  |

---

### 🏢 Salon Admin Dashboard

Full business management for salon owners and managers at `/dashboard`.

```mermaid
mindmap
  root((Admin Dashboard))
    Management
      Overview KPIs
      Bookings Table
      Calendar View
      Live Queue Board
      Waitlist Manager
    Salon Ops
      Stylists
      Services
      Customers CRM
      Inventory
      Staff Heatmap
    Finance
      Earnings
      POS / Checkout
      AI Analytics
    Growth
      Marketing Hub
      RFM Segments
      Reviews
      Notifications
    Account
      Subscription
      Settings
```

| Section            | Route                      | Key Features                                      |
| ------------------ | -------------------------- | ------------------------------------------------- |
| **Overview**       | `/dashboard`               | KPI cards, revenue chart, upcoming bookings       |
| **Bookings**       | `/dashboard/bookings`      | Full booking management, status updates           |
| **Calendar**       | `/dashboard/calendar`      | Weekly/monthly appointment calendar               |
| **Live Queue**     | `/dashboard/queue`         | Real-time in-service / waiting / completed board  |
| **Waitlist**       | `/dashboard/waitlist`      | Waitlist entries, one-click notify & book         |
| **Stylists**       | `/dashboard/stylists`      | Stylist profiles, performance metrics             |
| **Services**       | `/dashboard/services`      | Service CRUD, pricing, duration                   |
| **Customers**      | `/dashboard/customers`     | Client database, visit history                    |
| **Inventory**      | `/dashboard/inventory`     | Product stock, low-stock alerts, CRUD             |
| **Staff Heatmap**  | `/dashboard/utilisation`   | Weekly time × stylist utilisation grid            |
| **POS / Checkout** | `/dashboard/pos`           | Quick-add services + products, receipt            |
| **Earnings**       | `/dashboard/earnings`      | Revenue breakdown, commission reports             |
| **Analytics**      | `/dashboard/analytics`     | AI-powered business insights                      |
| **Marketing Hub**  | `/dashboard/marketing`     | SMS/email campaigns, auto-campaigns               |
| **RFM Segments**   | `/dashboard/rfm`           | Client segmentation (Champions / At Risk / Lost…) |
| **Reviews**        | `/dashboard/reviews`       | Review management                                 |
| **Notifications**  | `/dashboard/notifications` | System notifications                              |
| **Subscription**   | `/dashboard/subscription`  | Salon plan management                             |
| **Settings**       | `/dashboard/settings`      | Business profile, hours, preferences              |

---

### 💇 Stylist Portal

Dedicated workspace for stylists at `/stylist`.

```mermaid
mindmap
  root((Stylist Portal))
    My Work
      Overview
      Bookings
      Schedule
      Earnings
      Service Timer
    AI
      AI Insights
    Clients
      My Clients
      Consultation Forms
      Before & After Gallery
    My Growth
      Goal Tracker
      Commission Calculator
    Inspiration
      Trending Styles
      Colour Guide
    Account
      My Profile
      Settings
```

| Section                    | Route                   | Key Features                                        |
| -------------------------- | ----------------------- | --------------------------------------------------- |
| **Overview**               | `/stylist`              | Upcoming bookings, earnings summary, quick stats    |
| **Bookings**               | `/stylist/bookings`     | Personal booking list and status                    |
| **Schedule**               | `/stylist/schedule`     | Weekly availability and appointments                |
| **Earnings**               | `/stylist/earnings`     | Commission breakdown (70/30 split)                  |
| **Service Timer**          | `/stylist/timer`        | Stopwatch / countdown timer with session log        |
| **AI Insights**            | `/stylist/ai-insights`  | Personalised performance insights                   |
| **My Clients**             | `/stylist/clients`      | Client history per stylist                          |
| **Consultation Forms**     | `/stylist/consultation` | Digital 4-step client intake forms                  |
| **Before / After Gallery** | `/stylist/gallery`      | Transformation portfolio with public/private toggle |
| **Goal Tracker**           | `/stylist/goals`        | Monthly targets — sessions, earnings, rating        |
| **Commission Calc**        | `/stylist/calculator`   | Live commission breakdown + monthly projection      |
| **Trending Styles**        | `/stylist/trends`       | 2025 trend guide — cuts, colours, techniques        |
| **Colour Guide**           | `/stylist/colors`       | Colour reference and formulas                       |
| **Profile**                | `/stylist/profile`      | Public stylist profile editor                       |
| **Settings**               | `/stylist/settings`     | Account preferences                                 |

---

### 🤖 AI Features

| Feature               | Route               | Description                                                          |
| --------------------- | ------------------- | -------------------------------------------------------------------- |
| **AI Style Analysis** | `/ai/analysis`      | Upload photo → AI analyses hair type, condition, recommends services |
| **AI Chatbot**        | `/ai/chatbot`       | Conversational assistant for style questions and booking help        |
| **Virtual Try-On**    | `/ai/virtual-tryon` | Preview hairstyles and colours virtually before booking              |

---

## Data Flow

### State Management Architecture

```mermaid
graph TD
    subgraph UI["UI Components"]
        Pages["Page Components"]
        Features["Feature Modules"]
    end

    subgraph Stores["Zustand Stores (Client State)"]
        AuthStore["authStore<br/>user · token · logout"]
        BookingStore["bookingStore<br/>selectedSlot · service · stylist"]
    end

    subgraph QueryLayer["TanStack Query (Server State)"]
        Queries["Queries<br/>useServices · useStylists<br/>useBookings"]
        Mutations["Mutations<br/>createBooking · updateBooking"]
        Cache["Query Cache<br/>staleTime · invalidation"]
    end

    subgraph APILayer["API Service Layer"]
        AxiosClient["Axios Instance<br/>baseURL · auth interceptor<br/>token refresh"]
    end

    UI --> Stores
    UI --> QueryLayer
    QueryLayer --> APILayer
    Stores --> APILayer
```

---

## Database Schema

> ⚠️ Backend in development — schema is the planned design.

```mermaid
erDiagram
    USERS {
        uuid id PK
        varchar email UK
        varchar password_hash
        varchar name
        varchar phone
        enum role
        int loyalty_points
        enum membership_tier
        timestamp created_at
    }

    SALONS {
        uuid id PK
        varchar name
        text address
        varchar phone
        varchar email
        json business_hours
        float rating
        int review_count
        timestamp created_at
    }

    STYLISTS {
        uuid id PK
        uuid user_id FK
        uuid salon_id FK
        varchar bio
        varchar specialities
        float rating
        int experience_years
    }

    SERVICES {
        uuid id PK
        uuid salon_id FK
        varchar name
        varchar category
        int duration_minutes
        decimal price
        boolean is_active
    }

    BOOKINGS {
        uuid id PK
        uuid client_id FK
        uuid stylist_id FK
        uuid service_id FK
        uuid salon_id FK
        timestamp scheduled_at
        enum status
        decimal total_price
        text notes
        timestamp created_at
    }

    INVENTORY {
        uuid id PK
        uuid salon_id FK
        varchar name
        varchar category
        int stock_qty
        decimal cost_price
        decimal sell_price
        varchar supplier
        date last_restocked
    }

    REVIEWS {
        uuid id PK
        uuid booking_id FK
        uuid client_id FK
        uuid stylist_id FK
        int rating
        text comment
        timestamp created_at
    }

    LOYALTY_TRANSACTIONS {
        uuid id PK
        uuid user_id FK
        int points
        varchar type
        uuid reference_id
        timestamp created_at
    }

    USERS ||--o{ BOOKINGS : "makes"
    STYLISTS ||--o{ BOOKINGS : "fulfils"
    SERVICES ||--o{ BOOKINGS : "booked_for"
    SALONS ||--o{ STYLISTS : "employs"
    SALONS ||--o{ SERVICES : "offers"
    SALONS ||--o{ INVENTORY : "stocks"
    BOOKINGS ||--o| REVIEWS : "generates"
    USERS ||--o{ LOYALTY_TRANSACTIONS : "earns"
```

---

## API Design

> ⚠️ Backend in development — API contracts are the planned design.

### Core Endpoints

```
Auth Service (Node.js)
POST   /api/auth/register          Register new user
POST   /api/auth/login             Login + issue tokens
POST   /api/auth/logout            Invalidate refresh token
POST   /api/auth/refresh           Rotate refresh token
POST   /api/auth/otp/send          Send OTP via SMS
POST   /api/auth/otp/verify        Verify OTP

Core API (Node.js)
GET    /api/salons                 List salons
GET    /api/salons/:id             Salon detail
GET    /api/services               List services
GET    /api/services/:id           Service detail
GET    /api/stylists               List stylists
GET    /api/stylists/:id           Stylist detail

POST   /api/bookings               Create booking
GET    /api/bookings/:id           Get booking
PATCH  /api/bookings/:id/status    Update booking status
DELETE /api/bookings/:id           Cancel booking

GET    /api/dashboard/overview     Admin KPI metrics
GET    /api/dashboard/queue        Live queue state
POST   /api/dashboard/queue        Add walk-in to queue
PATCH  /api/dashboard/queue/:id    Update queue entry status

GET    /api/inventory              List inventory items
POST   /api/inventory              Add product
PATCH  /api/inventory/:id          Update product
DELETE /api/inventory/:id          Remove product

POST   /api/payments/initiate      Initiate payment
POST   /api/payments/webhook       Payment gateway webhook

AI Service (Python / FastAPI)
POST   /api/ai/analyse             Analyse hair from image
POST   /api/ai/recommend           Get style recommendations
POST   /api/ai/chat                Chatbot conversation
POST   /api/ai/virtual-tryon       Virtual hairstyle preview

Realtime Service (Go / WebSocket)
WS     /ws/queue                   Live queue updates
WS     /ws/notifications           Real-time notifications
```

---

## Getting Started

### Prerequisites

- Node.js ≥ 20
- npm ≥ 10
- Git

### Frontend Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-org/stylesense.git
cd stylesense

# 2. Install frontend dependencies
cd frontend
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# 4. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

```bash
npm run dev        # Start development server (Next.js + Turbopack)
npm run build      # Production build
npm run start      # Start production server
npm run lint       # Run ESLint
```

> **Backend services** are not yet available. The frontend runs entirely on mock data during development.

---

## Environment Variables

Create a `.env.local` file in the `frontend/` directory:

```env
# API
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_WS_URL=ws://localhost:8001

# AI Service
NEXT_PUBLIC_AI_API_URL=http://localhost:8002/api

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=StyleSense
```

---

## Roadmap

```mermaid
gantt
    title StyleSense Development Roadmap
    dateFormat  YYYY-MM
    section Frontend
    Landing & Public Pages       :done,    f1, 2025-09, 2025-11
    Auth Flow (Login/OTP)        :done,    f2, 2025-11, 2025-12
    Admin Dashboard (Core)       :done,    f3, 2025-12, 2026-02
    Stylist Portal               :done,    f4, 2026-02, 2026-04
    AI Feature Pages             :done,    f5, 2026-03, 2026-04
    Client Portal                :done,    f6, 2026-04, 2026-05
    Advanced Admin Pages         :done,    f7, 2026-04, 2026-05
    Advanced Stylist Pages       :done,    f8, 2026-05, 2026-05

    section Backend
    Auth Service (Node.js)       :active,  b1, 2026-05, 2026-06
    Core API (Node.js)           :         b2, 2026-06, 2026-08
    Realtime Service (Go)        :         b3, 2026-07, 2026-09
    AI Service (Python)          :         b4, 2026-07, 2026-09
    Database Schema + Migrations :         b5, 2026-06, 2026-07

    section Integration
    Frontend-Backend Integration :         i1, 2026-08, 2026-10
    Payment Gateway              :         i2, 2026-09, 2026-10
    SMS Notifications            :         i3, 2026-09, 2026-10
    Beta Launch                  :milestone, m1, 2026-10, 0d
```

### Planned Features

- [ ] Backend microservices (Auth · Core · AI · Realtime)
- [ ] PostgreSQL schema + migrations
- [ ] Real payment integration (PayHere / Stripe)
- [ ] SMS notifications via Notify.lk / Dialog
- [ ] Mobile app (React Native)
- [ ] Multi-salon support
- [ ] Franchise management
- [ ] WhatsApp booking bot

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <img src="frontend/public/stylesense_logo.png" alt="StyleSense" width="80" />
  <br/>
  <sub>Built with ❤️ for the beauty industry · Sri Lanka 🇱🇰</sub>
  <br/><br/>
  <sub>
    <a href="https://nextjs.org">Next.js</a> ·
    <a href="https://nodejs.org">Node.js</a> ·
    <a href="https://go.dev">Go</a> ·
    <a href="https://fastapi.tiangolo.com">FastAPI</a> ·
    <a href="https://postgresql.org">PostgreSQL</a>
  </sub>
</div>
