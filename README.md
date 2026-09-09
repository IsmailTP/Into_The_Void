# 🕳️ Into The Void

> A story-driven cybersecurity challenge platform built with Flask.

**Into The Void** is a multi-level web-based cybersecurity challenge designed to combine storytelling, web security concepts, reconnaissance, logical thinking, and practical exploitation techniques.

Players progress through a series of increasingly challenging levels while uncovering the story behind the system.

---

## 🎯 Features

- 🧩 Multiple progressive challenge levels
- 🌐 Flask-based web application
- 🔐 Authentication system
- 🏆 Player leaderboard
- 📖 Story-driven gameplay
- 🎮 Interactive web challenges
- 🤖 AI-powered functionality using Groq
- 🛠️ Admin interface
- 📱 Responsive web interface
- 🎨 Custom CSS and JavaScript for individual levels

---

## 🧠 Challenge Structure

The game contains multiple levels, with each level introducing a different type of challenge.

| Level | Focus |
|------:|-------|
| Level 1 | Initial challenge / reconnaissance |
| Level 2 | Web-based challenge |
| Level 3 | Application logic |
| Level 4 | Client-side challenge |
| Level 5 | Advanced web challenge |
| Level 6 | Advanced exploitation / logic |
| Level 7 | Final challenge |

> The exact techniques and objectives are intentionally not documented here to avoid spoiling the challenges.

---

## 🏗️ Technology Stack

### Backend

- Python
- Flask
- SQLite
- Groq API

### Frontend

- HTML5
- CSS3
- JavaScript

### Development

- Git
- GitHub
- Python Virtual Environment

---

## 📁 Project Structure

```text
Into_The_Void/
│
├── app.py                  # Flask application
├── requirements.txt        # Python dependencies
│
├── static/
│   ├── style.css
│   ├── login.css
│   ├── level1.css
│   ├── level2.css
│   ├── level3.css
│   ├── level4.css
│   ├── level4.js
│   ├── level5.css
│   ├── level5.js
│   ├── level6.css
│   ├── level6.js
│   ├── level7.css
│   └── level7.js
│
├── templates/
│   ├── index.html
│   ├── login.html
│   ├── about.html
│   ├── contact.html
│   ├── how_to_play.html
│   ├── leaderboard.html
│   ├── admin.html
│   └── level*.html
│
├── txt/
│   └── story.txt
│
└── .gitignore

