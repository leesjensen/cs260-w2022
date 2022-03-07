(function(){"use strict";var t={28:function(t,e,n){var r=n(6133),o=n(2751),u=n(3796),i=function(){function t(){(0,r.Z)(this,t),this._user=t.loggedOutUser,this._authorized=!1}return(0,o.Z)(t,[{key:"authorized",get:function(){return this._authorized}},{key:"user",get:function(){return this._user},set:function(t){this._authorized=!0,this._user=t}}]),t}();(0,u.Z)(i,"loggedOutUser","logged out");var a=new i;e["Z"]=a},936:function(t,e,n){n(6992),n(8674),n(9601),n(7727);var r=n(8935),o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("div",[t._v("User: "+t._s(t.auth.user))]),n("nav",[n("router-link",{attrs:{to:"/"}},[t._v("Home")]),t._v(" | "),n("router-link",{attrs:{to:"/info/company"}},[t._v("Company")]),t._v(" | "),n("router-link",{attrs:{to:"/info/product"}},[t._v("Product")]),t._v(" | "),n("router-link",{attrs:{to:{name:"posts",params:{userId:t.auth.user}}}},[t._v(" User ")]),t._v(" | "),n("router-link",{attrs:{to:"/bad/path"}},[t._v("404")])],1),n("router-view"),n("pre",[t._v(t._s(t.routeInfo))])],1)},u=[],i=(n(8309),n(1249),n(8862),n(28)),a={name:"App",data:function(){return{auth:i.Z}},computed:{routeInfo:function(){var t=this.$route,e={name:t.name,fullPath:t.fullPath,params:t.params,matched:t.matched.map((function(t){return{path:t.path,component:t.components.default.name}}))};return JSON.stringify(e,void 0,2)}}},s=a,l=n(1001),c=(0,l.Z)(s,o,u,!1,null,null,null),f=c.exports,p=n(688);new r.Z({router:p.Z,render:function(t){return t(f)}}).$mount("#app")},688:function(t,e,n){n.d(e,{Z:function(){return Q}});n(1539),n(8783),n(3948),n(4916),n(5306);var r=n(8935),o=n(2809),u=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"home"},[n("OutputBox",{attrs:{msg:"Our house"}})],1)},i=[],a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{style:{background:t.color}},[t._t("default",(function(){return[n("h1",[t._v(t._s(t.msg))])]}))],2)},s=[],l={name:"HelloWorld",props:{color:{type:String,default:"#525d75"},msg:String}},c=l,f=n(1001),p=(0,f.Z)(c,a,s,!1,null,"f312ba3e",null),d=p.exports,m={name:"HomeView",components:{OutputBox:d}},v=m,h=(0,f.Z)(v,u,i,!1,null,null,null),g=h.exports,_=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"info"},[n("OutputBox",{attrs:{color:"#096b09",msg:t.$route.params.category+" info"}})],1)},b=[],y={name:"InfoView",components:{OutputBox:d}},O=y,w=(0,f.Z)(O,_,b,!1,null,null,null),k=w.exports,x=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("OutputBox",{attrs:{color:"#0f5694",msg:"User "+t.$route.params.userId}}),n("nav",[n("router-link",{attrs:{to:{name:"posts"}}},[t._v("Posts")]),t._v(" | "),n("router-link",{attrs:{to:{name:"profile"}}},[t._v("Profile")])],1),n("transition",{attrs:{name:"fade"}},[n("router-view")],1)],1)},E=[],Z=n(28),C={name:"UserView",props:["userId"],beforeRouteEnter:function(t,e,n){Z.Z.authorized?n():n("/login")},components:{OutputBox:d}},B=C,P=(0,f.Z)(B,x,E,!1,null,"74002fae",null),$=P.exports,j=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("OutputBox",{attrs:{color:"#8b1877",msg:t.userId+" posts"}})],1)},I=[],S={name:"UserPostsView",props:["userId"],components:{OutputBox:d}},A=S,N=(0,f.Z)(A,j,I,!1,null,null,null),T=N.exports,U=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("OutputBox",{attrs:{color:"#188b77",msg:t.$route.params.userId+" profile"}})],1)},F=[],V={name:"UserProfileView",props:["userId"],components:{OutputBox:d}},z=V,L=(0,f.Z)(z,U,F,!1,null,null,null),H=L.exports,M=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"not-found"},[n("OutputBox",{attrs:{color:"#910b0b",msg:"404: "+t.$route.fullPath}})],1)},q=[],D={name:"NotFoundView",components:{OutputBox:d}},J=D,K=(0,f.Z)(J,M,q,!1,null,null,null),R=K.exports;r.Z.use(o.Z);var W=[{path:"/",component:g},{path:"/info/:category",component:k},{path:"/login",component:function(){return n.e(997).then(n.bind(n,9997))}},{path:"/user/:userId",name:"user",props:!0,component:$,children:[{path:"profile",name:"profile",props:!0,component:H},{path:"posts",name:"posts",props:!0,component:T}]},{path:"*",name:"notFound",component:R}],G=new o.Z({mode:"history",base:window.location.pathname.replace(/\/+$/,""),routes:W}),Q=G}},e={};function n(r){var o=e[r];if(void 0!==o)return o.exports;var u=e[r]={exports:{}};return t[r](u,u.exports,n),u.exports}n.m=t,function(){var t=[];n.O=function(e,r,o,u){if(!r){var i=1/0;for(c=0;c<t.length;c++){r=t[c][0],o=t[c][1],u=t[c][2];for(var a=!0,s=0;s<r.length;s++)(!1&u||i>=u)&&Object.keys(n.O).every((function(t){return n.O[t](r[s])}))?r.splice(s--,1):(a=!1,u<i&&(i=u));if(a){t.splice(c--,1);var l=o();void 0!==l&&(e=l)}}return e}u=u||0;for(var c=t.length;c>0&&t[c-1][2]>u;c--)t[c]=t[c-1];t[c]=[r,o,u]}}(),function(){n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,{a:e}),e}}(),function(){n.d=function(t,e){for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})}}(),function(){n.f={},n.e=function(t){return Promise.all(Object.keys(n.f).reduce((function(e,r){return n.f[r](t,e),e}),[]))}}(),function(){n.u=function(t){return"js/"+t+"-legacy.44c49130.js"}}(),function(){n.miniCssF=function(t){return"css/"+t+".71d42162.css"}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={},e="vue-router-demo:";n.l=function(r,o,u,i){if(t[r])t[r].push(o);else{var a,s;if(void 0!==u)for(var l=document.getElementsByTagName("script"),c=0;c<l.length;c++){var f=l[c];if(f.getAttribute("src")==r||f.getAttribute("data-webpack")==e+u){a=f;break}}a||(s=!0,a=document.createElement("script"),a.charset="utf-8",a.timeout=120,n.nc&&a.setAttribute("nonce",n.nc),a.setAttribute("data-webpack",e+u),a.src=r),t[r]=[o];var p=function(e,n){a.onerror=a.onload=null,clearTimeout(d);var o=t[r];if(delete t[r],a.parentNode&&a.parentNode.removeChild(a),o&&o.forEach((function(t){return t(n)})),e)return e(n)},d=setTimeout(p.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=p.bind(null,a.onerror),a.onload=p.bind(null,a.onload),s&&document.head.appendChild(a)}}}(),function(){n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){n.p=""}(),function(){var t=function(t,e,n,r){var o=document.createElement("link");o.rel="stylesheet",o.type="text/css";var u=function(u){if(o.onerror=o.onload=null,"load"===u.type)n();else{var i=u&&("load"===u.type?"missing":u.type),a=u&&u.target&&u.target.href||e,s=new Error("Loading CSS chunk "+t+" failed.\n("+a+")");s.code="CSS_CHUNK_LOAD_FAILED",s.type=i,s.request=a,o.parentNode.removeChild(o),r(s)}};return o.onerror=o.onload=u,o.href=e,document.head.appendChild(o),o},e=function(t,e){for(var n=document.getElementsByTagName("link"),r=0;r<n.length;r++){var o=n[r],u=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(u===t||u===e))return o}var i=document.getElementsByTagName("style");for(r=0;r<i.length;r++){o=i[r],u=o.getAttribute("data-href");if(u===t||u===e)return o}},r=function(r){return new Promise((function(o,u){var i=n.miniCssF(r),a=n.p+i;if(e(i,a))return o();t(r,a,o,u)}))},o={143:0};n.f.miniCss=function(t,e){var n={997:1};o[t]?e.push(o[t]):0!==o[t]&&n[t]&&e.push(o[t]=r(t).then((function(){o[t]=0}),(function(e){throw delete o[t],e})))}}(),function(){var t={143:0};n.f.j=function(e,r){var o=n.o(t,e)?t[e]:void 0;if(0!==o)if(o)r.push(o[2]);else{var u=new Promise((function(n,r){o=t[e]=[n,r]}));r.push(o[2]=u);var i=n.p+n.u(e),a=new Error,s=function(r){if(n.o(t,e)&&(o=t[e],0!==o&&(t[e]=void 0),o)){var u=r&&("load"===r.type?"missing":r.type),i=r&&r.target&&r.target.src;a.message="Loading chunk "+e+" failed.\n("+u+": "+i+")",a.name="ChunkLoadError",a.type=u,a.request=i,o[1](a)}};n.l(i,s,"chunk-"+e,e)}},n.O.j=function(e){return 0===t[e]};var e=function(e,r){var o,u,i=r[0],a=r[1],s=r[2],l=0;if(i.some((function(e){return 0!==t[e]}))){for(o in a)n.o(a,o)&&(n.m[o]=a[o]);if(s)var c=s(n)}for(e&&e(r);l<i.length;l++)u=i[l],n.o(t,u)&&t[u]&&t[u][0](),t[u]=0;return n.O(c)},r=self["webpackChunkvue_router_demo"]=self["webpackChunkvue_router_demo"]||[];r.forEach(e.bind(null,0)),r.push=e.bind(null,r.push.bind(r))}();var r=n.O(void 0,[998],(function(){return n(936)}));r=n.O(r)})();
//# sourceMappingURL=app-legacy.4ac85dd7.js.map