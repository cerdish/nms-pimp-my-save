var W=Object.defineProperty;var I=(o,e,s)=>e in o?W(o,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):o[e]=s;var f=(o,e,s)=>(I(o,typeof e!="symbol"?e+"":e,s),s);import{r as y,o as c,c as p,a as u,w as $,v as R,m as O,b as A,d as S,e as B,n as G,f as E,g as h,u as V,h as L,i as k,C as P,B as z,M as J,V as D,j,k as H,O as F,A as N,G as q,l as K,p as Q,S as X,W as Y,P as Z,q as ee,s as te,t as se,D as T,x as oe,y as ne,z as re,E as ae}from"./vendor.e29b9acd.js";const ie=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function s(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerpolicy&&(n.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?n.credentials="include":t.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(t){if(t.ep)return;t.ep=!0;const n=s(t);fetch(t.href,n)}};ie();var x=(o,e)=>{const s=o.__vccOpts||o;for(const[r,t]of e)s[r]=t;return s};const le={class:"checkbox-wrapper"},de={class:"checkbox-parent"},ue=["id"],ce=["for"],pe={props:{modelValue:{}},setup(o){const e=o,s=y("input-"+(Math.random()+"").replace(/\./g,"-"));return(r,t)=>(c(),p("div",le,[u("div",de,[$(u("input",O({type:"checkbox",id:r.$attrs.id||s.value,"onUpdate:modelValue":t[0]||(t[0]=n=>e.modelValue=n)},r.$attrs),null,16,ue),[[R,e.modelValue]])]),u("label",{for:r.$attrs.id||s.value},[A(r.$slots,"default",{},void 0,!0)],8,ce)]))}};var me=x(pe,[["__scopeId","data-v-69f834e5"]]),fe=Object.freeze(Object.defineProperty({__proto__:null,default:me},Symbol.toStringTag,{value:"Module"}));const _e={class:"input-wrapper"},he=["for"],ve=["id"],ge=["id"],ye={key:2,class:"input-note"},we={props:{modelValue:{default:""},inputWidth:{}},emits:["update:modelValue"],setup(o,{emit:e}){const s=o,r=y("input-"+(Math.random()+"").replace(/\./g,"-"));return(t,n)=>(c(),p("div",_e,[t.$slots.default?(c(),p("label",{key:0,for:t.$attrs.id||r.value},[A(t.$slots,"default")],8,he)):S("",!0),u("div",{class:"input-parent",style:G("width:"+o.inputWidth)},[t.$attrs.type=="textarea"?$((c(),p("textarea",O({key:0,"onUpdate:modelValue":n[0]||(n[0]=i=>s.modelValue=i),onInput:n[1]||(n[1]=i=>t.$emit("update:modelValue",i.target.value)),id:t.$attrs.id||r.value,type:"text"},t.$attrs),null,16,ve)),[[B,s.modelValue]]):$((c(),p("input",O({key:1,"onUpdate:modelValue":n[2]||(n[2]=i=>s.modelValue=i),onInput:n[3]||(n[3]=i=>t.$emit("update:modelValue",i.target.value)),id:t.$attrs.id||r.value,type:"text"},t.$attrs),null,16,ge)),[[B,s.modelValue]]),t.$slots.note?(c(),p("div",ye,[A(t.$slots,"note")])):S("",!0)],4)]))}};var be=Object.freeze(Object.defineProperty({__proto__:null,default:we},Symbol.toStringTag,{value:"Module"}));const $e={},Oe={class:"banner bg-color1 flex"},Ae={style:{"align-self":"center"},class:"padding"},Se=u("span",{class:"material-icons"},"menu",-1),Ee=[Se],Ve=u("h1",{class:"item-grow padding"},"Pimp My Save",-1);function Le(o,e){return c(),p("div",Oe,[u("div",Ae,[u("button",{onClick:e[0]||(e[0]=s=>o.$emit("toggle-menu")),class:"no-style"},Ee)]),Ve])}var ke=x($e,[["render",Le]]);const xe={id:"layout"},Me={class:"page"},Ce={key:0,class:"side-nav"},Be=k("Home"),Pe=k("Base Creator 9000"),Ne={class:"content padding"},Te={setup(o){var e=y(!0);const s=()=>{e.value=!e.value,console.log(e)};return(r,t)=>{const n=E("router-link"),i=E("router-view");return c(),p("div",xe,[h(ke,{onToggleMenu:t[0]||(t[0]=_=>s())}),u("div",Me,[V(e)?(c(),p("div",Ce,[h(n,{to:"/"},{default:L(()=>[Be]),_:1}),h(n,{to:"/baseCreator"},{default:L(()=>[Pe]),_:1})])):S("",!0),u("div",Ne,[h(i)])])])}}};const a=5.33333,l=3.33333,b={"^U_EXTRACTOR_S":{dimensions:[a/2,l*2,a/2],meshOffset:[0,l,0]},"^U_GENERATOR_S":{dimensions:[a/2,l*2,a/2],meshOffset:[0,l,0]},"^U_SILO_S":{dimensions:[a/2,l*2,a/2],meshOffset:[0,l,0]},"^T_FLOOR":{dimensions:[a,.275/2,a],meshOffset:[0,.275/4,0]},"^T_WALL":{dimensions:[a,l,.275/2],meshOffset:[0,l/2,0]},"^T_WALL_Q":{dimensions:[a,l/4,.275/2],meshOffset:[0,l/8,0]},"^U_POWERLINE":{dimensions:[.3,.3,1],meshOffset:[0,0,.5],isWire:!0},"^U_PORTALLINE":{dimensions:[.3,.3,.3],meshOffset:[0,0,.5],isWire:!0},"^U_PIPELINE":{dimensions:[.3,.3,.3],meshOffset:[0,0,.5],isWire:!0},"^TELEPORTER":{dimensions:[a,a,a/4],meshOffset:[0,l,0]},"^BASE_FLAG":{dimensions:[a/2,l/2,a/2],meshOffset:[0,l/4,0]},"^BUILDSAVE":{dimensions:[a/2,l/4,a/2],meshOffset:[0,l/8,0]},"^U_MINIPORTAL":{dimensions:[a/2,l,a/2],meshOffset:[0,l/2,0],geometry:new P(a/4,a/4,l,32)},"^GARAGE_MECH":{dimensions:[a*1.5,l/4,a*1.5],meshOffset:[0,l/8,0],geometry:new P(a*1.5/2,a*1.5/2,l/4,32)}};function Ue(o){return w(o,"dimensions",[a,l,a])}function We(o){return w(o,"meshOffset",!1)}function Ie(o){return w(o,"geometry",Re(o)).clone()}function Re(o){let e=Ue(o);return new z(e[0],e[1],e[2])}function Ge(o){return w(o,"isWire",!1)}function w(o,e,s){return b[o]&&b[o][e]?b[o][e]:s}class M extends J{constructor(e,s,r,t){let n=Ie(e),i=We(e);i&&n.applyMatrix4(new j().makeTranslation(i[0],i[1],i[2]));let _=new H({color:14544639});super(n,_);f(this,"ObjectID","x");f(this,"Position",[0,0,0]);f(this,"Up",[0,1,0]);f(this,"At",[0,0,1]);f(this,"UserData",0);f(this,"at",new D);if(this.castShadow=!0,this.receiveShadow=!0,s&&(this.Position=s,this.position.fromArray(s)),r&&(this.Up=r,this.up.fromArray(r)),t){this.At=t,this.at.fromArray(t);let m=new F;m.position.fromArray(this.position.toArray()),m.translateOnAxis(this.at,1),this.lookAt(m.position)}Ge(e)&&(this.scale.set(1,1,this.at.length()),console.log(this.At)),this.attach(new N(this.up.clone().normalize(),this.position.clone(),5)),this.attach(new N(this.at.clone().normalize(),this.position.clone(),5))}fromJson(e){let s=JSON.parse(e);return new M(s.ObjectID,s.Position,s.Up,s.At)}}class ze extends q{constructor(e){super()}fromJson(e){let s=JSON.parse(e),r=this;return s.Objects.forEach(function(t){let n=new M().fromJson(JSON.stringify(t));r.add(n)}),this}}const Je={class:"flex"},De={class:"item-grow"},je=k("Input Base"),He={class:"item-grow"},Fe={setup(o,{expose:e}){const s=y(null);e({canvasWrapper:s});const r=K({inputBase:""});console.log(r.inputBase),Q(()=>{try{return JSON.parse(r.inputBase)}catch{return{}}});const t=new X,n=new Y({});n.shadowMap.enabled=!0,n.setSize(600,600);const i=new Z(75,600/600,.1,5e4);i.position.z=12;const _=new ze;ee(()=>r.inputBase,()=>{_.clear();try{_.fromJson(r.inputBase)}catch(v){console.log(v)}m()}),te(()=>{s.value.appendChild(n.domElement),new se(i,n.domElement).addEventListener("change",m),t.add(_);var d=new T(16777215);d.position.set(200,200,200),d.castShadow=!0,d.shadow.mapSize.width=1024,d.shadow.mapSize.height=1024,d.shadow.camera.left=-10,d.shadow.camera.bottom=-10,d.shadow.camera.right=10,d.shadow.camera.top=10,d.shadow.camera.far=5e3,t.add(d);let g=new T(255,.5);g.position.set(-200,-200,-200),t.add(g),m()});const m=()=>{n.render(t,i)};return(v,d)=>{const g=E("base-input");return c(),p("div",Je,[u("div",De,[h(g,{modelValue:V(r).inputBase,"onUpdate:modelValue":d[0]||(d[0]=U=>V(r).inputBase=U),type:"textarea"},{default:L(()=>[je]),_:1},8,["modelValue"])]),u("div",He,[u("div",{ref_key:"canvasWrapper",ref:s},null,512)])])}}},qe={};function Ke(o,e){return" home goes here "}var Qe=x(qe,[["render",Ke]]);const Xe=oe({history:ne(),routes:[{path:"/",component:Qe},{path:"/baseCreator",component:Fe}]}),C=re(Te),Ye={"./components/global/baseCheckbox.vue":fe,"./components/global/baseInput.vue":be};Object.entries(Ye).forEach(([o,e])=>{const s=ae(o.split("/").pop().replace(/\.\w+$/,""));C.component(s,e.default)});C.use(Xe);C.mount("#app");
