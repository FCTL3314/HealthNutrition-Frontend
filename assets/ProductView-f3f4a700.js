import{H as Z,_ as j,I as M,c as R,l as C,r as P,o,a as b,w as v,y as F,d as t,t as _,B as q,f as a,F as x,u as w,J as U,K as ee,n as B,G as te,h as g,b as r,e as S,C as $,x as O,L as z,p as H,i as Y,M as ne,O as oe,m as G,g as L,Q as se,j as ae,E as ce}from"./index-059a7a1f.js";import{h as le}from"./moment-fbc5633a.js";import{C as ie,a as re,N as me}from"./NutritionFacts-b912f0ea.js";import{L as de}from"./LoadingSpinner-87cf0397.js";import{S as ue}from"./ShowMoreButton-72854de0.js";import{W as pe}from"./WrappedLoadingSpinner-112bde1d.js";import{E as _e}from"./ErrorSection-681e5b21.js";function E(e){return Z.includes(e)}const he={class:"d-flex"},fe=["src"],ve=["onSubmit"],ye={class:"input-group"},ge={class:"form-buttons"},be={key:0,class:"ms-3 mt-2 mb-0"},Ce={key:1,class:"text-center mx-auto"},xe={__name:"AddCommentForm",props:{objectId:{type:Number,required:!0},contentType:{type:String,required:!0,validator:E},parentId:{type:Number},isReplyForm:{type:Boolean,default:!1},commentsCount:{type:Number}},emits:["commentCreated","cancelButton"],setup(e,{emit:u}){const s=e,h=i=>u("commentCreated",i),n=()=>u("cancelButton"),m=M(),p=R(()=>m.getters["auth/user"]),c=C(""),y=C(!1),l=R(()=>typeof s.commentsCount=="number"),d=async()=>{const i=await f(c.value);c.value="",h(i)};async function f(i){y.value=!0;try{return(await O.comments.comment_add(s.objectId,s.contentType,i,s.parentId)).data}catch(k){console.error(k)}finally{y.value=!1}}return(i,k)=>{const N=P("router-link");return o(),b($,{shadow:!e.isReplyForm},{default:v(()=>[F(t("h3",{class:"mb-3"},_(e.commentsCount)+" "+_(e.commentsCount===1?"Comment":"Comments"),513),[[q,l.value]]),t("div",he,[y.value?(o(),a("div",Ce,[r(de)])):(o(),a(x,{key:0},[t("img",{class:"rounded-circle object-fit-cover",src:w(U)(p.value),alt:"author-image",width:"40",height:"40"},null,8,fe),t("form",{onSubmit:ee(d,["prevent"]),class:"comment-form w-100"},[t("div",ye,[F(t("input",{"onUpdate:modelValue":k[0]||(k[0]=I=>c.value=I),class:B(["comment-input form-control only-bottom-border",{"pe-none":!p.value}]),placeholder:"Add a comment...",maxlength:"516",type:"text",required:""},null,2),[[te,c.value]]),t("div",ge,[t("button",{class:B(["btn btn-outline-success form-button common-rounding fw-semibold",{disabled:!p.value}]),type:"submit",id:"comment-submit"}," Comment ",2),e.isReplyForm?(o(),a("button",{key:0,onClick:n,class:"btn btn-outline-purple-black form-button common-rounding ms-3 fw-semibold",type:"button"}," Cancel ")):g("",!0)])]),p.value?g("",!0):(o(),a("p",be,[r(N,{class:"link-main",to:{name:"logIn"}},{default:v(()=>[S("Log In")]),_:1}),S(" or "),r(N,{class:"link-main",to:{name:"signUp"}},{default:v(()=>[S("Sign Up")]),_:1}),S(" to leave comments. ")]))],40,ve)],64))])]),_:1},8,["shadow"])}}},J=j(xe,[["__scopeId","data-v-9c91240f"]]);const we=e=>(H("data-v-918df567"),e=e(),Y(),e),ke={class:"comment-wrp"},Se={class:"comment-body"},$e=["src"],Ie={id:"text-wrp"},Te={class:"text-body-secondary"},Re={key:0,class:"ms-1"},je={class:"text-break mb-0"},Ne={class:"replies"},Fe={class:"replies-buttons"},Ae={class:"ms-1"},Be=we(()=>t("span",{class:"mx-1"},"·",-1)),Le={key:1},W=40,Me={__name:"CommentCard",props:{objectId:{type:Number,required:!0},contentType:{type:String,required:!0,validator:E},comment:{type:Object,required:!0}},emits:["replyCreated"],setup(e,{emit:u}){const s=e;async function h(T){V(),s.comment.repliesCount+=1,s.comment.hasReplies=!0,p.value?(n.unshift(T),I()):s.comment.parent?u("replyCreated",T):I()}const n=z([]),m=C(!1),p=C(!1),c=C(!1),y=!s.comment.parent,l=s.comment.parent&&s.comment.parent.parentId!==null?`@${s.comment.parent.author.slug}`:"",d=le(s.comment.createdAt).fromNow(),f={name:"profile",params:{userSlug:s.comment.author.slug}},i={name:"profile",params:{userSlug:s.comment.parent?.author.slug}},k=async T=>n.push(...T.results);function N(){m.value?Q():I()}function I(){p.value=!0,m.value=!0}function Q(){m.value=!1}function V(){c.value=!1}function X(){c.value=!c.value}return(T,D)=>{const A=P("router-link");return o(),a("div",ke,[t("div",Se,[r(A,{to:f},{default:v(()=>[t("img",{class:"comment-avatar object-fit-cover",src:w(U)(e.comment.author),alt:"comment-author-image",width:W,height:W},null,8,$e)]),_:1}),t("div",Ie,[r(A,{class:"link link-dark comment-author-name",to:f},{default:v(()=>[S(_(e.comment.author.username),1)]),_:1}),t("span",Te,[t("span",null,_(w(d)),1),e.comment.edited?(o(),a("span",Re,"(edited)")):g("",!0)]),t("p",je,[w(l)?(o(),b(A,{key:0,class:"comment-author-prefix-link",to:i},{default:v(()=>[S(_(w(l))+"  ",1)]),_:1})):g("",!0),t("span",null,_(e.comment.text),1)])])]),t("div",Ne,[c.value?(o(),b(J,{key:0,"object-id":e.objectId,"content-type":e.contentType,"is-reply-form":!0,"parent-id":e.comment.id,onCancelButton:V,onCommentCreated:h},null,8,["object-id","content-type","parent-id"])):g("",!0),t("div",Fe,[y?(o(),a(x,{key:0},[t("button",{onClick:D[0]||(D[0]=yt=>e.comment.hasReplies&&N()),class:"btn btn-replies"},[e.comment.hasReplies?(o(),a(x,{key:0},[m.value?(o(),b(ie,{key:0})):(o(),b(re,{key:1}))],64)):g("",!0),t("span",Ae,_(e.comment.repliesCount)+" Replies ",1)]),Be],64)):g("",!0),t("button",{onClick:X,class:"btn btn-reply"},"Reply")]),p.value?F((o(),a("div",Le,[r(K,{comments:n,"object-id":e.objectId,"content-type":"product","parent-id":e.comment.id,"is-replies-section":!0,onCommentsLoaded:k},null,8,["comments","object-id","parent-id"])],512)),[[q,m.value]]):g("",!0)])])}}},Pe=j(Me,[["__scopeId","data-v-918df567"]]);const qe={},Oe=e=>(H("data-v-7de19d79"),e=e(),Y(),e),Ee={class:"comment-wrp d-flex"},Ve=Oe(()=>t("svg",{class:"comment-avatar bd-placeholder-img",width:"40",height:"40",xmlns:"http://www.w3.org/2000/svg",role:"img","aria-label":"Placeholder",preserveAspectRatio:"xMidYMid slice",focusable:"false"},[t("rect",{width:"100%",height:"100%",fill:"#AFCFFF"})],-1)),De=ne('<div class="placeholder-glow" data-v-7de19d79><span class="placeholder comment-author-name col-2" data-v-7de19d79></span><span class="placeholder placeholder-text bg-secondary col-2" data-v-7de19d79></span><div class="placeholder-glow" data-v-7de19d79><span class="placeholder placeholder-text col-4" data-v-7de19d79></span><span class="placeholder placeholder-text col-3" data-v-7de19d79></span></div><div class="placeholder-glow" data-v-7de19d79><span class="placeholder placeholder-text placeholder-text-replies col-1" data-v-7de19d79></span><span class="placeholder placeholder-text placeholder-text-replies col-1" data-v-7de19d79></span></div></div>',1),We=[Ve,De];function Ue(e,u){return o(),a("div",Ee,We)}const ze=j(qe,[["render",Ue],["__scopeId","data-v-7de19d79"]]),He="/HealthNutrition-Frontend/assets/comment-2c1c3cf7.svg",Ye={},Ge={class:"container text-center"},Je=t("img",{class:"mb-4",src:He,alt:"comment-icon",width:"125",height:"125"},null,-1),Ke=t("h4",null,"Looks like no one has left a comment yet, be the first!",-1),Qe=[Je,Ke];function Xe(e,u){return o(),a("div",Ge,Qe)}const Ze=j(Ye,[["render",Xe]]);const et={id:"comments-wrp",class:"container overflow-scroll"},tt={__name:"CommentsSection",props:{comments:{type:Object,required:!0},objectId:{type:Number,required:!0},contentType:{type:String,required:!0,validator:E},parentId:{type:Number},isRepliesSection:{type:Boolean,default:!1}},emits:["commentsLoaded"],setup(e,{emit:u}){const s=e;R(()=>oe.getters["auth/user"]);const h=C(!1),n=C(!1),m=R(()=>n.value&&!h.value);function p(l){u("commentsLoaded",l)}async function c(l=1){h.value=!0;try{const d=(await O.comments.comments(s.objectId,s.contentType,l,s.parentId)).data;n.value=d.next!==null,p(d)}catch(d){console.error(d)}finally{h.value=!1}}function y(l){const d=s.comments.findIndex(f=>f.id===l.parentId);s.comments.splice(d+1,0,l)}return G(async()=>{await c()}),(l,d)=>(o(),a(x,null,[r($,{class:B([{"mb-3":!e.isRepliesSection&&m.value},{"pb-0":e.isRepliesSection}]),shadow:!e.isRepliesSection},{default:v(()=>[t("div",et,[(o(!0),a(x,null,L(e.comments,f=>(o(),b(Pe,{key:f.id,"object-id":e.objectId,"content-type":e.contentType,comment:f,onReplyCreated:y,class:"animate__animated animate__fadeIn"},null,8,["object-id","content-type","comment"]))),128)),h.value?(o(!0),a(x,{key:0},L(w(se),f=>(o(),b(ze,{key:f}))),128)):e.comments.length===0?(o(),b(Ze,{key:1})):g("",!0)])]),_:1},8,["class","shadow"]),r($,{padding:0},{default:v(()=>[F(r(ue,{"pagination-type":"pageNumber",onShowMoreButtonClick:c},null,512),[[q,m.value]])]),_:1})],64))}},K=j(tt,[["__scopeId","data-v-2668c5f0"]]),nt={class:"text-main font-big"},ot={class:"list-group list-group-flush font-standard"},st={class:"fw-semibold"},at={class:"text-main-light"},ct={class:"list-group-item font-small"},lt={key:0},it=t("span",null,"Values estimated based on person weighing 70 kg.",-1),rt=t("span",null,"to personalize.",-1),mt={__name:"TimeToBurnCalories",props:{calories:{type:Number,required:!0},walkingTime:{type:String,required:!0},runningTime:{type:String,required:!0},cyclingTime:{type:String,required:!0}},setup(e){const u=e,h=M().getters["auth/user"],n=[{name:"Walking (3mph)",value:u.walkingTime},{name:"Running (6mph)",value:u.runningTime},{name:"Cycling (10mph)",value:u.cyclingTime}],m={name:"logIn"};return(p,c)=>{const y=P("router-link");return o(),b($,{class:"text-center"},{default:v(()=>[t("h2",nt," Time to burn "+_(e.calories)+" kcal ",1),t("ul",ot,[(o(),a(x,null,L(n,(l,d)=>t("li",{key:d,class:"list-group-item"},[t("span",st,_(l.name)+": ",1),t("span",at,_(l.value),1)])),64)),t("li",ct,[w(h)?(o(),a("span",lt," The values are calculated based on your weight ("+_(w(h).profile.bodyWeight)+" kg). ",1)):(o(),a(x,{key:1},[it,r(y,{to:m,class:"link-primary text-decoration-none"},{default:v(()=>[S(" Log In ")]),_:1}),rt],64))])])]),_:1})}}};const dt={class:"text-main font-large"},ut={class:"fs-5 mb-0"},pt=t("h2",{class:"text-main font-big text-center"},"Description",-1),_t=["innerHTML"],ht={class:"row justify-content-center component-indentation-bottom"},ft={class:"col-xxl-6 col-xl-6 col-lg-6 mb-3 mb-lg-0 mb-xl-0 mb-xxl-0"},vt={class:"col-xxl-6 col-xl-6 col-lg-6"},$t={__name:"ProductView",setup(e){const u=M(),s=R(()=>u.getters["auth/user"]),h=ae(),n=C(null),m=z([]),p=C(!1),c=C(0);async function y(){try{return(await O.products.product(h.params.productSlug,s.profile.body_weight)).data}catch(i){i.response.status===404&&(p.value=!0),console.error(i.response)}}async function l(){n.value=await y()}function d(i){m.push(...i.results),c.value=i.count}async function f(i){m.unshift(i),c.value++}return G(async()=>{await l().then(async()=>{document.title=ce(n.value.name)})}),(i,k)=>(o(),a(x,null,[p.value?(o(),b(_e,{key:0,description:"Oops... Looks like there is no such product or it has been removed."})):g("",!0),r(pe,{"is-loading":!n.value},{default:v(()=>[r($,{class:"text-center"},{default:v(()=>[t("h1",dt,_(n.value.category.name)+" - "+_(n.value.name),1),t("p",ut,_(n.value.shortDescription),1)]),_:1}),r($,{class:"component-indentation-y"},{default:v(()=>[pt,t("p",{class:"fs-5 mb-0",innerHTML:n.value.description},null,8,_t)]),_:1}),t("div",ht,[t("div",ft,[r(me,{class:"h-100",calories:n.value.nutrition.calories,protein:parseFloat(n.value.nutrition.protein),fat:parseFloat(n.value.nutrition.fat),carbs:parseFloat(n.value.nutrition.carbs)},null,8,["calories","protein","fat","carbs"])]),t("div",vt,[r(mt,{class:"h-100","cycling-time":n.value.caloriesBurningTime.cycling,"running-time":n.value.caloriesBurningTime.running,"walking-time":n.value.caloriesBurningTime.walking,calories:n.value.nutrition.calories},null,8,["cycling-time","running-time","walking-time","calories"])])]),r(J,{class:"mb-3","object-id":n.value.id,"content-type":"product","comments-count":c.value,onCommentCreated:f},null,8,["object-id","comments-count"]),r(K,{comments:m,"object-id":n.value.id,"content-type":"product",onCommentsLoaded:d},null,8,["comments","object-id"])]),_:1},8,["is-loading"])],64))}};export{$t as default};
