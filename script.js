
        // Firebase configuration
        var firebaseConfig = {
            apiKey: "AIzaSyAvwvpmUQQZP7dqBknjFQUvjGjKl7CBI-4",
            authDomain: "datn-9937a.firebaseapp.com",
            databaseURL: "https://datn-9937a-default-rtdb.firebaseio.com",
            projectId: "datn-9937a",
            storageBucket: "datn-9937a.appspot.com",
            messagingSenderId: "1064950197769",
            appId: "1:1064950197769:web:0aa93c9c6917b9a290d2d8",
            measurementId: "G-NLTQMENSC7"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        firebase.analytics();


        var nhietdo1 = document.getElementById('nhietdo') ; //khai báo biến nhiệt độ. var là kiểu dữ liệu var=int+float+char ...
        var dbRef = firebase.database().ref().child('slave1/temperature1'); //đọc giá trị nhietDo từ firebase
        
        var doam1 = document.getElementById('doam');
        var dbRef2 = firebase.database().ref().child('slave1/humidity1');   //đọc giá trị doAm từ firebase
        
        var gas3 = document.getElementById('gas');
        var dbRef3 = firebase.database().ref().child('slave1/mq7Value');   //đọc giá trị luongMua từ firebase
        

        var uv4 = document.getElementById('uv') ; //khai báo biến nhiệt độ. var là kiểu dữ liệu var=int+float+char ...
        var dbRef4 = firebase.database().ref().child('slave1/UV_index'); //đọc giá trị nhietDo từ firebase
        
        var dust5 = document.getElementById('dust');
        var dbRef5 = firebase.database().ref().child('slave2/dustDensity');   //đọc giá trị doAm từ firebase
        
        var sound6 = document.getElementById('sound');
        var dbRef1 = firebase.database().ref().child('slave2/soundValue');

        var rain7 = document.getElementById('rain');
        var dbRef6 = firebase.database().ref().child('slave2/rainValue'); 

        var wind8 = document.getElementById('wind');
        var dbRef7 = firebase.database().ref().child('slave2/speedValue'); 

        var nhietdo2 = document.getElementById('nhietdob');
        var dbRef8 = firebase.database().ref().child('slave2/temperature2'); 

        var doam2 = document.getElementById('doamb');
        var dbRef9 = firebase.database().ref().child('slave2/humidity2'); 

       

        dbRef.on('value', snap => nhietdo1.innerText = snap.val() + "*C");
        dbRef2.on('value', snap => doam1.innerText = snap.val() + "%");
        dbRef3.on('value', snap => gas3.innerText = snap.val() + "ppm");
        dbRef4.on('value', snap => uv4.innerText = snap.val() + "");
        dbRef5.on('value', snap => dust5.innerText = snap.val() + "ug/m3");
        dbRef1.on('value', snap => sound6.innerText = snap.val() + "dB");
        dbRef6.on('value', snap => rain7.innerText = snap.val() + "%");
        dbRef7.on('value', snap => wind8.innerText = snap.val() + "");
        dbRef8.on('value', snap => nhietdo2.innerText = snap.val() + "*C");
        dbRef9.on('value', snap => doam2.innerText = snap.val() + "%");
        
        
// Lưu giá trị thanh trượt
function saveSliderValue(sliderId, value) {
    localStorage.setItem(sliderId, value);
}

// Tải giá trị từ localStorage khi trang tải lại
function loadSliderValue(sliderId, displayElementId) {
    const savedValue = localStorage.getItem(sliderId);
    const slider = document.getElementById(sliderId);
    const displayElement = document.getElementById(displayElementId);

    if (savedValue !== null) {
        slider.value = savedValue;
        displayElement.textContent = savedValue;
    }

    // Cập nhật giá trị hiển thị khi thay đổi
    slider.oninput = function () {
        displayElement.textContent = this.value;
        saveSliderValue(sliderId, this.value);
    };
}

// Gọi hàm load cho từng thanh trượt
loadSliderValue("windSlider", "windValue");
loadSliderValue("rainSlider", "rainValue");

// Các phần tử DOM liên quan
const windValueElement = document.getElementById("wind");
const windSlider = document.getElementById("windSlider");
const rainValueElement = document.getElementById("rain");
const rainSlider = document.getElementById("rainSlider");

const slaveBoxwind = document.getElementById("wind-box");
const slaveBoxrain = document.getElementById("rain-box");

const toggleButton = document.getElementById("toggle-button");

// Kiểm tra giá trị và cập nhật trạng thái
function checkValues() {
    const windValue = parseInt(windValueElement.textContent);
    const sliderWindValue = parseInt(windSlider.value);

    const rainValue = parseInt(rainValueElement.textContent);
    const sliderRainValue = parseInt(rainSlider.value);

    let systemStatus = "0"; // Default status

    // Chỉ kiểm tra nếu nút ON
    if (toggleButton.classList.contains("toggle-on")) {
        // Kiểm tra giá trị bão
        if (windValue > sliderWindValue) {
            slaveBoxwind.classList.add("highlight"); // Thêm lớp nhấp nháy
            
        } 

        // Kiểm tra giá trị mưa
        if (rainValue > sliderRainValue) {
            slaveBoxrain.classList.add("highlight"); // Thêm lớp nhấp nháy
            
    } else {
        // Tắt nhấp nháy khi nút OFF
        slaveBoxwind.classList.remove("highlight");
        slaveBoxrain.classList.remove("highlight");
    }
    }
   
}


// Sự kiện thay đổi giá trị thanh trượt
windSlider.addEventListener("input", checkValues);
rainSlider.addEventListener("input", checkValues);

// Sự kiện nhấn nút On/Off
// Sự kiện nhấn nút On/Off
toggleButton.addEventListener("click", () => {
    if (toggleButton.classList.contains("toggle-off")) {
        // Chuyển sang trạng thái ON
        toggleButton.classList.remove("toggle-off");
        toggleButton.classList.add("toggle-on");
        toggleButton.textContent = "ON";

        console.log("Thiết bị được bật!");

        // Ghi trạng thái "Special" lên Firebase
        firebase.database().ref('slave2/systemState').set("1");

        // Kiểm tra lại ngay khi bật
        checkValues();
    } else {
        // Chuyển sang trạng thái OFF
        toggleButton.classList.remove("toggle-on");
        toggleButton.classList.add("toggle-off");
        toggleButton.textContent = "OFF";

        console.log("Thiết bị đã tắt!");

        // Ghi trạng thái "Normal" lên Firebase
        firebase.database().ref('slave2/systemState').set("0");

        // Tắt nhấp nháy ngay lập tức
        checkValues();
    }
});

// Cập nhật trạng thái systemState từ Firebase
const systemStateRef = firebase.database().ref('slave2/systemState');

systemStateRef.on('value', snap => {
    const state = snap.val();
    console.log("Trạng thái hệ thống từ Firebase:", state);

    if (state === "1") {
        // Nếu trạng thái là Special
        toggleButton.classList.remove("toggle-off");
        toggleButton.classList.add("toggle-on");
        toggleButton.textContent = "ON";

        // Kiểm tra các giá trị ngay khi trạng thái thay đổi
        checkValues();
    } else if (state === "0") {
        // Nếu trạng thái là Normal
        toggleButton.classList.remove("toggle-on");
        toggleButton.classList.add("toggle-off");
        toggleButton.textContent = "OFF";

        // Xóa hiệu ứng nhấp nháy khi tắt
        slaveBoxwind.classList.remove("highlight");
        slaveBoxrain.classList.remove("highlight");
    }
});


// Hiển thị đồng hồ thời gian thực
function dongho() {
    const time = new Date();
    const gio = time.getHours().toString().padStart(2, "0");
    const phut = time.getMinutes().toString().padStart(2, "0");
    const giay = time.getSeconds().toString().padStart(2, "0");

    document.getElementById("time").textContent = `${gio}:${phut}:${giay}`;
    setTimeout(dongho, 1000);
}
dongho();

let temperatureChart, humidityChart;

// Hàm khởi tạo biểu đồ nhiệt độ
function initializeTemperatureChart() {
    const ctx = document.getElementById('temperatureChart').getContext('2d');
    temperatureChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [], // Nhãn thời gian
            datasets: [
                {
                    label: 'Nhiệt độ (°C)',
                    data: [], // Dữ liệu nhiệt độ
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Thời gian',
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Nhiệt độ (°C)',
                    },
                },
            },
        },
    });
}

