if(!self.define){let e,i={};const d=(d,s)=>(d=new URL(d+".js",s).href,i[d]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=d,e.onload=i,document.head.appendChild(e)}else e=d,importScripts(d),i()})).then((()=>{let e=i[d];if(!e)throw new Error(`Module ${d} didn’t register its module`);return e})));self.define=(s,n)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(i[a])return;let r={};const t=e=>d(e,a),c={module:{uri:a},exports:r,require:t};i[a]=Promise.all(s.map((e=>c[e]||t(e)))).then((e=>(n(...e),r)))}}define(["./workbox-3598fb27"],(function(e){"use strict";e.setCacheNameDetails({prefix:"tybalt-website"}),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"built-with-tybalt/index.html",revision:"508e8d5cd5d317cdb02ac58608e961a5"},{url:"css/base.css",revision:"26ee631d0513b1db455e779f1ca05c39"},{url:"css/index.css",revision:"51b36193246f99ba57c08743952d87d7"},{url:"css/page.css",revision:"3208e65ad1d8a3e288ddd297d068e9e4"},{url:"guides/building/index.html",revision:"66bad744e30897e9f153b8630832f9e5"},{url:"guides/custom-validator/index.html",revision:"f265b7586d49f03139dd8563a67cd7d3"},{url:"guides/data-fetching/index.html",revision:"30735af98a46ff76dbd5d2c6881bf8fc"},{url:"guides/events/index.html",revision:"704890747a93754aec37df7edecda2ef"},{url:"guides/linting/index.html",revision:"f6ce35715fd0ada6140c25ed801a7aa4"},{url:"guides/new-website/index.html",revision:"5454e862f01e8037f5fbc1e8587e6740"},{url:"guides/props/index.html",revision:"c025388c34e58920879a9392a81b8eb4"},{url:"guides/slots/index.html",revision:"3151cffbc5cea6431f2ca04b49387a18"},{url:"guides/styling-your-component/index.html",revision:"f52ac53d7c8a6698d3154550dd66311c"},{url:"guides/writing-tests/index.html",revision:"33eb46e0d5f733ba18a32fb3eafd7d99"},{url:"img/favico.png",revision:"c470398c2a6b403059bff6a83bf01bd6"},{url:"index.html",revision:"26d1221af8cd90400c9463dc631f68fd"},{url:"manifest.json",revision:"38c770c4262265dd11c5260add7da74a"},{url:"pages/cli/index.html",revision:"415f4cfa675f8afab54ed629f501688c"},{url:"pages/core/index.html",revision:"175c15aae7e91d6ef2f0a9178f1f0bb1"},{url:"pages/eleventy-plugin/index.html",revision:"ef9c622d714bed413cd6b100f18c7aed"},{url:"pages/esbuild-plugin/index.html",revision:"9bc7fa0565f08c66be5c63170c05d784"},{url:"pages/eslint-plugin/index.html",revision:"a6bc4f2a75532c2a2e4f88c73a4dcebf"},{url:"pages/parser/index.html",revision:"6f20089095fa8a07f36ed1c5986e3cd3"},{url:"pages/reactive/index.html",revision:"1abfdbca83f22cee5aad3c7765acf93d"},{url:"pages/test-utils/index.html",revision:"c10aa297df072fd2e5131357ab981bd9"},{url:"pages/validator/index.html",revision:"d970a28a22562aa65baf1e234910514f"},{url:"tybalt-out.js",revision:"c63573e4458e85d94e9450ca5fd02d72"}],{}),e.registerRoute(/\/$/,new e.NetworkFirst,"GET"),e.registerRoute(/\.html$/,new e.NetworkFirst,"GET"),e.registerRoute(/^.*\.(jpg|png|mp4|gif|webp|ico|svg|woff2|woff|eot|ttf|otf|ttc|json)$/,new e.StaleWhileRevalidate,"GET")}));
//# sourceMappingURL=service-worker.js.map
