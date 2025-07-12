const BLYNK_AUTH = 'M88jnirSw2TRpyf9_yNUyC2TKRcVLbXH';
const BLYNK_URL = 'https://blynk.cloud/external/api';

const beep = document.getElementById('beep-sound');

async function sendCommand(pin, value) {
  try {
    beep.play();
    const res = await fetch(`${BLYNK_URL}/update?token=${BLYNK_AUTH}&${pin}=${value}`);
    if (!res.ok) throw new Error(`Failed to send command`);
  } catch (error) {
    alert('❌ Failed to send command. Check connection.');
    console.error('Error:', error);
  }
}

async function setSpeed() {
  const speed = document.getElementById('speedSlider').value;
  await sendCommand('V5', speed);
  document.getElementById('speedValue').textContent = speed;
}

async function updateRobotStatus() {
  try {
    const res = await fetch(`${BLYNK_URL}/get?token=${BLYNK_AUTH}&v6`);
    const status = await res.text();
    const led = document.getElementById('statusLED');
    const text = document.getElementById('statusText');
    if (status === '1') {
      led.className = 'led-indicator on';
      text.textContent = 'Moving';
    } else {
      led.className = 'led-indicator off';
      text.textContent = 'Stopped';
    }
  } catch (e) {
    console.error('Status check error:', e);
  }
}

async function checkConnection() {
  try {
    const res = await fetch(`${BLYNK_URL}/isHardwareConnected?token=${BLYNK_AUTH}`);
    const data = await res.text();
    const led = document.getElementById('connLED');
    const text = document.getElementById('connText');
    if (data === 'true') {
      led.className = 'led-indicator on';
      text.textContent = 'Connected';
    } else {
      led.className = 'led-indicator off';
      text.textContent = 'Disconnected';
    }
  } catch (e) {
    console.error('Connection check failed:', e);
  }
}

// Keyboard controls
document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowUp': sendCommand('V0', 1); break;
    case 'ArrowDown': sendCommand('V4', 1); break;
    case 'ArrowLeft': sendCommand('V1', 1); break;
    case 'ArrowRight': sendCommand('V3', 1); break;
    case ' ': sendCommand('V2', 1); break;
  }
});

document.addEventListener('keyup', (e) => {
  switch (e.key) {
    case 'ArrowUp': sendCommand('V0', 0); break;
    case 'ArrowDown': sendCommand('V4', 0); break;
    case 'ArrowLeft': sendCommand('V1', 0); break;
    case 'ArrowRight': sendCommand('V3', 0); break;
  }
});

// Looping status updates
setInterval(updateRobotStatus, 1000);
setInterval(checkConnection, 3000);
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log("✅ Service Worker Registered"));
}
const joystick = nipplejs.create({
  zone: document.getElementById('joystick-zone'),
  mode: 'static',
  position: { left: '50%', top: '50%' },
  color: 'blue',
  size: 150
});

joystick.on('dir', (evt, data) => {
  const dir = data.direction.angle;
  if (dir === 'up') sendCommand('V0', 1);
  if (dir === 'down') sendCommand('V4', 1);
  if (dir === 'left') sendCommand('V1', 1);
  if (dir === 'right') sendCommand('V3', 1);
});

joystick.on('end', () => {
  sendCommand('V0', 0);
  sendCommand('V1', 0);
  sendCommand('V3', 0);
  sendCommand('V4', 0);
});

