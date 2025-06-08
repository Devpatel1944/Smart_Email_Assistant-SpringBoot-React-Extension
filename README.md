# Smart Email Assistant ✉️🤖

An AI-powered Smart Email Assistant built using **Spring Boot**, **React**, and **Gemini API**, integrated as a **Chrome extension for Gmail**. This tool helps users generate professional, friendly, or casual email replies within the Gmail compose window by clicking the **"AI Reply"** button.

---
## 🚀 Features

- 🔘 Gmail extension to add **"AI Reply"** button inside the Gmail compose box.
- 🧠 Uses **Gemini API** (by Google) to generate AI-based email replies.
- ✍️ Multiple **reply tone options**: Professional, Friendly, Casual.
- 🔄 Automatically fetches context from selected email text (or user prompt).
- 📋 Copy-to-clipboard functionality for generated replies.
- ⚙️ Backend powered by **Spring Boot** with secure and modular architecture.
- 🌐 Frontend built using **ReactJS** for a responsive and modern interface.

---

## 🛠️ Tech Stack

### 🔹 Backend
- Java 17+
- Spring Boot
- Gemini API (LLM)
- Maven
- CORS Configuration
- REST API

### 🔹 Frontend
- ReactJS
- Axios

### 🔹 Extension
- Manifest V3 (Chrome Extension)
- Content Scripts + Popup
- Messaging with React App

---

## 📁 Project Structure

```bash
SmartEmailAssistant-SpringBoot/
├── backend/                # Spring Boot application
│   ├── src/main/java/...   # Controllers, Services, Configs
│   └── application.properties
├── frontend/               # ReactJS frontend for reply UI
│   ├── public/
│   └── src/
├── extension/              # Chrome Extension files
│   ├── manifest.json
│   ├── content.js
│   ├── content.css
│   
└── README.md
```
⚙️ Setup Instructions
📌 Prerequisites
Java 17+

Node.js + npm

Maven

Google Chrome

Gemini API Key

### 🧩 1. Clone the Repository
```bash
git clone https://github.com/yourusername/SmartEmailAssistant.git
cd SmartEmailAssistant
```
### 🧠 2. Backend (Spring Boot)
```bash
cd backend
# Configure Gemini API Key in Edit Configuration (Not hardcoded in properties)
# OR use Environment Variable: GEMINI_API_KEY
mvn spring-boot:run
```
### 🌐 3. Frontend (React App)
```bash
cd frontend
npm install
npm start
```
Make sure CORS is enabled in Spring Boot to allow frontend requests.

### 🧩 4. Chrome Extension
Go to chrome://extensions

Enable Developer Mode

Click Load Unpacked

Select the extension/ folder

The extension should appear and inject AI Reply button into Gmail compose

### 🪄 How It Works
User opens Gmail and starts composing an email.

"AI Reply" button appears inside the compose box via content script.

User selects a tone (e.g., professional, friendly) and clicks the button.

The extension sends the email context + tone to the React frontend → backend.

Spring Boot calls Gemini API and generates a smart reply.

AI-generated reply is shown in the extension popup with copy support.

### 🔮 Future Enhancements
✅ Tone customization: allow user to define their own tone/prompt style.

📥 Save & manage replies (history view).

🌍 Multi-language support for replies.

💌 Directly insert generated reply into Gmail compose area.

🔐 OAuth integration to personalize responses using Gmail metadata (optional).

🧾 Templates for different email types (e.g., Job Inquiry, Apology, Follow-up).

### 👨‍💻 Author
Deven Patel