module.exports=[93482,a=>{"use strict";var b=a.i(87924),c=a.i(31626),d=a.i(72131),e=a.i(71133),f=a.i(50944),g=a.i(97546),h=a.i(75160),i=a.i(74896),j=a.i(74215),k=a.i(89240),l=a.i(86860);async function m(a){let b=await a.text();try{return b?JSON.parse(b):{}}catch{throw Error("Response API bukan JSON.")}}function n(){return(0,b.jsx)("style",{children:`
      @keyframes loginEnter {
        0% {
          opacity: 0;
          transform: translateY(16px);
        }

        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes loginCardEnter {
        0% {
          opacity: 0;
          transform: translateY(18px) scale(0.985);
        }

        100% {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      @keyframes loginLogoPop {
        0% {
          opacity: 0;
          transform: translateY(10px) scale(0.92);
        }

        100% {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      @keyframes loginTextReveal {
        0% {
          opacity: 0;
          transform: translateY(12px);
          filter: blur(5px);
        }

        100% {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0);
        }
      }

      @keyframes loginFieldEnter {
        0% {
          opacity: 0;
          transform: translateY(10px);
        }

        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes loginBackgroundFloat {
        0%,
        100% {
          transform: translate3d(0, 0, 0) scale(1);
        }

        50% {
          transform: translate3d(10px, -10px, 0) scale(1.04);
        }
      }

      @keyframes introLogoPulse {
        0%,
        100% {
          transform: scale(1);
          filter: drop-shadow(0 8px 18px rgba(18, 60, 140, 0.12));
        }

        50% {
          transform: scale(1.045);
          filter: drop-shadow(0 14px 26px rgba(255, 138, 0, 0.18));
        }
      }

      @keyframes introScanLine {
        0% {
          transform: translateY(-84px);
          opacity: 0;
        }

        12%,
        88% {
          opacity: 1;
        }

        100% {
          transform: translateY(84px);
          opacity: 0;
        }
      }

      @keyframes introTextIn {
        0% {
          opacity: 0;
          transform: translateY(12px);
          filter: blur(5px);
        }

        100% {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0);
        }
      }

      .login-enter {
        animation: loginEnter 360ms ease-out both;
      }

      .login-card-enter {
        animation: loginCardEnter 420ms ease-out both;
      }

      .login-logo-pop {
        animation: loginLogoPop 320ms ease-out both;
      }

      .login-text-reveal {
        animation: loginTextReveal 420ms ease-out both;
      }

      .login-field-enter {
        opacity: 0;
        animation: loginFieldEnter 320ms ease-out both;
      }

      .login-bg-float {
        animation: loginBackgroundFloat 6s ease-in-out infinite;
      }

      .intro-logo-pulse {
        animation: introLogoPulse 2.2s ease-in-out infinite;
      }

      .intro-scan-line {
        animation: introScanLine 2.4s ease-in-out infinite;
      }

      .intro-text-in {
        animation: introTextIn 560ms ease-out both;
      }

      .login-field-smooth input {
        transition:
          border-color 180ms ease,
          background-color 180ms ease,
          box-shadow 180ms ease,
          transform 180ms ease;
      }

      .login-field-smooth input:focus {
        transform: translateY(-1px);
      }

      .login-presence-title {
        background: none;
        color: #123c8c;
      }

      @media (prefers-reduced-motion: reduce) {
        .login-enter,
        .login-card-enter,
        .login-logo-pop,
        .login-text-reveal,
        .login-field-enter,
        .login-bg-float,
        .intro-logo-pulse,
        .intro-scan-line,
        .intro-text-in {
          animation: none !important;
          opacity: 1 !important;
          transform: none !important;
          filter: none !important;
        }
      }
    `})}function o({open:a,title:d,message:e,onClose:f}){return a?(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(c.default,{id:"562a5aa347a221d7",children:"@keyframes floatingAlertIn{0%{opacity:0;transform:translate(70px)translateY(-18px)scale(.95)}70%{opacity:1;transform:translate(-6px)translateY(0)scale(1.01)}to{opacity:1;transform:translate(0)translateY(0)scale(1)}}@keyframes alertPulse{0%,to{opacity:.45;transform:scale(1)}50%{opacity:.12;transform:scale(1.22)}}@keyframes alertIconPop{0%{opacity:0;transform:scale(.65)rotate(-8deg)}70%{opacity:1;transform:scale(1.08)rotate(3deg)}to{opacity:1;transform:scale(1)rotate(0)}}"}),(0,b.jsx)("div",{className:"jsx-562a5aa347a221d7 fixed right-4 top-4 z-[100] w-[calc(100%-2rem)] max-w-[25rem] md:right-7 md:top-7",children:(0,b.jsxs)("div",{className:"jsx-562a5aa347a221d7 relative overflow-hidden rounded-[2rem] border border-white/40 bg-white/15 shadow-2xl shadow-slate-950/20 ring-1 ring-white/35 backdrop-blur-[26px] animate-[floatingAlertIn_320ms_cubic-bezier(0.2,0.9,0.2,1)]",children:[(0,b.jsx)("div",{className:"jsx-562a5aa347a221d7 absolute inset-0 bg-gradient-to-br from-white/35 via-white/12 to-white/5"}),(0,b.jsx)("div",{className:"jsx-562a5aa347a221d7 absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top_left,rgba(255,138,0,0.16),transparent_44%),radial-gradient(circle_at_top_right,rgba(18,60,140,0.16),transparent_48%)]"}),(0,b.jsx)("button",{type:"button",onClick:f,"aria-label":"Tutup alert",className:"jsx-562a5aa347a221d7 absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/20 text-slate-700 shadow-sm ring-1 ring-white/40 backdrop-blur-xl transition hover:bg-white/35 hover:text-slate-950 active:scale-95",children:(0,b.jsx)(j.X,{size:19,strokeWidth:2.7})}),(0,b.jsxs)("div",{className:"jsx-562a5aa347a221d7 relative p-5",children:[(0,b.jsxs)("div",{className:"jsx-562a5aa347a221d7 flex items-start gap-4",children:[(0,b.jsxs)("div",{className:"jsx-562a5aa347a221d7 relative flex h-16 w-16 shrink-0 items-center justify-center",children:[(0,b.jsx)("div",{className:"jsx-562a5aa347a221d7 absolute inset-0 rounded-[1.5rem] bg-orange-300/45 animate-[alertPulse_1.6s_ease-in-out_infinite]"}),(0,b.jsx)("div",{className:"jsx-562a5aa347a221d7 relative flex h-14 w-14 items-center justify-center rounded-[1.25rem] border border-orange-100/50 bg-white/25 text-orange-600 shadow-xl shadow-orange-200/20 backdrop-blur-xl animate-[alertIconPop_320ms_ease-out]",children:(0,b.jsx)(g.AlertCircle,{size:30,strokeWidth:2.8})})]}),(0,b.jsxs)("div",{className:"jsx-562a5aa347a221d7 min-w-0 flex-1 pr-9",children:[(0,b.jsx)("div",{className:"jsx-562a5aa347a221d7 inline-flex rounded-full bg-white/20 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-orange-700 ring-1 ring-orange-100/40 backdrop-blur-xl",children:"Perhatian"}),(0,b.jsx)("h2",{className:"jsx-562a5aa347a221d7 mt-3 text-xl font-black tracking-tight text-slate-950",children:d}),(0,b.jsx)("p",{className:"jsx-562a5aa347a221d7 mt-2 text-sm font-semibold leading-6 text-slate-700",children:e})]})]}),(0,b.jsx)("button",{type:"button",onClick:f,className:"jsx-562a5aa347a221d7 mt-5 flex min-h-12 w-full items-center justify-center rounded-2xl border border-white/35 bg-[#123c8c]/75 px-5 text-sm font-black text-white shadow-xl shadow-blue-900/15 backdrop-blur-xl transition hover:bg-[#123c8c]/90 active:scale-[0.98]",children:"Mengerti"})]})]})})]}):null}a.s(["default",0,function(){let a=(0,f.useRouter)(),[c,g]=(0,d.useState)(""),[j,p]=(0,d.useState)(""),[q,r]=(0,d.useState)(!0),[s,t]=(0,d.useState)(!1),[u,v]=(0,d.useState)(!1),[w,x]=(0,d.useState)(""),[y,z]=(0,d.useState)(!1),[A,B]=(0,d.useState)(null),[C,D]=(0,d.useState)(0),[E,F]=(0,d.useState)({open:!1,title:"",message:""});function G(){s||(t(!0),setTimeout(()=>r(!1),420))}function H(a,b){F({open:!0,title:a,message:b})}async function I(b,c){let d;if(C>0)return void H("Tunggu 1 menit",`Tunggu ${C} detik hingga kamu bisa mencoba kembali.`);let e=b.trim().toLowerCase();if(!e||!c.trim())return void H("Data belum lengkap","Email dan password wajib diisi.");if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim().toLowerCase()))return void H("Format email salah","Masukkan email dengan format yang benar, contoh: nama@creativemu.com");if(!((d=e.trim().toLowerCase()).endsWith("@creativemu.co.id")||d.endsWith("@creativemu.com")))return void H("Email tidak valid","Masuk hanya dapat menggunakan email resmi Creativemu.");try{z(!0);let b=await fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e,password:c})}),d=await m(b);if(!b.ok){if(429===b.status){let a=Number(b.headers.get("Retry-After")),c=d.retryAfterSeconds||a||60;B(Date.now()+1e3*c),D(c),H("Tunggu 1 menit",`Tunggu ${c} detik hingga kamu bisa mencoba kembali.`);return}H("Masuk gagal",d.message||"Masuk gagal.");return}a.replace(d.redirectTo||"/beranda"),a.refresh()}catch(a){console.error("LOGIN_ERROR:",a),H("Terjadi kesalahan",a instanceof Error?a.message:"Terjadi kesalahan saat login.")}finally{z(!1)}}async function J(a){a.preventDefault(),await I(c,j)}(0,d.useEffect)(()=>{let a=document.documentElement.classList.contains("dark");document.documentElement.classList.remove("dark");let b=setTimeout(()=>v(!0),900),c=setTimeout(()=>{t(!0),setTimeout(()=>r(!1),420)},2400);return()=>{clearTimeout(b),clearTimeout(c),(a||"dark"===localStorage.getItem("theme"))&&document.documentElement.classList.add("dark")}},[]),(0,d.useEffect)(()=>{let a=()=>{x(new Intl.DateTimeFormat("id-ID",{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1,timeZone:"Asia/Jakarta"}).format(new Date))};a();let b=window.setInterval(a,1e3);return()=>window.clearInterval(b)},[]),(0,d.useEffect)(()=>{if(!A)return;let a=()=>{let a=Math.max(0,Math.ceil((A-Date.now())/1e3));D(a),a<=0&&B(null)};a();let b=window.setInterval(a,1e3);return()=>window.clearInterval(b)},[A]);let K=y||C>0,L=C>0&&"Tunggu 1 menit"===E.title?`Tunggu ${C} detik hingga kamu bisa mencoba kembali.`:E.message;return(0,b.jsxs)(k.default,{variant:"auth",withBottomPadding:!1,children:[(0,b.jsx)(n,{}),q?(0,b.jsxs)("div",{role:"button",tabIndex:0,onClick:G,onKeyDown:a=>{("Enter"===a.key||" "===a.key)&&G()},className:`fixed inset-0 z-[999] flex cursor-pointer select-none flex-col items-center justify-center overflow-hidden px-6 transition-all duration-500 ${s?"scale-105 opacity-0 blur-md":"opacity-100"} bg-[#f6f8ff]`,"aria-label":"Lanjut ke halaman login",children:[(0,b.jsx)("div",{className:"absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,138,0,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(18,60,140,0.18),transparent_38%)]"}),(0,b.jsxs)("div",{className:"relative flex h-56 w-56 items-center justify-center md:h-72 md:w-72",children:[(0,b.jsx)("div",{className:"absolute inset-3 rounded-[2rem] border border-[#123c8c]/10 bg-white/25 shadow-2xl shadow-slate-300/30 backdrop-blur-xl"}),(0,b.jsx)("div",{className:"intro-scan-line absolute left-8 right-8 top-1/2 z-20 h-0.5 bg-gradient-to-r from-transparent via-[#ff8a00] to-transparent shadow-[0_0_14px_rgba(255,138,0,0.72)]"}),(0,b.jsx)("div",{className:"relative z-10 flex h-32 w-32 items-center justify-center overflow-hidden rounded-[2rem] border border-white/80 bg-white p-5 shadow-[0_24px_58px_rgba(18,60,140,0.14)] md:h-40 md:w-40 md:p-7",children:(0,b.jsx)(e.default,{src:"/images/creativemu-logo/creativemu.png",alt:"Creativemu Logo",width:140,height:140,className:"intro-logo-pulse h-full w-full object-contain",priority:!0})})]}),(0,b.jsxs)("div",{className:"relative mt-9 text-center md:mt-12",children:[(0,b.jsx)("h2",{className:"intro-text-in text-3xl font-black uppercase tracking-[0.18em] text-slate-950 md:text-5xl",children:"Creativemu"}),(0,b.jsx)("p",{className:"intro-text-in mt-3 text-xs font-black uppercase tracking-[0.28em] text-[#ff8a00] md:text-sm",style:{animationDelay:"160ms"},children:"Sistem Presensi Wajah"})]}),(0,b.jsx)("p",{className:`relative mt-14 text-sm font-semibold text-slate-400 transition-opacity duration-300 md:mt-16 ${u?"opacity-100":"opacity-0"}`,children:"Tap di mana saja untuk melanjutkan"})]}):null,(0,b.jsxs)("section",{className:"relative min-h-dvh w-full overflow-hidden bg-[#f6f8ff]",children:[(0,b.jsx)("div",{className:"absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,138,0,0.16),transparent_32%),radial-gradient(circle_at_top_right,rgba(18,60,140,0.18),transparent_36%)]"}),(0,b.jsx)("div",{className:"login-bg-float pointer-events-none absolute -left-28 top-20 h-72 w-72 rounded-full bg-orange-200/20 blur-3xl"}),(0,b.jsx)("div",{className:"login-bg-float pointer-events-none absolute -right-28 bottom-20 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl"}),(0,b.jsxs)("div",{className:"relative z-10 grid min-h-dvh w-full grid-cols-1 lg:grid-cols-2",children:[(0,b.jsxs)("div",{className:"login-enter relative flex flex-col px-6 py-7 md:px-12 lg:justify-between lg:px-20 lg:py-14",children:[(0,b.jsx)(e.default,{src:"/images/creativemu-logo/creativemu.png",alt:"Logo Latar Creativemu",width:620,height:620,className:"pointer-events-none absolute -left-20 top-1/2 hidden -translate-y-1/2 opacity-[0.045] lg:block",priority:!0}),(0,b.jsx)(e.default,{src:"/images/creativemu-logo/creativemu.png",alt:"Logo Latar Creativemu",width:300,height:300,className:"pointer-events-none absolute -right-20 top-24 opacity-[0.04] lg:hidden",priority:!0}),(0,b.jsxs)("div",{className:"relative z-10",children:[(0,b.jsxs)("div",{className:"login-logo-pop flex items-center gap-4",children:[(0,b.jsx)("div",{className:"flex h-12 min-h-12 w-12 min-w-12 items-center justify-center overflow-hidden rounded-2xl bg-white p-2 shadow-xl shadow-slate-300/60 md:h-14 md:w-14",children:(0,b.jsx)(e.default,{src:"/images/creativemu-logo/creativemu.png",alt:"Creativemu Logo",width:56,height:56,className:"h-full w-full object-contain",priority:!0})}),(0,b.jsx)("div",{children:(0,b.jsx)("h1",{className:"text-xl font-black tracking-tight text-slate-950 md:text-2xl",children:"Creativemu"})})]}),(0,b.jsxs)("div",{className:"mt-14 max-w-2xl md:mt-16 lg:mt-28",children:[(0,b.jsx)("p",{className:"login-text-reveal text-xs font-black uppercase tracking-[0.35em] text-[#123c8c] md:text-sm",style:{animationDelay:"120ms"},children:"Selamat Datang Kembali"}),(0,b.jsx)("h2",{className:"login-text-reveal mt-4 text-4xl font-black leading-[1.05] tracking-tight text-slate-950 md:mt-5 md:text-6xl",style:{animationDelay:"180ms"},children:(0,b.jsx)("span",{className:"typewriter-title login-presence-title",children:"Presensi Creativemu"})}),(0,b.jsxs)("p",{className:"login-text-reveal mt-5 text-lg font-black tabular-nums tracking-[0.16em] text-[#123c8c] md:text-2xl",style:{animationDelay:"240ms"},children:[w||"--:--:--"," WIB"]})]})]}),(0,b.jsx)("div",{className:"login-field-enter relative z-10 mt-10 hidden text-sm font-semibold text-slate-400 lg:block",style:{animationDelay:"280ms"},children:"© 2026 FaceAttend for Creativemu"})]}),(0,b.jsx)("div",{className:"flex items-start justify-center px-6 pb-8 pt-2 md:px-12 md:pb-12 lg:items-center lg:bg-white/35 lg:px-20 lg:py-14 lg:backdrop-blur-xl",children:(0,b.jsx)(l.AppCard,{padding:"lg",className:"login-card-enter w-full max-w-md border-white/70 bg-white/90 shadow-2xl shadow-slate-300/60 backdrop-blur-2xl",children:(0,b.jsxs)("form",{suppressHydrationWarning:!0,noValidate:!0,onSubmit:J,children:[(0,b.jsx)("div",{className:"login-field-enter mb-7 md:mb-8",children:(0,b.jsx)("h3",{className:"mt-2 text-3xl font-black tracking-tight text-slate-950",children:"Masuk"})}),(0,b.jsxs)("div",{className:"space-y-5",children:[(0,b.jsx)("div",{className:"login-field-enter login-field-smooth",style:{animationDelay:"80ms"},children:(0,b.jsx)(l.AppInput,{suppressHydrationWarning:!0,label:"Email",type:"text",inputMode:"email",value:c,onChange:a=>g(a.target.value),placeholder:"nama@creativemu.co.id",autoComplete:"email",disabled:K,className:"border-blue-100 bg-[#f8fbff] text-slate-700 placeholder:text-slate-400 focus:border-[#123c8c] focus:bg-white focus:ring-blue-100/50 dark:border-blue-100 dark:bg-[#f8fbff] dark:text-slate-700 dark:placeholder:text-slate-400 dark:focus:border-[#123c8c] dark:focus:bg-white dark:focus:ring-blue-100/50"})}),(0,b.jsx)("div",{className:"login-field-enter login-field-smooth",style:{animationDelay:"130ms"},children:(0,b.jsx)(l.AppInput,{suppressHydrationWarning:!0,label:"Kata Sandi",type:"password",value:j,onChange:a=>p(a.target.value),placeholder:"••••••••",autoComplete:"current-password",disabled:K,className:"border-blue-100 bg-[#f8fbff] text-slate-700 placeholder:text-slate-400 focus:border-[#123c8c] focus:bg-white focus:ring-blue-100/50 dark:border-blue-100 dark:bg-[#f8fbff] dark:text-slate-700 dark:placeholder:text-slate-400 dark:focus:border-[#123c8c] dark:focus:bg-white dark:focus:ring-blue-100/50"})})]}),(0,b.jsx)("div",{className:"mt-6",children:(0,b.jsx)("div",{className:"login-field-enter",style:{animationDelay:"180ms"},children:(0,b.jsx)(l.AppButton,{type:"submit",full:!0,disabled:K,leftIcon:(0,b.jsx)(i.LogIn,{size:18}),children:C>0?`Tunggu ${C} detik`:y?(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(h.Loader2,{size:18,className:"animate-spin"}),"Memproses..."]}):"Masuk"})})})]})})}),(0,b.jsx)("div",{className:"login-field-enter px-6 pb-6 text-xs font-semibold text-slate-400 lg:hidden",style:{animationDelay:"300ms"},children:"© 2026 FaceAttend for Creativemu"})]}),(0,b.jsx)(o,{open:E.open,title:E.title,message:L,onClose:function(){F({open:!1,title:"",message:""})}})]})]})}])}];

//# sourceMappingURL=src_app_login_page_tsx_0yrgg2z._.js.map