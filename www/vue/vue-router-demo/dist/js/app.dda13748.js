(function(){"use strict";var t={28:function(t,e,n){var r=n(3796);class o{constructor(){this._user=o.loggedOutUser,this._authorized=!1}get authorized(){return this._authorized}get user(){return this._user}set user(t){this._authorized=!0,this._user=t}}(0,r.Z)(o,"loggedOutUser","logged out");const u=new o;e["Z"]=u},936:function(t,e,n){var r=n(8935),o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("div",[t._v("User: "+t._s(t.auth.user))]),n("nav",[n("router-link",{attrs:{to:"/"}},[t._v("Home")]),t._v(" | "),n("router-link",{attrs:{to:"/info/company"}},[t._v("Company")]),t._v(" | "),n("router-link",{attrs:{to:"/info/product"}},[t._v("Product")]),t._v(" | "),n("router-link",{attrs:{to:{name:"posts",params:{userId:t.auth.user}}}},[t._v(" User ")]),t._v(" | "),n("router-link",{attrs:{to:"/bad/path"}},[t._v("404")])],1),n("router-view"),n("pre",[t._v(t._s(t.routeInfo))])],1)},u=[],a=n(28),i={name:"App",data:function(){return{auth:a.Z}},computed:{routeInfo(){const t=this.$route,e={name:t.name,fullPath:t.fullPath,params:t.params,matched:t.matched.map((t=>({path:t.path,component:t.components.default.name})))};return JSON.stringify(e,void 0,2)}}},s=i,l=n(1001),c=(0,l.Z)(s,o,u,!1,null,null,null),f=c.exports,p=n(688);new r.Z({router:p.Z,render:t=>t(f)}).$mount("#app")},688:function(t,e,n){n.d(e,{Z:function(){return Q}});var r=n(8935),o=n(2809),u=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"home"},[n("OutputBox",{attrs:{msg:"Our house"}})],1)},a=[],i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{style:{background:t.color}},[t._t("default",(function(){return[n("h1",[t._v(t._s(t.msg))])]}))],2)},s=[],l={name:"HelloWorld",props:{color:{type:String,default:"#525d75"},msg:String}},c=l,f=n(1001),p=(0,f.Z)(c,i,s,!1,null,"f312ba3e",null),d=p.exports,m={name:"HomeView",components:{OutputBox:d}},v=m,h=(0,f.Z)(v,u,a,!1,null,null,null),g=h.exports,_=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"info"},[n("OutputBox",{attrs:{color:"#096b09",msg:t.$route.params.category+" info"}})],1)},b=[],y={name:"InfoView",components:{OutputBox:d}},O=y,w=(0,f.Z)(O,_,b,!1,null,null,null),x=w.exports,k=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("OutputBox",{attrs:{color:"#0f5694",msg:"User "+t.$route.params.userId}}),n("nav",[n("router-link",{attrs:{to:{name:"posts"}}},[t._v("Posts")]),t._v(" | "),n("router-link",{attrs:{to:{name:"profile"}}},[t._v("Profile")])],1),n("transition",{attrs:{name:"fade"}},[n("router-view")],1)],1)},E=[],Z=n(28),C={name:"UserView",props:["userId"],beforeRouteEnter:(t,e,n)=>{Z.Z.authorized?n():n("/login")},components:{OutputBox:d}},B=C,P=(0,f.Z)(B,k,E,!1,null,"74002fae",null),$=P.exports,j=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("OutputBox",{attrs:{color:"#8b1877",msg:t.userId+" posts"}})],1)},I=[],S={name:"UserPostsView",props:["userId"],components:{OutputBox:d}},A=S,N=(0,f.Z)(A,j,I,!1,null,null,null),T=N.exports,U=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("OutputBox",{attrs:{color:"#188b77",msg:t.$route.params.userId+" profile"}})],1)},F=[],V={name:"UserProfileView",props:["userId"],components:{OutputBox:d}},z=V,L=(0,f.Z)(z,U,F,!1,null,null,null),H=L.exports,M=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"not-found"},[n("OutputBox",{attrs:{color:"#910b0b",msg:"404: "+t.$route.fullPath}})],1)},q=[],D={name:"NotFoundView",components:{OutputBox:d}},J=D,K=(0,f.Z)(J,M,q,!1,null,null,null),R=K.exports;r.Z.use(o.Z);const W=[{path:"/",component:g},{path:"/info/:category",component:x},{path:"/login",component:()=>n.e(997).then(n.bind(n,9997))},{path:"/user/:userId",name:"user",props:!0,component:$,children:[{path:"profile",name:"profile",props:!0,component:H},{path:"posts",name:"posts",props:!0,component:T}]},{path:"*",name:"notFound",component:R}],G=new o.Z({mode:"history",base:window.location.pathname.replace(/\/+$/,""),routes:W});var Q=G}},e={};function n(r){var o=e[r];if(void 0!==o)return o.exports;var u=e[r]={exports:{}};return t[r](u,u.exports,n),u.exports}n.m=t,function(){var t=[];n.O=function(e,r,o,u){if(!r){var a=1/0;for(c=0;c<t.length;c++){r=t[c][0],o=t[c][1],u=t[c][2];for(var i=!0,s=0;s<r.length;s++)(!1&u||a>=u)&&Object.keys(n.O).every((function(t){return n.O[t](r[s])}))?r.splice(s--,1):(i=!1,u<a&&(a=u));if(i){t.splice(c--,1);var l=o();void 0!==l&&(e=l)}}return e}u=u||0;for(var c=t.length;c>0&&t[c-1][2]>u;c--)t[c]=t[c-1];t[c]=[r,o,u]}}(),function(){n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,{a:e}),e}}(),function(){n.d=function(t,e){for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})}}(),function(){n.f={},n.e=function(t){return Promise.all(Object.keys(n.f).reduce((function(e,r){return n.f[r](t,e),e}),[]))}}(),function(){n.u=function(t){return"js/"+t+".0b9f8e9f.js"}}(),function(){n.miniCssF=function(t){return"css/"+t+".71d42162.css"}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={},e="vue-router-demo:";n.l=function(r,o,u,a){if(t[r])t[r].push(o);else{var i,s;if(void 0!==u)for(var l=document.getElementsByTagName("script"),c=0;c<l.length;c++){var f=l[c];if(f.getAttribute("src")==r||f.getAttribute("data-webpack")==e+u){i=f;break}}i||(s=!0,i=document.createElement("script"),i.charset="utf-8",i.timeout=120,n.nc&&i.setAttribute("nonce",n.nc),i.setAttribute("data-webpack",e+u),i.src=r),t[r]=[o];var p=function(e,n){i.onerror=i.onload=null,clearTimeout(d);var o=t[r];if(delete t[r],i.parentNode&&i.parentNode.removeChild(i),o&&o.forEach((function(t){return t(n)})),e)return e(n)},d=setTimeout(p.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=p.bind(null,i.onerror),i.onload=p.bind(null,i.onload),s&&document.head.appendChild(i)}}}(),function(){n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){n.p=""}(),function(){var t=function(t,e,n,r){var o=document.createElement("link");o.rel="stylesheet",o.type="text/css";var u=function(u){if(o.onerror=o.onload=null,"load"===u.type)n();else{var a=u&&("load"===u.type?"missing":u.type),i=u&&u.target&&u.target.href||e,s=new Error("Loading CSS chunk "+t+" failed.\n("+i+")");s.code="CSS_CHUNK_LOAD_FAILED",s.type=a,s.request=i,o.parentNode.removeChild(o),r(s)}};return o.onerror=o.onload=u,o.href=e,document.head.appendChild(o),o},e=function(t,e){for(var n=document.getElementsByTagName("link"),r=0;r<n.length;r++){var o=n[r],u=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(u===t||u===e))return o}var a=document.getElementsByTagName("style");for(r=0;r<a.length;r++){o=a[r],u=o.getAttribute("data-href");if(u===t||u===e)return o}},r=function(r){return new Promise((function(o,u){var a=n.miniCssF(r),i=n.p+a;if(e(a,i))return o();t(r,i,o,u)}))},o={143:0};n.f.miniCss=function(t,e){var n={997:1};o[t]?e.push(o[t]):0!==o[t]&&n[t]&&e.push(o[t]=r(t).then((function(){o[t]=0}),(function(e){throw delete o[t],e})))}}(),function(){var t={143:0};n.f.j=function(e,r){var o=n.o(t,e)?t[e]:void 0;if(0!==o)if(o)r.push(o[2]);else{var u=new Promise((function(n,r){o=t[e]=[n,r]}));r.push(o[2]=u);var a=n.p+n.u(e),i=new Error,s=function(r){if(n.o(t,e)&&(o=t[e],0!==o&&(t[e]=void 0),o)){var u=r&&("load"===r.type?"missing":r.type),a=r&&r.target&&r.target.src;i.message="Loading chunk "+e+" failed.\n("+u+": "+a+")",i.name="ChunkLoadError",i.type=u,i.request=a,o[1](i)}};n.l(a,s,"chunk-"+e,e)}},n.O.j=function(e){return 0===t[e]};var e=function(e,r){var o,u,a=r[0],i=r[1],s=r[2],l=0;if(a.some((function(e){return 0!==t[e]}))){for(o in i)n.o(i,o)&&(n.m[o]=i[o]);if(s)var c=s(n)}for(e&&e(r);l<a.length;l++)u=a[l],n.o(t,u)&&t[u]&&t[u][0](),t[u]=0;return n.O(c)},r=self["webpackChunkvue_router_demo"]=self["webpackChunkvue_router_demo"]||[];r.forEach(e.bind(null,0)),r.push=e.bind(null,r.push.bind(r))}();var r=n.O(void 0,[998],(function(){return n(936)}));r=n.O(r)})();
//# sourceMappingURL=app.dda13748.js.map