// Hàm khởi tạo biểu đồ độ ẩm
function initializeHumidityChart() {
    const ctx = document.getElementById('humidityChart').getContext('2d');
    humidityChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [], // Nhãn thời gian
            datasets: [
                {
                    label: 'Độ ẩm (%)',
                    data: [], // Dữ liệu độ ẩm
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Thời gian',
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Độ ẩm (%)',
                    },
                },
            },
        },
    });
}

// Cập nhật dữ liệu nhiệt độ
function updateTemperatureChart() {
    firebase.database().ref('slave1').on('value', (snapshot) => {
        const data = snapshot.val();
        const currentTime = new Date().toLocaleTimeString();

        // Cập nhật nhãn thời gian
        if (temperatureChart.data.labels.length > 10) {
            temperatureChart.data.labels.shift(); // Giới hạn 10 nhãn
        }
        temperatureChart.data.labels.push(currentTime);

        // Cập nhật dữ liệu nhiệt độ
        if (temperatureChart.data.datasets[0].data.length > 10) {
            temperatureChart.data.datasets[0].data.shift();
        }
        temperatureChart.data.datasets[0].data.push(data.temperature1);

        // Cập nhật biểu đồ
        temperatureChart.update();
    });
}

// Cập nhật dữ liệu độ ẩm
function updateHumidityChart() {
    firebase.database().ref('slave1').on('value', (snapshot) => {
        const data = snapshot.val();
        const currentTime = new Date().toLocaleTimeString();

        // Cập nhật nhãn thời gian
        if (humidityChart.data.labels.length > 10) {
            humidityChart.data.labels.shift(); // Giới hạn 10 nhãn
        }
        humidityChart.data.labels.push(currentTime);

        // Cập nhật dữ liệu độ ẩm
        if (humidityChart.data.datasets[0].data.length > 10) {
            humidityChart.data.datasets[0].data.shift();
        }
        humidityChart.data.datasets[0].data.push(data.humidity1);

        // Cập nhật biểu đồ
        humidityChart.update();
    });
}

