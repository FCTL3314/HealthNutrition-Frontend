import{l as b,L as i,o as g,a as v,w as y,u as s,x as h,bX as $,bV as V,d as r,y as u,G as c,n as w,b as m}from"./index-09159599.js";import{u as x,g as p,_ as f}from"./validation-513e6cb8.js";import{_ as C}from"./BaseTab-932b37e0.js";import{p as _}from"./vuelidate-3c50dffb.js";import"./FormFlushMessages-d70553f8.js";import"./SubmitButton-9ca6019c.js";const k={class:"mb-4"},B=r("label",{for:"email",class:"form-label text-main"},"Current password",-1),E={class:"mb-4"},N=r("label",{class:"form-label text-main"},"New password",-1),G={__name:"PasswordTab",setup(T){const o=b(!1),t=i({currentPassword:"",newPassword:""}),e=x({currentPassword:_,newPassword:_},t),n=i([]);async function P(){o.value=!0,n.length=0;try{await h.users.setPassword({currentPassword:t.currentPassword,newPassword:t.newPassword}),$.success("Your password has been successfully changed.")}catch(l){n.push(...V(l.request.response)),console.log(l.request)}finally{e.value.$reset(),o.value=!1}}return(l,a)=>(g(),v(C,{"tab-name":"Password Settings",v$:s(e),"error-messages":n,"is-response-waiting":o.value,"form-submit-callback":P},{default:y(()=>[r("div",k,[B,u(r("input",{id:"password","onUpdate:modelValue":a[0]||(a[0]=d=>s(e).currentPassword.$model=d),type:"password",class:w(["form-control only-bottom-border",s(p)(s(e).currentPassword)]),placeholder:"Enter your current password"},null,2),[[c,s(e).currentPassword.$model]]),m(f,{field:s(e).currentPassword},null,8,["field"])]),r("div",E,[N,u(r("input",{"onUpdate:modelValue":a[1]||(a[1]=d=>s(e).newPassword.$model=d),type:"password",class:w(["form-control only-bottom-border",s(p)(s(e).newPassword)]),placeholder:"Enter new password"},null,2),[[c,s(e).newPassword.$model]]),m(f,{field:s(e).newPassword},null,8,["field"])])]),_:1},8,["v$","error-messages","is-response-waiting"]))}};export{G as default};