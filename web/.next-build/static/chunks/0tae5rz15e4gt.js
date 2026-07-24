(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,32781,e=>{"use strict";let t=(0,e.i(56420).default)("loader-circle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);e.s(["Loader2",0,t],32781)},84276,e=>{"use strict";var t=e.i(43476),a=e.i(22016),s=e.i(18566),i=e.i(75153),r=e.i(94004),l=e.i(49817),n=e.i(65649);let c=[{href:"/beranda",label:"Beranda",icon:l.Home},{href:"/presensi",label:"Presensi",icon:i.CalendarCheck},{href:"/history",label:"Riwayat",icon:r.History},{href:"/profil",label:"Profil",icon:n.UserRound}];function o(...e){return e.filter(Boolean).join(" ")}function d(){return(0,t.jsx)("style",{children:`
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
    `})}function m({href:e,label:s,active:i,Icon:r}){return(0,t.jsxs)(a.default,{href:e,"aria-current":i?"page":void 0,className:o("relative flex h-[4.05rem] w-full min-w-0 flex-col items-center justify-center gap-1 rounded-[1.25rem] text-[11px] font-black transition-all duration-300 active:scale-[0.96]",i?"bg-[#123c8c] text-white shadow-xl shadow-blue-900/25":"text-slate-400 hover:bg-[#f6f8ff] hover:text-[#123c8c]"),children:[i?(0,t.jsx)("span",{className:"bottom-nav-active-bar absolute -top-1.5 h-1.5 w-11 rounded-full bg-blue-300"}):null,(0,t.jsx)("div",{className:o("flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition duration-300",i?"bottom-nav-icon-pop bg-white/15":"bg-transparent"),children:(0,t.jsx)(r,{size:24,strokeWidth:i?2.8:2.5,className:o("block shrink-0 transition duration-300",i?"text-white":"text-slate-400")})}),(0,t.jsx)("span",{className:"block max-w-full truncate leading-none",children:s})]})}e.s(["default",0,function({variant:e="employee"}){let a=(0,s.usePathname)();return"admin"===e?null:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(d,{}),(0,t.jsx)("div",{"aria-hidden":"true",className:"h-[calc(5.8rem+env(safe-area-inset-bottom))] shrink-0 md:hidden"}),(0,t.jsx)("nav",{className:"fixed bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] left-1/2 z-50 w-[calc(100%-2rem)] max-w-[35rem] -translate-x-1/2 md:hidden",children:(0,t.jsx)("div",{className:"bottom-nav-shell-in overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/90 px-2.5 py-2.5 shadow-2xl shadow-slate-400/25 backdrop-blur-2xl",children:(0,t.jsx)("div",{className:"grid w-full grid-cols-4 gap-1.5",children:c.map(e=>{var s;return(0,t.jsx)(m,{href:e.href,label:e.label,Icon:e.icon,active:"/beranda"===(s=e.href)?"/"===a||"/beranda"===a:"/history"===s?"/history"===a||a.startsWith("/history/"):a===s||a.startsWith(`${s}/`)},e.href)})})})})]})}])},51757,e=>{"use strict";let t=(0,e.i(56420).default)("circle-check",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);e.s(["CheckCircle2",0,t],51757)},56522,e=>{"use strict";let t=(0,e.i(56420).default)("save",[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]]);e.s(["Save",0,t],56522)},44944,e=>{"use strict";let t=(0,e.i(56420).default)("power",[["path",{d:"M12 2v10",key:"mnfbl"}],["path",{d:"M18.4 6.6a9 9 0 1 1-12.77.04",key:"obofu9"}]]);e.s(["Power",0,t],44944)},22999,e=>{"use strict";var t=e.i(43476),a=e.i(71645),s=e.i(29768),i=e.i(51757),r=e.i(4729),l=e.i(32781),n=e.i(44944),c=e.i(56522),o=e.i(26564),d=e.i(84276),m=e.i(89168);let h=["MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY","SUNDAY"],u={MONDAY:"Senin",TUESDAY:"Selasa",WEDNESDAY:"Rabu",THURSDAY:"Kamis",FRIDAY:"Jumat",SATURDAY:"Sabtu",SUNDAY:"Minggu"};function f(e,t){let a=String(e||"").replace(".",":").trim();return/^\d{2}:\d{2}$/.test(a)?a:t}function x(e){return"active"===e?"Aktif":"inactive"===e?"Nonaktif":e}function b(e){let t=e.toUpperCase();return t.includes("MAGANG")?{checkIn:"09:00",checkOut:"16:00"}:t.includes("PAGI")?{checkIn:"07:00",checkOut:"15:00"}:t.includes("SIANG")?{checkIn:"13:00",checkOut:"21:00"}:{checkIn:"08:00",checkOut:"17:00"}}async function k(e){let t=await e.text();try{return t?JSON.parse(t):{}}catch{throw Error("Response API bukan JSON.")}}function p(){return(0,t.jsx)("style",{children:`
      @keyframes workScheduleEnter {
        0% {
          opacity: 0;
          transform: translateY(14px);
        }

        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes workScheduleRowEnter {
        0% {
          opacity: 0;
          transform: translateY(10px);
        }

        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .work-schedule-enter {
        animation: workScheduleEnter 320ms ease-out both;
      }

      .work-schedule-row-enter {
        opacity: 0;
        animation: workScheduleRowEnter 300ms ease-out both;
      }

      .work-schedule-field {
        transition:
          border-color 180ms ease,
          background-color 180ms ease,
          box-shadow 180ms ease;
      }

      @media (prefers-reduced-motion: reduce) {
        .work-schedule-enter,
        .work-schedule-row-enter {
          animation: none !important;
          opacity: 1 !important;
          transform: none !important;
        }
      }
    `})}e.s(["default",0,function(){let[e,w]=(0,a.useState)([]),[_,g]=(0,a.useState)([]),[j,y]=(0,a.useState)(""),[v,N]=(0,a.useState)(!0),[S,A]=(0,a.useState)(!1),[D,Y]=(0,a.useState)(""),[C,I]=(0,a.useState)(""),O=(0,a.useMemo)(()=>_.find(e=>e.shift_id===j)||null,[_,j]),R=(0,a.useMemo)(()=>O?h.filter(e=>O.days[e].is_work_day).length:0,[O]);async function E(){try{var e;let t;N(!0),Y(""),I("");let a=await fetch("/api/admin/work-schedules",{cache:"no-store"}),s=await k(a);if(!a.ok)throw Error(s.error||s.message||"Gagal mengambil jadwal kerja.");let i=s.shifts||s.data||[],r=(e=i,t=["UTAMA","MAGANG","SHIFT PAGI","SHIFT SIANG"],[...e.map(e=>{let t,a=(t=b(e.name),{MONDAY:{label:"Senin",is_work_day:!0,check_in_time:t.checkIn,check_out_time:t.checkOut},TUESDAY:{label:"Selasa",is_work_day:!0,check_in_time:t.checkIn,check_out_time:t.checkOut},WEDNESDAY:{label:"Rabu",is_work_day:!0,check_in_time:t.checkIn,check_out_time:t.checkOut},THURSDAY:{label:"Kamis",is_work_day:!0,check_in_time:t.checkIn,check_out_time:t.checkOut},FRIDAY:{label:"Jumat",is_work_day:!0,check_in_time:t.checkIn,check_out_time:t.checkOut},SATURDAY:{label:"Sabtu",is_work_day:!1,check_in_time:t.checkIn,check_out_time:t.checkOut},SUNDAY:{label:"Minggu",is_work_day:!1,check_in_time:t.checkIn,check_out_time:t.checkOut}});for(let t of e.work_schedules||[]){let s=t.day_of_week;if(!a[s])continue;let i=b(e.name);a[s]={label:u[s],is_work_day:t.is_work_day,check_in_time:f(t.check_in_time,i.checkIn),check_out_time:f(t.check_out_time,i.checkOut)}}return{shift_id:e.id,shift_name:e.name,shift_status:e.status,tolerance_minutes:e.tolerance_minutes,days:a}})].sort((e,a)=>{let s=t.indexOf(e.shift_name.toUpperCase()),i=t.indexOf(a.shift_name.toUpperCase());return -1===s&&-1===i?e.shift_name.localeCompare(a.shift_name):-1===s?1:-1===i?-1:s-i}));if(w(i),g(r),!j&&r.length>0){let e=r.find(e=>"active"===e.shift_status)||r[0];y(e.shift_id)}if(j&&!r.some(e=>e.shift_id===j)&&r.length>0){let e=r.find(e=>"active"===e.shift_status)||r[0];y(e.shift_id)}}catch(e){console.error("LOAD_WORK_SCHEDULES_ERROR:",e),Y(e instanceof Error?e.message:"Gagal mengambil jadwal kerja.")}finally{N(!1)}}function U(e,t,a,s){I(""),g(i=>i.map(i=>i.shift_id!==e?i:{...i,days:{...i.days,[t]:{...i.days[t],[a]:s}}}))}async function M(){if(!O)return void alert("Pilih shift terlebih dahulu.");try{A(!0),Y(""),I("");let e=[{shift_id:O.shift_id,days:h.map(e=>({day_of_week:e,is_work_day:O.days[e].is_work_day,check_in_time:O.days[e].check_in_time,check_out_time:O.days[e].check_out_time}))}],t=await fetch("/api/admin/work-schedules",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({schedules:e})}),a=await k(t);if(!t.ok)throw Error(a.error||a.message||"Gagal menyimpan jadwal kerja.");await E(),I("inactive"===O.shift_status?"Jadwal kerja berhasil disimpan. Catatan: shift ini sedang nonaktif.":"Jadwal kerja berhasil disimpan ke database.")}catch(e){console.error("SAVE_WORK_SCHEDULES_ERROR:",e),Y(e instanceof Error?e.message:"Gagal menyimpan jadwal kerja.")}finally{A(!1)}}return(0,a.useEffect)(()=>{E()},[]),(0,t.jsxs)(m.default,{variant:"admin",children:[(0,t.jsx)(p,{}),(0,t.jsx)(o.default,{title:"Daftar Jam Kerja",variant:"admin"}),(0,t.jsx)("section",{className:"mx-auto max-w-6xl space-y-5 px-5 py-6 pb-28 md:px-10 lg:px-16",children:(0,t.jsxs)("div",{className:"work-schedule-enter overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-xl shadow-slate-300/30",children:[(0,t.jsx)("div",{className:"bg-[#123c8c] p-6 text-white md:p-8",children:(0,t.jsxs)("div",{className:"flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between",children:[(0,t.jsx)("div",{children:(0,t.jsx)("h1",{className:"mt-3 text-3xl font-black tracking-tight md:text-4xl",children:"Daftar Jam Kerja"})}),(0,t.jsxs)("div",{className:"work-schedule-row-enter grid w-full gap-3 rounded-3xl bg-white/10 p-3 backdrop-blur md:grid-cols-[1fr_auto_auto] lg:max-w-2xl",style:{animationDelay:"80ms"},children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"mb-2 block text-xs font-black uppercase tracking-[0.15em] text-blue-100",children:"Pilih Shift"}),(0,t.jsx)("select",{value:j,onChange:e=>{y(e.target.value),I("")},className:"work-schedule-field h-[52px] w-full rounded-2xl border border-white/20 bg-white px-4 text-sm font-black text-slate-700 outline-none focus:ring-4 focus:ring-white/20",children:0===e.length?(0,t.jsx)("option",{value:"",children:"Belum ada shift"}):_.map(e=>(0,t.jsxs)("option",{value:e.shift_id,children:[e.shift_name," - ",x(e.shift_status)]},e.shift_id))})]}),(0,t.jsx)("div",{className:"flex items-end",children:(0,t.jsxs)("button",{type:"button",onClick:M,disabled:v||S||!O,className:"inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 text-sm font-black text-white shadow-lg shadow-blue-950/30 transition hover:bg-slate-900 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60",children:[S?(0,t.jsx)(l.Loader2,{size:18,className:"animate-spin"}):(0,t.jsx)(c.Save,{size:18}),S?"Menyimpan...":"Simpan"]})})]})]})}),(0,t.jsxs)("div",{className:"p-5 md:p-7",children:[D?(0,t.jsx)("div",{className:"work-schedule-row-enter rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-black text-red-700",children:D}):null,C?(0,t.jsxs)("div",{className:"work-schedule-row-enter flex items-center gap-2 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-sm font-black text-emerald-700",children:[(0,t.jsx)(i.CheckCircle2,{size:18}),C]}):null,O?.shift_status==="inactive"?(0,t.jsx)("div",{className:"work-schedule-row-enter mt-5 rounded-2xl border border-amber-100 bg-amber-50 p-4 text-sm font-black leading-6 text-amber-700",children:"Shift ini sedang nonaktif. Jadwal tetap bisa disimpan, tetapi sebaiknya tidak digunakan untuk karyawan aktif sampai status shift diubah kembali menjadi aktif."}):null,v?(0,t.jsx)("div",{className:"work-schedule-row-enter mt-8 flex min-h-[320px] items-center justify-center rounded-3xl border border-blue-100 bg-[#f8fbff]",children:(0,t.jsxs)("div",{className:"text-center",children:[(0,t.jsx)(l.Loader2,{className:"mx-auto h-8 w-8 animate-spin text-[#123c8c]"}),(0,t.jsx)("p",{className:"mt-3 text-sm font-black text-slate-600",children:"Mengambil jadwal kerja..."})]})}):O?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{className:"grid gap-3 md:grid-cols-4",children:[(0,t.jsxs)("div",{className:"work-schedule-row-enter rounded-3xl border border-blue-100 bg-[#f8fbff] p-4",style:{animationDelay:"40ms"},children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 text-[#123c8c]",children:[(0,t.jsx)(s.CalendarDays,{size:18}),(0,t.jsx)("p",{className:"text-sm font-bold text-slate-500",children:"Shift"})]}),(0,t.jsx)("p",{className:"mt-2 text-2xl font-black uppercase text-slate-950",children:O.shift_name})]}),(0,t.jsxs)("div",{className:"work-schedule-row-enter rounded-3xl border border-blue-100 bg-[#f8fbff] p-4",style:{animationDelay:"80ms"},children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 text-[#123c8c]",children:[(0,t.jsx)(n.Power,{size:18}),(0,t.jsx)("p",{className:"text-sm font-bold text-slate-500",children:"Status"})]}),(0,t.jsx)("p",{className:`mt-2 text-2xl font-black ${"active"===O.shift_status?"text-[#123c8c]":"text-slate-500"}`,children:x(O.shift_status)})]}),(0,t.jsxs)("div",{className:"work-schedule-row-enter rounded-3xl border border-blue-100 bg-[#f8fbff] p-4",style:{animationDelay:"120ms"},children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 text-[#123c8c]",children:[(0,t.jsx)(s.CalendarDays,{size:18}),(0,t.jsx)("p",{className:"text-sm font-bold text-slate-500",children:"Hari Kerja"})]}),(0,t.jsxs)("p",{className:"mt-2 text-2xl font-black text-[#123c8c]",children:[R," Hari"]})]}),(0,t.jsxs)("div",{className:"work-schedule-row-enter rounded-3xl border border-blue-100 bg-[#f8fbff] p-4",style:{animationDelay:"160ms"},children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 text-[#123c8c]",children:[(0,t.jsx)(r.Clock3,{size:18}),(0,t.jsx)("p",{className:"text-sm font-bold text-slate-500",children:"Toleransi"})]}),(0,t.jsxs)("p",{className:"mt-2 text-2xl font-black text-slate-950",children:[O.tolerance_minutes||0," Menit"]})]})]}),(0,t.jsxs)("div",{className:"work-schedule-row-enter mt-5 flex flex-col gap-3 rounded-3xl border border-blue-100 bg-[#f8fbff] p-4 sm:flex-row sm:items-center sm:justify-between",style:{animationDelay:"200ms"},children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-sm font-black text-slate-900",children:"Pengaturan Cepat"}),(0,t.jsx)("p",{className:"mt-1 text-xs font-semibold text-slate-500",children:"Gunakan tombol ini untuk membuat Senin sampai Jumat sebagai hari kerja."})]}),(0,t.jsx)("button",{type:"button",onClick:function(){O&&(I(""),g(e=>e.map(e=>{if(e.shift_id!==O.shift_id)return e;let t={...e.days};for(let e of h)t[e]={...t[e],is_work_day:"SATURDAY"!==e&&"SUNDAY"!==e};return{...e,days:t}})))},className:"rounded-2xl bg-[#123c8c] px-4 py-3 text-sm font-black text-white shadow-lg shadow-blue-900/20 transition hover:bg-[#0f3274] active:scale-[0.98]",children:"Set Senin-Jumat Kerja"})]}),(0,t.jsx)("div",{className:"mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",children:h.map((e,a)=>{let s=O.days[e];return(0,t.jsxs)("div",{className:`work-schedule-row-enter rounded-3xl border p-4 transition duration-200 hover:-translate-y-0.5 ${s.is_work_day?"border-blue-100 bg-white shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-300/40":"border-slate-100 bg-slate-50"}`,style:{animationDelay:`${55*a}ms`},children:[(0,t.jsxs)("div",{className:"flex items-center justify-between gap-3",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"text-lg font-black text-slate-950",children:s.label}),(0,t.jsx)("p",{className:`mt-1 text-xs font-black ${s.is_work_day?"text-[#123c8c]":"text-slate-400"}`,children:s.is_work_day?"Hari kerja":"Libur"})]}),(0,t.jsxs)("label",{className:"relative inline-flex cursor-pointer items-center",children:[(0,t.jsx)("input",{type:"checkbox",checked:s.is_work_day,onChange:t=>U(O.shift_id,e,"is_work_day",t.target.checked),className:"peer sr-only"}),(0,t.jsx)("div",{className:"h-7 w-12 rounded-full bg-slate-200 transition peer-checked:bg-[#123c8c]"}),(0,t.jsx)("div",{className:"absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow transition peer-checked:translate-x-5"})]})]}),(0,t.jsxs)("div",{className:"mt-4 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2",children:[(0,t.jsxs)("label",{className:"min-w-0",children:[(0,t.jsx)("span",{className:"mb-1 block text-xs font-black text-slate-400",children:"Masuk"}),(0,t.jsx)("input",{type:"time",value:s.check_in_time,disabled:!s.is_work_day,onChange:t=>U(O.shift_id,e,"check_in_time",t.target.value),className:"work-schedule-field h-12 w-full max-w-[150px] min-w-0 rounded-2xl border border-blue-100 bg-[#f8fbff] px-3 text-sm font-black text-slate-700 outline-none transition focus:border-[#123c8c] focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-100 disabled:text-slate-400"})]}),(0,t.jsxs)("label",{className:"min-w-0",children:[(0,t.jsx)("span",{className:"mb-1 block text-xs font-black text-slate-400",children:"Pulang"}),(0,t.jsx)("input",{type:"time",value:s.check_out_time,disabled:!s.is_work_day,onChange:t=>U(O.shift_id,e,"check_out_time",t.target.value),className:"work-schedule-field h-12 w-full max-w-[150px] min-w-0 rounded-2xl border border-blue-100 bg-[#f8fbff] px-3 text-sm font-black text-slate-700 outline-none transition focus:border-[#123c8c] focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-100 disabled:text-slate-400"})]})]})]},e)})})]}):(0,t.jsxs)("div",{className:"work-schedule-row-enter mt-8 rounded-3xl border border-blue-100 bg-[#f8fbff] px-5 py-12 text-center",children:[(0,t.jsx)("p",{className:"font-black text-slate-700",children:"Data jadwal kerja belum tersedia."}),(0,t.jsx)("p",{className:"mt-1 text-sm text-slate-400",children:"Pastikan data shift sudah ada di database."})]})]})]})}),(0,t.jsx)(d.default,{variant:"admin"})]})}])}]);