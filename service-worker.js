if(!self.define){let e,i={};const d=(d,s)=>(d=new URL(d+".js",s).href,i[d]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=d,e.onload=i,document.head.appendChild(e)}else e=d,importScripts(d),i()})).then((()=>{let e=i[d];if(!e)throw new Error(`Module ${d} didn’t register its module`);return e})));self.define=(s,n)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(i[c])return;let r={};const t=e=>d(e,c),l={module:{uri:c},exports:r,require:t};i[c]=Promise.all(s.map((e=>l[e]||t(e)))).then((e=>(n(...e),r)))}}define(["./workbox-3598fb27"],(function(e){"use strict";e.setCacheNameDetails({prefix:"tybalt-website"}),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"built-with-tybalt/index.html",revision:"bbb5adca69c408fdc2c6e872b90c1f1d"},{url:"css/base.css",revision:"26ee631d0513b1db455e779f1ca05c39"},{url:"css/index.css",revision:"51b36193246f99ba57c08743952d87d7"},{url:"css/page.css",revision:"3208e65ad1d8a3e288ddd297d068e9e4"},{url:"guides/building/index.html",revision:"e514d43a17eda2428e7d490c05287a62"},{url:"guides/custom-validator/index.html",revision:"a0c02d25808b8bd72b819f2a37c4d940"},{url:"guides/data-fetching/index.html",revision:"b6572e8dbde89253dfd3ac33e447b60f"},{url:"guides/events/index.html",revision:"e14c9356851d44dd641039f1dfd71a99"},{url:"guides/linting/index.html",revision:"9d2fa193056839eb5929a046a19cc13e"},{url:"guides/new-website/index.html",revision:"ea8ffad83d2cfecbf2ec1833d39c3908"},{url:"guides/props/index.html",revision:"029737040fecf8e18a555f57ddb9b359"},{url:"guides/slots/index.html",revision:"494d8abe77a88eb7c464d9e038b29078"},{url:"guides/styling-your-component/index.html",revision:"ecf293b5a76223dac86b82630dcbc465"},{url:"guides/writing-tests/index.html",revision:"e7ee4590df21582662141eca55a8eaec"},{url:"img/favico.png",revision:"c470398c2a6b403059bff6a83bf01bd6"},{url:"index.html",revision:"0e8fce61d942a4469eb25e94e1f7dcc4"},{url:"manifest.json",revision:"38c770c4262265dd11c5260add7da74a"},{url:"pages/cli/index.html",revision:"59db56aa5af5b6e31a776913eefcbc25"},{url:"pages/core/index.html",revision:"b15cf7d3c73929934053217bfa232d7b"},{url:"pages/eleventy-plugin/index.html",revision:"ce7cab8c4c87d02fee654c88086f0fad"},{url:"pages/esbuild-plugin/index.html",revision:"39ac21e00696e06711efd99f87493777"},{url:"pages/eslint-plugin/index.html",revision:"3b27f82470cd2246c1ab0c34526e6075"},{url:"pages/parser/index.html",revision:"8ae71ee88d2cdf0a7c4aecd1e7633313"},{url:"pages/reactive/index.html",revision:"3a3c68575ec1c0e66d1e22003fb9168d"},{url:"pages/test-utils/index.html",revision:"d9b2b7fcee89a2ac91718f119758ae3b"},{url:"pages/validator/index.html",revision:"bebd91164b7efafa2c18afe2e6989448"},{url:"tybalt-out.js",revision:"c63573e4458e85d94e9450ca5fd02d72"}],{}),e.registerRoute(/\/$/,new e.NetworkFirst,"GET"),e.registerRoute(/\.html$/,new e.NetworkFirst,"GET"),e.registerRoute(/^.*\.(jpg|png|mp4|gif|webp|ico|svg|woff2|woff|eot|ttf|otf|ttc|json)$/,new e.StaleWhileRevalidate,"GET")}));
//# sourceMappingURL=service-worker.js.map
