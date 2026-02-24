# 🍽️ ABBET Kitchen  
*A Dynamic Recipe Discovery & Favorites App*

ABBET Kitchen is a React-based web application that allows users to search for recipes, filter by category, view detailed cooking instructions, and save their favorite meals to a persistent backend using JSON Server.

---

## 👥 Team Members

- Akida  
- Bathsheba  
- Beatrice  
- Martin  
- Ebrahim  

---

## 🚀 Features

✅ Dynamic recipe search using TheMealDB API  
✅ Category filtering  
✅ Horizontal recipe layout (responsive grid)  
✅ Detailed recipe view with ingredients & instructions  
✅ Add to Favorites  
✅ Remove Favorites with SweetAlert confirmation  
✅ Favorites stored in `db.json` using JSON Server  
✅ Clean, portfolio-ready UI  

---

## 🛠️ Tech Stack

- React (Vite)
- React Router DOM
- TheMealDB API
- JSON Server
- SweetAlert2
- CSS (Custom Styling)

---

## 🌍 API Used

**TheMealDB API**

Search endpoint:
```
https://www.themealdb.com/api/json/v1/1/search.php?s=chicken
```

Lookup by ID:
```
https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772
```

---

## 📦 Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone <your-repo-link>
cd spicehub
```

---

### 2️⃣ Install dependencies

```bash
npm install
```

---

### 3️⃣ Install JSON Server (if not installed globally)

```bash
npm install -g json-server
```

---

### 4️⃣ Create `db.json` file

```json
{
  "favorites": []
}
```

---

### 5️⃣ Start JSON Server

```bash
npx json-server db.json --port 3001
```

Server will run at:
```
http://localhost:3001
```

---

### 6️⃣ Start React App

```bash
npm run dev
```

App will run at:
```
http://localhost:5173
```

---

## 📂 Project Structure

```
src/
│
├── components/
│   ├── Navbar.jsx
│   ├── RecipeCard.jsx
│   ├── SearchBar.jsx
│   └── CategoryFilter.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── RecipeDetails.jsx
│   └── Favorites.jsx
│
├── App.jsx
└── main.jsx
```

---

## 🔎 Search Logic

- User types in search input
- State updates (`useState`)
- API request sent to TheMealDB
- Results stored in state
- Recipes dynamically rendered using `.map()`

---

## ❤️ Favorites Logic

- Recipes are saved to `db.json`
- POST request adds favorite
- DELETE request removes favorite
- Favorites page fetches from:
  ```
  http://localhost:3001/favorites
  ```

---

## 🎯 Future Improvements

- User authentication
- Pagination
- Dark mode
- Debounced search
- Global state management (Context API)
- Deployment (Netlify / Vercel)

---

---

## 📄 License

This project is for educational purposes.

---

## ⭐ Acknowledgements

- TheMealDB for free public API
- React Documentation
- JSON Server

---

## 💡 Project Purpose

This project demonstrates:

- API integration
- State management with hooks
- Routing in React
- CRUD operations with JSON Server
- UI structuring and responsive layouts
- Collaborative team development

---

✨ Built with passion by ABBET Kitchen ✨