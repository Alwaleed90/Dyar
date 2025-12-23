# GitHub Upload Guide

Since you already have a `.git` folder in your project, follow these steps to upload your code to GitHub.

## 1. Create a New Repository on GitHub
1.  Go to [github.com/new](https://github.com/new).
2.  Give your repository a name (e.g., `dyar-mvp`).
3.  Keep it **Private** (recommended for apps with API keys) or Public.
4.  **Do NOT** initialize with a README, license, or gitignore (we already have them).
5.  Click **Create repository**.

## 2. Connect Your Project to GitHub
Copy the commands from the "…or push an existing repository from the command line" section on GitHub, or use these:

```powershell
# 1. Add the remote origin (Replace with YOUR URL from GitHub)
git remote add origin https://github.com/YOUR_USERNAME/dyar-mvp.git

# 2. Rename current branch to 'main' if it's not already
git branch -M main

# 3. Add all your changes
git add .

# 4. Create your first commit
git commit -m "Initial commit of Dyar MVP"

# 5. Push to GitHub
git push -u origin main
```

---

## 3. Alternative: Using VS Code (Visual Method)
If you prefer not to use commands:

1.  Open VS Code and click the **Source Control** icon on the left sidebar (looks like a branch).
2.  Click the **"Publish to GitHub"** button at the top.
3.  Select **"Publish to GitHub private repository"**.
4.  Follow the prompts to authorize and upload.

---

## 🛠️ After Uploading
Once your code is on GitHub:
1.  Go to **Vercel**.
2.  Import this repository.
3.  Add your [Environment Variables](file:///c:/Users/alwle/OneDrive/Desktop/Dyar/VERCEL_DEPLOYMENT.md#2-required-environment-variables).
4.  Deploy!
