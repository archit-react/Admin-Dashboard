# PulseBoardX – Modern Admin Dashboard

**PulseBoardX** is a sleek, responsive admin dashboard built with **React**, **TypeScript**, and **Tailwind CSS**, featuring a clean layout, animated UI, dark/light mode toggle, route-based navigation, and accessibility-first components.

> 🔗 **[Live Demo (Vercel)](https://pulseboardx.vercel.app)**

---

## 📁 Project Structure

```
admin-dashboard/
├── public/
├── src/
│   ├── assets/              # Static images and icons
│   ├── components/
│   │   ├── ui/              # Reusable UI components (e.g., Toast)
│   │   └── UserModal.tsx    # User modal logic
│   ├── layout/
│   │   └── MainLayout.tsx   # Main layout with sidebar, topbar, outlet
│   ├── pages/
│   │   ├── Dashboard.tsx    # Dashboard route
│   │   ├── Users.tsx        # Users route
│   │   └── Settings.tsx     # Settings route
│   ├── router/
│   │   └── index.tsx        # React Router configuration
│   ├── tests/
│   │   └── MainLayout.test.tsx  # Vitest test suite
│   ├── App.tsx              # Root App with router provider
│   ├── main.tsx             # Main React entry point
│   ├── vite-env.d.ts        # Vite environment types
│   └── vitest.setup.ts      # Test setup for jest-dom
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## ✅ What We Built

- ⚡ React + TypeScript + Tailwind CSS stack
- 🌓 Dark/Light mode toggle using system preference and localStorage
- 🧭 Sidebar navigation with active route highlighting
- 🧪 Unit tests using Vitest and React Testing Library
- 🎨 Modern UI design with animations via Framer Motion
- 📱 Fully responsive layout

---

## 🧩 Challenges Faced

- **matchMedia error in tests**: Mocked `window.matchMedia` in test setup to fix JSDOM limitation.
- **Theme toggle persistence**: Used localStorage with `useEffect` to retain user preference.
- **Testing routes and layout**: Used `MemoryRouter` to isolate layout behavior in unit tests.

---

## ✨ Out-of-Plan Features Added

- Framer Motion for smooth content transitions
- Sidebar UI refinements with active link styling
- Avatar component and welcome header
- Test coverage for dark mode, avatar, and sidebar

---

## 🔮 Future Enhancements

- Firebase integration (auth + Firestore)
- Add/Edit/Delete users modal
- Recharts/D3-based analytics
- Role-based access and permissions
- Deploy to Vercel with CI/CD

---

## 🧪 Running Locally

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Run tests
npx vitest
```

---

## Author

**Archit Sharma**\
Frontend Developer | React | TypeScript | Tailwind CSS

- [GitHub](https://github.com/archit-react)
- [LinkedIn](https://www.linkedin.com/in/archit-react)
- [Portfolio](https://your-portfolio.com)

## © License

This project is open-source and available under the [MIT License](LICENSE).
