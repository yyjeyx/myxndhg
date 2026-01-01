// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化滚动动画
    initScrollAnimations();
    
    // 初始化音乐播放器
    initMusicPlayer();
});

// 滚动动画功能
function initScrollAnimations() {
    const sections = document.querySelectorAll('.section');
    
    // 检查元素是否在视口中
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight * 0.75) &&
            rect.bottom >= 0
        );
    }
    
    // 显示可见的section
    function showVisibleSections() {
        sections.forEach(section => {
            if (isInViewport(section)) {
                section.classList.add('visible');
            }
        });
    }
    
    // 初始检查
    showVisibleSections();
    
    // 滚动时检查
    window.addEventListener('scroll', showVisibleSections);
}

// 音乐播放器功能
function initMusicPlayer() {
    const bgm = document.getElementById('bgm');
    const musicBtn = document.getElementById('music-btn');
    let isPlaying = false;
    let hasInteracted = false;
    let playAttempts = 0;
    const maxPlayAttempts = 5;
    
    // 尝试自动播放音乐（带重试机制）
    function tryPlayMusic() {
        if (playAttempts >= maxPlayAttempts) return;
        playAttempts++;
        
        // 设置音量以提高自动播放成功率
        bgm.volume = 0.1;
        
        console.log('第', playAttempts, '次尝试自动播放音乐');
        
        // 尝试多种播放方式
        function attemptPlay() {
            return bgm.play().catch(error => {
                console.log('自动播放尝试失败:', error);
                // 尝试直接设置currentTime并播放
                bgm.currentTime = 0;
                return bgm.play();
            });
        }
        
        attemptPlay().then(() => {
            isPlaying = true;
            musicBtn.classList.add('playing');
            console.log('音乐自动播放成功');
        }).catch(error => {
            console.log('自动播放失败，等待用户交互:', error);
            // 监听用户交互事件
            if (!hasInteracted) {
                setupInteractionListeners();
            }
            // 1秒后再次尝试
            setTimeout(tryPlayMusic, 1000);
        });
    }
    
    // 设置用户交互监听器（更激进的策略）
    function setupInteractionListeners() {
        // 监听几乎所有可能的用户交互事件
        const events = ['click', 'touchstart', 'keydown', 'scroll', 'mousemove', 
                      'mouseenter', 'wheel', 'touchmove', 'contextmenu', 
                      'focus', 'blur', 'select', 'DOMContentLoaded', 'load',
                      'mouseover', 'mousedown', 'mouseup', 'dblclick',
                      'touchcancel', 'touchend', 'touchleave', 'touchstart',
                      'pointerdown', 'pointermove', 'pointerup', 'pointerleave',
                      'gesturestart', 'gesturechange', 'gestureend'];
        
        function handleInteraction() {
            hasInteracted = true;
            console.log('检测到用户交互，尝试播放音乐');
            
            // 立即尝试播放
            function tryPlay() {
                return bgm.play().then(() => {
                    isPlaying = true;
                    musicBtn.classList.add('playing');
                    console.log('交互后音乐播放成功');
                    // 提高音量
                    setTimeout(() => {
                        bgm.volume = 0.2;
                    }, 500);
                }).catch(error => {
                    console.log('交互后播放失败，100ms后重试:', error);
                    bgm.currentTime = 0;
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            bgm.play().then(resolve).catch(reject);
                        }, 100);
                    });
                });
            }
            
            tryPlay().catch(error => {
                console.log('最终播放失败:', error);
            });
        }
        
        // 添加所有交互事件监听器，使用once: false以持续监听
        events.forEach(event => {
            document.addEventListener(event, handleInteraction, { passive: true });
        });
        
        // 添加窗口焦点事件
        window.addEventListener('focus', handleInteraction, { passive: true });
        
        // 添加页面可见性变化事件
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                handleInteraction();
            }
        }, { passive: true });
    }
    
    // 音乐按钮点击事件
    musicBtn.addEventListener('click', function() {
        hasInteracted = true;
        if (isPlaying) {
            bgm.pause();
            musicBtn.classList.remove('playing');
        } else {
            bgm.play().then(() => {
                isPlaying = true;
                musicBtn.classList.add('playing');
            }).catch(error => {
                console.log('按钮点击播放失败:', error);
                // 尝试重置并播放
                bgm.currentTime = 0;
                bgm.play().then(() => {
                    isPlaying = true;
                    musicBtn.classList.add('playing');
                    console.log('重置后播放成功');
                }).catch(err => {
                    console.log('重置后播放仍失败:', err);
                });
            });
        }
        isPlaying = !isPlaying;
    });
    
    // 立即尝试播放
    tryPlayMusic();
    
    // 页面完全加载后再次尝试
    window.addEventListener('load', tryPlayMusic);
    
    // 监听页面可见性变化，当页面变为可见时尝试播放
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible' && !isPlaying) {
            tryPlayMusic();
        }
    });
    
    // 监听音乐播放状态
    bgm.addEventListener('play', () => {
        isPlaying = true;
        musicBtn.classList.add('playing');
    });
    
    bgm.addEventListener('pause', () => {
        isPlaying = false;
        musicBtn.classList.remove('playing');
    });
    
    // 监听音乐结束事件，自动循环
    bgm.addEventListener('ended', () => {
        bgm.currentTime = 0;
        bgm.play().catch(error => {
            console.log('循环播放失败:', error);
        });
    });
}