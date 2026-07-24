module.exports=[8706,a=>{"use strict";var b=a.i(87924),c=a.i(72131),d=a.i(38246),e=a.i(83900),f=a.i(12087),g=a.i(46891),h=a.i(13412),i=a.i(70115),j=a.i(64831);let k=(0,j.default)("file-clock",[["path",{d:"M16 22h2a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v2.85",key:"ryk6xj"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M8 14v2.2l1.6 1",key:"6m4bie"}],["circle",{cx:"8",cy:"16",r:"6",key:"10v15b"}]]),l=(0,j.default)("heart-pulse",[["path",{d:"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",key:"mvr1a0"}],["path",{d:"M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27",key:"auskq0"}]]);var m=a.i(55486),n=a.i(75160),o=a.i(54098),p=a.i(19783),q=a.i(33540);let r=(0,j.default)("shield-alert",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"M12 8v4",key:"1got3b"}],["path",{d:"M12 16h.01",key:"1drbdi"}]]);var s=a.i(87005),t=a.i(38615),u=a.i(33751),v=a.i(89240);let w={total:0,unread:0,pending:0,sick:0,leave:0,permission:0,wfh:0,wfc:0,visit:0},x=[{value:"all",label:"Semua Jenis"},{value:"sick",label:"Sakit"},{value:"leave",label:"Cuti"},{value:"permission",label:"Izin"},{value:"wfh",label:"WFH"},{value:"wfc",label:"WFC"},{value:"visit",label:"Kunjungan"}],y=[{value:"all",label:"Semua Status"},{value:"unread",label:"Belum Dibaca"},{value:"read",label:"Dibaca"},{value:"pending",label:"Menunggu"},{value:"approved",label:"Disetujui"},{value:"rejected",label:"Ditolak"}];function z(a){return"sick"===a?"Sakit":"leave"===a?"Cuti":"permission"===a?"Izin":"wfh"===a?"WFH":"wfc"===a?"WFC":"visit"===a?"Kunjungan":a}function A(a){return"sick"===a?"bg-red-50 text-red-600 border-red-100":"leave"===a?"bg-blue-50 text-[#123c8c] border-blue-100":"permission"===a?"bg-amber-50 text-amber-700 border-amber-100":"wfh"===a?"bg-emerald-50 text-emerald-700 border-emerald-100":"wfc"===a?"bg-purple-50 text-purple-700 border-purple-100":"visit"===a?"bg-orange-50 text-orange-700 border-orange-100":"bg-slate-50 text-slate-600 border-slate-100"}async function B(a){let b=await a.text();try{return b?JSON.parse(b):{}}catch{throw Error("Response API bukan JSON.")}}function C(){return(0,b.jsx)("style",{children:`
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
    `})}a.s(["default",0,function(){let[a,j]=(0,c.useState)([]),[D,E]=(0,c.useState)(w),[F,G]=(0,c.useState)(""),[H,I]=(0,c.useState)("all"),[J,K]=(0,c.useState)("all"),[L,M]=(0,c.useState)(!0),[N,O]=(0,c.useState)(""),[P,Q]=(0,c.useState)("");async function R(){try{M(!0),Q("");let a=await fetch("/api/admin/notifications",{cache:"no-store"}),b=await B(a);if(!a.ok)throw Error(b.message||"Gagal mengambil notifikasi.");j(b.notifications||[]),E(b.stats||w)}catch(a){console.error("LOAD_NOTIFICATIONS_ERROR:",a),Q(a instanceof Error?a.message:"Terjadi kesalahan saat mengambil notifikasi.")}finally{M(!1)}}async function S(a){if("AdminNotification"===a.source)try{O(a.rawId);let b=await fetch("/api/admin/notifications",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:a.rawId})}),c=await B(b);if(!b.ok)throw Error(c.message||"Gagal menandai notifikasi.");await R()}catch(a){console.error("MARK_NOTIFICATION_ERROR:",a),alert(a instanceof Error?a.message:"Gagal menandai notifikasi sudah dibaca.")}finally{O("")}}(0,c.useEffect)(()=>{R()},[]);let T=(0,c.useMemo)(()=>{let b=F.toLowerCase().trim();return a.filter(a=>{let c=`
        ${a.title}
        ${a.message}
        ${a.employeeName}
        ${a.employeeEmail}
        ${a.status}
        ${a.statusText}
        ${z(a.type)}
        ${a.dateText}
      `.toLowerCase(),d=!b||c.includes(b),e="all"===H||a.type===H,f="all"===J||a.status===J;return d&&e&&f})},[a,F,H,J]),U=[{label:"Total Notifikasi",value:D.total,icon:e.Bell,description:"Semua laporan masuk"},{label:"Belum Dibaca",value:D.unread,icon:i.Clock3,description:"Dari AdminNotification"},{label:"Cuti / Sakit / Izin",value:D.leave+D.sick+D.permission,icon:k,description:"Dari CutiPengajuan"},{label:"WFH / WFC / Kunjungan",value:D.wfh+D.wfc+D.visit,icon:o.MapPin,description:"Dari AdminNotification"}];return(0,b.jsxs)(v.default,{variant:"admin",children:[(0,b.jsx)(C,{}),(0,b.jsx)(t.default,{title:"Notifikasi",variant:"admin"}),(0,b.jsxs)("main",{className:"mx-auto max-w-7xl space-y-6 px-5 py-6 pb-28 md:px-10 lg:px-16",children:[(0,b.jsxs)("section",{className:"notification-enter relative overflow-hidden rounded-[2.2rem] bg-[#123c8c] p-6 text-white shadow-2xl shadow-blue-900/25 md:p-8",children:[(0,b.jsx)("div",{className:"absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"}),(0,b.jsx)("div",{className:"absolute -bottom-24 left-16 h-64 w-64 rounded-full bg-blue-300/20 blur-3xl"}),(0,b.jsxs)("div",{className:"relative z-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between",children:[(0,b.jsxs)("div",{children:[(0,b.jsxs)("div",{className:"inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-blue-100",children:[(0,b.jsx)(r,{size:15}),"Notification Center"]}),(0,b.jsx)("h1",{className:"mt-5 text-3xl font-black tracking-tight md:text-4xl",children:"Pusat Notifikasi"})]}),(0,b.jsxs)("button",{type:"button",onClick:R,className:"inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-white px-5 text-sm font-black text-[#123c8c] shadow-lg shadow-blue-950/20 transition hover:-translate-y-0.5 hover:bg-blue-50 active:scale-[0.98]",children:[(0,b.jsx)(p.RefreshCw,{size:18}),"Refresh"]})]})]}),(0,b.jsx)("section",{className:"grid gap-4 md:grid-cols-4",children:U.map((a,c)=>{let d=a.icon;return(0,b.jsx)("div",{className:"notification-row-enter rounded-[1.7rem] border border-blue-100 bg-white/90 p-5 shadow-xl shadow-slate-300/30 transition duration-200 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-slate-300/40",style:{animationDelay:`${70*c}ms`},children:(0,b.jsxs)("div",{className:"flex items-start justify-between gap-3",children:[(0,b.jsxs)("div",{children:[(0,b.jsx)("p",{className:"text-sm font-bold text-slate-500",children:a.label}),(0,b.jsx)("h3",{className:"mt-2 text-3xl font-black text-slate-950",children:L?"-":a.value}),(0,b.jsx)("p",{className:"mt-1 text-xs font-semibold text-slate-400",children:a.description})]}),(0,b.jsx)("div",{className:"notification-icon-pop flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#eaf1ff] text-[#123c8c]",children:(0,b.jsx)(d,{size:24,strokeWidth:2.7})})]})},a.label)})}),(0,b.jsxs)("section",{className:"notification-enter rounded-[2rem] border border-white/70 bg-white/90 p-5 shadow-xl shadow-slate-300/30 backdrop-blur-xl md:p-6",style:{animationDelay:"100ms"},children:[(0,b.jsxs)("div",{className:"grid gap-4 lg:grid-cols-[1fr_220px_220px_auto]",children:[(0,b.jsxs)("div",{children:[(0,b.jsx)("label",{className:"text-sm font-black text-slate-500",children:"Cari Notifikasi"}),(0,b.jsxs)("div",{className:"relative mt-3",children:[(0,b.jsx)(q.Search,{size:20,className:"absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"}),(0,b.jsx)("input",{value:F,onChange:a=>G(a.target.value),placeholder:"Cari nama, laporan, status, atau keterangan...",className:"notification-field h-[58px] w-full rounded-2xl border border-blue-100 bg-[#f6f8ff] pl-12 pr-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#123c8c] focus:bg-white focus:ring-4 focus:ring-blue-100"})]})]}),(0,b.jsxs)("div",{children:[(0,b.jsx)("label",{className:"text-sm font-black text-slate-500",children:"Jenis Laporan"}),(0,b.jsx)("select",{value:H,onChange:a=>I(a.target.value),className:"notification-field mt-3 h-[58px] w-full rounded-2xl border border-blue-100 bg-[#f6f8ff] px-4 text-sm font-black text-slate-700 outline-none transition focus:border-[#123c8c] focus:bg-white focus:ring-4 focus:ring-blue-100",children:x.map(a=>(0,b.jsx)("option",{value:a.value,children:a.label},a.value))})]}),(0,b.jsxs)("div",{children:[(0,b.jsx)("label",{className:"text-sm font-black text-slate-500",children:"Status"}),(0,b.jsx)("select",{value:J,onChange:a=>K(a.target.value),className:"notification-field mt-3 h-[58px] w-full rounded-2xl border border-blue-100 bg-[#f6f8ff] px-4 text-sm font-black text-slate-700 outline-none transition focus:border-[#123c8c] focus:bg-white focus:ring-4 focus:ring-blue-100",children:y.map(a=>(0,b.jsx)("option",{value:a.value,children:a.label},a.value))})]}),(0,b.jsx)("div",{className:"flex items-end",children:(0,b.jsx)("button",{type:"button",onClick:()=>{G(""),I("all"),K("all")},className:"flex h-[58px] w-full items-center justify-center rounded-2xl border border-blue-100 bg-white px-5 text-sm font-black text-[#123c8c] shadow-sm transition hover:bg-blue-50 active:scale-[0.96] lg:w-auto",children:"Atur Ulang"})})]}),P?(0,b.jsx)("div",{className:"notification-row-enter mt-5 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-black text-red-700",children:P}):null,(0,b.jsx)("div",{className:"mt-6 space-y-4",children:L?(0,b.jsxs)("div",{className:"notification-row-enter flex items-center justify-center gap-3 rounded-3xl border border-blue-100 bg-[#f8fbff] p-10 text-sm font-black text-slate-600",children:[(0,b.jsx)(n.Loader2,{className:"animate-spin text-[#123c8c]",size:22}),"Mengambil data notifikasi..."]}):0===T.length?(0,b.jsxs)("div",{className:"notification-row-enter rounded-3xl border border-blue-100 bg-[#f8fbff] p-10 text-center",children:[(0,b.jsx)(e.Bell,{className:"mx-auto text-slate-300",size:42}),(0,b.jsx)("p",{className:"mt-3 text-lg font-black text-slate-700",children:"Tidak ada notifikasi"}),(0,b.jsx)("p",{className:"mt-1 text-sm text-slate-400",children:"Belum ada laporan yang sesuai dengan filter."})]}):T.map((a,c)=>{var i;let j,p="sick"===(i=a.type)?l:"leave"===i?g.CalendarClock:"permission"===i?k:"wfh"===i?m.Home:"wfc"===i?f.BriefcaseBusiness:"visit"===i?o.MapPin:e.Bell,q="AdminNotification"===a.source&&"unread"===a.status;return(0,b.jsx)("div",{className:"notification-row-enter rounded-[1.7rem] border border-blue-100 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-200/70",style:{animationDelay:`${55*c}ms`},children:(0,b.jsxs)("div",{className:"flex flex-col gap-4 md:flex-row md:items-start md:justify-between",children:[(0,b.jsxs)("div",{className:"flex gap-4",children:[(0,b.jsx)("div",{className:`notification-icon-pop flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border ${A(a.type)}`,children:(0,b.jsx)(p,{size:25,strokeWidth:2.8})}),(0,b.jsxs)("div",{className:"min-w-0",children:[(0,b.jsxs)("div",{className:"flex flex-wrap items-center gap-2",children:[(0,b.jsx)("span",{className:`rounded-full border px-3 py-1 text-xs font-black ${A(a.type)}`,children:z(a.type)}),(0,b.jsx)("span",{className:`rounded-full px-3 py-1 text-xs font-black ${"unread"===(j=a.status.toLowerCase())?"bg-orange-50 text-orange-700":"read"===j?"bg-slate-100 text-slate-600":"pending"===j?"bg-amber-50 text-amber-700":"approved"===j?"bg-emerald-50 text-emerald-700":"rejected"===j?"bg-red-50 text-red-600":"bg-slate-100 text-slate-600"}`,children:a.statusText}),(0,b.jsx)("span",{className:"rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-500",children:a.source})]}),(0,b.jsx)("h3",{className:"mt-3 text-lg font-black text-slate-950",children:a.title}),(0,b.jsx)("p",{className:"mt-2 text-sm font-semibold leading-6 text-slate-600",children:a.message}),(0,b.jsxs)("div",{className:"mt-4 grid gap-2 text-sm md:grid-cols-3",children:[(0,b.jsxs)("div",{className:"rounded-2xl bg-[#f6f8ff] p-3",children:[(0,b.jsx)("p",{className:"text-xs font-black uppercase tracking-[0.14em] text-slate-400",children:"Karyawan"}),(0,b.jsx)("p",{className:"mt-1 font-black text-slate-700",children:a.employeeName}),(0,b.jsx)("p",{className:"mt-1 truncate text-xs font-semibold text-slate-400",children:a.employeeEmail})]}),(0,b.jsxs)("div",{className:"rounded-2xl bg-[#f6f8ff] p-3",children:[(0,b.jsx)("p",{className:"text-xs font-black uppercase tracking-[0.14em] text-slate-400",children:"Tanggal"}),(0,b.jsx)("p",{className:"mt-1 font-black text-slate-700",children:a.dateText})]}),(0,b.jsxs)("div",{className:"rounded-2xl bg-[#f6f8ff] p-3",children:[(0,b.jsx)("p",{className:"text-xs font-black uppercase tracking-[0.14em] text-slate-400",children:"Dibuat"}),(0,b.jsx)("p",{className:"mt-1 font-black text-slate-700",children:function(a){if(!a)return"-";let b=new Date(a);return Number.isNaN(b.getTime())?"-":b.toLocaleString("id-ID",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}(a.createdAt)})]})]})]})]}),(0,b.jsxs)("div",{className:"grid gap-2 md:w-fit",children:[q?(0,b.jsxs)("button",{type:"button",onClick:()=>S(a),disabled:N===a.rawId,className:"inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-2xl border border-blue-100 bg-white px-5 text-sm font-black text-[#123c8c] shadow-sm transition hover:bg-[#eaf1ff] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60",children:[N===a.rawId?(0,b.jsx)(n.Loader2,{size:17,className:"animate-spin"}):(0,b.jsx)(h.CheckCircle2,{size:17}),"Tandai Dibaca"]}):null,(0,b.jsxs)(d.default,{href:a.href,className:"inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-2xl bg-[#123c8c] px-5 text-sm font-black text-white shadow-lg shadow-blue-900/20 transition hover:bg-[#0f3274] active:scale-[0.97]",children:[(0,b.jsx)(s.UserRound,{size:17}),"Lihat Detail"]})]})]})},a.id)})})]})]}),(0,b.jsx)(u.default,{variant:"admin"})]})}],8706)}];

//# sourceMappingURL=src_app_admin_notifikasi_page_tsx_1y4hsyg._.js.map