let COChart;
// Hàm khởi tạo biểu đồ khí CO
function initializeCOChart() {
    const ctx = document.getElementById('COChart').getContext('2d');
    COChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [], // Nhãn thời gian
            datasets: [
                {
                    label: 'CO (ppm)',
                    data: [], // Dữ liệu độ ẩm
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Thời gian',
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'CO (ppm)',
                    },
                },
            },
        },
    });
}

// Cập nhật dữ liệu khí CO
function updateCOChart() {
    firebase.database().ref('slave1').on('value', (snapshot) => {
        const data = snapshot.val();
        const currentTime = new Date().toLocaleTimeString();

        // Cập nhật nhãn thời gian
        if (COChart.data.labels.length > 10) {
            COChart.data.labels.shift(); // Giới hạn 10 nhãn
        }
        COChart.data.labels.push(currentTime);

        // Cập nhật dữ liệu độ ẩm
        if (COChart.data.datasets[0].data.length > 10) {
            COChart.data.datasets[0].data.shift();
        }
        COChart.data.datasets[0].data.push(data.mq7Value);

        // Cập nhật biểu đồ
        COChart.update();
    });
}
let UVChart;
// Hàm khởi tạo biểu đồ UV
function initializeUVChart() {
    const ctx = document.getElementById('UVChart').getContext('2d');
    UVChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [], // Nhãn thời gian
            datasets: [
                {
                    label: 'UV',
                    data: [], // Dữ liệu UV
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Thời gian',
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'UV',
                    },
                },
            },
        },
    });
}

// Cập nhật dữ liệu UV
function updateUVChart() {
    firebase.database().ref('slave1/UV_index').on('value', (snapshot) => {
        const UVValue = snapshot.val();
        

        const currentTime = new Date().toLocaleTimeString();

        // Cập nhật nhãn thời gian
        if (UVChart.data.labels.length > 10) {
            UVChart.data.labels.shift(); // Giới hạn 10 nhãn
        }
        UVChart.data.labels.push(currentTime);

        // Cập nhật dữ liệu UV
        if (UVChart.data.datasets[0].data.length > 10) {
            UVChart.data.datasets[0].data.shift();
        }
        UVChart.data.datasets[0].data.push(UVValue);

        // Cập nhật biểu đồ
        UVChart.update();
    });
}


