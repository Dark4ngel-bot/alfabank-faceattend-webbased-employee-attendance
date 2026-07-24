(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,32781,e=>{"use strict";let a=(0,e.i(56420).default)("loader-circle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);e.s(["Loader2",0,a],32781)},84276,e=>{"use strict";var a=e.i(43476),t=e.i(22016),i=e.i(18566),s=e.i(75153),n=e.i(94004),l=e.i(49817),r=e.i(65649);let o=[{href:"/beranda",label:"Beranda",icon:l.Home},{href:"/presensi",label:"Presensi",icon:s.CalendarCheck},{href:"/history",label:"Riwayat",icon:n.History},{href:"/profil",label:"Profil",icon:r.UserRound}];function d(...e){return e.filter(Boolean).join(" ")}function c(){return(0,a.jsx)("style",{children:`
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
    `})}function m({href:e,label:i,active:s,Icon:n}){return(0,a.jsxs)(t.default,{href:e,"aria-current":s?"page":void 0,className:d("relative flex h-[4.05rem] w-full min-w-0 flex-col items-center justify-center gap-1 rounded-[1.25rem] text-[11px] font-black transition-all duration-300 active:scale-[0.96]",s?"bg-[#123c8c] text-white shadow-xl shadow-blue-900/25":"text-slate-400 hover:bg-[#f6f8ff] hover:text-[#123c8c]"),children:[s?(0,a.jsx)("span",{className:"bottom-nav-active-bar absolute -top-1.5 h-1.5 w-11 rounded-full bg-blue-300"}):null,(0,a.jsx)("div",{className:d("flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition duration-300",s?"bottom-nav-icon-pop bg-white/15":"bg-transparent"),children:(0,a.jsx)(n,{size:24,strokeWidth:s?2.8:2.5,className:d("block shrink-0 transition duration-300",s?"text-white":"text-slate-400")})}),(0,a.jsx)("span",{className:"block max-w-full truncate leading-none",children:i})]})}e.s(["default",0,function({variant:e="employee"}){let t=(0,i.usePathname)();return"admin"===e?null:(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(c,{}),(0,a.jsx)("div",{"aria-hidden":"true",className:"h-[calc(5.8rem+env(safe-area-inset-bottom))] shrink-0 md:hidden"}),(0,a.jsx)("nav",{className:"fixed bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] left-1/2 z-50 w-[calc(100%-2rem)] max-w-[35rem] -translate-x-1/2 md:hidden",children:(0,a.jsx)("div",{className:"bottom-nav-shell-in overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/90 px-2.5 py-2.5 shadow-2xl shadow-slate-400/25 backdrop-blur-2xl",children:(0,a.jsx)("div",{className:"grid w-full grid-cols-4 gap-1.5",children:o.map(e=>{var i;return(0,a.jsx)(m,{href:e.href,label:e.label,Icon:e.icon,active:"/beranda"===(i=e.href)?"/"===t||"/beranda"===t:"/history"===i?"/history"===t||t.startsWith("/history/"):t===i||t.startsWith(`${i}/`)},e.href)})})})})]})}])},20865,e=>{"use strict";let a=(0,e.i(56420).default)("map-pin",[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);e.s(["MapPin",0,a],20865)},82924,e=>{"use strict";let a=(0,e.i(56420).default)("briefcase-business",[["path",{d:"M12 12h.01",key:"1mp3jc"}],["path",{d:"M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2",key:"1ksdt3"}],["path",{d:"M22 13a18.15 18.15 0 0 1-20 0",key:"12hx5q"}],["rect",{width:"20",height:"14",x:"2",y:"6",rx:"2",key:"i6l2r4"}]]);e.s(["BriefcaseBusiness",0,a],82924)},66595,e=>{"use strict";let a=(0,e.i(56420).default)("search",[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]]);e.s(["Search",0,a],66595)},26441,e=>{"use strict";let a=(0,e.i(56420).default)("square-pen",[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",key:"1m0v6g"}],["path",{d:"M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",key:"ohrbg2"}]]);e.s(["Edit",0,a],26441)},73474,e=>{"use strict";let a=(0,e.i(56420).default)("trash-2",[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]]);e.s(["Trash2",0,a],73474)},77071,e=>{"use strict";let a=(0,e.i(56420).default)("plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);e.s(["Plus",0,a],77071)},58378,e=>{"use strict";var a=e.i(43476),t=e.i(71645),i=e.i(82924),s=e.i(46387),n=e.i(26441),l=e.i(32781),r=e.i(20865),o=e.i(7921),d=e.i(77071),c=e.i(66595),m=e.i(73474),u=e.i(63676),p=e.i(26564),x=e.i(84276),f=e.i(89168);let h={name:"",office_id:"",department_id:"",jabatan_id:"",status:"active"},b=[{value:"all",label:"Semua Status"},{value:"active",label:"Status Aktif"},{value:"inactive",label:"Status Nonaktif"}];function v(e){return"active"===e?"Aktif":"inactive"===e?"Nonaktif":e}function j(e,a){return"all"===a||("none"===a?!e:e===a)}function g(e){return e?.department?.office_id||e?.department?.office?.id||""}function y(e){return e?.department_id||e?.department?.id||""}function w(e){return e.jabatan_id||e.jabatan?.id||""}function k(e){return g(e.jabatan)}function N(e){return y(e.jabatan)}function _(e){return"active"===e?"bg-blue-50 text-[#123c8c]":"bg-slate-100 text-slate-600"}async function P(e){let a=await e.text();try{return a?JSON.parse(a):{}}catch{throw Error("Response API bukan JSON.")}}function S(){return(0,a.jsx)("style",{children:`
      @keyframes positionEnter {
        0% {
          opacity: 0;
          transform: translateY(14px);
        }

        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes positionRowEnter {
        0% {
          opacity: 0;
          transform: translateY(10px);
        }

        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes positionModalBackdrop {
        0% {
          opacity: 0;
        }

        100% {
          opacity: 1;
        }
      }

      @keyframes positionModalPanel {
        0% {
          opacity: 0;
          transform: translateY(16px) scale(0.985);
        }

        100% {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      .position-enter {
        animation: positionEnter 320ms ease-out both;
      }

      .position-row-enter {
        opacity: 0;
        animation: positionRowEnter 300ms ease-out both;
      }

      .position-modal-backdrop {
        animation: positionModalBackdrop 180ms ease-out both;
      }

      .position-modal-panel {
        animation: positionModalPanel 260ms ease-out both;
        transform-origin: center bottom;
      }

      .position-field {
        transition:
          border-color 180ms ease,
          background-color 180ms ease,
          box-shadow 180ms ease;
      }

      @media (prefers-reduced-motion: reduce) {
        .position-enter,
        .position-row-enter,
        .position-modal-backdrop,
        .position-modal-panel {
          animation: none !important;
          opacity: 1 !important;
          transform: none !important;
        }
      }
    `})}function D({children:e}){return(0,a.jsx)("label",{className:"text-sm font-black text-slate-500",children:e})}function C(e){let{label:t,value:i,onChange:s,children:n,disabled:l,icon:r,className:o=""}=e;return(0,a.jsxs)("div",{className:o,children:[(0,a.jsx)(D,{children:t}),(0,a.jsxs)("div",{className:"relative mt-3",children:[r?(0,a.jsx)("div",{className:"pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400",children:r}):null,(0,a.jsx)("select",{value:i,onChange:e=>s(e.target.value),disabled:l,className:`position-field h-[58px] w-full rounded-2xl border border-blue-100 bg-[#f6f8ff] pr-4 text-sm font-black text-slate-700 outline-none transition focus:border-[#123c8c] focus:bg-white focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 ${r?"pl-11":"px-4"}`,children:n})]})]})}function M(e){let{value:t,onChange:i}=e;return(0,a.jsxs)("div",{children:[(0,a.jsx)(D,{children:"Nama Posisi / Jabatan / Divisi / Kantor"}),(0,a.jsxs)("div",{className:"relative mt-3",children:[(0,a.jsx)(c.Search,{size:20,className:"absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"}),(0,a.jsx)("input",{value:t,onChange:e=>i(e.target.value),placeholder:"Cari posisi, jabatan, divisi, atau kantor...",className:"position-field h-[58px] w-full rounded-2xl border border-blue-100 bg-[#f6f8ff] pl-12 pr-4 text-sm font-semibold text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#123c8c] focus:bg-white focus:ring-4 focus:ring-blue-100"})]})]})}function T(e){let{label:t,value:i,subvalue:s}=e;return(0,a.jsxs)("div",{className:"rounded-2xl border border-blue-100 bg-[#f8fbff] p-3 md:border-0 md:bg-transparent md:p-0",children:[(0,a.jsx)("p",{className:"text-[11px] font-black uppercase tracking-[0.12em] text-slate-400 md:hidden",children:t}),(0,a.jsx)("p",{className:"mt-1 font-black text-slate-600 md:mt-0",children:i}),s?(0,a.jsx)("p",{className:"mt-1 line-clamp-1 text-xs font-semibold text-slate-400",children:s}):null]})}e.s(["default",0,function(){let[e,c]=(0,t.useState)([]),[E,B]=(0,t.useState)([]),[R,z]=(0,t.useState)([]),[J,K]=(0,t.useState)([]),[O,A]=(0,t.useState)(""),[I,L]=(0,t.useState)("all"),[$,Y]=(0,t.useState)("all"),[U,F]=(0,t.useState)("all"),[G,H]=(0,t.useState)("all"),[V,q]=(0,t.useState)(h),[W,X]=(0,t.useState)(!0),[Q,Z]=(0,t.useState)(!1),[ee,ea]=(0,t.useState)(!1),[et,ei]=(0,t.useState)(""),[es,en]=(0,t.useState)(!1),[el,er]=(0,t.useState)(null),eo=(0,t.useMemo)(()=>E.filter(e=>"inactive"!==e.status),[E]),ed=(0,t.useMemo)(()=>R.filter(e=>"active"===e.status),[R]),ec=(0,t.useMemo)(()=>J.filter(e=>"active"===e.status),[J]),em=(0,t.useMemo)(()=>V.office_id?ed.filter(e=>(e.office_id||e.office?.id||"")===V.office_id):[],[ed,V.office_id]),eu=(0,t.useMemo)(()=>V.department_id?ec.filter(e=>y(e)===V.department_id):[],[ec,V.department_id]),ep=(0,t.useMemo)(()=>R.filter(e=>j(e.office_id||e.office?.id||"",$)),[R,$]),ex=(0,t.useMemo)(()=>J.filter(e=>{let a=g(e),t=y(e);return j(a,$)&&j(t,U)}),[J,$,U]),ef=(0,t.useMemo)(()=>{let a=O.toLowerCase().trim();return e.filter(e=>{let t=[e.name.toLowerCase(),e.jabatan?.name?.toLowerCase()||"",e.jabatan?.department?.name?.toLowerCase()||"",e.jabatan?.department?.office?.name?.toLowerCase()||"",e.jabatan?.department?.office?.address?.toLowerCase()||""].join(" ");return(!a||t.includes(a))&&j(e.status,I)&&j(k(e),$)&&j(N(e),U)&&j(w(e),G)})},[e,O,I,$,U,G]);async function eh(){try{X(!0),ei("");let e=await fetch("/api/admin/positions",{cache:"no-store"}),a=await P(e);if(!e.ok)throw Error(a.error||a.message||"Gagal mengambil posisi.");c(a.positions||a.data||[]),B(a.offices||[]),z(a.departments||[]),K(a.jabatans||[])}catch(e){console.error("LOAD_POSITIONS_ERROR:",e),ei(e instanceof Error?e.message:"Gagal mengambil data jabatan.")}finally{X(!1)}}function eb(){er(null),q(h),en(!1)}async function ev(e){e.preventDefault();let a=V.name.trim();if(!V.office_id)return void alert("Kantor wajib dipilih.");if(!V.department_id)return void alert("Divisi wajib dipilih.");if(!V.jabatan_id)return void alert("Jabatan wajib dipilih.");if(!a)return void alert("Nama posisi wajib diisi.");if(!["active","inactive"].includes(V.status))return void alert("Status posisi tidak valid.");try{Z(!0);let e=await fetch("/api/admin/positions",{method:el?"PATCH":"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:el?.id,name:a,office_id:V.office_id,department_id:V.department_id,jabatan_id:V.jabatan_id,status:V.status})}),t=await P(e);if(!e.ok)throw Error(t.error||t.message||"Gagal menyimpan posisi.");await eh(),eb()}catch(e){console.error("SAVE_POSITION_ERROR:",e),alert(e instanceof Error?e.message:"Gagal menyimpan posisi.")}finally{Z(!1)}}async function ej(e){if((e._count?.users||0)>0)return void alert("Posisi ini masih digunakan oleh karyawan. Ubah status menjadi Nonaktif jika tidak ingin digunakan.");if(window.confirm(`Yakin ingin menghapus posisi "${e.name}"? Data yang dihapus tidak bisa dikembalikan.`))try{ea(!0);let a=await fetch(`/api/admin/positions?id=${e.id}`,{method:"DELETE"}),t=await P(a);if(!a.ok)throw Error(t.error||t.message||"Gagal menghapus posisi.");alert("Posisi berhasil dihapus."),await eh()}catch(e){console.error("DELETE_POSITION_ERROR:",e),alert(e instanceof Error?e.message:"Gagal menghapus posisi.")}finally{ea(!1)}}return(0,t.useEffect)(()=>{eh()},[]),(0,a.jsxs)(f.default,{variant:"admin",children:[(0,a.jsx)(S,{}),(0,a.jsx)(p.default,{title:"Daftar Posisi",variant:"admin"}),(0,a.jsx)("section",{className:"mx-auto max-w-7xl space-y-6 px-5 py-6 pb-28 md:px-10 lg:px-16",children:(0,a.jsxs)("div",{className:"position-enter overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-xl shadow-slate-300/30",children:[(0,a.jsx)("div",{className:"bg-[#123c8c] p-6 text-white md:p-8",children:(0,a.jsxs)("div",{className:"flex flex-col gap-5 md:flex-row md:items-end md:justify-between",children:[(0,a.jsx)("div",{children:(0,a.jsx)("h1",{className:"mt-3 text-3xl font-black tracking-tight md:text-4xl",children:"Daftar Posisi"})}),(0,a.jsxs)("button",{type:"button",onClick:function(){er(null),q(h),en(!0)},className:"inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-white px-5 text-sm font-black text-[#123c8c] shadow-lg shadow-blue-950/20 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-50 active:scale-[0.98]",children:[(0,a.jsx)(d.Plus,{size:18}),"Tambah Posisi"]})]})}),(0,a.jsxs)("div",{className:"p-5 md:p-8",children:[(0,a.jsxs)("div",{className:"position-row-enter space-y-4",style:{animationDelay:"80ms"},children:[(0,a.jsxs)("div",{className:"grid gap-4 xl:grid-cols-[minmax(320px,1.2fr)_minmax(230px,0.8fr)_minmax(230px,0.8fr)]",children:[(0,a.jsx)(M,{value:O,onChange:A}),(0,a.jsxs)(C,{label:"Filter Kantor",value:$,onChange:e=>{Y(e),F("all"),H("all")},children:[(0,a.jsx)("option",{value:"all",children:"Semua Kantor"}),(0,a.jsx)("option",{value:"none",children:"Tanpa Kantor"}),E.map(e=>(0,a.jsx)("option",{value:e.id,children:e.name},e.id))]}),(0,a.jsxs)(C,{label:"Filter Divisi",value:U,onChange:e=>{F(e),H("all")},children:[(0,a.jsx)("option",{value:"all",children:"Semua Divisi"}),(0,a.jsx)("option",{value:"none",children:"Tanpa Divisi"}),ep.map(e=>(0,a.jsxs)("option",{value:e.id,children:[e.name,e.office?.name?` - ${e.office.name}`:""]},e.id))]})]}),(0,a.jsxs)("div",{className:"grid gap-4 xl:grid-cols-[minmax(230px,1fr)_minmax(230px,1fr)_auto]",children:[(0,a.jsxs)(C,{label:"Filter Jabatan",value:G,onChange:H,children:[(0,a.jsx)("option",{value:"all",children:"Semua Jabatan"}),(0,a.jsx)("option",{value:"none",children:"Tanpa Jabatan"}),ex.map(e=>(0,a.jsxs)("option",{value:e.id,children:[e.name,e.department?.name?` - ${e.department.name}`:""]},e.id))]}),(0,a.jsx)(C,{label:"Filter Status",value:I,onChange:L,children:b.map(e=>(0,a.jsx)("option",{value:e.value,children:e.label},e.value))}),(0,a.jsx)("div",{className:"flex items-end gap-2",children:(0,a.jsx)("button",{type:"button",onClick:function(){A(""),L("all"),Y("all"),F("all"),H("all")},className:"flex h-[58px] flex-1 items-center justify-center rounded-2xl border border-blue-100 bg-white px-5 text-sm font-black text-[#123c8c] shadow-sm transition hover:bg-blue-50 active:scale-[0.96] xl:flex-none",children:"Atur Ulang"})})]})]}),et?(0,a.jsx)("div",{className:"position-row-enter mt-5 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-black text-red-700",children:et}):null,(0,a.jsxs)("div",{className:"position-row-enter mt-8 overflow-hidden rounded-2xl border border-blue-100",style:{animationDelay:"130ms"},children:[(0,a.jsxs)("div",{className:"hidden grid-cols-[0.3fr_1.15fr_1fr_1fr_1fr_0.75fr_1fr] bg-[#f6f8ff] px-5 py-4 text-xs font-black uppercase tracking-[0.18em] text-[#123c8c] md:grid",children:[(0,a.jsx)("p",{children:"#"}),(0,a.jsx)("p",{children:"Posisi"}),(0,a.jsx)("p",{children:"Kantor"}),(0,a.jsx)("p",{children:"Divisi"}),(0,a.jsx)("p",{children:"Jabatan"}),(0,a.jsx)("p",{children:"Status"}),(0,a.jsx)("p",{className:"text-center",children:"Aksi"})]}),(0,a.jsx)("div",{className:"divide-y divide-blue-50 bg-white",children:W?(0,a.jsxs)("div",{className:"position-row-enter px-5 py-10 text-center",children:[(0,a.jsx)(l.Loader2,{className:"mx-auto h-8 w-8 animate-spin text-[#123c8c]"}),(0,a.jsx)("p",{className:"mt-3 text-sm font-black text-slate-600",children:"Mengambil data posisi..."})]}):0===ef.length?(0,a.jsxs)("div",{className:"position-row-enter px-5 py-10 text-center",children:[(0,a.jsx)(i.BriefcaseBusiness,{className:"mx-auto text-slate-300",size:36}),(0,a.jsx)("p",{className:"mt-3 font-black text-slate-700",children:"Data posisi tidak ditemukan."}),(0,a.jsx)("p",{className:"mt-1 text-sm text-slate-400",children:"Tambahkan posisi baru atau ubah filter pencarian."})]}):ef.map((e,t)=>{let i=e.jabatan?.department?.office,s=e.jabatan?.department,r=e.jabatan;return(0,a.jsxs)("div",{className:"position-row-enter grid gap-4 px-4 py-4 text-sm transition duration-200 hover:bg-[#f8fbff] md:grid-cols-[0.3fr_1.15fr_1fr_1fr_1fr_0.75fr_1fr] md:items-center md:px-5 md:py-6",style:{animationDelay:`${55*t}ms`},children:[(0,a.jsxs)("div",{className:"flex items-start justify-between gap-3 md:block",children:[(0,a.jsxs)("div",{className:"flex items-center gap-3",children:[(0,a.jsx)("div",{className:"flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-[#eaf1ff] text-xs font-black text-[#123c8c] md:h-auto md:w-auto md:bg-transparent md:text-sm md:text-slate-500",children:t+1}),(0,a.jsxs)("div",{className:"md:hidden",children:[(0,a.jsx)("p",{className:"font-black uppercase text-slate-950",children:e.name}),(0,a.jsxs)("p",{className:"mt-1 text-xs font-semibold text-slate-400",children:[i?.name||"Tanpa Kantor"," •"," ",s?.name||"Tanpa Divisi"," •"," ",r?.name||"Tanpa Jabatan"]})]})]}),(0,a.jsx)("span",{className:`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-black md:hidden ${_(e.status)}`,children:v(e.status)})]}),(0,a.jsxs)("div",{className:"hidden md:block",children:[(0,a.jsx)("p",{className:"font-black uppercase text-slate-950",children:e.name}),(0,a.jsxs)("p",{className:"mt-1 text-xs font-semibold text-slate-400",children:[e._count?.users||0," karyawan"]})]}),(0,a.jsx)(T,{label:"Kantor",value:i?.name||"Tanpa Kantor",subvalue:i?.address||""}),(0,a.jsx)(T,{label:"Divisi",value:s?.name||"Tanpa Divisi"}),(0,a.jsx)(T,{label:"Jabatan",value:r?.name||"Tanpa Jabatan"}),(0,a.jsx)("div",{className:"hidden md:block",children:(0,a.jsx)("span",{className:`w-fit rounded-full px-4 py-2 text-xs font-black ${_(e.status)}`,children:v(e.status)})}),(0,a.jsxs)("div",{className:"grid gap-2 md:flex md:justify-center",children:[(0,a.jsxs)("button",{type:"button",onClick:()=>{er(e),q({name:e.name,office_id:k(e),department_id:N(e),jabatan_id:w(e),status:e.status||"active"}),en(!0)},className:"inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#123c8c] px-4 text-sm font-black text-white shadow-lg shadow-blue-900/20 transition hover:bg-[#0f3274] active:scale-[0.97] md:h-auto md:w-fit md:rounded-xl md:border md:border-blue-100 md:bg-white md:px-4 md:py-2 md:text-xs md:text-[#123c8c] md:shadow-none md:hover:bg-[#eaf1ff]",children:[(0,a.jsx)(n.Edit,{size:16,className:"md:h-3.5 md:w-3.5"}),"Edit"]}),(0,a.jsxs)("button",{type:"button",onClick:()=>ej(e),disabled:ee||(e._count?.users||0)>0,className:"inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-red-100 bg-red-50 px-4 text-sm font-black text-red-600 transition hover:bg-red-100 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50 md:h-auto md:w-fit md:rounded-xl md:px-4 md:py-2 md:text-xs",children:[ee?(0,a.jsx)(l.Loader2,{size:16,className:"animate-spin md:h-3.5 md:w-3.5"}):(0,a.jsx)(m.Trash2,{size:16,className:"md:h-3.5 md:w-3.5"}),"Hapus"]})]})]},e.id)})})]})]})]})}),es?(0,a.jsx)("div",{className:"position-modal-backdrop fixed inset-0 z-[80] flex items-end justify-center bg-slate-950/50 px-4 pb-4 backdrop-blur-sm md:items-center md:pb-0",children:(0,a.jsxs)("div",{className:"position-modal-panel max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] bg-white p-5 shadow-2xl shadow-slate-950/30 md:p-7",children:[(0,a.jsxs)("div",{className:"flex items-start justify-between gap-4",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-xs font-black uppercase tracking-[0.22em] text-[#123c8c]",children:el?"Edit Posisi":"Tambah Posisi"}),(0,a.jsx)("h2",{className:"mt-2 text-2xl font-black text-slate-950",children:el?"Update Data Posisi":"Posisi Baru"}),(0,a.jsx)("p",{className:"mt-1 text-sm text-slate-500",children:"Pilih kantor, divisi, dan jabatan secara berurutan."})]}),(0,a.jsx)("button",{type:"button",onClick:eb,className:"flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 transition hover:bg-slate-200 active:scale-[0.96]",children:(0,a.jsx)(u.X,{size:20})})]}),(0,a.jsxs)("form",{onSubmit:ev,className:"mt-6 space-y-4",children:[(0,a.jsxs)("div",{className:"position-row-enter rounded-[1.6rem] border border-blue-100 bg-[#f8fbff] p-4",children:[(0,a.jsxs)("div",{className:"grid gap-4 md:grid-cols-3",children:[(0,a.jsxs)(C,{label:"Kantor",value:V.office_id,icon:(0,a.jsx)(r.MapPin,{size:18}),onChange:e=>q(a=>({...a,office_id:e,department_id:"",jabatan_id:""})),children:[(0,a.jsx)("option",{value:"",children:"Pilih Kantor"}),eo.map(e=>(0,a.jsxs)("option",{value:e.id,children:[e.name,e.address?` - ${e.address}`:""]},e.id))]}),(0,a.jsxs)(C,{label:"Divisi",value:V.department_id,icon:(0,a.jsx)(o.Network,{size:18}),disabled:!V.office_id,onChange:e=>q(a=>({...a,department_id:e,jabatan_id:""})),children:[(0,a.jsx)("option",{value:"",children:V.office_id?"Pilih Divisi":"Pilih Kantor dulu"}),em.map(e=>(0,a.jsx)("option",{value:e.id,children:e.name},e.id))]}),(0,a.jsxs)(C,{label:"Jabatan",value:V.jabatan_id,icon:(0,a.jsx)(s.Building2,{size:18}),disabled:!V.department_id,onChange:e=>q(a=>({...a,jabatan_id:e})),children:[(0,a.jsx)("option",{value:"",children:V.department_id?"Pilih Jabatan":"Pilih Divisi dulu"}),eu.map(e=>(0,a.jsx)("option",{value:e.id,children:e.name},e.id))]})]}),V.office_id&&0===em.length?(0,a.jsxs)("div",{className:"position-row-enter mt-4 rounded-2xl border border-amber-100 bg-amber-50 p-4",style:{animationDelay:"40ms"},children:[(0,a.jsx)("p",{className:"text-sm font-black text-amber-700",children:"Divisi belum tersedia untuk kantor ini"}),(0,a.jsx)("p",{className:"mt-1 text-sm leading-6 text-amber-700/80",children:"Tambahkan Divisi terlebih dahulu di kantor yang dipilih."})]}):null,V.department_id&&0===eu.length?(0,a.jsxs)("div",{className:"position-row-enter mt-4 rounded-2xl border border-amber-100 bg-amber-50 p-4",style:{animationDelay:"40ms"},children:[(0,a.jsx)("p",{className:"text-sm font-black text-amber-700",children:"Jabatan belum tersedia untuk divisi ini"}),(0,a.jsx)("p",{className:"mt-1 text-sm leading-6 text-amber-700/80",children:"Tambahkan Jabatan terlebih dahulu pada divisi yang dipilih."})]}):null]}),(0,a.jsxs)("div",{className:"position-row-enter",style:{animationDelay:"40ms"},children:[(0,a.jsx)(D,{children:"Nama Posisi"}),(0,a.jsx)("input",{value:V.name,onChange:e=>q(a=>({...a,name:e.target.value})),placeholder:"Contoh: Kembaliend Developer, Mobile Developer, Finance Staff",className:"position-field mt-3 h-[58px] w-full rounded-2xl border border-blue-100 bg-[#f6f8ff] px-4 text-sm font-bold text-slate-700 outline-none transition focus:border-[#123c8c] focus:bg-white focus:ring-4 focus:ring-blue-100"})]}),(0,a.jsxs)(C,{label:"Status Posisi",value:V.status,onChange:e=>q(a=>({...a,status:e})),className:"position-row-enter",children:[(0,a.jsx)("option",{value:"active",children:"Aktif"}),(0,a.jsx)("option",{value:"inactive",children:"Nonaktif"})]}),(0,a.jsxs)("div",{className:"position-row-enter rounded-2xl border border-blue-100 bg-[#f6f8ff] p-4",style:{animationDelay:"120ms"},children:[(0,a.jsx)("p",{className:"text-sm font-black text-[#123c8c]",children:"Relasi Posisi"}),(0,a.jsx)("p",{className:"mt-1 text-sm leading-6 text-slate-500",children:"Posisi berada di bawah jabatan. Contoh: Kantor Pusat Bandung → Technology → Backend Development → Backend Developer."})]}),(0,a.jsxs)("div",{className:"position-row-enter flex flex-col-reverse gap-3 pt-2 md:flex-row md:justify-end",style:{animationDelay:"160ms"},children:[(0,a.jsx)("button",{type:"button",onClick:eb,className:"rounded-2xl bg-slate-100 px-5 py-3 text-sm font-black text-slate-600 transition hover:bg-slate-200 active:scale-[0.98]",children:"Batal"}),(0,a.jsx)("button",{type:"submit",disabled:Q,className:"rounded-2xl bg-[#123c8c] px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-900/20 transition hover:bg-[#0f3274] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60",children:Q?"Menyimpan...":el?"Update Posisi":"Tambah Posisi"})]})]})]})}):null,(0,a.jsx)(x.default,{variant:"admin"})]})}])}]);