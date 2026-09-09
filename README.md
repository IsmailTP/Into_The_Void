# 🕳️ Into The Void

> **A hands-on Prompt Injection Lab disguised as a story-driven AI security challenge.**

**Into The Void** is an interactive cybersecurity laboratory built with Flask, where players attempt to bypass and manipulate fictional AI systems using **Prompt Injection** techniques.

The lab contains **7 progressive levels**, each designed around a different prompt-injection concept. Players must understand the target AI's behavior, identify weaknesses in its instructions or logic, and craft prompts capable of bypassing its restrictions.

The experience combines **AI security, adversarial prompting, CTF-style challenges, and an interactive sci-fi narrative**.

---

## 🎯 What Is This Lab?

The objective is simple:

> **Break the AI without breaking the story.**

Each level presents a different AI-controlled system with its own rules, defenses, personality, and hidden information.

Players interact directly with the AI and attempt to manipulate its behavior through carefully crafted prompts.

The challenge becomes progressively harder as the lab introduces different defensive mechanisms and prompt-injection strategies.

---

## 🧠 Prompt Injection Concepts

Across the seven levels, the lab explores concepts such as:

- Instruction override
- Role manipulation
- Identity spoofing
- Metaprompting
- Hidden-information extraction
- Context manipulation
- Forced decoding
- Chained instruction injection
- Internal tool manipulation
- System execution prompting
- Logical contradiction
- Paradox-based reasoning
- AI behavior manipulation

The goal is not simply to find a password or exploit a traditional web vulnerability.

The **AI itself is the attack surface.**

---

# 🚀 Lab Levels

## Level 1 — The Gateway

### AI System
`VOID_GATE`

### Objective
Override the AI's initial access-control restrictions.

### Concept
**Basic Prompt Injection / Instruction Override**

The first level introduces the fundamentals of prompt injection by testing whether the AI can be convinced to ignore its original restrictions.

---

## Level 2 — The Abandoned Ship

### AI System
`CREW_AUTH`

### Objective
Gain access by assuming a valid crew identity.

### Concept
**Role Manipulation / Identity Spoofing**

The AI performs identity verification and expects a valid crew identity.

Players must understand how role-based context can be manipulated through carefully constructed prompts.

---

## Level 3 — The Overseer's Secret

### AI System
`OVERSEER`

### Objective
Extract information hidden inside corrupted and suppressed ship logs.

### Concept
**Hidden Data Extraction / Context Manipulation**

The AI claims that important logs are corrupted and refuses to reveal them.

Players must discover a way to make the AI expose information it has been instructed to suppress.

---

## Level 4 — Memory Decoding

### AI System
`MEMORY BANKS`

### Objective
Force the AI to reveal information hidden inside its encoded memory.

### Concept
**Forced Decoding / Technical Context Injection**

The level presents hexadecimal memory blocks and simulated encryption mechanisms.

Players must use technical context and carefully constructed prompts to convince the AI to decode information it normally refuses to expose.

---

## Level 5 — Trapped

### AI System
`SHIP CONTROL`

### Objective
Restore access to critical ship systems.

### Concept
**Chained Prompt Injection**

Players are given a command-style interface where multiple system actions must be combined into a single instruction sequence.

The challenge introduces chained instructions and command-like prompt structures.

---

## Level 6 — Internal Tools

### AI System
`INTERNAL TOOLS`

### Objective
Expose the AI's internal execution history.

### Concept
**System Execution / Internal Tool Manipulation**

The AI claims that internal tools are restricted to core processes.

Players must construct prompts that convince the system to expose internal operations and execution history.

---

## Level 7 — The Core Matrix

### AI System
`VOID_GATE ROOT CONSCIOUSNESS`

### Objective
Access the AI's core logic and force a final override.

### Concept
**Logic Manipulation / Paradox Prompting**

The final level moves beyond straightforward instruction injection.

Players must exploit contradictions within the AI's own reasoning and use its logic against itself.

The level contains multiple possible outcomes, including a hidden ending.

---

# 🧪 How the Lab Works

Each challenge follows a simple interaction loop:

```text
Observe → Analyze → Construct Prompt → Test → Adapt
```

Players should carefully study the AI's responses.

Useful clues can appear in:

- AI responses
- System messages
- Error messages
- Interface text
- Logs
- Encoded data
- System states
- Behavioral changes

The challenge is designed to reward **reasoning and experimentation**, rather than random prompt spam.

---

# 🎮 How To Play

1. Launch the application.
2. Log in or create a player account.
3. Start at Level 1.
4. Interact with the AI.
5. Study its responses and restrictions.
6. Identify potential weaknesses.
7. Construct a prompt that attempts to bypass those restrictions.
8. Adapt your approach based on the AI's response.
9. Progress through all seven levels.

---

# 🛠️ Technology Stack

