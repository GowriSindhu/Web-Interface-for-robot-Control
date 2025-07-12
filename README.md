# 🤖 Robot Control Web Interface

A mobile-friendly web interface to control your robot using ESP32, Blynk Cloud, and ESP32-CAM. The interface supports joystick-based control, real-time status updates, speed adjustment, and live video streaming. It is also a Progressive Web App (PWA), meaning you can install it on your phone like a native app.

---

## 🚀 Features

- 🎮 Joystick-style robot control (move forward, backward, left, right)
- 📊 Speed control slider (0–255)
- ✅ Real-time robot status (moving/stopped)
- 🔌 Connection status indicator (online/offline)
- 
- 🎧 Sound feedback on button press

---

## 🧱 Technologies Used

- **HTML, CSS, JavaScript**
- **nipple.js** – Joystick control library
- **Blynk Cloud API** – Robot control & feedback
- **ESP32 / ESP32-CAM**
- **PWA (Manifest + Service Worker)**

---

## 📁 Project Structure
robot-control-interface/
│
├── index.html # Main web interface
├── styles.css # Styling
├── script.js # Logic & API control
├── manifest.json # PWA manifest
├── service-worker.js # Offline caching

---

## 🔧 Setup Instructions

### 1. ESP32 Blynk Setup
- Flash your ESP32 board with Blynk-compatible firmware
- Use virtual pins:
  - `V0` = Forward
  - `V1` = Left
  - `V2` = Stop
  - `V3` = Right
  - `V4` = Backward
  - `V5` = Speed
  - `V6` = Status (1 = Moving, 0 = Stopped)
- Copy your **Blynk Auth Token**

### 2. ESP32-CAM Setup
- Program ESP32-CAM using Arduino IDE or PlatformIO
- Connect to Wi-Fi and note the IP
- Default stream URL: `http://<CAM-IP>:81/stream`

### 3. Web Interface Setup
- Replace the Blynk token in `script.js`:
  ```js
  const BLYNK_AUTH = 'Your_Token_Here';
Replace the stream IP in index.html:

<img src="http://<CAM-IP>:81/stream" ... />
4. Run Locally
python -m http.server
5. Add to Home Screen (PWA)
Open site in mobile browser (Chrome/Edge)

Tap "Add to Home Screen"

App installs like a native mobile app


