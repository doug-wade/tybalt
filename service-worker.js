if(!self.define){let e,i={};const s=(s,d)=>(s=new URL(s+".js",d).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(d,n)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(i[a])return;let r={};const t=e=>s(e,a),l={module:{uri:a},exports:r,require:t};i[a]=Promise.all(d.map((e=>l[e]||t(e)))).then((e=>(n(...e),r)))}}define(["./workbox-9e5e4d1e"],(function(e){"use strict";e.setCacheNameDetails({prefix:"eleventy-plugin-pwa-v2"}),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"css/base.css",revision:"2d42e9116679489cc8950582a981ff1f"},{url:"css/index.css",revision:"879260f0a1a89d6ea15da2089f024d68"},{url:"css/page.css",revision:"bd88ef01173d9f335892db78ffbafea8"},{url:"img/favico.png",revision:"c470398c2a6b403059bff6a83bf01bd6"},{url:"index.html",revision:"5688ba89377de9fa449990bec8fc6b36"},{url:"pages/building-guide/index.html",revision:"128f9c2501a9c8ed6b5693b908606154"},{url:"pages/cli/index.html",revision:"fea751cdce636399817803640dca2e35"},{url:"pages/core/index.html",revision:"068eb22d5e5a4c3b3b18bd1cfd7d4443"},{url:"pages/custom-validator-guide/index.html",revision:"c4eb08b1a5a611b0dd30dd21d71e7b25"},{url:"pages/data-fetching-guide/index.html",revision:"1e26bdb633bb412a55fc521e682a64f8"},{url:"pages/eleventy-plugin/index.html",revision:"d8034da2dec87f9e551e574f646871f6"},{url:"pages/esbuild-plugin/index.html",revision:"c68b2093b390e769bf45eaa36ab01bb0"},{url:"pages/eslint-plugin/index.html",revision:"1ab591e9395d671608a3d7719d42388c"},{url:"pages/events-guide/index.html",revision:"735bf0317744e2ece77619beabe39a24"},{url:"pages/linting-guide/index.html",revision:"81ae0f1e8b6a08b730584f40e76bae11"},{url:"pages/new-website-guide/index.html",revision:"dd734bc22a6e4ac5e54ee8085344d30c"},{url:"pages/parser/index.html",revision:"30a55292cd22b5c86c5738323900a955"},{url:"pages/props-guide/index.html",revision:"55d1c91ba40de56a29cc4c968f65e090"},{url:"pages/slots-guide/index.html",revision:"09bb2e2b62524688079f027557247cac"},{url:"pages/styling-your-component-guide/index.html",revision:"b0472bb65c3d149deb4215270124eb64"},{url:"pages/test-utils/index.html",revision:"64a9f3a8ac8b3b408cd57e3c639f66a8"},{url:"pages/validator/index.html",revision:"4e7299efdfc6340739f03acbffa8abd5"},{url:"pages/writing-tests-guide/index.html",revision:"a1665ff0d572cffa226c31a542b6e03f"},{url:"tybalt-out.js",revision:"b2ed3e926e40a78232010e0d866e1e40"}],{}),e.registerRoute(/^.*\.(html|jpg|png|gif|webp|ico|svg|woff2|woff|eot|ttf|otf|ttc|json)$/,new e.StaleWhileRevalidate,"GET"),e.registerRoute(/^https?:\/\/fonts\.googleapis\.com\/css/,new e.StaleWhileRevalidate,"GET")}));
//# sourceMappingURL=service-worker.js.map
