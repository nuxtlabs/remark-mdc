import R from"./DocsAside.527d18c6.js";import W from"./ProseCodeInline.83e70733.js";import Y from"./Alert.9884e3b5.js";import q from"./DocsPageBottom.bf7116f7.js";import G from"./DocsPrevNext.f0c9053d.js";import{d as J,U as K,a8 as Q,s as X,H as m,r as V,m as Z,o as ee,ab as oe,b as u,W as A,w as h,I as t,c as g,g as r,f as y,e as p,Y as te,C as x,t as ne,F as se,n as k,a7 as ae,ac as ce,p as le,i as re,k as _e}from"./entry.67072de1.js";import ie from"./DocsToc.4e776027.js";import"./slot.f2576af8.js";import"./node.676c5e99.js";import"./ProseA.d3349473.js";import"./EditOnLink.vue.35f5cad1.js";import"./DocsTocLinks.a46141ee.js";const ue=d=>(le("data-v-bdc99a99"),d=d(),re(),d),pe={class:"page-body"},de={key:1,class:"toc"},me={class:"toc-wrapper"},fe=ue(()=>p("span",{class:"title"},"Table of Contents",-1)),ve=J({__name:"DocsPageLayout",setup(d){const{page:s}=K(),{config:f,tree:b}=Q(),H=X(),F=(e,o=!0)=>{var n;return typeof((n=s.value)==null?void 0:n[e])<"u"?s.value[e]:o},T=m(()=>{var e,o,n;return!s.value||((n=(o=(e=s.value)==null?void 0:e.body)==null?void 0:o.children)==null?void 0:n.length)>0}),C=m(()=>{var e,o,n,c,l;return((e=s.value)==null?void 0:e.toc)!==!1&&((l=(c=(n=(o=s.value)==null?void 0:o.body)==null?void 0:n.toc)==null?void 0:c.links)==null?void 0:l.length)>=2}),P=m(()=>{var e,o,n,c,l;return((e=s.value)==null?void 0:e.aside)!==!1&&(((o=b.value)==null?void 0:o.length)>1||((l=(c=(n=b.value)==null?void 0:n[0])==null?void 0:c.children)==null?void 0:l.length))}),L=m(()=>F("bottom",!0)),_=V(!1),a=V(null),v=()=>H.path.split("/").slice(0,2).join("/"),i=Z("asideScroll",()=>{var e;return{parentPath:v(),scrollTop:((e=a.value)==null?void 0:e.scrollTop)||0}});function S(){a.value&&(a.value.scrollHeight===0&&setTimeout(S,0),a.value.scrollTop=i.value.scrollTop)}return ee(()=>{i.value.parentPath!==v()?(i.value.parentPath=v(),i.value.scrollTop=0):S()}),oe(()=>{a.value&&(i.value.scrollTop=a.value.scrollTop)}),(e,o)=>{var D,w,B,I,N,$;const n=R,c=W,l=Y,M=q,U=G,j=ae,z=ie,E=ce;return u(),A(E,{fluid:(w=(D=t(f))==null?void 0:D.main)==null?void 0:w.fluid,padded:(I=(B=t(f))==null?void 0:B.main)==null?void 0:I.padded,class:k(["docs-page-content",{fluid:($=(N=t(f))==null?void 0:N.main)==null?void 0:$.fluid,"has-toc":t(C),"has-aside":t(P)}])},{default:h(()=>[t(P)?(u(),g("aside",{key:0,ref_key:"asideNav",ref:a,class:"aside-nav"},[r(n,{class:"app-aside"})],512)):y("",!0),p("article",pe,[t(T)?te(e.$slots,"default",{key:0},void 0,!0):(u(),A(l,{key:1,type:"info"},{default:h(()=>[x(" Start writing in "),r(c,null,{default:h(()=>[x("content/"+ne(t(s)._file),1)]),_:1}),x(" to see this page taking shape. ")]),_:1})),t(T)&&t(s)&&t(L)?(u(),g(se,{key:2},[r(M),r(U)],64)):y("",!0)]),t(C)?(u(),g("div",de,[p("div",me,[p("button",{onClick:o[0]||(o[0]=O=>_.value=!t(_))},[fe,r(j,{name:"heroicons-outline:chevron-right",class:k(["icon",[t(_)&&"rotate"]])},null,8,["class"])]),p("div",{class:k(["docs-toc-wrapper",[t(_)&&"opened"]])},[r(z,{onMove:o[1]||(o[1]=O=>_.value=!1)})],2)])])):y("",!0)]),_:3},8,["fluid","padded","class"])}}});const Be=_e(ve,[["__scopeId","data-v-bdc99a99"]]);export{Be as default};
