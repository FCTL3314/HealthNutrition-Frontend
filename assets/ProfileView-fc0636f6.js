import{_ as V,j as B,I as E,l as x,c,m as F,c3 as P,o as s,a as d,w as i,E as y,b as k,d as a,u as C,J as D,t as o,f as m,h as w,C as p,g as M,F as T,x as W,p as j,i as A}from"./index-09159599.js";import{h as J}from"./moment-fbc5633a.js";import{W as R}from"./WrappedLoadingSpinner-3b766328.js";import{E as H}from"./ErrorSection-9b40fde7.js";import"./LoadingSpinner-f80f8782.js";const N=l=>(j("data-v-61da3742"),l=l(),A(),l),O=["src"],$={class:"text-truncate font-large mb-0"},q={key:0,class:"text-secondary mb-0"},z=N(()=>a("h2",{class:"text-main font-big text-center"},"About",-1)),G={class:"font-medium mb-0 text-break"},K=N(()=>a("h2",{class:"text-main font-big"},"Account Information",-1)),Q={class:"list-group list-group-flush text-start"},X={class:"font-medium fw-semibold text-main-light text-truncate"},Y={class:"text-break font-standard mb-0"},Z={__name:"ProfileView",setup(l){const f=B(),S=E(),e=x(null),u=c(()=>S.getters["auth/user"]),_=t=>u.value?t===u.value?.slug:!1,v=x(!1),U=async t=>{try{return(await W.users.specificUser(t)).data}catch(r){r.response.status===404&&(v.value=!0),console.error(r.response)}};async function h(t){_(t)?e.value=u.value:e.value=await U(t)}const g=c(()=>{let t="";return e.value?.firstName&&(t+=e.value?.firstName),e.value?.lastName&&(t+=" "+e.value?.lastName),t}),I=c(()=>[{label:"Username",value:e.value?.username},{label:"First name",value:e.value?.firstName},{label:"Last name",value:e.value?.lastName},{label:"Email",value:_(f.params.userSlug)?e.value?.email:"Hidden"},{label:"Member since",value:J(e.value?.dateJoined).format("LLL")}]),b=()=>{e.value?.username?document.title=y(`${e.value.username}'s Profile`):document.title=y("Profile")};return F(async()=>await h(f.params.userSlug).then(()=>b())),P(async(t,r,n)=>{await h(t.params.userSlug).then(()=>b()),n()}),(t,r)=>v.value?(s(),d(H,{key:0,description:"Oops... Looks like this profile does not exist or has been deleted."})):(s(),d(R,{key:1,"is-loading":!e.value},{default:i(()=>[k(p,{class:"component-indentation-y text-center"},{default:i(()=>[a("img",{class:"rounded-circle object-fit-cover mb-3",src:C(D)(e.value),width:"210",height:"210",alt:"userImage"},null,8,O),a("h1",$,o(e.value.username),1),g.value?(s(),m("h3",q,o(g.value),1)):w("",!0)]),_:1}),e.value.profile.about?(s(),d(p,{key:0,class:"component-indentation-y"},{default:i(()=>[z,a("p",G,o(e.value.profile.about),1)]),_:1})):w("",!0),k(p,{class:"text-center"},{default:i(()=>[K,a("ul",Q,[(s(!0),m(T,null,M(I.value,(n,L)=>(s(),m("li",{key:L,class:"list-group-item"},[a("h3",X,o(n.label)+":  ",1),a("p",Y,o(n.value||"Not specified"),1)]))),128))])]),_:1})]),_:1},8,["is-loading"]))}},le=V(Z,[["__scopeId","data-v-61da3742"]]);export{le as default};