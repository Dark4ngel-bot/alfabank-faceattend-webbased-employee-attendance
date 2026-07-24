(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,32781,e=>{"use strict";let a=(0,e.i(56420).default)("loader-circle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);e.s(["Loader2",0,a],32781)},84276,e=>{"use strict";var a=e.i(43476),t=e.i(22016),s=e.i(18566),r=e.i(75153),i=e.i(94004),l=e.i(49817),n=e.i(65649);let o=[{href:"/beranda",label:"Beranda",icon:l.Home},{href:"/presensi",label:"Presensi",icon:r.CalendarCheck},{href:"/history",label:"Riwayat",icon:i.History},{href:"/profil",label:"Profil",icon:n.UserRound}];function d(...e){return e.filter(Boolean).join(" ")}function c(){return(0,a.jsx)("style",{children:`
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
    `})}function m({href:e,label:s,active:r,Icon:i}){return(0,a.jsxs)(t.default,{href:e,"aria-current":r?"page":void 0,className:d("relative flex h-[4.05rem] w-full min-w-0 flex-col items-center justify-center gap-1 rounded-[1.25rem] text-[11px] font-black transition-all duration-300 active:scale-[0.96]",r?"bg-[#123c8c] text-white shadow-xl shadow-blue-900/25":"text-slate-400 hover:bg-[#f6f8ff] hover:text-[#123c8c]"),children:[r?(0,a.jsx)("span",{className:"bottom-nav-active-bar absolute -top-1.5 h-1.5 w-11 rounded-full bg-blue-300"}):null,(0,a.jsx)("div",{className:d("flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition duration-300",r?"bottom-nav-icon-pop bg-white/15":"bg-transparent"),children:(0,a.jsx)(i,{size:24,strokeWidth:r?2.8:2.5,className:d("block shrink-0 transition duration-300",r?"text-white":"text-slate-400")})}),(0,a.jsx)("span",{className:"block max-w-full truncate leading-none",children:s})]})}e.s(["default",0,function({variant:e="employee"}){let t=(0,s.usePathname)();return"admin"===e?null:(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(c,{}),(0,a.jsx)("div",{"aria-hidden":"true",className:"h-[calc(5.8rem+env(safe-area-inset-bottom))] shrink-0 md:hidden"}),(0,a.jsx)("nav",{className:"fixed bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] left-1/2 z-50 w-[calc(100%-2rem)] max-w-[35rem] -translate-x-1/2 md:hidden",children:(0,a.jsx)("div",{className:"bottom-nav-shell-in overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/90 px-2.5 py-2.5 shadow-2xl shadow-slate-400/25 backdrop-blur-2xl",children:(0,a.jsx)("div",{className:"grid w-full grid-cols-4 gap-1.5",children:o.map(e=>{var s;return(0,a.jsx)(m,{href:e.href,label:e.label,Icon:e.icon,active:"/beranda"===(s=e.href)?"/"===t||"/beranda"===t:"/history"===s?"/history"===t||t.startsWith("/history/"):t===s||t.startsWith(`${s}/`)},e.href)})})})})]})}])},11241,e=>{"use strict";let a=(0,e.i(56420).default)("arrow-left",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);e.s(["ArrowLeft",0,a],11241)},88771,e=>{"use strict";let a=(0,e.i(56420).default)("users-round",[["path",{d:"M18 21a8 8 0 0 0-16 0",key:"3ypg7q"}],["circle",{cx:"10",cy:"8",r:"5",key:"o932ke"}],["path",{d:"M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3",key:"10s06x"}]]);e.s(["UsersRound",0,a],88771)},20865,e=>{"use strict";let a=(0,e.i(56420).default)("map-pin",[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);e.s(["MapPin",0,a],20865)},82924,e=>{"use strict";let a=(0,e.i(56420).default)("briefcase-business",[["path",{d:"M12 12h.01",key:"1mp3jc"}],["path",{d:"M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2",key:"1ksdt3"}],["path",{d:"M22 13a18.15 18.15 0 0 1-20 0",key:"12hx5q"}],["rect",{width:"20",height:"14",x:"2",y:"6",rx:"2",key:"i6l2r4"}]]);e.s(["BriefcaseBusiness",0,a],82924)},84026,e=>{"use strict";let a=(0,e.i(56420).default)("shield-check",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);e.s(["ShieldCheck",0,a],84026)},91323,70387,41123,96315,e=>{"use strict";var a=e.i(56420);let t=(0,a.default)("badge-check",[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",key:"3c2336"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);e.s(["BadgeCheck",0,t],91323);let s=(0,a.default)("credit-card",[["rect",{width:"20",height:"14",x:"2",y:"5",rx:"2",key:"ynyp8z"}],["line",{x1:"2",x2:"22",y1:"10",y2:"10",key:"1b3vmo"}]]);e.s(["CreditCard",0,s],70387);let r=(0,a.default)("id-card",[["path",{d:"M16 10h2",key:"8sgtl7"}],["path",{d:"M16 14h2",key:"epxaof"}],["path",{d:"M6.17 15a3 3 0 0 1 5.66 0",key:"n6f512"}],["circle",{cx:"9",cy:"11",r:"2",key:"yxgjnd"}],["rect",{x:"2",y:"5",width:"20",height:"14",rx:"2",key:"qneu4z"}]]);e.s(["IdCard",0,r],41123);let i=(0,a.default)("mail",[["path",{d:"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",key:"132q7q"}],["rect",{x:"2",y:"4",width:"20",height:"16",rx:"2",key:"izxlao"}]]);e.s(["Mail",0,i],96315)},75387,e=>{"use strict";let a=(0,e.i(56420).default)("phone",[["path",{d:"M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",key:"9njp5v"}]]);e.s(["Phone",0,a],75387)},1755,e=>{"use strict";var a=e.i(43476),t=e.i(71645),s=e.i(18566),r=e.i(22016),i=e.i(11241),l=e.i(91323),n=e.i(82924),o=e.i(46387),d=e.i(29768),c=e.i(4729),m=e.i(70387),h=e.i(41123),u=e.i(32781),x=e.i(96315),p=e.i(20865),f=e.i(7921),b=e.i(75387),y=e.i(84026),k=e.i(65649),g=e.i(88771),v=e.i(26564),j=e.i(84276),w=e.i(89168);async function N(e){let a=await e.text();try{return a?JSON.parse(a):{}}catch{throw Error("Response API bukan JSON.")}}function D(e){return e?.name||"-"}function C(e){var a=e.profile_photo||e.profile_photo_url||e.photo_url||e.avatar_url||"";if(!a)return"";let t=a.trim();return t?t.startsWith("http://")||t.startsWith("https://")||t.startsWith("data:")||t.startsWith("/")?t:t.startsWith("uploads/")?`/${t}`:`/uploads/profiles/${t}`:""}function M(e){if(!e)return"-";let a=new Date(e);return Number.isNaN(a.getTime())?"-":new Intl.DateTimeFormat("id-ID",{timeZone:"Asia/Jakarta",day:"2-digit",month:"long",year:"numeric"}).format(a)}function _(e){return"active"===e?"Aktif":"Nonaktif"}function A(){return(0,a.jsx)("style",{children:`
      @keyframes employeeDetailEnter {
        0% {
          opacity: 0;
          transform: translateY(14px);
        }

        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes employeeDetailCardEnter {
        0% {
          opacity: 0;
          transform: translateY(10px);
        }

        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes employeeDetailAvatarEnter {
        0% {
          opacity: 0;
          transform: translateY(12px) scale(0.96);
        }

        100% {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      .employee-detail-enter {
        animation: employeeDetailEnter 320ms ease-out both;
      }

      .employee-detail-card-enter {
        opacity: 0;
        animation: employeeDetailCardEnter 300ms ease-out both;
      }

      .employee-detail-avatar-enter {
        animation: employeeDetailAvatarEnter 360ms ease-out both;
      }

      @media (prefers-reduced-motion: reduce) {
        .employee-detail-enter,
        .employee-detail-card-enter,
        .employee-detail-avatar-enter {
          animation: none !important;
          opacity: 1 !important;
          transform: none !important;
        }
      }
    `})}function P({employee:e}){let[s,r]=(0,t.useState)(!1),i=C(e);return i&&!s?(0,a.jsx)("div",{className:"employee-detail-avatar-enter h-28 w-28 overflow-hidden rounded-[2rem] bg-white/15 ring-4 ring-white/20",children:(0,a.jsx)("img",{src:i,alt:`Foto profil ${e.name}`,className:"h-full w-full object-cover",onError:()=>r(!0)})}):(0,a.jsx)("div",{className:"employee-detail-avatar-enter flex h-28 w-28 items-center justify-center rounded-[2rem] bg-white/15 text-4xl font-black text-white ring-4 ring-white/20",children:e.name.split(" ").filter(Boolean).map(e=>e[0]).join("").slice(0,2).toUpperCase()||(0,a.jsx)(k.UserRound,{size:42})})}function z({icon:e,label:t,value:s,description:r,delay:i=0}){return(0,a.jsx)("div",{className:"employee-detail-card-enter rounded-[1.6rem] border border-blue-100 bg-white p-5 shadow-lg shadow-slate-200/50 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-300/40",style:{animationDelay:`${i}ms`},children:(0,a.jsxs)("div",{className:"flex items-start gap-4",children:[(0,a.jsx)("div",{className:"flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#eaf1ff] text-[#123c8c]",children:(0,a.jsx)(e,{size:23,strokeWidth:2.7})}),(0,a.jsxs)("div",{className:"min-w-0",children:[(0,a.jsx)("p",{className:"text-xs font-black uppercase tracking-[0.18em] text-slate-400",children:t}),(0,a.jsx)("p",{className:"mt-2 break-words text-base font-black text-slate-950",children:s||"-"}),r?(0,a.jsx)("p",{className:"mt-1 break-words text-sm font-semibold leading-6 text-slate-500",children:r}):null]})]})})}function E({title:e,subtitle:t}){return(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-xs font-black uppercase tracking-[0.22em] text-[#123c8c]",children:e}),(0,a.jsx)("h2",{className:"mt-2 text-2xl font-black text-slate-950",children:t})]})}e.s(["default",0,function(){let e,k,S=String((0,s.useParams)().id||""),[B,I]=(0,t.useState)(null),[T,K]=(0,t.useState)(!0),[R,W]=(0,t.useState)("");async function $(){try{K(!0),W("");let e=await fetch("/api/employees",{method:"GET",cache:"no-store"}),a=await N(e);if(!e.ok){I(null),W(a.message||"Gagal mengambil data karyawan.");return}let t=(a.employees||a.data||[]).find(e=>String(e.id)===S)||null;if(!t){I(null),W("Data karyawan tidak ditemukan.");return}I(t)}catch(e){console.error("LOAD_EMPLOYEE_DETAIL_ERROR:",e),I(null),W(e instanceof Error?e.message:"Terjadi kesalahan saat mengambil data karyawan.")}finally{K(!1)}}(0,t.useEffect)(()=>{S&&$()},[S]);let L=(0,t.useMemo)(()=>B?C(B):"",[B]);return(0,a.jsxs)(w.default,{variant:"admin",children:[(0,a.jsx)(A,{}),(0,a.jsx)(v.default,{title:"Profil Karyawan",subtitle:"Detail data employee untuk admin",variant:"admin"}),(0,a.jsxs)("main",{className:"mx-auto max-w-7xl px-5 py-6 pb-28 md:px-10 lg:px-16",children:[(0,a.jsxs)(r.default,{href:"/admin/employees",className:"employee-detail-enter inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-[#123c8c] shadow-sm ring-1 ring-blue-100 transition hover:bg-[#f8fbff] active:scale-[0.98]",children:[(0,a.jsx)(i.ArrowLeft,{size:18,strokeWidth:2.7}),"Kembali ke Karyawan"]}),T?(0,a.jsx)("div",{className:"employee-detail-enter mt-6 flex min-h-[360px] items-center justify-center rounded-[2rem] border border-blue-100 bg-white shadow-xl shadow-slate-200/50",children:(0,a.jsxs)("div",{className:"text-center",children:[(0,a.jsx)(u.Loader2,{className:"mx-auto h-8 w-8 animate-spin text-[#123c8c]"}),(0,a.jsx)("p",{className:"mt-3 text-sm font-black text-slate-600",children:"Mengambil data karyawan..."})]})}):R||!B?(0,a.jsx)("div",{className:"employee-detail-enter mt-6 rounded-[2rem] border border-red-100 bg-red-50 p-6 text-sm font-bold text-red-700",children:R||"Data karyawan tidak ditemukan."}):(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("section",{className:"employee-detail-enter mt-6 overflow-hidden rounded-[2.2rem] border border-blue-100 bg-white shadow-2xl shadow-slate-300/30",children:(0,a.jsxs)("div",{className:"grid lg:grid-cols-[0.82fr_1.18fr]",children:[(0,a.jsxs)("div",{className:"relative overflow-hidden bg-[#123c8c] p-7 text-white md:p-8",children:[(0,a.jsx)("div",{className:"absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"}),(0,a.jsx)("div",{className:"absolute -bottom-24 left-10 h-64 w-64 rounded-full bg-blue-300/20 blur-3xl"}),(0,a.jsxs)("div",{className:"relative z-10",children:[(0,a.jsx)(P,{employee:B}),(0,a.jsxs)("div",{className:"employee-detail-card-enter mt-6",style:{animationDelay:"80ms"},children:[(0,a.jsx)("p",{className:"text-xs font-black uppercase tracking-[0.24em] text-blue-100",children:"Profil Karyawan"}),(0,a.jsx)("h1",{className:"mt-2 break-words text-4xl font-black tracking-tight",children:B.name}),(0,a.jsx)("div",{className:"mt-4 flex flex-wrap gap-2",children:(0,a.jsx)("span",{className:`inline-flex rounded-full px-4 py-2 text-xs font-black ${"active"===B.status?"bg-emerald-50 text-emerald-700":"bg-slate-100 text-slate-600"}`,children:_(B.status)})}),L?(0,a.jsx)("p",{className:"mt-4 text-xs font-semibold text-blue-100",children:"Foto profil tersimpan pada akun karyawan."}):(0,a.jsx)("p",{className:"mt-4 text-xs font-semibold text-blue-100",children:"Karyawan belum memiliki foto profil."})]})]})]}),(0,a.jsxs)("div",{className:"grid gap-4 p-5 md:grid-cols-2 md:p-7",children:[(0,a.jsx)(z,{icon:x.Mail,label:"Email",value:B.email,description:"Email masuk karyawan",delay:80}),(0,a.jsx)(z,{icon:b.Phone,label:"Nomor Telepon",value:B.phone||"-",description:"Kontak pribadi karyawan",delay:120}),(0,a.jsx)(z,{icon:h.IdCard,label:"ID Karyawan",value:B.id,description:"ID unik akun di database",delay:160}),(0,a.jsx)(z,{icon:h.IdCard,label:"NIK",value:B.nik||"-",description:"Nomor Induk Kependudukan",delay:220}),(0,a.jsx)(z,{icon:m.CreditCard,label:"No Rekening",value:B.bank_account_number||"-",description:"Nomor rekening payroll karyawan",delay:240}),(0,a.jsx)(z,{icon:d.CalendarDays,label:"Tanggal Dibuat",value:M(B.created_at),description:"Tanggal akun employee didaftarkan",delay:260})]})]})}),(0,a.jsxs)("section",{className:"employee-detail-enter mt-6 rounded-[2rem] border border-blue-100 bg-white p-5 shadow-xl shadow-slate-300/30 md:p-6",style:{animationDelay:"120ms"},children:[(0,a.jsx)(E,{title:"Struktur Organisasi",subtitle:"Kantor, divisi, jabatan, posisi, dan shift"}),(0,a.jsxs)("div",{className:"mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3",children:[(0,a.jsx)(z,{icon:p.MapPin,label:"Kantor Terdaftar",value:D(B.registered_office),description:B.registered_office?.address||"-",delay:80}),(0,a.jsx)(z,{icon:f.Network,label:"Divisi",value:D(B.department),delay:120}),(0,a.jsx)(z,{icon:o.Building2,label:"Jabatan",value:D(B.jabatan),delay:160}),(0,a.jsx)(z,{icon:n.BriefcaseBusiness,label:"Posisi",value:D(B.position),delay:200}),(0,a.jsx)(z,{icon:c.Clock3,label:"Shift",value:D(B.shift),description:B.shift?.tolerance_minutes!==void 0?`Toleransi keterlambatan ${B.shift.tolerance_minutes} menit`:"Toleransi belum tersedia",delay:240}),(0,a.jsx)(z,{icon:y.ShieldCheck,label:"Status Akun",value:_(B.status),description:"active"===B.status?"Akun dapat digunakan untuk login dan presensi.":"Akun sedang nonaktif.",delay:280}),(0,a.jsx)(z,{icon:l.BadgeCheck,label:"Status Kepegawaian",value:B.employment_status||"-",description:"Data status kepegawaian dari profil karyawan",delay:320}),(0,a.jsx)(z,{icon:d.CalendarDays,label:"Masa Kerja",value:(e=M(B.employment_start_date),k=M(B.employment_end_date),"-"===e&&"-"===k?"-":"-"===e?`Sampai ${k}`:"-"===k?`Mulai ${e}`:`${e} - ${k}`),description:"Akun otomatis nonaktif setelah tanggal akhir lewat",delay:340}),(0,a.jsx)(z,{icon:p.MapPin,label:"Tempat Lahir",value:B.birth_place||"-",delay:380}),(0,a.jsx)(z,{icon:d.CalendarDays,label:"Tanggal Lahir",value:M(B.birth_date),delay:420})]})]}),(0,a.jsxs)("section",{className:"employee-detail-enter mt-6 rounded-[2rem] border border-blue-100 bg-white p-5 shadow-xl shadow-slate-300/30 md:p-6",style:{animationDelay:"160ms"},children:[(0,a.jsx)(E,{title:"Ringkasan",subtitle:"Informasi cepat karyawan"}),(0,a.jsxs)("div",{className:"mt-5 grid gap-4 md:grid-cols-3",children:[(0,a.jsxs)("div",{className:"employee-detail-card-enter rounded-[1.6rem] bg-[#f8fbff] p-5 ring-1 ring-blue-50 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/60",style:{animationDelay:"80ms"},children:[(0,a.jsx)("div",{className:"flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eaf1ff] text-[#123c8c]",children:(0,a.jsx)(g.UsersRound,{size:24,strokeWidth:2.7})}),(0,a.jsx)("p",{className:"mt-4 text-xs font-black uppercase tracking-[0.18em] text-slate-400",children:"Nama"}),(0,a.jsx)("p",{className:"mt-2 break-words text-lg font-black text-slate-950",children:B.name})]}),(0,a.jsxs)("div",{className:"employee-detail-card-enter rounded-[1.6rem] bg-[#f8fbff] p-5 ring-1 ring-blue-50 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/60",style:{animationDelay:"120ms"},children:[(0,a.jsx)("div",{className:"flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600",children:(0,a.jsx)(l.BadgeCheck,{size:24,strokeWidth:2.7})}),(0,a.jsx)("p",{className:"mt-4 text-xs font-black uppercase tracking-[0.18em] text-slate-400",children:"Akun"}),(0,a.jsx)("p",{className:"mt-2 text-lg font-black text-slate-950",children:_(B.status)})]}),(0,a.jsxs)("div",{className:"employee-detail-card-enter rounded-[1.6rem] bg-[#f8fbff] p-5 ring-1 ring-blue-50 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/60",style:{animationDelay:"160ms"},children:[(0,a.jsx)("div",{className:"flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eaf1ff] text-[#123c8c]",children:(0,a.jsx)(n.BriefcaseBusiness,{size:24,strokeWidth:2.7})}),(0,a.jsx)("p",{className:"mt-4 text-xs font-black uppercase tracking-[0.18em] text-slate-400",children:"Posisi"}),(0,a.jsx)("p",{className:"mt-2 break-words text-lg font-black text-slate-950",children:D(B.position)})]})]})]})]})]}),(0,a.jsx)(j.default,{variant:"admin"})]})}])}]);