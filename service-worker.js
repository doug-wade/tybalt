if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,f)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(i[t])return;let r={};const a=e=>s(e,t),c={module:{uri:t},exports:r,require:a};i[t]=Promise.all(n.map((e=>c[e]||a(e)))).then((e=>(f(...e),r)))}}define(["./workbox-13d8ee68"],(function(e){"use strict";e.setCacheNameDetails({prefix:"eleventy-plugin-pwa-v2"}),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"css/base.css",revision:"2d42e9116679489cc8950582a981ff1f"},{url:"css/index.css",revision:"879260f0a1a89d6ea15da2089f024d68"},{url:"css/page.css",revision:"bd88ef01173d9f335892db78ffbafea8"},{url:"img/favico.png",revision:"c470398c2a6b403059bff6a83bf01bd6"},{url:"index.html",revision:"5688ba89377de9fa449990bec8fc6b36"},{url:"pages/cli/index.html",revision:"fea751cdce636399817803640dca2e35"},{url:"pages/core/index.html",revision:"0411a31a1d22a068abf3d3c755b5e52f"},{url:"pages/eleventy-plugin/index.html",revision:"77188c67f1c9277901bac34bf5c9bf0e"},{url:"pages/esbuild-plugin/index.html",revision:"c68b2093b390e769bf45eaa36ab01bb0"},{url:"pages/eslint-plugin/index.html",revision:"1363168b813f9e6388b8d6bc473e6065"},{url:"pages/new-website-guide/index.html",revision:"87b738c21e8f80362781f08a31400ad7"},{url:"pages/parser/index.html",revision:"e3e060f7af28792aeac6651bae62e4f2"},{url:"pages/styling-your-component-guide/index.html",revision:"b0472bb65c3d149deb4215270124eb64"},{url:"pages/test-utils/index.html",revision:"64a9f3a8ac8b3b408cd57e3c639f66a8"},{url:"pages/validator/index.html",revision:"831ccb5432efa182f563f43a816fda52"},{url:"pages/writing-tests-guide/index.html",revision:"a1665ff0d572cffa226c31a542b6e03f"},{url:"tybalt-out.js",revision:"8d06c316a6f755c8b71fdf7fb29ca202"}],{}),e.registerRoute(/^.*\.(html|jpg|png|gif|webp|ico|svg|woff2|woff|eot|ttf|otf|ttc|json)$/,new e.StaleWhileRevalidate,"GET"),e.registerRoute(/^https?:\/\/fonts\.googleapis\.com\/css/,new e.StaleWhileRevalidate,"GET")}));
//# sourceMappingURL=service-worker.js.map
