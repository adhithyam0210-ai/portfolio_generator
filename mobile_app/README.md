# Portfolify Mobile App (Flutter)

A modern, cross-platform Flutter application (Android, iOS, Web, Windows) that mirrors the **Portfolify** web platform with real-time **Supabase PostgreSQL** cloud synchronization.

---

## 🚀 Key Features

1. **Dashboard Overview**:
   - Welcome banner with live candidate details.
   - **Your Public Portfolio Link** card with instant copy, Unpublish / Publish Now toggle, and QR code sharing.
   - **Profile Completion Score** (0-100%) with 7-item checklist.
   - Live analytics counters for Total Views and CV Downloads.

2. **Step-by-step Builder Wizard**:
   - **Step 1: Choose Template First** (Featured Modern Glass, Role-specific templates for Full Stack, UI/UX, AI Researcher, Cyber Analyst, Canva Pop, Adobe Studio, etc.).
   - **Step 2: Personal Bio & Contact Info** with resume document attachment.
   - **Step 3: Education & Credentials**.
   - **Step 4: Work Experience**.
   - **Step 5: Projects Showcase**.
   - **Step 6: Skills & Technologies** with dynamic tags.

3. **Smoothly Scrollable Live Portfolio View**:
   - Renders the candidate's portfolio with role-based colors, frosted cards, skills chips, and direct CV download button.

4. **Share Modal & QR Code**:
   - Live QR Code generated for mobile phone camera scanning.
   - 1-click sharing to WhatsApp, LinkedIn, Email, or System Share sheet.

5. **Supabase Real-Time Cloud Sync**:
   - Automatically synchronizes with your Supabase database (`https://bqgyjirytyzzgxrytecl.supabase.co`).
   - Offline support via local storage cache.

---

## 🛠️ How to Run the Flutter App

### Prerequisites
1. Install Flutter SDK: [https://flutter.dev/docs/get-started/install](https://flutter.dev/docs/get-started/install)
2. Verify installation:
   ```bash
   flutter doctor
   ```

### Running the App
1. Open a terminal and navigate to the `mobile_app` folder:
   ```bash
   cd mobile_app
   ```
2. Install dependencies:
   ```bash
   flutter pub get
   ```
3. Run on your preferred target device:
   - **Chrome / Web**:
     ```bash
     flutter run -d chrome
     ```
   - **Android Emulator / Device**:
     ```bash
     flutter run -d android
     ```
   - **Windows Desktop**:
     ```bash
     flutter run -d windows
     ```
   - **iOS Simulator (macOS)**:
     ```bash
     flutter run -d ios
     ```
