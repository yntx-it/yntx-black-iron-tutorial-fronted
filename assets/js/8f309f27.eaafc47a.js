"use strict";(self.webpackChunkyntx_black_iron_tutorial_fronted=self.webpackChunkyntx_black_iron_tutorial_fronted||[]).push([[6305],{3905:(t,e,a)=>{a.d(e,{Zo:()=>m,kt:()=>c});var n=a(7294);function r(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function l(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}function i(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?l(Object(a),!0).forEach((function(e){r(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function p(t,e){if(null==t)return{};var a,n,r=function(t,e){if(null==t)return{};var a,n,r={},l=Object.keys(t);for(n=0;n<l.length;n++)a=l[n],e.indexOf(a)>=0||(r[a]=t[a]);return r}(t,e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);for(n=0;n<l.length;n++)a=l[n],e.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(t,a)&&(r[a]=t[a])}return r}var o=n.createContext({}),u=function(t){var e=n.useContext(o),a=e;return t&&(a="function"==typeof t?t(e):i(i({},e),t)),a},m=function(t){var e=u(t.components);return n.createElement(o.Provider,{value:e},t.children)},k={inlineCode:"code",wrapper:function(t){var e=t.children;return n.createElement(n.Fragment,{},e)}},d=n.forwardRef((function(t,e){var a=t.components,r=t.mdxType,l=t.originalType,o=t.parentName,m=p(t,["components","mdxType","originalType","parentName"]),d=u(a),c=r,N=d["".concat(o,".").concat(c)]||d[c]||k[c]||l;return a?n.createElement(N,i(i({ref:e},m),{},{components:a})):n.createElement(N,i({ref:e},m))}));function c(t,e){var a=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var l=a.length,i=new Array(l);i[0]=d;var p={};for(var o in e)hasOwnProperty.call(e,o)&&(p[o]=e[o]);p.originalType=t,p.mdxType="string"==typeof t?t:r,i[1]=p;for(var u=2;u<l;u++)i[u]=a[u];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}d.displayName="MDXCreateElement"},8768:(t,e,a)=>{a.r(e),a.d(e,{assets:()=>o,contentTitle:()=>i,default:()=>k,frontMatter:()=>l,metadata:()=>p,toc:()=>u});var n=a(7462),r=(a(7294),a(3905));const l={sidebar_position:2},i="\u57fa\u7840\u7bc7",p={unversionedId:"interview/interview-base",id:"interview/interview-base",title:"\u57fa\u7840\u7bc7",description:"JDK8 \u7684\u65b0\u7279\u6027",source:"@site/docs/interview/interview-base.md",sourceDirName:"interview",slug:"/interview/interview-base",permalink:"/yntx-black-iron-tutorial-fronted/docs/interview/interview-base",draft:!1,editUrl:"https://github.com/yntx-it/yntx-black-iron-tutorial-fronted/tree/master/shared/docs/interview/interview-base.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"interview",previous:{title:"\u8bbe\u8ba1\u6a21\u5f0f\u7bc7",permalink:"/yntx-black-iron-tutorial-fronted/docs/interview/interview-design"},next:{title:"\u96c6\u5408\u7bc7",permalink:"/yntx-black-iron-tutorial-fronted/docs/interview/interview-collection"}},o={},u=[{value:"JDK8 \u7684\u65b0\u7279\u6027",id:"jdk8-\u7684\u65b0\u7279\u6027",level:2},{value:"Java \u57fa\u672c\u6570\u636e\u7c7b\u578b",id:"java-\u57fa\u672c\u6570\u636e\u7c7b\u578b",level:2},{value:"hashCode \u548c equals \u7684\u4f5c\u7528",id:"hashcode-\u548c-equals-\u7684\u4f5c\u7528",level:2}],m={toc:u};function k(t){let{components:e,...a}=t;return(0,r.kt)("wrapper",(0,n.Z)({},m,a,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"\u57fa\u7840\u7bc7"},"\u57fa\u7840\u7bc7"),(0,r.kt)("h2",{id:"jdk8-\u7684\u65b0\u7279\u6027"},"JDK8 \u7684\u65b0\u7279\u6027"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"\u8bed\u6cd5\u65b9\u9762")),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"interface & function interface"),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"\u63a5\u53e3\u5141\u8bb8 static \u548c default \u4fee\u9970\u65b9\u6cd5\uff0c\u5b9e\u73b0"),(0,r.kt)("li",{parentName:"ul"},"\u63a5\u53e3\u548c\u62bd\u8c61\u7c7b\u7684\u533a\u522b\uff1a",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"\u63a5\u53e3\u591a\u5b9e\u73b0\uff0c\u62bd\u8c61\u7c7b\u5355\u7ee7\u627f\uff1b"),(0,r.kt)("li",{parentName:"ul"},"\u63a5\u53e3\u65b9\u6cd5\u662f public abstract \u4fee\u9970\uff0c\u53d8\u91cf\u662f public static final \u4fee\u9970\uff0c\u62bd\u8c61\u7c7b\u53ef\u4ee5\u7528\u5176\u4ed6\u4fee\u9970\u7b26\uff1b"),(0,r.kt)("li",{parentName:"ul"},"\u63a5\u53e3\u7684\u65b9\u6cd5\u66f4\u50cf\u662f\u4e00\u4e2a\u6269\u5c55\u63d2\u4ef6\uff0c\u800c\u62bd\u8c61\u7c7b\u7684\u65b9\u6cd5\u662f\u8981\u7ee7\u627f\u7684"))),(0,r.kt)("li",{parentName:"ul"},"\u51fd\u6570\u5f0f\u63a5\u53e3\uff1a\u63a5\u53e3\u53ea\u6709\u4e00\u4e2a\u62bd\u8c61\u65b9\u6cd5\u7684\u65f6\u5019\uff0c\u5c31\u53ef\u4ee5\u5f53\u505a\u51fd\u6570\u5f0f\u63a5\u53e3\u5904\u7406\uff0c\u5728 lambda \u8868\u8fbe\u5f0f\u4f7f\u7528"))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"lambda"),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"\u51fd\u6570\u5f0f\u7f16\u7a0b"))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"stream"),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"\u5bf9\u6570\u636e\u8fdb\u884c\u68c0\u7d22\u3001\u7b5b\u9009\u3001\u6392\u5e8f\u3001\u7edf\u8ba1\u3001\u8ba1\u6570\uff0c\u914d\u5408 lambda \u4f7f\u7528"))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"optional"),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"\u89e3\u51b3 NPE \u95ee\u9898\uff0c\u4f18\u96c5\u5224\u65ad"))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"DateTime API"),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"LocalDate\u3001LocalTime\u3001LocalDateTime\uff0cof\u3001parse \u65b9\u6cd5\u8f6c\u6362\u683c\u5f0f")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"\u65b0\u7684 Date API\uff0c\u7ebf\u7a0b\u5b89\u5168\u3001\u65f6\u533a\u5904\u7406\u3001\u683c\u5f0f\u5316\u548c\u8ba1\u7b97\u7b80\u5355"))))),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"HashMap"),"\uff1a\u5f15\u5165\u4e86\u7ea2\u9ed1\u6811"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"JVM"),"\uff1a\u65b9\u6cd5\u533a\u7684\u5b9e\u73b0\u7531\u6c38\u4e45\u4ee3\u6362\u6210\u4e86\u5143\u7a7a\u95f4\uff0c\u4f7f\u7528\u76f4\u63a5\u5185\u5b58\u533a\u57df\u3002"),(0,r.kt)("h2",{id:"java-\u57fa\u672c\u6570\u636e\u7c7b\u578b"},"Java \u57fa\u672c\u6570\u636e\u7c7b\u578b"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"\u57fa\u672c\u6570\u636e\u7c7b\u578b"),(0,r.kt)("th",{parentName:"tr",align:null},"\u5927\u5c0f"),(0,r.kt)("th",{parentName:"tr",align:null},"\u6700\u5c0f\u503c"),(0,r.kt)("th",{parentName:"tr",align:null},"\u6700\u5927\u503c"),(0,r.kt)("th",{parentName:"tr",align:null},"\u5305\u88c5\u5668\u7c7b\u578b"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"byte"),(0,r.kt)("td",{parentName:"tr",align:null},"1 \u5b57\u8282"),(0,r.kt)("td",{parentName:"tr",align:null},"-128"),(0,r.kt)("td",{parentName:"tr",align:null},"127"),(0,r.kt)("td",{parentName:"tr",align:null},"Byte")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"char"),(0,r.kt)("td",{parentName:"tr",align:null},"2 \u5b57\u8282"),(0,r.kt)("td",{parentName:"tr",align:null},"unicode 0"),(0,r.kt)("td",{parentName:"tr",align:null},"unicode 2^16^ - 1"),(0,r.kt)("td",{parentName:"tr",align:null},"Character")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"short"),(0,r.kt)("td",{parentName:"tr",align:null},"2 \u5b57\u8282"),(0,r.kt)("td",{parentName:"tr",align:null},"-2^15^"),(0,r.kt)("td",{parentName:"tr",align:null},"2^15^-1"),(0,r.kt)("td",{parentName:"tr",align:null},"Short")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"int"),(0,r.kt)("td",{parentName:"tr",align:null},"4 \u5b57\u8282"),(0,r.kt)("td",{parentName:"tr",align:null},"-2^31^"),(0,r.kt)("td",{parentName:"tr",align:null},"2^31^ - 1"),(0,r.kt)("td",{parentName:"tr",align:null},"Integer")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"long"),(0,r.kt)("td",{parentName:"tr",align:null},"8 \u5b57\u8282"),(0,r.kt)("td",{parentName:"tr",align:null},"-2^63^"),(0,r.kt)("td",{parentName:"tr",align:null},"2^63^ - 1"),(0,r.kt)("td",{parentName:"tr",align:null},"Long")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"float"),(0,r.kt)("td",{parentName:"tr",align:null},"4 \u5b57\u8282"),(0,r.kt)("td",{parentName:"tr",align:null},"IEEE 754"),(0,r.kt)("td",{parentName:"tr",align:null},"IEEE 754"),(0,r.kt)("td",{parentName:"tr",align:null},"Float")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"double"),(0,r.kt)("td",{parentName:"tr",align:null},"8 \u5b57\u8282"),(0,r.kt)("td",{parentName:"tr",align:null},"IEEE 754"),(0,r.kt)("td",{parentName:"tr",align:null},"IEEE 754"),(0,r.kt)("td",{parentName:"tr",align:null},"Double")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"boolean"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5355\u72ec\u7f16\u8bd1\u4e3a int\uff0c4 \u5b57\u8282\uff1b",(0,r.kt)("br",null),"\u6570\u7ec4\u7f16\u8bd1\u4e3a byte\uff0c1 \u5b57\u8282"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"Boolean")))),(0,r.kt)("h2",{id:"hashcode-\u548c-equals-\u7684\u4f5c\u7528"},"hashCode \u548c equals \u7684\u4f5c\u7528"),(0,r.kt)("p",null,"\u4f5c\u7528\uff1a"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"hashCode \u7684\u4f5c\u7528\u662f\u8fd4\u56de\u4e00\u4e2a\u5bf9\u8c61\u7684 hash \u503c\uff0c\u5229\u7528\u5bf9\u8c61\u5730\u5740\u751f\u6210\u4e00\u4e2a int \u7c7b\u578b\u7684\u6570\u3002"),(0,r.kt)("li",{parentName:"ul"},"equals \u662f\u7528\u6765\u6bd4\u8f83\u4e24\u4e2a\u5bf9\u8c61\u662f\u5426\u662f\u540c\u4e00\u4e2a\u5bf9\u8c61\u3002")),(0,r.kt)("p",null,"\u5173\u7cfb\uff1a"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"\u91cd\u5199\u4e86 equals \u5fc5\u987b\u91cd\u5199 hashCode\uff0c\u4fdd\u8bc1 hashCode \u76f8\u7b49\u3002"),(0,r.kt)("li",{parentName:"ul"},"\u4e0d\u76f8\u7b49\u7684\u5bf9\u8c61\u53ef\u80fd\u4f1a\u6709\u76f8\u540c\u7684 hashCode \u503c\uff0c Map \u548c Set \u96c6\u5408\u91cc\u627e\u5143\u7d20\u65f6\uff0c\u9700\u8981\u901a\u8fc7 equals \u5224\u65ad\u4e24\u4e2a key \u662f\u5426\u662f\u540c\u4e00\u4e2a key\u3002")))}k.isMDXComponent=!0}}]);