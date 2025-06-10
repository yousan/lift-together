// ===== DOM要素の取得 =====
const menuToggle = document.querySelector('.header__menu-toggle');
const nav = document.querySelector('.header__nav');
const contactForm = document.querySelector('.contact__form');

// ===== モバイルメニューの制御 =====
if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('header__nav--active');
        menuToggle.classList.toggle('header__menu-toggle--active');
        
        // アニメーション用のクラス追加
        const menuLines = menuToggle.querySelectorAll('.header__menu-line');
        menuLines.forEach(line => {
            line.classList.toggle('header__menu-line--active');
        });
    });
}

// ===== スムーススクロール =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // モバイルメニューを閉じる
            if (nav && nav.classList.contains('header__nav--active')) {
                nav.classList.remove('header__nav--active');
                menuToggle.classList.remove('header__menu-toggle--active');
                const menuLines = menuToggle.querySelectorAll('.header__menu-line');
                menuLines.forEach(line => {
                    line.classList.remove('header__menu-line--active');
                });
            }
        }
    });
});

// ===== ヘッダーのスクロール効果 =====
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // スクロール方向の検出
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // 下にスクロール - ヘッダーを隠す
        header.style.transform = 'translateY(-100%)';
    } else {
        // 上にスクロール - ヘッダーを表示
        header.style.transform = 'translateY(0)';
    }
    
    // スクロール位置に応じた背景の透明度調整
    if (scrollTop > 50) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop;
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
    const text = `Lift Together - リフト相乗り推進サイト
スキー場への移動とリフト券をシェアして、コストを削減し環境にも優しく！

#LiftTogether #スキー #相乗り #ウィンタースポーツ #環境保護 #コスト削減

https://yousan.github.io/lift-together`;
    
    if (navigator.clipboard && window.isSecureContext) {
        // モダンブラウザでのクリップボードAPI使用
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Instagramでシェアするテキストをコピーしました！', 'success');
        }).catch(() => {
            fallbackCopyTextToClipboard(text);
        });
    } else {
        // フォールバック方法
        fallbackCopyTextToClipboard(text);
    }
}

// ===== フォールバック用のクリップボードコピー =====
function fallbackCopyTextToClipboard(text) {
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
        showNotification('Instagramでシェアするテキストをコピーしました！', 'success');
    } catch (err) {
        showNotification('コピーに失敗しました。手動でテキストを選択してください。', 'error');
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
        }
    });
}, observerOptions);

// アニメーション対象の要素を監視
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.about__feature, .how-it-works__step, .benefits__item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// ===== CTA ボタンのクリックイベント =====
document.querySelectorAll('.hero__cta-button').forEach(button => {
    button.addEventListener('click', function() {
        if (this.textContent.includes('募集を見る')) {
            showNotification('相乗り募集機能は準備中です。しばらくお待ちください。', 'info');
        } else if (this.textContent.includes('募集する')) {
            showNotification('相乗り募集機能は準備中です。しばらくお待ちください。', 'info');
        }
    });
});

// ===== パフォーマンス最適化: 画像の遅延読み込み =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
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