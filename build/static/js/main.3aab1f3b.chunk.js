(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{43:function(e,n,t){},44:function(e,n,t){"use strict";t.r(n);var r=t(18),c=t.n(r),u=t(19),o=t(3),a=t(1),i=t(5),s=t.n(i),d="/api/persons",f={getAll:function(){return s.a.get(d).then((function(e){return e.data}))},create:function(e){return s.a.post(d,e).then((function(e){return e.data}))},update:function(e,n){return s.a.put("".concat(d,"/").concat(e),n).then((function(e){return e.data}))},remove:function(e){return s.a.delete("".concat(d,"/").concat(e))}},l=t(0),b=function(e){var n=e.searchText,t=e.searchHandler;return Object(l.jsxs)("div",{children:["filter shown with ",Object(l.jsx)("input",{value:n,onChange:t})]})},j=function(e){var n=e.title,t=e.displayType;return Object(l.jsx)("div",{className:t,children:n})},m=function(e){var n=e.onSubmit,t=e.newName,r=e.nameHandler,c=e.newNumber,u=e.numberHandler;return Object(l.jsxs)("form",{onSubmit:n,children:[Object(l.jsxs)("div",{children:["Name: ",Object(l.jsx)("input",{value:t,onChange:r})]}),Object(l.jsxs)("div",{children:["Number: ",Object(l.jsx)("input",{value:c,onChange:u})]}),Object(l.jsx)("div",{children:Object(l.jsx)("button",{type:"submit",children:"Add"})})]})},h=function(e){var n=e.person,t=e.deleteHandler;return Object(l.jsxs)("div",{children:[n.name," ",n.number,"\xa0",Object(l.jsx)("button",{onClick:t(n.id),children:"Delete"})]})},p=function(e){var n=e.persons,t=e.deleteHandler;return Object(l.jsx)("div",{children:n.map((function(e){return Object(l.jsx)(h,{person:e,deleteHandler:t},e.id)}))})},O=(t(43),function(e){var n=e.message,t=e.messageType;return""===n?null:Object(l.jsx)("div",{className:"notification ".concat(t),children:n})}),v=function(){var e=Object(a.useState)(""),n=Object(o.a)(e,2),t=n[0],r=n[1],c=Object(a.useState)(""),i=Object(o.a)(c,2),s=i[0],d=i[1],h=Object(a.useState)(""),v=Object(o.a)(h,2),x=v[0],w=v[1],g=Object(a.useState)([]),y=Object(o.a)(g,2),H=y[0],N=y[1],S=Object(a.useState)(""),T=Object(o.a)(S,2),C=T[0],k=T[1],A=Object(a.useState)(""),D=Object(o.a)(A,2),L=D[0],E=D[1];Object(a.useEffect)((function(){f.getAll().then((function(e){return N((function(){return e}))}))}),[]);var I=function(){return H.find((function(e){return e.name.toLowerCase()===t.toLowerCase()}))},J=function(){r((function(){return""})),d((function(){return""}))},B=function(e,n){window.confirm("".concat(t," is already added to phonebook, replace the old number with a new one?"))&&f.update(e,n).then((function(n){N((function(){return H.map((function(t){return t.id===e?n:t}))})),P("Updated ".concat(n.name),"success"),J()})).catch((function(e){P(e.response.data.error,"error")}))},P=function(e,n){k((function(){return e})),E((function(){return n})),setTimeout((function(){k((function(){return""})),E((function(){return""}))}),1e4)},U=""===x?H:H.filter((function(e){return e.name.toLowerCase().includes(x.toLowerCase())}));return Object(l.jsxs)("div",{children:[Object(l.jsx)(j,{title:"Phonebook",displayType:"h2"}),Object(l.jsx)(O,{message:C,messageType:L}),Object(l.jsx)(b,{searchText:x,searchHandler:function(e){return w((function(){return e.target.value}))}}),Object(l.jsx)(j,{title:"Add a new",displayType:"h3"}),Object(l.jsx)(m,{onSubmit:function(e){e.preventDefault();var n={name:t,number:s};if(""===t.trim()||""===s.trim())return P("Add both name and number","error"),void J();I()?B(I().id,n):f.create(n).then((function(e){N((function(){return[].concat(Object(u.a)(H),[e])})),P("Added ".concat(e.name),"success"),J()})).catch((function(e){P(e.response.data.error,"error")}))},newName:t,nameHandler:function(e){return r((function(){return e.target.value}))},newNumber:s,numberHandler:function(e){return d((function(){return e.target.value}))}}),Object(l.jsx)(j,{title:"Numbers",displayType:"h3"}),Object(l.jsx)(p,{persons:U,deleteHandler:function(e){return function(){var n,t=null===(n=H.find((function(n){return n.id===e})))||void 0===n?void 0:n.name;window.confirm("Delete ".concat(t," ?"))&&f.remove(e).then((function(){N((function(){return H.filter((function(n){return n.id!==e}))})),P("Deleted ".concat(t),"success")})).catch((function(e){P("Information of ".concat(t," has already been removed from server"),"error")}))}}})]})};c.a.render(Object(l.jsx)(v,{}),document.getElementById("root"))}},[[44,1,2]]]);
//# sourceMappingURL=main.3aab1f3b.chunk.js.map