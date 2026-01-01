// 2025 · 可爱定格 - Framer Project
// 年度回忆单页滚动网站

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Audio } from "framer";

// 字体导入配置（在Framer项目设置中添加）
// 得意黑 (Smiley Sans)
// 仓耳渔阳体 W03 (CangEr YuYangTi W03)

// 颜色常量
const COLORS = {
  primary: "#FFE6F2", // 泡泡糖粉
  secondary1: "#FFC9E6", // 樱花粉
  secondary2: "#D4FFFC", // 薄荷蓝
  accent1: "#FFAA5C", // 活力橙
  accent2: "#C2FF99", // 嫩芽绿
  text: "#8A5A7A", // 温柔紫棕
};

// 装饰元素组件
const Decoration = ({ type }: { type: string }) => {
  return (
    <div className="decoration">
      {type === "stars" && (
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
          <path d="M50 0L61.8 38.2L100 38.2L68.1 61.8L79.9 100L50 76.4L20.1 100L31.9 61.8L0 38.2L38.2 38.2L50 0Z" fill={COLORS.accent2} opacity="0.5" />
        </svg>
      )}
      {type === "cloud" && (
        <svg width="150" height="80" viewBox="0 0 150 80" fill="none">
          <path d="M10 40C10 28.9543 18.9543 20 30 20C41.0457 20 50 28.9543 50 40H10Z" fill={COLORS.secondary1} opacity="0.7" />
          <path d="M60 40C60 28.9543 68.9543 20 80 20C91.0457 20 100 28.9543 100 40H60Z" fill={COLORS.secondary1} opacity="0.7" />
          <path d="M110 40C110 28.9543 118.954 20 130 20C141.046 20 150 28.9543 150 40H110Z" fill={COLORS.secondary1} opacity="0.7" />
        </svg>
      )}
      {type === "wave" && (
        <svg width="200" height="50" viewBox="0 0 200 50" fill="none">
          <path d="M0 25C25 15 75 35 100 25C125 15 175 35 200 25V50H0V25Z" fill={COLORS.secondary2} opacity="0.6" />
        </svg>
      )}
    </div>
  );
};

