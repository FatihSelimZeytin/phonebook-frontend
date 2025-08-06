# Vue Phonebook Frontend

A modern, responsive frontend for your phonebook app — built with Vue 3 + Vite + TypeScript.

---

Supports full contact management with authentication, multi-phone editing, and a clean UI.

---

Powered by:

- Vue 3 + Composition API
- Vite (Lightning-fast frontend tooling)
- TypeScript
- Pinia (State management)
- Vue Router
- Fetch API + Axios

---

## Quickstart

### Prerequisites

Make sure you have:

- Node.js ≥ 18
- npm or yarn

### Clone & Run

```bash
git clone https://github.com/fatihselimzeytin/vue-phonebook-frontend
cd vue-phonebook-frontend
npm install
npm run dev
```

### App will be available at:

http://localhost:5275/

⚠️ Make sure your backend (e.g., Go Phonebook API) is running and CORS is properly configured.

## Pages / Routes
* `/login` — Login page

* `/register` — User registration

* `/dashboard` — Contacts list (auth required)

* `/addcontact` — Add new contact

* `/editcontact/:id` — Edit existing contact

Route protection is enforced via router guards.

### Features
* JWT Auth Integration

* View, Add, Edit, and Delete Contacts

* Multiple Phone Numbers per Contact

* Clean and Minimal UI

* Auto-attach JWT via Axios Interceptor

* TypeScript with full type safety