// Thông tin đăng nhập mặc định
const DEFAULT_USERNAME = "admin";
const DEFAULT_PASSWORD = "admin123";

// Trạng thái của các thiết bị
let heaterState = false;
let fanState = false;

// Thêm biến mode toàn cục
let mode = 'auto';

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
    const modeBtn = document.getElementById('mode-toggle');
    if (modeBtn) {
        modeBtn.onclick = function() {
            if (mode === 'auto') {
                mode = 'manual';
                modeBtn.textContent = 'MANUAL';
            } else {
                mode = 'auto';
                modeBtn.textContent = 'AUTO';
            }
            // Có thể thêm các hành động khác khi chuyển mode ở đây
            // Ví dụ: cập nhật giao diện, gửi trạng thái lên server, ...
        };
    }
});

