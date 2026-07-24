(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,84276,e=>{"use strict";var t=e.i(43476),a=e.i(22016),n=e.i(18566),s=e.i(75153),l=e.i(94004),r=e.i(49817),i=e.i(65649);let o=[{href:"/beranda",label:"Beranda",icon:r.Home},{href:"/presensi",label:"Presensi",icon:s.CalendarCheck},{href:"/history",label:"Riwayat",icon:l.History},{href:"/profil",label:"Profil",icon:i.UserRound}];function c(...e){return e.filter(Boolean).join(" ")}function d(){return(0,t.jsx)("style",{children:`
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
    `})}function m({href:e,label:n,active:s,Icon:l}){return(0,t.jsxs)(a.default,{href:e,"aria-current":s?"page":void 0,className:c("relative flex h-[4.05rem] w-full min-w-0 flex-col items-center justify-center gap-1 rounded-[1.25rem] text-[11px] font-black transition-all duration-300 active:scale-[0.96]",s?"bg-[#123c8c] text-white shadow-xl shadow-blue-900/25":"text-slate-400 hover:bg-[#f6f8ff] hover:text-[#123c8c]"),children:[s?(0,t.jsx)("span",{className:"bottom-nav-active-bar absolute -top-1.5 h-1.5 w-11 rounded-full bg-blue-300"}):null,(0,t.jsx)("div",{className:c("flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition duration-300",s?"bottom-nav-icon-pop bg-white/15":"bg-transparent"),children:(0,t.jsx)(l,{size:24,strokeWidth:s?2.8:2.5,className:c("block shrink-0 transition duration-300",s?"text-white":"text-slate-400")})}),(0,t.jsx)("span",{className:"block max-w-full truncate leading-none",children:n})]})}e.s(["default",0,function({variant:e="employee"}){let a=(0,n.usePathname)();return"admin"===e?null:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(d,{}),(0,t.jsx)("div",{"aria-hidden":"true",className:"h-[calc(5.8rem+env(safe-area-inset-bottom))] shrink-0 md:hidden"}),(0,t.jsx)("nav",{className:"fixed bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] left-1/2 z-50 w-[calc(100%-2rem)] max-w-[35rem] -translate-x-1/2 md:hidden",children:(0,t.jsx)("div",{className:"bottom-nav-shell-in overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/90 px-2.5 py-2.5 shadow-2xl shadow-slate-400/25 backdrop-blur-2xl",children:(0,t.jsx)("div",{className:"grid w-full grid-cols-4 gap-1.5",children:o.map(e=>{var n;return(0,t.jsx)(m,{href:e.href,label:e.label,Icon:e.icon,active:"/beranda"===(n=e.href)?"/"===a||"/beranda"===a:"/history"===n?"/history"===a||a.startsWith("/history/"):a===n||a.startsWith(`${n}/`)},e.href)})})})})]})}])},26091,e=>{"use strict";let t=(0,e.i(56420).default)("file-text",[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]);e.s(["FileText",0,t],26091)},66595,e=>{"use strict";let t=(0,e.i(56420).default)("search",[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]]);e.s(["Search",0,t],66595)},73474,e=>{"use strict";let t=(0,e.i(56420).default)("trash-2",[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]]);e.s(["Trash2",0,t],73474)},26441,e=>{"use strict";let t=(0,e.i(56420).default)("square-pen",[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",key:"1m0v6g"}],["path",{d:"M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",key:"ohrbg2"}]]);e.s(["Edit",0,t],26441)},77071,e=>{"use strict";let t=(0,e.i(56420).default)("plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);e.s(["Plus",0,t],77071)},41120,e=>{"use strict";let t=(0,e.i(56420).default)("refresh-cw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);e.s(["RefreshCw",0,t],41120)},87589,e=>{"use strict";var t=e.i(43476),a=e.i(71645),n=e.i(26441),s=e.i(26091),l=e.i(65489);let r=(0,e.i(56420).default)("paperclip",[["path",{d:"m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551",key:"1miecu"}]]);var i=e.i(77071),o=e.i(41120),c=e.i(66595),d=e.i(73474),m=e.i(63676),u=e.i(26564),x=e.i(84276),h=e.i(89168);let f={title:"",content:"",status:"published",document:null,existingDocumentName:"",existingDocumentUrl:"",removeDocument:!1};function b(e){return!e||e<1?"":e>=1048576?`${(e/1048576).toFixed(1)} MB`:`${Math.max(1,Math.round(e/1024))} KB`}async function p(e){let t=await e.text();try{return t?JSON.parse(t):{}}catch{throw Error("Response API bukan JSON.")}}function g(){return(0,t.jsx)("style",{children:`
      @keyframes adminAnnouncementEnter {
        0% {
          opacity: 0;
          transform: translateY(14px);
        }

        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes adminAnnouncementModalBackdrop {
        0% {
          opacity: 0;
        }

        100% {
          opacity: 1;
        }
      }

      @keyframes adminAnnouncementModalPanel {
        0% {
          opacity: 0;
          transform: translateY(16px) scale(0.985);
        }

        100% {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      @keyframes adminAnnouncementRow {
        0% {
          opacity: 0;
          transform: translateY(10px);
        }

        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .admin-announcement-enter {
        animation: adminAnnouncementEnter 320ms ease-out both;
      }

      .admin-announcement-row-enter {
        opacity: 0;
        animation: adminAnnouncementRow 300ms ease-out both;
      }

      .admin-announcement-modal-backdrop {
        animation: adminAnnouncementModalBackdrop 180ms ease-out both;
      }

      .admin-announcement-modal-panel {
        animation: adminAnnouncementModalPanel 260ms ease-out both;
        transform-origin: center bottom;
      }

      .admin-announcement-field {
        transition:
          border-color 180ms ease,
          background-color 180ms ease,
          box-shadow 180ms ease;
      }

      @media (prefers-reduced-motion: reduce) {
        .admin-announcement-enter,
        .admin-announcement-row-enter,
        .admin-announcement-modal-backdrop,
        .admin-announcement-modal-panel {
          animation: none !important;
          opacity: 1 !important;
          transform: none !important;
        }
      }
    `})}e.s(["default",0,function(){let[e,v]=(0,a.useState)([]),[j,y]=(0,a.useState)(""),[w,N]=(0,a.useState)("all"),[k,D]=(0,a.useState)(!0),[P,C]=(0,a.useState)(!1),[M,E]=(0,a.useState)(""),[A,S]=(0,a.useState)(!1),[T,_]=(0,a.useState)(null),[z,R]=(0,a.useState)(f),U=(0,a.useCallback)(async()=>{try{D(!0),E("");let e=await fetch("/api/announcements?audience=admin",{cache:"no-store"}),t=await p(e);if(!e.ok)throw Error(t.error||t.message||"Gagal mengambil pengumuman.");v(t.announcements||t.data||[])}catch(e){E(e instanceof Error?e.message:"Gagal mengambil data pengumuman.")}finally{D(!1)}},[]);(0,a.useEffect)(()=>{U()},[U]);let F=(0,a.useMemo)(()=>e.filter(e=>{let t=j.toLowerCase().trim();return(!t||!!e.title.toLowerCase().includes(t)||!!e.content.toLowerCase().includes(t))&&("all"===w||e.status===w)}),[e,w,j]),B=e.filter(e=>"published"===e.status).length,H=e.filter(e=>"draft"===e.status).length,O=e.filter(e=>"archived"===e.status).length;function I(){_(null),R(f),S(!1)}async function Y(e){e.preventDefault();let t=z.title.trim(),a=z.content.trim();if(!t||!a)return void alert("Judul dan isi pengumuman wajib diisi.");try{C(!0);let e=new FormData;e.append("title",t),e.append("content",a),e.append("target","all"),e.append("status",z.status),T&&e.append("id",T),z.document&&e.append("document",z.document),z.removeDocument&&e.append("removeDocument","true");let n=await fetch("/api/announcements",{method:T?"PATCH":"POST",body:e}),s=await p(n);if(!n.ok)throw Error(s.error||s.message||"Gagal menyimpan pengumuman.");await U(),I()}catch(e){console.error("SAVE_ANNOUNCEMENT_ERROR:",e),alert(e instanceof Error?e.message:"Gagal menyimpan pengumuman.")}finally{C(!1)}}async function G(e){if(confirm("Yakin ingin menghapus pengumuman ini?"))try{let t=await fetch(`/api/announcements?id=${e}`,{method:"DELETE"}),a=await p(t);if(!t.ok)throw Error(a.error||a.message||"Gagal menghapus pengumuman.");await U()}catch(e){console.error("DELETE_ANNOUNCEMENT_ERROR:",e),alert(e instanceof Error?e.message:"Gagal menghapus pengumuman.")}}async function L(e,t){try{let a=await fetch("/api/announcements",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:e,target:"all",status:t})}),n=await p(a);if(!a.ok)throw Error(n.error||n.message||"Gagal mengubah status pengumuman.");await U()}catch(e){console.error("UPDATE_STATUS_ANNOUNCEMENT_ERROR:",e),alert(e instanceof Error?e.message:"Gagal mengubah status pengumuman.")}}return(0,t.jsxs)(h.default,{variant:"admin",children:[(0,t.jsx)(g,{}),(0,t.jsx)(u.default,{title:"Pengumuman",variant:"admin"}),(0,t.jsxs)("main",{className:"mx-auto max-w-7xl px-5 py-6 pb-28 md:px-10 lg:px-16",children:[(0,t.jsxs)("section",{className:"admin-announcement-enter relative overflow-hidden rounded-[2.2rem] bg-[#123c8c] p-6 text-white shadow-2xl shadow-blue-900/25 md:p-8",children:[(0,t.jsx)("div",{className:"absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"}),(0,t.jsx)("div",{className:"absolute -bottom-24 left-16 h-64 w-64 rounded-full bg-blue-300/20 blur-3xl"}),(0,t.jsxs)("div",{className:"relative z-10 flex flex-col gap-7 md:flex-row md:items-center md:justify-between",children:[(0,t.jsxs)("div",{children:[(0,t.jsxs)("div",{className:"inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-blue-100",children:[(0,t.jsx)(l.Megaphone,{size:15}),"Announcement Center"]}),(0,t.jsx)("h1",{className:"mt-5 text-3xl font-black tracking-tight md:text-4xl",children:"Pengumuman Admin"})]}),(0,t.jsxs)("button",{type:"button",onClick:function(){_(null),R(f),S(!0)},className:"inline-flex items-center justify-center gap-3 rounded-[1.6rem] bg-white px-6 py-4 text-sm font-black text-[#123c8c] shadow-2xl shadow-blue-950/20 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-50 active:scale-[0.98]",children:[(0,t.jsx)(i.Plus,{size:20,strokeWidth:3}),"Tambah Pengumuman"]})]})]}),(0,t.jsxs)("section",{className:"mt-6 grid gap-4 md:grid-cols-3",children:[(0,t.jsxs)("div",{className:"admin-announcement-row-enter rounded-[1.7rem] border border-emerald-100 bg-white/90 p-5 shadow-xl shadow-slate-300/30",style:{animationDelay:"70ms"},children:[(0,t.jsx)("p",{className:"text-sm font-bold text-slate-500",children:"Published"}),(0,t.jsx)("h3",{className:"mt-2 text-3xl font-black text-emerald-700",children:B})]}),(0,t.jsxs)("div",{className:"admin-announcement-row-enter rounded-[1.7rem] border border-amber-100 bg-white/90 p-5 shadow-xl shadow-slate-300/30",style:{animationDelay:"110ms"},children:[(0,t.jsx)("p",{className:"text-sm font-bold text-slate-500",children:"Draft"}),(0,t.jsx)("h3",{className:"mt-2 text-3xl font-black text-amber-700",children:H})]}),(0,t.jsxs)("div",{className:"admin-announcement-row-enter rounded-[1.7rem] border border-slate-100 bg-white/90 p-5 shadow-xl shadow-slate-300/30",style:{animationDelay:"150ms"},children:[(0,t.jsx)("p",{className:"text-sm font-bold text-slate-500",children:"Archived"}),(0,t.jsx)("h3",{className:"mt-2 text-3xl font-black text-slate-700",children:O})]})]}),(0,t.jsxs)("section",{className:"admin-announcement-enter mt-6 rounded-[2rem] border border-white/70 bg-white/90 p-5 shadow-xl shadow-slate-300/30 backdrop-blur-xl md:p-6",style:{animationDelay:"120ms"},children:[(0,t.jsxs)("div",{className:"flex flex-col gap-4",children:[(0,t.jsx)("div",{children:(0,t.jsx)("h2",{className:"text-xl font-black text-slate-950",children:"Daftar Pengumuman"})}),(0,t.jsxs)("div",{className:"grid gap-3 md:grid-cols-[1.5fr_0.8fr_auto]",children:[(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsx)(c.Search,{size:18,className:"absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"}),(0,t.jsx)("input",{value:j,onChange:e=>y(e.target.value),placeholder:"Cari pengumuman...",className:"admin-announcement-field w-full rounded-2xl border border-blue-100 bg-[#f6f8ff] py-3 pl-11 pr-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#123c8c] focus:bg-white focus:ring-4 focus:ring-blue-100"})]}),(0,t.jsxs)("select",{value:w,onChange:e=>N(e.target.value),className:"admin-announcement-field rounded-2xl border border-blue-100 bg-[#f6f8ff] px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#123c8c] focus:bg-white focus:ring-4 focus:ring-blue-100",children:[(0,t.jsx)("option",{value:"all",children:"Semua Status"}),(0,t.jsx)("option",{value:"published",children:"Published"}),(0,t.jsx)("option",{value:"draft",children:"Draft"}),(0,t.jsx)("option",{value:"archived",children:"Archived"})]}),(0,t.jsx)("button",{type:"button",onClick:function(){y(""),N("all")},className:"inline-flex h-[46px] items-center justify-center rounded-2xl border border-blue-100 bg-white px-4 text-[#123c8c] shadow-sm transition duration-200 hover:bg-[#eaf1ff] active:scale-[0.96]",title:"Atur Ulang Filter",children:(0,t.jsx)(o.RefreshCw,{size:20,strokeWidth:2.6})})]})]}),M?(0,t.jsx)("div",{className:"admin-announcement-row-enter mt-5 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-bold text-red-700",children:M}):null,(0,t.jsxs)("div",{className:"mt-6 overflow-hidden rounded-2xl border border-blue-100",children:[(0,t.jsxs)("div",{className:"hidden grid-cols-[1.2fr_1.7fr_1fr_0.8fr_1fr] bg-[#f6f8ff] px-5 py-4 text-xs font-black uppercase tracking-[0.16em] text-[#123c8c] md:grid",children:[(0,t.jsx)("p",{children:"Judul"}),(0,t.jsx)("p",{children:"Isi Pengumuman"}),(0,t.jsx)("p",{children:"Dokumen"}),(0,t.jsx)("p",{children:"Status"}),(0,t.jsx)("p",{className:"text-center",children:"Aksi"})]}),(0,t.jsx)("div",{className:"divide-y divide-blue-50 bg-white",children:k?(0,t.jsxs)("div",{className:"admin-announcement-row-enter px-5 py-10 text-center",children:[(0,t.jsx)(o.RefreshCw,{className:"mx-auto h-8 w-8 animate-spin text-[#123c8c]"}),(0,t.jsx)("p",{className:"mt-3 font-black text-slate-700",children:"Mengambil data pengumuman..."})]}):0===F.length?(0,t.jsxs)("div",{className:"admin-announcement-row-enter px-5 py-10 text-center",children:[(0,t.jsx)("p",{className:"font-black text-slate-700",children:"Pengumuman tidak ditemukan."}),(0,t.jsx)("p",{className:"mt-1 text-sm text-slate-400",children:"Coba ubah filter pencarian."})]}):F.map((e,a)=>{var l,r;return(0,t.jsxs)("div",{className:"admin-announcement-row-enter grid gap-4 px-5 py-5 text-sm transition duration-200 hover:bg-[#f8fbff] md:grid-cols-[1.2fr_1.7fr_1fr_0.8fr_1fr] md:items-center",style:{animationDelay:`${55*a}ms`},children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"font-black text-slate-950",children:e.title}),(0,t.jsx)("p",{className:"mt-1 text-xs font-semibold text-slate-400",children:(l=e.created_at)?new Intl.DateTimeFormat("id-ID",{day:"2-digit",month:"long",year:"numeric",hour:"2-digit",minute:"2-digit"}).format(new Date(l)):"-"})]}),(0,t.jsx)("p",{className:"line-clamp-2 font-semibold leading-6 text-slate-600",children:e.content}),e.document_url||e.documentUrl?(0,t.jsxs)("a",{href:e.document_url||e.documentUrl||"#",target:"_blank",rel:"noopener noreferrer",className:"inline-flex w-fit items-center gap-2 rounded-xl bg-blue-50 px-3 py-2 text-xs font-black text-[#123c8c] transition hover:bg-blue-100",children:[(0,t.jsx)(s.FileText,{size:14}),(0,t.jsxs)("span",{className:"min-w-0",children:[(0,t.jsx)("span",{className:"block max-w-[12rem] truncate",children:e.document_name||e.documentName||"Dokumen PDF"}),b(e.document_size||e.documentSize)?(0,t.jsx)("span",{className:"block text-[10px] font-bold text-blue-500",children:b(e.document_size||e.documentSize)}):null]})]}):(0,t.jsx)("span",{className:"text-xs font-bold text-slate-300",children:"Tidak ada"}),(0,t.jsx)("span",{className:`w-fit rounded-full px-3 py-1 text-xs font-black ${"published"===e.status?"bg-emerald-50 text-emerald-700":"draft"===e.status?"bg-amber-50 text-amber-700":"bg-slate-100 text-slate-600"}`,children:"published"===(r=e.status)?"Published":"archived"===r?"Archived":"Draft"}),(0,t.jsxs)("div",{className:"flex flex-wrap gap-2 md:justify-center",children:[(0,t.jsxs)("button",{type:"button",onClick:()=>{_(e.id),R({title:e.title,content:e.content,status:e.status,document:null,existingDocumentName:e.document_name||e.documentName||"",existingDocumentUrl:e.document_url||e.documentUrl||"",removeDocument:!1}),S(!0)},className:"inline-flex items-center justify-center gap-2 rounded-xl border border-blue-100 bg-white px-3 py-2 text-xs font-black text-[#123c8c] transition hover:bg-[#eaf1ff] active:scale-[0.97]",children:[(0,t.jsx)(n.Edit,{size:14}),"Edit"]}),"published"!==e.status&&(0,t.jsx)("button",{type:"button",onClick:()=>L(e.id,"published"),className:"rounded-xl bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-700 transition hover:bg-emerald-100 active:scale-[0.97]",children:"Publish"}),"archived"!==e.status&&(0,t.jsx)("button",{type:"button",onClick:()=>L(e.id,"archived"),className:"rounded-xl bg-slate-100 px-3 py-2 text-xs font-black text-slate-600 transition hover:bg-slate-200 active:scale-[0.97]",children:"Archive"}),(0,t.jsxs)("button",{type:"button",onClick:()=>G(e.id),className:"inline-flex items-center justify-center gap-2 rounded-xl bg-rose-50 px-3 py-2 text-xs font-black text-rose-600 transition hover:bg-rose-100 active:scale-[0.97]",children:[(0,t.jsx)(d.Trash2,{size:14}),"Hapus"]})]})]},e.id)})})]})]})]}),A&&(0,t.jsx)("div",{className:"admin-announcement-modal-backdrop fixed inset-0 z-[80] flex items-end justify-center bg-slate-950/50 px-4 pb-4 backdrop-blur-sm md:items-center md:pb-0",children:(0,t.jsxs)("div",{className:"admin-announcement-modal-panel max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] bg-white p-5 shadow-2xl shadow-slate-950/30 md:p-7",children:[(0,t.jsxs)("div",{className:"flex items-start justify-between gap-4",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-xs font-black uppercase tracking-[0.22em] text-[#123c8c]",children:T?"Edit Pengumuman":"Tambah Pengumuman"}),(0,t.jsx)("h2",{className:"mt-2 text-2xl font-black text-slate-950",children:T?"Edit Data Pengumuman":"Tambah Pengumuman Baru"}),(0,t.jsx)("p",{className:"mt-1 text-sm text-slate-500",children:"Pengumuman otomatis ditujukan untuk semua pengguna."})]}),(0,t.jsx)("button",{type:"button",onClick:I,className:"flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 transition hover:bg-slate-200 active:scale-[0.96]",children:(0,t.jsx)(m.X,{size:20})})]}),(0,t.jsxs)("form",{onSubmit:Y,className:"mt-6 space-y-4",children:[(0,t.jsxs)("div",{className:"admin-announcement-row-enter",children:[(0,t.jsx)("label",{className:"mb-2 block text-sm font-black text-slate-700",children:"Judul Pengumuman"}),(0,t.jsx)("input",{value:z.title,onChange:e=>R(t=>({...t,title:e.target.value})),placeholder:"Contoh: Pengingat Presensi Harian",className:"admin-announcement-field w-full rounded-2xl border border-blue-100 bg-[#f6f8ff] px-4 py-3 text-sm font-bold text-slate-700 outline-none transition focus:border-[#123c8c] focus:bg-white focus:ring-4 focus:ring-blue-100"})]}),(0,t.jsxs)("div",{className:"admin-announcement-row-enter",style:{animationDelay:"40ms"},children:[(0,t.jsx)("label",{className:"mb-2 block text-sm font-black text-slate-700",children:"Isi Pengumuman"}),(0,t.jsx)("textarea",{value:z.content,onChange:e=>R(t=>({...t,content:e.target.value})),rows:6,placeholder:"Tulis isi pemberitahuan...",className:"admin-announcement-field w-full resize-none rounded-2xl border border-blue-100 bg-[#f6f8ff] px-4 py-3 text-sm font-bold leading-6 text-slate-700 outline-none transition focus:border-[#123c8c] focus:bg-white focus:ring-4 focus:ring-blue-100"})]}),(0,t.jsxs)("div",{className:"admin-announcement-row-enter",style:{animationDelay:"80ms"},children:[(0,t.jsx)("label",{className:"mb-2 block text-sm font-black text-slate-700",children:"Status"}),(0,t.jsxs)("select",{value:z.status,onChange:e=>R(t=>({...t,status:e.target.value})),className:"admin-announcement-field w-full rounded-2xl border border-blue-100 bg-[#f6f8ff] px-4 py-3 text-sm font-bold text-slate-700 outline-none transition focus:border-[#123c8c] focus:bg-white focus:ring-4 focus:ring-blue-100",children:[(0,t.jsx)("option",{value:"published",children:"Published"}),(0,t.jsx)("option",{value:"draft",children:"Draft"}),(0,t.jsx)("option",{value:"archived",children:"Archived"})]})]}),(0,t.jsxs)("div",{className:"admin-announcement-row-enter",style:{animationDelay:"120ms"},children:[(0,t.jsx)("label",{className:"mb-2 block text-sm font-black text-slate-700",children:"Dokumen PDF"}),(0,t.jsxs)("label",{className:"admin-announcement-field flex cursor-pointer flex-col gap-3 rounded-2xl border border-dashed border-blue-200 bg-[#f6f8ff] px-4 py-4 text-sm font-bold text-slate-600 outline-none transition hover:border-[#123c8c] hover:bg-white hover:ring-4 hover:ring-blue-100 md:flex-row md:items-center md:justify-between",children:[(0,t.jsxs)("span",{className:"inline-flex min-w-0 items-center gap-3",children:[(0,t.jsx)("span",{className:"flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-[#123c8c] shadow-sm",children:(0,t.jsx)(r,{size:20,strokeWidth:2.6})}),(0,t.jsxs)("span",{className:"min-w-0",children:[(0,t.jsx)("span",{className:"block truncate text-slate-800",children:z.document?z.document.name:z.existingDocumentName?z.existingDocumentName:"Pilih dokumen PDF"}),(0,t.jsx)("span",{className:"mt-0.5 block text-xs font-semibold text-slate-400",children:"Maksimal 10MB, hanya PDF."})]})]}),(0,t.jsx)("span",{className:"rounded-xl bg-white px-3 py-2 text-xs font-black text-[#123c8c] shadow-sm",children:"Pilih File"}),(0,t.jsx)("input",{type:"file",accept:"application/pdf,.pdf",className:"sr-only",onChange:e=>{let t=e.target.files?.[0]||null;if(!t)return void R(e=>({...e,document:null}));if("application/pdf"!==t.type&&!t.name.toLowerCase().endsWith(".pdf")){alert("Dokumen pengumuman harus berformat PDF."),e.target.value="";return}if(t.size>0xa00000){alert("Ukuran dokumen PDF maksimal 10MB."),e.target.value="";return}R(e=>({...e,document:t,removeDocument:!1}))}})]}),z.existingDocumentUrl&&!z.document?(0,t.jsxs)("div",{className:"mt-3 flex flex-col gap-2 rounded-2xl border border-blue-100 bg-white p-3 text-xs font-bold text-slate-500 md:flex-row md:items-center md:justify-between",children:[(0,t.jsxs)("a",{href:z.existingDocumentUrl,target:"_blank",rel:"noopener noreferrer",className:"inline-flex min-w-0 items-center gap-2 text-[#123c8c] hover:text-[#0f3274]",children:[(0,t.jsx)(s.FileText,{size:15}),(0,t.jsx)("span",{className:"truncate",children:z.existingDocumentName||"Dokumen PDF"})]}),(0,t.jsx)("button",{type:"button",onClick:()=>R(e=>({...e,existingDocumentName:"",existingDocumentUrl:"",removeDocument:!0})),className:"w-fit rounded-xl bg-rose-50 px-3 py-2 font-black text-rose-600 transition hover:bg-rose-100 active:scale-[0.97]",children:"Hapus Dokumen"})]}):null]}),(0,t.jsxs)("div",{className:"admin-announcement-row-enter flex flex-col-reverse gap-3 pt-2 md:flex-row md:justify-end",style:{animationDelay:"160ms"},children:[(0,t.jsx)("button",{type:"button",onClick:I,className:"rounded-2xl bg-slate-100 px-5 py-3 text-sm font-black text-slate-600 transition hover:bg-slate-200 active:scale-[0.98]",children:"Batal"}),(0,t.jsx)("button",{type:"submit",disabled:P,className:"rounded-2xl bg-[#123c8c] px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-900/20 transition hover:bg-[#0f3274] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60",children:P?"Menyimpan...":T?"Update Pengumuman":"Simpan Pengumuman"})]})]})]})}),(0,t.jsx)(x.default,{variant:"admin"})]})}],87589)}]);