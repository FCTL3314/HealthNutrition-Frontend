import{B as E,l as g,M as m,o as v,a as h,w as y,u as e,x as $,bY as x,bW as V,d as a,y as d,I as c,n as p,b as u}from"./index-f9156b00.js";import{u as B,g as f,_ as w,e as U,r as k}from"./validation-6d9fc5a7.js";import{_ as q}from"./BaseTab-64492352.js";import{p as C}from"./vuelidate-12d13e6e.js";import"./FormFlushMessages-e49f94ad.js";import"./SubmitButton-44f80f79.js";const M={class:"mb-4"},N=a("label",{for:"email",class:"form-label text-main"},"New email",-1),T={class:"mb-4"},D=a("label",{class:"form-label text-main"},"Password",-1),j={__name:"EmailTab",setup(F){const _=E(),t=g(!1),r=m({newEmail:"",password:""}),s=B({newEmail:{email:U,required:k},password:C},r),i=m([]);async function b(){t.value=!0,i.length=0;try{const o=(await $.users.changeEmail({newEmail:r.newEmail,password:r.password})).data;_.commit("auth/setEmail",o.email),x.success("Your email has been successfully changed.")}catch(o){i.push(...V(o.request.response)),console.log(o.request)}finally{s.value.$reset(),t.value=!1}}return(o,l)=>(v(),h(q,{"tab-name":"Email Settings",v$:e(s),"error-messages":i,"is-response-waiting":t.value,"form-submit-callback":b},{default:y(()=>[a("div",M,[N,d(a("input",{id:"email","onUpdate:modelValue":l[0]||(l[0]=n=>e(s).newEmail.$model=n),type:"email",class:p(["form-control only-bottom-border",e(f)(e(s).newEmail)]),placeholder:"Enter email"},null,2),[[c,e(s).newEmail.$model]]),u(w,{field:e(s).newEmail},null,8,["field"])]),a("div",T,[D,d(a("input",{"onUpdate:modelValue":l[1]||(l[1]=n=>e(s).password.$model=n),type:"password",class:p(["form-control only-bottom-border",e(f)(e(s).password)]),placeholder:"Enter password"},null,2),[[c,e(s).password.$model]]),u(w,{field:e(s).password},null,8,["field"])])]),_:1},8,["v$","error-messages","is-response-waiting"]))}};export{j as default};
