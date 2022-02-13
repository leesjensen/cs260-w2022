(function(t){function e(e){for(var r,i,c=e[0],l=e[1],u=e[2],p=0,m=[];p<c.length;p++)i=c[p],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&m.push(o[i][0]),o[i]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(t[r]=l[r]);s&&s(e);while(m.length)m.shift()();return a.push.apply(a,u||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],r=!0,c=1;c<n.length;c++){var l=n[c];0!==o[l]&&(r=!1)}r&&(a.splice(e--,1),t=i(i.s=n[0]))}return t}var r={},o={app:0},a=[];function i(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=r,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(n,r,function(e){return t[e]}.bind(null,r));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],l=c.push.bind(c);c.push=e,c=c.slice();for(var u=0;u<c.length;u++)e(c[u]);var s=l;a.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";n("85ec")},"1f52":function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("div",[t._v("App content")]),n("h1",[t._v("Ticket System")]),n("div",{attrs:{id:"nav"}},[n("div",[t._v("Router nav")]),n("router-link",{attrs:{to:"/"}},[t._v("Home")]),t._v(" | "),n("router-link",{attrs:{to:"/create"}},[t._v("Create")]),t._v(" | "),n("router-link",{attrs:{to:"/about"}},[t._v("About")])],1),n("router-view")],1)},a=[],i=(n("034f"),n("2877")),c={},l=Object(i["a"])(c,o,a,!1,null,null,null),u=l.exports,s=n("8c4f"),p=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"home component"},[r("div",[t._v("Home view")]),r("div",[r("h1",[t._v("Current Tickets")]),t._l(t.tickets,(function(e){return r("div",{key:e.id},[r("hr"),r("div",{staticClass:"ticket"},[r("div",{staticClass:"problem"},[r("p",[t._v(t._s(e.problem))]),r("p",[r("i",[t._v("-- "+t._s(e.name))])])])])])}))],2),r("img",{attrs:{alt:"Vue logo",src:n("cf05")}}),r("HelloWorld",{attrs:{msg:"Param from parent of helloworld"}})],1)},m=[],d=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"hello"},[n("h1",[t._v("HelloWorld Component")]),n("p",[t._v("MSG Param: "+t._s(t.msg))])])},f=[],v={name:"HelloWorld",props:{msg:String}},h=v,b=(n("c75b"),Object(i["a"])(h,d,f,!1,null,"222cdb26",null)),_=b.exports,g={name:"Home",components:{HelloWorld:_},data:function(){return{}},computed:{tickets:function(){return this.$root.$data.getTickets()}}},k=g,y=Object(i["a"])(k,p,m,!1,null,null,null),w=y.exports,O=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},x=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"about component"},[n("div",[t._v("About view")]),n("h1",[t._v("About What? Now")])])}],j={},T=Object(i["a"])(j,O,x,!1,null,null,null),C=T.exports,P=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"create component"},[n("div",[t._v("create view")]),n("h1",[t._v("Create a Ticket")]),t.creating?n("form",{on:{submit:function(e){return e.preventDefault(),t.addTicket.apply(null,arguments)}}},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],attrs:{placeholder:"Name"},domProps:{value:t.name},on:{input:function(e){e.target.composing||(t.name=e.target.value)}}}),n("p"),n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.problem,expression:"problem"}],domProps:{value:t.problem},on:{input:function(e){e.target.composing||(t.problem=e.target.value)}}}),n("br"),n("button",{attrs:{type:"submit"}},[t._v("Submit")])]):n("div",[n("p",[t._v("Thank you for submitting a ticket! We will respond shortly.")]),n("p",[n("a",{attrs:{href:"#"},on:{click:t.toggleForm}},[t._v("Submit another ticket")])])])])},$=[],S=(n("b0c0"),{name:"create",data:function(){return{creating:!0,name:"",problem:""}},methods:{toggleForm:function(){this.creating=!this.creating},addTicket:function(){this.$root.$data.addTicket(this.name,this.problem),this.name="",this.problem="",this.creating=!1}}}),H=S,E=Object(i["a"])(H,P,$,!1,null,null,null),W=E.exports;r["a"].use(s["a"]);var A=[{path:"/",name:"Home",component:w},{path:"/create",name:"Create",component:W},{path:"/about",name:"About",component:C}],M=new s["a"]({mode:"history",base:"",routes:A}),D=M,N={currentID:3,tickets:[{id:1,problem:"This app is not completely written yet.",name:"Emma"},{id:2,problem:"another ticket.",name:"Brigham"}],getTickets:function(){return this.tickets},addTicket:function(t,e){this.tickets.push({id:this.currentID,name:t,problem:e}),this.currentID+=1}};r["a"].config.productionTip=!1,new r["a"]({router:D,data:N,render:function(t){return t(u)}}).$mount("#app")},"85ec":function(t,e,n){},c75b:function(t,e,n){"use strict";n("1f52")},cf05:function(t,e,n){t.exports=n.p+"img/logo.82b9c7a5.png"}});
//# sourceMappingURL=app.16271a96.js.map