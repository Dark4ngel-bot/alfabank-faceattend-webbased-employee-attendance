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
    `})}function l({href:a,label:d,active:e,Icon:f}){return(0,b.jsxs)(c.default,{href:a,"aria-current":e?"page":void 0,className:j("relative flex h-[4.05rem] w-full min-w-0 flex-col items-center justify-center gap-1 rounded-[1.25rem] text-[11px] font-black transition-all duration-300 active:scale-[0.96]",e?"bg-[#123c8c] text-white shadow-xl shadow-blue-900/25":"text-slate-400 hover:bg-[#f6f8ff] hover:text-[#123c8c]"),children:[e?(0,b.jsx)("span",{className:"bottom-nav-active-bar absolute -top-1.5 h-1.5 w-11 rounded-full bg-blue-300"}):null,(0,b.jsx)("div",{className:j("flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition duration-300",e?"bottom-nav-icon-pop bg-white/15":"bg-transparent"),children:(0,b.jsx)(f,{size:24,strokeWidth:e?2.8:2.5,className:j("block shrink-0 transition duration-300",e?"text-white":"text-slate-400")})}),(0,b.jsx)("span",{className:"block max-w-full truncate leading-none",children:d})]})}a.s(["default",0,function({variant:a="employee"}){let c=(0,d.usePathname)();return"admin"===a?null:(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(k,{}),(0,b.jsx)("div",{"aria-hidden":"true",className:"h-[calc(5.8rem+env(safe-area-inset-bottom))] shrink-0 md:hidden"}),(0,b.jsx)("nav",{className:"fixed bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] left-1/2 z-50 w-[calc(100%-2rem)] max-w-[35rem] -translate-x-1/2 md:hidden",children:(0,b.jsx)("div",{className:"bottom-nav-shell-in overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/90 px-2.5 py-2.5 shadow-2xl shadow-slate-400/25 backdrop-blur-2xl",children:(0,b.jsx)("div",{className:"grid w-full grid-cols-4 gap-1.5",children:i.map(a=>{var d;return(0,b.jsx)(l,{href:a.href,label:a.label,Icon:a.icon,active:"/beranda"===(d=a.href)?"/"===c||"/beranda"===c:"/history"===d?"/history"===c||c.startsWith("/history/"):c===d||c.startsWith(`${d}/`)},a.href)})})})})]})}])},19107,a=>{"use strict";let b=(0,a.i(64831).default)("arrow-left",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);a.s(["ArrowLeft",0,b],19107)},5750,a=>{"use strict";let b=(0,a.i(64831).default)("users-round",[["path",{d:"M18 21a8 8 0 0 0-16 0",key:"3ypg7q"}],["circle",{cx:"10",cy:"8",r:"5",key:"o932ke"}],["path",{d:"M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3",key:"10s06x"}]]);a.s(["UsersRound",0,b],5750)},54098,a=>{"use strict";let b=(0,a.i(64831).default)("map-pin",[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);a.s(["MapPin",0,b],54098)},12087,a=>{"use strict";let b=(0,a.i(64831).default)("briefcase-business",[["path",{d:"M12 12h.01",key:"1mp3jc"}],["path",{d:"M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2",key:"1ksdt3"}],["path",{d:"M22 13a18.15 18.15 0 0 1-20 0",key:"12hx5q"}],["rect",{width:"20",height:"14",x:"2",y:"6",rx:"2",key:"i6l2r4"}]]);a.s(["BriefcaseBusiness",0,b],12087)},36273,a=>{"use strict";let b=(0,a.i(64831).default)("shield-check",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);a.s(["ShieldCheck",0,b],36273)},41908,39157,49596,62591,a=>{"use strict";var b=a.i(64831);let c=(0,b.default)("badge-check",[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",key:"3c2336"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);a.s(["BadgeCheck",0,c],41908);let d=(0,b.default)("credit-card",[["rect",{width:"20",height:"14",x:"2",y:"5",rx:"2",key:"ynyp8z"}],["line",{x1:"2",x2:"22",y1:"10",y2:"10",key:"1b3vmo"}]]);a.s(["CreditCard",0,d],39157);let e=(0,b.default)("id-card",[["path",{d:"M16 10h2",key:"8sgtl7"}],["path",{d:"M16 14h2",key:"epxaof"}],["path",{d:"M6.17 15a3 3 0 0 1 5.66 0",key:"n6f512"}],["circle",{cx:"9",cy:"11",r:"2",key:"yxgjnd"}],["rect",{x:"2",y:"5",width:"20",height:"14",rx:"2",key:"qneu4z"}]]);a.s(["IdCard",0,e],49596);let f=(0,b.default)("mail",[["path",{d:"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",key:"132q7q"}],["rect",{x:"2",y:"4",width:"20",height:"16",rx:"2",key:"izxlao"}]]);a.s(["Mail",0,f],62591)},66491,a=>{"use strict";let b=(0,a.i(64831).default)("phone",[["path",{d:"M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",key:"9njp5v"}]]);a.s(["Phone",0,b],66491)},95600,a=>{"use strict";var b=a.i(87924),c=a.i(72131),d=a.i(50944),e=a.i(38246),f=a.i(19107),g=a.i(41908),h=a.i(12087),i=a.i(27377),j=a.i(53641),k=a.i(70115),l=a.i(39157),m=a.i(49596),n=a.i(75160),o=a.i(62591),p=a.i(54098),q=a.i(65913),r=a.i(66491),s=a.i(36273),t=a.i(87005),u=a.i(5750),v=a.i(38615),w=a.i(33751),x=a.i(89240);async function y(a){let b=await a.text();try{return b?JSON.parse(b):{}}catch{throw Error("Response API bukan JSON.")}}function z(a){return a?.name||"-"}function A(a){var b=a.profile_photo||a.profile_photo_url||a.photo_url||a.avatar_url||"";if(!b)return"";let c=b.trim();return c?c.startsWith("http://")||c.startsWith("https://")||c.startsWith("data:")||c.startsWith("/")?c:c.startsWith("uploads/")?`/${c}`:`/uploads/profiles/${c}`:""}function B(a){if(!a)return"-";let b=new Date(a);return Number.isNaN(b.getTime())?"-":new Intl.DateTimeFormat("id-ID",{timeZone:"Asia/Jakarta",day:"2-digit",month:"long",year:"numeric"}).format(b)}function C(a){return"active"===a?"Aktif":"Nonaktif"}function D(){return(0,b.jsx)("style",{children:`
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
    `})}function E({employee:a}){let[d,e]=(0,c.useState)(!1),f=A(a);return f&&!d?(0,b.jsx)("div",{className:"employee-detail-avatar-enter h-28 w-28 overflow-hidden rounded-[2rem] bg-white/15 ring-4 ring-white/20",children:(0,b.jsx)("img",{src:f,alt:`Foto profil ${a.name}`,className:"h-full w-full object-cover",onError:()=>e(!0)})}):(0,b.jsx)("div",{className:"employee-detail-avatar-enter flex h-28 w-28 items-center justify-center rounded-[2rem] bg-white/15 text-4xl font-black text-white ring-4 ring-white/20",children:a.name.split(" ").filter(Boolean).map(a=>a[0]).join("").slice(0,2).toUpperCase()||(0,b.jsx)(t.UserRound,{size:42})})}function F({icon:a,label:c,value:d,description:e,delay:f=0}){return(0,b.jsx)("div",{className:"employee-detail-card-enter rounded-[1.6rem] border border-blue-100 bg-white p-5 shadow-lg shadow-slate-200/50 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-300/40",style:{animationDelay:`${f}ms`},children:(0,b.jsxs)("div",{className:"flex items-start gap-4",children:[(0,b.jsx)("div",{className:"flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#eaf1ff] text-[#123c8c]",children:(0,b.jsx)(a,{size:23,strokeWidth:2.7})}),(0,b.jsxs)("div",{className:"min-w-0",children:[(0,b.jsx)("p",{className:"text-xs font-black uppercase tracking-[0.18em] text-slate-400",children:c}),(0,b.jsx)("p",{className:"mt-2 break-words text-base font-black text-slate-950",children:d||"-"}),e?(0,b.jsx)("p",{className:"mt-1 break-words text-sm font-semibold leading-6 text-slate-500",children:e}):null]})]})})}function G({title:a,subtitle:c}){return(0,b.jsxs)("div",{children:[(0,b.jsx)("p",{className:"text-xs font-black uppercase tracking-[0.22em] text-[#123c8c]",children:a}),(0,b.jsx)("h2",{className:"mt-2 text-2xl font-black text-slate-950",children:c})]})}a.s(["default",0,function(){let a,t,H=String((0,d.useParams)().id||""),[I,J]=(0,c.useState)(null),[K,L]=(0,c.useState)(!0),[M,N]=(0,c.useState)("");async function O(){try{L(!0),N("");let a=await fetch("/api/employees",{method:"GET",cache:"no-store"}),b=await y(a);if(!a.ok){J(null),N(b.message||"Gagal mengambil data karyawan.");return}let c=(b.employees||b.data||[]).find(a=>String(a.id)===H)||null;if(!c){J(null),N("Data karyawan tidak ditemukan.");return}J(c)}catch(a){console.error("LOAD_EMPLOYEE_DETAIL_ERROR:",a),J(null),N(a instanceof Error?a.message:"Terjadi kesalahan saat mengambil data karyawan.")}finally{L(!1)}}(0,c.useEffect)(()=>{H&&O()},[H]);let P=(0,c.useMemo)(()=>I?A(I):"",[I]);return(0,b.jsxs)(x.default,{variant:"admin",children:[(0,b.jsx)(D,{}),(0,b.jsx)(v.default,{title:"Profil Karyawan",subtitle:"Detail data employee untuk admin",variant:"admin"}),(0,b.jsxs)("main",{className:"mx-auto max-w-7xl px-5 py-6 pb-28 md:px-10 lg:px-16",children:[(0,b.jsxs)(e.default,{href:"/admin/employees",className:"employee-detail-enter inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-[#123c8c] shadow-sm ring-1 ring-blue-100 transition hover:bg-[#f8fbff] active:scale-[0.98]",children:[(0,b.jsx)(f.ArrowLeft,{size:18,strokeWidth:2.7}),"Kembali ke Karyawan"]}),K?(0,b.jsx)("div",{className:"employee-detail-enter mt-6 flex min-h-[360px] items-center justify-center rounded-[2rem] border border-blue-100 bg-white shadow-xl shadow-slate-200/50",children:(0,b.jsxs)("div",{className:"text-center",children:[(0,b.jsx)(n.Loader2,{className:"mx-auto h-8 w-8 animate-spin text-[#123c8c]"}),(0,b.jsx)("p",{className:"mt-3 text-sm font-black text-slate-600",children:"Mengambil data karyawan..."})]})}):M||!I?(0,b.jsx)("div",{className:"employee-detail-enter mt-6 rounded-[2rem] border border-red-100 bg-red-50 p-6 text-sm font-bold text-red-700",children:M||"Data karyawan tidak ditemukan."}):(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("section",{className:"employee-detail-enter mt-6 overflow-hidden rounded-[2.2rem] border border-blue-100 bg-white shadow-2xl shadow-slate-300/30",children:(0,b.jsxs)("div",{className:"grid lg:grid-cols-[0.82fr_1.18fr]",children:[(0,b.jsxs)("div",{className:"relative overflow-hidden bg-[#123c8c] p-7 text-white md:p-8",children:[(0,b.jsx)("div",{className:"absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"}),(0,b.jsx)("div",{className:"absolute -bottom-24 left-10 h-64 w-64 rounded-full bg-blue-300/20 blur-3xl"}),(0,b.jsxs)("div",{className:"relative z-10",children:[(0,b.jsx)(E,{employee:I}),(0,b.jsxs)("div",{className:"employee-detail-card-enter mt-6",style:{animationDelay:"80ms"},children:[(0,b.jsx)("p",{className:"text-xs font-black uppercase tracking-[0.24em] text-blue-100",children:"Profil Karyawan"}),(0,b.jsx)("h1",{className:"mt-2 break-words text-4xl font-black tracking-tight",children:I.name}),(0,b.jsx)("div",{className:"mt-4 flex flex-wrap gap-2",children:(0,b.jsx)("span",{className:`inline-flex rounded-full px-4 py-2 text-xs font-black ${"active"===I.status?"bg-emerald-50 text-emerald-700":"bg-slate-100 text-slate-600"}`,children:C(I.status)})}),P?(0,b.jsx)("p",{className:"mt-4 text-xs font-semibold text-blue-100",children:"Foto profil tersimpan pada akun karyawan."}):(0,b.jsx)("p",{className:"mt-4 text-xs font-semibold text-blue-100",children:"Karyawan belum memiliki foto profil."})]})]})]}),(0,b.jsxs)("div",{className:"grid gap-4 p-5 md:grid-cols-2 md:p-7",children:[(0,b.jsx)(F,{icon:o.Mail,label:"Email",value:I.email,description:"Email masuk karyawan",delay:80}),(0,b.jsx)(F,{icon:r.Phone,label:"Nomor Telepon",value:I.phone||"-",description:"Kontak pribadi karyawan",delay:120}),(0,b.jsx)(F,{icon:m.IdCard,label:"ID Karyawan",value:I.id,description:"ID unik akun di database",delay:160}),(0,b.jsx)(F,{icon:m.IdCard,label:"NIK",value:I.nik||"-",description:"Nomor Induk Kependudukan",delay:220}),(0,b.jsx)(F,{icon:l.CreditCard,label:"No Rekening",value:I.bank_account_number||"-",description:"Nomor rekening payroll karyawan",delay:240}),(0,b.jsx)(F,{icon:j.CalendarDays,label:"Tanggal Dibuat",value:B(I.created_at),description:"Tanggal akun employee didaftarkan",delay:260})]})]})}),(0,b.jsxs)("section",{className:"employee-detail-enter mt-6 rounded-[2rem] border border-blue-100 bg-white p-5 shadow-xl shadow-slate-300/30 md:p-6",style:{animationDelay:"120ms"},children:[(0,b.jsx)(G,{title:"Struktur Organisasi",subtitle:"Kantor, divisi, jabatan, posisi, dan shift"}),(0,b.jsxs)("div",{className:"mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3",children:[(0,b.jsx)(F,{icon:p.MapPin,label:"Kantor Terdaftar",value:z(I.registered_office),description:I.registered_office?.address||"-",delay:80}),(0,b.jsx)(F,{icon:q.Network,label:"Divisi",value:z(I.department),delay:120}),(0,b.jsx)(F,{icon:i.Building2,label:"Jabatan",value:z(I.jabatan),delay:160}),(0,b.jsx)(F,{icon:h.BriefcaseBusiness,label:"Posisi",value:z(I.position),delay:200}),(0,b.jsx)(F,{icon:k.Clock3,label:"Shift",value:z(I.shift),description:I.shift?.tolerance_minutes!==void 0?`Toleransi keterlambatan ${I.shift.tolerance_minutes} menit`:"Toleransi belum tersedia",delay:240}),(0,b.jsx)(F,{icon:s.ShieldCheck,label:"Status Akun",value:C(I.status),description:"active"===I.status?"Akun dapat digunakan untuk login dan presensi.":"Akun sedang nonaktif.",delay:280}),(0,b.jsx)(F,{icon:g.BadgeCheck,label:"Status Kepegawaian",value:I.employment_status||"-",description:"Data status kepegawaian dari profil karyawan",delay:320}),(0,b.jsx)(F,{icon:j.CalendarDays,label:"Masa Kerja",value:(a=B(I.employment_start_date),t=B(I.employment_end_date),"-"===a&&"-"===t?"-":"-"===a?`Sampai ${t}`:"-"===t?`Mulai ${a}`:`${a} - ${t}`),description:"Akun otomatis nonaktif setelah tanggal akhir lewat",delay:340}),(0,b.jsx)(F,{icon:p.MapPin,label:"Tempat Lahir",value:I.birth_place||"-",delay:380}),(0,b.jsx)(F,{icon:j.CalendarDays,label:"Tanggal Lahir",value:B(I.birth_date),delay:420})]})]}),(0,b.jsxs)("section",{className:"employee-detail-enter mt-6 rounded-[2rem] border border-blue-100 bg-white p-5 shadow-xl shadow-slate-300/30 md:p-6",style:{animationDelay:"160ms"},children:[(0,b.jsx)(G,{title:"Ringkasan",subtitle:"Informasi cepat karyawan"}),(0,b.jsxs)("div",{className:"mt-5 grid gap-4 md:grid-cols-3",children:[(0,b.jsxs)("div",{className:"employee-detail-card-enter rounded-[1.6rem] bg-[#f8fbff] p-5 ring-1 ring-blue-50 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/60",style:{animationDelay:"80ms"},children:[(0,b.jsx)("div",{className:"flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eaf1ff] text-[#123c8c]",children:(0,b.jsx)(u.UsersRound,{size:24,strokeWidth:2.7})}),(0,b.jsx)("p",{className:"mt-4 text-xs font-black uppercase tracking-[0.18em] text-slate-400",children:"Nama"}),(0,b.jsx)("p",{className:"mt-2 break-words text-lg font-black text-slate-950",children:I.name})]}),(0,b.jsxs)("div",{className:"employee-detail-card-enter rounded-[1.6rem] bg-[#f8fbff] p-5 ring-1 ring-blue-50 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/60",style:{animationDelay:"120ms"},children:[(0,b.jsx)("div",{className:"flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600",children:(0,b.jsx)(g.BadgeCheck,{size:24,strokeWidth:2.7})}),(0,b.jsx)("p",{className:"mt-4 text-xs font-black uppercase tracking-[0.18em] text-slate-400",children:"Akun"}),(0,b.jsx)("p",{className:"mt-2 text-lg font-black text-slate-950",children:C(I.status)})]}),(0,b.jsxs)("div",{className:"employee-detail-card-enter rounded-[1.6rem] bg-[#f8fbff] p-5 ring-1 ring-blue-50 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/60",style:{animationDelay:"160ms"},children:[(0,b.jsx)("div",{className:"flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eaf1ff] text-[#123c8c]",children:(0,b.jsx)(h.BriefcaseBusiness,{size:24,strokeWidth:2.7})}),(0,b.jsx)("p",{className:"mt-4 text-xs font-black uppercase tracking-[0.18em] text-slate-400",children:"Posisi"}),(0,b.jsx)("p",{className:"mt-2 break-words text-lg font-black text-slate-950",children:z(I.position)})]})]})]})]})]}),(0,b.jsx)(w.default,{variant:"admin"})]})}])}];

//# sourceMappingURL=_0byyibj._.js.map