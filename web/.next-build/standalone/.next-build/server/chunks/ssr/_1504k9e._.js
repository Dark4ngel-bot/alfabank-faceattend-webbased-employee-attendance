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
    `})}function l({href:a,label:d,active:e,Icon:f}){return(0,b.jsxs)(c.default,{href:a,"aria-current":e?"page":void 0,className:j("relative flex h-[4.05rem] w-full min-w-0 flex-col items-center justify-center gap-1 rounded-[1.25rem] text-[11px] font-black transition-all duration-300 active:scale-[0.96]",e?"bg-[#123c8c] text-white shadow-xl shadow-blue-900/25":"text-slate-400 hover:bg-[#f6f8ff] hover:text-[#123c8c]"),children:[e?(0,b.jsx)("span",{className:"bottom-nav-active-bar absolute -top-1.5 h-1.5 w-11 rounded-full bg-blue-300"}):null,(0,b.jsx)("div",{className:j("flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition duration-300",e?"bottom-nav-icon-pop bg-white/15":"bg-transparent"),children:(0,b.jsx)(f,{size:24,strokeWidth:e?2.8:2.5,className:j("block shrink-0 transition duration-300",e?"text-white":"text-slate-400")})}),(0,b.jsx)("span",{className:"block max-w-full truncate leading-none",children:d})]})}a.s(["default",0,function({variant:a="employee"}){let c=(0,d.usePathname)();return"admin"===a?null:(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(k,{}),(0,b.jsx)("div",{"aria-hidden":"true",className:"h-[calc(5.8rem+env(safe-area-inset-bottom))] shrink-0 md:hidden"}),(0,b.jsx)("nav",{className:"fixed bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] left-1/2 z-50 w-[calc(100%-2rem)] max-w-[35rem] -translate-x-1/2 md:hidden",children:(0,b.jsx)("div",{className:"bottom-nav-shell-in overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/90 px-2.5 py-2.5 shadow-2xl shadow-slate-400/25 backdrop-blur-2xl",children:(0,b.jsx)("div",{className:"grid w-full grid-cols-4 gap-1.5",children:i.map(a=>{var d;return(0,b.jsx)(l,{href:a.href,label:a.label,Icon:a.icon,active:"/beranda"===(d=a.href)?"/"===c||"/beranda"===c:"/history"===d?"/history"===c||c.startsWith("/history/"):c===d||c.startsWith(`${d}/`)},a.href)})})})})]})}])},33540,a=>{"use strict";let b=(0,a.i(64831).default)("search",[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]]);a.s(["Search",0,b],33540)},20168,a=>{"use strict";let b=(0,a.i(64831).default)("square-pen",[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",key:"1m0v6g"}],["path",{d:"M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",key:"ohrbg2"}]]);a.s(["Edit",0,b],20168)},37779,a=>{"use strict";var b=a.i(87924),c=a.i(72131),d=a.i(20168),e=a.i(75160),f=a.i(33540),g=a.i(74215),h=a.i(38615),i=a.i(33751),j=a.i(89240);let k={tolerance_minutes:"0",status:"active"},l=[{id:"preset-utama",name:"UTAMA",tolerance_minutes:3,status:"active"},{id:"preset-magang",name:"MAGANG",tolerance_minutes:0,status:"active"},{id:"preset-shift-pagi",name:"SHIFT PAGI",tolerance_minutes:5,status:"active"},{id:"preset-shift-siang",name:"SHIFT SIANG",tolerance_minutes:5,status:"active"}],m=[{value:"all",label:"Semua Shift"},{value:"UTAMA",label:"Utama"},{value:"MAGANG",label:"Magang"},{value:"SHIFT PAGI",label:"Shift Pagi"},{value:"SHIFT SIANG",label:"Shift Siang"},{value:"active",label:"Status Aktif"},{value:"inactive",label:"Status Nonaktif"}];function n(a){return"active"===a?"Aktif":"inactive"===a?"Nonaktif":a}async function o(a){let b=await a.text();try{return b?JSON.parse(b):{}}catch{throw Error("Response API bukan JSON.")}}function p(){return(0,b.jsx)("style",{children:`
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
    `})}a.s(["default",0,function(){let[a,q]=(0,c.useState)(l),[r,s]=(0,c.useState)(""),[t,u]=(0,c.useState)("all"),[v,w]=(0,c.useState)(k),[x,y]=(0,c.useState)(!0),[z,A]=(0,c.useState)(!1),[B,C]=(0,c.useState)(""),[D,E]=(0,c.useState)(!1),[F,G]=(0,c.useState)(null);async function H(){try{y(!0),C("");let a=await fetch("/api/admin/shifts",{cache:"no-store"}),b=await o(a);if(!a.ok)throw Error(b.error||b.message||"Gagal mengambil shift.");let c=b.shifts||b.data||[];q(function(a){let b,c=[...a];for(let a of l)c.some(b=>b.name.toLowerCase()===a.name.toLowerCase())||c.push(a);return b=["UTAMA","MAGANG","SHIFT PAGI","SHIFT SIANG"],[...c].sort((a,c)=>{let d=b.indexOf(a.name.toUpperCase()),e=b.indexOf(c.name.toUpperCase());return -1===d&&-1===e?a.name.localeCompare(c.name):-1===d?1:-1===e?-1:d-e})}(c))}catch(a){console.error("LOAD_SHIFTS_ERROR:",a),q(l),C("Data API shift belum terbaca. Menampilkan data default.")}finally{y(!1)}}(0,c.useEffect)(()=>{H()},[]);let I=(0,c.useMemo)(()=>{let b=r.toLowerCase().trim();return a.filter(a=>{let c=a.name.toLowerCase(),d=a.status.toLowerCase();return(!b||!!c.includes(b))&&("active"===t||"inactive"===t?d===t:"all"===t||c===t.toLowerCase())})},[r,t,a]);function J(){G(null),w(k),E(!1)}async function K(a){if(a.preventDefault(),!F)return void alert("Pilih shift yang ingin diedit.");let b=Number(v.tolerance_minutes||0);if(Number.isNaN(b)||b<0)return void alert("Toleransi telat tidak valid.");if(!["active","inactive"].includes(v.status))return void alert("Status shift tidak valid.");if(F.id.startsWith("preset-")){q(a=>a.map(a=>a.id===F.id?{...a,tolerance_minutes:b,status:v.status}:a)),J();return}try{A(!0);let a=await fetch("/api/admin/shifts",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:F.id,tolerance_minutes:b,status:v.status})}),c=await o(a);if(!a.ok)throw Error(c.error||c.message||"Gagal menyimpan shift.");await H(),J()}catch(a){console.error("SAVE_SHIFT_ERROR:",a),alert(a instanceof Error?a.message:"Gagal menyimpan shift.")}finally{A(!1)}}return(0,b.jsxs)(j.default,{variant:"admin",children:[(0,b.jsx)(p,{}),(0,b.jsx)(h.default,{title:"Daftar Shift",variant:"admin"}),(0,b.jsx)("section",{className:"mx-auto max-w-7xl space-y-6 px-5 py-6 pb-28 md:px-10 lg:px-16",children:(0,b.jsxs)("div",{className:"shift-enter rounded-[2rem] border border-white/70 bg-white/95 p-5 shadow-xl shadow-slate-300/30 backdrop-blur-xl md:p-8",children:[(0,b.jsxs)("div",{className:"flex flex-col gap-5 md:flex-row md:items-start md:justify-between",children:[(0,b.jsxs)("div",{children:[(0,b.jsx)("p",{className:"text-xs font-black uppercase tracking-[0.24em] text-[#123c8c]",children:"Presensi Admin Panel"}),(0,b.jsx)("h1",{className:"mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl",children:"DAFTAR SHIFT"})]}),(0,b.jsxs)("div",{className:"shift-row-enter w-full md:w-72",style:{animationDelay:"70ms"},children:[(0,b.jsx)("label",{className:"mb-2 block text-sm font-black text-slate-500",children:"Filter Shift"}),(0,b.jsx)("select",{value:t,onChange:a=>u(a.target.value),className:"shift-field w-full rounded-2xl border border-blue-100 bg-[#f6f8ff] px-4 py-4 text-sm font-black text-slate-700 outline-none transition focus:border-[#123c8c] focus:bg-white focus:ring-4 focus:ring-blue-100",children:m.map(a=>(0,b.jsx)("option",{value:a.value,children:a.label},a.value))})]})]}),(0,b.jsxs)("div",{className:"shift-row-enter mt-8",style:{animationDelay:"110ms"},children:[(0,b.jsx)("label",{className:"text-sm font-black text-slate-500",children:"Nama Shift"}),(0,b.jsx)("div",{className:"mt-3 grid gap-3 md:grid-cols-[1fr_auto]",children:(0,b.jsxs)("div",{className:"relative",children:[(0,b.jsx)(f.Search,{size:20,className:"absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"}),(0,b.jsx)("input",{value:r,onChange:a=>s(a.target.value),placeholder:"Cari nama shift...",className:"shift-field w-full rounded-2xl border border-blue-100 bg-[#f6f8ff] py-4 pl-12 pr-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#123c8c] focus:bg-white focus:ring-4 focus:ring-blue-100"})]})})]}),B?(0,b.jsx)("div",{className:"shift-row-enter mt-5 rounded-2xl border border-amber-100 bg-amber-50 p-4 text-sm font-black text-amber-700",children:B}):null,(0,b.jsxs)("div",{className:"shift-row-enter mt-8 overflow-hidden rounded-2xl border border-blue-100",style:{animationDelay:"150ms"},children:[(0,b.jsxs)("div",{className:"hidden grid-cols-[0.3fr_1.4fr_1fr_1fr_1fr] bg-[#f6f8ff] px-5 py-4 text-xs font-black uppercase tracking-[0.18em] text-[#123c8c] md:grid",children:[(0,b.jsx)("p",{children:"#"}),(0,b.jsx)("p",{children:"Shift"}),(0,b.jsx)("p",{children:"Toleransi Telat"}),(0,b.jsx)("p",{children:"Status"}),(0,b.jsx)("p",{className:"text-center",children:"Aksi"})]}),(0,b.jsx)("div",{className:"divide-y divide-blue-50 bg-white",children:x?(0,b.jsxs)("div",{className:"shift-row-enter px-5 py-10 text-center",children:[(0,b.jsx)(e.Loader2,{className:"mx-auto h-8 w-8 animate-spin text-[#123c8c]"}),(0,b.jsx)("p",{className:"mt-3 text-sm font-black text-slate-600",children:"Mengambil data shift..."})]}):0===I.length?(0,b.jsxs)("div",{className:"shift-row-enter px-5 py-10 text-center",children:[(0,b.jsx)("p",{className:"font-black text-slate-700",children:"Data shift tidak ditemukan."}),(0,b.jsx)("p",{className:"mt-1 text-sm text-slate-400",children:"Coba ubah filter pencarian."})]}):I.map((a,c)=>(0,b.jsxs)("div",{className:"shift-row-enter grid gap-4 px-4 py-4 text-sm transition duration-200 hover:bg-[#f8fbff] md:grid-cols-[0.3fr_1.4fr_1fr_1fr_1fr] md:items-center md:px-5 md:py-6",style:{animationDelay:`${55*c}ms`},children:[(0,b.jsxs)("div",{className:"flex items-start justify-between gap-3 md:block",children:[(0,b.jsxs)("div",{className:"flex items-center gap-3",children:[(0,b.jsx)("div",{className:"flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-[#eaf1ff] text-xs font-black text-[#123c8c] md:h-auto md:w-auto md:bg-transparent md:text-sm md:text-slate-500",children:c+1}),(0,b.jsxs)("div",{className:"md:hidden",children:[(0,b.jsx)("p",{className:"font-black uppercase text-slate-950",children:a.name}),(0,b.jsxs)("p",{className:"mt-1 text-xs font-semibold text-slate-400",children:["Toleransi ",a.tolerance_minutes||0," menit"]})]})]}),(0,b.jsx)("span",{className:`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-black md:hidden ${"active"===a.status?"bg-blue-50 text-[#123c8c]":"bg-slate-100 text-slate-600"}`,children:n(a.status)})]}),(0,b.jsx)("div",{className:"hidden md:block",children:(0,b.jsx)("p",{className:"font-black uppercase text-slate-950",children:a.name})}),(0,b.jsxs)("div",{className:"grid grid-cols-2 gap-3 md:contents",children:[(0,b.jsxs)("div",{className:"rounded-2xl border border-blue-100 bg-[#f8fbff] p-3 md:border-0 md:bg-transparent md:p-0",children:[(0,b.jsx)("p",{className:"text-[11px] font-black uppercase tracking-[0.12em] text-slate-400 md:hidden",children:"Toleransi"}),(0,b.jsxs)("p",{className:"mt-1 font-black text-slate-600 md:mt-0",children:[a.tolerance_minutes||0," Menit"]})]}),(0,b.jsx)("div",{className:"hidden md:block",children:(0,b.jsx)("span",{className:`w-fit rounded-full px-4 py-2 text-xs font-black ${"active"===a.status?"bg-blue-50 text-[#123c8c]":"bg-slate-100 text-slate-600"}`,children:n(a.status)})}),(0,b.jsxs)("div",{className:"rounded-2xl border border-blue-100 bg-[#f8fbff] p-3 md:hidden",children:[(0,b.jsx)("p",{className:"text-[11px] font-black uppercase tracking-[0.12em] text-slate-400",children:"Status"}),(0,b.jsx)("p",{className:`mt-1 font-black ${"active"===a.status?"text-[#123c8c]":"text-slate-600"}`,children:n(a.status)})]})]}),(0,b.jsx)("div",{className:"md:flex md:justify-center",children:(0,b.jsxs)("button",{type:"button",onClick:()=>{G(a),w({tolerance_minutes:String(a.tolerance_minutes||0),status:a.status||"active"}),E(!0)},className:"inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#123c8c] px-4 text-sm font-black text-white shadow-lg shadow-blue-900/20 transition hover:bg-[#0f3274] active:scale-[0.97] md:h-auto md:w-fit md:rounded-xl md:border md:border-blue-100 md:bg-white md:px-4 md:py-2 md:text-xs md:text-[#123c8c] md:shadow-none md:hover:bg-[#eaf1ff]",children:[(0,b.jsx)(d.Edit,{size:16,className:"md:h-3.5 md:w-3.5"}),"Edit Shift"]})})]},a.id))})]})]})}),D&&F?(0,b.jsx)("div",{className:"shift-modal-backdrop fixed inset-0 z-[80] flex items-end justify-center bg-slate-950/50 px-4 pb-4 backdrop-blur-sm md:items-center md:pb-0",children:(0,b.jsxs)("div",{className:"shift-modal-panel max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-[2rem] bg-white p-5 shadow-2xl shadow-slate-950/30 md:p-7",children:[(0,b.jsxs)("div",{className:"flex items-start justify-between gap-4",children:[(0,b.jsxs)("div",{children:[(0,b.jsx)("p",{className:"text-xs font-black uppercase tracking-[0.22em] text-[#123c8c]",children:"Edit Shift"}),(0,b.jsx)("h2",{className:"mt-2 text-2xl font-black text-slate-950",children:"Edit Status & Toleransi"}),(0,b.jsx)("p",{className:"mt-1 text-sm text-slate-500",children:"Nama shift tidak dapat diubah."})]}),(0,b.jsx)("button",{type:"button",onClick:J,className:"flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 transition hover:bg-slate-200 active:scale-[0.96]",children:(0,b.jsx)(g.X,{size:20})})]}),(0,b.jsxs)("form",{onSubmit:K,className:"mt-6 space-y-4",children:[(0,b.jsxs)("div",{className:"shift-row-enter",children:[(0,b.jsx)("label",{className:"mb-2 block text-sm font-black text-slate-700",children:"Nama Shift"}),(0,b.jsx)("div",{className:"rounded-2xl border border-blue-100 bg-[#f6f8ff] px-4 py-3 text-sm font-black uppercase text-slate-700",children:F.name})]}),(0,b.jsxs)("div",{className:"shift-row-enter",style:{animationDelay:"40ms"},children:[(0,b.jsx)("label",{className:"mb-2 block text-sm font-black text-slate-700",children:"Toleransi Telat"}),(0,b.jsx)("input",{type:"number",min:0,value:v.tolerance_minutes,onChange:a=>w(b=>({...b,tolerance_minutes:a.target.value})),placeholder:"0",className:"shift-field w-full rounded-2xl border border-blue-100 bg-[#f6f8ff] px-4 py-3 text-sm font-bold text-slate-700 outline-none transition focus:border-[#123c8c] focus:bg-white focus:ring-4 focus:ring-blue-100"})]}),(0,b.jsxs)("div",{className:"shift-row-enter",style:{animationDelay:"80ms"},children:[(0,b.jsx)("label",{className:"mb-2 block text-sm font-black text-slate-700",children:"Status Shift"}),(0,b.jsxs)("select",{value:v.status,onChange:a=>w(b=>({...b,status:a.target.value})),className:"shift-field w-full rounded-2xl border border-blue-100 bg-[#f6f8ff] px-4 py-3 text-sm font-bold text-slate-700 outline-none transition focus:border-[#123c8c] focus:bg-white focus:ring-4 focus:ring-blue-100",children:[(0,b.jsx)("option",{value:"active",children:"Aktif"}),(0,b.jsx)("option",{value:"inactive",children:"Nonaktif"})]}),(0,b.jsx)("p",{className:"mt-2 text-xs font-semibold text-slate-400",children:"Pilih Nonaktif jika shift tidak ingin digunakan sementara."})]}),(0,b.jsxs)("div",{className:"shift-row-enter flex flex-col-reverse gap-3 pt-2 md:flex-row md:justify-end",style:{animationDelay:"120ms"},children:[(0,b.jsx)("button",{type:"button",onClick:J,className:"rounded-2xl bg-slate-100 px-5 py-3 text-sm font-black text-slate-600 transition hover:bg-slate-200 active:scale-[0.98]",children:"Batal"}),(0,b.jsx)("button",{type:"submit",disabled:z,className:"rounded-2xl bg-[#123c8c] px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-900/20 transition hover:bg-[#0f3274] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60",children:z?"Menyimpan...":"Update Shift"})]})]})]})}):null,(0,b.jsx)(i.default,{variant:"admin"})]})}])}];

//# sourceMappingURL=_1504k9e._.js.map