!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).SplitViews=t()}(this,(function(){"use strict";return function(e){let t={parent:(o=e.parent,("string"==typeof o?document.querySelector(o):o)||".split-view"),direction:e.direction||!0,gutterCln:e.gutterCln||"sp-gutter",gutterSize:e.gutterSize||5,minSize:(e.minSize||0)/100,sizes:(n=e.sizes,n&&n.length>0?n.map((e=>e/100)):[]),onDragEnd:e.onDragEnd||null};var n,o;let i=null,s=window.addEventListener,l=window.removeEventListener,r=t.parent,u=Array.from(r.children),c=null,f=null,a=null,g="horizontal"===t.direction,d=!1,p=0,m=0,h=0,y=0,z=0;r.style.flexDirection=g?"row":"column";let w=0;for(const n of u)n.classList.contains("sp-gutter")?(n.style.flex=`0 0 ${e.gutterSize}px`,n.style.cursor=(g?"col":"row")+"-resize"):(n.style.flex=t.sizes.length>0?t.sizes[w]:1,w++);function S(e){a=e.target,d=!0,a.classList.contains("sp-gutter")?(i=/^touch/g.test(e.type),c=a.previousElementSibling,f=a.nextElementSibling,c&&f&&(p=g?c.offsetWidth:c.offsetHeight,m=g?f.offsetWidth:f.offsetHeight,e=i?e.changedTouches[0]:e,z=g?e.pageX:e.pageY,y=p+m,h=Number(c.style.flexGrow)+Number(f.style.flexGrow)),i?(s("touchmove",x),s("touchend",v),s("touchcancel",v)):(s("mousemove",x),s("mouseup",v))):d=!1}function x(e){if(d){e=i?e.changedTouches[0]:e;let n=g?e.pageX:e.pageY,o=n-z;p+=o,m-=o;let s=p<t.minSize||m<t.minSize;if(!s){let e=h*(p/y),n=h*(m/y);s=e<t.minSize||n<t.minSize,c&&f&&!s&&(c.style.flexGrow=e,f.style.flexGrow=n)}z=n}i||(e.preventDefault(),e.stopPropagation())}function v(){if(d=!1,a=null,t.onDragEnd){const e=[];for(const t of u)t.classList.contains("sp-gutter")||e.push(100*t.style.flexGrow);t.onDragEnd(e)}i?(l("touchmove",x),l("touchend",v),l("touchcancel",v)):(l("mousemove",x),l("mouseup",v))}s("touchstart",S),s("mousedown",S)}}));
