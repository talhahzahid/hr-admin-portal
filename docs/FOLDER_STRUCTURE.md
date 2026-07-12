# Project Folder Structure

Industry-style **feature-based** layout for the HR Attendance Management frontend.

```
attendance_management_system-frontend/
├── app/                          # Next.js App Router (routes only — thin pages)
│   ├── layout.tsx
│   ├── page.tsx
│   ├── login/
│   ├── dashboard/
│   ├── attendance/
│   ├── leaves/
│   ├── leave-requests/           # Admin approve/reject leave applications
│   ├── register/
│   └── users/add/
│
├── features/                     # Domain modules (screens + feature UI + data)
│   ├── auth/
│   ├── dashboard/
│   ├── attendance/
│   ├── leaves/
│   ├── leave-requests/
│   ├── employees/
│   └── users/
│
├── components/
│   ├── ui/                       # Reusable primitives (shadcn)
│   ├── layout/                   # App shell, sidebar, header
│   └── shared/                   # Cross-feature shared UI (tables, filters)
│
├── constants/                    # App-wide constants (navigation, etc.)
├── types/                        # TypeScript types
├── schemas/                      # Zod validation schemas
├── hooks/                        # Shared React hooks
└── lib/                          # Utilities
```

## Conventions

| Layer | Responsibility |
|--------|----------------|
| `app/**/page.tsx` | Route entry — imports from `features/*` only |
| `features/*` | Business logic, screens, feature components, mock data |
| `components/ui` | Design system / primitives |
| `components/layout` | Global layout chrome |
| `components/shared` | Shared widgets used by multiple features |

## Adding a new screen

1. Create `features/<name>/screens/<name>-screen.tsx`
2. Export from `features/<name>/index.ts`
3. Add route in `app/<route>/page.tsx`
4. Add nav item in `constants/navigation.ts`
