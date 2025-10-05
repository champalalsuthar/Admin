## 🛠 Blogsite – Admin Panel (Frontend)

This is the Admin Panel frontend for the Blog Post Management System, built with **React**, **Vite**, **Material UI**, and **React-Quill**. It enables admins to securely manage blog posts and admin users using JWT authentication and API tokens.

---

### ✅ Features

- **🔐 Admin Authentication** (JWT-based)
- **📝 Blog Post Management**
    - Create / Update blog posts
    - Rich-text editing with React Quill
    - Add tags, categories, featured images
    - Set post status (Active/Inactive)
    - View all posts (Active + Inactive)
    - Edit blog posts
- **👤 Admin User Management**
    - Add new admins
    - Edit admin info
    - Set admin status (Active/Inactive)
    - View all admins (Active + Inactive)
- **📂 Image Upload**
    - Upload and resize blog images via Cloudinary

---

### ⚙️ Tech Stack

| Technology         | Purpose                              |
|--------------------|--------------------------------------|
| React + Vite       | Fast frontend development            |
| React Router DOM   | Routing between admin pages          |
| Material UI        | UI components and layout             |
| React-Quill        | Rich text editor for content         |
| Axios              | API communication                    |
| JWT                | Authentication                      |

---

### 🔐 Integrated APIs (from Backend)

#### Auth

| Method | Endpoint                      | Description                |
|--------|-------------------------------|----------------------------|
| POST   | `/api/admin/auth/verify`      | Verifies Admin JWT         |
| POST   | `/api/admin/user/login`       | Login as Admin             |

**Required Headers:**
- `authorization: Bearer <API_TOKEN>`
- `AuthToken: <JWT>`

#### Blog Post Management

| Method | Endpoint                                 | Description                |
|--------|------------------------------------------|----------------------------|
| POST   | `/api/admin/blogpost/addBlogPost`        | Add a new blog post        |
| GET    | `/api/admin/blogpost/getAllBlogPosts`    | Get all blog posts         |
| POST   | `/api/admin/blogpost/getBlogPostById`    | Get blog post by ID        |
| POST   | `/api/admin/blogpost/updateBlogPost`     | Update blog post           |

#### Admin User Management

| Method | Endpoint                              | Description                |
|--------|---------------------------------------|----------------------------|
| GET    | `/api/admin/user/getalladmin`         | Get all admin users        |
| POST   | `/api/admin/user/addadmin`            | Add new admin              |
| POST   | `/api/admin/user/updateadmin`         | Update admin               |
| POST   | `/api/admin/user/getadminbyid`        | Get admin by ID            |

#### Image Upload

| Method | Endpoint         | Description                        |
|--------|------------------|------------------------------------|
| POST   | `/api/upload`    | Upload and resize image to Cloudinary |

---

### ▶️ Getting Started

**Clone the Repository**
```bash
git clone https://github.com/champalalsuthar/Admin
cd Admin
```

**Install Dependencies**
```bash
npm install
```

**Start the Vite Development Server**
```bash
npm run dev
```

Admin Panel will be accessible at: [http://localhost:5173](http://localhost:5173)

---

### 🌐 Related Repositories

- **Backend API:** [champalalsuthar/Blogsite-backend](https://github.com/champalalsuthar/Blogsite-backend)
- **Public Website:** [champalalsuthar/Blogsite-frontend](https://github.com/champalalsuthar/Blogsite-frontend)