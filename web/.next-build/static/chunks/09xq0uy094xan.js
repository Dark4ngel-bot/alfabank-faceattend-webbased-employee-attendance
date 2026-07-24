(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,32781,e=>{"use strict";let t=(0,e.i(56420).default)("loader-circle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);e.s(["Loader2",0,t],32781)},84276,e=>{"use strict";var t=e.i(43476),a=e.i(22016),s=e.i(18566),r=e.i(75153),n=e.i(94004),i=e.i(49817),l=e.i(65649);let o=[{href:"/beranda",label:"Beranda",icon:i.Home},{href:"/presensi",label:"Presensi",icon:r.CalendarCheck},{href:"/history",label:"Riwayat",icon:n.History},{href:"/profil",label:"Profil",icon:l.UserRound}];function d(...e){return e.filter(Boolean).join(" ")}function c(){return(0,t.jsx)("style",{children:`
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
    `})}function m({href:e,label:s,active:r,Icon:n}){return(0,t.jsxs)(a.default,{href:e,"aria-current":r?"page":void 0,className:d("relative flex h-[4.05rem] w-full min-w-0 flex-col items-center justify-center gap-1 rounded-[1.25rem] text-[11px] font-black transition-all duration-300 active:scale-[0.96]",r?"bg-[#123c8c] text-white shadow-xl shadow-blue-900/25":"text-slate-400 hover:bg-[#f6f8ff] hover:text-[#123c8c]"),children:[r?(0,t.jsx)("span",{className:"bottom-nav-active-bar absolute -top-1.5 h-1.5 w-11 rounded-full bg-blue-300"}):null,(0,t.jsx)("div",{className:d("flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition duration-300",r?"bottom-nav-icon-pop bg-white/15":"bg-transparent"),children:(0,t.jsx)(n,{size:24,strokeWidth:r?2.8:2.5,className:d("block shrink-0 transition duration-300",r?"text-white":"text-slate-400")})}),(0,t.jsx)("span",{className:"block max-w-full truncate leading-none",children:s})]})}e.s(["default",0,function({variant:e="employee"}){let a=(0,s.usePathname)();return"admin"===e?null:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(c,{}),(0,t.jsx)("div",{"aria-hidden":"true",className:"h-[calc(5.8rem+env(safe-area-inset-bottom))] shrink-0 md:hidden"}),(0,t.jsx)("nav",{className:"fixed bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] left-1/2 z-50 w-[calc(100%-2rem)] max-w-[35rem] -translate-x-1/2 md:hidden",children:(0,t.jsx)("div",{className:"bottom-nav-shell-in overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/90 px-2.5 py-2.5 shadow-2xl shadow-slate-400/25 backdrop-blur-2xl",children:(0,t.jsx)("div",{className:"grid w-full grid-cols-4 gap-1.5",children:o.map(e=>{var s;return(0,t.jsx)(m,{href:e.href,label:e.label,Icon:e.icon,active:"/beranda"===(s=e.href)?"/"===a||"/beranda"===a:"/history"===s?"/history"===a||a.startsWith("/history/"):a===s||a.startsWith(`${s}/`)},e.href)})})})})]})}])},97923,e=>{"use strict";let t=(0,e.i(56420).default)("log-in",[["path",{d:"m10 17 5-5-5-5",key:"1bsop3"}],["path",{d:"M15 12H3",key:"6jk70r"}],["path",{d:"M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4",key:"u53s6r"}]]);e.s(["LogIn",0,t],97923)},88771,e=>{"use strict";let t=(0,e.i(56420).default)("users-round",[["path",{d:"M18 21a8 8 0 0 0-16 0",key:"3ypg7q"}],["circle",{cx:"10",cy:"8",r:"5",key:"o932ke"}],["path",{d:"M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3",key:"10s06x"}]]);e.s(["UsersRound",0,t],88771)},28030,e=>{"use strict";var t=e.i(43476),a=e.i(71645),s=e.i(4729),r=e.i(94105),n=e.i(32781),i=e.i(97923),l=e.i(67784),o=e.i(88771),d=e.i(26564),c=e.i(84276),m=e.i(89168);function h(e){if(!e)return"-";let t=new Date(e);return Number.isNaN(t.getTime())?"-":t.toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit"})}function x(e){return e.position?e.position:e.department?e.department:"-"}async function u(e){let t=await e.text();try{return t?JSON.parse(t):{}}catch{throw Error("Response API bukan JSON.")}}function b(){return(0,t.jsx)("style",{children:`
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
    `})}e.s(["default",0,function(){let[e,f]=(0,a.useState)(null),[p,j]=(0,a.useState)(!0),[v,g]=(0,a.useState)("");async function y(){try{j(!0),g("");let e=await fetch("/api/admin/dashboard",{method:"GET",cache:"no-store"}),t=await u(e);if(!e.ok)throw Error(t?.message||"Gagal mengambil data dashboard admin.");f(t)}catch(e){g(e instanceof Error?e.message:"Terjadi kesalahan saat mengambil data dashboard.")}finally{j(!1)}}(0,a.useEffect)(()=>{y()},[]);let k=(0,a.useMemo)(()=>{let t=e?.stats;return[{label:"Total Karyawan",value:String(t?.totalEmployees??0),description:"Karyawan aktif",icon:o.UsersRound},{label:"Check-in",value:String(t?.checkInToday??0),description:"Sudah masuk hari ini",icon:i.LogIn},{label:"Check-out",value:String(t?.checkOutToday??0),description:"Sudah keluar hari ini",icon:l.LogOut},{label:"Terlambat",value:String(t?.lateToday??0),description:"Telat masuk",icon:s.Clock3}]},[e]);return(0,t.jsxs)(m.default,{variant:"admin",children:[(0,t.jsx)(b,{}),(0,t.jsx)(d.default,{title:"Admin Dasbor",variant:"admin"}),(0,t.jsxs)("section",{className:"mx-auto max-w-7xl space-y-6 px-5 py-6 pb-28 md:px-10 lg:px-16",children:[(0,t.jsx)("div",{className:"dashboard-enter overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-xl shadow-slate-300/30",children:(0,t.jsxs)("div",{className:"grid gap-0 lg:grid-cols-[1fr_1fr]",children:[(0,t.jsx)("div",{className:"bg-[#123c8c] p-6 text-white md:p-8",children:(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsx)("div",{className:"flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15",children:(0,t.jsx)(r.LayoutDashboard,{size:25,strokeWidth:2.6})}),(0,t.jsx)("div",{children:(0,t.jsx)("h2",{className:"mt-1 text-3xl font-black tracking-tight md:text-4xl",children:"Ringkasan Presensi"})})]})}),(0,t.jsx)("div",{className:"grid grid-cols-2 gap-3 p-5 md:p-6",children:k.map((e,a)=>{let s=e.icon;return(0,t.jsxs)("div",{className:"dashboard-row-enter rounded-2xl border border-blue-100 bg-[#f6f8ff] p-4 transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-lg hover:shadow-slate-200/60",style:{animationDelay:`${70*a}ms`},children:[(0,t.jsxs)("div",{className:"flex items-center justify-between gap-3",children:[(0,t.jsx)("p",{className:"text-xs font-bold text-slate-500",children:e.label}),(0,t.jsx)(s,{size:20,strokeWidth:2.5,className:"text-[#123c8c]"})]}),p?(0,t.jsx)("div",{className:"mt-4 h-8 w-16 animate-pulse rounded-xl bg-blue-100"}):(0,t.jsx)("h3",{className:"mt-3 text-3xl font-black text-[#123c8c]",children:e.value}),(0,t.jsx)("p",{className:"mt-1 text-xs font-semibold text-slate-500",children:e.description})]},`${e.label}-${a}`)})})]})}),v?(0,t.jsx)("div",{className:"dashboard-row-enter rounded-3xl border border-red-100 bg-red-50 p-5 text-sm font-bold text-red-700",children:v}):null,(0,t.jsxs)("div",{className:"dashboard-enter rounded-3xl border border-white/70 bg-white/90 p-5 shadow-xl shadow-slate-300/30 backdrop-blur-xl md:p-6",style:{animationDelay:"100ms"},children:[(0,t.jsx)("div",{className:"flex flex-col gap-2 md:flex-row md:items-end md:justify-between",children:(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-xs font-black uppercase tracking-[0.22em] text-[#123c8c]",children:"Laporan Hari Ini"}),(0,t.jsx)("h2",{className:"mt-2 text-2xl font-black tracking-tight text-slate-950",children:"Presensi Terbaru"})]})}),(0,t.jsxs)("div",{className:"mt-6 overflow-hidden rounded-2xl border border-blue-100",children:[(0,t.jsxs)("div",{className:"hidden grid-cols-[0.9fr_1.4fr_0.8fr_0.8fr_0.8fr_0.8fr] bg-[#eaf1ff] px-5 py-3 text-xs font-black uppercase tracking-wide text-[#123c8c] md:grid",children:[(0,t.jsx)("p",{children:"ID"}),(0,t.jsx)("p",{children:"Karyawan"}),(0,t.jsx)("p",{children:"Check-in"}),(0,t.jsx)("p",{children:"Check-out"}),(0,t.jsx)("p",{children:"Durasi"}),(0,t.jsx)("p",{children:"Status"})]}),(0,t.jsx)("div",{className:"divide-y divide-blue-100 bg-white",children:p?(0,t.jsxs)("div",{className:"dashboard-row-enter flex items-center justify-center gap-2 px-5 py-10 text-sm font-bold text-slate-500",children:[(0,t.jsx)(n.Loader2,{size:18,className:"animate-spin"}),"Mengambil data presensi..."]}):e?.recentAttendance.length?e.recentAttendance.map((e,a)=>{var s;return(0,t.jsxs)("div",{className:"dashboard-row-enter grid gap-3 px-5 py-4 text-sm transition duration-200 hover:bg-[#f8fbff] md:grid-cols-[0.9fr_1.4fr_0.8fr_0.8fr_0.8fr_0.8fr] md:items-center",style:{animationDelay:`${45*a}ms`},children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"font-black text-[#123c8c]",children:(s=e.employeeCode||e.id)?s.slice(0,8).toUpperCase():"-"}),(0,t.jsx)("p",{className:"mt-1 text-xs font-semibold text-slate-400 md:hidden",children:x(e)})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"font-bold text-slate-950",children:e.name}),(0,t.jsx)("p",{className:"mt-1 hidden text-xs font-semibold text-slate-400 md:block",children:x(e)})]}),(0,t.jsxs)("p",{className:"text-slate-500",children:[(0,t.jsxs)("span",{className:"font-bold text-slate-700 md:hidden",children:["Check-in:"," "]}),h(e.checkInTime)]}),(0,t.jsxs)("p",{className:"text-slate-500",children:[(0,t.jsxs)("span",{className:"font-bold text-slate-700 md:hidden",children:["Check-out:"," "]}),h(e.checkOutTime)]}),(0,t.jsxs)("p",{className:"font-semibold text-slate-500",children:[(0,t.jsxs)("span",{className:"font-bold text-slate-700 md:hidden",children:["Durasi:"," "]}),function(e,t=!1){if(!t)return"-";let a=Math.max(0,Number(e||0));if(a<=0)return"0m";let s=Math.floor(a/60),r=a%60;return s>0&&r>0?`${s}j ${r}m`:s>0?`${s}j`:`${r}m`}(e.workMinutes,!!e.checkOutTime)]}),(0,t.jsx)("span",{className:`w-fit rounded-full px-3 py-1 text-xs font-black ${e.checkOutTime?"bg-[#eaf1ff] text-[#123c8c]":e.lateMinutes>0||e.status?.toUpperCase()==="LATE"?"bg-amber-50 text-amber-700":e.checkInTime?"bg-emerald-50 text-emerald-700":"bg-slate-100 text-slate-600"}`,children:e.checkOutTime?"Selesai":e.lateMinutes>0||e.status?.toUpperCase()==="LATE"?"Terlambat":e.checkInTime?"Check-in":"Belum Absen"})]},e.attendanceId||`${e.id||"attendance"}-${e.employeeCode||"employee"}-${a}`)}):(0,t.jsx)("div",{className:"dashboard-row-enter px-5 py-10 text-center text-sm font-bold text-slate-500",children:"Belum ada data check-in atau check-out hari ini."})})]})]})]}),(0,t.jsx)(c.default,{variant:"admin"})]})}])}]);