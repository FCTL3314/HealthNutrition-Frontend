import{k as $,I as C,l as R,L as _,r as T,o as U,f as F,b as r,w as d,C as L,d as e,y as u,G as f,u as s,n as h,z as S,e as b,K as N,x as w,bV as E,bW as g}from"./index-b028e6ee.js";import{u as B,r as D,g as v,_ as y}from"./validation-d5f3a8f8.js";import{F as W}from"./FormFlushMessages-beec9329.js";import{_ as q}from"./SubmitButton-3ef194e5.js";import{u as z,p as j}from"./vuelidate-85b25ecb.js";const A={class:"justify-content-center component-indentation-y"},G=["onSubmit"],J=e("h2",{class:"form-title text-center"},"Log In",-1),K={class:"mb-4"},O=e("label",{class:"form-label text-main"},"Username",-1),P={class:"mb-4"},H=e("label",{class:"form-label text-main"},"Password",-1),Q={class:"d-flex"},X={class:"form-check me-auto"},Y=e("label",{for:"remember-me",class:"form-check-label"}," Remember me ",-1),Z={class:"text-center my-2"},ee={class:"text-center"},se={class:"mb-0"},oe=e("span",{class:"my-0 pe-1"},"Not registered ?",-1),me={__name:"LogInView",setup(te){const x=$(),i=C(),m=R(!1),c=_([]),n=_({username:"",password:"",rememberMe:!1}),k={username:{...z,required:D},password:j},o=B(k,n);async function V(t){localStorage.setItem("rememberMe",JSON.stringify(n.rememberMe)),i.commit("auth/setAccessToken",t.access),g().setItem("accessToken",t.access),i.commit("auth/setRefreshToken",t.refresh),g().setItem("refreshToken",t.refresh);const a=(await w.users.me()).data;i.commit("auth/setUser",a)}async function M(){m.value=!0,c.length=0;try{const t=await w.users.obtainToken({username:n.username,password:n.password});await V(t.data),await x.push({name:"categories"})}catch(t){c.push(...E(t.request.response)),console.error(t.response)}finally{m.value=!1,o.value.$reset()}}const I={name:"passwordReset"};return(t,a)=>{const p=T("router-link");return U(),F("div",A,[r(L,{class:"container col-lg-4 col-md-6 col-sm-8"},{default:d(()=>[e("form",{onSubmit:N(M,["prevent"])},[J,r(W,{"error-messages":c},null,8,["error-messages"]),e("div",K,[O,u(e("input",{"onUpdate:modelValue":a[0]||(a[0]=l=>s(o).username.$model=l),type:"text",class:h(["form-control only-bottom-border",s(v)(s(o).username)]),placeholder:"Enter username"},null,2),[[f,s(o).username.$model]]),r(y,{field:s(o).username},null,8,["field"])]),e("div",P,[H,u(e("input",{"onUpdate:modelValue":a[1]||(a[1]=l=>s(o).password.$model=l),type:"password",class:h(["form-control only-bottom-border",s(v)(s(o).password)]),placeholder:"Enter password"},null,2),[[f,s(o).password.$model]]),r(y,{field:s(o).password},null,8,["field"])]),e("div",Q,[e("div",X,[u(e("input",{id:"remember-me","onUpdate:modelValue":a[2]||(a[2]=l=>n.rememberMe=l),type:"checkbox",class:"form-check-input"},null,512),[[S,n.rememberMe]]),Y]),e("div",null,[r(p,{class:"link-secondary text-decoration-none",to:I},{default:d(()=>[b(" Forgot password ? ")]),_:1})])]),e("div",Z,[r(q,{text:"Log In","show-loading":m.value,"is-disabled":s(o).$invalid},null,8,["show-loading","is-disabled"])]),e("div",ee,[e("p",se,[oe,r(p,{to:{name:"signUp"},class:"link-primary text-decoration-none"},{default:d(()=>[b(" Create an account ")]),_:1})])])],40,G)]),_:1})])}}};export{me as default};