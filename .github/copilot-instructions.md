# GitHub Copilot Instructions for SEM-AI Project

## 1. TypeScript Guidelines

- **Strict Typing**: Always use strict TypeScript. Avoid `any` type whenever possible. Use `unknown` if the type is truly not known yet, and narrow it down.
- **Explicit Return Types**: Define explicit return types for all functions and components to ensure predictability.
- **Interfaces vs Types**: Prefer `interface` for object definitions that might be extended, and `type` for unions, intersections, or primitives.
- **Null Safety**: Handle `null` and `undefined` explicitly. Use optional chaining (`?.`) and nullish coalescing (`??`) operators.

## 2. Data Validation & Schemas (Zod)

- **Zod Integration**: Use [Zod](https://zod.dev/) for all runtime data validation, especially for:
  - API responses and external data.
  - Form validation.
  - Complex configuration objects.
- **Type Inference**: Do not manually duplicate types. Infer TypeScript types directly from Zod schemas using `z.infer<typeof Schema>`.

  ```typescript
  import { z } from "zod";

  export const UserSchema = z.object({
    id: z.string().uuid(),
    username: z.string().min(3),
    email: z.string().email(),
  });

  export type User = z.infer<typeof UserSchema>;
  ```

## 3. State Management (Zustand)

- **Global State**: Use [Zustand](https://github.com/pmndrs/zustand) for global client-side state management.
- **Store Structure**: Create small, focused stores rather than a single monolithic store.
- **Selectors**: Use selectors to subscribe to specific parts of the state to minimize re-renders.
- **Actions**: Define actions within the store itself.

  ```typescript
  import { create } from "zustand";

  interface BearState {
    bears: number;
    increase: (by: number) => void;
  }

  export const useBearStore = create<BearState>()((set) => ({
    bears: 0,
    increase: (by) => set((state) => ({ bears: state.bears + by })),
  }));
  ```

## 4. Component Architecture

- **Functional Components**: Use React Functional Components with Hooks.
- **Props Validation**: While TypeScript handles build-time checking, use Zod for runtime props validation if data comes from untrusted sources.
- **Server vs Client Components**: In Next.js App Router, default to Server Components. Use `"use client"` only when interactivity (state, effects, event listeners) is required.

## 5. Code Style

- **Naming**: Use PascalCase for components and interfaces, camelCase for variables and functions, and UPPER_CASE for constants.
- **Modularity**: Keep files small and focused. Extract logic into custom hooks or utility functions.

## 6. Accessibility (A11y)

- **Interactive Elements**: All interactive elements (buttons, links, inputs) must have discernible text.
- **Icon-only Buttons**: For buttons that only contain icons, you MUST provide an `aria-label` or `title` attribute to satisfy screen readers and ESLint rules.

  ```tsx
  // Bad
  <button><Icon /></button>

  // Good
  <button aria-label="Filter" title="Filter"><Icon /></button>
  ```
