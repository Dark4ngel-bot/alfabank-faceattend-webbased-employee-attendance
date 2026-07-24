(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,32781,e=>{"use strict";let a=(0,e.i(56420).default)("loader-circle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);e.s(["Loader2",0,a],32781)},84276,e=>{"use strict";var a=e.i(43476),t=e.i(22016),s=e.i(18566),n=e.i(75153),i=e.i(94004),l=e.i(49817),r=e.i(65649);let o=[{href:"/beranda",label:"Beranda",icon:l.Home},{href:"/presensi",label:"Presensi",icon:n.CalendarCheck},{href:"/history",label:"Riwayat",icon:i.History},{href:"/profil",label:"Profil",icon:r.UserRound}];function d(...e){return e.filter(Boolean).join(" ")}function c(){return(0,a.jsx)("style",{children:`
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
    `})}function m({href:e,label:s,active:n,Icon:i}){return(0,a.jsxs)(t.default,{href:e,"aria-current":n?"page":void 0,className:d("relative flex h-[4.05rem] w-full min-w-0 flex-col items-center justify-center gap-1 rounded-[1.25rem] text-[11px] font-black transition-all duration-300 active:scale-[0.96]",n?"bg-[#123c8c] text-white shadow-xl shadow-blue-900/25":"text-slate-400 hover:bg-[#f6f8ff] hover:text-[#123c8c]"),children:[n?(0,a.jsx)("span",{className:"bottom-nav-active-bar absolute -top-1.5 h-1.5 w-11 rounded-full bg-blue-300"}):null,(0,a.jsx)("div",{className:d("flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition duration-300",n?"bottom-nav-icon-pop bg-white/15":"bg-transparent"),children:(0,a.jsx)(i,{size:24,strokeWidth:n?2.8:2.5,className:d("block shrink-0 transition duration-300",n?"text-white":"text-slate-400")})}),(0,a.jsx)("span",{className:"block max-w-full truncate leading-none",children:s})]})}e.s(["default",0,function({variant:e="employee"}){let t=(0,s.usePathname)();return"admin"===e?null:(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(c,{}),(0,a.jsx)("div",{"aria-hidden":"true",className:"h-[calc(5.8rem+env(safe-area-inset-bottom))] shrink-0 md:hidden"}),(0,a.jsx)("nav",{className:"fixed bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] left-1/2 z-50 w-[calc(100%-2rem)] max-w-[35rem] -translate-x-1/2 md:hidden",children:(0,a.jsx)("div",{className:"bottom-nav-shell-in overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/90 px-2.5 py-2.5 shadow-2xl shadow-slate-400/25 backdrop-blur-2xl",children:(0,a.jsx)("div",{className:"grid w-full grid-cols-4 gap-1.5",children:o.map(e=>{var s;return(0,a.jsx)(m,{href:e.href,label:e.label,Icon:e.icon,active:"/beranda"===(s=e.href)?"/"===t||"/beranda"===t:"/history"===s?"/history"===t||t.startsWith("/history/"):t===s||t.startsWith(`${s}/`)},e.href)})})})})]})}])},20865,e=>{"use strict";let a=(0,e.i(56420).default)("map-pin",[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);e.s(["MapPin",0,a],20865)},51757,e=>{"use strict";let a=(0,e.i(56420).default)("circle-check",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);e.s(["CheckCircle2",0,a],51757)},53138,e=>{"use strict";let a=(0,e.i(56420).default)("triangle-alert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);e.s(["AlertTriangle",0,a],53138)},66595,e=>{"use strict";let a=(0,e.i(56420).default)("search",[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]]);e.s(["Search",0,a],66595)},26441,e=>{"use strict";let a=(0,e.i(56420).default)("square-pen",[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",key:"1m0v6g"}],["path",{d:"M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",key:"ohrbg2"}]]);e.s(["Edit",0,a],26441)},73474,e=>{"use strict";let a=(0,e.i(56420).default)("trash-2",[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]]);e.s(["Trash2",0,a],73474)},77071,e=>{"use strict";let a=(0,e.i(56420).default)("plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);e.s(["Plus",0,a],77071)},33478,e=>{"use strict";var a=e.i(43476),t=e.i(71645),s=e.i(53138),n=e.i(46387),i=e.i(51757),l=e.i(26441),r=e.i(32781),o=e.i(20865),d=e.i(7921),c=e.i(77071),m=e.i(66595),u=e.i(73474),b=e.i(63676),f=e.i(26564),x=e.i(84276),h=e.i(89168);let p={name:"",office_id:"",department_id:"",status:"active"},j=[{value:"all",label:"Semua Status"},{value:"active",label:"Status Aktif"},{value:"inactive",label:"Status Nonaktif"}];function g(e){return"active"===e?"Aktif":"inactive"===e?"Nonaktif":e}function v(e){return e.trim().replace(/\s+/g," ").toLowerCase()}async function w(e){let a=await e.text();try{return a?JSON.parse(a):{}}catch{throw Error("Response API bukan JSON.")}}function k(){return(0,a.jsx)("style",{children:`
      @keyframes jabatanEnter {
        0% {
          opacity: 0;
          transform: translateY(14px);
        }

        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes jabatanRowEnter {
        0% {
          opacity: 0;
          transform: translateY(10px);
        }

        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes jabatanModalBackdrop {
        0% {
          opacity: 0;
        }

        100% {
          opacity: 1;
        }
      }

      @keyframes jabatanModalPanel {
        0% {
          opacity: 0;
          transform: translateY(16px) scale(0.985);
        }

        100% {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      .jabatan-enter {
        animation: jabatanEnter 320ms ease-out both;
      }

      .jabatan-row-enter {
        opacity: 0;
        animation: jabatanRowEnter 300ms ease-out both;
      }

      .jabatan-modal-backdrop {
        animation: jabatanModalBackdrop 180ms ease-out both;
      }

      .jabatan-modal-panel {
        animation: jabatanModalPanel 260ms ease-out both;
        transform-origin: center bottom;
      }

      @keyframes jabatanToastEnter {
        0% {
          opacity: 0;
          transform: translateX(18px) scale(0.98);
        }

        100% {
          opacity: 1;
          transform: translateX(0) scale(1);
        }
      }

      .jabatan-toast-enter {
        animation: jabatanToastEnter 260ms ease-out both;
      }

      .jabatan-field {
        transition:
          border-color 180ms ease,
          background-color 180ms ease,
          box-shadow 180ms ease;
      }

      @media (prefers-reduced-motion: reduce) {
        .jabatan-enter,
        .jabatan-row-enter,
        .jabatan-modal-backdrop,
        .jabatan-modal-panel,
        .jabatan-toast-enter {
          animation: none !important;
          opacity: 1 !important;
          transform: none !important;
        }
      }
    `})}e.s(["default",0,function(){var e;let[y,N]=(0,t.useState)([]),[_,S]=(0,t.useState)([]),[C,T]=(0,t.useState)([]),[D,E]=(0,t.useState)(""),[M,A]=(0,t.useState)("all"),[P,J]=(0,t.useState)("all"),[z,R]=(0,t.useState)("all"),[L,K]=(0,t.useState)(p),[$,B]=(0,t.useState)(!0),[G,I]=(0,t.useState)(!1),[U,O]=(0,t.useState)(!1),[W,Y]=(0,t.useState)(""),[H,X]=(0,t.useState)(!1),[F,q]=(0,t.useState)(null),[V,Q]=(0,t.useState)(null),[Z,ee]=(0,t.useState)(!1),ea=(0,t.useRef)(null),et=(0,t.useMemo)(()=>C.filter(e=>"inactive"!==e.status),[C]),es=(0,t.useMemo)(()=>_.filter(e=>"active"===e.status),[_]),en=(0,t.useMemo)(()=>L.office_id?es.filter(e=>(e.office_id||e.office?.id||"")===L.office_id):[],[es,L.office_id]),ei=(0,t.useMemo)(()=>_.filter(e=>{let a=e.office_id||e.office?.id||"";return"all"===P||("none"===P?!a:a===P)}),[_,P]),el=(0,t.useMemo)(()=>{let e=D.toLowerCase().trim();return y.filter(a=>{let t=a.name.toLowerCase(),s=a.status.toLowerCase(),n=a.department?.name?.toLowerCase()||"",i=a.department?.office?.name?.toLowerCase()||"",l=a.department?.office?.address?.toLowerCase()||"",r=a.department?.office_id||a.department?.office?.id||"",o=a.department_id||a.department?.id||"";return(!e||!!t.includes(e)||!!n.includes(e)||!!i.includes(e)||!!l.includes(e))&&("all"===M||s===M)&&("all"===P||("none"!==P||!r)&&("none"===P||r===P))&&("all"===z||("none"!==z||!o)&&("none"===z||o===z))&&!0})},[y,D,M,P,z]),er=V?"success"===(e=V.type)?{shell:"from-emerald-50 via-white to-blue-50",iconWrap:"bg-emerald-100 text-emerald-600",badge:"bg-white/70 text-emerald-600",button:"bg-emerald-600 hover:bg-emerald-700 shadow-emerald-900/20",icon:i.CheckCircle2,label:"BERHASIL"}:"error"===e?{shell:"from-red-50 via-white to-blue-50",iconWrap:"bg-red-100 text-red-600",badge:"bg-white/70 text-red-600",button:"bg-red-600 hover:bg-red-700 shadow-red-900/20",icon:s.AlertTriangle,label:"GAGAL"}:{shell:"from-orange-50 via-white to-blue-50",iconWrap:"bg-orange-100 text-orange-600",badge:"bg-white/70 text-orange-600",button:"bg-[#526fae] hover:bg-[#46629d] shadow-blue-900/20",icon:s.AlertTriangle,label:"PERHATIAN"}:null,eo=er?.icon||s.AlertTriangle,ed=(0,t.useCallback)((e,a,t)=>{ea.current&&clearTimeout(ea.current),ee(!1),Q({title:e,message:a,type:t}),ea.current=setTimeout(()=>{ee(!0),ea.current=setTimeout(()=>{Q(null),ee(!1)},260)},3600)},[]),ec=(0,t.useCallback)(()=>{ea.current&&clearTimeout(ea.current),ee(!0),ea.current=setTimeout(()=>{Q(null),ee(!1)},260)},[]);async function em(){try{B(!0),Y("");let e=new URLSearchParams({search:D,status:M,office_id:P,department_id:z}),a=await fetch(`/api/admin/jabatans?${e.toString()}`,{cache:"no-store"}),t=await w(a);if(!a.ok)throw Error(t.error||t.message||"Gagal mengambil jabatan.");N(t.jabatans||t.data||[]),S(t.departments||[]),T(t.offices||[])}catch(e){console.error("LOAD_UNITS_ERROR:",e),Y(e instanceof Error?e.message:"Gagal mengambil data jabatan.")}finally{B(!1)}}function eu(){q(null),K(p),X(!1)}async function eb(e){e.preventDefault();let a=L.name.trim();if(!L.office_id)return void ed("Data belum lengkap","Kantor wajib dipilih.","warning");if(!L.department_id)return void ed("Data belum lengkap","Divisi wajib dipilih.","warning");if(!a)return void ed("Data belum lengkap","Nama jabatan wajib diisi.","warning");if(!["active","inactive"].includes(L.status))return void ed("Status tidak valid","Status jabatan tidak valid.","warning");if(y.find(e=>F?.id!==e.id&&e.department_id===L.department_id&&v(e.name)===v(a)))return void ed("Nama jabatan sudah ada","Gunakan nama jabatan lain karena nama ini sudah terdaftar pada divisi yang dipilih.","warning");try{I(!0);let e=await fetch("/api/admin/jabatans",{method:F?"PATCH":"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:F?.id,name:a,office_id:L.office_id,department_id:L.department_id,status:L.status})}),t=await w(e);if(!e.ok)throw Error(t.error||t.message||"Gagal menyimpan jabatan.");await em(),eu(),ed("Jabatan tersimpan",t.message||"Data jabatan berhasil disimpan.","success")}catch(a){console.error("SAVE_UNIT_ERROR:",a);let e=a instanceof Error?a.message:"Gagal menyimpan jabatan.";ed(e.toLowerCase().includes("sudah ada")?"Nama jabatan sudah ada":"Gagal menyimpan jabatan",e,e.toLowerCase().includes("sudah ada")?"warning":"error")}finally{I(!1)}}async function ef(e){let a=e._count?.users||0,t=e._count?.positions||0;if(a>0||t>0)return void ed("Jabatan masih digunakan","Jabatan ini masih memiliki posisi atau digunakan oleh karyawan. Ubah status menjadi Nonaktif jika tidak ingin digunakan.","warning");if(window.confirm(`Yakin ingin menghapus jabatan "${e.name}"? Data yang dihapus tidak bisa dikembalikan.`))try{O(!0);let a=await fetch(`/api/admin/jabatans?id=${e.id}`,{method:"DELETE"}),t=await w(a);if(!a.ok)throw Error(t.error||t.message||"Gagal menghapus jabatan.");ed("Jabatan dihapus","Jabatan berhasil dihapus.","success"),await em()}catch(e){console.error("DELETE_UNIT_ERROR:",e),ed("Gagal menghapus jabatan",e instanceof Error?e.message:"Gagal menghapus jabatan.","error")}finally{O(!1)}}return(0,t.useEffect)(()=>{em()},[]),(0,t.useEffect)(()=>()=>{ea.current&&clearTimeout(ea.current)},[]),(0,a.jsxs)(h.default,{variant:"admin",children:[(0,a.jsx)(k,{}),(0,a.jsx)(f.default,{title:"Daftar Jabatan",variant:"admin"}),(0,a.jsx)("section",{className:"mx-auto max-w-7xl space-y-6 px-5 py-6 pb-28 md:px-10 lg:px-16",children:(0,a.jsxs)("div",{className:"jabatan-enter overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-xl shadow-slate-300/30",children:[(0,a.jsx)("div",{className:"bg-[#123c8c] p-6 text-white md:p-8",children:(0,a.jsxs)("div",{className:"flex flex-col gap-5 md:flex-row md:items-end md:justify-between",children:[(0,a.jsx)("div",{children:(0,a.jsx)("h1",{className:"mt-3 text-3xl font-black tracking-tight md:text-4xl",children:"Daftar Jabatan"})}),(0,a.jsxs)("button",{type:"button",onClick:function(){q(null),K(p),X(!0)},className:"inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-white px-5 text-sm font-black text-[#123c8c] shadow-lg shadow-blue-950/20 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-50 active:scale-[0.98]",children:[(0,a.jsx)(c.Plus,{size:18}),"Tambah Jabatan"]})]})}),(0,a.jsxs)("div",{className:"p-5 md:p-8",children:[(0,a.jsxs)("div",{className:"jabatan-row-enter grid gap-3 md:grid-cols-[1fr_220px_220px_210px_auto]",style:{animationDelay:"80ms"},children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"text-sm font-black text-slate-500",children:"Nama Jabatan / Divisi / Kantor"}),(0,a.jsxs)("div",{className:"relative mt-3",children:[(0,a.jsx)(m.Search,{size:20,className:"absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"}),(0,a.jsx)("input",{value:D,onChange:e=>E(e.target.value),placeholder:"Cari jabatan, divisi, atau kantor...",className:"jabatan-field w-full rounded-2xl border border-blue-100 bg-[#f6f8ff] py-4 pl-12 pr-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#123c8c] focus:bg-white focus:ring-4 focus:ring-blue-100"})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"text-sm font-black text-slate-500",children:"Filter Kantor"}),(0,a.jsxs)("select",{value:P,onChange:e=>{J(e.target.value),R("all")},className:"jabatan-field mt-3 w-full rounded-2xl border border-blue-100 bg-[#f6f8ff] px-4 py-4 text-sm font-black text-slate-700 outline-none transition focus:border-[#123c8c] focus:bg-white focus:ring-4 focus:ring-blue-100",children:[(0,a.jsx)("option",{value:"all",children:"Semua Kantor"}),(0,a.jsx)("option",{value:"none",children:"Tanpa Kantor"}),C.map(e=>(0,a.jsx)("option",{value:e.id,children:e.name},e.id))]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"text-sm font-black text-slate-500",children:"Filter Divisi"}),(0,a.jsxs)("select",{value:z,onChange:e=>R(e.target.value),className:"jabatan-field mt-3 w-full rounded-2xl border border-blue-100 bg-[#f6f8ff] px-4 py-4 text-sm font-black text-slate-700 outline-none transition focus:border-[#123c8c] focus:bg-white focus:ring-4 focus:ring-blue-100",children:[(0,a.jsx)("option",{value:"all",children:"Semua Divisi"}),(0,a.jsx)("option",{value:"none",children:"Tanpa Divisi"}),ei.map(e=>(0,a.jsxs)("option",{value:e.id,children:[e.name,e.office?.name?` - ${e.office.name}`:""]},e.id))]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"text-sm font-black text-slate-500",children:"Filter Status"}),(0,a.jsx)("select",{value:M,onChange:e=>A(e.target.value),className:"jabatan-field mt-3 w-full rounded-2xl border border-blue-100 bg-[#f6f8ff] px-4 py-4 text-sm font-black text-slate-700 outline-none transition focus:border-[#123c8c] focus:bg-white focus:ring-4 focus:ring-blue-100",children:j.map(e=>(0,a.jsx)("option",{value:e.value,children:e.label},e.value))})]}),(0,a.jsx)("div",{className:"flex items-end gap-2",children:(0,a.jsx)("button",{type:"button",onClick:function(){E(""),A("all"),J("all"),R("all")},className:"flex h-[54px] flex-1 items-center justify-center rounded-2xl border border-blue-100 bg-white px-5 text-sm font-black text-[#123c8c] shadow-sm transition hover:bg-blue-50 active:scale-[0.96] md:flex-none",children:"Atur Ulang"})})]}),W?(0,a.jsx)("div",{className:"jabatan-row-enter mt-5 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-black text-red-700",children:W}):null,(0,a.jsxs)("div",{className:"jabatan-row-enter mt-8 overflow-hidden rounded-2xl border border-blue-100",style:{animationDelay:"130ms"},children:[(0,a.jsxs)("div",{className:"hidden grid-cols-[0.3fr_1.2fr_1.1fr_1.1fr_0.75fr_0.75fr_1fr] bg-[#f6f8ff] px-5 py-4 text-xs font-black uppercase tracking-[0.18em] text-[#123c8c] md:grid",children:[(0,a.jsx)("p",{children:"#"}),(0,a.jsx)("p",{children:"Jabatan"}),(0,a.jsx)("p",{children:"Kantor"}),(0,a.jsx)("p",{children:"Divisi"}),(0,a.jsx)("p",{children:"Posisi"}),(0,a.jsx)("p",{children:"Status"}),(0,a.jsx)("p",{className:"text-center",children:"Aksi"})]}),(0,a.jsx)("div",{className:"divide-y divide-blue-50 bg-white",children:$?(0,a.jsxs)("div",{className:"jabatan-row-enter px-5 py-10 text-center",children:[(0,a.jsx)(r.Loader2,{className:"mx-auto h-8 w-8 animate-spin text-[#123c8c]"}),(0,a.jsx)("p",{className:"mt-3 text-sm font-black text-slate-600",children:"Mengambil data jabatan..."})]}):0===el.length?(0,a.jsxs)("div",{className:"jabatan-row-enter px-5 py-10 text-center",children:[(0,a.jsx)(n.Building2,{className:"mx-auto text-slate-300",size:36}),(0,a.jsx)("p",{className:"mt-3 font-black text-slate-700",children:"Data jabatan tidak ditemukan."}),(0,a.jsx)("p",{className:"mt-1 text-sm text-slate-400",children:"Tambahkan jabatan baru atau ubah filter pencarian."})]}):el.map((e,t)=>(0,a.jsxs)("div",{className:"jabatan-row-enter grid gap-4 px-4 py-4 text-sm transition duration-200 hover:bg-[#f8fbff] md:grid-cols-[0.3fr_1.2fr_1.1fr_1.1fr_0.75fr_0.75fr_1fr] md:items-center md:px-5 md:py-6",style:{animationDelay:`${55*t}ms`},children:[(0,a.jsxs)("div",{className:"flex items-start justify-between gap-3 md:block",children:[(0,a.jsxs)("div",{className:"flex items-center gap-3",children:[(0,a.jsx)("div",{className:"flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-[#eaf1ff] text-xs font-black text-[#123c8c] md:h-auto md:w-auto md:bg-transparent md:text-sm md:text-slate-500",children:t+1}),(0,a.jsxs)("div",{className:"md:hidden",children:[(0,a.jsx)("p",{className:"font-black uppercase text-slate-950",children:e.name}),(0,a.jsxs)("p",{className:"mt-1 text-xs font-semibold text-slate-400",children:[e.department?.office?.name||"Tanpa Kantor"," ","• ",e.department?.name||"Tanpa Divisi"," •"," ",e._count?.positions||0," posisi"]})]})]}),(0,a.jsx)("span",{className:`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-black md:hidden ${"active"===e.status?"bg-blue-50 text-[#123c8c]":"bg-slate-100 text-slate-600"}`,children:g(e.status)})]}),(0,a.jsxs)("div",{className:"hidden md:block",children:[(0,a.jsx)("p",{className:"font-black uppercase text-slate-950",children:e.name}),(0,a.jsxs)("p",{className:"mt-1 text-xs font-semibold text-slate-400",children:[e._count?.users||0," karyawan"]})]}),(0,a.jsxs)("div",{className:"rounded-2xl border border-blue-100 bg-[#f8fbff] p-3 md:border-0 md:bg-transparent md:p-0",children:[(0,a.jsx)("p",{className:"text-[11px] font-black uppercase tracking-[0.12em] text-slate-400 md:hidden",children:"Kantor"}),(0,a.jsx)("p",{className:"mt-1 font-black text-slate-600 md:mt-0",children:e.department?.office?.name||"Tanpa Kantor"}),(0,a.jsx)("p",{className:"mt-1 line-clamp-1 text-xs font-semibold text-slate-400",children:e.department?.office?.address||""})]}),(0,a.jsxs)("div",{className:"rounded-2xl border border-blue-100 bg-[#f8fbff] p-3 md:border-0 md:bg-transparent md:p-0",children:[(0,a.jsx)("p",{className:"text-[11px] font-black uppercase tracking-[0.12em] text-slate-400 md:hidden",children:"Divisi"}),(0,a.jsx)("p",{className:"mt-1 font-black text-slate-600 md:mt-0",children:e.department?.name||"Tanpa Divisi"})]}),(0,a.jsxs)("div",{className:"rounded-2xl border border-blue-100 bg-[#f8fbff] p-3 md:border-0 md:bg-transparent md:p-0",children:[(0,a.jsx)("p",{className:"text-[11px] font-black uppercase tracking-[0.12em] text-slate-400 md:hidden",children:"Posisi"}),(0,a.jsx)("p",{className:"mt-1 font-black text-slate-600 md:mt-0",children:e._count?.positions||0})]}),(0,a.jsx)("div",{className:"hidden md:block",children:(0,a.jsx)("span",{className:`w-fit rounded-full px-4 py-2 text-xs font-black ${"active"===e.status?"bg-blue-50 text-[#123c8c]":"bg-slate-100 text-slate-600"}`,children:g(e.status)})}),(0,a.jsxs)("div",{className:"grid gap-2 md:flex md:justify-center",children:[(0,a.jsxs)("button",{type:"button",onClick:()=>{let a;return a=e.department?.office_id||e.department?.office?.id||"",void(q(e),K({name:e.name,office_id:a,department_id:e.department_id||"",status:e.status||"active"}),X(!0))},className:"inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#123c8c] px-4 text-sm font-black text-white shadow-lg shadow-blue-900/20 transition hover:bg-[#0f3274] active:scale-[0.97] md:h-auto md:w-fit md:rounded-xl md:border md:border-blue-100 md:bg-white md:px-4 md:py-2 md:text-xs md:text-[#123c8c] md:shadow-none md:hover:bg-[#eaf1ff]",children:[(0,a.jsx)(l.Edit,{size:16,className:"md:h-3.5 md:w-3.5"}),"Edit"]}),(0,a.jsxs)("button",{type:"button",onClick:()=>ef(e),disabled:U||(e._count?.users||0)>0||(e._count?.positions||0)>0,className:"inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-red-100 bg-red-50 px-4 text-sm font-black text-red-600 transition hover:bg-red-100 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50 md:h-auto md:w-fit md:rounded-xl md:px-4 md:py-2 md:text-xs",children:[U?(0,a.jsx)(r.Loader2,{size:16,className:"animate-spin md:h-3.5 md:w-3.5"}):(0,a.jsx)(u.Trash2,{size:16,className:"md:h-3.5 md:w-3.5"}),"Hapus"]})]})]},e.id))})]})]})]})}),H?(0,a.jsx)("div",{className:"jabatan-modal-backdrop fixed inset-0 z-[80] flex items-end justify-center bg-slate-950/50 px-4 pb-4 backdrop-blur-sm md:items-center md:pb-0",children:(0,a.jsxs)("div",{className:"jabatan-modal-panel max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-[2rem] bg-white p-5 shadow-2xl shadow-slate-950/30 md:p-7",children:[(0,a.jsxs)("div",{className:"flex items-start justify-between gap-4",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-xs font-black uppercase tracking-[0.22em] text-[#123c8c]",children:F?"Edit Jabatan":"Tambah Jabatan"}),(0,a.jsx)("h2",{className:"mt-2 text-2xl font-black text-slate-950",children:F?"Update Data Jabatan":"Jabatan Baru"}),(0,a.jsx)("p",{className:"mt-1 text-sm text-slate-500",children:"Pilih kantor, lalu pilih divisi, kemudian isi nama jabatan."})]}),(0,a.jsx)("button",{type:"button",onClick:eu,className:"flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 transition hover:bg-slate-200 active:scale-[0.96]",children:(0,a.jsx)(b.X,{size:20})})]}),(0,a.jsxs)("form",{onSubmit:eb,className:"mt-6 space-y-4",children:[(0,a.jsxs)("div",{className:"jabatan-row-enter rounded-[1.6rem] border border-blue-100 bg-[#f8fbff] p-4",children:[(0,a.jsxs)("div",{className:"grid gap-4 md:grid-cols-2",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"mb-2 block text-sm font-black text-slate-700",children:"Kantor"}),(0,a.jsxs)("div",{className:"relative",children:[(0,a.jsx)(o.MapPin,{size:18,className:"absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"}),(0,a.jsxs)("select",{value:L.office_id,onChange:e=>K(a=>({...a,office_id:e.target.value,department_id:""})),className:"jabatan-field w-full appearance-none rounded-2xl border border-blue-100 bg-white py-3 pl-11 pr-4 text-sm font-bold text-slate-700 outline-none transition focus:border-[#123c8c] focus:ring-4 focus:ring-blue-100",children:[(0,a.jsx)("option",{value:"",children:"Pilih Kantor"}),et.map(e=>(0,a.jsxs)("option",{value:e.id,children:[e.name,e.address?` - ${e.address}`:""]},e.id))]})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"mb-2 block text-sm font-black text-slate-700",children:"Divisi"}),(0,a.jsxs)("div",{className:"relative",children:[(0,a.jsx)(d.Network,{size:18,className:"absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"}),(0,a.jsxs)("select",{value:L.department_id,onChange:e=>K(a=>({...a,department_id:e.target.value})),disabled:!L.office_id,className:"jabatan-field w-full appearance-none rounded-2xl border border-blue-100 bg-white py-3 pl-11 pr-4 text-sm font-bold text-slate-700 outline-none transition focus:border-[#123c8c] focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400",children:[(0,a.jsx)("option",{value:"",children:L.office_id?"Pilih Divisi":"Pilih Kantor dulu"}),en.map(e=>(0,a.jsx)("option",{value:e.id,children:e.name},e.id))]})]})]})]}),L.office_id&&0===en.length?(0,a.jsxs)("div",{className:"jabatan-row-enter mt-4 rounded-2xl border border-amber-100 bg-amber-50 p-4",style:{animationDelay:"40ms"},children:[(0,a.jsx)("p",{className:"text-sm font-black text-amber-700",children:"Divisi belum tersedia untuk kantor ini"}),(0,a.jsx)("p",{className:"mt-1 text-sm leading-6 text-amber-700/80",children:"Tambahkan Divisi terlebih dahulu dan hubungkan ke kantor yang dipilih."})]}):null]}),(0,a.jsxs)("div",{className:"jabatan-row-enter",style:{animationDelay:"40ms"},children:[(0,a.jsx)("label",{className:"mb-2 block text-sm font-black text-slate-700",children:"Nama Jabatan"}),(0,a.jsx)("input",{value:L.name,onChange:e=>K(a=>({...a,name:e.target.value})),placeholder:"Contoh: Kembaliend Development, Mobile Development, Accounting",className:"jabatan-field w-full rounded-2xl border border-blue-100 bg-[#f6f8ff] px-4 py-3 text-sm font-bold text-slate-700 outline-none transition focus:border-[#123c8c] focus:bg-white focus:ring-4 focus:ring-blue-100"})]}),(0,a.jsxs)("div",{className:"jabatan-row-enter",style:{animationDelay:"80ms"},children:[(0,a.jsx)("label",{className:"mb-2 block text-sm font-black text-slate-700",children:"Status Jabatan"}),(0,a.jsxs)("select",{value:L.status,onChange:e=>K(a=>({...a,status:e.target.value})),className:"jabatan-field w-full rounded-2xl border border-blue-100 bg-[#f6f8ff] px-4 py-3 text-sm font-bold text-slate-700 outline-none transition focus:border-[#123c8c] focus:bg-white focus:ring-4 focus:ring-blue-100",children:[(0,a.jsx)("option",{value:"active",children:"Aktif"}),(0,a.jsx)("option",{value:"inactive",children:"Nonaktif"})]})]}),(0,a.jsxs)("div",{className:"jabatan-row-enter flex flex-col-reverse gap-3 pt-2 md:flex-row md:justify-end",style:{animationDelay:"160ms"},children:[(0,a.jsx)("button",{type:"button",onClick:eu,className:"rounded-2xl bg-slate-100 px-5 py-3 text-sm font-black text-slate-600 transition hover:bg-slate-200 active:scale-[0.98]",children:"Batal"}),(0,a.jsx)("button",{type:"submit",disabled:G,className:"rounded-2xl bg-[#123c8c] px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-900/20 transition hover:bg-[#0f3274] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60",children:G?"Menyimpan...":F?"Update Jabatan":"Tambah Jabatan"})]})]})]})}):null,V&&er?(0,a.jsx)("div",{className:`jabatan-toast-enter fixed right-4 top-4 z-[140] w-[calc(100vw-2rem)] max-w-md transition-all duration-300 ease-out md:right-7 md:top-7 ${Z?"translate-x-8 scale-95 opacity-0":"translate-x-0 scale-100 opacity-100"}`,children:(0,a.jsxs)("div",{className:`overflow-hidden rounded-[2rem] border border-white/70 bg-gradient-to-br ${er.shell} shadow-2xl shadow-slate-900/20 backdrop-blur-xl transition-all duration-300 ease-out ${Z?"translate-y-2 opacity-0":"translate-y-0 opacity-100"}`,children:[(0,a.jsxs)("div",{className:"relative p-5",children:[(0,a.jsx)("div",{className:"absolute -left-12 -top-12 h-40 w-40 rounded-full bg-orange-200/30 blur-3xl"}),(0,a.jsx)("div",{className:"absolute -right-12 -bottom-12 h-40 w-40 rounded-full bg-blue-300/30 blur-3xl"}),(0,a.jsxs)("div",{className:"relative flex items-start gap-4",children:[(0,a.jsx)("div",{className:`flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.5rem] ${er.iconWrap} shadow-lg shadow-slate-300/40`,children:(0,a.jsx)(eo,{size:32,strokeWidth:3})}),(0,a.jsxs)("div",{className:"min-w-0 flex-1 pt-1",children:[(0,a.jsx)("div",{className:`inline-flex rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-[0.24em] ${er.badge}`,children:er.label}),(0,a.jsx)("h3",{className:"mt-3 text-2xl font-black leading-tight text-slate-950",children:V.title}),(0,a.jsx)("p",{className:"mt-2 text-sm font-bold leading-6 text-slate-600",children:V.message})]}),(0,a.jsx)("button",{type:"button",onClick:ec,className:"flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/70 text-slate-500 shadow-sm transition hover:bg-white hover:text-slate-800 active:scale-[0.96]","aria-label":"Tutup alert",children:(0,a.jsx)(b.X,{size:22,strokeWidth:2.8})})]})]}),(0,a.jsx)("div",{className:"border-t border-white/60 bg-white/70 p-4",children:(0,a.jsx)("button",{type:"button",onClick:ec,className:`w-full rounded-2xl px-6 py-3.5 text-sm font-black text-white shadow-lg transition active:scale-[0.98] ${er.button}`,children:"Mengerti"})})]})}):null,(0,a.jsx)(x.default,{variant:"admin"})]})}])}]);