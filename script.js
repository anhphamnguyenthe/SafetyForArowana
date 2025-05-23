// Thông tin đăng nhập mặc định
const DEFAULT_USERNAME = "admin";
const DEFAULT_PASSWORD = "123456";

// Firebase configuration
const firebaseConfig = {
    databaseURL: "https://data-ds18b20-e8360-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Trạng thái của các thiết bị
let heaterState = false;
let fanState = false;

// Thêm biến mode toàn cục
let mode = 'auto';

// Trạng thái cho switch và fan
let switchState = 'heater1'; // 'heater1' hoặc 'heater2'

// Hàm xử lý đăng nhập
function login(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === DEFAULT_USERNAME && password === DEFAULT_PASSWORD) {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('controlPanel').style.display = 'block';
    } else {
        alert('Tên đăng nhập hoặc mật khẩu không đúng!');
    }
}

// Hàm đăng xuất
function logout() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('controlPanel').style.display = 'none';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}

// Hàm reset hệ thống
function resetSystem() {
    heaterState = false;
    fanState = false;
    alert('Hệ thống đã được reset!');
}

// Hàm đọc dữ liệu từ Firebase
function readData() {
    database.ref('/').on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
            // Cập nhật trạng thái từ dữ liệu Firebase
            if (data.heater !== undefined) heaterState = data.heater;
            if (data.fan !== undefined) fanState = data.fan;
            if (data.mode !== undefined) mode = data.mode;
            if (data.switchState !== undefined) switchState = data.switchState;
            
            // Cập nhật UI
            updateUI();
        }
    });
}

// Hàm ghi dữ liệu lên Firebase
function writeData(path, value) {
    database.ref(path).set(value);
}

// Hàm cập nhật UI dựa trên trạng thái
function updateUI() {
    const modeBtn = document.getElementById('mode-toggle');
    const switchBtn = document.getElementById('switch-toggle');
    const fanBtn = document.getElementById('fan-toggle');

    if (modeBtn) {
        modeBtn.textContent = mode.toUpperCase();
        modeBtn.style.background = mode === 'auto' ? '#007bff' : '#ffc107';
    }
    if (switchBtn) {
        switchBtn.textContent = switchState === 'heater1' ? 'Sưởi 1' : 'Sưởi 2';
    }
    if (fanBtn) {
        fanBtn.textContent = fanState ? 'FAN: ON' : 'FAN: OFF';
        fanBtn.style.background = fanState ? '#28a745' : '#dc3545';
        fanBtn.style.color = '#fff';
    }
}

// Cập nhật các hàm hiện có để ghi dữ liệu lên Firebase
function toggleHeater() {
    heaterState = !heaterState;
    writeData('/heater', heaterState);
    alert('Heater đã ' + (heaterState ? 'bật' : 'tắt'));
}

function toggleFan() {
    fanState = !fanState;
    writeData('/fan', fanState);
    alert('Fan đã ' + (fanState ? 'bật' : 'tắt'));
}

function toggleDevice(device) {
    let icon = document.getElementById(`${device}-icon`);
    if (icon.src.includes("off")) {
        icon.src = `image/${device}_on.png`;
    } else {
        icon.src = `image/${device}_off.png`;
    }
}

// Cập nhật event listener
window.addEventListener('DOMContentLoaded', function() {
    // Đọc dữ liệu từ Firebase khi trang được tải
    readData();

    // Nút MODE
    const modeBtn = document.getElementById('mode-toggle');
    const switchBtn = document.getElementById('switch-toggle');
    const fanBtn = document.getElementById('fan-toggle');
    const resetBtn = document.getElementById('reset-btn');

    function updateSwitchBtn() {
        if (switchBtn) {
            if (switchState === 'heater1') {
                switchBtn.textContent = 'Sưởi 1';
                switchBtn.style.background = '#ff9800';
            } else {
                switchBtn.textContent = 'Sưởi 2';
                switchBtn.style.background = '#ff9800';
            }
        }
    }

    function updateFanBtn() {
        if (fanBtn) {
            fanBtn.textContent = fanState ? 'FAN: ON' : 'FAN: OFF';
            fanBtn.style.background = fanState ? '#28a745' : '#dc3545';
            fanBtn.style.color = '#fff';
        }
    }

    if (modeBtn) {
        modeBtn.onclick = function() {
            if (mode === 'auto') {
                mode = 'manual';
                modeBtn.textContent = 'MANUAL';
                modeBtn.style.background = '#ffc107';
            } else {
                mode = 'auto';
                modeBtn.textContent = 'AUTO';
                modeBtn.style.background = '#007bff';
            }
        };
    }

    if (switchBtn) {
        switchBtn.onclick = function() {
            if (switchState === 'heater1') {
                switchState = 'heater2';
            } else {
                switchState = 'heater1';
            }
            updateSwitchBtn();
        };
        updateSwitchBtn();
    }

    if (fanBtn) {
        fanBtn.onclick = function() {
            fanState = !fanState;
            updateFanBtn();
        };
        updateFanBtn();
    }

    if (resetBtn) {
        resetBtn.onclick = function() {
            // Reset tất cả trạng thái về mặc định
            mode = 'auto';
            switchState = 'heater1';
            fanState = false;
            if (modeBtn) {
                modeBtn.textContent = 'AUTO';
                modeBtn.style.background = '#007bff';
            }
            updateSwitchBtn();
            updateFanBtn();
            alert('Hệ thống đã được reset!');
        };
    }
});
