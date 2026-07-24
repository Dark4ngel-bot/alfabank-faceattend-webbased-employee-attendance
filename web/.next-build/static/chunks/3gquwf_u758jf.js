(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,79897,e=>{"use strict";var t=e.i(43476),a=e.i(71645);function r(...e){return e.filter(Boolean).join(" ")}let n={primary:"bg-[#123c8c] text-white shadow-lg shadow-blue-900/20 hover:bg-[#0f347a]",secondary:"border border-blue-100 bg-white text-[#123c8c] shadow-sm hover:bg-blue-50",danger:"bg-rose-50 text-rose-600 ring-1 ring-rose-100 hover:bg-rose-100",ghost:"bg-transparent text-[#123c8c] hover:bg-blue-50",soft:"bg-[#eaf1ff] text-[#123c8c] ring-1 ring-blue-100 hover:bg-blue-100"},s={sm:"min-h-10 rounded-xl px-4 py-2 text-xs",md:"min-h-12 rounded-2xl px-5 py-3 text-sm",lg:"min-h-14 rounded-2xl px-6 py-4 text-base"};function l(e,t,r){let[n,s]=(0,a.useState)(!1),l=(0,a.useRef)(null),o=(0,a.useRef)(null),i=r?.duration??260,c=r?.actionDelayMs??0;return(0,a.useEffect)(()=>()=>{l.current&&clearTimeout(l.current),o.current&&clearTimeout(o.current)},[]),{isAnimating:n,handleClick:function(a){if(!t&&(l.current&&clearTimeout(l.current),o.current&&clearTimeout(o.current),s(!1),requestAnimationFrame(()=>{s(!0)}),l.current=setTimeout(()=>{s(!1)},i),e)){if(c>0){o.current=setTimeout(()=>{e(a)},c);return}e(a)}}}}function o(){return(0,t.jsx)("style",{children:`
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
    `})}e.s(["AppAnimatedActionButton",0,function({icon:e,title:a,subtitle:n,loading:s=!1,loadingTitle:i="Opening...",full:c=!1,fullOnMobile:d=!0,disabled:p,className:m,actionDelayMs:u=120,onClick:f,...h}){let b=p||s,{isAnimating:x,handleClick:y}=l(f,b,{duration:280,actionDelayMs:u});return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(o,{}),(0,t.jsxs)("button",{disabled:b,onClick:y,className:r("group relative inline-flex items-center justify-center gap-4 overflow-hidden rounded-[1.8rem] bg-white px-6 py-5 text-[#123c8c] shadow-2xl shadow-blue-950/20 ring-1 ring-white/70 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-blue-950/25 active:scale-[0.98] disabled:cursor-wait disabled:opacity-80",c&&"w-full",d&&"w-full md:w-auto",!c&&!d&&"w-auto",x&&"app-button-press-active",m),...h,children:[(0,t.jsx)("span",{className:r("pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/60 to-transparent opacity-0",x&&"app-button-shine-active")}),(0,t.jsx)("span",{className:r("relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[1.4rem] bg-[#eaf1ff] transition-all duration-200 group-hover:bg-[#123c8c] group-hover:text-white",x&&"app-icon-press-active bg-[#123c8c] text-white"),children:s?(0,t.jsx)("span",{className:"relative z-10 h-6 w-6 animate-spin rounded-full border-2 border-current border-t-transparent"}):(0,t.jsx)("span",{className:"relative z-10 inline-flex items-center justify-center",children:e})}),(0,t.jsxs)("span",{className:"relative z-10 text-left",children:[(0,t.jsx)("span",{className:"block text-xl font-black leading-none tracking-tight",children:s||x?i:a}),n?(0,t.jsx)("span",{className:"mt-1 block text-xs font-bold text-[#123c8c]/70",children:n}):null]})]})]})},"AppBadge",0,function({children:e,className:a,variant:n="blue",...s}){return(0,t.jsx)("span",{className:r("inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black ring-1",{blue:"bg-blue-50 text-[#123c8c] ring-blue-100",green:"bg-emerald-50 text-emerald-700 ring-emerald-100",yellow:"bg-amber-50 text-amber-700 ring-amber-100",red:"bg-red-50 text-red-700 ring-red-100",gray:"bg-slate-100 text-slate-600 ring-slate-200"}[n],a),...s,children:e})},"AppButton",0,function({children:e,className:a,variant:i="primary",size:c="md",full:d=!1,leftIcon:p,rightIcon:m,disabled:u,loading:f=!1,loadingText:h="Memuat...",pressAnimation:b=!1,iconAnimation:x=!1,actionDelayMs:y=0,onClick:g,...v}){let k=u||f,{isAnimating:j,handleClick:w}=l(g,k,{duration:260,actionDelayMs:y});return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(o,{}),(0,t.jsxs)("button",{disabled:k,onClick:w,className:r("relative inline-flex items-center justify-center gap-2 overflow-hidden font-black transition duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60",n[i],s[c],d&&"w-full",f&&"scale-[0.99]",b&&j&&"app-button-press-active",a),...v,children:[b?(0,t.jsx)("span",{className:r("pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0",j&&"app-button-shine-active")}):null,f?(0,t.jsx)("span",{className:"relative z-10 h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent"}):p?(0,t.jsx)("span",{className:r("relative z-10 inline-flex items-center justify-center",x&&j&&"app-icon-press-active"),children:p}):null,(0,t.jsx)("span",{className:"relative z-10",children:f?h:e}),!f&&m?(0,t.jsx)("span",{className:r("relative z-10 inline-flex items-center justify-center",x&&j&&"app-icon-press-active"),children:m}):null]})]})},"AppCard",0,function({children:e,className:a,padding:n="md",...s}){return(0,t.jsx)("div",{className:r("rounded-[2rem] border border-blue-100 bg-white shadow-xl shadow-slate-200/60","sm"===n&&"p-4","md"===n&&"p-5","lg"===n&&"p-6 md:p-8",a),...s,children:e})},"AppEmptyState",0,function({icon:e,title:a,description:r}){return(0,t.jsxs)("div",{className:"rounded-[2rem] border border-dashed border-blue-100 bg-[#f8fbff] px-5 py-12 text-center",children:[e?(0,t.jsx)("div",{className:"mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eaf1ff] text-[#123c8c]",children:e}):null,(0,t.jsx)("p",{className:"mt-4 text-sm font-black text-slate-600",children:a}),r?(0,t.jsx)("p",{className:"mx-auto mt-2 max-w-md text-sm font-semibold leading-6 text-slate-500",children:r}):null]})},"AppFormReveal",0,function({children:e,className:a,delay:n=0,style:s,...l}){return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(o,{}),(0,t.jsx)("div",{className:r("app-form-reveal-enter",a),style:{animationDelay:`${n}ms`,...s},...l,children:e})]})},"AppInput",0,function({label:e,error:a,className:n,...s}){return(0,t.jsxs)("label",{className:"block",children:[e?(0,t.jsx)("span",{className:"text-sm font-black text-slate-700",children:e}):null,(0,t.jsx)("input",{className:r("mt-2 min-h-12 w-full rounded-2xl border border-blue-100 bg-[#f8fbff] px-4 py-3 text-sm font-bold text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#123c8c] focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60",a&&"border-red-200 bg-red-50 focus:border-red-400 focus:ring-red-100",n),...s}),a?(0,t.jsx)("span",{className:"mt-2 block text-xs font-bold text-red-600",children:a}):null]})},"AppLoadingState",0,function({text:e="Memuat data..."}){return(0,t.jsxs)("div",{className:"flex items-center justify-center gap-2 rounded-[2rem] border border-blue-100 bg-white px-5 py-12 text-sm font-bold text-slate-500",children:[(0,t.jsx)("span",{className:"h-5 w-5 animate-spin rounded-full border-2 border-[#123c8c] border-t-transparent"}),e]})},"AppModalMotion",0,function({children:e,className:a,align:n="center",...s}){return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(o,{}),(0,t.jsx)("div",{className:r("app-modal-backdrop-enter fixed inset-0 z-[80] flex bg-slate-950/50 px-4 pb-4 backdrop-blur-sm","center"===n&&"items-end justify-center md:items-center md:pb-0","bottom"===n&&"items-end justify-center",a),...s,children:e})]})},"AppModalPanel",0,function({children:e,className:a,...n}){return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(o,{}),(0,t.jsx)("div",{className:r("app-modal-panel-enter max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] bg-white p-5 shadow-2xl shadow-slate-950/30 md:p-7",a),...n,children:e})]})},"AppSelect",0,function({label:e,error:a,className:n,children:s,value:l,...o}){return(0,t.jsxs)("label",{className:"block",children:[e?(0,t.jsx)("span",{className:"text-sm font-black text-slate-700",children:e}):null,(0,t.jsx)("select",{suppressHydrationWarning:!0,value:l??"",className:r("mt-2 min-h-12 w-full rounded-2xl border border-blue-100 bg-[#f8fbff] px-4 py-3 text-sm font-bold text-slate-700 outline-none transition focus:border-[#123c8c] focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60",a&&"border-red-200 bg-red-50 focus:border-red-400 focus:ring-red-100",n),...o,children:s}),a?(0,t.jsx)("span",{className:"mt-2 block text-xs font-bold text-red-600",children:a}):null]})},"AppTextarea",0,function({label:e,error:a,className:n,...s}){return(0,t.jsxs)("label",{className:"block",children:[e?(0,t.jsx)("span",{className:"text-sm font-black text-slate-700",children:e}):null,(0,t.jsx)("textarea",{className:r("mt-2 min-h-28 w-full resize-none rounded-2xl border border-blue-100 bg-[#f8fbff] px-4 py-4 text-sm font-bold leading-6 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#123c8c] focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60",a&&"border-red-200 bg-red-50 focus:border-red-400 focus:ring-red-100",n),...s}),a?(0,t.jsx)("span",{className:"mt-2 block text-xs font-bold text-red-600",children:a}):null]})}])},51757,e=>{"use strict";let t=(0,e.i(56420).default)("circle-check",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);e.s(["CheckCircle2",0,t],51757)},53138,e=>{"use strict";let t=(0,e.i(56420).default)("triangle-alert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);e.s(["AlertTriangle",0,t],53138)},66595,e=>{"use strict";let t=(0,e.i(56420).default)("search",[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]]);e.s(["Search",0,t],66595)},73474,e=>{"use strict";let t=(0,e.i(56420).default)("trash-2",[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]]);e.s(["Trash2",0,t],73474)},26441,e=>{"use strict";let t=(0,e.i(56420).default)("square-pen",[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",key:"1m0v6g"}],["path",{d:"M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",key:"ohrbg2"}]]);e.s(["Edit",0,t],26441)},77071,e=>{"use strict";let t=(0,e.i(56420).default)("plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);e.s(["Plus",0,t],77071)},41120,e=>{"use strict";let t=(0,e.i(56420).default)("refresh-cw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);e.s(["RefreshCw",0,t],41120)},88771,e=>{"use strict";let t=(0,e.i(56420).default)("users-round",[["path",{d:"M18 21a8 8 0 0 0-16 0",key:"3ypg7q"}],["circle",{cx:"10",cy:"8",r:"5",key:"o932ke"}],["path",{d:"M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3",key:"10s06x"}]]);e.s(["UsersRound",0,t],88771)},84276,e=>{"use strict";var t=e.i(43476),a=e.i(22016),r=e.i(18566),n=e.i(75153),s=e.i(94004),l=e.i(49817),o=e.i(65649);let i=[{href:"/beranda",label:"Beranda",icon:l.Home},{href:"/presensi",label:"Presensi",icon:n.CalendarCheck},{href:"/history",label:"Riwayat",icon:s.History},{href:"/profil",label:"Profil",icon:o.UserRound}];function c(...e){return e.filter(Boolean).join(" ")}function d(){return(0,t.jsx)("style",{children:`
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
    `})}function p({href:e,label:r,active:n,Icon:s}){return(0,t.jsxs)(a.default,{href:e,"aria-current":n?"page":void 0,className:c("relative flex h-[4.05rem] w-full min-w-0 flex-col items-center justify-center gap-1 rounded-[1.25rem] text-[11px] font-black transition-all duration-300 active:scale-[0.96]",n?"bg-[#123c8c] text-white shadow-xl shadow-blue-900/25":"text-slate-400 hover:bg-[#f6f8ff] hover:text-[#123c8c]"),children:[n?(0,t.jsx)("span",{className:"bottom-nav-active-bar absolute -top-1.5 h-1.5 w-11 rounded-full bg-blue-300"}):null,(0,t.jsx)("div",{className:c("flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition duration-300",n?"bottom-nav-icon-pop bg-white/15":"bg-transparent"),children:(0,t.jsx)(s,{size:24,strokeWidth:n?2.8:2.5,className:c("block shrink-0 transition duration-300",n?"text-white":"text-slate-400")})}),(0,t.jsx)("span",{className:"block max-w-full truncate leading-none",children:r})]})}e.s(["default",0,function({variant:e="employee"}){let a=(0,r.usePathname)();return"admin"===e?null:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(d,{}),(0,t.jsx)("div",{"aria-hidden":"true",className:"h-[calc(5.8rem+env(safe-area-inset-bottom))] shrink-0 md:hidden"}),(0,t.jsx)("nav",{className:"fixed bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] left-1/2 z-50 w-[calc(100%-2rem)] max-w-[35rem] -translate-x-1/2 md:hidden",children:(0,t.jsx)("div",{className:"bottom-nav-shell-in overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/90 px-2.5 py-2.5 shadow-2xl shadow-slate-400/25 backdrop-blur-2xl",children:(0,t.jsx)("div",{className:"grid w-full grid-cols-4 gap-1.5",children:i.map(e=>{var r;return(0,t.jsx)(p,{href:e.href,label:e.label,Icon:e.icon,active:"/beranda"===(r=e.href)?"/"===a||"/beranda"===a:"/history"===r?"/history"===a||a.startsWith("/history/"):a===r||a.startsWith(`${r}/`)},e.href)})})})})]})}])},20865,e=>{"use strict";let t=(0,e.i(56420).default)("map-pin",[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);e.s(["MapPin",0,t],20865)},82924,e=>{"use strict";let t=(0,e.i(56420).default)("briefcase-business",[["path",{d:"M12 12h.01",key:"1mp3jc"}],["path",{d:"M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2",key:"1ksdt3"}],["path",{d:"M22 13a18.15 18.15 0 0 1-20 0",key:"12hx5q"}],["rect",{width:"20",height:"14",x:"2",y:"6",rx:"2",key:"i6l2r4"}]]);e.s(["BriefcaseBusiness",0,t],82924)},84026,e=>{"use strict";let t=(0,e.i(56420).default)("shield-check",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);e.s(["ShieldCheck",0,t],84026)},91323,70387,41123,96315,e=>{"use strict";var t=e.i(56420);let a=(0,t.default)("badge-check",[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",key:"3c2336"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);e.s(["BadgeCheck",0,a],91323);let r=(0,t.default)("credit-card",[["rect",{width:"20",height:"14",x:"2",y:"5",rx:"2",key:"ynyp8z"}],["line",{x1:"2",x2:"22",y1:"10",y2:"10",key:"1b3vmo"}]]);e.s(["CreditCard",0,r],70387);let n=(0,t.default)("id-card",[["path",{d:"M16 10h2",key:"8sgtl7"}],["path",{d:"M16 14h2",key:"epxaof"}],["path",{d:"M6.17 15a3 3 0 0 1 5.66 0",key:"n6f512"}],["circle",{cx:"9",cy:"11",r:"2",key:"yxgjnd"}],["rect",{x:"2",y:"5",width:"20",height:"14",rx:"2",key:"qneu4z"}]]);e.s(["IdCard",0,n],41123);let s=(0,t.default)("mail",[["path",{d:"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",key:"132q7q"}],["rect",{x:"2",y:"4",width:"20",height:"16",rx:"2",key:"izxlao"}]]);e.s(["Mail",0,s],96315)}]);