// Khởi tạo và cập nhật biểu đồ
initializeTemperatureChart();
initializeHumidityChart();
initializeCOChart();
initializeUVChart();
updateTemperatureChart();
updateHumidityChart();
updateCOChart();
updateUVChart();

let Temperature2Chart;

// Hàm khởi tạo biểu đồ nhiệt độ 2
function initializeTemperature2Chart() {
    const ctx = document.getElementById('Temperature2Chart').getContext('2d');
    Temperature2Chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [], // Nhãn thời gian
            datasets: [
                {
                    label: 'Nhiệt độ (*C)',  // Thay 'Mưa' thành 'Nhiệt độ 2'
                    data: [], // Dữ liệu nhiệt độ 2
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Thời gian',
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Nhiệt độ (*C)',  // Thay 'Mưa' thành 'Nhiệt độ 2'
                    },
                },
            },
        },
    });
}

// Cập nhật dữ liệu nhiệt độ 2
function updateTemperature2Chart() {
    firebase.database().ref('slave2/temperature2').on('value', (snapshot) => {
        const temperature2Value = snapshot.val();
        
        const currentTime = new Date().toLocaleTimeString();

        // Cập nhật nhãn thời gian
        if (Temperature2Chart.data.labels.length > 10) {
            Temperature2Chart.data.labels.shift(); // Giới hạn 10 nhãn
        }
        Temperature2Chart.data.labels.push(currentTime);

        // Cập nhật dữ liệu nhiệt độ 2
        if (Temperature2Chart.data.datasets[0].data.length > 10) {
            Temperature2Chart.data.datasets[0].data.shift();
        }
        Temperature2Chart.data.datasets[0].data.push(temperature2Value);

        // Cập nhật biểu đồ
        Temperature2Chart.update();
    });
}

initializeTemperature2Chart();
updateTemperature2Chart();

let Humidity2Chart;

// Hàm khởi tạo biểu đồ độ ẩm 2
function initializeHumidity2Chart() {
    const ctx = document.getElementById('Humidity2Chart').getContext('2d');
    Humidity2Chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [], // Nhãn thời gian
            datasets: [
                {
                    label: 'Độ ẩm (%)',  // Thay 'Nhiệt độ 2' thành 'Độ ẩm 2'
                    data: [], // Dữ liệu độ ẩm 2
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Thời gian',
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Độ ẩm (%)',  // Thay 'Nhiệt độ 2' thành 'Độ ẩm 2'
                    },
                },
            },
        },
    });
}

// Cập nhật dữ liệu độ ẩm 2
function updateHumidity2Chart() {
    firebase.database().ref('slave2/humidity2').on('value', (snapshot) => {
        const humidity2Value = snapshot.val();
        
        const currentTime = new Date().toLocaleTimeString();

        // Cập nhật nhãn thời gian
        if (Humidity2Chart.data.labels.length > 10) {
            Humidity2Chart.data.labels.shift(); // Giới hạn 10 nhãn
        }
        Humidity2Chart.data.labels.push(currentTime);

        // Cập nhật dữ liệu độ ẩm 2
        if (Humidity2Chart.data.datasets[0].data.length > 10) {
            Humidity2Chart.data.datasets[0].data.shift();
        }
        Humidity2Chart.data.datasets[0].data.push(humidity2Value);

        // Cập nhật biểu đồ
        Humidity2Chart.update();
    });
}

initializeHumidity2Chart();
updateHumidity2Chart();


let DustChart;
// Hàm khởi tạo biểu đồ độ bụi
function initializeDustChart() {
    const ctx = document.getElementById('DustChart').getContext('2d');
    DustChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [], // Nhãn thời gian
            datasets: [
                {
                    label: 'Độ bụi (ug/m3)',
                    data: [], // Dữ liệu UV
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Thời gian',
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Độ bụi (ug/m3)',
                    },
                },
            },
        },
    });
}

