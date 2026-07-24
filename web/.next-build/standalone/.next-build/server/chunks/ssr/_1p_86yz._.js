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
    `})}function l({href:a,label:d,active:e,Icon:f}){return(0,b.jsxs)(c.default,{href:a,"aria-current":e?"page":void 0,className:j("relative flex h-[4.05rem] w-full min-w-0 flex-col items-center justify-center gap-1 rounded-[1.25rem] text-[11px] font-black transition-all duration-300 active:scale-[0.96]",e?"bg-[#123c8c] text-white shadow-xl shadow-blue-900/25":"text-slate-400 hover:bg-[#f6f8ff] hover:text-[#123c8c]"),children:[e?(0,b.jsx)("span",{className:"bottom-nav-active-bar absolute -top-1.5 h-1.5 w-11 rounded-full bg-blue-300"}):null,(0,b.jsx)("div",{className:j("flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition duration-300",e?"bottom-nav-icon-pop bg-white/15":"bg-transparent"),children:(0,b.jsx)(f,{size:24,strokeWidth:e?2.8:2.5,className:j("block shrink-0 transition duration-300",e?"text-white":"text-slate-400")})}),(0,b.jsx)("span",{className:"block max-w-full truncate leading-none",children:d})]})}a.s(["default",0,function({variant:a="employee"}){let c=(0,d.usePathname)();return"admin"===a?null:(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(k,{}),(0,b.jsx)("div",{"aria-hidden":"true",className:"h-[calc(5.8rem+env(safe-area-inset-bottom))] shrink-0 md:hidden"}),(0,b.jsx)("nav",{className:"fixed bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] left-1/2 z-50 w-[calc(100%-2rem)] max-w-[35rem] -translate-x-1/2 md:hidden",children:(0,b.jsx)("div",{className:"bottom-nav-shell-in overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/90 px-2.5 py-2.5 shadow-2xl shadow-slate-400/25 backdrop-blur-2xl",children:(0,b.jsx)("div",{className:"grid w-full grid-cols-4 gap-1.5",children:i.map(a=>{var d;return(0,b.jsx)(l,{href:a.href,label:a.label,Icon:a.icon,active:"/beranda"===(d=a.href)?"/"===c||"/beranda"===c:"/history"===d?"/history"===c||c.startsWith("/history/"):c===d||c.startsWith(`${d}/`)},a.href)})})})})]})}])},33540,a=>{"use strict";let b=(0,a.i(64831).default)("search",[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]]);a.s(["Search",0,b],33540)},41146,a=>{"use strict";let b=(0,a.i(64831).default)("chevron-right",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);a.s(["ChevronRight",0,b],41146)},57038,a=>{"use strict";var b=a.i(87924),c=a.i(72131),d=a.i(38246),e=a.i(53641),f=a.i(41146),g=a.i(70115),h=a.i(24330),i=a.i(75160),j=a.i(33540);let k=(0,a.i(64831).default)("timer-reset",[["path",{d:"M10 2h4",key:"n1abiw"}],["path",{d:"M12 14v-4",key:"1evpnu"}],["path",{d:"M4 13a8 8 0 0 1 8-7 8 8 0 1 1-5.3 14L4 17.6",key:"1ts96g"}],["path",{d:"M9 17H4v5",key:"8t5av"}]]);var l=a.i(38615),m=a.i(33751),n=a.i(89240),o=a.i(86860);let p=[{value:1,label:"Januari"},{value:2,label:"Februari"},{value:3,label:"Maret"},{value:4,label:"April"},{value:5,label:"Mei"},{value:6,label:"Juni"},{value:7,label:"Juli"},{value:8,label:"Agustus"},{value:9,label:"September"},{value:10,label:"Oktober"},{value:11,label:"November"},{value:12,label:"Desember"}],q=[2024,2025,2026,2027];function r(){return(0,b.jsx)("style",{children:`
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
    `})}function s({children:a,delay:c="0ms"}){return(0,b.jsx)("span",{className:"history-row-enter rounded-full bg-white/15 px-4 py-2 text-xs font-black text-white ring-1 ring-white/20",style:{animationDelay:c},children:a})}function t(){return(0,b.jsx)("section",{className:"history-enter mx-auto max-w-7xl px-5 pt-7 md:hidden",children:(0,b.jsxs)("div",{className:"flex items-center justify-between gap-4",children:[(0,b.jsxs)("div",{children:[(0,b.jsx)("p",{className:"text-xs font-black uppercase tracking-[0.28em] text-[#123c8c]",children:"FaceAttend"}),(0,b.jsx)("h1",{className:"mt-2 text-3xl font-black tracking-tight text-[#073456]",children:"Laporan Presensi"})]}),(0,b.jsx)("div",{className:"history-icon-pop flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#123c8c] text-white ring-1 ring-[#123c8c]",children:(0,b.jsx)(h.History,{size:24,strokeWidth:2.6})})]})})}function u({monthLabel:a,year:c,total:d,sort:f}){return(0,b.jsx)("section",{className:"mx-auto hidden max-w-7xl px-10 pt-8 md:block lg:px-16",children:(0,b.jsxs)("div",{className:"history-enter relative overflow-hidden rounded-[2.2rem] bg-[#123c8c] p-8 text-white shadow-2xl shadow-blue-900/25",children:[(0,b.jsx)("div",{className:"history-float-glow absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/10"}),(0,b.jsx)("div",{className:"history-float-glow absolute bottom-[-7rem] right-24 h-60 w-60 rounded-full bg-blue-300/10"}),(0,b.jsxs)("div",{className:"relative z-10 flex items-center justify-between gap-8",children:[(0,b.jsxs)("div",{className:"flex items-center gap-5",children:[(0,b.jsx)("div",{className:"history-icon-pop flex h-20 w-20 shrink-0 items-center justify-center rounded-[1.6rem] bg-white/15 text-white ring-1 ring-white/20",children:(0,b.jsx)(h.History,{size:38,strokeWidth:2.5})}),(0,b.jsxs)("div",{children:[(0,b.jsx)("h1",{className:"text-4xl font-black tracking-tight",children:"Riwayat Presensi"}),(0,b.jsxs)("div",{className:"mt-4 flex flex-wrap gap-2",children:[(0,b.jsxs)(s,{delay:"80ms",children:[a," ",c]}),(0,b.jsxs)(s,{delay:"120ms",children:[d," Data"]}),(0,b.jsx)(s,{delay:"160ms",children:"desc"===f?"Terbaru":"Terlama"})]})]})]}),(0,b.jsx)("div",{className:"history-icon-pop flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white/80 ring-1 ring-white/20",children:(0,b.jsx)(e.CalendarDays,{size:28,strokeWidth:2.4})})]})]})})}function v({label:a,value:c,large:d=!1,delay:e="0ms"}){return(0,b.jsx)("div",{className:"history-row-enter",style:{animationDelay:e},children:(0,b.jsxs)(o.AppCard,{padding:"sm",className:"rounded-3xl bg-[#f8fbff] shadow-none transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-lg hover:shadow-slate-200/60",children:[(0,b.jsx)("p",{className:"text-xs font-black uppercase tracking-[0.16em] text-slate-400",children:a}),(0,b.jsx)("p",{className:function(...a){return a.filter(Boolean).join(" ")}("mt-2 font-black text-slate-950",d?"truncate text-lg md:text-2xl":"text-2xl"),children:c})]})})}function w({month:a,year:c,sort:d,monthLabel:f,isLoading:g,onMonthChange:h,onYearChange:k,onSortChange:l,onApply:m}){return(0,b.jsxs)(o.AppCard,{padding:"md",className:"history-enter rounded-[1.8rem] shadow-none md:p-6",children:[(0,b.jsxs)("div",{className:"flex items-center gap-4",children:[(0,b.jsx)("div",{className:"history-icon-pop flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#eaf1ff] text-[#123c8c]",children:(0,b.jsx)(e.CalendarDays,{size:24,strokeWidth:2.6})}),(0,b.jsxs)("div",{className:"min-w-0",children:[(0,b.jsx)("p",{className:"text-xs font-black uppercase tracking-[0.22em] text-[#123c8c]",children:"Filter Riwayat"}),(0,b.jsxs)("h2",{className:"mt-1 text-base font-black text-slate-950 md:text-lg",children:[f," ",c]})]})]}),(0,b.jsxs)("div",{className:"mt-5 grid gap-3 md:grid-cols-[1fr_1fr_1fr_auto]",children:[(0,b.jsx)("div",{className:"history-field",children:(0,b.jsx)(o.AppSelect,{value:a,onChange:a=>h(Number(a.target.value)),className:"!mt-0 h-13 md:h-14",children:p.map(a=>(0,b.jsx)("option",{value:a.value,children:a.label},a.value))})}),(0,b.jsx)("div",{className:"history-field",children:(0,b.jsx)(o.AppSelect,{value:c,onChange:a=>k(Number(a.target.value)),className:"!mt-0 h-13 md:h-14",children:q.map(a=>(0,b.jsx)("option",{value:a,children:a},a))})}),(0,b.jsx)("div",{className:"history-field",children:(0,b.jsxs)(o.AppSelect,{value:d,onChange:a=>l(a.target.value),className:"!mt-0 h-13 md:h-14",children:[(0,b.jsx)("option",{value:"desc",children:"Terbaru"}),(0,b.jsx)("option",{value:"asc",children:"Terlama"})]})}),(0,b.jsx)(o.AppButton,{type:"button",onClick:m,disabled:g,className:"h-13 md:h-14",leftIcon:g?(0,b.jsx)(i.Loader2,{size:18,className:"animate-spin"}):(0,b.jsx)(j.Search,{size:18}),children:"Terapkan"})]})]})}function x({item:a,delay:c="0ms"}){var e,h;let i,j,l,m,n,p=(e=a.date,new Intl.DateTimeFormat("id-ID",{day:"2-digit",month:"short"}).format(new Date(`${e}T00:00:00`))).split(" "),q=a.lateMinutes>0?{text:`Terlambat ${a.lateMinutes} menit`,className:"text-orange-600"}:a.earlyLeaveMinutes>0?{text:`Pulang cepat ${a.earlyLeaveMinutes} menit`,className:"text-amber-600"}:{text:"Normal",className:"text-emerald-600"};return(0,b.jsx)(d.default,{href:`/history/${a.id}`,className:"history-row-enter block rounded-3xl border border-blue-100 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:bg-[#f8fbff] hover:shadow-xl hover:shadow-slate-200/60 active:scale-[0.99]",style:{animationDelay:c},children:(0,b.jsxs)("div",{className:"flex items-start justify-between gap-4",children:[(0,b.jsxs)("div",{className:"flex min-w-0 gap-4",children:[(0,b.jsxs)("div",{className:"flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl bg-[#eaf1ff] text-[#123c8c]",children:[(0,b.jsx)("p",{className:"text-lg font-black leading-none",children:p[0]}),(0,b.jsx)("p",{className:"mt-1 text-[10px] font-black uppercase leading-none",children:p[1]})]}),(0,b.jsxs)("div",{className:"min-w-0",children:[(0,b.jsx)("h2",{className:"truncate text-base font-black capitalize text-slate-950 md:text-xl",children:(h=a.date,i=new Date(`${h}T00:00:00`),j=new Intl.DateTimeFormat("id-ID",{weekday:"long"}).format(i),l=new Intl.DateTimeFormat("id-ID",{day:"2-digit"}).format(i),m=new Intl.DateTimeFormat("id-ID",{month:"long"}).format(i),`${j}, ${l} ${m}`)}),(0,b.jsx)(o.AppBadge,{variant:(n=a.status.toLowerCase()).includes("terlambat")?"yellow":n.includes("cuti")?"blue":n.includes("sakit")||n.includes("tidak")?"red":n.includes("pulang cepat")?"yellow":"green",className:"mt-2",children:a.status}),(0,b.jsxs)("div",{className:"mt-4 grid gap-2 text-sm font-bold text-slate-500 sm:grid-cols-3",children:[(0,b.jsxs)("div",{className:"flex items-center gap-2",children:[(0,b.jsx)(g.Clock3,{size:17,className:"shrink-0 text-[#123c8c]",strokeWidth:2.6}),(0,b.jsxs)("span",{children:[a.checkIn," - ",a.checkOut]})]}),(0,b.jsxs)("div",{className:"flex items-center gap-2",children:[(0,b.jsx)(k,{size:17,className:"shrink-0 text-[#123c8c]",strokeWidth:2.6}),(0,b.jsx)("span",{children:function(a){if(!a||a<=0)return"-";let b=Math.floor(a/60),c=a%60;return b>0&&c>0?`${b}j ${c}m`:b>0?`${b}j`:`${c}m`}(a.workMinutes)})]}),(0,b.jsx)("span",{className:q.className,children:q.text})]})]})]}),(0,b.jsx)("div",{className:"flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#f8fbff] text-slate-400 transition group-hover:text-[#123c8c]",children:(0,b.jsx)(f.ChevronRight,{size:20,strokeWidth:2.6})})]})})}function y({isLoading:a,records:c,monthLabel:d,year:f}){return a?(0,b.jsx)("div",{className:"history-row-enter",children:(0,b.jsx)(o.AppLoadingState,{text:"Memuat riwayat presensi..."})}):c.length?c.map((a,c)=>(0,b.jsx)(x,{item:a,delay:`${55*c}ms`},a.id)):(0,b.jsx)("div",{className:"history-row-enter",children:(0,b.jsx)(o.AppEmptyState,{icon:(0,b.jsx)(e.CalendarDays,{size:28,strokeWidth:2.6}),title:"Belum ada data presensi",description:`Data presensi untuk periode ${d} ${f} belum tersedia.`})})}a.s(["default",0,function(){let a=new Date,[d,e]=(0,c.useState)(a.getMonth()+1),[f,g]=(0,c.useState)(a.getFullYear()),[h,i]=(0,c.useState)("desc"),[j,k]=(0,c.useState)([]),[o,q]=(0,c.useState)(!0),s=(0,c.useMemo)(()=>p.find(a=>a.value===d)?.label||"",[d]);async function x(){try{q(!0);let a=await fetch(`/api/attendance/history?month=${d}&year=${f}&sort=${h}`,{method:"GET",cache:"no-store"});if(!a.ok)return void k([]);let b=await a.json();k(b.records||[])}catch(a){console.error("Gagal mengambil history:",a),k([])}finally{q(!1)}}return(0,c.useEffect)(()=>{x()},[d,f,h]),(0,b.jsxs)(n.default,{variant:"employee",withBottomPadding:!1,children:[(0,b.jsx)(r,{}),(0,b.jsx)("div",{className:"hidden md:block",children:(0,b.jsx)(l.default,{title:"Riwayat",rightLabel:`${s} ${f}`,variant:"employee"})}),(0,b.jsxs)("main",{className:"min-h-dvh bg-gradient-to-br from-[#f6f8ff] via-white to-[#eef4ff] pb-28 text-slate-950",children:[(0,b.jsx)(t,{}),(0,b.jsx)(u,{monthLabel:s,year:f,total:j.length,sort:h}),(0,b.jsxs)("section",{className:"history-enter mx-auto max-w-7xl rounded-t-[2.5rem] bg-white px-5 pb-10 pt-8 md:mt-8 md:rounded-[2.5rem] md:px-8 lg:px-10",children:[(0,b.jsx)(w,{month:d,year:f,sort:h,monthLabel:s,isLoading:o,onMonthChange:e,onYearChange:g,onSortChange:i,onApply:x}),(0,b.jsxs)("div",{className:"mt-6 grid grid-cols-3 gap-3",children:[(0,b.jsx)(v,{label:"Total",value:j.length,delay:"60ms"}),(0,b.jsx)(v,{label:"Bulan",value:s,large:!0,delay:"100ms"}),(0,b.jsx)(v,{label:"Tahun",value:f,delay:"140ms"})]}),(0,b.jsx)("div",{className:"mt-6 space-y-4",children:(0,b.jsx)(y,{isLoading:o,records:j,monthLabel:s,year:f})})]}),(0,b.jsx)(m.default,{})]})]})}],57038)}];

//# sourceMappingURL=_1p_86yz._.js.map