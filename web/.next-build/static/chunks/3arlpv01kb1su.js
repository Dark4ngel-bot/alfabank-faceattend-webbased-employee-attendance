(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,32781,e=>{"use strict";let t=(0,e.i(56420).default)("loader-circle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);e.s(["Loader2",0,t],32781)},84276,e=>{"use strict";var t=e.i(43476),a=e.i(22016),r=e.i(18566),s=e.i(75153),n=e.i(94004),l=e.i(49817),i=e.i(65649);let o=[{href:"/beranda",label:"Beranda",icon:l.Home},{href:"/presensi",label:"Presensi",icon:s.CalendarCheck},{href:"/history",label:"Riwayat",icon:n.History},{href:"/profil",label:"Profil",icon:i.UserRound}];function c(...e){return e.filter(Boolean).join(" ")}function d(){return(0,t.jsx)("style",{children:`
      @keyframes bottomNavShellIn {
        0% {
          opacity: 0;
          transform: translateY(18px) scale(0.98);
        }

        100% {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      @keyframes bottomNavActiveBar {
        0% {
          transform: scaleX(0.45);
        }

        100% {
          transform: scaleX(1);
        }
      }

      @keyframes bottomNavIconPop {
        0% {
          transform: scale(0.94);
        }

        60% {
          transform: scale(1.08);
        }

        100% {
          transform: scale(1);
        }
      }

      .bottom-nav-shell-in {
        animation: bottomNavShellIn 300ms ease-out both;
      }

      .bottom-nav-active-bar {
        transform-origin: center;
        animation: bottomNavActiveBar 220ms ease-out both;
      }

      .bottom-nav-icon-pop {
        animation: bottomNavIconPop 240ms ease-out both;
      }

      @media (prefers-reduced-motion: reduce) {
        .bottom-nav-shell-in,
        .bottom-nav-active-bar,
        .bottom-nav-icon-pop {
          animation: none !important;
          opacity: 1 !important;
          transform: none !important;
        }
      }
    `})}function m({href:e,label:r,active:s,Icon:n}){return(0,t.jsxs)(a.default,{href:e,"aria-current":s?"page":void 0,className:c("relative flex h-[4.05rem] w-full min-w-0 flex-col items-center justify-center gap-1 rounded-[1.25rem] text-[11px] font-black transition-all duration-300 active:scale-[0.96]",s?"bg-[#123c8c] text-white shadow-xl shadow-blue-900/25":"text-slate-400 hover:bg-[#f6f8ff] hover:text-[#123c8c]"),children:[s?(0,t.jsx)("span",{className:"bottom-nav-active-bar absolute -top-1.5 h-1.5 w-11 rounded-full bg-blue-300"}):null,(0,t.jsx)("div",{className:c("flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition duration-300",s?"bottom-nav-icon-pop bg-white/15":"bg-transparent"),children:(0,t.jsx)(n,{size:24,strokeWidth:s?2.8:2.5,className:c("block shrink-0 transition duration-300",s?"text-white":"text-slate-400")})}),(0,t.jsx)("span",{className:"block max-w-full truncate leading-none",children:r})]})}e.s(["default",0,function({variant:e="employee"}){let a=(0,r.usePathname)();return"admin"===e?null:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(d,{}),(0,t.jsx)("div",{"aria-hidden":"true",className:"h-[calc(5.8rem+env(safe-area-inset-bottom))] shrink-0 md:hidden"}),(0,t.jsx)("nav",{className:"fixed bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] left-1/2 z-50 w-[calc(100%-2rem)] max-w-[35rem] -translate-x-1/2 md:hidden",children:(0,t.jsx)("div",{className:"bottom-nav-shell-in overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/90 px-2.5 py-2.5 shadow-2xl shadow-slate-400/25 backdrop-blur-2xl",children:(0,t.jsx)("div",{className:"grid w-full grid-cols-4 gap-1.5",children:o.map(e=>{var r;return(0,t.jsx)(m,{href:e.href,label:e.label,Icon:e.icon,active:"/beranda"===(r=e.href)?"/"===a||"/beranda"===a:"/history"===r?"/history"===a||a.startsWith("/history/"):a===r||a.startsWith(`${r}/`)},e.href)})})})})]})}])},66595,e=>{"use strict";let t=(0,e.i(56420).default)("search",[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]]);e.s(["Search",0,t],66595)},79897,e=>{"use strict";var t=e.i(43476),a=e.i(71645);function r(...e){return e.filter(Boolean).join(" ")}let s={primary:"bg-[#123c8c] text-white shadow-lg shadow-blue-900/20 hover:bg-[#0f347a]",secondary:"border border-blue-100 bg-white text-[#123c8c] shadow-sm hover:bg-blue-50",danger:"bg-rose-50 text-rose-600 ring-1 ring-rose-100 hover:bg-rose-100",ghost:"bg-transparent text-[#123c8c] hover:bg-blue-50",soft:"bg-[#eaf1ff] text-[#123c8c] ring-1 ring-blue-100 hover:bg-blue-100"},n={sm:"min-h-10 rounded-xl px-4 py-2 text-xs",md:"min-h-12 rounded-2xl px-5 py-3 text-sm",lg:"min-h-14 rounded-2xl px-6 py-4 text-base"};function l(e,t,r){let[s,n]=(0,a.useState)(!1),l=(0,a.useRef)(null),i=(0,a.useRef)(null),o=r?.duration??260,c=r?.actionDelayMs??0;return(0,a.useEffect)(()=>()=>{l.current&&clearTimeout(l.current),i.current&&clearTimeout(i.current)},[]),{isAnimating:s,handleClick:function(a){if(!t&&(l.current&&clearTimeout(l.current),i.current&&clearTimeout(i.current),n(!1),requestAnimationFrame(()=>{n(!0)}),l.current=setTimeout(()=>{n(!1)},o),e)){if(c>0){i.current=setTimeout(()=>{e(a)},c);return}e(a)}}}}function i(){return(0,t.jsx)("style",{children:`
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
    `})}e.s(["AppAnimatedActionButton",0,function({icon:e,title:a,subtitle:s,loading:n=!1,loadingTitle:o="Opening...",full:c=!1,fullOnMobile:d=!0,disabled:m,className:p,actionDelayMs:u=120,onClick:h,...x}){let f=m||n,{isAnimating:b,handleClick:g}=l(h,f,{duration:280,actionDelayMs:u});return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(i,{}),(0,t.jsxs)("button",{disabled:f,onClick:g,className:r("group relative inline-flex items-center justify-center gap-4 overflow-hidden rounded-[1.8rem] bg-white px-6 py-5 text-[#123c8c] shadow-2xl shadow-blue-950/20 ring-1 ring-white/70 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-blue-950/25 active:scale-[0.98] disabled:cursor-wait disabled:opacity-80",c&&"w-full",d&&"w-full md:w-auto",!c&&!d&&"w-auto",b&&"app-button-press-active",p),...x,children:[(0,t.jsx)("span",{className:r("pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/60 to-transparent opacity-0",b&&"app-button-shine-active")}),(0,t.jsx)("span",{className:r("relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[1.4rem] bg-[#eaf1ff] transition-all duration-200 group-hover:bg-[#123c8c] group-hover:text-white",b&&"app-icon-press-active bg-[#123c8c] text-white"),children:n?(0,t.jsx)("span",{className:"relative z-10 h-6 w-6 animate-spin rounded-full border-2 border-current border-t-transparent"}):(0,t.jsx)("span",{className:"relative z-10 inline-flex items-center justify-center",children:e})}),(0,t.jsxs)("span",{className:"relative z-10 text-left",children:[(0,t.jsx)("span",{className:"block text-xl font-black leading-none tracking-tight",children:n||b?o:a}),s?(0,t.jsx)("span",{className:"mt-1 block text-xs font-bold text-[#123c8c]/70",children:s}):null]})]})]})},"AppBadge",0,function({children:e,className:a,variant:s="blue",...n}){return(0,t.jsx)("span",{className:r("inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black ring-1",{blue:"bg-blue-50 text-[#123c8c] ring-blue-100",green:"bg-emerald-50 text-emerald-700 ring-emerald-100",yellow:"bg-amber-50 text-amber-700 ring-amber-100",red:"bg-red-50 text-red-700 ring-red-100",gray:"bg-slate-100 text-slate-600 ring-slate-200"}[s],a),...n,children:e})},"AppButton",0,function({children:e,className:a,variant:o="primary",size:c="md",full:d=!1,leftIcon:m,rightIcon:p,disabled:u,loading:h=!1,loadingText:x="Memuat...",pressAnimation:f=!1,iconAnimation:b=!1,actionDelayMs:g=0,onClick:y,...v}){let j=u||h,{isAnimating:w,handleClick:N}=l(y,j,{duration:260,actionDelayMs:g});return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(i,{}),(0,t.jsxs)("button",{disabled:j,onClick:N,className:r("relative inline-flex items-center justify-center gap-2 overflow-hidden font-black transition duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60",s[o],n[c],d&&"w-full",h&&"scale-[0.99]",f&&w&&"app-button-press-active",a),...v,children:[f?(0,t.jsx)("span",{className:r("pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0",w&&"app-button-shine-active")}):null,h?(0,t.jsx)("span",{className:"relative z-10 h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent"}):m?(0,t.jsx)("span",{className:r("relative z-10 inline-flex items-center justify-center",b&&w&&"app-icon-press-active"),children:m}):null,(0,t.jsx)("span",{className:"relative z-10",children:h?x:e}),!h&&p?(0,t.jsx)("span",{className:r("relative z-10 inline-flex items-center justify-center",b&&w&&"app-icon-press-active"),children:p}):null]})]})},"AppCard",0,function({children:e,className:a,padding:s="md",...n}){return(0,t.jsx)("div",{className:r("rounded-[2rem] border border-blue-100 bg-white shadow-xl shadow-slate-200/60","sm"===s&&"p-4","md"===s&&"p-5","lg"===s&&"p-6 md:p-8",a),...n,children:e})},"AppEmptyState",0,function({icon:e,title:a,description:r}){return(0,t.jsxs)("div",{className:"rounded-[2rem] border border-dashed border-blue-100 bg-[#f8fbff] px-5 py-12 text-center",children:[e?(0,t.jsx)("div",{className:"mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eaf1ff] text-[#123c8c]",children:e}):null,(0,t.jsx)("p",{className:"mt-4 text-sm font-black text-slate-600",children:a}),r?(0,t.jsx)("p",{className:"mx-auto mt-2 max-w-md text-sm font-semibold leading-6 text-slate-500",children:r}):null]})},"AppFormReveal",0,function({children:e,className:a,delay:s=0,style:n,...l}){return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(i,{}),(0,t.jsx)("div",{className:r("app-form-reveal-enter",a),style:{animationDelay:`${s}ms`,...n},...l,children:e})]})},"AppInput",0,function({label:e,error:a,className:s,...n}){return(0,t.jsxs)("label",{className:"block",children:[e?(0,t.jsx)("span",{className:"text-sm font-black text-slate-700",children:e}):null,(0,t.jsx)("input",{className:r("mt-2 min-h-12 w-full rounded-2xl border border-blue-100 bg-[#f8fbff] px-4 py-3 text-sm font-bold text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#123c8c] focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60",a&&"border-red-200 bg-red-50 focus:border-red-400 focus:ring-red-100",s),...n}),a?(0,t.jsx)("span",{className:"mt-2 block text-xs font-bold text-red-600",children:a}):null]})},"AppLoadingState",0,function({text:e="Memuat data..."}){return(0,t.jsxs)("div",{className:"flex items-center justify-center gap-2 rounded-[2rem] border border-blue-100 bg-white px-5 py-12 text-sm font-bold text-slate-500",children:[(0,t.jsx)("span",{className:"h-5 w-5 animate-spin rounded-full border-2 border-[#123c8c] border-t-transparent"}),e]})},"AppModalMotion",0,function({children:e,className:a,align:s="center",...n}){return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(i,{}),(0,t.jsx)("div",{className:r("app-modal-backdrop-enter fixed inset-0 z-[80] flex bg-slate-950/50 px-4 pb-4 backdrop-blur-sm","center"===s&&"items-end justify-center md:items-center md:pb-0","bottom"===s&&"items-end justify-center",a),...n,children:e})]})},"AppModalPanel",0,function({children:e,className:a,...s}){return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(i,{}),(0,t.jsx)("div",{className:r("app-modal-panel-enter max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] bg-white p-5 shadow-2xl shadow-slate-950/30 md:p-7",a),...s,children:e})]})},"AppSelect",0,function({label:e,error:a,className:s,children:n,value:l,...i}){return(0,t.jsxs)("label",{className:"block",children:[e?(0,t.jsx)("span",{className:"text-sm font-black text-slate-700",children:e}):null,(0,t.jsx)("select",{suppressHydrationWarning:!0,value:l??"",className:r("mt-2 min-h-12 w-full rounded-2xl border border-blue-100 bg-[#f8fbff] px-4 py-3 text-sm font-bold text-slate-700 outline-none transition focus:border-[#123c8c] focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60",a&&"border-red-200 bg-red-50 focus:border-red-400 focus:ring-red-100",s),...i,children:n}),a?(0,t.jsx)("span",{className:"mt-2 block text-xs font-bold text-red-600",children:a}):null]})},"AppTextarea",0,function({label:e,error:a,className:s,...n}){return(0,t.jsxs)("label",{className:"block",children:[e?(0,t.jsx)("span",{className:"text-sm font-black text-slate-700",children:e}):null,(0,t.jsx)("textarea",{className:r("mt-2 min-h-28 w-full resize-none rounded-2xl border border-blue-100 bg-[#f8fbff] px-4 py-4 text-sm font-bold leading-6 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#123c8c] focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60",a&&"border-red-200 bg-red-50 focus:border-red-400 focus:ring-red-100",s),...n}),a?(0,t.jsx)("span",{className:"mt-2 block text-xs font-bold text-red-600",children:a}):null]})}])},67927,e=>{"use strict";let t=(0,e.i(56420).default)("chevron-right",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);e.s(["ChevronRight",0,t],67927)},77582,e=>{"use strict";var t=e.i(43476),a=e.i(71645),r=e.i(22016),s=e.i(29768),n=e.i(67927),l=e.i(4729),i=e.i(94004),o=e.i(32781),c=e.i(66595);let d=(0,e.i(56420).default)("timer-reset",[["path",{d:"M10 2h4",key:"n1abiw"}],["path",{d:"M12 14v-4",key:"1evpnu"}],["path",{d:"M4 13a8 8 0 0 1 8-7 8 8 0 1 1-5.3 14L4 17.6",key:"1ts96g"}],["path",{d:"M9 17H4v5",key:"8t5av"}]]);var m=e.i(26564),p=e.i(84276),u=e.i(89168),h=e.i(79897);let x=[{value:1,label:"Januari"},{value:2,label:"Februari"},{value:3,label:"Maret"},{value:4,label:"April"},{value:5,label:"Mei"},{value:6,label:"Juni"},{value:7,label:"Juli"},{value:8,label:"Agustus"},{value:9,label:"September"},{value:10,label:"Oktober"},{value:11,label:"November"},{value:12,label:"Desember"}],f=[2024,2025,2026,2027];function b(){return(0,t.jsx)("style",{children:`
      @keyframes historyEnter {
        0% {
          opacity: 0;
          transform: translateY(14px);
        }

        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes historyRowEnter {
        0% {
          opacity: 0;
          transform: translateY(10px);
        }

        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes historyIconPop {
        0% {
          opacity: 0;
          transform: scale(0.92) translateY(8px);
        }

        100% {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }

      @keyframes historyFloatGlow {
        0%,
        100% {
          transform: translate3d(0, 0, 0) scale(1);
        }

        50% {
          transform: translate3d(12px, -10px, 0) scale(1.04);
        }
      }

      .history-enter {
        animation: historyEnter 340ms ease-out both;
      }

      .history-row-enter {
        opacity: 0;
        animation: historyRowEnter 300ms ease-out both;
      }

      .history-icon-pop {
        animation: historyIconPop 280ms ease-out both;
      }

      .history-float-glow {
        animation: historyFloatGlow 6s ease-in-out infinite;
      }

      .history-field {
        transition:
          border-color 180ms ease,
          background-color 180ms ease,
          box-shadow 180ms ease,
          transform 180ms ease;
      }

      .history-field:focus-within {
        transform: translateY(-1px);
      }

      @media (prefers-reduced-motion: reduce) {
        .history-enter,
        .history-row-enter,
        .history-icon-pop,
        .history-float-glow {
          animation: none !important;
          opacity: 1 !important;
          transform: none !important;
        }

        .history-field:focus-within {
          transform: none !important;
        }
      }
    `})}function g({children:e,delay:a="0ms"}){return(0,t.jsx)("span",{className:"history-row-enter rounded-full bg-white/15 px-4 py-2 text-xs font-black text-white ring-1 ring-white/20",style:{animationDelay:a},children:e})}function y(){return(0,t.jsx)("section",{className:"history-enter mx-auto max-w-7xl px-5 pt-7 md:hidden",children:(0,t.jsxs)("div",{className:"flex items-center justify-between gap-4",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-xs font-black uppercase tracking-[0.28em] text-[#123c8c]",children:"FaceAttend"}),(0,t.jsx)("h1",{className:"mt-2 text-3xl font-black tracking-tight text-[#073456]",children:"Laporan Presensi"})]}),(0,t.jsx)("div",{className:"history-icon-pop flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#123c8c] text-white ring-1 ring-[#123c8c]",children:(0,t.jsx)(i.History,{size:24,strokeWidth:2.6})})]})})}function v({monthLabel:e,year:a,total:r,sort:n}){return(0,t.jsx)("section",{className:"mx-auto hidden max-w-7xl px-10 pt-8 md:block lg:px-16",children:(0,t.jsxs)("div",{className:"history-enter relative overflow-hidden rounded-[2.2rem] bg-[#123c8c] p-8 text-white shadow-2xl shadow-blue-900/25",children:[(0,t.jsx)("div",{className:"history-float-glow absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/10"}),(0,t.jsx)("div",{className:"history-float-glow absolute bottom-[-7rem] right-24 h-60 w-60 rounded-full bg-blue-300/10"}),(0,t.jsxs)("div",{className:"relative z-10 flex items-center justify-between gap-8",children:[(0,t.jsxs)("div",{className:"flex items-center gap-5",children:[(0,t.jsx)("div",{className:"history-icon-pop flex h-20 w-20 shrink-0 items-center justify-center rounded-[1.6rem] bg-white/15 text-white ring-1 ring-white/20",children:(0,t.jsx)(i.History,{size:38,strokeWidth:2.5})}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h1",{className:"text-4xl font-black tracking-tight",children:"Riwayat Presensi"}),(0,t.jsxs)("div",{className:"mt-4 flex flex-wrap gap-2",children:[(0,t.jsxs)(g,{delay:"80ms",children:[e," ",a]}),(0,t.jsxs)(g,{delay:"120ms",children:[r," Data"]}),(0,t.jsx)(g,{delay:"160ms",children:"desc"===n?"Terbaru":"Terlama"})]})]})]}),(0,t.jsx)("div",{className:"history-icon-pop flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white/80 ring-1 ring-white/20",children:(0,t.jsx)(s.CalendarDays,{size:28,strokeWidth:2.4})})]})]})})}function j({label:e,value:a,large:r=!1,delay:s="0ms"}){return(0,t.jsx)("div",{className:"history-row-enter",style:{animationDelay:s},children:(0,t.jsxs)(h.AppCard,{padding:"sm",className:"rounded-3xl bg-[#f8fbff] shadow-none transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-lg hover:shadow-slate-200/60",children:[(0,t.jsx)("p",{className:"text-xs font-black uppercase tracking-[0.16em] text-slate-400",children:e}),(0,t.jsx)("p",{className:function(...e){return e.filter(Boolean).join(" ")}("mt-2 font-black text-slate-950",r?"truncate text-lg md:text-2xl":"text-2xl"),children:a})]})})}function w({month:e,year:a,sort:r,monthLabel:n,isLoading:l,onMonthChange:i,onYearChange:d,onSortChange:m,onApply:p}){return(0,t.jsxs)(h.AppCard,{padding:"md",className:"history-enter rounded-[1.8rem] shadow-none md:p-6",children:[(0,t.jsxs)("div",{className:"flex items-center gap-4",children:[(0,t.jsx)("div",{className:"history-icon-pop flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#eaf1ff] text-[#123c8c]",children:(0,t.jsx)(s.CalendarDays,{size:24,strokeWidth:2.6})}),(0,t.jsxs)("div",{className:"min-w-0",children:[(0,t.jsx)("p",{className:"text-xs font-black uppercase tracking-[0.22em] text-[#123c8c]",children:"Filter Riwayat"}),(0,t.jsxs)("h2",{className:"mt-1 text-base font-black text-slate-950 md:text-lg",children:[n," ",a]})]})]}),(0,t.jsxs)("div",{className:"mt-5 grid gap-3 md:grid-cols-[1fr_1fr_1fr_auto]",children:[(0,t.jsx)("div",{className:"history-field",children:(0,t.jsx)(h.AppSelect,{value:e,onChange:e=>i(Number(e.target.value)),className:"!mt-0 h-13 md:h-14",children:x.map(e=>(0,t.jsx)("option",{value:e.value,children:e.label},e.value))})}),(0,t.jsx)("div",{className:"history-field",children:(0,t.jsx)(h.AppSelect,{value:a,onChange:e=>d(Number(e.target.value)),className:"!mt-0 h-13 md:h-14",children:f.map(e=>(0,t.jsx)("option",{value:e,children:e},e))})}),(0,t.jsx)("div",{className:"history-field",children:(0,t.jsxs)(h.AppSelect,{value:r,onChange:e=>m(e.target.value),className:"!mt-0 h-13 md:h-14",children:[(0,t.jsx)("option",{value:"desc",children:"Terbaru"}),(0,t.jsx)("option",{value:"asc",children:"Terlama"})]})}),(0,t.jsx)(h.AppButton,{type:"button",onClick:p,disabled:l,className:"h-13 md:h-14",leftIcon:l?(0,t.jsx)(o.Loader2,{size:18,className:"animate-spin"}):(0,t.jsx)(c.Search,{size:18}),children:"Terapkan"})]})]})}function N({item:e,delay:a="0ms"}){var s,i;let o,c,m,p,u,x=(s=e.date,new Intl.DateTimeFormat("id-ID",{day:"2-digit",month:"short"}).format(new Date(`${s}T00:00:00`))).split(" "),f=e.lateMinutes>0?{text:`Terlambat ${e.lateMinutes} menit`,className:"text-orange-600"}:e.earlyLeaveMinutes>0?{text:`Pulang cepat ${e.earlyLeaveMinutes} menit`,className:"text-amber-600"}:{text:"Normal",className:"text-emerald-600"};return(0,t.jsx)(r.default,{href:`/history/${e.id}`,className:"history-row-enter block rounded-3xl border border-blue-100 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:bg-[#f8fbff] hover:shadow-xl hover:shadow-slate-200/60 active:scale-[0.99]",style:{animationDelay:a},children:(0,t.jsxs)("div",{className:"flex items-start justify-between gap-4",children:[(0,t.jsxs)("div",{className:"flex min-w-0 gap-4",children:[(0,t.jsxs)("div",{className:"flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl bg-[#eaf1ff] text-[#123c8c]",children:[(0,t.jsx)("p",{className:"text-lg font-black leading-none",children:x[0]}),(0,t.jsx)("p",{className:"mt-1 text-[10px] font-black uppercase leading-none",children:x[1]})]}),(0,t.jsxs)("div",{className:"min-w-0",children:[(0,t.jsx)("h2",{className:"truncate text-base font-black capitalize text-slate-950 md:text-xl",children:(i=e.date,o=new Date(`${i}T00:00:00`),c=new Intl.DateTimeFormat("id-ID",{weekday:"long"}).format(o),m=new Intl.DateTimeFormat("id-ID",{day:"2-digit"}).format(o),p=new Intl.DateTimeFormat("id-ID",{month:"long"}).format(o),`${c}, ${m} ${p}`)}),(0,t.jsx)(h.AppBadge,{variant:(u=e.status.toLowerCase()).includes("terlambat")?"yellow":u.includes("cuti")?"blue":u.includes("sakit")||u.includes("tidak")?"red":u.includes("pulang cepat")?"yellow":"green",className:"mt-2",children:e.status}),(0,t.jsxs)("div",{className:"mt-4 grid gap-2 text-sm font-bold text-slate-500 sm:grid-cols-3",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)(l.Clock3,{size:17,className:"shrink-0 text-[#123c8c]",strokeWidth:2.6}),(0,t.jsxs)("span",{children:[e.checkIn," - ",e.checkOut]})]}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)(d,{size:17,className:"shrink-0 text-[#123c8c]",strokeWidth:2.6}),(0,t.jsx)("span",{children:function(e){if(!e||e<=0)return"-";let t=Math.floor(e/60),a=e%60;return t>0&&a>0?`${t}j ${a}m`:t>0?`${t}j`:`${a}m`}(e.workMinutes)})]}),(0,t.jsx)("span",{className:f.className,children:f.text})]})]})]}),(0,t.jsx)("div",{className:"flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#f8fbff] text-slate-400 transition group-hover:text-[#123c8c]",children:(0,t.jsx)(n.ChevronRight,{size:20,strokeWidth:2.6})})]})})}function k({isLoading:e,records:a,monthLabel:r,year:n}){return e?(0,t.jsx)("div",{className:"history-row-enter",children:(0,t.jsx)(h.AppLoadingState,{text:"Memuat riwayat presensi..."})}):a.length?a.map((e,a)=>(0,t.jsx)(N,{item:e,delay:`${55*a}ms`},e.id)):(0,t.jsx)("div",{className:"history-row-enter",children:(0,t.jsx)(h.AppEmptyState,{icon:(0,t.jsx)(s.CalendarDays,{size:28,strokeWidth:2.6}),title:"Belum ada data presensi",description:`Data presensi untuk periode ${r} ${n} belum tersedia.`})})}e.s(["default",0,function(){let e=new Date,[r,s]=(0,a.useState)(e.getMonth()+1),[n,l]=(0,a.useState)(e.getFullYear()),[i,o]=(0,a.useState)("desc"),[c,d]=(0,a.useState)([]),[h,f]=(0,a.useState)(!0),g=(0,a.useMemo)(()=>x.find(e=>e.value===r)?.label||"",[r]);async function N(){try{f(!0);let e=await fetch(`/api/attendance/history?month=${r}&year=${n}&sort=${i}`,{method:"GET",cache:"no-store"});if(!e.ok)return void d([]);let t=await e.json();d(t.records||[])}catch(e){console.error("Gagal mengambil history:",e),d([])}finally{f(!1)}}return(0,a.useEffect)(()=>{N()},[r,n,i]),(0,t.jsxs)(u.default,{variant:"employee",withBottomPadding:!1,children:[(0,t.jsx)(b,{}),(0,t.jsx)("div",{className:"hidden md:block",children:(0,t.jsx)(m.default,{title:"Riwayat",rightLabel:`${g} ${n}`,variant:"employee"})}),(0,t.jsxs)("main",{className:"min-h-dvh bg-gradient-to-br from-[#f6f8ff] via-white to-[#eef4ff] pb-28 text-slate-950",children:[(0,t.jsx)(y,{}),(0,t.jsx)(v,{monthLabel:g,year:n,total:c.length,sort:i}),(0,t.jsxs)("section",{className:"history-enter mx-auto max-w-7xl rounded-t-[2.5rem] bg-white px-5 pb-10 pt-8 md:mt-8 md:rounded-[2.5rem] md:px-8 lg:px-10",children:[(0,t.jsx)(w,{month:r,year:n,sort:i,monthLabel:g,isLoading:h,onMonthChange:s,onYearChange:l,onSortChange:o,onApply:N}),(0,t.jsxs)("div",{className:"mt-6 grid grid-cols-3 gap-3",children:[(0,t.jsx)(j,{label:"Total",value:c.length,delay:"60ms"}),(0,t.jsx)(j,{label:"Bulan",value:g,large:!0,delay:"100ms"}),(0,t.jsx)(j,{label:"Tahun",value:n,delay:"140ms"})]}),(0,t.jsx)("div",{className:"mt-6 space-y-4",children:(0,t.jsx)(k,{isLoading:h,records:c,monthLabel:g,year:n})})]}),(0,t.jsx)(p.default,{})]})]})}],77582)}]);