// 音乐播放器组件
const MusicPlayer = () => {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(true);

  return (
    <div className="music-player">
      <Audio
        ref={audioRef}
        src="https://d.uguu.se/hLCxccvU.mp3"
        autoPlay
        loop
      />
      <button
        className="music-btn"
        onClick={() => {
          if (audioRef.current) {
            if (isPlaying) {
              audioRef.current.pause();
            } else {
              audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
          }
        }}
      >
        {isPlaying ? "⏸️" : "🎵"}
      </button>
    </div>
  );
};

// 布局组件1：环绕式
const Layout_Wrap = ({ text, image }: { text: string; image: string }) => {
  return (
    <div className="layout-wrap">
      <div className="circular-image">
        <img src={image} alt="回忆图片" />
      </div>
      <div className="circular-text">
        <p>{text}</p>
      </div>
    </div>
  );
};

// 布局组件2：对角呼应式
const Layout_Diagonal = ({ text, image }: { text: string; image: string }) => {
  return (
    <div className="layout-diagonal">
      <div className="top-left-image">
        <img src={image} alt="回忆图片" />
      </div>
      <div className="bottom-right-text">
        <p>{text}</p>
      </div>
    </div>
  );
};

// 布局组件3：出血图注式
const Layout_FullBleed = ({ text, image }: { text: string; image: string }) => {
  return (
    <div className="layout-full-bleed">
      <div className="full-image">
        <img src={image} alt="回忆图片" />
      </div>
      <div className="corner-tag">
        <p>{text}</p>
      </div>
    </div>
  );
};

// 布局组件4：穿插式
const Layout_Interleaved = ({ text, image }: { text: string; image: string }) => {
  return (
    <div className="layout-interleaved">
      <p className="text-part1">{text.split('，')[0]}，</p>
      <div className="image-insert">
        <img src={image} alt="回忆图片" />
      </div>
      <p className="text-part2">{text.split('，')[1]}。</p>
    </div>
  );
};

// 布局组件5：网格破形式
const Layout_GridBreak = ({ text, images }: { text: string; images: string[] }) => {
  return (
    <div className="layout-grid-break">
      <div className="grid-container">
        <div className="grid-item small">
          <img src={images[0]} alt="回忆图片" />
        </div>
        <div className="grid-item small">
          <img src={images[1]} alt="回忆图片" />
        </div>
        <div className="grid-item large">
          <img src={images[2]} alt="回忆图片" />
        </div>
        <div className="grid-item small">
          <img src={images[3]} alt="回忆图片" />
        </div>
      </div>
      <div className="overlay-text">
        <p>{text}</p>
      </div>
    </div>
  );
};

// 布局组件6：侧边注解式
const Layout_Sidebar = ({ text, image }: { text: string; image: string }) => {
  return (
    <div className="layout-sidebar">
      <div className="sidebar-text">
        <p>{text}</p>
      </div>
      <div className="center-image">
        <img src={image} alt="回忆图片" />
      </div>
    </div>
  );
};

// 布局组件7：焦点放射式
const Layout_Radial = ({ title, text, images }: { title: string; text: string; images: string[] }) => {
  return (
    <div className="layout-radial">
      <div className="center-title">
        <h2>{title}</h2>
      </div>
      <div className="radial-text">
        <p>{text}</p>
      </div>
      <div className="surround-images">
        {images.map((image, index) => (
          <div key={index} className={`surround-image img-${index + 1}`}>
            <img src={image} alt="回忆图片" />
          </div>
        ))}
      </div>
    </div>
  );
};

// 布局组件8：动态错层式
const Layout_Parallax = ({ text, image }: { text: string; image: string }) => {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 30]);

  return (
    <div className="layout-parallax">
      <motion.div className="parallax-background" style={{ y: backgroundY }}>
        <Decoration type="stars" />
        <Decoration type="cloud" />
      </motion.div>
      <motion.div className="parallax-text" style={{ y: textY }}>
        <p>{text}</p>
      </motion.div>
      <motion.div className="parallax-image" style={{ y: imageY }}>
        <img src={image} alt="回忆图片" />
      </motion.div>
    </div>
  );
};

