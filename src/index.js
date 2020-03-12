import './reveal/css/reset.css';
import './reveal/css/reveal.css';
import './reveal/css/theme/white.css';
import './styles/index.css';
import Reveal from './reveal/js/reveal';
import {Workbox} from 'workbox-window';
import axios from 'axios';

window.Reveal = Reveal;
window.Reveal.initialize({
  width: '69%',
  height: '80%',
  // 是否在右下角展示控制条
  controls: true,
  // 是否显示演示的进度条
  progress: true,
  // 是否显示当前幻灯片的页数
  slideNumber: true,
  // 是否将每个幻灯片改变加入到浏览器的历史记录中去
  hash: true,
  history: false,
  // 是否启用键盘快捷键来导航
  keyboard: true,
  // 是否启用幻灯片的概览模式
  overview: true,
  // 是否将幻灯片垂直居中
  center: true,
  // 是否在触屏设备上启用触摸导航
  touch: true,
  // 是否循环演示
  loop: false,
  // 是否将演示的方向变成 RTL
  rtl: false,
  // 全局开启和关闭碎片
  fragments: true,
  // 标识演示文稿是否在嵌入模式中运行，即包含在屏幕的有限部分中的
  embedded: false,
  // 标识当问号键被点击的时候是否应该显示一个帮助的覆盖层
  help: true,
  //  两个幻灯片之间自动切换的时间间隔（毫秒），当设置成 0 的时候则禁止自动切换，该值可以被幻灯片上的 ` data-autoslide` 属性覆盖
  autoSlide: 0,
  // 当遇到用户输入的时候停止切换
  autoSlideStoppable: true,
  // 是否启用通过鼠标滚轮来导航幻灯片
  mouseWheel: false,
  //  是否在移动设备上隐藏地址栏
  hideAddressBar: true,
  // 是否在一个弹出的 iframe 中打开幻灯片中的链接
  previewLinks: false,
  // 切换过渡效果
  transition: 'slide', // none/fade/slide/convex/concave/zoom
  // 过渡速度
  transitionSpeed: 'slow', // default/fast/slow
  // 全屏幻灯片背景的过渡效果
  backgroundTransition: 'default', // none/fade/slide/convex/concave/zoom
  // 除当前可见的之外的幻灯片数量
  viewDistance: 3,
  // 视差背景图片
  parallaxBackgroundImage: '', // e.g. "'https://s3.amazonaws.com/hakim-static/reveal-js/reveal-parallax-1.jpg'"
  // 视差背景尺寸
  parallaxBackgroundSize: '', // CSS syntax, e.g. "2100px 900px"
  // 移动视差背景（水平和垂直）滑动变化的数量, 例如100
  parallaxBackgroundHorizontal: '',
  parallaxBackgroundVertical: '',
  dependencies: [
    { src: 'reveal/plugin/markdown/marked.js' },
    { src: 'reveal/plugin/markdown/markdown.js' },
    { src: 'reveal/plugin/notes/notes.js', async: true },
    { src: 'reveal/plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } }
  ]
});

if ('serviceWorker' in navigator) {
  const wb = new Workbox('/service-worker.js');
  wb.register();
}

function addEvent() {
  document.getElementById('reveal').addEventListener('click', function (e) {
    const target = e.target;
    if (target.tagName === 'IMG' && target.hasAttribute('data-test-src')) {
      const testSrc = target.getAttribute('data-test-src');
      const loadSrc = target.getAttribute('data-placeholder-src');
      const src = target.getAttribute('src');
      if (src === loadSrc) {
        target.setAttribute('src', testSrc);
      } else {
        target.setAttribute('src', loadSrc);
      }
    }
    if (target.tagName === 'A' && target.hasAttribute('data-request')) {
      axios.get(target.getAttribute('data-request')).then((res) => {
        if (res.data) console.log(JSON.stringify(res.data))
      }); 
    }
  });
}

addEvent();