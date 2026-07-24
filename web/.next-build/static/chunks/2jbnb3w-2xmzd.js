(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,51757,e=>{"use strict";let t=(0,e.i(56420).default)("circle-check",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);e.s(["CheckCircle2",0,t],51757)},11241,e=>{"use strict";let t=(0,e.i(56420).default)("arrow-left",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);e.s(["ArrowLeft",0,t],11241)},84276,e=>{"use strict";var t=e.i(43476),a=e.i(22016),s=e.i(18566),i=e.i(75153),l=e.i(94004),r=e.i(49817),n=e.i(65649);let o=[{href:"/beranda",label:"Beranda",icon:r.Home},{href:"/presensi",label:"Presensi",icon:i.CalendarCheck},{href:"/history",label:"Riwayat",icon:l.History},{href:"/profil",label:"Profil",icon:n.UserRound}];function d(...e){return e.filter(Boolean).join(" ")}function c(){return(0,t.jsx)("style",{children:`
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
    `})}function m({href:e,label:s,active:i,Icon:l}){return(0,t.jsxs)(a.default,{href:e,"aria-current":i?"page":void 0,className:d("relative flex h-[4.05rem] w-full min-w-0 flex-col items-center justify-center gap-1 rounded-[1.25rem] text-[11px] font-black transition-all duration-300 active:scale-[0.96]",i?"bg-[#123c8c] text-white shadow-xl shadow-blue-900/25":"text-slate-400 hover:bg-[#f6f8ff] hover:text-[#123c8c]"),children:[i?(0,t.jsx)("span",{className:"bottom-nav-active-bar absolute -top-1.5 h-1.5 w-11 rounded-full bg-blue-300"}):null,(0,t.jsx)("div",{className:d("flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition duration-300",i?"bottom-nav-icon-pop bg-white/15":"bg-transparent"),children:(0,t.jsx)(l,{size:24,strokeWidth:i?2.8:2.5,className:d("block shrink-0 transition duration-300",i?"text-white":"text-slate-400")})}),(0,t.jsx)("span",{className:"block max-w-full truncate leading-none",children:s})]})}e.s(["default",0,function({variant:e="employee"}){let a=(0,s.usePathname)();return"admin"===e?null:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(c,{}),(0,t.jsx)("div",{"aria-hidden":"true",className:"h-[calc(5.8rem+env(safe-area-inset-bottom))] shrink-0 md:hidden"}),(0,t.jsx)("nav",{className:"fixed bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] left-1/2 z-50 w-[calc(100%-2rem)] max-w-[35rem] -translate-x-1/2 md:hidden",children:(0,t.jsx)("div",{className:"bottom-nav-shell-in overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/90 px-2.5 py-2.5 shadow-2xl shadow-slate-400/25 backdrop-blur-2xl",children:(0,t.jsx)("div",{className:"grid w-full grid-cols-4 gap-1.5",children:o.map(e=>{var s;return(0,t.jsx)(m,{href:e.href,label:e.label,Icon:e.icon,active:"/beranda"===(s=e.href)?"/"===a||"/beranda"===a:"/history"===s?"/history"===a||a.startsWith("/history/"):a===s||a.startsWith(`${s}/`)},e.href)})})})})]})}])},20865,e=>{"use strict";let t=(0,e.i(56420).default)("map-pin",[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);e.s(["MapPin",0,t],20865)},84026,e=>{"use strict";let t=(0,e.i(56420).default)("shield-check",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);e.s(["ShieldCheck",0,t],84026)},99847,e=>{"use strict";let t=(0,e.i(56420).default)("circle-alert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);e.s(["AlertCircle",0,t],99847)},18515,e=>{"use strict";let t=(0,e.i(56420).default)("camera",[["path",{d:"M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z",key:"18u6gg"}],["circle",{cx:"12",cy:"13",r:"3",key:"1vg3eu"}]]);e.s(["Camera",0,t],18515)},75849,e=>{"use strict";let t=(0,e.i(56420).default)("image",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]]);e.s(["default",0,t])},70990,e=>{"use strict";var t=e.i(75849);e.s(["ImageIcon",()=>t.default])},78344,e=>{"use strict";let t=(0,e.i(56420).default)("navigation",[["polygon",{points:"3 11 22 2 13 21 11 13 3 11",key:"1ltx0t"}]]);e.s(["Navigation",0,t],78344)},29830,e=>{"use strict";var t=e.i(43476),a=e.i(71645),s=e.i(18566),i=e.i(22016),l=e.i(99847),r=e.i(11241),n=e.i(18515),o=e.i(51757),d=e.i(4729),c=e.i(56420);let m=(0,c.default)("external-link",[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]]);var h=e.i(70990),x=e.i(20865),u=e.i(78344),f=e.i(84026);let p=(0,c.default)("timer",[["line",{x1:"10",x2:"14",y1:"2",y2:"2",key:"14vaq8"}],["line",{x1:"12",x2:"15",y1:"14",y2:"11",key:"17fdiu"}],["circle",{cx:"12",cy:"14",r:"8",key:"1e1u0o"}]]);var y=e.i(26564),b=e.i(84276),g=e.i(89168);function w(e){if(!e||e<=0)return"0 menit";let t=Math.floor(e/60),a=e%60;return t>0&&a>0?`${t} jam ${a} menit`:t>0?`${t} jam`:`${a} menit`}function k(e){return String(e||"").trim()}function j(e){if(null==e||""===e)return null;let t=Number(e);return Number.isFinite(t)?t:null}function v(e){return e&&"object"==typeof e?e:null}function N(e,t){let a=v(e);return a?"lat"===t?j(a.latitude??a.lat):j(a.longitude??a.lng??a.lon):null}function C(e){let t=k(e.displayName)||k(e.display_name)||k(e.shortName)||k(e.short_name)||k(e.placeName)||k(e.place_name);return t?t:[k(e.name)||k(e.office)||k(e.company)||k(e.building)||k(e.amenity)||k(e.shop)||k(e.tourism),k(e.road)||k(e.pedestrian)||k(e.footway)||k(e.path),k(e.neighbourhood)||k(e.suburb)||k(e.village),k(e.city)||k(e.town)||k(e.county)||k(e.municipality)||k(e.state_district),k(e.state),k(e.postcode),k(e.country)].filter(Boolean).join(", ")}function D(){return(0,t.jsx)("style",{children:`
      @keyframes historyDetailEnter {
        0% {
          opacity: 0;
          transform: translateY(14px);
        }

        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes historyDetailRowEnter {
        0% {
          opacity: 0;
          transform: translateY(10px);
        }

        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes historyDetailIconPop {
        0% {
          opacity: 0;
          transform: scale(0.92) translateY(8px);
        }

        100% {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }

      @keyframes historyDetailGlowFloat {
        0%,
        100% {
          transform: translate3d(0, 0, 0) scale(1);
        }

        50% {
          transform: translate3d(12px, -10px, 0) scale(1.04);
        }
      }

      @keyframes historyDetailImageEnter {
        0% {
          opacity: 0;
          transform: scale(1.025);
        }

        100% {
          opacity: 1;
          transform: scale(1);
        }
      }

      .history-detail-enter {
        animation: historyDetailEnter 340ms ease-out both;
      }

      .history-detail-row-enter {
        opacity: 0;
        animation: historyDetailRowEnter 300ms ease-out both;
      }

      .history-detail-icon-pop {
        animation: historyDetailIconPop 280ms ease-out both;
      }

      .history-detail-glow-float {
        animation: historyDetailGlowFloat 6s ease-in-out infinite;
      }

      .history-detail-image-enter {
        animation: historyDetailImageEnter 420ms ease-out both;
      }

      @media (prefers-reduced-motion: reduce) {
        .history-detail-enter,
        .history-detail-row-enter,
        .history-detail-icon-pop,
        .history-detail-glow-float,
        .history-detail-image-enter {
          animation: none !important;
          opacity: 1 !important;
          transform: none !important;
        }
      }
    `})}function P({label:e,value:a,description:s,icon:i,delay:l="0ms"}){return(0,t.jsx)("div",{className:"history-detail-row-enter rounded-3xl border border-blue-100 bg-white p-5 shadow-lg shadow-slate-200/50 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-300/40",style:{animationDelay:l},children:(0,t.jsxs)("div",{className:"flex items-center gap-4",children:[(0,t.jsx)("div",{className:"history-detail-icon-pop flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#eaf1ff] text-[#123c8c]",children:(0,t.jsx)(i,{size:22,strokeWidth:2.6})}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-xs font-black uppercase tracking-[0.2em] text-slate-400",children:e}),(0,t.jsx)("h3",{className:"mt-1 text-xl font-black text-slate-950",children:a}),(0,t.jsx)("p",{className:"mt-1 text-xs font-bold text-slate-500",children:s})]})]})})}function z({title:e,subtitle:a,imageUrl:s,isAvailable:i,delay:l="0ms"}){return(0,t.jsxs)("div",{className:"history-detail-row-enter overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-xl shadow-slate-200/60 transition duration-200 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-slate-300/40",style:{animationDelay:l},children:[(0,t.jsxs)("div",{className:"flex items-center justify-between gap-4 border-b border-blue-50 p-5",children:[(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsx)("div",{className:"history-detail-icon-pop flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eaf1ff] text-[#123c8c]",children:(0,t.jsx)(n.Camera,{size:23,strokeWidth:2.6})}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-xs font-black uppercase tracking-[0.2em] text-[#123c8c]",children:e}),(0,t.jsx)("h3",{className:"mt-1 text-lg font-black text-slate-950",children:a})]})]}),i?(0,t.jsx)("div",{className:"rounded-full bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-700 ring-1 ring-emerald-100",children:"Tersedia"}):(0,t.jsx)("div",{className:"rounded-full bg-slate-50 px-3 py-2 text-xs font-black text-slate-500 ring-1 ring-slate-100",children:"Kosong"})]}),(0,t.jsx)("div",{className:"p-5",children:i?(0,t.jsx)("div",{className:"overflow-hidden rounded-3xl bg-slate-100",children:(0,t.jsx)("img",{src:s,alt:a,className:"history-detail-image-enter h-80 w-full object-cover transition duration-300 hover:scale-[1.03]"})}):(0,t.jsxs)("div",{className:"flex h-80 flex-col items-center justify-center rounded-3xl border border-dashed border-blue-100 bg-[#f8fbff] p-6 text-center",children:[(0,t.jsx)("div",{className:"history-detail-icon-pop flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-slate-400 shadow-sm",children:(0,t.jsx)(h.ImageIcon,{size:30,strokeWidth:2.4})}),(0,t.jsx)("h4",{className:"mt-4 text-base font-black text-slate-700",children:"Foto belum tersedia"}),(0,t.jsx)("p",{className:"mt-2 max-w-xs text-sm font-semibold leading-6 text-slate-400",children:"Foto presensi belum tersimpan pada data ini."})]})})]})}function M({title:e,location:a,delay:s="0ms"}){let i,l,r=N(a,"lat"),n=N(a,"lng"),o=(i=v(a))?j(i.accuracy):null,d=(l=v(a))?j(l.distance):null,c=function(e){let t=v(e);if(!t)return null;let a=t.withinRadius??t.within_radius??t.check_in_within_radius??t.check_out_within_radius;return"boolean"==typeof a?a:null}(a),h=function(e){if(!e)return"";if("string"==typeof e)return e.trim();if("object"==typeof e){let t=C(e);if(t)return t;let a=function(e){let t=v(e);if(!t)return null;let a=t.address;return a?"string"==typeof a?{displayName:a}:"object"==typeof a?a:null:null}(e);if(a)return C(a)}return""}(a),f=null!==r&&null!==n,p=!!h,y=f?`https://www.google.com/maps?q=${r},${n}`:"#";return(0,t.jsxs)("div",{className:"history-detail-row-enter rounded-[2rem] border border-blue-100 bg-white p-5 shadow-xl shadow-slate-200/60 transition duration-200 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-slate-300/40",style:{animationDelay:s},children:[(0,t.jsxs)("div",{className:"flex items-start justify-between gap-4",children:[(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsx)("div",{className:"history-detail-icon-pop flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eaf1ff] text-[#123c8c]",children:(0,t.jsx)(x.MapPin,{size:23,strokeWidth:2.6})}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-xs font-black uppercase tracking-[0.2em] text-[#123c8c]",children:"Lokasi GPS"}),(0,t.jsx)("h3",{className:"mt-1 text-lg font-black text-slate-950",children:e})]})]}),null!==c?(0,t.jsx)("div",{className:`rounded-full px-3 py-2 text-xs font-black ring-1 ${c?"bg-emerald-50 text-emerald-700 ring-emerald-100":"bg-red-50 text-red-700 ring-red-100"}`,children:c?"Dalam radius":"Di luar radius"}):f||p?(0,t.jsx)("div",{className:"rounded-full bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-700 ring-1 ring-emerald-100",children:"Tersimpan"}):null]}),f||p?(0,t.jsxs)("div",{className:"mt-5",children:[(0,t.jsxs)("div",{className:"rounded-3xl bg-[#f8fbff] p-5 ring-1 ring-blue-50",children:[(0,t.jsx)("p",{className:"text-xs font-black uppercase tracking-[0.18em] text-slate-400",children:"Lokasi Tercatat"}),(0,t.jsx)("p",{className:"mt-2 break-words text-sm font-bold leading-6 text-slate-600",children:h||"Koordinat GPS presensi berhasil tercatat. Klik tombol di bawah untuk membuka titik lokasi pada Google Maps."}),(0,t.jsxs)("div",{className:"mt-4 flex flex-wrap gap-2",children:[null!==o?(0,t.jsxs)("span",{className:"rounded-full bg-white px-3 py-2 text-xs font-black text-slate-600 ring-1 ring-blue-100",children:["Akurasi: ±",Math.round(o)," meter"]}):null,null!==d?(0,t.jsxs)("span",{className:"rounded-full bg-white px-3 py-2 text-xs font-black text-slate-600 ring-1 ring-blue-100",children:["Jarak: ",Math.round(d)," meter"]}):null]})]}),f?(0,t.jsxs)("a",{href:y,target:"_blank",rel:"noreferrer",className:"mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#123c8c] px-5 py-4 text-sm font-black text-white shadow-lg shadow-blue-900/20 transition hover:-translate-y-0.5 hover:bg-[#0f3274] active:scale-[0.98]",children:[(0,t.jsx)(u.Navigation,{size:18,strokeWidth:2.6}),"Buka Lokasi di Google Maps",(0,t.jsx)(m,{size:16,strokeWidth:2.6})]}):null]}):(0,t.jsxs)("div",{className:"mt-5 flex min-h-52 flex-col items-center justify-center rounded-3xl border border-dashed border-blue-100 bg-[#f8fbff] p-6 text-center",children:[(0,t.jsx)("div",{className:"history-detail-icon-pop flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-slate-400 shadow-sm",children:(0,t.jsx)(x.MapPin,{size:30,strokeWidth:2.4})}),(0,t.jsx)("h4",{className:"mt-4 text-base font-black text-slate-700",children:"Lokasi belum tersedia"}),(0,t.jsx)("p",{className:"mt-2 max-w-xs text-sm font-semibold leading-6 text-slate-400",children:"Data lokasi belum tersimpan untuk presensi ini."})]})]})}function I(){return(0,t.jsxs)("div",{className:"space-y-5",children:[(0,t.jsx)("div",{className:"history-detail-enter h-44 animate-pulse rounded-[2rem] bg-white shadow-lg shadow-slate-200/60"}),(0,t.jsxs)("div",{className:"grid gap-5 lg:grid-cols-3",children:[(0,t.jsx)("div",{className:"history-detail-row-enter h-28 animate-pulse rounded-3xl bg-white shadow-lg shadow-slate-200/60",style:{animationDelay:"60ms"}}),(0,t.jsx)("div",{className:"history-detail-row-enter h-28 animate-pulse rounded-3xl bg-white shadow-lg shadow-slate-200/60",style:{animationDelay:"100ms"}}),(0,t.jsx)("div",{className:"history-detail-row-enter h-28 animate-pulse rounded-3xl bg-white shadow-lg shadow-slate-200/60",style:{animationDelay:"140ms"}})]}),(0,t.jsxs)("div",{className:"grid gap-5 lg:grid-cols-2",children:[(0,t.jsx)("div",{className:"history-detail-row-enter h-96 animate-pulse rounded-[2rem] bg-white shadow-lg shadow-slate-200/60",style:{animationDelay:"180ms"}}),(0,t.jsx)("div",{className:"history-detail-row-enter h-96 animate-pulse rounded-[2rem] bg-white shadow-lg shadow-slate-200/60",style:{animationDelay:"220ms"}})]})]})}e.s(["default",0,function(){let e,n=String((0,s.useParams)().id||""),[c,m]=(0,a.useState)(null),[h,x]=(0,a.useState)(!0);return(0,a.useEffect)(()=>{async function e(){try{x(!0);let e=await fetch(`/api/attendance/${n}`,{method:"GET",cache:"no-store"});if(!e.ok)return void m(null);let t=await e.json();m(t)}catch(e){console.error("Gagal mengambil detail presensi:",e),m(null)}finally{x(!1)}}n&&e()},[n]),(0,t.jsxs)(g.default,{variant:"employee",children:[(0,t.jsx)(D,{}),(0,t.jsx)(y.default,{title:"Detail Presensi",rightLabel:"Detail"}),(0,t.jsxs)("section",{className:"mx-auto max-w-7xl space-y-6 px-5 py-6 md:px-10 lg:px-16",children:[(0,t.jsxs)(i.default,{href:"/history",className:"history-detail-row-enter inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-[#123c8c] shadow-lg shadow-slate-200/60 transition hover:-translate-y-0.5 hover:bg-[#f8fbff] active:scale-[0.98]",children:[(0,t.jsx)(r.ArrowLeft,{size:18,strokeWidth:2.7}),"Kembali ke History"]}),h?(0,t.jsx)(I,{}):c?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{className:"history-detail-enter relative overflow-hidden rounded-[2rem] bg-[#123c8c] p-6 text-white shadow-2xl shadow-blue-900/25 md:p-8",children:[(0,t.jsx)("div",{className:"history-detail-glow-float absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"}),(0,t.jsx)("div",{className:"history-detail-glow-float absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl"}),(0,t.jsxs)("div",{className:"relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between",children:[(0,t.jsxs)("div",{children:[(0,t.jsxs)("div",{className:"history-detail-row-enter inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-blue-100 ring-1 ring-white/15",children:[(0,t.jsx)(f.ShieldCheck,{size:16}),"Catatan Presensi"]}),(0,t.jsx)("h2",{className:"history-detail-row-enter mt-5 text-3xl font-black capitalize tracking-tight md:text-5xl",style:{animationDelay:"80ms"},children:c.date}),(0,t.jsx)("div",{className:`history-detail-row-enter mt-5 inline-flex rounded-full px-4 py-2 text-sm font-black ring-1 ${(e=String(c.status||"").toLowerCase()).includes("terlambat")?"bg-orange-50 text-orange-700 ring-orange-100":e.includes("cuti")?"bg-purple-50 text-purple-700 ring-purple-100":e.includes("sakit")?"bg-rose-50 text-rose-700 ring-rose-100":e.includes("tidak")?"bg-red-50 text-red-700 ring-red-100":"bg-emerald-50 text-emerald-700 ring-emerald-100"}`,style:{animationDelay:"120ms"},children:c.status})]}),(0,t.jsxs)("div",{className:"grid gap-3 sm:grid-cols-2",children:[(0,t.jsxs)("div",{className:"history-detail-row-enter rounded-3xl bg-white/10 p-5 ring-1 ring-white/15",style:{animationDelay:"160ms"},children:[(0,t.jsx)("p",{className:"text-xs font-black uppercase tracking-[0.2em] text-blue-100",children:"Check-in"}),(0,t.jsx)("p",{className:"mt-2 text-3xl font-black",children:c.checkIn})]}),(0,t.jsxs)("div",{className:"history-detail-row-enter rounded-3xl bg-white/10 p-5 ring-1 ring-white/15",style:{animationDelay:"200ms"},children:[(0,t.jsx)("p",{className:"text-xs font-black uppercase tracking-[0.2em] text-blue-100",children:"Check-out"}),(0,t.jsx)("p",{className:"mt-2 text-3xl font-black",children:c.checkOut})]})]})]})]}),(0,t.jsxs)("div",{className:"grid gap-5 md:grid-cols-3",children:[(0,t.jsx)(P,{label:"Waktu Kerja",value:w(c.workMinutes),description:"Total durasi kerja tercatat",icon:p,delay:"60ms"}),(0,t.jsx)(P,{label:"Terlambat",value:w(c.lateMinutes),description:"Keterlambatan check-in",icon:d.Clock3,delay:"100ms"}),(0,t.jsx)(P,{label:"Pulang Cepat",value:w(c.earlyLeaveMinutes),description:"Pulang lebih awal",icon:o.CheckCircle2,delay:"140ms"})]}),(0,t.jsxs)("div",{className:"grid gap-5 lg:grid-cols-2",children:[(0,t.jsx)(z,{title:"Foto Check-in",subtitle:"Foto presensi masuk",imageUrl:`/api/attendance/${c.id}/photo?type=check-in`,isAvailable:c.hasCheckInPhoto,delay:"180ms"}),(0,t.jsx)(z,{title:"Foto Check-out",subtitle:"Foto presensi pulang",imageUrl:`/api/attendance/${c.id}/photo?type=check-out`,isAvailable:c.hasCheckOutPhoto,delay:"220ms"})]}),(0,t.jsxs)("div",{className:"grid gap-5 lg:grid-cols-2",children:[(0,t.jsx)(M,{title:"Lokasi Check-in",location:c.checkInLocation,delay:"260ms"}),(0,t.jsx)(M,{title:"Lokasi Check-out",location:c.checkOutLocation,delay:"300ms"})]})]}):(0,t.jsxs)("div",{className:"history-detail-enter rounded-[2rem] border border-red-100 bg-white p-8 text-center shadow-xl shadow-slate-200/60",children:[(0,t.jsx)("div",{className:"history-detail-icon-pop mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-red-50 text-red-600",children:(0,t.jsx)(l.AlertCircle,{size:32,strokeWidth:2.5})}),(0,t.jsx)("h2",{className:"mt-5 text-2xl font-black text-slate-950",children:"Data presensi tidak ditemukan"}),(0,t.jsx)("p",{className:"mx-auto mt-2 max-w-md text-sm font-semibold leading-6 text-slate-500",children:"Data presensi ini tidak tersedia, sudah dihapus, atau tidak sesuai dengan akun yang sedang login."}),(0,t.jsx)(i.default,{href:"/history",className:"mt-6 inline-flex rounded-2xl bg-[#123c8c] px-5 py-4 text-sm font-black text-white transition hover:bg-[#0f3274] active:scale-[0.98]",children:"Kembali ke Riwayat"})]})]}),(0,t.jsx)(b.default,{})]})}],29830)}]);