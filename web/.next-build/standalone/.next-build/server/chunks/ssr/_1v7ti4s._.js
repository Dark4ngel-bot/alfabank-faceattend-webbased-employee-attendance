module.exports=[33354,(a,b,c)=>{"use strict";c._=function(a){return a&&a.__esModule?a:{default:a}}},89240,a=>{"use strict";var b=a.i(87924);a.s(["default",0,function({children:a,variant:c="employee",withBottomPadding:d=!0,className:e=""}){return(0,b.jsxs)("div",{className:`relative min-h-dvh overflow-hidden bg-gradient-to-br ${"admin"===c?"from-[#f6f8ff] via-white to-[#eef4ff]":"from-white via-[#f8fbff] to-[#eef4ff]"} ${d?"pb-24 md:pb-0":""} ${e}`,children:[(0,b.jsxs)("div",{"aria-hidden":"true",className:"pointer-events-none fixed inset-0 z-0 overflow-hidden",children:[(0,b.jsx)("div",{className:"absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 bg-contain bg-center bg-no-repeat opacity-[0.075] blur-[2px] md:h-[760px] md:w-[760px] lg:h-[860px] lg:w-[860px]",style:{backgroundImage:"url('/images/creativemu-logo/creativemu.png')"}}),(0,b.jsx)("div",{className:"absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100/20 blur-3xl md:h-[820px] md:w-[820px]"})]}),(0,b.jsx)("div",{className:"relative z-10 min-h-dvh",children:a})]})}])},75160,a=>{"use strict";let b=(0,a.i(64831).default)("loader-circle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);a.s(["Loader2",0,b],75160)},33751,a=>{"use strict";var b=a.i(87924),c=a.i(38246),d=a.i(50944),e=a.i(95605),f=a.i(24330),g=a.i(55486),h=a.i(87005);let i=[{href:"/beranda",label:"Beranda",icon:g.Home},{href:"/presensi",label:"Presensi",icon:e.CalendarCheck},{href:"/history",label:"Riwayat",icon:f.History},{href:"/profil",label:"Profil",icon:h.UserRound}];function j(...a){return a.filter(Boolean).join(" ")}function k(){return(0,b.jsx)("style",{children:`
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
    `})}function l({href:a,label:d,active:e,Icon:f}){return(0,b.jsxs)(c.default,{href:a,"aria-current":e?"page":void 0,className:j("relative flex h-[4.05rem] w-full min-w-0 flex-col items-center justify-center gap-1 rounded-[1.25rem] text-[11px] font-black transition-all duration-300 active:scale-[0.96]",e?"bg-[#123c8c] text-white shadow-xl shadow-blue-900/25":"text-slate-400 hover:bg-[#f6f8ff] hover:text-[#123c8c]"),children:[e?(0,b.jsx)("span",{className:"bottom-nav-active-bar absolute -top-1.5 h-1.5 w-11 rounded-full bg-blue-300"}):null,(0,b.jsx)("div",{className:j("flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition duration-300",e?"bottom-nav-icon-pop bg-white/15":"bg-transparent"),children:(0,b.jsx)(f,{size:24,strokeWidth:e?2.8:2.5,className:j("block shrink-0 transition duration-300",e?"text-white":"text-slate-400")})}),(0,b.jsx)("span",{className:"block max-w-full truncate leading-none",children:d})]})}a.s(["default",0,function({variant:a="employee"}){let c=(0,d.usePathname)();return"admin"===a?null:(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(k,{}),(0,b.jsx)("div",{"aria-hidden":"true",className:"h-[calc(5.8rem+env(safe-area-inset-bottom))] shrink-0 md:hidden"}),(0,b.jsx)("nav",{className:"fixed bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] left-1/2 z-50 w-[calc(100%-2rem)] max-w-[35rem] -translate-x-1/2 md:hidden",children:(0,b.jsx)("div",{className:"bottom-nav-shell-in overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/90 px-2.5 py-2.5 shadow-2xl shadow-slate-400/25 backdrop-blur-2xl",children:(0,b.jsx)("div",{className:"grid w-full grid-cols-4 gap-1.5",children:i.map(a=>{var d;return(0,b.jsx)(l,{href:a.href,label:a.label,Icon:a.icon,active:"/beranda"===(d=a.href)?"/"===c||"/beranda"===c:"/history"===d?"/history"===c||c.startsWith("/history/"):c===d||c.startsWith(`${d}/`)},a.href)})})})})]})}])},83138,a=>{"use strict";let b=(0,a.i(64831).default)("file-text",[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]);a.s(["FileText",0,b],83138)},65281,a=>{"use strict";var b=a.i(87924),c=a.i(72131),d=a.i(53641),e=a.i(83138),f=a.i(75160),g=a.i(16683),h=a.i(38615),i=a.i(33751),j=a.i(89240);async function k(a){let b=await a.text();try{return b?JSON.parse(b):{}}catch{throw Error("Response API bukan JSON.")}}function l(a){return!a||a<1?"":a>=1048576?`${(a/1048576).toFixed(1)} MB`:`${Math.max(1,Math.round(a/1024))} KB`}function m(){return(0,b.jsx)("style",{children:`
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
    `})}a.s(["default",0,function(){let[a,n]=(0,c.useState)([]),[o,p]=(0,c.useState)(!0),[q,r]=(0,c.useState)("");async function s(){try{p(!0),r("");let a=await fetch("/api/announcements?audience=employee",{method:"GET",cache:"no-store"});if(!a.ok){n([]),r("Gagal mengambil pengumuman.");return}let b=await k(a),c=b.announcements||b.data||[],d=Array.isArray(c)?c:[];n(d);let e=d[0]?.id;e&&window.localStorage.setItem("faceattend_read_announcement_id",e)}catch(a){console.error("GET_ANNOUNCEMENTS_ERROR:",a),n([]),r("Gagal mengambil pengumuman.")}finally{p(!1)}}return(0,c.useEffect)(()=>{s()},[]),(0,b.jsxs)(j.default,{variant:"employee",withBottomPadding:!1,children:[(0,b.jsx)(m,{}),(0,b.jsx)("div",{className:"hidden md:block",children:(0,b.jsx)(h.default,{title:"Pengumuman",rightLabel:"Info",variant:"employee"})}),(0,b.jsxs)("main",{className:"min-h-dvh bg-gradient-to-br from-[#f6f8ff] via-white to-[#eef4ff] pb-[calc(8rem+env(safe-area-inset-bottom))] text-slate-950 md:pb-28",children:[(0,b.jsx)("div",{className:"announcement-glow-float pointer-events-none fixed -left-32 top-24 hidden h-72 w-72 rounded-full bg-orange-200/20 blur-3xl md:block"}),(0,b.jsx)("div",{className:"announcement-glow-float pointer-events-none fixed -right-32 bottom-24 hidden h-72 w-72 rounded-full bg-blue-300/20 blur-3xl md:block"}),(0,b.jsx)("section",{className:"mx-auto max-w-5xl px-5 pt-7 md:hidden",children:(0,b.jsxs)("div",{className:"announcement-enter relative overflow-hidden rounded-[2rem] bg-[#123c8c] p-5 text-white shadow-xl shadow-blue-900/20",children:[(0,b.jsx)("div",{className:"announcement-glow-float absolute -right-16 -top-16 h-44 w-44 rounded-full bg-white/10 blur-2xl"}),(0,b.jsx)("div",{className:"announcement-glow-float absolute -bottom-20 left-14 h-44 w-44 rounded-full bg-blue-300/20 blur-2xl"}),(0,b.jsxs)("div",{className:"relative z-10 flex items-center gap-3",children:[(0,b.jsx)("div",{className:"announcement-icon-pop flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15",children:(0,b.jsx)(g.Megaphone,{size:25,strokeWidth:2.6})}),(0,b.jsxs)("div",{className:"min-w-0",children:[(0,b.jsx)("p",{className:"announcement-row-enter text-xs font-black uppercase tracking-[0.24em] text-blue-100",children:"FaceAttend"}),(0,b.jsx)("h1",{className:"announcement-row-enter mt-1 text-3xl font-black tracking-tight",style:{animationDelay:"60ms"},children:"Pengumuman"}),(0,b.jsx)("p",{className:"announcement-row-enter mt-1 text-sm font-semibold text-blue-100",style:{animationDelay:"100ms"},children:"Informasi terbaru dari perusahaan."})]})]})]})}),(0,b.jsxs)("section",{className:"mx-auto max-w-5xl px-5 py-6 md:px-10 lg:px-0",children:[q?(0,b.jsx)("div",{className:"announcement-row-enter rounded-3xl border border-red-100 bg-red-50 p-5 text-sm font-black text-red-700",children:q}):null,o?(0,b.jsxs)("div",{className:"announcement-row-enter flex items-center justify-center gap-2 rounded-3xl border border-blue-100 bg-white p-8 text-sm font-black text-slate-500 shadow-lg shadow-slate-200/50",children:[(0,b.jsx)(f.Loader2,{size:18,className:"animate-spin text-[#123c8c]"}),"Memuat pengumuman..."]}):0===a.length?(0,b.jsxs)("div",{className:"announcement-row-enter rounded-3xl border border-dashed border-blue-100 bg-white px-5 py-14 text-center shadow-lg shadow-slate-200/50",children:[(0,b.jsx)("div",{className:"announcement-icon-pop mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eaf1ff] text-[#123c8c]",children:(0,b.jsx)(g.Megaphone,{size:26,strokeWidth:2.6})}),(0,b.jsx)("p",{className:"mt-4 text-base font-black text-slate-700",children:"Pengumuman Kosong"}),(0,b.jsx)("p",{className:"mt-2 text-sm font-semibold text-slate-400",children:"Belum ada pengumuman yang dipublikasikan."})]}):(0,b.jsx)("div",{className:"space-y-4",children:a.map((a,c)=>{let f=a.created_at||a.createdAt;return(0,b.jsxs)("article",{className:"announcement-row-enter min-w-0 rounded-[2rem] border border-blue-100 bg-white p-5 shadow-lg shadow-slate-200/50 transition duration-200 hover:-translate-y-0.5 hover:bg-[#f8fbff] hover:shadow-xl hover:shadow-slate-300/40 md:p-6",style:{animationDelay:`${55*c}ms`},children:[(0,b.jsxs)("div",{className:"flex flex-col gap-3 md:flex-row md:items-start md:justify-between",children:[(0,b.jsxs)("div",{className:"min-w-0",children:[(0,b.jsxs)("div",{className:"mb-3 inline-flex items-center gap-2 rounded-full bg-[#eaf1ff] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-[#123c8c]",children:[(0,b.jsx)(g.Megaphone,{size:14}),"Pengumuman"]}),(0,b.jsx)("h2",{className:"break-words text-xl font-black leading-8 text-slate-950 [overflow-wrap:anywhere] md:text-2xl md:leading-9",children:a.title})]}),(0,b.jsxs)("div",{className:"inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-[#f8fbff] px-3 py-2 text-xs font-black text-slate-500 ring-1 ring-blue-100",children:[(0,b.jsx)(d.CalendarDays,{size:14,strokeWidth:2.6}),function(a){if(!a)return"-";let b=new Date(a);return Number.isNaN(b.getTime())?"-":new Intl.DateTimeFormat("id-ID",{timeZone:"Asia/Jakarta",day:"2-digit",month:"long",year:"numeric"}).format(b)}(f)]})]}),a.content?(0,b.jsx)("p",{className:"mt-5 whitespace-pre-wrap break-words rounded-3xl bg-[#f8fbff] p-4 text-sm font-semibold leading-7 text-slate-600 [overflow-wrap:anywhere] md:p-5 md:text-base md:leading-8",children:a.content}):(0,b.jsx)("p",{className:"mt-5 rounded-3xl bg-[#f8fbff] p-4 text-sm font-semibold text-slate-400",children:"Tidak ada isi pengumuman."}),a.document_url||a.documentUrl?(0,b.jsxs)("a",{href:a.document_url||a.documentUrl||"#",target:"_blank",rel:"noopener noreferrer",className:"mt-4 inline-flex max-w-full items-center gap-3 rounded-2xl border border-blue-100 bg-[#eaf1ff] px-4 py-3 text-sm font-black text-[#123c8c] transition hover:-translate-y-0.5 hover:bg-blue-100 active:scale-[0.98]",children:[(0,b.jsx)("span",{className:"flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white",children:(0,b.jsx)(e.FileText,{size:20,strokeWidth:2.6})}),(0,b.jsxs)("span",{className:"min-w-0 text-left",children:[(0,b.jsx)("span",{className:"block truncate",children:a.document_name||a.documentName||"Dokumen Pengumuman.pdf"}),l(a.document_size||a.documentSize)?(0,b.jsxs)("span",{className:"mt-0.5 block text-xs font-bold text-blue-500",children:["PDF"," | ",l(a.document_size||a.documentSize)]}):(0,b.jsx)("span",{className:"mt-0.5 block text-xs font-bold text-blue-500",children:"PDF"})]})]}):null]},a.id)})})]}),(0,b.jsx)(i.default,{})]})]})}])}];

//# sourceMappingURL=_1v7ti4s._.js.map