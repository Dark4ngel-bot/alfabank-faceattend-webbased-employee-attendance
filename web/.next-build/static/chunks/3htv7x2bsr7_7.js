(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,84276,e=>{"use strict";var t=e.i(43476),a=e.i(22016),n=e.i(18566),r=e.i(75153),s=e.i(94004),l=e.i(49817),i=e.i(65649);let o=[{href:"/beranda",label:"Beranda",icon:l.Home},{href:"/presensi",label:"Presensi",icon:r.CalendarCheck},{href:"/history",label:"Riwayat",icon:s.History},{href:"/profil",label:"Profil",icon:i.UserRound}];function c(...e){return e.filter(Boolean).join(" ")}function d(){return(0,t.jsx)("style",{children:`
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
    `})}function m({href:e,label:n,active:r,Icon:s}){return(0,t.jsxs)(a.default,{href:e,"aria-current":r?"page":void 0,className:c("relative flex h-[4.05rem] w-full min-w-0 flex-col items-center justify-center gap-1 rounded-[1.25rem] text-[11px] font-black transition-all duration-300 active:scale-[0.96]",r?"bg-[#123c8c] text-white shadow-xl shadow-blue-900/25":"text-slate-400 hover:bg-[#f6f8ff] hover:text-[#123c8c]"),children:[r?(0,t.jsx)("span",{className:"bottom-nav-active-bar absolute -top-1.5 h-1.5 w-11 rounded-full bg-blue-300"}):null,(0,t.jsx)("div",{className:c("flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition duration-300",r?"bottom-nav-icon-pop bg-white/15":"bg-transparent"),children:(0,t.jsx)(s,{size:24,strokeWidth:r?2.8:2.5,className:c("block shrink-0 transition duration-300",r?"text-white":"text-slate-400")})}),(0,t.jsx)("span",{className:"block max-w-full truncate leading-none",children:n})]})}e.s(["default",0,function({variant:e="employee"}){let a=(0,n.usePathname)();return"admin"===e?null:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(d,{}),(0,t.jsx)("div",{"aria-hidden":"true",className:"h-[calc(5.8rem+env(safe-area-inset-bottom))] shrink-0 md:hidden"}),(0,t.jsx)("nav",{className:"fixed bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] left-1/2 z-50 w-[calc(100%-2rem)] max-w-[35rem] -translate-x-1/2 md:hidden",children:(0,t.jsx)("div",{className:"bottom-nav-shell-in overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/90 px-2.5 py-2.5 shadow-2xl shadow-slate-400/25 backdrop-blur-2xl",children:(0,t.jsx)("div",{className:"grid w-full grid-cols-4 gap-1.5",children:o.map(e=>{var n;return(0,t.jsx)(m,{href:e.href,label:e.label,Icon:e.icon,active:"/beranda"===(n=e.href)?"/"===a||"/beranda"===a:"/history"===n?"/history"===a||a.startsWith("/history/"):a===n||a.startsWith(`${n}/`)},e.href)})})})})]})}])},79897,e=>{"use strict";var t=e.i(43476),a=e.i(71645);function n(...e){return e.filter(Boolean).join(" ")}let r={primary:"bg-[#123c8c] text-white shadow-lg shadow-blue-900/20 hover:bg-[#0f347a]",secondary:"border border-blue-100 bg-white text-[#123c8c] shadow-sm hover:bg-blue-50",danger:"bg-rose-50 text-rose-600 ring-1 ring-rose-100 hover:bg-rose-100",ghost:"bg-transparent text-[#123c8c] hover:bg-blue-50",soft:"bg-[#eaf1ff] text-[#123c8c] ring-1 ring-blue-100 hover:bg-blue-100"},s={sm:"min-h-10 rounded-xl px-4 py-2 text-xs",md:"min-h-12 rounded-2xl px-5 py-3 text-sm",lg:"min-h-14 rounded-2xl px-6 py-4 text-base"};function l(e,t,n){let[r,s]=(0,a.useState)(!1),l=(0,a.useRef)(null),i=(0,a.useRef)(null),o=n?.duration??260,c=n?.actionDelayMs??0;return(0,a.useEffect)(()=>()=>{l.current&&clearTimeout(l.current),i.current&&clearTimeout(i.current)},[]),{isAnimating:r,handleClick:function(a){if(!t&&(l.current&&clearTimeout(l.current),i.current&&clearTimeout(i.current),s(!1),requestAnimationFrame(()=>{s(!0)}),l.current=setTimeout(()=>{s(!1)},o),e)){if(c>0){i.current=setTimeout(()=>{e(a)},c);return}e(a)}}}}function i(){return(0,t.jsx)("style",{children:`
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
    `})}e.s(["AppAnimatedActionButton",0,function({icon:e,title:a,subtitle:r,loading:s=!1,loadingTitle:o="Opening...",full:c=!1,fullOnMobile:d=!0,disabled:m,className:p,actionDelayMs:u=120,onClick:h,...x}){let f=m||s,{isAnimating:b,handleClick:g}=l(h,f,{duration:280,actionDelayMs:u});return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(i,{}),(0,t.jsxs)("button",{disabled:f,onClick:g,className:n("group relative inline-flex items-center justify-center gap-4 overflow-hidden rounded-[1.8rem] bg-white px-6 py-5 text-[#123c8c] shadow-2xl shadow-blue-950/20 ring-1 ring-white/70 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-blue-950/25 active:scale-[0.98] disabled:cursor-wait disabled:opacity-80",c&&"w-full",d&&"w-full md:w-auto",!c&&!d&&"w-auto",b&&"app-button-press-active",p),...x,children:[(0,t.jsx)("span",{className:n("pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/60 to-transparent opacity-0",b&&"app-button-shine-active")}),(0,t.jsx)("span",{className:n("relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[1.4rem] bg-[#eaf1ff] transition-all duration-200 group-hover:bg-[#123c8c] group-hover:text-white",b&&"app-icon-press-active bg-[#123c8c] text-white"),children:s?(0,t.jsx)("span",{className:"relative z-10 h-6 w-6 animate-spin rounded-full border-2 border-current border-t-transparent"}):(0,t.jsx)("span",{className:"relative z-10 inline-flex items-center justify-center",children:e})}),(0,t.jsxs)("span",{className:"relative z-10 text-left",children:[(0,t.jsx)("span",{className:"block text-xl font-black leading-none tracking-tight",children:s||b?o:a}),r?(0,t.jsx)("span",{className:"mt-1 block text-xs font-bold text-[#123c8c]/70",children:r}):null]})]})]})},"AppBadge",0,function({children:e,className:a,variant:r="blue",...s}){return(0,t.jsx)("span",{className:n("inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black ring-1",{blue:"bg-blue-50 text-[#123c8c] ring-blue-100",green:"bg-emerald-50 text-emerald-700 ring-emerald-100",yellow:"bg-amber-50 text-amber-700 ring-amber-100",red:"bg-red-50 text-red-700 ring-red-100",gray:"bg-slate-100 text-slate-600 ring-slate-200"}[r],a),...s,children:e})},"AppButton",0,function({children:e,className:a,variant:o="primary",size:c="md",full:d=!1,leftIcon:m,rightIcon:p,disabled:u,loading:h=!1,loadingText:x="Memuat...",pressAnimation:f=!1,iconAnimation:b=!1,actionDelayMs:g=0,onClick:v,...w}){let j=u||h,{isAnimating:y,handleClick:k}=l(v,j,{duration:260,actionDelayMs:g});return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(i,{}),(0,t.jsxs)("button",{disabled:j,onClick:k,className:n("relative inline-flex items-center justify-center gap-2 overflow-hidden font-black transition duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60",r[o],s[c],d&&"w-full",h&&"scale-[0.99]",f&&y&&"app-button-press-active",a),...w,children:[f?(0,t.jsx)("span",{className:n("pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0",y&&"app-button-shine-active")}):null,h?(0,t.jsx)("span",{className:"relative z-10 h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent"}):m?(0,t.jsx)("span",{className:n("relative z-10 inline-flex items-center justify-center",b&&y&&"app-icon-press-active"),children:m}):null,(0,t.jsx)("span",{className:"relative z-10",children:h?x:e}),!h&&p?(0,t.jsx)("span",{className:n("relative z-10 inline-flex items-center justify-center",b&&y&&"app-icon-press-active"),children:p}):null]})]})},"AppCard",0,function({children:e,className:a,padding:r="md",...s}){return(0,t.jsx)("div",{className:n("rounded-[2rem] border border-blue-100 bg-white shadow-xl shadow-slate-200/60","sm"===r&&"p-4","md"===r&&"p-5","lg"===r&&"p-6 md:p-8",a),...s,children:e})},"AppEmptyState",0,function({icon:e,title:a,description:n}){return(0,t.jsxs)("div",{className:"rounded-[2rem] border border-dashed border-blue-100 bg-[#f8fbff] px-5 py-12 text-center",children:[e?(0,t.jsx)("div",{className:"mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eaf1ff] text-[#123c8c]",children:e}):null,(0,t.jsx)("p",{className:"mt-4 text-sm font-black text-slate-600",children:a}),n?(0,t.jsx)("p",{className:"mx-auto mt-2 max-w-md text-sm font-semibold leading-6 text-slate-500",children:n}):null]})},"AppFormReveal",0,function({children:e,className:a,delay:r=0,style:s,...l}){return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(i,{}),(0,t.jsx)("div",{className:n("app-form-reveal-enter",a),style:{animationDelay:`${r}ms`,...s},...l,children:e})]})},"AppInput",0,function({label:e,error:a,className:r,...s}){return(0,t.jsxs)("label",{className:"block",children:[e?(0,t.jsx)("span",{className:"text-sm font-black text-slate-700",children:e}):null,(0,t.jsx)("input",{className:n("mt-2 min-h-12 w-full rounded-2xl border border-blue-100 bg-[#f8fbff] px-4 py-3 text-sm font-bold text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#123c8c] focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60",a&&"border-red-200 bg-red-50 focus:border-red-400 focus:ring-red-100",r),...s}),a?(0,t.jsx)("span",{className:"mt-2 block text-xs font-bold text-red-600",children:a}):null]})},"AppLoadingState",0,function({text:e="Memuat data..."}){return(0,t.jsxs)("div",{className:"flex items-center justify-center gap-2 rounded-[2rem] border border-blue-100 bg-white px-5 py-12 text-sm font-bold text-slate-500",children:[(0,t.jsx)("span",{className:"h-5 w-5 animate-spin rounded-full border-2 border-[#123c8c] border-t-transparent"}),e]})},"AppModalMotion",0,function({children:e,className:a,align:r="center",...s}){return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(i,{}),(0,t.jsx)("div",{className:n("app-modal-backdrop-enter fixed inset-0 z-[80] flex bg-slate-950/50 px-4 pb-4 backdrop-blur-sm","center"===r&&"items-end justify-center md:items-center md:pb-0","bottom"===r&&"items-end justify-center",a),...s,children:e})]})},"AppModalPanel",0,function({children:e,className:a,...r}){return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(i,{}),(0,t.jsx)("div",{className:n("app-modal-panel-enter max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] bg-white p-5 shadow-2xl shadow-slate-950/30 md:p-7",a),...r,children:e})]})},"AppSelect",0,function({label:e,error:a,className:r,children:s,value:l,...i}){return(0,t.jsxs)("label",{className:"block",children:[e?(0,t.jsx)("span",{className:"text-sm font-black text-slate-700",children:e}):null,(0,t.jsx)("select",{suppressHydrationWarning:!0,value:l??"",className:n("mt-2 min-h-12 w-full rounded-2xl border border-blue-100 bg-[#f8fbff] px-4 py-3 text-sm font-bold text-slate-700 outline-none transition focus:border-[#123c8c] focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60",a&&"border-red-200 bg-red-50 focus:border-red-400 focus:ring-red-100",r),...i,children:s}),a?(0,t.jsx)("span",{className:"mt-2 block text-xs font-bold text-red-600",children:a}):null]})},"AppTextarea",0,function({label:e,error:a,className:r,...s}){return(0,t.jsxs)("label",{className:"block",children:[e?(0,t.jsx)("span",{className:"text-sm font-black text-slate-700",children:e}):null,(0,t.jsx)("textarea",{className:n("mt-2 min-h-28 w-full resize-none rounded-2xl border border-blue-100 bg-[#f8fbff] px-4 py-4 text-sm font-bold leading-6 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#123c8c] focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60",a&&"border-red-200 bg-red-50 focus:border-red-400 focus:ring-red-100",r),...s}),a?(0,t.jsx)("span",{className:"mt-2 block text-xs font-bold text-red-600",children:a}):null]})}])},26091,e=>{"use strict";let t=(0,e.i(56420).default)("file-text",[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]);e.s(["FileText",0,t],26091)},17684,e=>{"use strict";let t=(0,e.i(56420).default)("scan-face",[["path",{d:"M3 7V5a2 2 0 0 1 2-2h2",key:"aa7l1z"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2",key:"4qcy5o"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2",key:"6vwrx8"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2",key:"ioqczr"}],["path",{d:"M8 14s1.5 2 4 2 4-2 4-2",key:"1y1vjs"}],["path",{d:"M9 9h.01",key:"1q5me6"}],["path",{d:"M15 9h.01",key:"x1ddxp"}]]);e.s(["ScanFace",0,t],17684)},76983,e=>{"use strict";var t=e.i(43476),a=e.i(71645),n=e.i(57688),r=e.i(22016),s=e.i(70812),l=e.i(79287),i=e.i(26091),o=e.i(94004),c=e.i(65489),d=e.i(17684),m=e.i(65649),p=e.i(26564),u=e.i(84276),h=e.i(89168),x=e.i(79897);let f="faceattend_read_announcement_id",b={name:"",role:"",profile_photo:null,position:null,department:null,jabatan:null,shift:null},g={checkIn:"--:--",checkOut:"--:--",status:"Menunggu",description:"Menunggu presensi",schedule:""},v=[{href:"/history",label:"Laporan\nPresensi",description:"Riwayat kehadiran",icon:o.History},{href:"/presensi",label:"Presensi",description:"Check-in/out",icon:d.ScanFace},{href:"/profil",label:"Profil",description:"Data akun",icon:m.UserRound},{href:"/cuti",label:"Izin/Cuti",description:"Ajukan izin",icon:i.FileText}];function w(e){return e&&"--:--"!==e?e.replace(".",":"):"--:--"}async function j(e){let t=await e.text();try{return t?JSON.parse(t):{}}catch{throw Error("Response API bukan JSON.")}}async function y(e){try{let t=await fetch(e,{method:"GET",cache:"no-store"});if(!t.ok)return null;return await j(t)}catch(t){return console.error(`Gagal mengambil data ${e}:`,t),null}}function k(){return(0,t.jsx)("style",{children:`
      @keyframes homeEnter {
        0% {
          opacity: 0;
          transform: translateY(14px);
        }

        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes homeCardEnter {
        0% {
          opacity: 0;
          transform: translateY(12px) scale(0.985);
        }

        100% {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      @keyframes homeIconPop {
        0% {
          opacity: 0;
          transform: translateY(8px) scale(0.92);
        }

        100% {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      @keyframes homeTextReveal {
        0% {
          opacity: 0;
          transform: translateY(10px);
          filter: blur(4px);
        }

        100% {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0);
        }
      }

      @keyframes homePulseDot {
        0%,
        100% {
          transform: scale(1);
          opacity: 1;
        }

        50% {
          transform: scale(1.22);
          opacity: 0.72;
        }
      }

      @keyframes homeFloatGlow {
        0%,
        100% {
          transform: translate3d(0, 0, 0) scale(1);
        }

        50% {
          transform: translate3d(12px, -10px, 0) scale(1.05);
        }
      }

      .home-enter {
        animation: homeEnter 340ms ease-out both;
      }

      .home-card-enter {
        opacity: 0;
        animation: homeCardEnter 340ms ease-out both;
      }

      .home-icon-pop {
        animation: homeIconPop 300ms ease-out both;
      }

      .home-text-reveal {
        animation: homeTextReveal 380ms ease-out both;
      }

      .home-pulse-dot {
        animation: homePulseDot 1.45s ease-in-out infinite;
      }

      .home-float-glow {
        animation: homeFloatGlow 6s ease-in-out infinite;
      }

      @media (prefers-reduced-motion: reduce) {
        .home-enter,
        .home-card-enter,
        .home-icon-pop,
        .home-text-reveal,
        .home-pulse-dot,
        .home-float-glow {
          animation: none !important;
          opacity: 1 !important;
          transform: none !important;
          filter: none !important;
        }
      }
    `})}function N({user:e,size:a="mobile",variant:n="light"}){let r="desktop"===a?"h-24 w-24 text-2xl":"h-12 w-12 text-sm";return e.profile_photo?(0,t.jsx)("img",{src:e.profile_photo,alt:e.name||"Profil",className:`home-icon-pop ${r} shrink-0 rounded-full object-cover ${"desktop"===a?"ring-4 ring-white/70":"ring-4 ring-white"}`}):(0,t.jsx)("div",{className:`home-icon-pop ${r} flex shrink-0 items-center justify-center rounded-full font-black ${"blue"===n?"bg-white/15 text-white ring-4 ring-white/20":"bg-[#eaf1ff] text-[#123c8c] ring-4 ring-white"}`,children:e.name?e.name.split(" ").filter(Boolean).map(e=>e[0]).join("").slice(0,2).toUpperCase():""})}function M({href:e="/pengumuman",unread:a,desktop:n=!1,onClick:l}){return(0,t.jsxs)(r.default,{href:e,onClick:l,className:`home-icon-pop relative flex shrink-0 items-center justify-center rounded-2xl ring-1 transition hover:-translate-y-0.5 active:scale-[0.96] ${n?"h-16 w-16":"h-12 w-12"} ${a?n?"bg-white text-[#123c8c] ring-white":"bg-[#123c8c] text-white ring-[#123c8c]":n?"bg-white/10 text-white/70 ring-white/20":"bg-white text-slate-400 ring-blue-100"}`,"aria-label":"Pengumuman",children:[(0,t.jsx)(s.Bell,{size:n?28:24,fill:a?n?"#123c8c":"white":"transparent",strokeWidth:2.2}),a?(0,t.jsx)("span",{className:`home-pulse-dot absolute rounded-full bg-red-500 ring-2 ring-white ${n?"right-3 top-3 h-4 w-4":"right-2 top-2 h-3 w-3"}`}):null]})}function S(){return(0,t.jsx)("a",{href:"https://wa.me/6281234567890",target:"_blank",rel:"noopener noreferrer","aria-label":"Hubungi WhatsApp",className:"home-icon-pop flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 shadow-sm ring-1 ring-emerald-200 transition hover:-translate-y-0.5 hover:bg-emerald-100 active:scale-[0.96]",children:(0,t.jsx)(l.PhoneCall,{size:24,strokeWidth:2.7})})}function P({items:e}){return(0,t.jsx)("div",{className:"mt-4 flex flex-wrap gap-2",children:e.filter(Boolean).map((e,a)=>(0,t.jsx)("span",{className:"home-card-enter rounded-full bg-white/15 px-4 py-2 text-xs font-black text-white ring-1 ring-white/20",style:{animationDelay:`${55*a}ms`},children:e},e))})}function A(){return(0,t.jsx)("div",{className:"grid grid-cols-4 gap-x-2 gap-y-3 md:grid-cols-4 md:gap-5",children:v.map(({href:e,label:a,description:n,icon:s},l)=>(0,t.jsxs)(r.default,{href:e,className:"home-card-enter group flex flex-col items-center rounded-3xl text-center transition hover:-translate-y-0.5 active:scale-[0.98] md:border md:border-blue-100 md:bg-[#f8fbff] md:p-6 md:hover:-translate-y-1 md:hover:bg-white md:hover:shadow-xl md:hover:shadow-slate-200/60",style:{animationDelay:`${70*l}ms`},children:[(0,t.jsx)("div",{className:"flex h-14 w-14 items-center justify-center rounded-full bg-[#eaf1ff] transition group-hover:scale-105 md:h-20 md:w-20",children:(0,t.jsx)("div",{className:"flex h-10 w-10 items-center justify-center rounded-2xl bg-[#123c8c] text-white shadow-lg shadow-blue-900/20 transition group-hover:rotate-[-2deg] md:h-14 md:w-14",children:(0,t.jsx)(s,{size:22,strokeWidth:2.6})})}),(0,t.jsx)("p",{className:"mt-2 whitespace-pre-line text-[12px] font-bold leading-tight text-slate-600 md:mt-3 md:text-base",children:a}),(0,t.jsx)("p",{className:"mt-2 hidden text-sm leading-6 text-slate-400 md:block",children:n})]},e))})}function I({label:e,href:a,disabled:n,variant:s}){return(0,t.jsx)(r.default,{href:n?"#":a,onClick:e=>{n&&e.preventDefault()},className:`flex h-14 items-center justify-center rounded-2xl text-sm font-black transition md:h-20 md:text-lg ${n?"cursor-not-allowed border-slate-100 bg-slate-100 text-slate-300":"primary"===s?"bg-[#123c8c] text-white shadow-lg shadow-blue-900/20 hover:-translate-y-0.5 hover:bg-[#0f3274] active:scale-[0.98]":"border border-blue-100 bg-white text-[#123c8c] hover:-translate-y-0.5 hover:bg-[#eaf1ff] active:scale-[0.98]"}`,children:e})}function z({announcements:e,hasAnnouncement:a,onRead:n}){if(!a)return(0,t.jsx)("div",{className:"home-card-enter rounded-3xl border border-dashed border-blue-100 bg-white px-5 py-6 text-center shadow-sm md:py-14",children:(0,t.jsx)("p",{className:"text-sm font-bold text-slate-400 md:text-base",children:"Pengumuman Kosong"})});let s=e[0];return(0,t.jsxs)(r.default,{href:"/pengumuman",onClick:n,className:"home-card-enter block min-w-0 rounded-3xl border border-blue-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f8fbff] hover:shadow-xl hover:shadow-slate-200/60 active:scale-[0.99] md:p-5",children:[(0,t.jsxs)("div",{className:"mb-3 inline-flex items-center gap-2 rounded-full bg-[#eaf1ff] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-[#123c8c]",children:[(0,t.jsx)(c.Megaphone,{size:14}),"Pengumuman Terbaru"]}),(0,t.jsx)("p",{className:"line-clamp-2 break-words text-base font-black leading-6 text-slate-950 [overflow-wrap:anywhere] md:text-base",children:s.title}),s.content?(0,t.jsx)("p",{className:"mt-2 line-clamp-3 break-words text-sm font-semibold leading-6 text-slate-500 [overflow-wrap:anywhere] md:line-clamp-2",children:s.content}):null,s.document_url||s.documentUrl?(0,t.jsxs)("div",{className:"mt-3 inline-flex max-w-full items-center gap-2 rounded-2xl bg-[#eaf1ff] px-3 py-2 text-xs font-black text-[#123c8c]",children:[(0,t.jsx)(i.FileText,{size:14,strokeWidth:2.6}),(0,t.jsx)("span",{className:"truncate",children:s.document_name||s.documentName||"Dokumen PDF"})]}):null]})}e.s(["default",0,function(){var e;let[s,l]=(0,a.useState)(""),[i,o]=(0,a.useState)(""),[c,d]=(0,a.useState)(b),[m,v]=(0,a.useState)(g),[j,D]=(0,a.useState)([]),[C,E]=(0,a.useState)(null);(0,a.useEffect)(()=>{function e(){let e=new Date;l(`${new Intl.DateTimeFormat("id-ID",{timeZone:"Asia/Jakarta",hour:"2-digit",minute:"2-digit",hour12:!1}).format(e).replace(".",":")} WIB`),o(new Intl.DateTimeFormat("id-ID",{timeZone:"Asia/Jakarta",weekday:"long",day:"2-digit",month:"long",year:"numeric"}).format(e))}e();let t=setInterval(e,1e3);return()=>clearInterval(t)},[]),(0,a.useEffect)(()=>{E(window.localStorage.getItem(f))},[]),(0,a.useEffect)(()=>{!async function(){let[e,t,a]=await Promise.all([y("/api/auth/me"),y("/api/attendance/today"),y("/api/announcements?audience=employee")]),n=e?.user||e?.data||e||{},r=t||{},s=a?.announcements||a?.data||[];d({id:n.id,name:n.name||"",email:n.email,role:n.role||"",profile_photo:n.profile_photo||null,position:n.position||null,department:n.department||null,jabatan:n.jabatan||null,shift:n.shift||null}),v({checkIn:w(r.checkIn||"--:--"),checkOut:w(r.checkOut||"--:--"),status:r.status||"Menunggu",description:r.description||"Menunggu presensi",schedule:r.schedule||r.workSchedule||r.shiftSchedule||""}),D(Array.isArray(s)?s:[])}()},[]);let B=c.name?(e=c.name).split(" ").filter(Boolean)[0]||e:"",F=j.length>0,T=j[0]?.id||"",Y=!!T&&T!==C,$=(0,a.useMemo)(()=>c.position?.name||c.department?.name||"",[c.position?.name,c.department?.name]),R=(0,a.useMemo)(()=>c.shift?.name||c.position?.name||c.department?.name||"",[c.shift?.name,c.position?.name,c.department?.name]),W=(0,a.useMemo)(()=>m.schedule?`Jam kerja kamu pukul ${m.schedule}`:c.shift?.name?`Shift kamu: ${c.shift.name}`:"Jam kerja mengikuti shift yang terdaftar",[m.schedule,c.shift?.name]),H="--:--"!==m.checkIn,_="--:--"!==m.checkOut;function O(){T&&(window.localStorage.setItem(f,T),E(T))}return(0,t.jsxs)(h.default,{variant:"employee",withBottomPadding:!1,className:"bg-white md:bg-[#f6f8ff]",children:[(0,t.jsx)(k,{}),(0,t.jsxs)("div",{className:"min-h-dvh bg-white",children:[(0,t.jsx)("div",{className:"hidden md:block",children:(0,t.jsx)(p.default,{title:"Beranda",rightLabel:R||void 0,variant:"employee"})}),(0,t.jsxs)("main",{className:"min-h-dvh overflow-x-hidden bg-white text-slate-950 md:bg-gradient-to-br md:from-[#f6f8ff] md:via-white md:to-[#eef4ff] md:pb-28",children:[(0,t.jsx)("div",{className:"home-float-glow pointer-events-none fixed -left-32 top-24 hidden h-72 w-72 rounded-full bg-orange-200/20 blur-3xl md:block"}),(0,t.jsx)("div",{className:"home-float-glow pointer-events-none fixed -right-32 bottom-24 hidden h-72 w-72 rounded-full bg-blue-300/20 blur-3xl md:block"}),(0,t.jsx)("section",{className:"home-enter bg-white md:hidden",style:{paddingTop:"env(safe-area-inset-top, 0px)"},children:(0,t.jsxs)("div",{className:"mx-auto w-full max-w-7xl px-5 pt-6",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between gap-4",children:[(0,t.jsxs)("div",{className:"flex min-w-0 items-center gap-3",children:[(0,t.jsx)("div",{className:"home-icon-pop flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white p-2 ring-1 ring-blue-100",children:(0,t.jsx)(n.default,{src:"/images/creativemu-logo/creativemu.png",alt:"Creativemu Logo",width:56,height:56,className:"h-full w-full object-contain",priority:!0})}),(0,t.jsx)(N,{user:c}),(0,t.jsxs)("div",{className:"min-w-0",children:[(0,t.jsx)("p",{className:"home-text-reveal text-[10px] font-black uppercase tracking-[0.24em] text-[#123c8c]",children:"FaceAttend"}),(0,t.jsx)("h1",{className:"home-text-reveal mt-1 truncate text-base font-black text-[#073456]",style:{animationDelay:"60ms"},children:c.name||"Memuat profil..."}),R?(0,t.jsx)("p",{className:"home-text-reveal truncate text-xs font-bold text-slate-500",style:{animationDelay:"100ms"},children:R}):null]})]}),(0,t.jsxs)("div",{className:"flex shrink-0 items-center gap-3",children:[(0,t.jsx)(S,{}),(0,t.jsx)(M,{unread:Y,onClick:O})]})]}),(0,t.jsxs)("div",{className:"py-7 text-center",children:[(0,t.jsx)("p",{className:"home-text-reveal text-xs font-black uppercase tracking-[0.24em] text-[#123c8c]",style:{animationDelay:"120ms"},children:"Selamat Datang"}),(0,t.jsx)("h2",{className:"home-text-reveal mt-3 text-4xl font-black tracking-tight text-[#073456]",style:{animationDelay:"170ms"},children:B?`Halo, ${B}`:"Memuat profil..."}),(0,t.jsx)("p",{className:"home-text-reveal mt-3 text-lg font-bold text-slate-500",style:{animationDelay:"220ms"},children:"Semoga harimu produktif."})]})]})}),(0,t.jsx)("section",{className:"mx-auto hidden max-w-7xl px-10 pt-8 md:block lg:px-16",children:(0,t.jsxs)("div",{className:"home-enter relative overflow-hidden rounded-[2.2rem] bg-[#123c8c] p-8 text-white shadow-2xl shadow-blue-900/25",children:[(0,t.jsx)("div",{className:"absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/10"}),(0,t.jsx)("div",{className:"absolute bottom-[-7rem] right-24 h-60 w-60 rounded-full bg-blue-300/10"}),(0,t.jsxs)("div",{className:"relative z-10 flex items-center justify-between gap-8",children:[(0,t.jsxs)("div",{className:"flex items-center gap-5",children:[(0,t.jsx)(N,{user:c,size:"desktop",variant:"blue"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h1",{className:"home-text-reveal text-4xl font-black tracking-tight",children:B?`Halo, ${B}`:"Memuat profil..."}),(0,t.jsx)(P,{items:[c.department?.name,c.jabatan?.name,$,c.shift?.name]})]})]}),(0,t.jsx)(M,{unread:Y,desktop:!0,onClick:O})]})]})}),(0,t.jsxs)("section",{className:"mx-auto w-full max-w-7xl bg-white px-5 pb-[8.5rem] pt-2 md:mt-8 md:rounded-[2.5rem] md:px-8 md:pb-10 md:pt-8 lg:px-10",children:[(0,t.jsx)("div",{className:"mb-6 md:mb-8",children:(0,t.jsx)(A,{})}),(0,t.jsx)(x.AppCard,{padding:"md",className:"home-card-enter rounded-[1.8rem] border-blue-100 bg-white p-5 shadow-sm transition hover:shadow-xl hover:shadow-slate-200/60 md:p-8",style:{animationDelay:"140ms"},children:(0,t.jsxs)("div",{className:"flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between",children:[(0,t.jsxs)("div",{children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("p",{className:"text-4xl font-black tracking-tight text-slate-950 md:text-6xl",children:s||"--:-- WIB"}),(0,t.jsx)("div",{className:"rounded-full bg-[#eaf1ff] px-3 py-1 text-xs font-black text-[#123c8c] md:px-3 md:py-1.5",children:"WIB"})]}),(0,t.jsx)("p",{className:"mt-3 text-sm font-bold text-slate-500 md:text-base",children:i||"Memuat tanggal..."}),(0,t.jsx)("p",{className:"mt-3 text-sm font-semibold text-slate-500 md:mt-5 md:text-lg",children:W}),(0,t.jsxs)("p",{className:"mt-1 text-sm font-semibold text-slate-500 md:mt-3 md:text-lg",children:["Status hari ini:"," ",(0,t.jsx)("span",{className:"font-black text-[#123c8c]",children:m.status})]})]}),(0,t.jsxs)("div",{className:"grid grid-cols-2 gap-3 lg:w-[460px]",children:[(0,t.jsx)(I,{label:"Masuk",href:"/presensi",disabled:H,variant:"primary"}),(0,t.jsx)(I,{label:"Keluar",href:"/presensi",disabled:!H||_,variant:"secondary"})]})]})}),(0,t.jsxs)("div",{className:"home-card-enter mt-7 flex items-center justify-between md:mt-14",style:{animationDelay:"180ms"},children:[(0,t.jsx)("div",{children:(0,t.jsx)("h2",{className:"text-2xl font-black text-slate-950 md:text-2xl",children:"Pengumuman"})}),(0,t.jsx)(r.default,{href:"/pengumuman",onClick:O,className:"text-lg font-black text-[#123c8c] transition hover:text-[#0f3274] active:scale-[0.98] md:text-base",children:"Lihat Lainnya"})]}),(0,t.jsx)("div",{className:"mt-4 md:mt-6",children:(0,t.jsx)(z,{announcements:j,hasAnnouncement:F,onRead:O})})]}),(0,t.jsx)(u.default,{})]})]})]})}])}]);