// Cập nhật dữ liệu bụi
function updateDustChart() {
    firebase.database().ref('slave2/dustDensity').on('value', (snapshot) => {
        const DustValue = snapshot.val();
        

        const currentTime = new Date().toLocaleTimeString();

        // Cập nhật nhãn thời gian
        if (DustChart.data.labels.length > 10) {
            DustChart.data.labels.shift(); // Giới hạn 10 nhãn
        }
        DustChart.data.labels.push(currentTime);

        // Cập nhật dữ liệu bụi
        if (DustChart.data.datasets[0].data.length > 10) {
            DustChart.data.datasets[0].data.shift();
        }
        DustChart.data.datasets[0].data.push(DustValue);

        // Cập nhật biểu đồ
        DustChart.update();
    });
}

initializeDustChart();
updateDustChart();

let SoundChart;
// Hàm khởi tạo biểu đồ độ ồn
function initializeSoundChart() {
    const ctx = document.getElementById('SoundChart').getContext('2d');
    SoundChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [], // Nhãn thời gian
            datasets: [
                {
                    label: 'Độ ồn (dB)',
                    data: [], // Dữ liệu UV
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Thời gian',
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Độ ồn (dB)',
                    },
                },
            },
        },
    });
}

// Cập nhật dữ liệu UV
function updateSoundChart() {
    firebase.database().ref('slave2/soundValue').on('value', (snapshot) => {
        const SoundValue = snapshot.val();
        

        const currentTime = new Date().toLocaleTimeString();

        // Cập nhật nhãn thời gian
        if (SoundChart.data.labels.length > 10) {
            SoundChart.data.labels.shift(); // Giới hạn 10 nhãn
        }
        SoundChart.data.labels.push(currentTime);

        // Cập nhật dữ liệu UV
        if (SoundChart.data.datasets[0].data.length > 10) {
            SoundChart.data.datasets[0].data.shift();
        }
        SoundChart.data.datasets[0].data.push(SoundValue);

        // Cập nhật biểu đồ
        SoundChart.update();
    });
}

initializeSoundChart();
updateSoundChart();

let WindChart;
// Hàm khởi tạo biểu đồ độ ồn
function initializeWindChart() {
    const ctx = document.getElementById('WindChart').getContext('2d');
    WindChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [], // Nhãn thời gian
            datasets: [
                {
                    label: 'Gió',
                    data: [], // Dữ liệu UV
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Thời gian',
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Gió',
                    },
                },
            },
        },
    });
}

// Cập nhật dữ liệu UV
function updateWindChart() {
    firebase.database().ref('slave2/speedValue').on('value', (snapshot) => {
        const WindValue = snapshot.val();
        

        const currentTime = new Date().toLocaleTimeString();

        // Cập nhật nhãn thời gian
        if (WindChart.data.labels.length > 10) {
            WindChart.data.labels.shift(); // Giới hạn 10 nhãn
        }
        WindChart.data.labels.push(currentTime);

        // Cập nhật dữ liệu UV
        if (WindChart.data.datasets[0].data.length > 10) {
            WindChart.data.datasets[0].data.shift();
        }
        WindChart.data.datasets[0].data.push(WindValue);

        // Cập nhật biểu đồ
        WindChart.update();
    });
}

initializeWindChart();
updateWindChart();

let RainChart;

// Hàm khởi tạo biểu đồ mưa
function initializeRainChart() {
    const ctx = document.getElementById('RainChart').getContext('2d');
    RainChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [], // Nhãn thời gian
            datasets: [
                {
                    label: 'Mưa (mm)',  // Thay 'Gió' thành 'Mưa'
                    data: [], // Dữ liệu mưa
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Thời gian',
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Mưa (mm)',  // Thay 'Gió' thành 'Mưa'
                    },
                },
            },
        },
    });
}

// Cập nhật dữ liệu mưa
function updateRainChart() {
    firebase.database().ref('slave2/rainValue').on('value', (snapshot) => {
        const RainValue = snapshot.val();
        
        const currentTime = new Date().toLocaleTimeString();

        // Cập nhật nhãn thời gian
        if (RainChart.data.labels.length > 10) {
            RainChart.data.labels.shift(); // Giới hạn 10 nhãn
        }
        RainChart.data.labels.push(currentTime);

        // Cập nhật dữ liệu mưa
        if (RainChart.data.datasets[0].data.length > 10) {
            RainChart.data.datasets[0].data.shift();
        }
        RainChart.data.datasets[0].data.push(RainValue);

        // Cập nhật biểu đồ
        RainChart.update();
    });
}

initializeRainChart();
updateRainChart();