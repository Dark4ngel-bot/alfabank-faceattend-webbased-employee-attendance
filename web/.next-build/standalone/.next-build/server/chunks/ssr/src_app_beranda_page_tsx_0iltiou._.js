module.exports=[45275,a=>{"use strict";var b=a.i(87924),c=a.i(72131),d=a.i(71133),e=a.i(38246),f=a.i(83900),g=a.i(14796),h=a.i(83138),i=a.i(24330),j=a.i(16683),k=a.i(59277),l=a.i(87005),m=a.i(38615),n=a.i(33751),o=a.i(89240),p=a.i(86860);let q={name:"",role:"",profile_photo:null,position:null,department:null,jabatan:null,shift:null},r={checkIn:"--:--",checkOut:"--:--",status:"Menunggu",description:"Menunggu presensi",schedule:""},s=[{href:"/history",label:"Laporan\nPresensi",description:"Riwayat kehadiran",icon:i.History},{href:"/presensi",label:"Presensi",description:"Check-in/out",icon:k.ScanFace},{href:"/profil",label:"Profil",description:"Data akun",icon:l.UserRound},{href:"/cuti",label:"Izin/Cuti",description:"Ajukan izin",icon:h.FileText}];function t(a){return a&&"--:--"!==a?a.replace(".",":"):"--:--"}async function u(a){let b=await a.text();try{return b?JSON.parse(b):{}}catch{throw Error("Response API bukan JSON.")}}async function v(a){try{let b=await fetch(a,{method:"GET",cache:"no-store"});if(!b.ok)return null;return await u(b)}catch(b){return console.error(`Gagal mengambil data ${a}:`,b),null}}function w(){return(0,b.jsx)("style",{children:`
      @keyframes homeEnter {
        0% {
          opacity: 0;
          transform: translateY(14px);
        }

        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes homeCardEnter {
        0% {
          opacity: 0;
          transform: translateY(12px) scale(0.985);
        }

        100% {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      @keyframes homeIconPop {
        0% {
          opacity: 0;
          transform: translateY(8px) scale(0.92);
        }

        100% {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      @keyframes homeTextReveal {
        0% {
          opacity: 0;
          transform: translateY(10px);
          filter: blur(4px);
        }

        100% {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0);
        }
      }

      @keyframes homePulseDot {
        0%,
        100% {
          transform: scale(1);
          opacity: 1;
        }

        50% {
          transform: scale(1.22);
          opacity: 0.72;
        }
      }

      @keyframes homeFloatGlow {
        0%,
        100% {
          transform: translate3d(0, 0, 0) scale(1);
        }

        50% {
          transform: translate3d(12px, -10px, 0) scale(1.05);
        }
      }

      .home-enter {
        animation: homeEnter 340ms ease-out both;
      }

      .home-card-enter {
        opacity: 0;
        animation: homeCardEnter 340ms ease-out both;
      }

      .home-icon-pop {
        animation: homeIconPop 300ms ease-out both;
      }

      .home-text-reveal {
        animation: homeTextReveal 380ms ease-out both;
      }

      .home-pulse-dot {
        animation: homePulseDot 1.45s ease-in-out infinite;
      }

      .home-float-glow {
        animation: homeFloatGlow 6s ease-in-out infinite;
      }

      @media (prefers-reduced-motion: reduce) {
        .home-enter,
        .home-card-enter,
        .home-icon-pop,
        .home-text-reveal,
        .home-pulse-dot,
        .home-float-glow {
          animation: none !important;
          opacity: 1 !important;
          transform: none !important;
          filter: none !important;
        }
      }
    `})}function x({user:a,size:c="mobile",variant:d="light"}){let e="desktop"===c?"h-24 w-24 text-2xl":"h-12 w-12 text-sm";return a.profile_photo?(0,b.jsx)("img",{src:a.profile_photo,alt:a.name||"Profil",className:`home-icon-pop ${e} shrink-0 rounded-full object-cover ${"desktop"===c?"ring-4 ring-white/70":"ring-4 ring-white"}`}):(0,b.jsx)("div",{className:`home-icon-pop ${e} flex shrink-0 items-center justify-center rounded-full font-black ${"blue"===d?"bg-white/15 text-white ring-4 ring-white/20":"bg-[#eaf1ff] text-[#123c8c] ring-4 ring-white"}`,children:a.name?a.name.split(" ").filter(Boolean).map(a=>a[0]).join("").slice(0,2).toUpperCase():""})}function y({href:a="/pengumuman",unread:c,desktop:d=!1,onClick:g}){return(0,b.jsxs)(e.default,{href:a,onClick:g,className:`home-icon-pop relative flex shrink-0 items-center justify-center rounded-2xl ring-1 transition hover:-translate-y-0.5 active:scale-[0.96] ${d?"h-16 w-16":"h-12 w-12"} ${c?d?"bg-white text-[#123c8c] ring-white":"bg-[#123c8c] text-white ring-[#123c8c]":d?"bg-white/10 text-white/70 ring-white/20":"bg-white text-slate-400 ring-blue-100"}`,"aria-label":"Pengumuman",children:[(0,b.jsx)(f.Bell,{size:d?28:24,fill:c?d?"#123c8c":"white":"transparent",strokeWidth:2.2}),c?(0,b.jsx)("span",{className:`home-pulse-dot absolute rounded-full bg-red-500 ring-2 ring-white ${d?"right-3 top-3 h-4 w-4":"right-2 top-2 h-3 w-3"}`}):null]})}function z(){return(0,b.jsx)("a",{href:"https://wa.me/6281234567890",target:"_blank",rel:"noopener noreferrer","aria-label":"Hubungi WhatsApp",className:"home-icon-pop flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 shadow-sm ring-1 ring-emerald-200 transition hover:-translate-y-0.5 hover:bg-emerald-100 active:scale-[0.96]",children:(0,b.jsx)(g.PhoneCall,{size:24,strokeWidth:2.7})})}function A({items:a}){return(0,b.jsx)("div",{className:"mt-4 flex flex-wrap gap-2",children:a.filter(Boolean).map((a,c)=>(0,b.jsx)("span",{className:"home-card-enter rounded-full bg-white/15 px-4 py-2 text-xs font-black text-white ring-1 ring-white/20",style:{animationDelay:`${55*c}ms`},children:a},a))})}function B(){return(0,b.jsx)("div",{className:"grid grid-cols-4 gap-x-2 gap-y-3 md:grid-cols-4 md:gap-5",children:s.map(({href:a,label:c,description:d,icon:f},g)=>(0,b.jsxs)(e.default,{href:a,className:"home-card-enter group flex flex-col items-center rounded-3xl text-center transition hover:-translate-y-0.5 active:scale-[0.98] md:border md:border-blue-100 md:bg-[#f8fbff] md:p-6 md:hover:-translate-y-1 md:hover:bg-white md:hover:shadow-xl md:hover:shadow-slate-200/60",style:{animationDelay:`${70*g}ms`},children:[(0,b.jsx)("div",{className:"flex h-14 w-14 items-center justify-center rounded-full bg-[#eaf1ff] transition group-hover:scale-105 md:h-20 md:w-20",children:(0,b.jsx)("div",{className:"flex h-10 w-10 items-center justify-center rounded-2xl bg-[#123c8c] text-white shadow-lg shadow-blue-900/20 transition group-hover:rotate-[-2deg] md:h-14 md:w-14",children:(0,b.jsx)(f,{size:22,strokeWidth:2.6})})}),(0,b.jsx)("p",{className:"mt-2 whitespace-pre-line text-[12px] font-bold leading-tight text-slate-600 md:mt-3 md:text-base",children:c}),(0,b.jsx)("p",{className:"mt-2 hidden text-sm leading-6 text-slate-400 md:block",children:d})]},a))})}function C({label:a,href:c,disabled:d,variant:f}){return(0,b.jsx)(e.default,{href:d?"#":c,onClick:a=>{d&&a.preventDefault()},className:`flex h-14 items-center justify-center rounded-2xl text-sm font-black transition md:h-20 md:text-lg ${d?"cursor-not-allowed border-slate-100 bg-slate-100 text-slate-300":"primary"===f?"bg-[#123c8c] text-white shadow-lg shadow-blue-900/20 hover:-translate-y-0.5 hover:bg-[#0f3274] active:scale-[0.98]":"border border-blue-100 bg-white text-[#123c8c] hover:-translate-y-0.5 hover:bg-[#eaf1ff] active:scale-[0.98]"}`,children:a})}function D({announcements:a,hasAnnouncement:c,onRead:d}){if(!c)return(0,b.jsx)("div",{className:"home-card-enter rounded-3xl border border-dashed border-blue-100 bg-white px-5 py-6 text-center shadow-sm md:py-14",children:(0,b.jsx)("p",{className:"text-sm font-bold text-slate-400 md:text-base",children:"Pengumuman Kosong"})});let f=a[0];return(0,b.jsxs)(e.default,{href:"/pengumuman",onClick:d,className:"home-card-enter block min-w-0 rounded-3xl border border-blue-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f8fbff] hover:shadow-xl hover:shadow-slate-200/60 active:scale-[0.99] md:p-5",children:[(0,b.jsxs)("div",{className:"mb-3 inline-flex items-center gap-2 rounded-full bg-[#eaf1ff] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-[#123c8c]",children:[(0,b.jsx)(j.Megaphone,{size:14}),"Pengumuman Terbaru"]}),(0,b.jsx)("p",{className:"line-clamp-2 break-words text-base font-black leading-6 text-slate-950 [overflow-wrap:anywhere] md:text-base",children:f.title}),f.content?(0,b.jsx)("p",{className:"mt-2 line-clamp-3 break-words text-sm font-semibold leading-6 text-slate-500 [overflow-wrap:anywhere] md:line-clamp-2",children:f.content}):null,f.document_url||f.documentUrl?(0,b.jsxs)("div",{className:"mt-3 inline-flex max-w-full items-center gap-2 rounded-2xl bg-[#eaf1ff] px-3 py-2 text-xs font-black text-[#123c8c]",children:[(0,b.jsx)(h.FileText,{size:14,strokeWidth:2.6}),(0,b.jsx)("span",{className:"truncate",children:f.document_name||f.documentName||"Dokumen PDF"})]}):null]})}a.s(["default",0,function(){var a;let[f,g]=(0,c.useState)(""),[h,i]=(0,c.useState)(""),[j,k]=(0,c.useState)(q),[l,s]=(0,c.useState)(r),[u,E]=(0,c.useState)([]),[F,G]=(0,c.useState)(null);(0,c.useEffect)(()=>{function a(){let a=new Date;g(`${new Intl.DateTimeFormat("id-ID",{timeZone:"Asia/Jakarta",hour:"2-digit",minute:"2-digit",hour12:!1}).format(a).replace(".",":")} WIB`),i(new Intl.DateTimeFormat("id-ID",{timeZone:"Asia/Jakarta",weekday:"long",day:"2-digit",month:"long",year:"numeric"}).format(a))}a();let b=setInterval(a,1e3);return()=>clearInterval(b)},[]),(0,c.useEffect)(()=>{},[]),(0,c.useEffect)(()=>{!async function(){let[a,b,c]=await Promise.all([v("/api/auth/me"),v("/api/attendance/today"),v("/api/announcements?audience=employee")]),d=a?.user||a?.data||a||{},e=b||{},f=c?.announcements||c?.data||[];k({id:d.id,name:d.name||"",email:d.email,role:d.role||"",profile_photo:d.profile_photo||null,position:d.position||null,department:d.department||null,jabatan:d.jabatan||null,shift:d.shift||null}),s({checkIn:t(e.checkIn||"--:--"),checkOut:t(e.checkOut||"--:--"),status:e.status||"Menunggu",description:e.description||"Menunggu presensi",schedule:e.schedule||e.workSchedule||e.shiftSchedule||""}),E(Array.isArray(f)?f:[])}()},[]);let H=j.name?(a=j.name).split(" ").filter(Boolean)[0]||a:"",I=u.length>0,J=u[0]?.id||"",K=!!J&&J!==F,L=(0,c.useMemo)(()=>j.position?.name||j.department?.name||"",[j.position?.name,j.department?.name]),M=(0,c.useMemo)(()=>j.shift?.name||j.position?.name||j.department?.name||"",[j.shift?.name,j.position?.name,j.department?.name]),N=(0,c.useMemo)(()=>l.schedule?`Jam kerja kamu pukul ${l.schedule}`:j.shift?.name?`Shift kamu: ${j.shift.name}`:"Jam kerja mengikuti shift yang terdaftar",[l.schedule,j.shift?.name]),O="--:--"!==l.checkIn,P="--:--"!==l.checkOut;function Q(){}return(0,b.jsxs)(o.default,{variant:"employee",withBottomPadding:!1,className:"bg-white md:bg-[#f6f8ff]",children:[(0,b.jsx)(w,{}),(0,b.jsxs)("div",{className:"min-h-dvh bg-white",children:[(0,b.jsx)("div",{className:"hidden md:block",children:(0,b.jsx)(m.default,{title:"Beranda",rightLabel:M||void 0,variant:"employee"})}),(0,b.jsxs)("main",{className:"min-h-dvh overflow-x-hidden bg-white text-slate-950 md:bg-gradient-to-br md:from-[#f6f8ff] md:via-white md:to-[#eef4ff] md:pb-28",children:[(0,b.jsx)("div",{className:"home-float-glow pointer-events-none fixed -left-32 top-24 hidden h-72 w-72 rounded-full bg-orange-200/20 blur-3xl md:block"}),(0,b.jsx)("div",{className:"home-float-glow pointer-events-none fixed -right-32 bottom-24 hidden h-72 w-72 rounded-full bg-blue-300/20 blur-3xl md:block"}),(0,b.jsx)("section",{className:"home-enter bg-white md:hidden",style:{paddingTop:"env(safe-area-inset-top, 0px)"},children:(0,b.jsxs)("div",{className:"mx-auto w-full max-w-7xl px-5 pt-6",children:[(0,b.jsxs)("div",{className:"flex items-center justify-between gap-4",children:[(0,b.jsxs)("div",{className:"flex min-w-0 items-center gap-3",children:[(0,b.jsx)("div",{className:"home-icon-pop flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white p-2 ring-1 ring-blue-100",children:(0,b.jsx)(d.default,{src:"/images/creativemu-logo/creativemu.png",alt:"Creativemu Logo",width:56,height:56,className:"h-full w-full object-contain",priority:!0})}),(0,b.jsx)(x,{user:j}),(0,b.jsxs)("div",{className:"min-w-0",children:[(0,b.jsx)("p",{className:"home-text-reveal text-[10px] font-black uppercase tracking-[0.24em] text-[#123c8c]",children:"FaceAttend"}),(0,b.jsx)("h1",{className:"home-text-reveal mt-1 truncate text-base font-black text-[#073456]",style:{animationDelay:"60ms"},children:j.name||"Memuat profil..."}),M?(0,b.jsx)("p",{className:"home-text-reveal truncate text-xs font-bold text-slate-500",style:{animationDelay:"100ms"},children:M}):null]})]}),(0,b.jsxs)("div",{className:"flex shrink-0 items-center gap-3",children:[(0,b.jsx)(z,{}),(0,b.jsx)(y,{unread:K,onClick:Q})]})]}),(0,b.jsxs)("div",{className:"py-7 text-center",children:[(0,b.jsx)("p",{className:"home-text-reveal text-xs font-black uppercase tracking-[0.24em] text-[#123c8c]",style:{animationDelay:"120ms"},children:"Selamat Datang"}),(0,b.jsx)("h2",{className:"home-text-reveal mt-3 text-4xl font-black tracking-tight text-[#073456]",style:{animationDelay:"170ms"},children:H?`Halo, ${H}`:"Memuat profil..."}),(0,b.jsx)("p",{className:"home-text-reveal mt-3 text-lg font-bold text-slate-500",style:{animationDelay:"220ms"},children:"Semoga harimu produktif."})]})]})}),(0,b.jsx)("section",{className:"mx-auto hidden max-w-7xl px-10 pt-8 md:block lg:px-16",children:(0,b.jsxs)("div",{className:"home-enter relative overflow-hidden rounded-[2.2rem] bg-[#123c8c] p-8 text-white shadow-2xl shadow-blue-900/25",children:[(0,b.jsx)("div",{className:"absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/10"}),(0,b.jsx)("div",{className:"absolute bottom-[-7rem] right-24 h-60 w-60 rounded-full bg-blue-300/10"}),(0,b.jsxs)("div",{className:"relative z-10 flex items-center justify-between gap-8",children:[(0,b.jsxs)("div",{className:"flex items-center gap-5",children:[(0,b.jsx)(x,{user:j,size:"desktop",variant:"blue"}),(0,b.jsxs)("div",{children:[(0,b.jsx)("h1",{className:"home-text-reveal text-4xl font-black tracking-tight",children:H?`Halo, ${H}`:"Memuat profil..."}),(0,b.jsx)(A,{items:[j.department?.name,j.jabatan?.name,L,j.shift?.name]})]})]}),(0,b.jsx)(y,{unread:K,desktop:!0,onClick:Q})]})]})}),(0,b.jsxs)("section",{className:"mx-auto w-full max-w-7xl bg-white px-5 pb-[8.5rem] pt-2 md:mt-8 md:rounded-[2.5rem] md:px-8 md:pb-10 md:pt-8 lg:px-10",children:[(0,b.jsx)("div",{className:"mb-6 md:mb-8",children:(0,b.jsx)(B,{})}),(0,b.jsx)(p.AppCard,{padding:"md",className:"home-card-enter rounded-[1.8rem] border-blue-100 bg-white p-5 shadow-sm transition hover:shadow-xl hover:shadow-slate-200/60 md:p-8",style:{animationDelay:"140ms"},children:(0,b.jsxs)("div",{className:"flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between",children:[(0,b.jsxs)("div",{children:[(0,b.jsxs)("div",{className:"flex items-center gap-2",children:[(0,b.jsx)("p",{className:"text-4xl font-black tracking-tight text-slate-950 md:text-6xl",children:f||"--:-- WIB"}),(0,b.jsx)("div",{className:"rounded-full bg-[#eaf1ff] px-3 py-1 text-xs font-black text-[#123c8c] md:px-3 md:py-1.5",children:"WIB"})]}),(0,b.jsx)("p",{className:"mt-3 text-sm font-bold text-slate-500 md:text-base",children:h||"Memuat tanggal..."}),(0,b.jsx)("p",{className:"mt-3 text-sm font-semibold text-slate-500 md:mt-5 md:text-lg",children:N}),(0,b.jsxs)("p",{className:"mt-1 text-sm font-semibold text-slate-500 md:mt-3 md:text-lg",children:["Status hari ini:"," ",(0,b.jsx)("span",{className:"font-black text-[#123c8c]",children:l.status})]})]}),(0,b.jsxs)("div",{className:"grid grid-cols-2 gap-3 lg:w-[460px]",children:[(0,b.jsx)(C,{label:"Masuk",href:"/presensi",disabled:O,variant:"primary"}),(0,b.jsx)(C,{label:"Keluar",href:"/presensi",disabled:!O||P,variant:"secondary"})]})]})}),(0,b.jsxs)("div",{className:"home-card-enter mt-7 flex items-center justify-between md:mt-14",style:{animationDelay:"180ms"},children:[(0,b.jsx)("div",{children:(0,b.jsx)("h2",{className:"text-2xl font-black text-slate-950 md:text-2xl",children:"Pengumuman"})}),(0,b.jsx)(e.default,{href:"/pengumuman",onClick:Q,className:"text-lg font-black text-[#123c8c] transition hover:text-[#0f3274] active:scale-[0.98] md:text-base",children:"Lihat Lainnya"})]}),(0,b.jsx)("div",{className:"mt-4 md:mt-6",children:(0,b.jsx)(D,{announcements:u,hasAnnouncement:I,onRead:Q})})]}),(0,b.jsx)(n.default,{})]})]})]})}])}];

//# sourceMappingURL=src_app_beranda_page_tsx_0iltiou._.js.map