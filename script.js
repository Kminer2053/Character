// 햄버거 메뉴 토글
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // 메뉴 링크 클릭 시 메뉴 닫기 (모바일)
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // 외부 클릭 시 메뉴 닫기
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// 스크롤 시 네비게이션 스타일 변경
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// 위로가기 버튼
const scrollTopBtn = document.querySelector('.scroll-top');

if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 갤러리 필터 기능
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // 활성 버튼 스타일 변경
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // 필터 카테고리 가져오기
        const filterValue = button.getAttribute('data-filter');

        // 갤러리 아이템 필터링
        galleryItems.forEach(item => {
            if (filterValue === 'all') {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                const itemCategory = item.getAttribute('data-category');
                if (itemCategory === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            }
        });
    });
});

// 스크롤 애니메이션 (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 애니메이션 적용할 요소들
const animateElements = document.querySelectorAll('.profile-card, .gallery-item, .goods-item, .news-card, .usage-card');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// 폼 제출 처리
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 실제 구현 시 여기에 서버 통신 코드 추가
        alert('문의가 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.');
        
        // 폼 초기화
        contactForm.reset();
    });
}

// 부드러운 스크롤 (앵커 링크)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // 네비게이션 높이 고려
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// 페이지 로드 시 애니메이션 초기화
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// 히어로 이미지 로드 오류 처리
const heroImage = document.querySelector('.hero-character-img');
if (heroImage) {
    heroImage.addEventListener('error', function() {
        // 이미지 로드 실패 시 플레이스홀더로 대체
        const heroImageContainer = this.parentElement;
        heroImageContainer.innerHTML = `
            <div class="character-placeholder">
                <p>캐릭터 이미지</p>
                <p class="placeholder-desc">이미지를 assets/images/hero-character.gif 로 추가해주세요</p>
            </div>
        `;
    });
}

// 프로필 이미지 전환 기능 (자동 전환 + 호버 + 클릭)
const profileImageContainer = document.querySelector('.image-container');
const profileImages = document.querySelectorAll('.profile-img');
const modeLabel = document.querySelector('.mode-label');

if (profileImageContainer && profileImages.length >= 2) {
    let currentIndex = 0;
    let autoSwitchInterval;
    let isHovered = false;

    // 이미지 전환 함수
    function switchImage(index) {
        profileImages.forEach((img, i) => {
            if (i === index) {
                img.classList.add('active');
            } else {
                img.classList.remove('active');
            }
        });

        // 모드 레이블 업데이트
        if (modeLabel) {
            modeLabel.textContent = index === 0 ? 'ON 모드' : 'OFF 모드';
        }
    }

    // 다음 이미지로 전환
    function nextImage() {
        currentIndex = (currentIndex + 1) % profileImages.length;
        switchImage(currentIndex);
    }

    // 자동 전환 시작 (5초마다)
    function startAutoSwitch() {
        if (!isHovered) {
            autoSwitchInterval = setInterval(nextImage, 5000);
        }
    }

    // 자동 전환 중지
    function stopAutoSwitch() {
        if (autoSwitchInterval) {
            clearInterval(autoSwitchInterval);
        }
    }

    // 호버 시 전환
    profileImageContainer.addEventListener('mouseenter', () => {
        isHovered = true;
        stopAutoSwitch();
        // 호버 시 OFF 모드로 전환
        currentIndex = 1;
        switchImage(currentIndex);
    });

    profileImageContainer.addEventListener('mouseleave', () => {
        isHovered = false;
        // 호버 해제 시 ON 모드로 복귀
        currentIndex = 0;
        switchImage(currentIndex);
        // 자동 전환 재시작
        startAutoSwitch();
    });

    // 클릭 시 전환
    profileImageContainer.addEventListener('click', () => {
        nextImage();
        // 클릭 시 자동 전환 타이머 리셋
        stopAutoSwitch();
        startAutoSwitch();
    });

    // 페이지 로드 시 자동 전환 시작
    startAutoSwitch();

    // 모바일 기기 감지하여 힌트 텍스트 변경
    const imageHint = document.querySelector('.image-hint');
    if (imageHint && 'ontouchstart' in window) {
        imageHint.textContent = '💡 탭하면 OFF 모드를 볼 수 있어요!';
    }

    // 이미지 로드 오류 처리 (플레이스홀더 표시)
    profileImages.forEach((img, index) => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            // 모든 이미지가 로드 실패하면 플레이스홀더 표시
            const visibleImages = Array.from(profileImages).filter(img => 
                !img.style.display || !img.style.display.includes('none')
            );
            if (visibleImages.length === 0) {
                const placeholder = document.createElement('div');
                placeholder.className = 'character-placeholder';
                placeholder.innerHTML = '<p>프로필 이미지</p><p class="placeholder-desc">이미지를 assets/images/ 폴더에 추가해주세요</p>';
                profileImageContainer.appendChild(placeholder);
            }
        });
    });
}
