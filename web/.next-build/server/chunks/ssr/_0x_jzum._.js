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
    `})}function l({href:a,label:d,active:e,Icon:f}){return(0,b.jsxs)(c.default,{href:a,"aria-current":e?"page":void 0,className:j("relative flex h-[4.05rem] w-full min-w-0 flex-col items-center justify-center gap-1 rounded-[1.25rem] text-[11px] font-black transition-all duration-300 active:scale-[0.96]",e?"bg-[#123c8c] text-white shadow-xl shadow-blue-900/25":"text-slate-400 hover:bg-[#f6f8ff] hover:text-[#123c8c]"),children:[e?(0,b.jsx)("span",{className:"bottom-nav-active-bar absolute -top-1.5 h-1.5 w-11 rounded-full bg-blue-300"}):null,(0,b.jsx)("div",{className:j("flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition duration-300",e?"bottom-nav-icon-pop bg-white/15":"bg-transparent"),children:(0,b.jsx)(f,{size:24,strokeWidth:e?2.8:2.5,className:j("block shrink-0 transition duration-300",e?"text-white":"text-slate-400")})}),(0,b.jsx)("span",{className:"block max-w-full truncate leading-none",children:d})]})}a.s(["default",0,function({variant:a="employee"}){let c=(0,d.usePathname)();return"admin"===a?null:(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(k,{}),(0,b.jsx)("div",{"aria-hidden":"true",className:"h-[calc(5.8rem+env(safe-area-inset-bottom))] shrink-0 md:hidden"}),(0,b.jsx)("nav",{className:"fixed bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] left-1/2 z-50 w-[calc(100%-2rem)] max-w-[35rem] -translate-x-1/2 md:hidden",children:(0,b.jsx)("div",{className:"bottom-nav-shell-in overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/90 px-2.5 py-2.5 shadow-2xl shadow-slate-400/25 backdrop-blur-2xl",children:(0,b.jsx)("div",{className:"grid w-full grid-cols-4 gap-1.5",children:i.map(a=>{var d;return(0,b.jsx)(l,{href:a.href,label:a.label,Icon:a.icon,active:"/beranda"===(d=a.href)?"/"===c||"/beranda"===c:"/history"===d?"/history"===c||c.startsWith("/history/"):c===d||c.startsWith(`${d}/`)},a.href)})})})})]})}])},74896,a=>{"use strict";let b=(0,a.i(64831).default)("log-in",[["path",{d:"m10 17 5-5-5-5",key:"1bsop3"}],["path",{d:"M15 12H3",key:"6jk70r"}],["path",{d:"M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4",key:"u53s6r"}]]);a.s(["LogIn",0,b],74896)},5750,a=>{"use strict";let b=(0,a.i(64831).default)("users-round",[["path",{d:"M18 21a8 8 0 0 0-16 0",key:"3ypg7q"}],["circle",{cx:"10",cy:"8",r:"5",key:"o932ke"}],["path",{d:"M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3",key:"10s06x"}]]);a.s(["UsersRound",0,b],5750)},2868,a=>{"use strict";var b=a.i(87924),c=a.i(72131),d=a.i(70115),e=a.i(62101),f=a.i(75160),g=a.i(74896),h=a.i(57230),i=a.i(5750),j=a.i(38615),k=a.i(33751),l=a.i(89240);function m(a){if(!a)return"-";let b=new Date(a);return Number.isNaN(b.getTime())?"-":b.toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit"})}function n(a){return a.position?a.position:a.department?a.department:"-"}async function o(a){let b=await a.text();try{return b?JSON.parse(b):{}}catch{throw Error("Response API bukan JSON.")}}function p(){return(0,b.jsx)("style",{children:`
      @keyframes dashboardEnter {
        0% {
          opacity: 0;
          transform: translateY(14px);
        }

        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes dashboardRowEnter {
        0% {
          opacity: 0;
          transform: translateY(10px);
        }

        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .dashboard-enter {
        animation: dashboardEnter 320ms ease-out both;
      }

      .dashboard-row-enter {
        opacity: 0;
        animation: dashboardRowEnter 300ms ease-out both;
      }

      @media (prefers-reduced-motion: reduce) {
        .dashboard-enter,
        .dashboard-row-enter {
          animation: none !important;
          opacity: 1 !important;
          transform: none !important;
        }
      }
    `})}a.s(["default",0,function(){let[a,q]=(0,c.useState)(null),[r,s]=(0,c.useState)(!0),[t,u]=(0,c.useState)("");async function v(){try{s(!0),u("");let a=await fetch("/api/admin/dashboard",{method:"GET",cache:"no-store"}),b=await o(a);if(!a.ok)throw Error(b?.message||"Gagal mengambil data dashboard admin.");q(b)}catch(a){u(a instanceof Error?a.message:"Terjadi kesalahan saat mengambil data dashboard.")}finally{s(!1)}}(0,c.useEffect)(()=>{v()},[]);let w=(0,c.useMemo)(()=>{let b=a?.stats;return[{label:"Total Karyawan",value:String(b?.totalEmployees??0),description:"Karyawan aktif",icon:i.UsersRound},{label:"Check-in",value:String(b?.checkInToday??0),description:"Sudah masuk hari ini",icon:g.LogIn},{label:"Check-out",value:String(b?.checkOutToday??0),description:"Sudah keluar hari ini",icon:h.LogOut},{label:"Terlambat",value:String(b?.lateToday??0),description:"Telat masuk",icon:d.Clock3}]},[a]);return(0,b.jsxs)(l.default,{variant:"admin",children:[(0,b.jsx)(p,{}),(0,b.jsx)(j.default,{title:"Admin Dasbor",variant:"admin"}),(0,b.jsxs)("section",{className:"mx-auto max-w-7xl space-y-6 px-5 py-6 pb-28 md:px-10 lg:px-16",children:[(0,b.jsx)("div",{className:"dashboard-enter overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-xl shadow-slate-300/30",children:(0,b.jsxs)("div",{className:"grid gap-0 lg:grid-cols-[1fr_1fr]",children:[(0,b.jsx)("div",{className:"bg-[#123c8c] p-6 text-white md:p-8",children:(0,b.jsxs)("div",{className:"flex items-center gap-3",children:[(0,b.jsx)("div",{className:"flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15",children:(0,b.jsx)(e.LayoutDashboard,{size:25,strokeWidth:2.6})}),(0,b.jsx)("div",{children:(0,b.jsx)("h2",{className:"mt-1 text-3xl font-black tracking-tight md:text-4xl",children:"Ringkasan Presensi"})})]})}),(0,b.jsx)("div",{className:"grid grid-cols-2 gap-3 p-5 md:p-6",children:w.map((a,c)=>{let d=a.icon;return(0,b.jsxs)("div",{className:"dashboard-row-enter rounded-2xl border border-blue-100 bg-[#f6f8ff] p-4 transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-lg hover:shadow-slate-200/60",style:{animationDelay:`${70*c}ms`},children:[(0,b.jsxs)("div",{className:"flex items-center justify-between gap-3",children:[(0,b.jsx)("p",{className:"text-xs font-bold text-slate-500",children:a.label}),(0,b.jsx)(d,{size:20,strokeWidth:2.5,className:"text-[#123c8c]"})]}),r?(0,b.jsx)("div",{className:"mt-4 h-8 w-16 animate-pulse rounded-xl bg-blue-100"}):(0,b.jsx)("h3",{className:"mt-3 text-3xl font-black text-[#123c8c]",children:a.value}),(0,b.jsx)("p",{className:"mt-1 text-xs font-semibold text-slate-500",children:a.description})]},`${a.label}-${c}`)})})]})}),t?(0,b.jsx)("div",{className:"dashboard-row-enter rounded-3xl border border-red-100 bg-red-50 p-5 text-sm font-bold text-red-700",children:t}):null,(0,b.jsxs)("div",{className:"dashboard-enter rounded-3xl border border-white/70 bg-white/90 p-5 shadow-xl shadow-slate-300/30 backdrop-blur-xl md:p-6",style:{animationDelay:"100ms"},children:[(0,b.jsx)("div",{className:"flex flex-col gap-2 md:flex-row md:items-end md:justify-between",children:(0,b.jsxs)("div",{children:[(0,b.jsx)("p",{className:"text-xs font-black uppercase tracking-[0.22em] text-[#123c8c]",children:"Laporan Hari Ini"}),(0,b.jsx)("h2",{className:"mt-2 text-2xl font-black tracking-tight text-slate-950",children:"Presensi Terbaru"})]})}),(0,b.jsxs)("div",{className:"mt-6 overflow-hidden rounded-2xl border border-blue-100",children:[(0,b.jsxs)("div",{className:"hidden grid-cols-[0.9fr_1.4fr_0.8fr_0.8fr_0.8fr_0.8fr] bg-[#eaf1ff] px-5 py-3 text-xs font-black uppercase tracking-wide text-[#123c8c] md:grid",children:[(0,b.jsx)("p",{children:"ID"}),(0,b.jsx)("p",{children:"Karyawan"}),(0,b.jsx)("p",{children:"Check-in"}),(0,b.jsx)("p",{children:"Check-out"}),(0,b.jsx)("p",{children:"Durasi"}),(0,b.jsx)("p",{children:"Status"})]}),(0,b.jsx)("div",{className:"divide-y divide-blue-100 bg-white",children:r?(0,b.jsxs)("div",{className:"dashboard-row-enter flex items-center justify-center gap-2 px-5 py-10 text-sm font-bold text-slate-500",children:[(0,b.jsx)(f.Loader2,{size:18,className:"animate-spin"}),"Mengambil data presensi..."]}):a?.recentAttendance.length?a.recentAttendance.map((a,c)=>{var d;return(0,b.jsxs)("div",{className:"dashboard-row-enter grid gap-3 px-5 py-4 text-sm transition duration-200 hover:bg-[#f8fbff] md:grid-cols-[0.9fr_1.4fr_0.8fr_0.8fr_0.8fr_0.8fr] md:items-center",style:{animationDelay:`${45*c}ms`},children:[(0,b.jsxs)("div",{children:[(0,b.jsx)("p",{className:"font-black text-[#123c8c]",children:(d=a.employeeCode||a.id)?d.slice(0,8).toUpperCase():"-"}),(0,b.jsx)("p",{className:"mt-1 text-xs font-semibold text-slate-400 md:hidden",children:n(a)})]}),(0,b.jsxs)("div",{children:[(0,b.jsx)("p",{className:"font-bold text-slate-950",children:a.name}),(0,b.jsx)("p",{className:"mt-1 hidden text-xs font-semibold text-slate-400 md:block",children:n(a)})]}),(0,b.jsxs)("p",{className:"text-slate-500",children:[(0,b.jsxs)("span",{className:"font-bold text-slate-700 md:hidden",children:["Check-in:"," "]}),m(a.checkInTime)]}),(0,b.jsxs)("p",{className:"text-slate-500",children:[(0,b.jsxs)("span",{className:"font-bold text-slate-700 md:hidden",children:["Check-out:"," "]}),m(a.checkOutTime)]}),(0,b.jsxs)("p",{className:"font-semibold text-slate-500",children:[(0,b.jsxs)("span",{className:"font-bold text-slate-700 md:hidden",children:["Durasi:"," "]}),function(a,b=!1){if(!b)return"-";let c=Math.max(0,Number(a||0));if(c<=0)return"0m";let d=Math.floor(c/60),e=c%60;return d>0&&e>0?`${d}j ${e}m`:d>0?`${d}j`:`${e}m`}(a.workMinutes,!!a.checkOutTime)]}),(0,b.jsx)("span",{className:`w-fit rounded-full px-3 py-1 text-xs font-black ${a.checkOutTime?"bg-[#eaf1ff] text-[#123c8c]":a.lateMinutes>0||a.status?.toUpperCase()==="LATE"?"bg-amber-50 text-amber-700":a.checkInTime?"bg-emerald-50 text-emerald-700":"bg-slate-100 text-slate-600"}`,children:a.checkOutTime?"Selesai":a.lateMinutes>0||a.status?.toUpperCase()==="LATE"?"Terlambat":a.checkInTime?"Check-in":"Belum Absen"})]},a.attendanceId||`${a.id||"attendance"}-${a.employeeCode||"employee"}-${c}`)}):(0,b.jsx)("div",{className:"dashboard-row-enter px-5 py-10 text-center text-sm font-bold text-slate-500",children:"Belum ada data check-in atau check-out hari ini."})})]})]})]}),(0,b.jsx)(k.default,{variant:"admin"})]})}])}];

//# sourceMappingURL=_0x_jzum._.js.map