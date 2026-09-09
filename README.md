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

> ⚠️ The exact techniques and objectives are intentionally not documented here to avoid spoiling the challenges.

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
├── app.py
├── requirements.txt
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
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/IsmailTP/Into_The_Void.git
cd Into_The_Void
```

### 2. Create a virtual environment

```bash
python3 -m venv venv
```

### 3. Activate the virtual environment

#### Linux / Kali Linux

```bash
source venv/bin/activate
```

#### Windows

```powershell
venv\Scripts\activate
```

### 4. Install dependencies

```bash
pip install -r requirements.txt
```

---

## 🔑 Configuration

The application uses environment variables for sensitive configuration.

Create a `.env` file:

```bash
touch .env
```

Add your Groq API key:

```env
GROQ_API_KEYS=your_key_here
```

> ⚠️ **Never commit `.env` to GitHub.**

The `.env` file is excluded through `.gitignore`.

For production deployments, configure environment variables through your hosting provider instead of storing credentials inside the source code.

---

## ▶️ Running the Application

Activate your virtual environment:

```bash
source venv/bin/activate
```

Set the required environment variables and start the Flask application:

```bash
python app.py
```

The application should then be available at:

```text
http://127.0.0.1:5000
```

Open the address in your browser.

---

## 🎮 How To Play

1. Launch the application.
2. Create or use the appropriate player account.
3. Start at **Level 1**.
4. Investigate the application carefully.
5. Identify clues and potential weaknesses.
6. Solve the challenge.
7. Progress to the next level.
8. Complete all levels to finish the game.

### 🧠 Recommended Mindset

Don't immediately brute-force everything.

Take time to understand how the application works.

Look for:

- Application behavior
- Source code
- HTTP requests
- Client-side JavaScript
- Parameters
- Cookies
- Headers
- API responses
- Hidden functionality
- Authentication logic
- Authorization logic
- Application logic
- Unexpected behavior

---

## 🛡️ Security Learning Objectives

The project is designed to encourage practical understanding of web application security.

Depending on the challenge, players may encounter concepts involving:

- Web reconnaissance
- Authentication
- Authorization
- Input validation
- Client-side security
- Server-side logic
- API security
- Information disclosure
- Access control
- Session handling
- Logic vulnerabilities
- Web application exploitation

The goal is not only to solve the challenges, but also to develop the mindset required for real-world security testing.

---

## 🧪 Intended Environment

Into The Void is designed as an **educational cybersecurity lab / challenge platform**.

It can be used for:

- Cybersecurity training
- Web application security practice
- VAPT learning
- CTF-style exercises
- Security demonstrations
- Beginner-to-intermediate penetration testing practice

---

## ⚠️ Disclaimer

**Into The Void is intended for educational and authorized security testing purposes only.**

Only deploy or test this application in environments where you have explicit permission.

Do not use techniques learned from this project against systems that you do not own or have authorization to test.

The author is not responsible for misuse of this project.

---

## 🔒 Security Notice

Sensitive files and credentials are intentionally excluded from the public repository.

**Do not add the following to the repository:**

```text
.env
API keys
admin credentials
passwords
private configuration
database credentials
```

If a secret is accidentally committed:

1. Revoke or rotate the secret immediately.
2. Remove the secret from the Git history.
3. Check whether the secret was exposed publicly.
4. Update the application to use environment variables or another secure secret-management method.

---

## 🚧 Project Status

**Development / Experimental**

The project is actively being developed.

Additional challenges, improvements, security mechanisms, and features may be added in future versions.

---

## 👨‍💻 Author

### IsmailTP

Cybersecurity student focused on:

- 🔐 Web Application Security
- 🌐 API Security
- 🛡️ Penetration Testing
- 🏢 Active Directory Security
- 🔎 Vulnerability Research

---

## ⭐ Contributing

Suggestions, bug reports, and improvements are welcome.

If you discover a vulnerability in the application itself, please avoid publicly disclosing sensitive details before the issue can be addressed.

For challenge-related vulnerabilities, consider whether disclosure would spoil the experience for other players.

---

## 📜 License

This project is provided primarily for educational and cybersecurity training purposes.

If you intend to allow others to freely reuse, modify, and distribute the project, consider adding an appropriate open-source license.

---

## 🌌 Into The Void

> **Explore. Investigate. Exploit. Escape.**

Good luck.

