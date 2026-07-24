(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,20865,e=>{"use strict";let a=(0,e.i(56420).default)("map-pin",[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);e.s(["MapPin",0,a],20865)},32781,e=>{"use strict";let a=(0,e.i(56420).default)("loader-circle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);e.s(["Loader2",0,a],32781)},66595,e=>{"use strict";let a=(0,e.i(56420).default)("search",[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]]);e.s(["Search",0,a],66595)},73474,e=>{"use strict";let a=(0,e.i(56420).default)("trash-2",[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]]);e.s(["Trash2",0,a],73474)},79897,e=>{"use strict";var a=e.i(43476),t=e.i(71645);function s(...e){return e.filter(Boolean).join(" ")}let r={primary:"bg-[#123c8c] text-white shadow-lg shadow-blue-900/20 hover:bg-[#0f347a]",secondary:"border border-blue-100 bg-white text-[#123c8c] shadow-sm hover:bg-blue-50",danger:"bg-rose-50 text-rose-600 ring-1 ring-rose-100 hover:bg-rose-100",ghost:"bg-transparent text-[#123c8c] hover:bg-blue-50",soft:"bg-[#eaf1ff] text-[#123c8c] ring-1 ring-blue-100 hover:bg-blue-100"},n={sm:"min-h-10 rounded-xl px-4 py-2 text-xs",md:"min-h-12 rounded-2xl px-5 py-3 text-sm",lg:"min-h-14 rounded-2xl px-6 py-4 text-base"};function l(e,a,s){let[r,n]=(0,t.useState)(!1),l=(0,t.useRef)(null),i=(0,t.useRef)(null),o=s?.duration??260,d=s?.actionDelayMs??0;return(0,t.useEffect)(()=>()=>{l.current&&clearTimeout(l.current),i.current&&clearTimeout(i.current)},[]),{isAnimating:r,handleClick:function(t){if(!a&&(l.current&&clearTimeout(l.current),i.current&&clearTimeout(i.current),n(!1),requestAnimationFrame(()=>{n(!0)}),l.current=setTimeout(()=>{n(!1)},o),e)){if(d>0){i.current=setTimeout(()=>{e(t)},d);return}e(t)}}}}function i(){return(0,a.jsx)("style",{children:`
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
    `})}e.s(["AppAnimatedActionButton",0,function({icon:e,title:t,subtitle:r,loading:n=!1,loadingTitle:o="Opening...",full:d=!1,fullOnMobile:c=!0,disabled:m,className:u,actionDelayMs:f=120,onClick:p,...x}){let b=m||n,{isAnimating:h,handleClick:g}=l(p,b,{duration:280,actionDelayMs:f});return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(i,{}),(0,a.jsxs)("button",{disabled:b,onClick:g,className:s("group relative inline-flex items-center justify-center gap-4 overflow-hidden rounded-[1.8rem] bg-white px-6 py-5 text-[#123c8c] shadow-2xl shadow-blue-950/20 ring-1 ring-white/70 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-blue-950/25 active:scale-[0.98] disabled:cursor-wait disabled:opacity-80",d&&"w-full",c&&"w-full md:w-auto",!d&&!c&&"w-auto",h&&"app-button-press-active",u),...x,children:[(0,a.jsx)("span",{className:s("pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/60 to-transparent opacity-0",h&&"app-button-shine-active")}),(0,a.jsx)("span",{className:s("relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[1.4rem] bg-[#eaf1ff] transition-all duration-200 group-hover:bg-[#123c8c] group-hover:text-white",h&&"app-icon-press-active bg-[#123c8c] text-white"),children:n?(0,a.jsx)("span",{className:"relative z-10 h-6 w-6 animate-spin rounded-full border-2 border-current border-t-transparent"}):(0,a.jsx)("span",{className:"relative z-10 inline-flex items-center justify-center",children:e})}),(0,a.jsxs)("span",{className:"relative z-10 text-left",children:[(0,a.jsx)("span",{className:"block text-xl font-black leading-none tracking-tight",children:n||h?o:t}),r?(0,a.jsx)("span",{className:"mt-1 block text-xs font-bold text-[#123c8c]/70",children:r}):null]})]})]})},"AppBadge",0,function({children:e,className:t,variant:r="blue",...n}){return(0,a.jsx)("span",{className:s("inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black ring-1",{blue:"bg-blue-50 text-[#123c8c] ring-blue-100",green:"bg-emerald-50 text-emerald-700 ring-emerald-100",yellow:"bg-amber-50 text-amber-700 ring-amber-100",red:"bg-red-50 text-red-700 ring-red-100",gray:"bg-slate-100 text-slate-600 ring-slate-200"}[r],t),...n,children:e})},"AppButton",0,function({children:e,className:t,variant:o="primary",size:d="md",full:c=!1,leftIcon:m,rightIcon:u,disabled:f,loading:p=!1,loadingText:x="Memuat...",pressAnimation:b=!1,iconAnimation:h=!1,actionDelayMs:g=0,onClick:w,...k}){let j=f||p,{isAnimating:v,handleClick:y}=l(w,j,{duration:260,actionDelayMs:g});return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(i,{}),(0,a.jsxs)("button",{disabled:j,onClick:y,className:s("relative inline-flex items-center justify-center gap-2 overflow-hidden font-black transition duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60",r[o],n[d],c&&"w-full",p&&"scale-[0.99]",b&&v&&"app-button-press-active",t),...k,children:[b?(0,a.jsx)("span",{className:s("pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0",v&&"app-button-shine-active")}):null,p?(0,a.jsx)("span",{className:"relative z-10 h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent"}):m?(0,a.jsx)("span",{className:s("relative z-10 inline-flex items-center justify-center",h&&v&&"app-icon-press-active"),children:m}):null,(0,a.jsx)("span",{className:"relative z-10",children:p?x:e}),!p&&u?(0,a.jsx)("span",{className:s("relative z-10 inline-flex items-center justify-center",h&&v&&"app-icon-press-active"),children:u}):null]})]})},"AppCard",0,function({children:e,className:t,padding:r="md",...n}){return(0,a.jsx)("div",{className:s("rounded-[2rem] border border-blue-100 bg-white shadow-xl shadow-slate-200/60","sm"===r&&"p-4","md"===r&&"p-5","lg"===r&&"p-6 md:p-8",t),...n,children:e})},"AppEmptyState",0,function({icon:e,title:t,description:s}){return(0,a.jsxs)("div",{className:"rounded-[2rem] border border-dashed border-blue-100 bg-[#f8fbff] px-5 py-12 text-center",children:[e?(0,a.jsx)("div",{className:"mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eaf1ff] text-[#123c8c]",children:e}):null,(0,a.jsx)("p",{className:"mt-4 text-sm font-black text-slate-600",children:t}),s?(0,a.jsx)("p",{className:"mx-auto mt-2 max-w-md text-sm font-semibold leading-6 text-slate-500",children:s}):null]})},"AppFormReveal",0,function({children:e,className:t,delay:r=0,style:n,...l}){return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(i,{}),(0,a.jsx)("div",{className:s("app-form-reveal-enter",t),style:{animationDelay:`${r}ms`,...n},...l,children:e})]})},"AppInput",0,function({label:e,error:t,className:r,...n}){return(0,a.jsxs)("label",{className:"block",children:[e?(0,a.jsx)("span",{className:"text-sm font-black text-slate-700",children:e}):null,(0,a.jsx)("input",{className:s("mt-2 min-h-12 w-full rounded-2xl border border-blue-100 bg-[#f8fbff] px-4 py-3 text-sm font-bold text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#123c8c] focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60",t&&"border-red-200 bg-red-50 focus:border-red-400 focus:ring-red-100",r),...n}),t?(0,a.jsx)("span",{className:"mt-2 block text-xs font-bold text-red-600",children:t}):null]})},"AppLoadingState",0,function({text:e="Memuat data..."}){return(0,a.jsxs)("div",{className:"flex items-center justify-center gap-2 rounded-[2rem] border border-blue-100 bg-white px-5 py-12 text-sm font-bold text-slate-500",children:[(0,a.jsx)("span",{className:"h-5 w-5 animate-spin rounded-full border-2 border-[#123c8c] border-t-transparent"}),e]})},"AppModalMotion",0,function({children:e,className:t,align:r="center",...n}){return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(i,{}),(0,a.jsx)("div",{className:s("app-modal-backdrop-enter fixed inset-0 z-[80] flex bg-slate-950/50 px-4 pb-4 backdrop-blur-sm","center"===r&&"items-end justify-center md:items-center md:pb-0","bottom"===r&&"items-end justify-center",t),...n,children:e})]})},"AppModalPanel",0,function({children:e,className:t,...r}){return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(i,{}),(0,a.jsx)("div",{className:s("app-modal-panel-enter max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] bg-white p-5 shadow-2xl shadow-slate-950/30 md:p-7",t),...r,children:e})]})},"AppSelect",0,function({label:e,error:t,className:r,children:n,value:l,...i}){return(0,a.jsxs)("label",{className:"block",children:[e?(0,a.jsx)("span",{className:"text-sm font-black text-slate-700",children:e}):null,(0,a.jsx)("select",{suppressHydrationWarning:!0,value:l??"",className:s("mt-2 min-h-12 w-full rounded-2xl border border-blue-100 bg-[#f8fbff] px-4 py-3 text-sm font-bold text-slate-700 outline-none transition focus:border-[#123c8c] focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60",t&&"border-red-200 bg-red-50 focus:border-red-400 focus:ring-red-100",r),...i,children:n}),t?(0,a.jsx)("span",{className:"mt-2 block text-xs font-bold text-red-600",children:t}):null]})},"AppTextarea",0,function({label:e,error:t,className:r,...n}){return(0,a.jsxs)("label",{className:"block",children:[e?(0,a.jsx)("span",{className:"text-sm font-black text-slate-700",children:e}):null,(0,a.jsx)("textarea",{className:s("mt-2 min-h-28 w-full resize-none rounded-2xl border border-blue-100 bg-[#f8fbff] px-4 py-4 text-sm font-bold leading-6 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#123c8c] focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60",t&&"border-red-200 bg-red-50 focus:border-red-400 focus:ring-red-100",r),...n}),t?(0,a.jsx)("span",{className:"mt-2 block text-xs font-bold text-red-600",children:t}):null]})}])},56522,e=>{"use strict";let a=(0,e.i(56420).default)("save",[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]]);e.s(["Save",0,a],56522)},36755,e=>{"use strict";var a=e.i(43476),t=e.i(71645),s=e.i(46387);let r=(0,e.i(56420).default)("pen-line",[["path",{d:"M13 21h8",key:"1jsn5i"}],["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}]]);var n=e.i(32781),l=e.i(20865),i=e.i(56522),o=e.i(66595),d=e.i(73474),c=e.i(63676),m=e.i(26564),u=e.i(89168),f=e.i(79897);let p={name:"",address:"",coordinateText:"",latitude:"",longitude:"",radius_meters:"100",status:"active"};async function x(e){let a=await e.text();try{return a?JSON.parse(a):{}}catch{throw Error("Response API bukan JSON.")}}function b(e,a){return Number.isFinite(e)&&Number.isFinite(a)&&e>=-90&&e<=90&&a>=-180&&a<=180}function h(){return(0,a.jsx)("style",{children:`
      @keyframes officeEnter {
        0% {
          opacity: 0;
          transform: translateY(14px);
        }

        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes officeRowEnter {
        0% {
          opacity: 0;
          transform: translateY(10px);
        }

        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .office-enter {
        animation: officeEnter 320ms ease-out both;
      }

      .office-row-enter {
        opacity: 0;
        animation: officeRowEnter 300ms ease-out both;
      }

      .office-field {
        transition:
          border-color 180ms ease,
          background-color 180ms ease,
          box-shadow 180ms ease;
      }

      @media (prefers-reduced-motion: reduce) {
        .office-enter,
        .office-row-enter {
          animation: none !important;
          opacity: 1 !important;
          transform: none !important;
        }
      }
    `})}function g({status:e}){let t="active"===e;return(0,a.jsx)("span",{className:function(...e){return e.filter(Boolean).join(" ")}("inline-flex shrink-0 rounded-full px-3 py-1.5 text-xs font-black ring-1",t?"bg-emerald-50 text-emerald-700 ring-emerald-100":"bg-slate-100 text-slate-600 ring-slate-200"),children:t?"Aktif":"Nonaktif"})}function w({office:e,index:t,onEdit:n,onDelete:i}){return(0,a.jsx)(f.AppCard,{className:"office-row-enter w-full max-w-full overflow-hidden rounded-[2rem] border-blue-100 bg-white p-5 shadow-xl shadow-slate-200/60 transition duration-200 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-slate-300/40 md:overflow-visible",style:{animationDelay:`${55*t}ms`},children:(0,a.jsxs)("div",{className:"flex w-full max-w-full flex-col gap-4 md:flex-row md:items-start md:justify-between",children:[(0,a.jsxs)("div",{className:"flex w-full min-w-0 gap-3 md:gap-4",children:[(0,a.jsx)("div",{className:"flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#eaf1ff] text-[#123c8c]",children:(0,a.jsx)(s.Building2,{size:24,strokeWidth:2.6})}),(0,a.jsxs)("div",{className:"min-w-0 flex-1",children:[(0,a.jsxs)("div",{className:"flex min-w-0 flex-wrap items-center gap-2",children:[(0,a.jsx)("h3",{className:"min-w-0 max-w-full break-words text-lg font-black leading-tight text-slate-950 md:truncate",children:e.name}),(0,a.jsx)(g,{status:e.status})]}),(0,a.jsx)("p",{className:"mt-2 max-w-full break-words text-sm font-semibold leading-6 text-slate-500",children:e.address||"Alamat belum diisi."}),(0,a.jsxs)("div",{className:"mt-4 grid w-full max-w-full gap-2 text-sm font-bold text-slate-500 md:grid-cols-3",children:[(0,a.jsxs)("div",{className:"min-w-0 rounded-2xl bg-[#f8fbff] p-3",children:[(0,a.jsx)("p",{className:"break-words text-[11px] font-black uppercase tracking-[0.16em] text-slate-400",children:"Latitude"}),(0,a.jsx)("p",{className:"mt-1 max-w-full break-words text-slate-800",children:e.latitude})]}),(0,a.jsxs)("div",{className:"min-w-0 rounded-2xl bg-[#f8fbff] p-3",children:[(0,a.jsx)("p",{className:"break-words text-[11px] font-black uppercase tracking-[0.16em] text-slate-400",children:"Longitude"}),(0,a.jsx)("p",{className:"mt-1 max-w-full break-words text-slate-800",children:e.longitude})]}),(0,a.jsxs)("div",{className:"min-w-0 rounded-2xl bg-[#f8fbff] p-3",children:[(0,a.jsx)("p",{className:"break-words text-[11px] font-black uppercase tracking-[0.16em] text-slate-400",children:"Radius"}),(0,a.jsxs)("p",{className:"mt-1 max-w-full break-words text-slate-800",children:[e.radius_meters," meter"]})]})]}),(0,a.jsxs)("a",{href:`https://www.google.com/maps?q=${e.latitude},${e.longitude}`,target:"_blank",rel:"noreferrer",className:"mt-4 inline-flex max-w-full items-center justify-center gap-2 rounded-2xl bg-[#f6f8ff] px-4 py-2 text-xs font-black text-[#123c8c] ring-1 ring-blue-100 transition hover:bg-[#eaf1ff] active:scale-[0.98]",children:[(0,a.jsx)(l.MapPin,{size:15,className:"shrink-0",strokeWidth:2.7}),(0,a.jsx)("span",{className:"truncate",children:"Buka Maps"})]})]})]}),(0,a.jsxs)("div",{className:"flex shrink-0 justify-end gap-2 md:justify-start",children:[(0,a.jsx)("button",{type:"button",onClick:()=>n(e),className:"flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-[#123c8c] transition hover:bg-[#eaf1ff] active:scale-95","aria-label":"Ubah kantor",children:(0,a.jsx)(r,{size:18,strokeWidth:2.6})}),(0,a.jsx)("button",{type:"button",onClick:()=>i(e),className:"flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-600 transition hover:bg-red-100 active:scale-95","aria-label":"Hapus kantor",children:(0,a.jsx)(d.Trash2,{size:18,strokeWidth:2.6})})]})]})})}function k({form:e,editingOffice:t,isSaving:s,onChange:r,onCancel:d,onSubmit:m,onParseCoordinate:u}){return(0,a.jsxs)(f.AppCard,{className:"office-enter h-fit w-full max-w-full overflow-hidden rounded-[2rem] border-white/80 bg-white p-5 shadow-2xl shadow-slate-300/30 md:overflow-visible md:p-6",children:[(0,a.jsxs)("div",{className:"flex min-w-0 items-start justify-between gap-4",children:[(0,a.jsxs)("div",{className:"min-w-0 flex-1",children:[(0,a.jsx)("p",{className:"break-words text-xs font-black uppercase tracking-[0.22em] text-[#123c8c]",children:t?"Edit Kantor":"Tambah Kantor"}),(0,a.jsx)("h2",{className:"mt-2 break-words text-3xl font-black tracking-tight text-slate-950 md:text-2xl",children:"Lokasi Kantor"})]}),t?(0,a.jsx)("button",{type:"button",onClick:d,disabled:s,className:"flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 transition hover:bg-slate-200 active:scale-95 disabled:opacity-60","aria-label":"Batal edit",children:(0,a.jsx)(c.X,{size:18,strokeWidth:2.7})}):null]}),(0,a.jsxs)("div",{className:"mt-6 space-y-4",children:[(0,a.jsx)("div",{className:"office-row-enter",style:{animationDelay:"40ms"},children:(0,a.jsx)(f.AppInput,{label:"Nama Kantor",value:e.name,onChange:e=>r("name",e.target.value),placeholder:"Contoh: Creativemu Academy",className:"office-field focus:ring-4 focus:ring-blue-100"})}),(0,a.jsx)("div",{className:"office-row-enter",style:{animationDelay:"70ms"},children:(0,a.jsx)(f.AppTextarea,{label:"Alamat",value:e.address,onChange:e=>r("address",e.target.value),placeholder:"Contoh: Jogja",className:"office-field min-h-28 focus:ring-4 focus:ring-blue-100"})}),(0,a.jsxs)("div",{className:"office-row-enter w-full max-w-full overflow-hidden rounded-[1.7rem] border border-blue-100 bg-[#f8fbff] p-4",style:{animationDelay:"100ms"},children:[(0,a.jsx)(f.AppTextarea,{label:"Koordinat / Link Google Maps",value:e.coordinateText,onChange:e=>r("coordinateText",e.target.value),placeholder:"Contoh: -7.812201, 110.2685415 atau paste link Google Maps",className:"office-field min-h-24 bg-white focus:ring-4 focus:ring-blue-100"}),(0,a.jsx)(f.AppButton,{type:"button",variant:"secondary",onClick:u,disabled:s,full:!0,className:"mt-3",leftIcon:(0,a.jsx)(o.Search,{size:18}),children:"Ambil Latitude Longitude"}),(0,a.jsx)("p",{className:"mt-3 break-words text-xs font-semibold leading-5 text-slate-500",children:"Bisa paste format koordinat biasa atau link Google Maps. Sistem akan otomatis mengambil angka latitude dan longitude."})]}),(0,a.jsxs)("div",{className:"office-row-enter grid w-full max-w-full gap-4 md:grid-cols-2",style:{animationDelay:"130ms"},children:[(0,a.jsx)(f.AppInput,{label:"Latitude",value:e.latitude,onChange:e=>r("latitude",e.target.value),placeholder:"-7.812201",inputMode:"decimal",className:"office-field focus:ring-4 focus:ring-blue-100"}),(0,a.jsx)(f.AppInput,{label:"Longitude",value:e.longitude,onChange:e=>r("longitude",e.target.value),placeholder:"110.2685415",inputMode:"decimal",className:"office-field focus:ring-4 focus:ring-blue-100"})]}),(0,a.jsxs)("div",{className:"office-row-enter grid w-full max-w-full gap-4 md:grid-cols-2",style:{animationDelay:"160ms"},children:[(0,a.jsx)(f.AppInput,{label:"Radius Validasi Meter",value:e.radius_meters,onChange:e=>r("radius_meters",e.target.value),placeholder:"100",inputMode:"numeric",className:"office-field focus:ring-4 focus:ring-blue-100"}),(0,a.jsxs)(f.AppSelect,{label:"Status",value:e.status,onChange:e=>r("status",e.target.value),className:"office-field focus:ring-4 focus:ring-blue-100",children:[(0,a.jsx)("option",{value:"active",children:"Aktif"}),(0,a.jsx)("option",{value:"inactive",children:"Nonaktif"})]})]}),(0,a.jsx)("div",{className:"office-row-enter w-full max-w-full overflow-hidden rounded-3xl border border-blue-100 bg-[#f8fbff] p-4",style:{animationDelay:"190ms"},children:(0,a.jsxs)("div",{className:"flex min-w-0 items-start gap-3",children:[(0,a.jsx)(l.MapPin,{size:20,className:"mt-0.5 shrink-0 text-[#123c8c]",strokeWidth:2.7}),(0,a.jsx)("p",{className:"min-w-0 flex-1 break-words text-sm font-semibold leading-6 text-slate-500",children:"Latitude dan longitude bisa diambil dari Google Maps. Radius menentukan batas jarak karyawan boleh absen dari titik kantor."})]})}),(0,a.jsxs)("div",{className:"office-row-enter grid w-full max-w-full gap-3 md:grid-cols-2",style:{animationDelay:"220ms"},children:[t?(0,a.jsx)(f.AppButton,{type:"button",variant:"secondary",onClick:d,disabled:s,full:!0,children:"Batal"}):null,(0,a.jsx)(f.AppButton,{type:"button",onClick:m,disabled:s,full:!0,className:t?"":"md:col-span-2",leftIcon:s?(0,a.jsx)(n.Loader2,{size:18,className:"animate-spin"}):(0,a.jsx)(i.Save,{size:18}),children:s?"Menyimpan...":t?"Simpan Perubahan":"Tambah Kantor"})]})]})]})}e.s(["default",0,function(){let[e,r]=(0,t.useState)([]),[l,i]=(0,t.useState)(p),[o,d]=(0,t.useState)(null),[c,g]=(0,t.useState)(!0),[j,v]=(0,t.useState)(!1),y=(0,t.useMemo)(()=>e.filter(e=>"active"===e.status).length,[e]);function N(){i(p),d(null)}async function S(){try{g(!0);let e=await fetch("/api/admin/offices",{method:"GET",cache:"no-store"}),a=await x(e);if(!e.ok||!a.success)throw Error(a.message||"Gagal mengambil data kantor.");r(a.offices||[])}catch(e){console.error("LOAD_OFFICES_ERROR:",e),alert(e instanceof Error?e.message:"Gagal mengambil data kantor.")}finally{g(!1)}}async function E(){try{v(!0);let e=Number(l.latitude),a=Number(l.longitude);if(!b(e,a))throw Error("Latitude atau longitude tidak valid. Coba isi lewat kolom koordinat lalu klik Ambil Latitude Longitude.");let t={name:l.name,address:l.address,latitude:l.latitude,longitude:l.longitude,radius_meters:l.radius_meters,status:l.status},s=o?`/api/admin/offices/${o.id}`:"/api/admin/offices",r=await fetch(s,{method:o?"PATCH":"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}),n=await x(r);if(!r.ok||!n.success)throw Error(n.message||"Gagal menyimpan data kantor.");alert(n.message||"Data kantor berhasil disimpan."),N(),await S()}catch(e){console.error("SAVE_OFFICE_ERROR:",e),alert(e instanceof Error?e.message:"Gagal menyimpan data kantor.")}finally{v(!1)}}async function A(e){if(window.confirm(`Hapus kantor "${e.name}"? Data akan dinonaktifkan.`))try{let a=await fetch(`/api/admin/offices/${e.id}`,{method:"DELETE"}),t=await x(a);if(!a.ok||!t.success)throw Error(t.message||"Gagal menghapus kantor.");alert(t.message||"Kantor berhasil dinonaktifkan."),await S()}catch(e){console.error("DELETE_OFFICE_ERROR:",e),alert(e instanceof Error?e.message:"Gagal menghapus kantor.")}}function M(e){d(e),i({name:e.name||"",address:e.address||"",coordinateText:`${e.latitude}, ${e.longitude}`,latitude:String(e.latitude??""),longitude:String(e.longitude??""),radius_meters:String(e.radius_meters??100),status:e.status||"active"}),window.scrollTo({top:0,behavior:"smooth"})}return(0,t.useEffect)(()=>{S()},[]),(0,a.jsxs)(u.default,{variant:"admin",withBottomPadding:!1,children:[(0,a.jsx)(h,{}),(0,a.jsxs)("div",{className:"min-h-dvh w-full max-w-full overflow-x-hidden bg-white md:bg-[#f6f8ff]",children:[(0,a.jsx)(m.default,{title:"Kantor",variant:"admin"}),(0,a.jsx)("main",{className:"min-h-dvh w-full max-w-full overflow-x-hidden bg-white text-slate-950 md:bg-gradient-to-br md:from-[#f6f8ff] md:via-white md:to-[#eef4ff]",children:(0,a.jsxs)("section",{className:"mx-auto grid w-full max-w-full items-start gap-6 overflow-x-hidden px-4 pt-6 md:max-w-7xl md:overflow-visible md:px-10 md:py-8 lg:grid-cols-[0.85fr_1.15fr] lg:px-16",style:{paddingBottom:"calc(10rem + env(safe-area-inset-bottom, 0px))"},children:[(0,a.jsx)(k,{form:l,editingOffice:o,isSaving:j,onChange:function(e,a){i(t=>({...t,[e]:a}))},onCancel:N,onSubmit:E,onParseCoordinate:function(){let e=function(e){let a=decodeURIComponent(String(e||"").trim());if(!a)return null;for(let e of[/@(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)/,/[?&]q=(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)/,/[?&]ll=(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)/,/!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/]){let t=a.match(e);if(!t)continue;let s=Number(t[1]),r=Number(t[2]);if(b(s,r))return{latitude:s,longitude:r}}let t=a.match(/-?\d+(?:\.\d+)?/g)?.map(Number)||[];for(let e=0;e<t.length-1;e+=1){let a=t[e],s=t[e+1];if(b(a,s))return{latitude:a,longitude:s}}return null}(l.coordinateText);e?i(a=>({...a,latitude:String(e.latitude),longitude:String(e.longitude),coordinateText:`${e.latitude}, ${e.longitude}`})):alert("Koordinat tidak valid. Gunakan format seperti: -7.812201, 110.2685415 atau link Google Maps.")}}),(0,a.jsxs)("div",{className:"w-full max-w-full space-y-5 overflow-hidden md:overflow-visible",children:[(0,a.jsxs)("div",{className:"office-enter w-full max-w-full overflow-hidden rounded-[2rem] bg-[#123c8c] p-5 text-white shadow-2xl shadow-blue-900/20 md:p-8",style:{animationDelay:"80ms"},children:[(0,a.jsx)("div",{className:"flex min-w-0 flex-col gap-5 md:flex-row md:items-center md:justify-between",children:(0,a.jsxs)("div",{className:"min-w-0 flex-1",children:[(0,a.jsx)("p",{className:"break-words text-xs font-black uppercase tracking-[0.24em] text-blue-100",children:"Lokasi Kantor"}),(0,a.jsx)("h1",{className:"mt-2 break-words text-3xl font-black tracking-tight md:text-4xl",children:"Data Kantor"}),(0,a.jsx)("p",{className:"mt-3 max-w-2xl break-words text-sm font-semibold leading-7 text-blue-100",children:"Titik lokasi kantor digunakan untuk menentukan apakah karyawan berada di dalam radius saat presensi."})]})}),(0,a.jsxs)("div",{className:"mt-6 grid w-full max-w-full gap-3 md:grid-cols-3",children:[(0,a.jsxs)("div",{className:"office-row-enter min-w-0 rounded-2xl bg-white/15 p-4 ring-1 ring-white/20",children:[(0,a.jsx)("p",{className:"break-words text-xs font-black uppercase tracking-[0.16em] text-blue-100",children:"Total"}),(0,a.jsx)("p",{className:"mt-2 break-words text-3xl font-black",children:e.length})]}),(0,a.jsxs)("div",{className:"office-row-enter min-w-0 rounded-2xl bg-white/15 p-4 ring-1 ring-white/20",style:{animationDelay:"60ms"},children:[(0,a.jsx)("p",{className:"break-words text-xs font-black uppercase tracking-[0.16em] text-blue-100",children:"Aktif"}),(0,a.jsx)("p",{className:"mt-2 break-words text-3xl font-black",children:y})]}),(0,a.jsxs)("div",{className:"office-row-enter min-w-0 rounded-2xl bg-white/15 p-4 ring-1 ring-white/20",style:{animationDelay:"100ms"},children:[(0,a.jsx)("p",{className:"break-words text-xs font-black uppercase tracking-[0.16em] text-blue-100",children:"Nonaktif"}),(0,a.jsx)("p",{className:"mt-2 break-words text-3xl font-black",children:e.length-y})]})]})]}),c?(0,a.jsx)("div",{className:"office-row-enter flex min-h-[260px] w-full max-w-full items-center justify-center rounded-[2rem] border border-blue-100 bg-white",children:(0,a.jsxs)("div",{className:"text-center",children:[(0,a.jsx)(n.Loader2,{className:"mx-auto animate-spin text-[#123c8c]"}),(0,a.jsx)("p",{className:"mt-3 text-sm font-black text-slate-600",children:"Mengambil data kantor..."})]})}):0===e.length?(0,a.jsx)("div",{className:"office-row-enter",children:(0,a.jsx)(f.AppEmptyState,{icon:(0,a.jsx)(s.Building2,{size:30,strokeWidth:2.6}),title:"Belum ada data kantor",description:"Tambahkan kantor pertama agar validasi GPS presensi bisa berjalan."})}):(0,a.jsx)("div",{className:"w-full max-w-full space-y-4 overflow-hidden md:overflow-visible",children:e.map((e,t)=>(0,a.jsx)(w,{index:t,office:e,onEdit:M,onDelete:A},e.id))})]})]})})]})]})}],36755)}]);