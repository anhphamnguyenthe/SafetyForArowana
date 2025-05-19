// Thông tin đăng nhập mặc định
const DEFAULT_USERNAME = "admin";
const DEFAULT_PASSWORD = "admin123";

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

// Hàm bật/tắt heater
function toggleHeater() {
    heaterState = !heaterState;
    alert('Heater đã ' + (heaterState ? 'bật' : 'tắt'));
}

// Hàm bật/tắt fan
function toggleFan() {
    fanState = !fanState;
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

// Nếu có nút mode-toggle trên trang, gán sự kiện chuyển đổi
window.addEventListener('DOMContentLoaded', function() {
    // Nút MODE
    const modeBtn = document.getElementById('mode-toggle');
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

    // Nút SWITCH
    const switchBtn = document.getElementById('switch-toggle');
    if (switchBtn) {
        switchBtn.onclick = function() {
            if (switchState === 'heater1') {
                switchState = 'heater2';
                switchBtn.textContent = 'Sưởi 2';
            } else {
                switchState = 'heater1';
                switchBtn.textContent = 'Sưởi 1';
            }
        };
    }

    // Nút FAN
    const fanBtn = document.getElementById('fan-toggle');
    if (fanBtn) {
        fanBtn.onclick = function() {
            fanState = !fanState;
            fanBtn.textContent = fanState ? 'FAN: ON' : 'FAN: OFF';
            fanBtn.style.background = fanState ? '#17a2b8' : '#28a745';
        };
    }

    // Nút RESET
    const resetBtn = document.getElementById('reset-btn');
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
            if (switchBtn) switchBtn.textContent = 'Sưởi 1';
            if (fanBtn) {
                fanBtn.textContent = 'FAN: OFF';
                fanBtn.style.background = '#28a745';
            }
            alert('Hệ thống đã được reset!');
        };
    }
});

