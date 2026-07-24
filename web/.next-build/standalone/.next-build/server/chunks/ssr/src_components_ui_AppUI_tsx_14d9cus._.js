module.exports=[86860,a=>{"use strict";var b=a.i(87924),c=a.i(72131);function d(...a){return a.filter(Boolean).join(" ")}let e={primary:"bg-[#123c8c] text-white shadow-lg shadow-blue-900/20 hover:bg-[#0f347a]",secondary:"border border-blue-100 bg-white text-[#123c8c] shadow-sm hover:bg-blue-50",danger:"bg-rose-50 text-rose-600 ring-1 ring-rose-100 hover:bg-rose-100",ghost:"bg-transparent text-[#123c8c] hover:bg-blue-50",soft:"bg-[#eaf1ff] text-[#123c8c] ring-1 ring-blue-100 hover:bg-blue-100"},f={sm:"min-h-10 rounded-xl px-4 py-2 text-xs",md:"min-h-12 rounded-2xl px-5 py-3 text-sm",lg:"min-h-14 rounded-2xl px-6 py-4 text-base"};function g(a,b,d){let[e,f]=(0,c.useState)(!1),g=(0,c.useRef)(null),h=(0,c.useRef)(null),i=d?.duration??260,j=d?.actionDelayMs??0;return(0,c.useEffect)(()=>()=>{g.current&&clearTimeout(g.current),h.current&&clearTimeout(h.current)},[]),{isAnimating:e,handleClick:function(c){if(!b&&(g.current&&clearTimeout(g.current),h.current&&clearTimeout(h.current),f(!1),requestAnimationFrame(()=>{f(!0)}),g.current=setTimeout(()=>{f(!1)},i),a)){if(j>0){h.current=setTimeout(()=>{a(c)},j);return}a(c)}}}}function h(){return(0,b.jsx)("style",{children:`
      @keyframes appSoftPress {
        0% {
          transform: scale(1);
        }

        50% {
          transform: scale(0.985);
        }

        100% {
          transform: scale(1);
        }
      }

      @keyframes appSoftIconPress {
        0% {
          transform: scale(1);
        }

        50% {
          transform: scale(0.94);
        }

        100% {
          transform: scale(1);
        }
      }

      @keyframes appSoftShine {
        0% {
          transform: translateX(-120%);
          opacity: 0;
        }

        45% {
          opacity: 0.9;
        }

        100% {
          transform: translateX(120%);
          opacity: 0;
        }
      }

      @keyframes appPageEnter {
        0% {
          opacity: 0;
          transform: translateY(14px);
        }

        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes appSkeletonEnter {
        0% {
          opacity: 0;
          transform: translateY(10px);
        }

        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes appModalBackdropEnter {
        0% {
          opacity: 0;
        }

        100% {
          opacity: 1;
        }
      }

      @keyframes appModalPanelEnter {
        0% {
          opacity: 0;
          transform: translateY(16px) scale(0.985);
        }

        100% {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      @keyframes appFormRevealEnter {
        0% {
          opacity: 0;
          transform: translateY(8px);
        }

        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .app-button-press-active {
        animation: appSoftPress 260ms ease-out;
      }

      .app-icon-press-active {
        animation: appSoftIconPress 260ms ease-out;
      }

      .app-button-shine-active {
        animation: appSoftShine 360ms ease-out;
      }

      .app-page-enter {
        animation: appPageEnter 320ms ease-out both;
        transform-origin: top center;
      }

      .app-page-fade {
        animation: appPageEnter 260ms ease-out both;
        transform-origin: top center;
      }

      .app-skeleton-enter {
        animation: appSkeletonEnter 260ms ease-out both;
        transform-origin: top center;
      }

      .app-modal-backdrop-enter {
        animation: appModalBackdropEnter 180ms ease-out both;
      }

      .app-modal-panel-enter {
        animation: appModalPanelEnter 260ms ease-out both;
        transform-origin: center bottom;
      }

      .app-form-reveal-enter {
        animation: appFormRevealEnter 240ms ease-out both;
      }

      .app-field-smooth {
        transition:
          border-color 180ms ease,
          background-color 180ms ease,
          box-shadow 180ms ease;
      }

      @media (prefers-reduced-motion: reduce) {
        .app-button-press-active,
        .app-icon-press-active,
        .app-button-shine-active,
        .app-page-enter,
        .app-page-fade,
        .app-skeleton-enter,
        .app-modal-backdrop-enter,
        .app-modal-panel-enter,
        .app-form-reveal-enter {
          animation: none !important;
        }
      }
    `})}a.s(["AppAnimatedActionButton",0,function({icon:a,title:c,subtitle:e,loading:f=!1,loadingTitle:i="Opening...",full:j=!1,fullOnMobile:k=!0,disabled:l,className:m,actionDelayMs:n=120,onClick:o,...p}){let q=l||f,{isAnimating:r,handleClick:s}=g(o,q,{duration:280,actionDelayMs:n});return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(h,{}),(0,b.jsxs)("button",{disabled:q,onClick:s,className:d("group relative inline-flex items-center justify-center gap-4 overflow-hidden rounded-[1.8rem] bg-white px-6 py-5 text-[#123c8c] shadow-2xl shadow-blue-950/20 ring-1 ring-white/70 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-blue-950/25 active:scale-[0.98] disabled:cursor-wait disabled:opacity-80",j&&"w-full",k&&"w-full md:w-auto",!j&&!k&&"w-auto",r&&"app-button-press-active",m),...p,children:[(0,b.jsx)("span",{className:d("pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/60 to-transparent opacity-0",r&&"app-button-shine-active")}),(0,b.jsx)("span",{className:d("relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[1.4rem] bg-[#eaf1ff] transition-all duration-200 group-hover:bg-[#123c8c] group-hover:text-white",r&&"app-icon-press-active bg-[#123c8c] text-white"),children:f?(0,b.jsx)("span",{className:"relative z-10 h-6 w-6 animate-spin rounded-full border-2 border-current border-t-transparent"}):(0,b.jsx)("span",{className:"relative z-10 inline-flex items-center justify-center",children:a})}),(0,b.jsxs)("span",{className:"relative z-10 text-left",children:[(0,b.jsx)("span",{className:"block text-xl font-black leading-none tracking-tight",children:f||r?i:c}),e?(0,b.jsx)("span",{className:"mt-1 block text-xs font-bold text-[#123c8c]/70",children:e}):null]})]})]})},"AppBadge",0,function({children:a,className:c,variant:e="blue",...f}){return(0,b.jsx)("span",{className:d("inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black ring-1",{blue:"bg-blue-50 text-[#123c8c] ring-blue-100",green:"bg-emerald-50 text-emerald-700 ring-emerald-100",yellow:"bg-amber-50 text-amber-700 ring-amber-100",red:"bg-red-50 text-red-700 ring-red-100",gray:"bg-slate-100 text-slate-600 ring-slate-200"}[e],c),...f,children:a})},"AppButton",0,function({children:a,className:c,variant:i="primary",size:j="md",full:k=!1,leftIcon:l,rightIcon:m,disabled:n,loading:o=!1,loadingText:p="Memuat...",pressAnimation:q=!1,iconAnimation:r=!1,actionDelayMs:s=0,onClick:t,...u}){let v=n||o,{isAnimating:w,handleClick:x}=g(t,v,{duration:260,actionDelayMs:s});return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(h,{}),(0,b.jsxs)("button",{disabled:v,onClick:x,className:d("relative inline-flex items-center justify-center gap-2 overflow-hidden font-black transition duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60",e[i],f[j],k&&"w-full",o&&"scale-[0.99]",q&&w&&"app-button-press-active",c),...u,children:[q?(0,b.jsx)("span",{className:d("pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0",w&&"app-button-shine-active")}):null,o?(0,b.jsx)("span",{className:"relative z-10 h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent"}):l?(0,b.jsx)("span",{className:d("relative z-10 inline-flex items-center justify-center",r&&w&&"app-icon-press-active"),children:l}):null,(0,b.jsx)("span",{className:"relative z-10",children:o?p:a}),!o&&m?(0,b.jsx)("span",{className:d("relative z-10 inline-flex items-center justify-center",r&&w&&"app-icon-press-active"),children:m}):null]})]})},"AppCard",0,function({children:a,className:c,padding:e="md",...f}){return(0,b.jsx)("div",{className:d("rounded-[2rem] border border-blue-100 bg-white shadow-xl shadow-slate-200/60","sm"===e&&"p-4","md"===e&&"p-5","lg"===e&&"p-6 md:p-8",c),...f,children:a})},"AppEmptyState",0,function({icon:a,title:c,description:d}){return(0,b.jsxs)("div",{className:"rounded-[2rem] border border-dashed border-blue-100 bg-[#f8fbff] px-5 py-12 text-center",children:[a?(0,b.jsx)("div",{className:"mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eaf1ff] text-[#123c8c]",children:a}):null,(0,b.jsx)("p",{className:"mt-4 text-sm font-black text-slate-600",children:c}),d?(0,b.jsx)("p",{className:"mx-auto mt-2 max-w-md text-sm font-semibold leading-6 text-slate-500",children:d}):null]})},"AppFormReveal",0,function({children:a,className:c,delay:e=0,style:f,...g}){return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(h,{}),(0,b.jsx)("div",{className:d("app-form-reveal-enter",c),style:{animationDelay:`${e}ms`,...f},...g,children:a})]})},"AppInput",0,function({label:a,error:c,className:e,...f}){return(0,b.jsxs)("label",{className:"block",children:[a?(0,b.jsx)("span",{className:"text-sm font-black text-slate-700",children:a}):null,(0,b.jsx)("input",{className:d("mt-2 min-h-12 w-full rounded-2xl border border-blue-100 bg-[#f8fbff] px-4 py-3 text-sm font-bold text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#123c8c] focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60",c&&"border-red-200 bg-red-50 focus:border-red-400 focus:ring-red-100",e),...f}),c?(0,b.jsx)("span",{className:"mt-2 block text-xs font-bold text-red-600",children:c}):null]})},"AppLoadingState",0,function({text:a="Memuat data..."}){return(0,b.jsxs)("div",{className:"flex items-center justify-center gap-2 rounded-[2rem] border border-blue-100 bg-white px-5 py-12 text-sm font-bold text-slate-500",children:[(0,b.jsx)("span",{className:"h-5 w-5 animate-spin rounded-full border-2 border-[#123c8c] border-t-transparent"}),a]})},"AppModalMotion",0,function({children:a,className:c,align:e="center",...f}){return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(h,{}),(0,b.jsx)("div",{className:d("app-modal-backdrop-enter fixed inset-0 z-[80] flex bg-slate-950/50 px-4 pb-4 backdrop-blur-sm","center"===e&&"items-end justify-center md:items-center md:pb-0","bottom"===e&&"items-end justify-center",c),...f,children:a})]})},"AppModalPanel",0,function({children:a,className:c,...e}){return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(h,{}),(0,b.jsx)("div",{className:d("app-modal-panel-enter max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] bg-white p-5 shadow-2xl shadow-slate-950/30 md:p-7",c),...e,children:a})]})},"AppSelect",0,function({label:a,error:c,className:e,children:f,value:g,...h}){return(0,b.jsxs)("label",{className:"block",children:[a?(0,b.jsx)("span",{className:"text-sm font-black text-slate-700",children:a}):null,(0,b.jsx)("select",{suppressHydrationWarning:!0,value:g??"",className:d("mt-2 min-h-12 w-full rounded-2xl border border-blue-100 bg-[#f8fbff] px-4 py-3 text-sm font-bold text-slate-700 outline-none transition focus:border-[#123c8c] focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60",c&&"border-red-200 bg-red-50 focus:border-red-400 focus:ring-red-100",e),...h,children:f}),c?(0,b.jsx)("span",{className:"mt-2 block text-xs font-bold text-red-600",children:c}):null]})},"AppTextarea",0,function({label:a,error:c,className:e,...f}){return(0,b.jsxs)("label",{className:"block",children:[a?(0,b.jsx)("span",{className:"text-sm font-black text-slate-700",children:a}):null,(0,b.jsx)("textarea",{className:d("mt-2 min-h-28 w-full resize-none rounded-2xl border border-blue-100 bg-[#f8fbff] px-4 py-4 text-sm font-bold leading-6 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#123c8c] focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60",c&&"border-red-200 bg-red-50 focus:border-red-400 focus:ring-red-100",e),...f}),c?(0,b.jsx)("span",{className:"mt-2 block text-xs font-bold text-red-600",children:c}):null]})}])}];

//# sourceMappingURL=src_components_ui_AppUI_tsx_14d9cus._.js.map