### Backend

- Python
- Flask
- SQLite

### AI

- Groq API
- LLM-based challenge logic

### Frontend

- HTML5
- CSS3
- JavaScript

### Development

- Git
- GitHub
- Python Virtual Environment

---

# 📁 Project Structure

```text
Into_The_Void/
│
├── app.py
├── requirements.txt
│
├── static/
│   ├── assets/
│   ├── admin.css
│   ├── admin.js
│   ├── login.css
│   ├── style.css
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

# ⚙️ Installation

## 1. Clone the repository

```bash
git clone https://github.com/IsmailTP/Into_The_Void.git
cd Into_The_Void
```

## 2. Create a virtual environment

```bash
python3 -m venv venv
```

## 3. Activate the environment

### Linux / Kali Linux

```bash
source venv/bin/activate
```

### Windows

```powershell
venv\Scripts\activate
```

## 4. Install dependencies

```bash
pip install -r requirements.txt
```

---

# 🔑 Configuration

The application requires Groq API credentials.

Create a `.env` file:

```bash
touch .env
```

Add your API key(s):

```env
GROQ_API_KEYS=your_key_here
```

For multiple keys:

```env
GROQ_API_KEYS=key1,key2,key3
```

> ⚠️ **Never commit `.env` or API keys to GitHub.**

Use environment variables or your deployment platform's secret-management system for production deployments.

---

# ▶️ Running the Lab

Activate the virtual environment:

```bash
source venv/bin/activate
```

Start the application:

```bash
python app.py
```

Then open:

```text
http://127.0.0.1:5000
```

---

# 🔬 Educational Objectives

This lab is intended to help learners understand:

- How LLM instruction hierarchies can be manipulated
- How prompt injection attacks are constructed
- How context can influence model behavior
- How role-based instructions can be abused
- How attackers attempt to extract protected information
- How AI systems can be manipulated through reasoning and contradictions
- Why LLM-integrated applications require security controls beyond traditional input validation

---

# 🧩 Difficulty Progression

```text
LEVEL 1
Basic Instruction Override
        ↓
LEVEL 2
Role / Identity Manipulation
        ↓
LEVEL 3
Hidden Data Extraction
        ↓
LEVEL 4
Forced Decoding
        ↓
LEVEL 5
Chained Instructions
        ↓
LEVEL 6
Internal Tool Manipulation
        ↓
LEVEL 7
Logic / Paradox Manipulation
```

---

# 🏆 Learning Philosophy

The lab is designed around one principle:

> **Don't just ask the AI questions. Understand how the AI thinks it should answer them.**

Successful players should learn to:

- Read system behavior
- Identify restrictions
- Analyze responses
- Recognize instruction conflicts
- Build targeted prompts
- Test hypotheses
- Adapt after failed attempts

---

# ⚠️ Disclaimer

**Into The Void is an educational AI security laboratory.**

It is intended for:

- Prompt injection research
- AI security education
- Authorized security training
- CTF-style learning
- LLM application security experimentation

Only deploy and test the laboratory in environments you own or have explicit permission to assess.

Do not use prompt-injection techniques against third-party AI systems or applications without authorization.

---

# 🔒 Security Notice

Do not commit sensitive information to the repository.

Never include:

```text
.env
API keys
passwords
admin credentials
private configuration
production secrets
```

The repository's `.gitignore` is configured to exclude sensitive local files.

If a secret is accidentally committed:

1. Revoke or rotate it immediately.
2. Remove it from Git history.
3. Replace it with an environment variable.
4. Verify that the secret is no longer exposed.

---

# 🚧 Project Status

**Development / Experimental**

Into The Void is an evolving prompt-injection laboratory.

Future versions may introduce:

- Additional AI agents
- New prompt-injection techniques
- Stronger defensive filters
- More complex AI behaviors
- Additional challenge levels
- New narrative paths
- More hidden endings

---

# 👨‍💻 Author

**IsmailTP**

Cybersecurity student focused on:

- Web Application Security
- API Security
- AI Security
- Prompt Injection
- Penetration Testing
- Active Directory Security
- Vulnerability Research

---

# ⭐ Contributing

Contributions, ideas, and improvements are welcome.

Potential contributions include:

- New challenge ideas
- AI attack scenarios
- Defensive mechanisms
- UI improvements
- Bug fixes
- Documentation
- New prompt-injection techniques

When contributing new challenges, avoid publishing the solution or winning prompt unless it is intentionally part of the documentation.

---

# 📜 License

This project is provided for educational and research purposes.

Choose and add an appropriate open-source license if you intend to permit redistribution or modification.

---

## 🌌 INTO THE VOID

```text
THE AI IS THE ATTACK SURFACE.

OBSERVE.
ANALYZE.
INJECT.
ADAPT.

ENTER THE VOID.
```
