function e(e){let t={parent:(n=e.parent,("string"==typeof n?document.querySelector(n):n)||".split-view"),direction:e.direction||!0,gutterCln:e.gutterCln||"sp-gutter",gutterSize:e.gutterSize||5,minSize:e.minSize||0,sizes:(o=e.sizes,o&&o.length>0?o.map((e=>e/100)):[]),onDragEnd:e.onDragEnd};var o,n;let s,i,r,l=null,u=t.parent,c=u.addEventListener,a=u.removeEventListener,f=Array.from(u.children),g="horizontal"===t.direction,p=!1,m=0,d=0,h=0,z=0,y=0;u.dataset.minsize=t.minSize,u.style.flexDirection=g?"row":"column";let v=0;for(const e of f)e.classList.contains("sp-gutter")?(e.style.flex=`0 0 ${t.gutterSize}px`,e.style.cursor=(g?"col":"row")+"-resize"):(e.style.flex=t.sizes.length>0?t.sizes[v]:1,v++);function x(e){r=e.target,p=!0,r.classList.contains(t.gutterCln)?(u=r.parentNode,g=u.classList.contains("horizontal"),l=/^touch/g.test(e.type),s=r.previousElementSibling,i=r.nextElementSibling,s&&i&&(m=g?s.offsetWidth:s.offsetHeight,d=g?i.offsetWidth:i.offsetHeight,e=l?e.changedTouches[0]:e,y=g?e.pageX:e.pageY,z=m+d,h=Number(s.style.flexGrow)+Number(i.style.flexGrow)),l?(c("touchmove",w),c("touchend",S),c("touchcancel",S)):(c("mousemove",w),c("mouseup",S))):p=!1}function w(e){if(p){e=l?e.changedTouches[0]:e;let t=g?e.pageX:e.pageY,o=t-y;m+=o,d-=o;let n=u.dataset.minsize;if(m>=n&&d>=n){let e=h*(m/z),t=h*(d/z);s.style.flexGrow=e,i.style.flexGrow=t}y=t}l||(e.preventDefault(),e.stopPropagation())}function S(){if(p=!1,r=null,t.onDragEnd){const e=[];for(const t of f)t.classList.contains("sp-gutter")||e.push(100*t.style.flexGrow);t.onDragEnd(e)}a("touchmove",w),a("touchend",S),a("touchcancel",S),a("mousemove",w),a("mouseup",S)}c("touchstart",x),c("mousedown",x)}export default e;
