(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,32781,e=>{"use strict";let t=(0,e.i(56420).default)("loader-circle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);e.s(["Loader2",0,t],32781)},84276,e=>{"use strict";var t=e.i(43476),a=e.i(22016),s=e.i(18566),i=e.i(75153),l=e.i(94004),r=e.i(49817),n=e.i(65649);let o=[{href:"/beranda",label:"Beranda",icon:r.Home},{href:"/presensi",label:"Presensi",icon:i.CalendarCheck},{href:"/history",label:"Riwayat",icon:l.History},{href:"/profil",label:"Profil",icon:n.UserRound}];function c(...e){return e.filter(Boolean).join(" ")}function d(){return(0,t.jsx)("style",{children:`
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
    `})}function m({href:e,label:s,active:i,Icon:l}){return(0,t.jsxs)(a.default,{href:e,"aria-current":i?"page":void 0,className:c("relative flex h-[4.05rem] w-full min-w-0 flex-col items-center justify-center gap-1 rounded-[1.25rem] text-[11px] font-black transition-all duration-300 active:scale-[0.96]",i?"bg-[#123c8c] text-white shadow-xl shadow-blue-900/25":"text-slate-400 hover:bg-[#f6f8ff] hover:text-[#123c8c]"),children:[i?(0,t.jsx)("span",{className:"bottom-nav-active-bar absolute -top-1.5 h-1.5 w-11 rounded-full bg-blue-300"}):null,(0,t.jsx)("div",{className:c("flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition duration-300",i?"bottom-nav-icon-pop bg-white/15":"bg-transparent"),children:(0,t.jsx)(l,{size:24,strokeWidth:i?2.8:2.5,className:c("block shrink-0 transition duration-300",i?"text-white":"text-slate-400")})}),(0,t.jsx)("span",{className:"block max-w-full truncate leading-none",children:s})]})}e.s(["default",0,function({variant:e="employee"}){let a=(0,s.usePathname)();return"admin"===e?null:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(d,{}),(0,t.jsx)("div",{"aria-hidden":"true",className:"h-[calc(5.8rem+env(safe-area-inset-bottom))] shrink-0 md:hidden"}),(0,t.jsx)("nav",{className:"fixed bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] left-1/2 z-50 w-[calc(100%-2rem)] max-w-[35rem] -translate-x-1/2 md:hidden",children:(0,t.jsx)("div",{className:"bottom-nav-shell-in overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/90 px-2.5 py-2.5 shadow-2xl shadow-slate-400/25 backdrop-blur-2xl",children:(0,t.jsx)("div",{className:"grid w-full grid-cols-4 gap-1.5",children:o.map(e=>{var s;return(0,t.jsx)(m,{href:e.href,label:e.label,Icon:e.icon,active:"/beranda"===(s=e.href)?"/"===a||"/beranda"===a:"/history"===s?"/history"===a||a.startsWith("/history/"):a===s||a.startsWith(`${s}/`)},e.href)})})})})]})}])},66595,e=>{"use strict";let t=(0,e.i(56420).default)("search",[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]]);e.s(["Search",0,t],66595)},51757,e=>{"use strict";let t=(0,e.i(56420).default)("circle-check",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);e.s(["CheckCircle2",0,t],51757)},20865,e=>{"use strict";let t=(0,e.i(56420).default)("map-pin",[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);e.s(["MapPin",0,t],20865)},82924,e=>{"use strict";let t=(0,e.i(56420).default)("briefcase-business",[["path",{d:"M12 12h.01",key:"1mp3jc"}],["path",{d:"M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2",key:"1ksdt3"}],["path",{d:"M22 13a18.15 18.15 0 0 1-20 0",key:"12hx5q"}],["rect",{width:"20",height:"14",x:"2",y:"6",rx:"2",key:"i6l2r4"}]]);e.s(["BriefcaseBusiness",0,t],82924)},41120,e=>{"use strict";let t=(0,e.i(56420).default)("refresh-cw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);e.s(["RefreshCw",0,t],41120)},19957,e=>{"use strict";var t=e.i(43476),a=e.i(71645),s=e.i(22016),i=e.i(70812),l=e.i(82924),r=e.i(6501),n=e.i(51757),o=e.i(4729),c=e.i(56420);let d=(0,c.default)("file-clock",[["path",{d:"M16 22h2a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v2.85",key:"ryk6xj"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M8 14v2.2l1.6 1",key:"6m4bie"}],["circle",{cx:"8",cy:"16",r:"6",key:"10v15b"}]]),m=(0,c.default)("heart-pulse",[["path",{d:"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",key:"mvr1a0"}],["path",{d:"M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27",key:"auskq0"}]]);var u=e.i(49817),f=e.i(32781),x=e.i(20865),h=e.i(41120),b=e.i(66595);let p=(0,c.default)("shield-alert",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"M12 8v4",key:"1got3b"}],["path",{d:"M12 16h.01",key:"1drbdi"}]]);var g=e.i(65649),v=e.i(26564),j=e.i(84276),y=e.i(89168);let k={total:0,unread:0,pending:0,sick:0,leave:0,permission:0,wfh:0,wfc:0,visit:0},w=[{value:"all",label:"Semua Jenis"},{value:"sick",label:"Sakit"},{value:"leave",label:"Cuti"},{value:"permission",label:"Izin"},{value:"wfh",label:"WFH"},{value:"wfc",label:"WFC"},{value:"visit",label:"Kunjungan"}],N=[{value:"all",label:"Semua Status"},{value:"unread",label:"Belum Dibaca"},{value:"read",label:"Dibaca"},{value:"pending",label:"Menunggu"},{value:"approved",label:"Disetujui"},{value:"rejected",label:"Ditolak"}];function C(e){return"sick"===e?"Sakit":"leave"===e?"Cuti":"permission"===e?"Izin":"wfh"===e?"WFH":"wfc"===e?"WFC":"visit"===e?"Kunjungan":e}function S(e){return"sick"===e?"bg-red-50 text-red-600 border-red-100":"leave"===e?"bg-blue-50 text-[#123c8c] border-blue-100":"permission"===e?"bg-amber-50 text-amber-700 border-amber-100":"wfh"===e?"bg-emerald-50 text-emerald-700 border-emerald-100":"wfc"===e?"bg-purple-50 text-purple-700 border-purple-100":"visit"===e?"bg-orange-50 text-orange-700 border-orange-100":"bg-slate-50 text-slate-600 border-slate-100"}async function M(e){let t=await e.text();try{return t?JSON.parse(t):{}}catch{throw Error("Response API bukan JSON.")}}function I(){return(0,t.jsx)("style",{children:`
      @keyframes notificationEnter {
        0% {
          opacity: 0;
          transform: translateY(14px);
        }

        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes notificationRowEnter {
        0% {
          opacity: 0;
          transform: translateY(10px);
        }

        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes notificationIconPop {
        0% {
          opacity: 0;
          transform: scale(0.92);
        }

        100% {
          opacity: 1;
          transform: scale(1);
        }
      }

      .notification-enter {
        animation: notificationEnter 320ms ease-out both;
      }

      .notification-row-enter {
        opacity: 0;
        animation: notificationRowEnter 300ms ease-out both;
      }

      .notification-icon-pop {
        animation: notificationIconPop 260ms ease-out both;
      }

      .notification-field {
        transition:
          border-color 180ms ease,
          background-color 180ms ease,
          box-shadow 180ms ease;
      }

      @media (prefers-reduced-motion: reduce) {
        .notification-enter,
        .notification-row-enter,
        .notification-icon-pop {
          animation: none !important;
          opacity: 1 !important;
          transform: none !important;
        }
      }
    `})}e.s(["default",0,function(){let[e,c]=(0,a.useState)([]),[z,T]=(0,a.useState)(k),[A,R]=(0,a.useState)(""),[D,B]=(0,a.useState)("all"),[P,E]=(0,a.useState)("all"),[$,L]=(0,a.useState)(!0),[O,W]=(0,a.useState)(""),[H,F]=(0,a.useState)("");async function K(){try{L(!0),F("");let e=await fetch("/api/admin/notifications",{cache:"no-store"}),t=await M(e);if(!e.ok)throw Error(t.message||"Gagal mengambil notifikasi.");c(t.notifications||[]),T(t.stats||k)}catch(e){console.error("LOAD_NOTIFICATIONS_ERROR:",e),F(e instanceof Error?e.message:"Terjadi kesalahan saat mengambil notifikasi.")}finally{L(!1)}}async function _(e){if("AdminNotification"===e.source)try{W(e.rawId);let t=await fetch("/api/admin/notifications",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:e.rawId})}),a=await M(t);if(!t.ok)throw Error(a.message||"Gagal menandai notifikasi.");await K()}catch(e){console.error("MARK_NOTIFICATION_ERROR:",e),alert(e instanceof Error?e.message:"Gagal menandai notifikasi sudah dibaca.")}finally{W("")}}(0,a.useEffect)(()=>{K()},[]);let Y=(0,a.useMemo)(()=>{let t=A.toLowerCase().trim();return e.filter(e=>{let a=`
        ${e.title}
        ${e.message}
        ${e.employeeName}
        ${e.employeeEmail}
        ${e.status}
        ${e.statusText}
        ${C(e.type)}
        ${e.dateText}
      `.toLowerCase(),s=!t||a.includes(t),i="all"===D||e.type===D,l="all"===P||e.status===P;return s&&i&&l})},[e,A,D,P]),J=[{label:"Total Notifikasi",value:z.total,icon:i.Bell,description:"Semua laporan masuk"},{label:"Belum Dibaca",value:z.unread,icon:o.Clock3,description:"Dari AdminNotification"},{label:"Cuti / Sakit / Izin",value:z.leave+z.sick+z.permission,icon:d,description:"Dari CutiPengajuan"},{label:"WFH / WFC / Kunjungan",value:z.wfh+z.wfc+z.visit,icon:x.MapPin,description:"Dari AdminNotification"}];return(0,t.jsxs)(y.default,{variant:"admin",children:[(0,t.jsx)(I,{}),(0,t.jsx)(v.default,{title:"Notifikasi",variant:"admin"}),(0,t.jsxs)("main",{className:"mx-auto max-w-7xl space-y-6 px-5 py-6 pb-28 md:px-10 lg:px-16",children:[(0,t.jsxs)("section",{className:"notification-enter relative overflow-hidden rounded-[2.2rem] bg-[#123c8c] p-6 text-white shadow-2xl shadow-blue-900/25 md:p-8",children:[(0,t.jsx)("div",{className:"absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"}),(0,t.jsx)("div",{className:"absolute -bottom-24 left-16 h-64 w-64 rounded-full bg-blue-300/20 blur-3xl"}),(0,t.jsxs)("div",{className:"relative z-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between",children:[(0,t.jsxs)("div",{children:[(0,t.jsxs)("div",{className:"inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-blue-100",children:[(0,t.jsx)(p,{size:15}),"Notification Center"]}),(0,t.jsx)("h1",{className:"mt-5 text-3xl font-black tracking-tight md:text-4xl",children:"Pusat Notifikasi"})]}),(0,t.jsxs)("button",{type:"button",onClick:K,className:"inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-white px-5 text-sm font-black text-[#123c8c] shadow-lg shadow-blue-950/20 transition hover:-translate-y-0.5 hover:bg-blue-50 active:scale-[0.98]",children:[(0,t.jsx)(h.RefreshCw,{size:18}),"Refresh"]})]})]}),(0,t.jsx)("section",{className:"grid gap-4 md:grid-cols-4",children:J.map((e,a)=>{let s=e.icon;return(0,t.jsx)("div",{className:"notification-row-enter rounded-[1.7rem] border border-blue-100 bg-white/90 p-5 shadow-xl shadow-slate-300/30 transition duration-200 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-slate-300/40",style:{animationDelay:`${70*a}ms`},children:(0,t.jsxs)("div",{className:"flex items-start justify-between gap-3",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-sm font-bold text-slate-500",children:e.label}),(0,t.jsx)("h3",{className:"mt-2 text-3xl font-black text-slate-950",children:$?"-":e.value}),(0,t.jsx)("p",{className:"mt-1 text-xs font-semibold text-slate-400",children:e.description})]}),(0,t.jsx)("div",{className:"notification-icon-pop flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#eaf1ff] text-[#123c8c]",children:(0,t.jsx)(s,{size:24,strokeWidth:2.7})})]})},e.label)})}),(0,t.jsxs)("section",{className:"notification-enter rounded-[2rem] border border-white/70 bg-white/90 p-5 shadow-xl shadow-slate-300/30 backdrop-blur-xl md:p-6",style:{animationDelay:"100ms"},children:[(0,t.jsxs)("div",{className:"grid gap-4 lg:grid-cols-[1fr_220px_220px_auto]",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"text-sm font-black text-slate-500",children:"Cari Notifikasi"}),(0,t.jsxs)("div",{className:"relative mt-3",children:[(0,t.jsx)(b.Search,{size:20,className:"absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"}),(0,t.jsx)("input",{value:A,onChange:e=>R(e.target.value),placeholder:"Cari nama, laporan, status, atau keterangan...",className:"notification-field h-[58px] w-full rounded-2xl border border-blue-100 bg-[#f6f8ff] pl-12 pr-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#123c8c] focus:bg-white focus:ring-4 focus:ring-blue-100"})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"text-sm font-black text-slate-500",children:"Jenis Laporan"}),(0,t.jsx)("select",{value:D,onChange:e=>B(e.target.value),className:"notification-field mt-3 h-[58px] w-full rounded-2xl border border-blue-100 bg-[#f6f8ff] px-4 text-sm font-black text-slate-700 outline-none transition focus:border-[#123c8c] focus:bg-white focus:ring-4 focus:ring-blue-100",children:w.map(e=>(0,t.jsx)("option",{value:e.value,children:e.label},e.value))})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"text-sm font-black text-slate-500",children:"Status"}),(0,t.jsx)("select",{value:P,onChange:e=>E(e.target.value),className:"notification-field mt-3 h-[58px] w-full rounded-2xl border border-blue-100 bg-[#f6f8ff] px-4 text-sm font-black text-slate-700 outline-none transition focus:border-[#123c8c] focus:bg-white focus:ring-4 focus:ring-blue-100",children:N.map(e=>(0,t.jsx)("option",{value:e.value,children:e.label},e.value))})]}),(0,t.jsx)("div",{className:"flex items-end",children:(0,t.jsx)("button",{type:"button",onClick:()=>{R(""),B("all"),E("all")},className:"flex h-[58px] w-full items-center justify-center rounded-2xl border border-blue-100 bg-white px-5 text-sm font-black text-[#123c8c] shadow-sm transition hover:bg-blue-50 active:scale-[0.96] lg:w-auto",children:"Atur Ulang"})})]}),H?(0,t.jsx)("div",{className:"notification-row-enter mt-5 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-black text-red-700",children:H}):null,(0,t.jsx)("div",{className:"mt-6 space-y-4",children:$?(0,t.jsxs)("div",{className:"notification-row-enter flex items-center justify-center gap-3 rounded-3xl border border-blue-100 bg-[#f8fbff] p-10 text-sm font-black text-slate-600",children:[(0,t.jsx)(f.Loader2,{className:"animate-spin text-[#123c8c]",size:22}),"Mengambil data notifikasi..."]}):0===Y.length?(0,t.jsxs)("div",{className:"notification-row-enter rounded-3xl border border-blue-100 bg-[#f8fbff] p-10 text-center",children:[(0,t.jsx)(i.Bell,{className:"mx-auto text-slate-300",size:42}),(0,t.jsx)("p",{className:"mt-3 text-lg font-black text-slate-700",children:"Tidak ada notifikasi"}),(0,t.jsx)("p",{className:"mt-1 text-sm text-slate-400",children:"Belum ada laporan yang sesuai dengan filter."})]}):Y.map((e,a)=>{var o;let c,h="sick"===(o=e.type)?m:"leave"===o?r.CalendarClock:"permission"===o?d:"wfh"===o?u.Home:"wfc"===o?l.BriefcaseBusiness:"visit"===o?x.MapPin:i.Bell,b="AdminNotification"===e.source&&"unread"===e.status;return(0,t.jsx)("div",{className:"notification-row-enter rounded-[1.7rem] border border-blue-100 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-200/70",style:{animationDelay:`${55*a}ms`},children:(0,t.jsxs)("div",{className:"flex flex-col gap-4 md:flex-row md:items-start md:justify-between",children:[(0,t.jsxs)("div",{className:"flex gap-4",children:[(0,t.jsx)("div",{className:`notification-icon-pop flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border ${S(e.type)}`,children:(0,t.jsx)(h,{size:25,strokeWidth:2.8})}),(0,t.jsxs)("div",{className:"min-w-0",children:[(0,t.jsxs)("div",{className:"flex flex-wrap items-center gap-2",children:[(0,t.jsx)("span",{className:`rounded-full border px-3 py-1 text-xs font-black ${S(e.type)}`,children:C(e.type)}),(0,t.jsx)("span",{className:`rounded-full px-3 py-1 text-xs font-black ${"unread"===(c=e.status.toLowerCase())?"bg-orange-50 text-orange-700":"read"===c?"bg-slate-100 text-slate-600":"pending"===c?"bg-amber-50 text-amber-700":"approved"===c?"bg-emerald-50 text-emerald-700":"rejected"===c?"bg-red-50 text-red-600":"bg-slate-100 text-slate-600"}`,children:e.statusText}),(0,t.jsx)("span",{className:"rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-500",children:e.source})]}),(0,t.jsx)("h3",{className:"mt-3 text-lg font-black text-slate-950",children:e.title}),(0,t.jsx)("p",{className:"mt-2 text-sm font-semibold leading-6 text-slate-600",children:e.message}),(0,t.jsxs)("div",{className:"mt-4 grid gap-2 text-sm md:grid-cols-3",children:[(0,t.jsxs)("div",{className:"rounded-2xl bg-[#f6f8ff] p-3",children:[(0,t.jsx)("p",{className:"text-xs font-black uppercase tracking-[0.14em] text-slate-400",children:"Karyawan"}),(0,t.jsx)("p",{className:"mt-1 font-black text-slate-700",children:e.employeeName}),(0,t.jsx)("p",{className:"mt-1 truncate text-xs font-semibold text-slate-400",children:e.employeeEmail})]}),(0,t.jsxs)("div",{className:"rounded-2xl bg-[#f6f8ff] p-3",children:[(0,t.jsx)("p",{className:"text-xs font-black uppercase tracking-[0.14em] text-slate-400",children:"Tanggal"}),(0,t.jsx)("p",{className:"mt-1 font-black text-slate-700",children:e.dateText})]}),(0,t.jsxs)("div",{className:"rounded-2xl bg-[#f6f8ff] p-3",children:[(0,t.jsx)("p",{className:"text-xs font-black uppercase tracking-[0.14em] text-slate-400",children:"Dibuat"}),(0,t.jsx)("p",{className:"mt-1 font-black text-slate-700",children:function(e){if(!e)return"-";let t=new Date(e);return Number.isNaN(t.getTime())?"-":t.toLocaleString("id-ID",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}(e.createdAt)})]})]})]})]}),(0,t.jsxs)("div",{className:"grid gap-2 md:w-fit",children:[b?(0,t.jsxs)("button",{type:"button",onClick:()=>_(e),disabled:O===e.rawId,className:"inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-2xl border border-blue-100 bg-white px-5 text-sm font-black text-[#123c8c] shadow-sm transition hover:bg-[#eaf1ff] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60",children:[O===e.rawId?(0,t.jsx)(f.Loader2,{size:17,className:"animate-spin"}):(0,t.jsx)(n.CheckCircle2,{size:17}),"Tandai Dibaca"]}):null,(0,t.jsxs)(s.default,{href:e.href,className:"inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-2xl bg-[#123c8c] px-5 text-sm font-black text-white shadow-lg shadow-blue-900/20 transition hover:bg-[#0f3274] active:scale-[0.97]",children:[(0,t.jsx)(g.UserRound,{size:17}),"Lihat Detail"]})]})]})},e.id)})})]})]}),(0,t.jsx)(j.default,{variant:"admin"})]})}],19957)}]);