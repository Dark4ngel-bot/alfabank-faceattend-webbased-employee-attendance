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
    `})}function m({href:e,label:s,active:i,Icon:l}){return(0,t.jsxs)(a.default,{href:e,"aria-current":i?"page":void 0,className:c("relative flex h-[4.05rem] w-full min-w-0 flex-col items-center justify-center gap-1 rounded-[1.25rem] text-[11px] font-black transition-all duration-300 active:scale-[0.96]",i?"bg-[#123c8c] text-white shadow-xl shadow-blue-900/25":"text-slate-400 hover:bg-[#f6f8ff] hover:text-[#123c8c]"),children:[i?(0,t.jsx)("span",{className:"bottom-nav-active-bar absolute -top-1.5 h-1.5 w-11 rounded-full bg-blue-300"}):null,(0,t.jsx)("div",{className:c("flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition duration-300",i?"bottom-nav-icon-pop bg-white/15":"bg-transparent"),children:(0,t.jsx)(l,{size:24,strokeWidth:i?2.8:2.5,className:c("block shrink-0 transition duration-300",i?"text-white":"text-slate-400")})}),(0,t.jsx)("span",{className:"block max-w-full truncate leading-none",children:s})]})}e.s(["default",0,function({variant:e="employee"}){let a=(0,s.usePathname)();return"admin"===e?null:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(d,{}),(0,t.jsx)("div",{"aria-hidden":"true",className:"h-[calc(5.8rem+env(safe-area-inset-bottom))] shrink-0 md:hidden"}),(0,t.jsx)("nav",{className:"fixed bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] left-1/2 z-50 w-[calc(100%-2rem)] max-w-[35rem] -translate-x-1/2 md:hidden",children:(0,t.jsx)("div",{className:"bottom-nav-shell-in overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/90 px-2.5 py-2.5 shadow-2xl shadow-slate-400/25 backdrop-blur-2xl",children:(0,t.jsx)("div",{className:"grid w-full grid-cols-4 gap-1.5",children:o.map(e=>{var s;return(0,t.jsx)(m,{href:e.href,label:e.label,Icon:e.icon,active:"/beranda"===(s=e.href)?"/"===a||"/beranda"===a:"/history"===s?"/history"===a||a.startsWith("/history/"):a===s||a.startsWith(`${s}/`)},e.href)})})})})]})}])},66595,e=>{"use strict";let t=(0,e.i(56420).default)("search",[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]]);e.s(["Search",0,t],66595)},26441,e=>{"use strict";let t=(0,e.i(56420).default)("square-pen",[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",key:"1m0v6g"}],["path",{d:"M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",key:"ohrbg2"}]]);e.s(["Edit",0,t],26441)},72458,e=>{"use strict";var t=e.i(43476),a=e.i(71645),s=e.i(26441),i=e.i(32781),l=e.i(66595),r=e.i(63676),n=e.i(26564),o=e.i(84276),c=e.i(89168);let d={tolerance_minutes:"0",status:"active"},m=[{id:"preset-utama",name:"UTAMA",tolerance_minutes:3,status:"active"},{id:"preset-magang",name:"MAGANG",tolerance_minutes:0,status:"active"},{id:"preset-shift-pagi",name:"SHIFT PAGI",tolerance_minutes:5,status:"active"},{id:"preset-shift-siang",name:"SHIFT SIANG",tolerance_minutes:5,status:"active"}],f=[{value:"all",label:"Semua Shift"},{value:"UTAMA",label:"Utama"},{value:"MAGANG",label:"Magang"},{value:"SHIFT PAGI",label:"Shift Pagi"},{value:"SHIFT SIANG",label:"Shift Siang"},{value:"active",label:"Status Aktif"},{value:"inactive",label:"Status Nonaktif"}];function u(e){return"active"===e?"Aktif":"inactive"===e?"Nonaktif":e}async function h(e){let t=await e.text();try{return t?JSON.parse(t):{}}catch{throw Error("Response API bukan JSON.")}}function x(){return(0,t.jsx)("style",{children:`
      @keyframes shiftEnter {
        0% {
          opacity: 0;
          transform: translateY(14px);
        }

        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes shiftRowEnter {
        0% {
          opacity: 0;
          transform: translateY(10px);
        }

        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes shiftModalBackdrop {
        0% {
          opacity: 0;
        }

        100% {
          opacity: 1;
        }
      }

      @keyframes shiftModalPanel {
        0% {
          opacity: 0;
          transform: translateY(16px) scale(0.985);
        }

        100% {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      .shift-enter {
        animation: shiftEnter 320ms ease-out both;
      }

      .shift-row-enter {
        opacity: 0;
        animation: shiftRowEnter 300ms ease-out both;
      }

      .shift-modal-backdrop {
        animation: shiftModalBackdrop 180ms ease-out both;
      }

      .shift-modal-panel {
        animation: shiftModalPanel 260ms ease-out both;
        transform-origin: center bottom;
      }

      .shift-field {
        transition:
          border-color 180ms ease,
          background-color 180ms ease,
          box-shadow 180ms ease;
      }

      @media (prefers-reduced-motion: reduce) {
        .shift-enter,
        .shift-row-enter,
        .shift-modal-backdrop,
        .shift-modal-panel {
          animation: none !important;
          opacity: 1 !important;
          transform: none !important;
        }
      }
    `})}e.s(["default",0,function(){let[e,b]=(0,a.useState)(m),[p,v]=(0,a.useState)(""),[g,j]=(0,a.useState)("all"),[y,N]=(0,a.useState)(d),[k,w]=(0,a.useState)(!0),[S,A]=(0,a.useState)(!1),[T,_]=(0,a.useState)(""),[C,I]=(0,a.useState)(!1),[P,M]=(0,a.useState)(null);async function E(){try{w(!0),_("");let e=await fetch("/api/admin/shifts",{cache:"no-store"}),t=await h(e);if(!e.ok)throw Error(t.error||t.message||"Gagal mengambil shift.");let a=t.shifts||t.data||[];b(function(e){let t,a=[...e];for(let e of m)a.some(t=>t.name.toLowerCase()===e.name.toLowerCase())||a.push(e);return t=["UTAMA","MAGANG","SHIFT PAGI","SHIFT SIANG"],[...a].sort((e,a)=>{let s=t.indexOf(e.name.toUpperCase()),i=t.indexOf(a.name.toUpperCase());return -1===s&&-1===i?e.name.localeCompare(a.name):-1===s?1:-1===i?-1:s-i})}(a))}catch(e){console.error("LOAD_SHIFTS_ERROR:",e),b(m),_("Data API shift belum terbaca. Menampilkan data default.")}finally{w(!1)}}(0,a.useEffect)(()=>{E()},[]);let G=(0,a.useMemo)(()=>{let t=p.toLowerCase().trim();return e.filter(e=>{let a=e.name.toLowerCase(),s=e.status.toLowerCase();return(!t||!!a.includes(t))&&("active"===g||"inactive"===g?s===g:"all"===g||a===g.toLowerCase())})},[p,g,e]);function R(){M(null),N(d),I(!1)}async function D(e){if(e.preventDefault(),!P)return void alert("Pilih shift yang ingin diedit.");let t=Number(y.tolerance_minutes||0);if(Number.isNaN(t)||t<0)return void alert("Toleransi telat tidak valid.");if(!["active","inactive"].includes(y.status))return void alert("Status shift tidak valid.");if(P.id.startsWith("preset-")){b(e=>e.map(e=>e.id===P.id?{...e,tolerance_minutes:t,status:y.status}:e)),R();return}try{A(!0);let e=await fetch("/api/admin/shifts",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:P.id,tolerance_minutes:t,status:y.status})}),a=await h(e);if(!e.ok)throw Error(a.error||a.message||"Gagal menyimpan shift.");await E(),R()}catch(e){console.error("SAVE_SHIFT_ERROR:",e),alert(e instanceof Error?e.message:"Gagal menyimpan shift.")}finally{A(!1)}}return(0,t.jsxs)(c.default,{variant:"admin",children:[(0,t.jsx)(x,{}),(0,t.jsx)(n.default,{title:"Daftar Shift",variant:"admin"}),(0,t.jsx)("section",{className:"mx-auto max-w-7xl space-y-6 px-5 py-6 pb-28 md:px-10 lg:px-16",children:(0,t.jsxs)("div",{className:"shift-enter rounded-[2rem] border border-white/70 bg-white/95 p-5 shadow-xl shadow-slate-300/30 backdrop-blur-xl md:p-8",children:[(0,t.jsxs)("div",{className:"flex flex-col gap-5 md:flex-row md:items-start md:justify-between",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-xs font-black uppercase tracking-[0.24em] text-[#123c8c]",children:"Presensi Admin Panel"}),(0,t.jsx)("h1",{className:"mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl",children:"DAFTAR SHIFT"})]}),(0,t.jsxs)("div",{className:"shift-row-enter w-full md:w-72",style:{animationDelay:"70ms"},children:[(0,t.jsx)("label",{className:"mb-2 block text-sm font-black text-slate-500",children:"Filter Shift"}),(0,t.jsx)("select",{value:g,onChange:e=>j(e.target.value),className:"shift-field w-full rounded-2xl border border-blue-100 bg-[#f6f8ff] px-4 py-4 text-sm font-black text-slate-700 outline-none transition focus:border-[#123c8c] focus:bg-white focus:ring-4 focus:ring-blue-100",children:f.map(e=>(0,t.jsx)("option",{value:e.value,children:e.label},e.value))})]})]}),(0,t.jsxs)("div",{className:"shift-row-enter mt-8",style:{animationDelay:"110ms"},children:[(0,t.jsx)("label",{className:"text-sm font-black text-slate-500",children:"Nama Shift"}),(0,t.jsx)("div",{className:"mt-3 grid gap-3 md:grid-cols-[1fr_auto]",children:(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsx)(l.Search,{size:20,className:"absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"}),(0,t.jsx)("input",{value:p,onChange:e=>v(e.target.value),placeholder:"Cari nama shift...",className:"shift-field w-full rounded-2xl border border-blue-100 bg-[#f6f8ff] py-4 pl-12 pr-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#123c8c] focus:bg-white focus:ring-4 focus:ring-blue-100"})]})})]}),T?(0,t.jsx)("div",{className:"shift-row-enter mt-5 rounded-2xl border border-amber-100 bg-amber-50 p-4 text-sm font-black text-amber-700",children:T}):null,(0,t.jsxs)("div",{className:"shift-row-enter mt-8 overflow-hidden rounded-2xl border border-blue-100",style:{animationDelay:"150ms"},children:[(0,t.jsxs)("div",{className:"hidden grid-cols-[0.3fr_1.4fr_1fr_1fr_1fr] bg-[#f6f8ff] px-5 py-4 text-xs font-black uppercase tracking-[0.18em] text-[#123c8c] md:grid",children:[(0,t.jsx)("p",{children:"#"}),(0,t.jsx)("p",{children:"Shift"}),(0,t.jsx)("p",{children:"Toleransi Telat"}),(0,t.jsx)("p",{children:"Status"}),(0,t.jsx)("p",{className:"text-center",children:"Aksi"})]}),(0,t.jsx)("div",{className:"divide-y divide-blue-50 bg-white",children:k?(0,t.jsxs)("div",{className:"shift-row-enter px-5 py-10 text-center",children:[(0,t.jsx)(i.Loader2,{className:"mx-auto h-8 w-8 animate-spin text-[#123c8c]"}),(0,t.jsx)("p",{className:"mt-3 text-sm font-black text-slate-600",children:"Mengambil data shift..."})]}):0===G.length?(0,t.jsxs)("div",{className:"shift-row-enter px-5 py-10 text-center",children:[(0,t.jsx)("p",{className:"font-black text-slate-700",children:"Data shift tidak ditemukan."}),(0,t.jsx)("p",{className:"mt-1 text-sm text-slate-400",children:"Coba ubah filter pencarian."})]}):G.map((e,a)=>(0,t.jsxs)("div",{className:"shift-row-enter grid gap-4 px-4 py-4 text-sm transition duration-200 hover:bg-[#f8fbff] md:grid-cols-[0.3fr_1.4fr_1fr_1fr_1fr] md:items-center md:px-5 md:py-6",style:{animationDelay:`${55*a}ms`},children:[(0,t.jsxs)("div",{className:"flex items-start justify-between gap-3 md:block",children:[(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsx)("div",{className:"flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-[#eaf1ff] text-xs font-black text-[#123c8c] md:h-auto md:w-auto md:bg-transparent md:text-sm md:text-slate-500",children:a+1}),(0,t.jsxs)("div",{className:"md:hidden",children:[(0,t.jsx)("p",{className:"font-black uppercase text-slate-950",children:e.name}),(0,t.jsxs)("p",{className:"mt-1 text-xs font-semibold text-slate-400",children:["Toleransi ",e.tolerance_minutes||0," menit"]})]})]}),(0,t.jsx)("span",{className:`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-black md:hidden ${"active"===e.status?"bg-blue-50 text-[#123c8c]":"bg-slate-100 text-slate-600"}`,children:u(e.status)})]}),(0,t.jsx)("div",{className:"hidden md:block",children:(0,t.jsx)("p",{className:"font-black uppercase text-slate-950",children:e.name})}),(0,t.jsxs)("div",{className:"grid grid-cols-2 gap-3 md:contents",children:[(0,t.jsxs)("div",{className:"rounded-2xl border border-blue-100 bg-[#f8fbff] p-3 md:border-0 md:bg-transparent md:p-0",children:[(0,t.jsx)("p",{className:"text-[11px] font-black uppercase tracking-[0.12em] text-slate-400 md:hidden",children:"Toleransi"}),(0,t.jsxs)("p",{className:"mt-1 font-black text-slate-600 md:mt-0",children:[e.tolerance_minutes||0," Menit"]})]}),(0,t.jsx)("div",{className:"hidden md:block",children:(0,t.jsx)("span",{className:`w-fit rounded-full px-4 py-2 text-xs font-black ${"active"===e.status?"bg-blue-50 text-[#123c8c]":"bg-slate-100 text-slate-600"}`,children:u(e.status)})}),(0,t.jsxs)("div",{className:"rounded-2xl border border-blue-100 bg-[#f8fbff] p-3 md:hidden",children:[(0,t.jsx)("p",{className:"text-[11px] font-black uppercase tracking-[0.12em] text-slate-400",children:"Status"}),(0,t.jsx)("p",{className:`mt-1 font-black ${"active"===e.status?"text-[#123c8c]":"text-slate-600"}`,children:u(e.status)})]})]}),(0,t.jsx)("div",{className:"md:flex md:justify-center",children:(0,t.jsxs)("button",{type:"button",onClick:()=>{M(e),N({tolerance_minutes:String(e.tolerance_minutes||0),status:e.status||"active"}),I(!0)},className:"inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#123c8c] px-4 text-sm font-black text-white shadow-lg shadow-blue-900/20 transition hover:bg-[#0f3274] active:scale-[0.97] md:h-auto md:w-fit md:rounded-xl md:border md:border-blue-100 md:bg-white md:px-4 md:py-2 md:text-xs md:text-[#123c8c] md:shadow-none md:hover:bg-[#eaf1ff]",children:[(0,t.jsx)(s.Edit,{size:16,className:"md:h-3.5 md:w-3.5"}),"Edit Shift"]})})]},e.id))})]})]})}),C&&P?(0,t.jsx)("div",{className:"shift-modal-backdrop fixed inset-0 z-[80] flex items-end justify-center bg-slate-950/50 px-4 pb-4 backdrop-blur-sm md:items-center md:pb-0",children:(0,t.jsxs)("div",{className:"shift-modal-panel max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-[2rem] bg-white p-5 shadow-2xl shadow-slate-950/30 md:p-7",children:[(0,t.jsxs)("div",{className:"flex items-start justify-between gap-4",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-xs font-black uppercase tracking-[0.22em] text-[#123c8c]",children:"Edit Shift"}),(0,t.jsx)("h2",{className:"mt-2 text-2xl font-black text-slate-950",children:"Edit Status & Toleransi"}),(0,t.jsx)("p",{className:"mt-1 text-sm text-slate-500",children:"Nama shift tidak dapat diubah."})]}),(0,t.jsx)("button",{type:"button",onClick:R,className:"flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 transition hover:bg-slate-200 active:scale-[0.96]",children:(0,t.jsx)(r.X,{size:20})})]}),(0,t.jsxs)("form",{onSubmit:D,className:"mt-6 space-y-4",children:[(0,t.jsxs)("div",{className:"shift-row-enter",children:[(0,t.jsx)("label",{className:"mb-2 block text-sm font-black text-slate-700",children:"Nama Shift"}),(0,t.jsx)("div",{className:"rounded-2xl border border-blue-100 bg-[#f6f8ff] px-4 py-3 text-sm font-black uppercase text-slate-700",children:P.name})]}),(0,t.jsxs)("div",{className:"shift-row-enter",style:{animationDelay:"40ms"},children:[(0,t.jsx)("label",{className:"mb-2 block text-sm font-black text-slate-700",children:"Toleransi Telat"}),(0,t.jsx)("input",{type:"number",min:0,value:y.tolerance_minutes,onChange:e=>N(t=>({...t,tolerance_minutes:e.target.value})),placeholder:"0",className:"shift-field w-full rounded-2xl border border-blue-100 bg-[#f6f8ff] px-4 py-3 text-sm font-bold text-slate-700 outline-none transition focus:border-[#123c8c] focus:bg-white focus:ring-4 focus:ring-blue-100"})]}),(0,t.jsxs)("div",{className:"shift-row-enter",style:{animationDelay:"80ms"},children:[(0,t.jsx)("label",{className:"mb-2 block text-sm font-black text-slate-700",children:"Status Shift"}),(0,t.jsxs)("select",{value:y.status,onChange:e=>N(t=>({...t,status:e.target.value})),className:"shift-field w-full rounded-2xl border border-blue-100 bg-[#f6f8ff] px-4 py-3 text-sm font-bold text-slate-700 outline-none transition focus:border-[#123c8c] focus:bg-white focus:ring-4 focus:ring-blue-100",children:[(0,t.jsx)("option",{value:"active",children:"Aktif"}),(0,t.jsx)("option",{value:"inactive",children:"Nonaktif"})]}),(0,t.jsx)("p",{className:"mt-2 text-xs font-semibold text-slate-400",children:"Pilih Nonaktif jika shift tidak ingin digunakan sementara."})]}),(0,t.jsxs)("div",{className:"shift-row-enter flex flex-col-reverse gap-3 pt-2 md:flex-row md:justify-end",style:{animationDelay:"120ms"},children:[(0,t.jsx)("button",{type:"button",onClick:R,className:"rounded-2xl bg-slate-100 px-5 py-3 text-sm font-black text-slate-600 transition hover:bg-slate-200 active:scale-[0.98]",children:"Batal"}),(0,t.jsx)("button",{type:"submit",disabled:S,className:"rounded-2xl bg-[#123c8c] px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-900/20 transition hover:bg-[#0f3274] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60",children:S?"Menyimpan...":"Update Shift"})]})]})]})}):null,(0,t.jsx)(o.default,{variant:"admin"})]})}])}]);