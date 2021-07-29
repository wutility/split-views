/*! SplitViews - v2.0.11 | Copyright 2020 - Haikel Fazzani */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).SplitViews=t()}(this,(function(){"use strict";return function(e){let t={parent:(o=e.parent,("string"==typeof o?document.querySelector(o):o)||".split-view"),direction:e.direction||!0,gutterCln:e.gutterCln||"sp-gutter",gutterSize:e.gutterSize||5,minSize:e.minSize||0,sizes:(n=e.sizes,n&&n.length>0?n.map((e=>e/100)):[]),onDragEnd:e.onDragEnd};var n,o;let s,i,l,r=null,u=t.parent,c=u.addEventListener,f=u.removeEventListener,a=Array.from(u.children),d="horizontal"===t.direction,g=!1,p=0,m=0,h=0,y=0,z=0;u.dataset.minsize=t.minSize,u.style.flexDirection=d?"row":"column";let x=0;for(const e of a)e.classList.contains("sp-gutter")?(e.style.flex=`0 0 ${t.gutterSize}px`,e.style.cursor=(d?"col":"row")+"-resize"):(e.style.flex=t.sizes.length>0?t.sizes[x]:1,x++);function v(e){l=e.target,g=!0,l.classList.contains(t.gutterCln)?(u=l.parentNode,d=u.classList.contains("horizontal"),r=/^touch/g.test(e.type),s=l.previousElementSibling,i=l.nextElementSibling,s&&i&&(p=d?s.offsetWidth:s.offsetHeight,m=d?i.offsetWidth:i.offsetHeight,e=r?e.changedTouches[0]:e,z=d?e.pageX:e.pageY,y=p+m,h=Number(s.style.flexGrow)+Number(i.style.flexGrow)),r?(c("touchmove",w),c("touchend",S),c("touchcancel",S)):(c("mousemove",w),c("mouseup",S))):g=!1}function w(e){if(g){e=r?e.changedTouches[0]:e;let t=d?e.pageX:e.pageY,n=t-z;p+=n,m-=n;let o=u.dataset.minsize;if(p>=o&&m>=o){let e=h*(p/y),t=h*(m/y);s.style.flexGrow=e,i.style.flexGrow=t}z=t}r||(e.preventDefault(),e.stopPropagation())}function S(){if(g=!1,l=null,t.onDragEnd){const e=[];for(const t of a)t.classList.contains("sp-gutter")||e.push(100*t.style.flexGrow);t.onDragEnd(e)}f("touchmove",w),f("touchend",S),f("touchcancel",S),f("mousemove",w),f("mouseup",S)}c("touchstart",v),c("mousedown",v)}}));
