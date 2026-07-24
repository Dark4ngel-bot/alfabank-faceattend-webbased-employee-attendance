(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,32781,e=>{"use strict";let t=(0,e.i(56420).default)("loader-circle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);e.s(["Loader2",0,t],32781)},84276,e=>{"use strict";var t=e.i(43476),n=e.i(22016),a=e.i(18566),r=e.i(75153),s=e.i(94004),o=e.i(49817),l=e.i(65649);let i=[{href:"/beranda",label:"Beranda",icon:o.Home},{href:"/presensi",label:"Presensi",icon:r.CalendarCheck},{href:"/history",label:"Riwayat",icon:s.History},{href:"/profil",label:"Profil",icon:l.UserRound}];function c(...e){return e.filter(Boolean).join(" ")}function m(){return(0,t.jsx)("style",{children:`
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
    `})}function d({href:e,label:a,active:r,Icon:s}){return(0,t.jsxs)(n.default,{href:e,"aria-current":r?"page":void 0,className:c("relative flex h-[4.05rem] w-full min-w-0 flex-col items-center justify-center gap-1 rounded-[1.25rem] text-[11px] font-black transition-all duration-300 active:scale-[0.96]",r?"bg-[#123c8c] text-white shadow-xl shadow-blue-900/25":"text-slate-400 hover:bg-[#f6f8ff] hover:text-[#123c8c]"),children:[r?(0,t.jsx)("span",{className:"bottom-nav-active-bar absolute -top-1.5 h-1.5 w-11 rounded-full bg-blue-300"}):null,(0,t.jsx)("div",{className:c("flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition duration-300",r?"bottom-nav-icon-pop bg-white/15":"bg-transparent"),children:(0,t.jsx)(s,{size:24,strokeWidth:r?2.8:2.5,className:c("block shrink-0 transition duration-300",r?"text-white":"text-slate-400")})}),(0,t.jsx)("span",{className:"block max-w-full truncate leading-none",children:a})]})}e.s(["default",0,function({variant:e="employee"}){let n=(0,a.usePathname)();return"admin"===e?null:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(m,{}),(0,t.jsx)("div",{"aria-hidden":"true",className:"h-[calc(5.8rem+env(safe-area-inset-bottom))] shrink-0 md:hidden"}),(0,t.jsx)("nav",{className:"fixed bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] left-1/2 z-50 w-[calc(100%-2rem)] max-w-[35rem] -translate-x-1/2 md:hidden",children:(0,t.jsx)("div",{className:"bottom-nav-shell-in overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/90 px-2.5 py-2.5 shadow-2xl shadow-slate-400/25 backdrop-blur-2xl",children:(0,t.jsx)("div",{className:"grid w-full grid-cols-4 gap-1.5",children:i.map(e=>{var a;return(0,t.jsx)(d,{href:e.href,label:e.label,Icon:e.icon,active:"/beranda"===(a=e.href)?"/"===n||"/beranda"===n:"/history"===a?"/history"===n||n.startsWith("/history/"):n===a||n.startsWith(`${a}/`)},e.href)})})})})]})}])},26091,e=>{"use strict";let t=(0,e.i(56420).default)("file-text",[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]);e.s(["FileText",0,t],26091)},23676,e=>{"use strict";var t=e.i(43476),n=e.i(71645),a=e.i(29768),r=e.i(26091),s=e.i(32781),o=e.i(65489),l=e.i(26564),i=e.i(84276),c=e.i(89168);async function m(e){let t=await e.text();try{return t?JSON.parse(t):{}}catch{throw Error("Response API bukan JSON.")}}function d(e){return!e||e<1?"":e>=1048576?`${(e/1048576).toFixed(1)} MB`:`${Math.max(1,Math.round(e/1024))} KB`}function u(){return(0,t.jsx)("style",{children:`
      @keyframes announcementEnter {
        0% {
          opacity: 0;
          transform: translateY(14px);
        }

        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes announcementRowEnter {
        0% {
          opacity: 0;
          transform: translateY(10px);
        }

        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes announcementIconPop {
        0% {
          opacity: 0;
          transform: translateY(8px) scale(0.92);
        }

        100% {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      @keyframes announcementGlowFloat {
        0%,
        100% {
          transform: translate3d(0, 0, 0) scale(1);
        }

        50% {
          transform: translate3d(12px, -10px, 0) scale(1.04);
        }
      }

      .announcement-enter {
        animation: announcementEnter 340ms ease-out both;
      }

      .announcement-row-enter {
        opacity: 0;
        animation: announcementRowEnter 300ms ease-out both;
      }

      .announcement-icon-pop {
        animation: announcementIconPop 280ms ease-out both;
      }

      .announcement-glow-float {
        animation: announcementGlowFloat 6s ease-in-out infinite;
      }

      @media (prefers-reduced-motion: reduce) {
        .announcement-enter,
        .announcement-row-enter,
        .announcement-icon-pop,
        .announcement-glow-float {
          animation: none !important;
          opacity: 1 !important;
          transform: none !important;
        }
      }
    `})}e.s(["default",0,function(){let[e,f]=(0,n.useState)([]),[x,h]=(0,n.useState)(!0),[b,p]=(0,n.useState)("");async function g(){try{h(!0),p("");let e=await fetch("/api/announcements?audience=employee",{method:"GET",cache:"no-store"});if(!e.ok){f([]),p("Gagal mengambil pengumuman.");return}let t=await m(e),n=t.announcements||t.data||[],a=Array.isArray(n)?n:[];f(a);let r=a[0]?.id;r&&window.localStorage.setItem("faceattend_read_announcement_id",r)}catch(e){console.error("GET_ANNOUNCEMENTS_ERROR:",e),f([]),p("Gagal mengambil pengumuman.")}finally{h(!1)}}return(0,n.useEffect)(()=>{g()},[]),(0,t.jsxs)(c.default,{variant:"employee",withBottomPadding:!1,children:[(0,t.jsx)(u,{}),(0,t.jsx)("div",{className:"hidden md:block",children:(0,t.jsx)(l.default,{title:"Pengumuman",rightLabel:"Info",variant:"employee"})}),(0,t.jsxs)("main",{className:"min-h-dvh bg-gradient-to-br from-[#f6f8ff] via-white to-[#eef4ff] pb-[calc(8rem+env(safe-area-inset-bottom))] text-slate-950 md:pb-28",children:[(0,t.jsx)("div",{className:"announcement-glow-float pointer-events-none fixed -left-32 top-24 hidden h-72 w-72 rounded-full bg-orange-200/20 blur-3xl md:block"}),(0,t.jsx)("div",{className:"announcement-glow-float pointer-events-none fixed -right-32 bottom-24 hidden h-72 w-72 rounded-full bg-blue-300/20 blur-3xl md:block"}),(0,t.jsx)("section",{className:"mx-auto max-w-5xl px-5 pt-7 md:hidden",children:(0,t.jsxs)("div",{className:"announcement-enter relative overflow-hidden rounded-[2rem] bg-[#123c8c] p-5 text-white shadow-xl shadow-blue-900/20",children:[(0,t.jsx)("div",{className:"announcement-glow-float absolute -right-16 -top-16 h-44 w-44 rounded-full bg-white/10 blur-2xl"}),(0,t.jsx)("div",{className:"announcement-glow-float absolute -bottom-20 left-14 h-44 w-44 rounded-full bg-blue-300/20 blur-2xl"}),(0,t.jsxs)("div",{className:"relative z-10 flex items-center gap-3",children:[(0,t.jsx)("div",{className:"announcement-icon-pop flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15",children:(0,t.jsx)(o.Megaphone,{size:25,strokeWidth:2.6})}),(0,t.jsxs)("div",{className:"min-w-0",children:[(0,t.jsx)("p",{className:"announcement-row-enter text-xs font-black uppercase tracking-[0.24em] text-blue-100",children:"FaceAttend"}),(0,t.jsx)("h1",{className:"announcement-row-enter mt-1 text-3xl font-black tracking-tight",style:{animationDelay:"60ms"},children:"Pengumuman"}),(0,t.jsx)("p",{className:"announcement-row-enter mt-1 text-sm font-semibold text-blue-100",style:{animationDelay:"100ms"},children:"Informasi terbaru dari perusahaan."})]})]})]})}),(0,t.jsxs)("section",{className:"mx-auto max-w-5xl px-5 py-6 md:px-10 lg:px-0",children:[b?(0,t.jsx)("div",{className:"announcement-row-enter rounded-3xl border border-red-100 bg-red-50 p-5 text-sm font-black text-red-700",children:b}):null,x?(0,t.jsxs)("div",{className:"announcement-row-enter flex items-center justify-center gap-2 rounded-3xl border border-blue-100 bg-white p-8 text-sm font-black text-slate-500 shadow-lg shadow-slate-200/50",children:[(0,t.jsx)(s.Loader2,{size:18,className:"animate-spin text-[#123c8c]"}),"Memuat pengumuman..."]}):0===e.length?(0,t.jsxs)("div",{className:"announcement-row-enter rounded-3xl border border-dashed border-blue-100 bg-white px-5 py-14 text-center shadow-lg shadow-slate-200/50",children:[(0,t.jsx)("div",{className:"announcement-icon-pop mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eaf1ff] text-[#123c8c]",children:(0,t.jsx)(o.Megaphone,{size:26,strokeWidth:2.6})}),(0,t.jsx)("p",{className:"mt-4 text-base font-black text-slate-700",children:"Pengumuman Kosong"}),(0,t.jsx)("p",{className:"mt-2 text-sm font-semibold text-slate-400",children:"Belum ada pengumuman yang dipublikasikan."})]}):(0,t.jsx)("div",{className:"space-y-4",children:e.map((e,n)=>{let s=e.created_at||e.createdAt;return(0,t.jsxs)("article",{className:"announcement-row-enter min-w-0 rounded-[2rem] border border-blue-100 bg-white p-5 shadow-lg shadow-slate-200/50 transition duration-200 hover:-translate-y-0.5 hover:bg-[#f8fbff] hover:shadow-xl hover:shadow-slate-300/40 md:p-6",style:{animationDelay:`${55*n}ms`},children:[(0,t.jsxs)("div",{className:"flex flex-col gap-3 md:flex-row md:items-start md:justify-between",children:[(0,t.jsxs)("div",{className:"min-w-0",children:[(0,t.jsxs)("div",{className:"mb-3 inline-flex items-center gap-2 rounded-full bg-[#eaf1ff] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-[#123c8c]",children:[(0,t.jsx)(o.Megaphone,{size:14}),"Pengumuman"]}),(0,t.jsx)("h2",{className:"break-words text-xl font-black leading-8 text-slate-950 [overflow-wrap:anywhere] md:text-2xl md:leading-9",children:e.title})]}),(0,t.jsxs)("div",{className:"inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-[#f8fbff] px-3 py-2 text-xs font-black text-slate-500 ring-1 ring-blue-100",children:[(0,t.jsx)(a.CalendarDays,{size:14,strokeWidth:2.6}),function(e){if(!e)return"-";let t=new Date(e);return Number.isNaN(t.getTime())?"-":new Intl.DateTimeFormat("id-ID",{timeZone:"Asia/Jakarta",day:"2-digit",month:"long",year:"numeric"}).format(t)}(s)]})]}),e.content?(0,t.jsx)("p",{className:"mt-5 whitespace-pre-wrap break-words rounded-3xl bg-[#f8fbff] p-4 text-sm font-semibold leading-7 text-slate-600 [overflow-wrap:anywhere] md:p-5 md:text-base md:leading-8",children:e.content}):(0,t.jsx)("p",{className:"mt-5 rounded-3xl bg-[#f8fbff] p-4 text-sm font-semibold text-slate-400",children:"Tidak ada isi pengumuman."}),e.document_url||e.documentUrl?(0,t.jsxs)("a",{href:e.document_url||e.documentUrl||"#",target:"_blank",rel:"noopener noreferrer",className:"mt-4 inline-flex max-w-full items-center gap-3 rounded-2xl border border-blue-100 bg-[#eaf1ff] px-4 py-3 text-sm font-black text-[#123c8c] transition hover:-translate-y-0.5 hover:bg-blue-100 active:scale-[0.98]",children:[(0,t.jsx)("span",{className:"flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white",children:(0,t.jsx)(r.FileText,{size:20,strokeWidth:2.6})}),(0,t.jsxs)("span",{className:"min-w-0 text-left",children:[(0,t.jsx)("span",{className:"block truncate",children:e.document_name||e.documentName||"Dokumen Pengumuman.pdf"}),d(e.document_size||e.documentSize)?(0,t.jsxs)("span",{className:"mt-0.5 block text-xs font-bold text-blue-500",children:["PDF"," | ",d(e.document_size||e.documentSize)]}):(0,t.jsx)("span",{className:"mt-0.5 block text-xs font-bold text-blue-500",children:"PDF"})]})]}):null]},e.id)})})]}),(0,t.jsx)(i.default,{})]})]})}])}]);