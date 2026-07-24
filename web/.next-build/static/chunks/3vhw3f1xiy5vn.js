(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,32781,e=>{"use strict";let t=(0,e.i(56420).default)("loader-circle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);e.s(["Loader2",0,t],32781)},84276,e=>{"use strict";var t=e.i(43476),a=e.i(22016),s=e.i(18566),i=e.i(75153),n=e.i(94004),r=e.i(49817),l=e.i(65649);let o=[{href:"/beranda",label:"Beranda",icon:r.Home},{href:"/presensi",label:"Presensi",icon:i.CalendarCheck},{href:"/history",label:"Riwayat",icon:n.History},{href:"/profil",label:"Profil",icon:l.UserRound}];function d(...e){return e.filter(Boolean).join(" ")}function c(){return(0,t.jsx)("style",{children:`
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
    `})}function m({href:e,label:s,active:i,Icon:n}){return(0,t.jsxs)(a.default,{href:e,"aria-current":i?"page":void 0,className:d("relative flex h-[4.05rem] w-full min-w-0 flex-col items-center justify-center gap-1 rounded-[1.25rem] text-[11px] font-black transition-all duration-300 active:scale-[0.96]",i?"bg-[#123c8c] text-white shadow-xl shadow-blue-900/25":"text-slate-400 hover:bg-[#f6f8ff] hover:text-[#123c8c]"),children:[i?(0,t.jsx)("span",{className:"bottom-nav-active-bar absolute -top-1.5 h-1.5 w-11 rounded-full bg-blue-300"}):null,(0,t.jsx)("div",{className:d("flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition duration-300",i?"bottom-nav-icon-pop bg-white/15":"bg-transparent"),children:(0,t.jsx)(n,{size:24,strokeWidth:i?2.8:2.5,className:d("block shrink-0 transition duration-300",i?"text-white":"text-slate-400")})}),(0,t.jsx)("span",{className:"block max-w-full truncate leading-none",children:s})]})}e.s(["default",0,function({variant:e="employee"}){let a=(0,s.usePathname)();return"admin"===e?null:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(c,{}),(0,t.jsx)("div",{"aria-hidden":"true",className:"h-[calc(5.8rem+env(safe-area-inset-bottom))] shrink-0 md:hidden"}),(0,t.jsx)("nav",{className:"fixed bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] left-1/2 z-50 w-[calc(100%-2rem)] max-w-[35rem] -translate-x-1/2 md:hidden",children:(0,t.jsx)("div",{className:"bottom-nav-shell-in overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/90 px-2.5 py-2.5 shadow-2xl shadow-slate-400/25 backdrop-blur-2xl",children:(0,t.jsx)("div",{className:"grid w-full grid-cols-4 gap-1.5",children:o.map(e=>{var s;return(0,t.jsx)(m,{href:e.href,label:e.label,Icon:e.icon,active:"/beranda"===(s=e.href)?"/"===a||"/beranda"===a:"/history"===s?"/history"===a||a.startsWith("/history/"):a===s||a.startsWith(`${s}/`)},e.href)})})})})]})}])},20865,e=>{"use strict";let t=(0,e.i(56420).default)("map-pin",[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);e.s(["MapPin",0,t],20865)},66595,e=>{"use strict";let t=(0,e.i(56420).default)("search",[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]]);e.s(["Search",0,t],66595)},26441,e=>{"use strict";let t=(0,e.i(56420).default)("square-pen",[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",key:"1m0v6g"}],["path",{d:"M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",key:"ohrbg2"}]]);e.s(["Edit",0,t],26441)},73474,e=>{"use strict";let t=(0,e.i(56420).default)("trash-2",[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]]);e.s(["Trash2",0,t],73474)},77071,e=>{"use strict";let t=(0,e.i(56420).default)("plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);e.s(["Plus",0,t],77071)},14720,e=>{"use strict";var t=e.i(43476),a=e.i(71645),s=e.i(26441),i=e.i(32781),n=e.i(20865),r=e.i(7921),l=e.i(77071),o=e.i(66595),d=e.i(73474),c=e.i(63676),m=e.i(26564),u=e.i(84276),f=e.i(89168);let x={name:"",office_id:"",status:"active"},p=[{value:"all",label:"Semua Status"},{value:"active",label:"Status Aktif"},{value:"inactive",label:"Status Nonaktif"}];function h(e){return"active"===e?"Aktif":"inactive"===e?"Nonaktif":e}async function b(e){let t=await e.text();try{return t?JSON.parse(t):{}}catch{throw Error("Response API bukan JSON.")}}function v(){return(0,t.jsx)("style",{children:`
      @keyframes departmentEnter {
        0% {
          opacity: 0;
          transform: translateY(14px);
        }

        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes departmentRowEnter {
        0% {
          opacity: 0;
          transform: translateY(10px);
        }

        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes departmentModalBackdrop {
        0% {
          opacity: 0;
        }

        100% {
          opacity: 1;
        }
      }

      @keyframes departmentModalPanel {
        0% {
          opacity: 0;
          transform: translateY(16px) scale(0.985);
        }

        100% {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      .department-enter {
        animation: departmentEnter 320ms ease-out both;
      }

      .department-row-enter {
        opacity: 0;
        animation: departmentRowEnter 300ms ease-out both;
      }

      .department-modal-backdrop {
        animation: departmentModalBackdrop 180ms ease-out both;
      }

      .department-modal-panel {
        animation: departmentModalPanel 260ms ease-out both;
        transform-origin: center bottom;
      }

      .department-field {
        transition:
          border-color 180ms ease,
          background-color 180ms ease,
          box-shadow 180ms ease;
      }

      @media (prefers-reduced-motion: reduce) {
        .department-enter,
        .department-row-enter,
        .department-modal-backdrop,
        .department-modal-panel {
          animation: none !important;
          opacity: 1 !important;
          transform: none !important;
        }
      }
    `})}e.s(["default",0,function(){let[e,g]=(0,a.useState)([]),[j,y]=(0,a.useState)([]),[k,w]=(0,a.useState)(""),[N,D]=(0,a.useState)("all"),[_,S]=(0,a.useState)("all"),[E,C]=(0,a.useState)(x),[T,M]=(0,a.useState)(!0),[P,R]=(0,a.useState)(!1),[A,z]=(0,a.useState)(!1),[K,B]=(0,a.useState)(""),[L,O]=(0,a.useState)(!1),[Y,U]=(0,a.useState)(null),$=(0,a.useMemo)(()=>j.filter(e=>"inactive"!==e.status),[j]),H=(0,a.useMemo)(()=>{let t=k.toLowerCase().trim();return e.filter(e=>{let a=e.name.toLowerCase(),s=e.office?.name?.toLowerCase()||"",i=e.office?.address?.toLowerCase()||"",n=e.status.toLowerCase(),r=e.office_id||e.office?.id||"";return(!t||!!a.includes(t)||!!s.includes(t)||!!i.includes(t))&&("all"===N||n===N)&&("all"===_||("none"!==_||!r)&&("none"===_||r===_))&&!0})},[e,k,N,_]);async function G(){try{M(!0),B("");let e=new URLSearchParams({search:k,status:N,office_id:_}),t=await fetch(`/api/admin/departments?${e.toString()}`,{cache:"no-store"}),a=await b(t);if(!t.ok)throw Error(a.error||a.message||"Gagal mengambil divisi.");g(a.departments||a.data||[]),y(a.offices||[])}catch(e){console.error("LOAD_DEPARTMENTS_ERROR:",e),B(e instanceof Error?e.message:"Gagal mengambil data divisi.")}finally{M(!1)}}function I(){U(null),C(x),O(!1)}async function J(e){e.preventDefault();let t=E.name.trim();if(!E.office_id)return void alert("Kantor wajib dipilih.");if(!t)return void alert("Nama divisi wajib diisi.");if(!["active","inactive"].includes(E.status))return void alert("Status divisi tidak valid.");try{R(!0);let e=await fetch("/api/admin/departments",{method:Y?"PATCH":"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:Y?.id,name:t,office_id:E.office_id,status:E.status})}),a=await b(e);if(!e.ok)throw Error(a.error||a.message||"Gagal menyimpan divisi.");await G(),I()}catch(e){console.error("SAVE_DEPARTMENT_ERROR:",e),alert(e instanceof Error?e.message:"Gagal menyimpan divisi.")}finally{R(!1)}}async function F(e){let t=e._count?.users||0,a=e._count?.jabatans||0;if(t>0||a>0)return void alert("Divisi ini masih memiliki jabatan atau digunakan oleh karyawan. Ubah status menjadi Nonaktif jika tidak ingin digunakan.");if(window.confirm(`Yakin ingin menghapus divisi "${e.name}"? Data yang dihapus tidak bisa dikembalikan.`))try{z(!0);let t=await fetch(`/api/admin/departments?id=${e.id}`,{method:"DELETE"}),a=await b(t);if(!t.ok)throw Error(a.error||a.message||"Gagal menghapus divisi.");alert("Divisi berhasil dihapus."),await G()}catch(e){console.error("DELETE_DEPARTMENT_ERROR:",e),alert(e instanceof Error?e.message:"Gagal menghapus divisi.")}finally{z(!1)}}return(0,a.useEffect)(()=>{G()},[]),(0,t.jsxs)(f.default,{variant:"admin",children:[(0,t.jsx)(v,{}),(0,t.jsx)(m.default,{title:"Daftar Divisi",variant:"admin"}),(0,t.jsx)("section",{className:"mx-auto max-w-7xl space-y-6 px-5 py-6 pb-28 md:px-10 lg:px-16",children:(0,t.jsxs)("div",{className:"department-enter overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-xl shadow-slate-300/30",children:[(0,t.jsx)("div",{className:"bg-[#123c8c] p-6 text-white md:p-8",children:(0,t.jsxs)("div",{className:"flex flex-col gap-5 md:flex-row md:items-end md:justify-between",children:[(0,t.jsx)("div",{children:(0,t.jsx)("h1",{className:"mt-3 text-3xl font-black tracking-tight md:text-4xl",children:"Daftar Divisi"})}),(0,t.jsxs)("button",{type:"button",onClick:function(){U(null),C(x),O(!0)},className:"inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-white px-5 text-sm font-black text-[#123c8c] shadow-lg shadow-blue-950/20 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-50 active:scale-[0.98]",children:[(0,t.jsx)(l.Plus,{size:18}),"Tambah Divisi"]})]})}),(0,t.jsxs)("div",{className:"p-5 md:p-8",children:[(0,t.jsxs)("div",{className:"department-row-enter grid gap-3 md:grid-cols-[1fr_230px_210px_auto]",style:{animationDelay:"80ms"},children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"text-sm font-black text-slate-500",children:"Nama Divisi / Kantor"}),(0,t.jsxs)("div",{className:"relative mt-3",children:[(0,t.jsx)(o.Search,{size:20,className:"absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"}),(0,t.jsx)("input",{value:k,onChange:e=>w(e.target.value),placeholder:"Cari divisi atau kantor...",className:"department-field w-full rounded-2xl border border-blue-100 bg-[#f6f8ff] py-4 pl-12 pr-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#123c8c] focus:bg-white focus:ring-4 focus:ring-blue-100"})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"text-sm font-black text-slate-500",children:"Filter Kantor"}),(0,t.jsxs)("select",{value:_,onChange:e=>S(e.target.value),className:"department-field mt-3 w-full rounded-2xl border border-blue-100 bg-[#f6f8ff] px-4 py-4 text-sm font-black text-slate-700 outline-none transition focus:border-[#123c8c] focus:bg-white focus:ring-4 focus:ring-blue-100",children:[(0,t.jsx)("option",{value:"all",children:"Semua Kantor"}),(0,t.jsx)("option",{value:"none",children:"Tanpa Kantor"}),j.map(e=>(0,t.jsx)("option",{value:e.id,children:e.name},e.id))]})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"text-sm font-black text-slate-500",children:"Filter Status"}),(0,t.jsx)("select",{value:N,onChange:e=>D(e.target.value),className:"department-field mt-3 w-full rounded-2xl border border-blue-100 bg-[#f6f8ff] px-4 py-4 text-sm font-black text-slate-700 outline-none transition focus:border-[#123c8c] focus:bg-white focus:ring-4 focus:ring-blue-100",children:p.map(e=>(0,t.jsx)("option",{value:e.value,children:e.label},e.value))})]}),(0,t.jsx)("div",{className:"flex items-end gap-2",children:(0,t.jsx)("button",{type:"button",onClick:function(){w(""),D("all"),S("all")},className:"flex h-[54px] flex-1 items-center justify-center rounded-2xl border border-blue-100 bg-white px-5 text-sm font-black text-[#123c8c] shadow-sm transition hover:bg-blue-50 active:scale-[0.96] md:flex-none",children:"Atur Ulang"})})]}),K?(0,t.jsx)("div",{className:"department-row-enter mt-5 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-black text-red-700",children:K}):null,(0,t.jsxs)("div",{className:"department-row-enter mt-8 overflow-hidden rounded-2xl border border-blue-100",style:{animationDelay:"130ms"},children:[(0,t.jsxs)("div",{className:"hidden grid-cols-[0.3fr_1.3fr_1.2fr_0.75fr_0.75fr_1fr] bg-[#f6f8ff] px-5 py-4 text-xs font-black uppercase tracking-[0.18em] text-[#123c8c] md:grid",children:[(0,t.jsx)("p",{children:"#"}),(0,t.jsx)("p",{children:"Divisi"}),(0,t.jsx)("p",{children:"Kantor"}),(0,t.jsx)("p",{children:"Jabatan"}),(0,t.jsx)("p",{children:"Status"}),(0,t.jsx)("p",{className:"text-center",children:"Aksi"})]}),(0,t.jsx)("div",{className:"divide-y divide-blue-50 bg-white",children:T?(0,t.jsxs)("div",{className:"department-row-enter px-5 py-10 text-center",children:[(0,t.jsx)(i.Loader2,{className:"mx-auto h-8 w-8 animate-spin text-[#123c8c]"}),(0,t.jsx)("p",{className:"mt-3 text-sm font-black text-slate-600",children:"Mengambil data divisi..."})]}):0===H.length?(0,t.jsxs)("div",{className:"department-row-enter px-5 py-10 text-center",children:[(0,t.jsx)(r.Network,{className:"mx-auto text-slate-300",size:36}),(0,t.jsx)("p",{className:"mt-3 font-black text-slate-700",children:"Data divisi tidak ditemukan."}),(0,t.jsx)("p",{className:"mt-1 text-sm text-slate-400",children:"Tambahkan divisi baru atau ubah filter pencarian."})]}):H.map((e,a)=>(0,t.jsxs)("div",{className:"department-row-enter grid gap-4 px-4 py-4 text-sm transition duration-200 hover:bg-[#f8fbff] md:grid-cols-[0.3fr_1.3fr_1.2fr_0.75fr_0.75fr_1fr] md:items-center md:px-5 md:py-6",style:{animationDelay:`${55*a}ms`},children:[(0,t.jsxs)("div",{className:"flex items-start justify-between gap-3 md:block",children:[(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsx)("div",{className:"flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-[#eaf1ff] text-xs font-black text-[#123c8c] md:h-auto md:w-auto md:bg-transparent md:text-sm md:text-slate-500",children:a+1}),(0,t.jsxs)("div",{className:"md:hidden",children:[(0,t.jsx)("p",{className:"font-black uppercase text-slate-950",children:e.name}),(0,t.jsxs)("p",{className:"mt-1 text-xs font-semibold text-slate-400",children:[e.office?.name||"Tanpa Kantor"," •"," ",e._count?.jabatans||0," jabatan •"," ",e._count?.users||0," karyawan"]})]})]}),(0,t.jsx)("span",{className:`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-black md:hidden ${"active"===e.status?"bg-blue-50 text-[#123c8c]":"bg-slate-100 text-slate-600"}`,children:h(e.status)})]}),(0,t.jsxs)("div",{className:"hidden md:block",children:[(0,t.jsx)("p",{className:"font-black uppercase text-slate-950",children:e.name}),(0,t.jsxs)("p",{className:"mt-1 text-xs font-semibold text-slate-400",children:[e._count?.users||0," karyawan"]})]}),(0,t.jsxs)("div",{className:"rounded-2xl border border-blue-100 bg-[#f8fbff] p-3 md:border-0 md:bg-transparent md:p-0",children:[(0,t.jsx)("p",{className:"text-[11px] font-black uppercase tracking-[0.12em] text-slate-400 md:hidden",children:"Kantor"}),(0,t.jsx)("p",{className:"mt-1 font-black text-slate-600 md:mt-0",children:e.office?.name||"Tanpa Kantor"}),(0,t.jsx)("p",{className:"mt-1 line-clamp-1 text-xs font-semibold text-slate-400",children:e.office?.address||""})]}),(0,t.jsxs)("div",{className:"rounded-2xl border border-blue-100 bg-[#f8fbff] p-3 md:border-0 md:bg-transparent md:p-0",children:[(0,t.jsx)("p",{className:"text-[11px] font-black uppercase tracking-[0.12em] text-slate-400 md:hidden",children:"Jabatan"}),(0,t.jsx)("p",{className:"mt-1 font-black text-slate-600 md:mt-0",children:e._count?.jabatans||0})]}),(0,t.jsx)("div",{className:"hidden md:block",children:(0,t.jsx)("span",{className:`w-fit rounded-full px-4 py-2 text-xs font-black ${"active"===e.status?"bg-blue-50 text-[#123c8c]":"bg-slate-100 text-slate-600"}`,children:h(e.status)})}),(0,t.jsxs)("div",{className:"grid gap-2 md:flex md:justify-center",children:[(0,t.jsxs)("button",{type:"button",onClick:()=>{U(e),C({name:e.name,office_id:e.office_id||e.office?.id||"",status:e.status||"active"}),O(!0)},className:"inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#123c8c] px-4 text-sm font-black text-white shadow-lg shadow-blue-900/20 transition hover:bg-[#0f3274] active:scale-[0.97] md:h-auto md:w-fit md:rounded-xl md:border md:border-blue-100 md:bg-white md:px-4 md:py-2 md:text-xs md:text-[#123c8c] md:shadow-none md:hover:bg-[#eaf1ff]",children:[(0,t.jsx)(s.Edit,{size:16,className:"md:h-3.5 md:w-3.5"}),"Edit"]}),(0,t.jsxs)("button",{type:"button",onClick:()=>F(e),disabled:A||(e._count?.users||0)>0||(e._count?.jabatans||0)>0,className:"inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-red-100 bg-red-50 px-4 text-sm font-black text-red-600 transition hover:bg-red-100 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50 md:h-auto md:w-fit md:rounded-xl md:px-4 md:py-2 md:text-xs",children:[A?(0,t.jsx)(i.Loader2,{size:16,className:"animate-spin md:h-3.5 md:w-3.5"}):(0,t.jsx)(d.Trash2,{size:16,className:"md:h-3.5 md:w-3.5"}),"Hapus"]})]})]},e.id))})]})]})]})}),L?(0,t.jsx)("div",{className:"department-modal-backdrop fixed inset-0 z-[80] flex items-end justify-center bg-slate-950/50 px-4 pb-4 backdrop-blur-sm md:items-center md:pb-0",children:(0,t.jsxs)("div",{className:"department-modal-panel max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-[2rem] bg-white p-5 shadow-2xl shadow-slate-950/30 md:p-7",children:[(0,t.jsxs)("div",{className:"flex items-start justify-between gap-4",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-xs font-black uppercase tracking-[0.22em] text-[#123c8c]",children:Y?"Edit Divisi":"Tambah Divisi"}),(0,t.jsx)("h2",{className:"mt-2 text-2xl font-black text-slate-950",children:Y?"Update Data Divisi":"Divisi Baru"}),(0,t.jsx)("p",{className:"mt-1 text-sm text-slate-500",children:"Pilih kantor pemilik divisi, lalu isi nama divisi."})]}),(0,t.jsx)("button",{type:"button",onClick:I,className:"flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 transition hover:bg-slate-200 active:scale-[0.96]",children:(0,t.jsx)(c.X,{size:20})})]}),(0,t.jsxs)("form",{onSubmit:J,className:"mt-6 space-y-4",children:[(0,t.jsxs)("div",{className:"department-row-enter",children:[(0,t.jsx)("label",{className:"mb-2 block text-sm font-black text-slate-700",children:"Kantor"}),(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsx)(n.MapPin,{size:18,className:"absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"}),(0,t.jsxs)("select",{value:E.office_id,onChange:e=>C(t=>({...t,office_id:e.target.value})),className:"department-field w-full appearance-none rounded-2xl border border-blue-100 bg-[#f6f8ff] py-3 pl-11 pr-4 text-sm font-bold text-slate-700 outline-none transition focus:border-[#123c8c] focus:bg-white focus:ring-4 focus:ring-blue-100",children:[(0,t.jsx)("option",{value:"",children:"Pilih Kantor"}),$.map(e=>(0,t.jsxs)("option",{value:e.id,children:[e.name,e.address?` - ${e.address}`:""]},e.id))]})]})]}),(0,t.jsxs)("div",{className:"department-row-enter",style:{animationDelay:"40ms"},children:[(0,t.jsx)("label",{className:"mb-2 block text-sm font-black text-slate-700",children:"Nama Divisi"}),(0,t.jsx)("input",{value:E.name,onChange:e=>C(t=>({...t,name:e.target.value})),placeholder:"Contoh: Technology, Finance, HRD",className:"department-field w-full rounded-2xl border border-blue-100 bg-[#f6f8ff] px-4 py-3 text-sm font-bold text-slate-700 outline-none transition focus:border-[#123c8c] focus:bg-white focus:ring-4 focus:ring-blue-100"})]}),(0,t.jsxs)("div",{className:"department-row-enter",style:{animationDelay:"80ms"},children:[(0,t.jsx)("label",{className:"mb-2 block text-sm font-black text-slate-700",children:"Status Divisi"}),(0,t.jsxs)("select",{value:E.status,onChange:e=>C(t=>({...t,status:e.target.value})),className:"department-field w-full rounded-2xl border border-blue-100 bg-[#f6f8ff] px-4 py-3 text-sm font-bold text-slate-700 outline-none transition focus:border-[#123c8c] focus:bg-white focus:ring-4 focus:ring-blue-100",children:[(0,t.jsx)("option",{value:"active",children:"Aktif"}),(0,t.jsx)("option",{value:"inactive",children:"Nonaktif"})]}),(0,t.jsx)("p",{className:"mt-2 text-xs font-semibold text-slate-400",children:"Pilih Nonaktif jika divisi tidak digunakan sementara."})]}),(0,t.jsxs)("div",{className:"department-row-enter rounded-2xl border border-blue-100 bg-[#f6f8ff] p-4",style:{animationDelay:"120ms"},children:[(0,t.jsx)("p",{className:"text-sm font-black text-[#123c8c]",children:"Relasi Divisi"}),(0,t.jsx)("p",{className:"mt-1 text-sm leading-6 text-slate-500",children:"Divisi berada langsung di bawah kantor. Contoh: Kantor Pusat Bandung → Technology → Backend Development → Backend Developer."})]}),(0,t.jsxs)("div",{className:"department-row-enter flex flex-col-reverse gap-3 pt-2 md:flex-row md:justify-end",style:{animationDelay:"160ms"},children:[(0,t.jsx)("button",{type:"button",onClick:I,className:"rounded-2xl bg-slate-100 px-5 py-3 text-sm font-black text-slate-600 transition hover:bg-slate-200 active:scale-[0.98]",children:"Batal"}),(0,t.jsx)("button",{type:"submit",disabled:P,className:"rounded-2xl bg-[#123c8c] px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-900/20 transition hover:bg-[#0f3274] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60",children:P?"Menyimpan...":Y?"Update Divisi":"Tambah Divisi"})]})]})]})}):null,(0,t.jsx)(u.default,{variant:"admin"})]})}])}]);