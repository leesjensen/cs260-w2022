(function(){"use strict";var e={3554:function(e,n,t){t(6992),t(8674),t(9601),t(7727);var r=t(9567),o=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"app"}},[t("h1",[e._v("PWA Demo")]),t("div",{staticClass:"chooser"},[e._m(0),t("input",{attrs:{id:"file-upload",type:"file",accept:"image/x-png,image/jpeg,image/gif"},on:{change:e.upload}})]),e._m(1),t("BouncyBall")],1)},i=[function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("label",{staticClass:"custom-file-upload",attrs:{for:"file-upload"}},[t("i",{staticClass:"fa fa-cloud-upload"}),e._v(" Capture Image ")])},function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"img-viewer"},[t("img",{attrs:{src:"",id:"preview"}})])}],u=function(){var e=this,n=e.$createElement;e._self._c;return e._m(0)},a=[function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"bouncing-ball"},[t("div",{attrs:{id:"ball"}}),t("div",{attrs:{id:"ground"}}),t("div",{attrs:{id:"shadow"}})])}],c={name:"BouncyBall"},l=c,s=t(1001),f=(0,s.Z)(l,u,a,!1,null,"0272e188",null),d=f.exports,p={name:"App",components:{BouncyBall:d},methods:{upload:function(){var e,n=document.querySelector("#file-upload");if((null===n||void 0===n||null===(e=n.files)||void 0===e?void 0:e.length)>0){var t=new FileReader;t.readAsDataURL(n.files[0]),t.onload=function(){var e=document.querySelector("img");e.setAttribute("src",t.result)}}}}},v=p,g=(0,s.Z)(v,o,i,!1,null,null,null),h=g.exports,m=t(563);(0,m.z)("".concat("/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}}),r.Z.config.productionTip=!1,new r.Z({render:function(e){return e(h)}}).$mount("#app")}},n={};function t(r){var o=n[r];if(void 0!==o)return o.exports;var i=n[r]={exports:{}};return e[r](i,i.exports,t),i.exports}t.m=e,function(){var e=[];t.O=function(n,r,o,i){if(!r){var u=1/0;for(s=0;s<e.length;s++){r=e[s][0],o=e[s][1],i=e[s][2];for(var a=!0,c=0;c<r.length;c++)(!1&i||u>=i)&&Object.keys(t.O).every((function(e){return t.O[e](r[c])}))?r.splice(c--,1):(a=!1,i<u&&(u=i));if(a){e.splice(s--,1);var l=o();void 0!==l&&(n=l)}}return n}i=i||0;for(var s=e.length;s>0&&e[s-1][2]>i;s--)e[s]=e[s-1];e[s]=[r,o,i]}}(),function(){t.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(n,{a:n}),n}}(),function(){t.d=function(e,n){for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)}}(),function(){var e={143:0};t.O.j=function(n){return 0===e[n]};var n=function(n,r){var o,i,u=r[0],a=r[1],c=r[2],l=0;if(u.some((function(n){return 0!==e[n]}))){for(o in a)t.o(a,o)&&(t.m[o]=a[o]);if(c)var s=c(t)}for(n&&n(r);l<u.length;l++)i=u[l],t.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return t.O(s)},r=self["webpackChunkvue_pwa"]=self["webpackChunkvue_pwa"]||[];r.forEach(n.bind(null,0)),r.push=n.bind(null,r.push.bind(r))}();var r=t.O(void 0,[998],(function(){return t(3554)}));r=t.O(r)})();
//# sourceMappingURL=app-legacy.0ea529ea.js.map