// 页面组件
const Page = ({ children, index }: { children: React.ReactNode; index: number }) => {
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: index * 0.1,
      },
    },
  };

  return (
    <motion.div
      className="page"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

// 主应用组件
const App = () => {
  // 10句哲理文案
  const quotes = [
    "真正的旅程，始于你决定成为自己地图的绘制者。",
    "有些人无需寻找，他们会在对的季节，轻轻叩响你的门。",
    "最珍贵的宝藏，通常埋藏在最不起眼的日子下面。",
    "快乐是专心咬下第一口苹果时，听见的那一声清脆。",
    "时间不是刻刀，而是流水。它带走了沙砾，却把最美的石头，打磨得日益温润。",
    "今天这一页，天气晴。主角是你，情节待续。",
    "不必追问终点。路上捡到的星光，往往比目的地的灯塔更亮。",
    "此心安处，便是吾乡。走了千里万里，不过是寻找那盏让自己心安的灯火。",
    "真正的春天，在你愿意相信泥土下会有新芽的那一刻，就已经到了。",
    "过去已装订成册，未来还是空白文档。只有此刻，光标闪烁，等待输入。"
  ];

  // 图片占位符
  const placeholderImages = Array.from({ length: 15 }, (_, i) => 
    `./assets/photos/photo_${(i + 1).toString().padStart(2, '0')}.jpg`
  );

  return (
    <div className="app">
      <MusicPlayer />
      
      {/* 封面页 */}
      <Page index={0}>
        <div className="cover-page">
          <Decoration type="cloud" />
          <Decoration type="wave" />
          <h1 className="main-title">2025 · 可爱定格</h1>
          <p className="subtitle">嘿，这是你的2025！</p>
          <Decoration type="stars" />
        </div>
      </Page>

      {/* 引言页 */}
      <Page index={1}>
        <div className="intro-page">
          <p className="intro-text">
            用一些可爱的视角，收藏了一整年的晴天、雨天和傻笑的一天。
          </p>
          <Decoration type="wave" />
        </div>
      </Page>

      {/* 第1页：环绕式 */}
      <Page index={2}>
        <Layout_Wrap 
          text={quotes[0]} 
          image={placeholderImages[0]} 
        />
      </Page>

      {/* 第2页：对角呼应式 */}
      <Page index={3}>
        <Layout_Diagonal 
          text={quotes[1]} 
          image={placeholderImages[1]} 
        />
      </Page>

      {/* 第3页：出血图注式 */}
      <Page index={4}>
        <Layout_FullBleed 
          text={quotes[2]} 
          image={placeholderImages[2]} 
        />
      </Page>

      {/* 第4页：穿插式 */}
      <Page index={5}>
        <Layout_Interleaved 
          text={quotes[3]} 
          image={placeholderImages[3]} 
        />
      </Page>

      {/* 第5页：网格破形式 */}
      <Page index={6}>
        <Layout_GridBreak 
          text={quotes[4]} 
          images={placeholderImages.slice(4, 8)} 
        />
      </Page>

      {/* 第6页：侧边注解式 */}
      <Page index={7}>
        <Layout_Sidebar 
          text={quotes[5]} 
          image={placeholderImages[8]} 
        />
      </Page>

      {/* 第7页：焦点放射式 */}
      <Page index={8}>
        <Layout_Radial 
          title="星光点点" 
          text={quotes[6]} 
          images={placeholderImages.slice(9, 13)} 
        />
      </Page>

      {/* 第8页：动态错层式 */}
      <Page index={9}>
        <Layout_Parallax 
          text={quotes[7]} 
          image={placeholderImages[13]} 
        />
      </Page>

      {/* 第9页：再次使用不同的环绕式变体 */}
      <Page index={10}>
        <Layout_Wrap 
          text={quotes[8]} 
          image={placeholderImages[14]} 
        />
      </Page>

      {/* 第10页：再次使用不同的出血图注式变体 */}
      <Page index={11}>
        <Layout_FullBleed 
          text={quotes[9]} 
          image={placeholderImages[0]} 
        />
      </Page>

      {/* 最终祝福页 */}
      <Page index={12}>
        <div className="blessing-page">
          <div className="blessing-decoration">
            <Decoration type="stars" />
            <Decoration type="cloud" />
          </div>
          <h2 className="blessing-title">那么，2026请多指教啦！</h2>
          <div className="blessing-text">
            <p>愿新年的风，依旧偏爱你的方向。愿你的路上，常有花香，偶有星光，永远有奔赴热爱的勇气。</p>
          </div>
        </div>
      </Page>
    </div>
  );
};

// 全局样式
const globalStyle = `
  /* 导入字体 */
  @font-face {
    font-family: 'Smiley Sans';
    src: url('./assets/fonts/SmileySans-Oblique.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  
  @font-face {
    font-family: 'CangEr YuYangTi W03';
    src: url('./assets/fonts/CangErYuYangTi-W03.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  
  /* 基础样式 */
  body {
    margin: 0;
    padding: 0;
    background-color: ${COLORS.primary};
    color: ${COLORS.text};
    font-family: 'CangEr YuYangTi W03', 'HarmonyOS Sans SC', sans-serif;
    overflow-x: hidden;
  }
  
  .app {
    width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  /* 页面样式 */
  .page {
    width: 100vw;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 50px 20px;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
  }
  
  /* 音乐播放器样式 */
  .music-player {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
  }
  
  .music-btn {
    background-color: ${COLORS.secondary1};
    border: none;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    font-size: 28px;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(255, 201, 230, 0.6);
    transition: all 0.3s ease;
  }
  
  .music-btn:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(255, 201, 230, 0.8);
  }
  
  /* 标题样式 */
  .main-title {
    font-family: 'Smiley Sans', cursive;
    font-size: 5rem;
    color: ${COLORS.text};
    margin: 0;
    text-align: center;
    line-height: 1.2;
  }
  
  .subtitle {
    font-size: 1.8rem;
    color: ${COLORS.text};
    margin-top: 20px;
    text-align: center;
  }
  
  /* 布局样式 */
  
  /* 环绕式布局 */
  .layout-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .circular-image {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 8px 25px rgba(255, 201, 230, 0.5);
  }
  
  .circular-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .circular-text {
    position: absolute;
    width: 450px;
    height: 450px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .circular-text p {
    font-family: 'Smiley Sans', cursive;
    font-size: 1.5rem;
    color: ${COLORS.text};
    text-align: center;
    width: 200px;
  }
  
  /* 对角呼应式布局 */
  .layout-diagonal {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: space-between;
  }
  
  .top-left-image {
    position: absolute;
    top: 10%;
    left: 10%;
    width: 400px;
    height: 300px;
    box-shadow: 0 8px 25px rgba(255, 201, 230, 0.5);
    border-radius: 20px;
    overflow: hidden;
  }
  
  .top-left-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .bottom-right-text {
    position: absolute;
    bottom: 15%;
    right: 10%;
    width: 450px;
  }
  
  .bottom-right-text p {
    font-family: 'Smiley Sans', cursive;
    font-size: 1.8rem;
    color: ${COLORS.text};
    line-height: 1.6;
  }
  
  /* 出血图注式布局 */
  .layout-full-bleed {
    position: relative;
    width: 100%;
    height: 100%;
  }
  
  .full-image {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  
  .full-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .corner-tag {
    position: absolute;
    bottom: 50px;
    right: 50px;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 20px 30px;
    border-radius: 20px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
  
  .corner-tag p {
    font-family: 'Smiley Sans', cursive;
    font-size: 1.5rem;
    color: ${COLORS.text};
    margin: 0;
  }
  
  /* 穿插式布局 */
  .layout-interleaved {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
  }
  
  .text-part1, .text-part2 {
    font-family: 'Smiley Sans', cursive;
    font-size: 2rem;
    color: ${COLORS.text};
    margin: 0;
  }
  
  .image-insert {
    width: 350px;
    height: 250px;
    box-shadow: 0 8px 25px rgba(255, 201, 230, 0.5);
    border-radius: 20px;
    overflow: hidden;
    transform: rotate(-5deg);
  }
  
  .image-insert img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  /* 网格破形式布局 */
  .layout-grid-break {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 20px;
    width: 80%;
    height: 70%;
  }
  
  .grid-item {
    box-shadow: 0 8px 25px rgba(255, 201, 230, 0.5);
    border-radius: 15px;
    overflow: hidden;
  }
  
  .grid-item.small {
    grid-column: span 1;
    grid-row: span 1;
  }
  
  .grid-item.large {
    grid-column: span 2;
    grid-row: span 2;
    transform: scale(1.1);
    z-index: 10;
  }
  
  .grid-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .overlay-text {
    position: absolute;
    top: 20%;
    right: 10%;
    width: 300px;
  }
  
  .overlay-text p {
    font-family: 'Smiley Sans', cursive;
    font-size: 1.8rem;
    color: ${COLORS.text};
    line-height: 1.6;
  }
  
  /* 侧边注解式布局 */
  .layout-sidebar {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 50px;
  }
  
  .sidebar-text {
    width: 150px;
    padding: 0 20px;
  }
  
  .sidebar-text p {
    font-family: 'Smiley Sans', cursive;
    font-size: 1.2rem;
    color: ${COLORS.text};
    writing-mode: vertical-rl;
    text-orientation: mixed;
    line-height: 2.5;
  }
  
  .center-image {
    width: 500px;
    height: 400px;
    box-shadow: 0 8px 25px rgba(255, 201, 230, 0.5);
    border-radius: 20px;
    overflow: hidden;
  }
  
  .center-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  /* 焦点放射式布局 */
  .layout-radial {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .center-title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 20;
  }
  
  .center-title h2 {
    font-family: 'Smiley Sans', cursive;
    font-size: 3rem;
    color: ${COLORS.text};
    margin: 0;
    text-align: center;
  }
  
  .radial-text {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
    width: 600px;
    text-align: center;
  }
  
  .radial-text p {
    font-size: 1.3rem;
    color: ${COLORS.text};
    line-height: 1.8;
  }
  
  .surround-images {
    position: relative;
    width: 100%;
    height: 100%;
  }
  
  .surround-image {
    width: 200px;
    height: 150px;
    box-shadow: 0 8px 25px rgba(255, 201, 230, 0.5);
    border-radius: 15px;
    overflow: hidden;
    position: absolute;
  }
  
  .surround-image.img-1 {
    top: 10%;
    left: 10%;
  }
  
  .surround-image.img-2 {
    top: 10%;
    right: 10%;
  }
  
  .surround-image.img-3 {
    bottom: 10%;
    left: 15%;
  }
  
  .surround-image.img-4 {
    bottom: 10%;
    right: 15%;
  }
  
  .surround-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  /* 动态错层式布局 */
  .layout-parallax {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  
  .parallax-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  
  .parallax-text {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
    width: 600px;
    text-align: center;
    z-index: 3;
  }
  
  .parallax-text p {
    font-family: 'Smiley Sans', cursive;
    font-size: 2rem;
    color: ${COLORS.text};
    line-height: 1.8;
  }
  
  .parallax-image {
    position: absolute;
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);
    width: 400px;
    height: 300px;
    box-shadow: 0 8px 25px rgba(255, 201, 230, 0.5);
    border-radius: 20px;
    overflow: hidden;
    z-index: 2;
  }
  
  .parallax-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  /* 封面页样式 */
  .cover-page {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  
  .cover-page .decoration {
    position: absolute;
  }
  
  .cover-page .decoration:nth-child(1) {
    top: 10%;
    left: 10%;
  }
  
  .cover-page .decoration:nth-child(2) {
    bottom: 20%;
    left: 50%;
    transform: translateX(-50%);
  }
  
  .cover-page .decoration:nth-child(4) {
    top: 20%;
    right: 10%;
  }
  
  /* 引言页样式 */
  .intro-page {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  
  .intro-text {
    font-family: 'Smiley Sans', cursive;
    font-size: 2.5rem;
    color: ${COLORS.text};
    text-align: center;
    width: 800px;
    line-height: 1.8;
    margin-bottom: 50px;
  }
  
  /* 祝福页样式 */
  .blessing-page {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    background-color: ${COLORS.secondary1};
  }
  
  .blessing-decoration {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  
  .blessing-title {
    font-family: 'Smiley Sans', cursive;
    font-size: 3.5rem;
    color: ${COLORS.text};
    margin-bottom: 50px;
    z-index: 2;
  }
  
  .blessing-text {
    width: 700px;
    text-align: center;
    z-index: 2;
  }
  
  .blessing-text p {
    font-family: 'CangEr YuYangTi W03', 'HarmonyOS Sans SC', sans-serif;
    font-size: 1.6rem;
    color: ${COLORS.text};
    line-height: 2.2;
  }
  
  /* 装饰元素样式 */
  .decoration {
    position: absolute;
    opacity: 0.7;
  }
  
  /* 响应式设计 */
  @media (max-width: 768px) {
    .main-title {
      font-size: 3rem;
    }
    
    .subtitle {
      font-size: 1.3rem;
    }
    
    .page {
      padding: 30px 15px;
    }
    
    /* 简化移动端布局 */
    .layout-wrap, .layout-diagonal, .layout-full-bleed, .layout-interleaved, .layout-grid-break, .layout-sidebar, .layout-radial, .layout-parallax {
      flex-direction: column;
      gap: 20px;
    }
    
    .circular-image {
      width: 200px;
      height: 200px;
    }
    
    .circular-text {
      width: 100%;
      height: auto;
    }
    
    .circular-text p {
      font-size: 1.2rem;
      width: 100%;
    }
    
    .top-left-image, .bottom-right-text, .corner-tag, .image-insert, .center-image, .grid-container, .sidebar-text, .radial-text, .parallax-text, .intro-text, .blessing-text {
      position: static;
      width: 100%;
      max-width: 100%;
      transform: none;
    }
    
    .sidebar-text p {
      writing-mode: horizontal-tb;
      text-orientation: initial;
    }
    
    .grid-container {
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(3, 1fr);
      height: auto;
    }
    
    .grid-item.large {
      grid-column: span 2;
      grid-row: span 1;
      transform: none;
    }
    
    .surround-image {
      width: 120px;
      height: 90px;
    }
  }
`;

export default App;
