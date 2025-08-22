// ===== DOM要素の取得 =====
const header = document.querySelector('.header');
const menuToggle = document.querySelector('.header__menu-toggle');
const nav = document.querySelector('.header__nav');
const contactForm = document.querySelector('.contact__form');
const menuLines = document.querySelectorAll('.header__menu-line');

// ===== モバイルメニューの制御 =====
let isMenuOpen = false;

menuToggle.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
        nav.classList.add('header__nav--active');
        menuLines.forEach(line => line.classList.add('header__menu-line--active'));
        document.body.style.overflow = 'hidden';
    } else {
        nav.classList.remove('header__nav--active');
        menuLines.forEach(line => line.classList.remove('header__menu-line--active'));
        document.body.style.overflow = '';
    }
});

// ===== ナビゲーションリンクのクリック時にメニューを閉じる =====
const navLinks = document.querySelectorAll('.header__nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (isMenuOpen) {
            nav.classList.remove('header__nav--active');
            menuLines.forEach(line => line.classList.remove('header__menu-line--active'));
            document.body.style.overflow = '';
            isMenuOpen = false;
        }
    });
});

// ===== スムーススクロール =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== ヘッダーのスクロール効果 =====
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
    
    lastScrollY = currentScrollY;
});

// ===== お問い合わせフォームの処理 =====
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // フォームデータの取得
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // 簡単なバリデーション
        if (!name || !email || !message) {
            showNotification('すべての項目を入力してください。', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('有効なメールアドレスを入力してください。', 'error');
            return;
        }
        
        // 送信処理（実際の実装では、サーバーサイドの処理が必要）
        showNotification('お問い合わせを受け付けました。ありがとうございます！', 'success');
        this.reset();
    });
}

// ===== メールアドレスのバリデーション =====
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== 通知の表示 =====
function showNotification(message, type = 'info') {
    // 既存の通知を削除
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // 新しい通知を作成
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    // スタイルを設定
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // タイプに応じた背景色を設定
    switch (type) {
        case 'success':
            notification.style.backgroundColor = '#10b981';
            break;
        case 'error':
            notification.style.backgroundColor = '#ef4444';
            break;
        default:
            notification.style.backgroundColor = '#2563eb';
    }
    
    document.body.appendChild(notification);
    
    // アニメーションで表示
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 3秒後に自動で削除
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// ===== Instagram用のクリップボードコピー機能 =====
function copyToClipboard() {
    const text = `Lift Together - リフト相乗りで待ち時間短縮！\n\nその一声で満席乗車を。効率よく滑って、もっと楽しく。\n\nhttps://yousan.github.io/lift-together\n\n#LiftTogether #リフト相乗り #待ち時間短縮 #スキー #スノーボード`;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('クリップボードにコピーしました！Instagramでシェアしてください。');
        }).catch(err => {
            console.error('コピーに失敗しました:', err);
            fallbackCopyToClipboard(text);
        });
    } else {
        fallbackCopyToClipboard(text);
    }
}

// ===== フォールバック用のクリップボードコピー =====
function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showNotification('クリップボードにコピーしました！Instagramでシェアしてください。');
    } catch (err) {
        console.error('コピーに失敗しました:', err);
        showNotification('コピーに失敗しました。手動でテキストをコピーしてください。');
    }
    
    document.body.removeChild(textArea);
}

// ===== スクロールアニメーション =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // 統計カウンターの処理
            if (entry.target.classList.contains('stats__number')) {
                const target = parseInt(entry.target.dataset.count);
                animateCounter(entry.target, target);
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// アニメーション対象の要素を監視
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.adventure__card, .community__image, .experience__card, .join__step, .benefits__item, .faq__item');
    const statsNumbers = document.querySelectorAll('.stats__number');
    
    animateElements.forEach(el => observer.observe(el));
    statsNumbers.forEach(el => observer.observe(el));
});

// ===== CTA ボタンのクリックイベント =====
const heroPrimaryButton = document.querySelector('.hero__cta-button--primary');
const heroSecondaryButton = document.querySelector('.hero__cta-button--secondary');

if (heroPrimaryButton) {
    heroPrimaryButton.addEventListener('click', () => {
        // 仲間を探すセクションにスクロール
        const joinSection = document.querySelector('#join');
        if (joinSection) {
            const headerHeight = header.offsetHeight;
            const targetPosition = joinSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
}

if (heroSecondaryButton) {
    heroSecondaryButton.addEventListener('click', () => {
        // FAQ（マナー）セクションにスクロール
        const experienceSection = document.querySelector('#faq');
        if (experienceSection) {
            const headerHeight = header.offsetHeight;
            const targetPosition = experienceSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
}

// ===== 参加ボタンのクリックイベント =====
const joinButton = document.querySelector('.join__button');
if (joinButton) {
    joinButton.addEventListener('click', () => {
        // 実際のアプリケーションでは登録フォームを表示
        alert('登録機能は開発中です。近日公開予定！');
    });
}

// ===== パフォーマンス最適化: 画像の遅延読み込み =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== エラーハンドリング =====
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
});

// ===== サービスワーカーの登録（PWA対応の準備） =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/lift-together/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// ===== 統計カウンターアニメーション =====
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
};

// ===== パララックス効果（軽量版） =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero__video');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===== 体験談スライダー（簡易版） =====
let currentSlide = 0;
const slides = document.querySelectorAll('.experience__slide');
const totalSlides = slides.length;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

// 自動スライド（5秒間隔）
if (slides.length > 0) {
    showSlide(0);
    setInterval(nextSlide, 5000);
}

// ===== ページ読み込み完了時の処理 =====
window.addEventListener('load', () => {
    // ローディングアニメーションがある場合の処理
    document.body.classList.add('loaded');
    
    // 初期アニメーションの実行
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero__title, .hero__subtitle, .hero__buttons');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 500);
});

// ===== リサイズイベントの最適化 =====
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // リサイズ時の処理
        if (window.innerWidth > 768 && isMenuOpen) {
            nav.classList.remove('header__nav--active');
            menuLines.forEach(line => line.classList.remove('header__menu-line--active'));
            document.body.style.overflow = '';
            isMenuOpen = false;
        }
    }, 250);
});

// ===== モバイル固定CTAのスクロール =====
document.querySelectorAll('.mobile-cta__button').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const targetSelector = e.currentTarget.getAttribute('data-target');
        const target = document.querySelector(targetSelector);
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    });
});

console.log('Lift Together - JavaScript loaded successfully! 🎿⛷️');