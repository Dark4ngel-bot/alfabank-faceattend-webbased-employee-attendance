module.exports=[87370,a=>{"use strict";var b=a.i(87924),c=a.i(72131),d=a.i(50944),e=a.i(38246),f=a.i(97546),g=a.i(19107),h=a.i(95304),i=a.i(13412),j=a.i(70115),k=a.i(64831);let l=(0,k.default)("external-link",[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]]);var m=a.i(51934),n=a.i(54098),o=a.i(81698),p=a.i(36273);let q=(0,k.default)("timer",[["line",{x1:"10",x2:"14",y1:"2",y2:"2",key:"14vaq8"}],["line",{x1:"12",x2:"15",y1:"14",y2:"11",key:"17fdiu"}],["circle",{cx:"12",cy:"14",r:"8",key:"1e1u0o"}]]);var r=a.i(38615),s=a.i(33751),t=a.i(89240);function u(a){if(!a||a<=0)return"0 menit";let b=Math.floor(a/60),c=a%60;return b>0&&c>0?`${b} jam ${c} menit`:b>0?`${b} jam`:`${c} menit`}function v(a){return String(a||"").trim()}function w(a){if(null==a||""===a)return null;let b=Number(a);return Number.isFinite(b)?b:null}function x(a){return a&&"object"==typeof a?a:null}function y(a,b){let c=x(a);return c?"lat"===b?w(c.latitude??c.lat):w(c.longitude??c.lng??c.lon):null}function z(a){let b=v(a.displayName)||v(a.display_name)||v(a.shortName)||v(a.short_name)||v(a.placeName)||v(a.place_name);return b?b:[v(a.name)||v(a.office)||v(a.company)||v(a.building)||v(a.amenity)||v(a.shop)||v(a.tourism),v(a.road)||v(a.pedestrian)||v(a.footway)||v(a.path),v(a.neighbourhood)||v(a.suburb)||v(a.village),v(a.city)||v(a.town)||v(a.county)||v(a.municipality)||v(a.state_district),v(a.state),v(a.postcode),v(a.country)].filter(Boolean).join(", ")}function A(){return(0,b.jsx)("style",{children:`
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
    `})}function B({label:a,value:c,description:d,icon:e,delay:f="0ms"}){return(0,b.jsx)("div",{className:"history-detail-row-enter rounded-3xl border border-blue-100 bg-white p-5 shadow-lg shadow-slate-200/50 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-300/40",style:{animationDelay:f},children:(0,b.jsxs)("div",{className:"flex items-center gap-4",children:[(0,b.jsx)("div",{className:"history-detail-icon-pop flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#eaf1ff] text-[#123c8c]",children:(0,b.jsx)(e,{size:22,strokeWidth:2.6})}),(0,b.jsxs)("div",{children:[(0,b.jsx)("p",{className:"text-xs font-black uppercase tracking-[0.2em] text-slate-400",children:a}),(0,b.jsx)("h3",{className:"mt-1 text-xl font-black text-slate-950",children:c}),(0,b.jsx)("p",{className:"mt-1 text-xs font-bold text-slate-500",children:d})]})]})})}function C({title:a,subtitle:c,imageUrl:d,isAvailable:e,delay:f="0ms"}){return(0,b.jsxs)("div",{className:"history-detail-row-enter overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-xl shadow-slate-200/60 transition duration-200 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-slate-300/40",style:{animationDelay:f},children:[(0,b.jsxs)("div",{className:"flex items-center justify-between gap-4 border-b border-blue-50 p-5",children:[(0,b.jsxs)("div",{className:"flex items-center gap-3",children:[(0,b.jsx)("div",{className:"history-detail-icon-pop flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eaf1ff] text-[#123c8c]",children:(0,b.jsx)(h.Camera,{size:23,strokeWidth:2.6})}),(0,b.jsxs)("div",{children:[(0,b.jsx)("p",{className:"text-xs font-black uppercase tracking-[0.2em] text-[#123c8c]",children:a}),(0,b.jsx)("h3",{className:"mt-1 text-lg font-black text-slate-950",children:c})]})]}),e?(0,b.jsx)("div",{className:"rounded-full bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-700 ring-1 ring-emerald-100",children:"Tersedia"}):(0,b.jsx)("div",{className:"rounded-full bg-slate-50 px-3 py-2 text-xs font-black text-slate-500 ring-1 ring-slate-100",children:"Kosong"})]}),(0,b.jsx)("div",{className:"p-5",children:e?(0,b.jsx)("div",{className:"overflow-hidden rounded-3xl bg-slate-100",children:(0,b.jsx)("img",{src:d,alt:c,className:"history-detail-image-enter h-80 w-full object-cover transition duration-300 hover:scale-[1.03]"})}):(0,b.jsxs)("div",{className:"flex h-80 flex-col items-center justify-center rounded-3xl border border-dashed border-blue-100 bg-[#f8fbff] p-6 text-center",children:[(0,b.jsx)("div",{className:"history-detail-icon-pop flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-slate-400 shadow-sm",children:(0,b.jsx)(m.ImageIcon,{size:30,strokeWidth:2.4})}),(0,b.jsx)("h4",{className:"mt-4 text-base font-black text-slate-700",children:"Foto belum tersedia"}),(0,b.jsx)("p",{className:"mt-2 max-w-xs text-sm font-semibold leading-6 text-slate-400",children:"Foto presensi belum tersimpan pada data ini."})]})})]})}function D({title:a,location:c,delay:d="0ms"}){let e,f,g=y(c,"lat"),h=y(c,"lng"),i=(e=x(c))?w(e.accuracy):null,j=(f=x(c))?w(f.distance):null,k=function(a){let b=x(a);if(!b)return null;let c=b.withinRadius??b.within_radius??b.check_in_within_radius??b.check_out_within_radius;return"boolean"==typeof c?c:null}(c),m=function(a){if(!a)return"";if("string"==typeof a)return a.trim();if("object"==typeof a){let b=z(a);if(b)return b;let c=function(a){let b=x(a);if(!b)return null;let c=b.address;return c?"string"==typeof c?{displayName:c}:"object"==typeof c?c:null:null}(a);if(c)return z(c)}return""}(c),p=null!==g&&null!==h,q=!!m,r=p?`https://www.google.com/maps?q=${g},${h}`:"#";return(0,b.jsxs)("div",{className:"history-detail-row-enter rounded-[2rem] border border-blue-100 bg-white p-5 shadow-xl shadow-slate-200/60 transition duration-200 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-slate-300/40",style:{animationDelay:d},children:[(0,b.jsxs)("div",{className:"flex items-start justify-between gap-4",children:[(0,b.jsxs)("div",{className:"flex items-center gap-3",children:[(0,b.jsx)("div",{className:"history-detail-icon-pop flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eaf1ff] text-[#123c8c]",children:(0,b.jsx)(n.MapPin,{size:23,strokeWidth:2.6})}),(0,b.jsxs)("div",{children:[(0,b.jsx)("p",{className:"text-xs font-black uppercase tracking-[0.2em] text-[#123c8c]",children:"Lokasi GPS"}),(0,b.jsx)("h3",{className:"mt-1 text-lg font-black text-slate-950",children:a})]})]}),null!==k?(0,b.jsx)("div",{className:`rounded-full px-3 py-2 text-xs font-black ring-1 ${k?"bg-emerald-50 text-emerald-700 ring-emerald-100":"bg-red-50 text-red-700 ring-red-100"}`,children:k?"Dalam radius":"Di luar radius"}):p||q?(0,b.jsx)("div",{className:"rounded-full bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-700 ring-1 ring-emerald-100",children:"Tersimpan"}):null]}),p||q?(0,b.jsxs)("div",{className:"mt-5",children:[(0,b.jsxs)("div",{className:"rounded-3xl bg-[#f8fbff] p-5 ring-1 ring-blue-50",children:[(0,b.jsx)("p",{className:"text-xs font-black uppercase tracking-[0.18em] text-slate-400",children:"Lokasi Tercatat"}),(0,b.jsx)("p",{className:"mt-2 break-words text-sm font-bold leading-6 text-slate-600",children:m||"Koordinat GPS presensi berhasil tercatat. Klik tombol di bawah untuk membuka titik lokasi pada Google Maps."}),(0,b.jsxs)("div",{className:"mt-4 flex flex-wrap gap-2",children:[null!==i?(0,b.jsxs)("span",{className:"rounded-full bg-white px-3 py-2 text-xs font-black text-slate-600 ring-1 ring-blue-100",children:["Akurasi: ±",Math.round(i)," meter"]}):null,null!==j?(0,b.jsxs)("span",{className:"rounded-full bg-white px-3 py-2 text-xs font-black text-slate-600 ring-1 ring-blue-100",children:["Jarak: ",Math.round(j)," meter"]}):null]})]}),p?(0,b.jsxs)("a",{href:r,target:"_blank",rel:"noreferrer",className:"mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#123c8c] px-5 py-4 text-sm font-black text-white shadow-lg shadow-blue-900/20 transition hover:-translate-y-0.5 hover:bg-[#0f3274] active:scale-[0.98]",children:[(0,b.jsx)(o.Navigation,{size:18,strokeWidth:2.6}),"Buka Lokasi di Google Maps",(0,b.jsx)(l,{size:16,strokeWidth:2.6})]}):null]}):(0,b.jsxs)("div",{className:"mt-5 flex min-h-52 flex-col items-center justify-center rounded-3xl border border-dashed border-blue-100 bg-[#f8fbff] p-6 text-center",children:[(0,b.jsx)("div",{className:"history-detail-icon-pop flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-slate-400 shadow-sm",children:(0,b.jsx)(n.MapPin,{size:30,strokeWidth:2.4})}),(0,b.jsx)("h4",{className:"mt-4 text-base font-black text-slate-700",children:"Lokasi belum tersedia"}),(0,b.jsx)("p",{className:"mt-2 max-w-xs text-sm font-semibold leading-6 text-slate-400",children:"Data lokasi belum tersimpan untuk presensi ini."})]})]})}function E(){return(0,b.jsxs)("div",{className:"space-y-5",children:[(0,b.jsx)("div",{className:"history-detail-enter h-44 animate-pulse rounded-[2rem] bg-white shadow-lg shadow-slate-200/60"}),(0,b.jsxs)("div",{className:"grid gap-5 lg:grid-cols-3",children:[(0,b.jsx)("div",{className:"history-detail-row-enter h-28 animate-pulse rounded-3xl bg-white shadow-lg shadow-slate-200/60",style:{animationDelay:"60ms"}}),(0,b.jsx)("div",{className:"history-detail-row-enter h-28 animate-pulse rounded-3xl bg-white shadow-lg shadow-slate-200/60",style:{animationDelay:"100ms"}}),(0,b.jsx)("div",{className:"history-detail-row-enter h-28 animate-pulse rounded-3xl bg-white shadow-lg shadow-slate-200/60",style:{animationDelay:"140ms"}})]}),(0,b.jsxs)("div",{className:"grid gap-5 lg:grid-cols-2",children:[(0,b.jsx)("div",{className:"history-detail-row-enter h-96 animate-pulse rounded-[2rem] bg-white shadow-lg shadow-slate-200/60",style:{animationDelay:"180ms"}}),(0,b.jsx)("div",{className:"history-detail-row-enter h-96 animate-pulse rounded-[2rem] bg-white shadow-lg shadow-slate-200/60",style:{animationDelay:"220ms"}})]})]})}a.s(["default",0,function(){let a,h=String((0,d.useParams)().id||""),[k,l]=(0,c.useState)(null),[m,n]=(0,c.useState)(!0);return(0,c.useEffect)(()=>{async function a(){try{n(!0);let a=await fetch(`/api/attendance/${h}`,{method:"GET",cache:"no-store"});if(!a.ok)return void l(null);let b=await a.json();l(b)}catch(a){console.error("Gagal mengambil detail presensi:",a),l(null)}finally{n(!1)}}h&&a()},[h]),(0,b.jsxs)(t.default,{variant:"employee",children:[(0,b.jsx)(A,{}),(0,b.jsx)(r.default,{title:"Detail Presensi",rightLabel:"Detail"}),(0,b.jsxs)("section",{className:"mx-auto max-w-7xl space-y-6 px-5 py-6 md:px-10 lg:px-16",children:[(0,b.jsxs)(e.default,{href:"/history",className:"history-detail-row-enter inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-[#123c8c] shadow-lg shadow-slate-200/60 transition hover:-translate-y-0.5 hover:bg-[#f8fbff] active:scale-[0.98]",children:[(0,b.jsx)(g.ArrowLeft,{size:18,strokeWidth:2.7}),"Kembali ke History"]}),m?(0,b.jsx)(E,{}):k?(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)("div",{className:"history-detail-enter relative overflow-hidden rounded-[2rem] bg-[#123c8c] p-6 text-white shadow-2xl shadow-blue-900/25 md:p-8",children:[(0,b.jsx)("div",{className:"history-detail-glow-float absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"}),(0,b.jsx)("div",{className:"history-detail-glow-float absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl"}),(0,b.jsxs)("div",{className:"relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between",children:[(0,b.jsxs)("div",{children:[(0,b.jsxs)("div",{className:"history-detail-row-enter inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-blue-100 ring-1 ring-white/15",children:[(0,b.jsx)(p.ShieldCheck,{size:16}),"Catatan Presensi"]}),(0,b.jsx)("h2",{className:"history-detail-row-enter mt-5 text-3xl font-black capitalize tracking-tight md:text-5xl",style:{animationDelay:"80ms"},children:k.date}),(0,b.jsx)("div",{className:`history-detail-row-enter mt-5 inline-flex rounded-full px-4 py-2 text-sm font-black ring-1 ${(a=String(k.status||"").toLowerCase()).includes("terlambat")?"bg-orange-50 text-orange-700 ring-orange-100":a.includes("cuti")?"bg-purple-50 text-purple-700 ring-purple-100":a.includes("sakit")?"bg-rose-50 text-rose-700 ring-rose-100":a.includes("tidak")?"bg-red-50 text-red-700 ring-red-100":"bg-emerald-50 text-emerald-700 ring-emerald-100"}`,style:{animationDelay:"120ms"},children:k.status})]}),(0,b.jsxs)("div",{className:"grid gap-3 sm:grid-cols-2",children:[(0,b.jsxs)("div",{className:"history-detail-row-enter rounded-3xl bg-white/10 p-5 ring-1 ring-white/15",style:{animationDelay:"160ms"},children:[(0,b.jsx)("p",{className:"text-xs font-black uppercase tracking-[0.2em] text-blue-100",children:"Check-in"}),(0,b.jsx)("p",{className:"mt-2 text-3xl font-black",children:k.checkIn})]}),(0,b.jsxs)("div",{className:"history-detail-row-enter rounded-3xl bg-white/10 p-5 ring-1 ring-white/15",style:{animationDelay:"200ms"},children:[(0,b.jsx)("p",{className:"text-xs font-black uppercase tracking-[0.2em] text-blue-100",children:"Check-out"}),(0,b.jsx)("p",{className:"mt-2 text-3xl font-black",children:k.checkOut})]})]})]})]}),(0,b.jsxs)("div",{className:"grid gap-5 md:grid-cols-3",children:[(0,b.jsx)(B,{label:"Waktu Kerja",value:u(k.workMinutes),description:"Total durasi kerja tercatat",icon:q,delay:"60ms"}),(0,b.jsx)(B,{label:"Terlambat",value:u(k.lateMinutes),description:"Keterlambatan check-in",icon:j.Clock3,delay:"100ms"}),(0,b.jsx)(B,{label:"Pulang Cepat",value:u(k.earlyLeaveMinutes),description:"Pulang lebih awal",icon:i.CheckCircle2,delay:"140ms"})]}),(0,b.jsxs)("div",{className:"grid gap-5 lg:grid-cols-2",children:[(0,b.jsx)(C,{title:"Foto Check-in",subtitle:"Foto presensi masuk",imageUrl:`/api/attendance/${k.id}/photo?type=check-in`,isAvailable:k.hasCheckInPhoto,delay:"180ms"}),(0,b.jsx)(C,{title:"Foto Check-out",subtitle:"Foto presensi pulang",imageUrl:`/api/attendance/${k.id}/photo?type=check-out`,isAvailable:k.hasCheckOutPhoto,delay:"220ms"})]}),(0,b.jsxs)("div",{className:"grid gap-5 lg:grid-cols-2",children:[(0,b.jsx)(D,{title:"Lokasi Check-in",location:k.checkInLocation,delay:"260ms"}),(0,b.jsx)(D,{title:"Lokasi Check-out",location:k.checkOutLocation,delay:"300ms"})]})]}):(0,b.jsxs)("div",{className:"history-detail-enter rounded-[2rem] border border-red-100 bg-white p-8 text-center shadow-xl shadow-slate-200/60",children:[(0,b.jsx)("div",{className:"history-detail-icon-pop mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-red-50 text-red-600",children:(0,b.jsx)(f.AlertCircle,{size:32,strokeWidth:2.5})}),(0,b.jsx)("h2",{className:"mt-5 text-2xl font-black text-slate-950",children:"Data presensi tidak ditemukan"}),(0,b.jsx)("p",{className:"mx-auto mt-2 max-w-md text-sm font-semibold leading-6 text-slate-500",children:"Data presensi ini tidak tersedia, sudah dihapus, atau tidak sesuai dengan akun yang sedang login."}),(0,b.jsx)(e.default,{href:"/history",className:"mt-6 inline-flex rounded-2xl bg-[#123c8c] px-5 py-4 text-sm font-black text-white transition hover:bg-[#0f3274] active:scale-[0.98]",children:"Kembali ke Riwayat"})]})]}),(0,b.jsx)(s.default,{})]})}],87370)}];

//# sourceMappingURL=src_app_history_%5Bid%5D_page_tsx_067s1zz._.js.map