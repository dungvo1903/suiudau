// Xóa mật khẩu đã lưu (nếu có)
localStorage.removeItem('lovePassword');
// Khai báo biến toàn cục
let isMusicPlaying = false;
const PASSWORD = "03062006"; // Mật khẩu có thể thay đổi

// Hàm khởi tạo
document.addEventListener('DOMContentLoaded', function() {
    // Kiểm tra mật khẩu đã nhập trước đó (nếu có)
    checkPassword();
    
    // Khởi tạo các sự kiện
    initEvents();
    
    // Tạo hiệu ứng hoa rơi
    setInterval(createPetal, 300);
});

// Kiểm tra mật khẩu
function checkPassword() {
    document.getElementById('passwordScreen').style.display = 'flex';
    document.getElementById('content').classList.add('hidden');
}

// Mở khóa trang web
function unlockWebsite() {
    document.getElementById('passwordScreen').style.display = 'none';
    document.getElementById('content').classList.remove('hidden');
    initApp();
    
    // Thêm sự kiện click toàn trang để kích hoạt audio
    document.body.addEventListener('click', handleFirstInteraction);
}

// Xử lý lần tương tác đầu tiên
function handleFirstInteraction() {
    const bgMusic = document.getElementById('bgMusic');
    
    // Chỉ thực hiện một lần
    document.body.removeEventListener('click', handleFirstInteraction);
    
    bgMusic.volume = 0.3;
    bgMusic.play()
        .then(() => {
            isMusicPlaying = true;
            document.getElementById('musicBtn').innerHTML = '<i class="fas fa-pause"></i>';
        })
        .catch(error => {
            console.error("Không thể phát nhạc:", error);
            // Hiển thị nút play để người dùng tự bật
            document.getElementById('musicBtn').innerHTML = '<i class="fas fa-music"></i>';
            document.getElementById('musicBtn').style.display = 'block';
        });
    bgMusic.play()
        .then(() => {
            isMusicPlaying = true;
            document.getElementById('musicBtn').innerHTML = '<i class="fas fa-pause"></i>';
            document.getElementById('musicAlert').classList.add('hidden');
        })
        .catch(error => {
            console.error("Không thể phát nhạc:", error);
            // Hiển thị thông báo
            document.getElementById('musicAlert').classList.remove('hidden');
            setTimeout(() => {
                document.getElementById('musicAlert').classList.add('hidden');
            }, 5000);
        });
}

// Khởi tạo sự kiện
function initEvents() {
    // Nút mở khóa
    document.getElementById('unlockBtn').addEventListener('click', function() {
        const input = document.getElementById('passwordInput').value;
        if (input === PASSWORD) {
            unlockWebsite();
        } else {
            const errorElement = document.getElementById('passwordError');
            errorElement.textContent = "Sai rùi bbi à hãy nhập lại điiiiii";
            errorElement.style.opacity = 1;
            setTimeout(() => errorElement.style.opacity = 0, 2000); 
        }
    });
    
    // Cho phép nhấn Enter để mở khóa
    document.getElementById('passwordInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('unlockBtn').click();
        }
    });
    document.getElementById('logoutBtn')?.addEventListener('click', function() {
        location.reload(); // Tải lại trang để yêu cầu nhập mật khẩu
    });
    // Thêm sự kiện click để kích hoạt nhạc nếu bị chặn
    document.body.addEventListener('click', function initMusic() {
        bgMusic.play().catch(e => console.log("Cần tương tác để phát nhạc"));
        document.body.removeEventListener('click', initMusic);
    }, { once: true });
}

// Khởi tạo ứng dụng
function initApp() {
    // 1. Đếm ngày yêu nhau
    startLoveCounter();
    
    // 2. Nhạc nền
    initMusicPlayer();
    
    // 3. Album ảnh
    initPhotoGallery();
    
    // 4. Hộp thư tay
    initLoveLetter();
    
    // 5. Hiển thị thư đã lưu (nếu có)
    showSavedLetter();
}

// Đếm ngày yêu
function startLoveCounter() {
    const loveDate = new Date('2023-02-14'); // Thay bằng ngày của bạn
    
    function updateCounter() {
        const now = new Date();
        const diff = now - loveDate;
        
        const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
        const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        document.getElementById('years').textContent = years;
        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
    }
    
    updateCounter();
    setInterval(updateCounter, 60000); // Cập nhật mỗi phút
}

// Trong hàm initMusicPlayer, giữ nguyên nhưng thêm thông báo
function initMusicPlayer() {
    const musicBtn = document.getElementById('musicBtn');
    const bgMusic = document.getElementById('bgMusic');
    
    musicBtn.addEventListener('click', function() {
        if (isMusicPlaying) {
            bgMusic.pause();
            musicBtn.innerHTML = '<i class="fas fa-music"></i>';
        } else {
            bgMusic.play()
                .then(() => {
                    musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
                })
                .catch(error => {
                    alert('🎵 Hãy nhấn cho phép phát nhạc nếu trình duyệt yêu cầu!');
                });
        }
        isMusicPlaying = !isMusicPlaying;
    });
}

// Album ảnh
function initPhotoGallery() {
    const photos = [
        { url: 'assets/images/photo1.jpg', caption: 'Ngày đầu tiên gặp nhau' },
        { url: 'assets/images/photo2.jpg', caption: 'Kỷ niệm 1 năm' },
        { url: 'assets/images/photo3.jpg', caption: 'Du lịch cùng nhau' },
        // Thêm ảnh của bạn vào đây
    ];
    
    const gallery = document.getElementById('photoGallery');
    
    photos.forEach(photo => {
        const photoItem = document.createElement('div');
        photoItem.className = 'photo-item';
        photoItem.innerHTML = `
            <img src="${photo.url}" alt="${photo.caption}">
            <p>${photo.caption}</p>
        `;
        gallery.appendChild(photoItem);
    });
}

// Hộp thư tay
function initLoveLetter() {
    const form = document.getElementById('loveLetterForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const letterContent = document.getElementById('letterContent').value;
        
        if (letterContent.trim() !== '') {
            localStorage.setItem('loveLetter', letterContent);
            showSavedLetter();
            alert('💌 Thư của bạn đã được lưu lại!');
            form.reset();
        } else {
            alert('Vui lòng viết nội dung thư trước khi gửi!');
        }
    });
}

// Hiển thị thư đã lưu
function showSavedLetter() {
    const savedLetter = localStorage.getItem('loveLetter');
    const displayElement = document.getElementById('savedLetter');
    
    if (savedLetter) {
        displayElement.innerHTML = `
            <h3>Thư gần nhất:</h3>
            <p>${savedLetter}</p>
            <button id="deleteLetter" class="delete-btn"><i class="fas fa-trash"></i> Xóa thư</button>
        `;
        
        document.getElementById('deleteLetter').addEventListener('click', function() {
            if (confirm('Bạn có chắc muốn xóa thư này?')) {
                localStorage.removeItem('loveLetter');
                displayElement.innerHTML = '';
            }
        });
    } else {
        displayElement.innerHTML = '<p>Chưa có thư được lưu...</p>';
    }
}

// Hiệu ứng hoa rơi
function createPetal() {
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.innerHTML = ['🌸', '🌹', '💐', '🌺', '🌷'][Math.floor(Math.random() * 5)];
    petal.style.left = Math.random() * window.innerWidth + 'px';
    petal.style.fontSize = (Math.random() * 20 + 10) + 'px';
    petal.style.opacity = Math.random() * 0.7 + 0.3;
    petal.style.animationDuration = (Math.random())
}