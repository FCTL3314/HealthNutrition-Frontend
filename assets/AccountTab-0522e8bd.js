import{O as N,b$ as W,I as L,L as g,l as w,o as v,a as I,w as A,u as e,x as V,bX as B,bV as C,d as a,y as i,G as m,n as d,b as u,f as S,h as T,c0 as G,c1 as k,c2 as D}from"./index-09159599.js";import{u as F,g as c,_ as f,m as h,a as y,b as M,d as O}from"./validation-513e6cb8.js";import{_ as P}from"./BaseTab-932b37e0.js";import{u as R}from"./vuelidate-3c50dffb.js";import"./FormFlushMessages-d70553f8.js";import"./SubmitButton-9ca6019c.js";async function X(x,_=null){N.commit("auth/updateUser",x);const s={..._};s.image&&(s.image=W(s.image)),N.commit("auth/updateProfile",s)}const Y={class:"mb-4"},H=a("label",{for:"username",class:"form-label text-main"}," Username ",-1),K={class:"mb-4"},j=a("label",{for:"first_name",class:"form-label text-main"}," First Name ",-1),q={class:"mb-4"},z=a("label",{for:"last_name",class:"form-label text-main"},"Last Name",-1),J={class:"mb-4"},Q={for:"email",class:"form-label"},Z=a("span",{class:"text-main"},"Email",-1),ee={key:0,class:"text-success"},ae=["value"],te={class:"mb-4"},se=a("label",{for:"image",class:"form-label text-main"},"Image",-1),oe={class:"input-group"},le=["accept"],ne={class:"mb-4"},re=a("label",{for:"about",class:"form-label text-main"},"About me",-1),ie={class:"input-group"},me={class:"mb-4"},de=a("label",{for:"first_name",class:"form-label text-main"}," Body Weight ",-1),ge={__name:"AccountTab",setup(x){const _=L(),s=g(_.getters["auth/user"]),b=w(!1),n=g({username:s.username,firstName:s.firstName,lastName:s.lastName,image:null,about:s.profile.about,bodyWeight:s.profile.bodyWeight}),$={username:R,firstName:{minLength:h(1),maxLength:y(150)},lastName:{minLength:h(1),maxLength:y(150)},about:{minLength:h(1),maxLength:y(516)},bodyWeight:{minValue:M(k),maxValue:O(D)}},t=F($,n),U=r=>n.image=r.target.files[0],p=g([]);async function E(){b.value=!0,p.length=0;try{const r=(await V.users.update({username:n.username,first_name:n.firstName,last_name:n.lastName})).data,o=(await V.users.updateProfile({image:n.image,about:n.about,bodyWeight:n.bodyWeight})).data;await X(r,o),B.success("Your account data has been successfully updated.")}catch(r){p.push(...C(r.request.response)),console.error(r)}finally{t.value.$reset(),b.value=!1}}return(r,o)=>(v(),I(P,{"tab-name":"Account Settings","form-submit-callback":E,"is-response-waiting":b.value,"error-messages":p,v$:e(t)},{default:A(()=>[a("div",Y,[H,i(a("input",{id:"username","onUpdate:modelValue":o[0]||(o[0]=l=>e(t).username.$model=l),class:d(["form-control only-bottom-border",e(c)(e(t).username)]),type:"text"},null,2),[[m,e(t).username.$model]]),u(f,{field:e(t).username},null,8,["field"])]),a("div",K,[j,i(a("input",{id:"first_name","onUpdate:modelValue":o[1]||(o[1]=l=>e(t).firstName.$model=l),class:d(["form-control only-bottom-border",e(c)(e(t).firstName)]),type:"text",placeholder:"Enter your first name"},null,2),[[m,e(t).firstName.$model]]),u(f,{field:e(t).firstName},null,8,["field"])]),a("div",q,[z,i(a("input",{id:"last_name","onUpdate:modelValue":o[2]||(o[2]=l=>e(t).lastName.$model=l),class:d(["form-control only-bottom-border",e(c)(e(t).lastName)]),type:"text",placeholder:"Enter your last name"},null,2),[[m,e(t).lastName.$model]]),u(f,{field:e(t).lastName},null,8,["field"])]),a("div",J,[a("label",Q,[Z,s.isVerified?(v(),S("span",ee," ✓ Verified ")):T("",!0)]),a("input",{id:"email",class:"form-control only-bottom-border",type:"email",value:s.email,readonly:""},null,8,ae)]),a("div",te,[se,a("div",oe,[a("input",{id:"image",accept:e(G).join(", "),onChange:U,class:"form-control common-rounding shadow-none",type:"file","aria-label":"Upload"},null,40,le)])]),a("div",ne,[re,a("div",ie,[i(a("textarea",{id:"about","onUpdate:modelValue":o[3]||(o[3]=l=>e(t).about.$model=l),class:d(["form-control only-bottom-border",e(c)(e(t).about)]),rows:"3",placeholder:"Tell a little about yourself"},null,2),[[m,e(t).about.$model]]),u(f,{field:e(t).about},null,8,["field"])])]),a("div",me,[de,i(a("input",{id:"first_name","onUpdate:modelValue":o[4]||(o[4]=l=>e(t).bodyWeight.$model=l),class:d(["form-control only-bottom-border",e(c)(e(t).bodyWeight)]),type:"number",step:"0.5",placeholder:"Enter your body weight"},null,2),[[m,e(t).bodyWeight.$model]]),u(f,{field:e(t).bodyWeight},null,8,["field"])])]),_:1},8,["is-response-waiting","error-messages","v$"]))}};export{ge as default};