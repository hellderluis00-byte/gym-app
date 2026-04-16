<!DOCTYPE html>

<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
<title>HELLDER · GYM</title>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;500;600;700;800&family=Barlow+Condensed:wght@400;600;700;800&display=swap" rel="stylesheet">
<style>
/* ══════════════════════════════════════
   TOKENS
══════════════════════════════════════ */
:root{
  --bg:#080808;--s1:#0f0f0f;--s2:#161616;--s3:#1e1e1e;--s4:#252525;
  --border:#272727;--border2:#333;
  --accent:#C8FF00;--accent-dim:rgba(200,255,0,.12);
  --red:#FF4500;--blue:#00B4FF;--green:#00E676;--gold:#FFB700;--purple:#B388FF;
  --text:#F0F0F0;--muted:#5a5a5a;--muted2:#3a3a3a;
  --push:#FF4500;--pull:#00B4FF;--legs:#00E676;--upper:#B388FF;--lower:#FFB700;
  --r:12px;--nav-h:72px;
}
*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent;}
html{height:100%;}
body{background:var(--bg);color:var(--text);font-family:'Barlow',sans-serif;height:100%;overscroll-behavior:none;overflow-x:hidden;}
button{cursor:pointer;font-family:'Barlow',sans-serif;border:none;background:none;color:inherit;}
input,select{font-family:'Barlow',sans-serif;}
a{text-decoration:none;color:inherit;}

/* ══ SCREENS ══ */
.screen{display:none;min-height:100dvh;padding-bottom:calc(var(–nav-h) + env(safe-area-inset-bottom,0px) + 16px);}
.screen.active{display:block;}

/* ══ BOTTOM NAV ══ */
.nav{
position:fixed;bottom:0;left:0;right:0;z-index:200;
background:rgba(8,8,8,.98);backdrop-filter:blur(24px);
border-top:1px solid var(–border);
display:grid;grid-template-columns:repeat(5,1fr);
height:var(–nav-h);
padding-bottom:env(safe-area-inset-bottom,0);
}
.nb{
display:flex;flex-direction:column;align-items:center;justify-content:center;
gap:3px;color:var(–muted);font-size:9px;font-weight:700;
letter-spacing:.8px;text-transform:uppercase;transition:color .15s;
padding:8px 0;
}
.nb.active{color:var(–accent);}
.nb svg{width:20px;height:20px;stroke-width:1.8;fill:none;stroke:currentColor;}
.nb .dot{width:4px;height:4px;border-radius:50%;background:var(–accent);display:none;}
.nb.active .dot{display:block;}

/* ══ SHARED ══ */
.ph{padding:20px 16px 0;display:flex;align-items:center;justify-content:space-between;}
.pt{font-family:‘Bebas Neue’,sans-serif;font-size:32px;letter-spacing:1px;}
.sl{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:var(–muted);margin-bottom:10px;}
.card{background:var(–s2);border:1px solid var(–border);border-radius:var(–r);padding:16px;}
.pill{display:inline-flex;align-items:center;padding:3px 9px;border-radius:20px;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;}
.sep{height:1px;background:var(–border);margin:16px 0;}

/* ══ TOAST ══ */
.toast{
position:fixed;top:16px;left:50%;transform:translateX(-50%) translateY(-100px);
background:var(–s3);border:1px solid var(–border2);border-radius:10px;
padding:10px 20px;font-size:13px;font-weight:600;z-index:9999;
transition:transform .3s cubic-bezier(.34,1.56,.64,1);white-space:nowrap;
pointer-events:none;
}
.toast.show{transform:translateX(-50%) translateY(0);}
.toast.pr{border-color:var(–gold);color:var(–gold);}
.toast.ok{border-color:var(–accent);color:var(–accent);}

/* ══════════════════════════════════════
HOME
══════════════════════════════════════ */
.hero{
padding:28px 16px 20px;
background:radial-gradient(ellipse 120% 80% at 110% -10%,rgba(200,255,0,.06) 0%,transparent 60%),
linear-gradient(180deg,#0d0d0d 0%,#080808 100%);
border-bottom:1px solid var(–border);position:relative;overflow:hidden;
}
.hero-greeting{font-size:12px;font-weight:500;color:var(–muted);letter-spacing:.5px;margin-bottom:6px;}
.hero-name{font-family:‘Bebas Neue’,sans-serif;font-size:44px;letter-spacing:2px;line-height:.9;margin-bottom:20px;}
.hero-name span{color:var(–accent);}
.stats-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;}
.sg{background:var(–s1);border:1px solid var(–border);border-radius:10px;padding:12px 10px;}
.sg-v{font-family:‘Bebas Neue’,sans-serif;font-size:30px;color:var(–accent);line-height:1;}
.sg-l{font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(–muted);margin-top:3px;}

/* Today card */
.today-wrap{padding:16px 16px 0;}
.today-card{background:var(–s2);border:1px solid var(–border);border-radius:var(–r);overflow:hidden;}
.tc-top{padding:14px 16px;display:flex;align-items:center;gap:12px;}
.tc-bar{width:4px;height:46px;border-radius:2px;flex-shrink:0;}
.tc-info{flex:1;}
.tc-name{font-family:‘Barlow Condensed’,sans-serif;font-size:20px;font-weight:800;letter-spacing:.5px;margin-bottom:3px;}
.tc-sub{font-size:11px;color:var(–muted);}
.tc-pill{flex-shrink:0;}
.start-btn{
width:100%;padding:15px;
background:var(–accent);color:#000;
font-family:‘Barlow Condensed’,sans-serif;font-size:18px;font-weight:800;letter-spacing:1px;text-transform:uppercase;
border-radius:0 0 var(–r) var(–r);transition:opacity .15s;
}
.start-btn:active{opacity:.8;}
.start-btn.rest{background:var(–s3);color:var(–muted);}

/* Streak */
.streak-bar{
margin:12px 16px 0;
background:linear-gradient(135deg,#111 0%,#141400 100%);
border:1px solid rgba(200,255,0,.18);border-radius:var(–r);
padding:14px 16px;display:flex;align-items:center;gap:14px;
}
.sf{font-size:38px;line-height:1;}
.si-v{font-family:‘Bebas Neue’,sans-serif;font-size:30px;color:var(–accent);line-height:1;}
.si-l{font-size:11px;color:var(–muted);}

/* PRs */
.prs-scroll{display:flex;gap:10px;overflow-x:auto;padding:12px 16px 0;scrollbar-width:none;}
.prs-scroll::-webkit-scrollbar{display:none;}
.pr-chip{flex-shrink:0;background:var(–s2);border:1px solid var(–border);border-radius:10px;padding:12px 14px;min-width:130px;}
.pr-chip .pce{font-size:10px;color:var(–muted);font-weight:600;margin-bottom:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:110px;}
.pr-chip .pcv{font-family:‘Bebas Neue’,sans-serif;font-size:24px;color:var(–gold);}
.pr-chip .pct{font-size:9px;color:var(–muted);margin-top:2px;}

/* Recent */
.recent-list{padding:0 16px;}
.rl-item{
background:var(–s2);border:1px solid var(–border);border-radius:10px;
padding:12px 14px;display:flex;align-items:center;gap:12px;margin-bottom:8px;
}
.rl-date{font-family:‘Bebas Neue’,sans-serif;font-size:24px;color:var(–muted);width:30px;text-align:center;line-height:1;}
.rl-bar{width:4px;height:36px;border-radius:2px;flex-shrink:0;}
.rl-info h4{font-size:13px;font-weight:700;margin-bottom:2px;}
.rl-info p{font-size:11px;color:var(–muted);}
.rl-vol{margin-left:auto;text-align:right;}
.rl-vol .v{font-family:‘Bebas Neue’,sans-serif;font-size:20px;color:var(–gold);}
.rl-vol .u{font-size:9px;color:var(–muted);}

/* Active banner */
.active-banner{
margin:12px 16px 0;
background:rgba(200,255,0,.08);border:1px solid rgba(200,255,0,.25);
border-radius:var(–r);padding:14px 16px;
display:flex;align-items:center;gap:12px;cursor:pointer;
}
.ab-dot{width:10px;height:10px;border-radius:50%;background:var(–accent);animation:pulse 1.5s infinite;}
@keyframes pulse{0%,100%{opacity:1;}50%{opacity:.3;}}
.ab-text{flex:1;}
.ab-title{font-size:13px;font-weight:700;color:var(–accent);margin-bottom:2px;}
.ab-sub{font-size:11px;color:var(–muted);}
.ab-arr{font-size:18px;color:var(–accent);}

/* ══════════════════════════════════════
TREINOS (all workouts picker)
══════════════════════════════════════ */
.workouts-list{padding:0 16px;}
.wl-day{
background:var(–s2);border:1px solid var(–border);border-radius:var(–r);
margin-bottom:10px;overflow:hidden;
transition:border-color .2s;cursor:pointer;
}
.wl-day.today-highlight{border-color:var(–accent);background:rgba(200,255,0,.04);}
.wl-day:active{opacity:.8;}
.wld-top{padding:16px;display:flex;align-items:center;gap:12px;}
.wld-color{width:6px;height:52px;border-radius:3px;flex-shrink:0;}
.wld-info{flex:1;}
.wld-name{font-family:‘Bebas Neue’,sans-serif;font-size:24px;letter-spacing:1px;line-height:1;margin-bottom:3px;}
.wld-label{font-size:12px;color:var(–muted);}
.wld-badge{flex-shrink:0;display:flex;flex-direction:column;align-items:flex-end;gap:5px;}
.today-badge{background:var(–accent);color:#000;font-size:9px;font-weight:800;letter-spacing:1.5px;padding:3px 8px;border-radius:4px;}
.wld-excount{font-size:10px;color:var(–muted);font-weight:600;}
.wld-muscles{
padding:0 16px 14px;
display:flex;flex-wrap:wrap;gap:5px;
}
.wld-muscle-tag{
padding:3px 8px;border-radius:20px;
font-size:9px;font-weight:700;letter-spacing:1px;text-transform:uppercase;
}

/* ══════════════════════════════════════
WORKOUT (active session)
══════════════════════════════════════ */
/* Floating timer */
.float-timer{
position:fixed;top:12px;right:12px;z-index:300;
background:rgba(10,10,10,.92);backdrop-filter:blur(12px);
border:1px solid var(–border2);border-radius:24px;
padding:6px 14px;
display:flex;align-items:center;gap:6px;
pointer-events:none;
display:none;
}
.float-timer.show{display:flex;}
.ft-dot{width:6px;height:6px;border-radius:50%;background:var(–accent);animation:pulse 1.5s infinite;}
.ft-time{font-family:‘Bebas Neue’,sans-serif;font-size:20px;color:var(–accent);letter-spacing:1px;line-height:1;}

/* Workout header */
.wk-header{
position:sticky;top:0;z-index:100;
background:rgba(8,8,8,.98);backdrop-filter:blur(12px);
border-bottom:1px solid var(–border);
padding:12px 16px;
}
.wkh-top{display:flex;align-items:center;gap:10px;margin-bottom:8px;}
.wkh-color{width:6px;height:42px;border-radius:3px;flex-shrink:0;}
.wkh-info{flex:1;}
.wkh-name{font-family:‘Bebas Neue’,sans-serif;font-size:24px;letter-spacing:1px;line-height:1;}
.wkh-label{font-size:11px;color:var(–muted);margin-top:2px;}
.finish-btn{
background:var(–accent);color:#000;
font-family:‘Barlow Condensed’,sans-serif;
font-size:15px;font-weight:800;letter-spacing:.5px;
padding:9px 18px;border-radius:8px;flex-shrink:0;
}

/* Rest timer */
.rest-bar{
background:var(–s1);padding:10px 16px;
display:flex;align-items:center;gap:10px;
border-bottom:1px solid var(–border);
}
.rest-bar.hidden{display:none;}
.rb-ex{font-size:11px;color:var(–muted);font-weight:600;flex:1;
white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.rb-count{font-family:‘Bebas Neue’,sans-serif;font-size:30px;color:var(–accent);line-height:1;min-width:40px;}
.rb-prog{flex:1;height:3px;background:var(–s4);border-radius:2px;overflow:hidden;}
.rb-fill{height:100%;background:var(–accent);transition:width .1s linear;border-radius:2px;}
.rb-skip{font-size:11px;font-weight:700;color:var(–muted);padding:5px 10px;border:1px solid var(–border);border-radius:6px;}

/* Muscle section */
.ms{padding:14px 16px 0;}
.ms-hd{display:flex;align-items:center;gap:8px;margin-bottom:10px;}
.ms-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;}
.ms-nm{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:var(–muted);}
.ms-ln{flex:1;height:1px;background:var(–border);}

/* Exercise block */
.ex-block{background:var(–s2);border:1px solid var(–border);border-radius:var(–r);margin-bottom:10px;overflow:hidden;}
.ex-hd{padding:12px 14px;display:flex;align-items:center;gap:10px;}
.ex-icon{width:38px;height:38px;border-radius:9px;background:var(–s3);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;}
.ex-ta{flex:1;min-width:0;}
.ex-nm{font-size:14px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.ex-sub{font-size:10px;color:var(–muted);margin-top:2px;}
.ex-tags{display:flex;gap:5px;margin-top:5px;flex-wrap:wrap;}
.ex-tag{
font-size:9px;font-weight:700;letter-spacing:1px;text-transform:uppercase;
padding:2px 7px;border-radius:3px;
}
.tag-base{background:rgba(200,255,0,.12);color:var(–accent);}
.tag-iso{background:rgba(0,180,255,.12);color:var(–blue);}
.tag-comp{background:rgba(255,69,0,.12);color:var(–red);}
.tag-uni{background:rgba(179,136,255,.12);color:var(–purple);}
.tag-dur{background:rgba(0,230,118,.12);color:var(–green);}
.tag-reg{background:rgba(255,255,255,.07);color:#888;}

.yt-btn{
width:34px;height:34px;border-radius:8px;
background:rgba(255,0,0,.12);border:1px solid rgba(255,0,0,.25);
display:flex;align-items:center;justify-content:center;flex-shrink:0;
color:#ff4040;font-size:13px;
}
.rest-badge{
font-size:9px;font-weight:700;letter-spacing:.5px;
color:var(–muted);background:var(–s3);
padding:2px 7px;border-radius:4px;
display:flex;align-items:center;gap:4px;flex-shrink:0;
}

/* Sets table */
.sets-wrap{overflow-x:auto;}
table.sets{width:100%;border-collapse:collapse;}
table.sets thead td{
background:var(–s1);padding:6px 12px;
font-size:9px;font-weight:700;text-transform:uppercase;
letter-spacing:1.5px;color:var(–muted);
white-space:nowrap;
}
table.sets tbody tr{transition:background .15s;}
table.sets tbody tr.done-row{background:rgba(200,255,0,.04);}
table.sets tbody td{padding:7px 12px;vertical-align:middle;}
.sn{font-family:‘Barlow Condensed’,sans-serif;font-size:15px;font-weight:700;color:var(–muted);width:28px;}
.sp{font-size:11px;color:var(–muted2);min-width:72px;white-space:nowrap;}
.si{
width:68px;background:var(–s3);border:1px solid var(–border);
border-radius:7px;padding:7px 6px;color:var(–text);
font-size:14px;font-weight:700;text-align:center;
}
.si:focus{outline:none;border-color:var(–accent);}
.chk{
width:32px;height:32px;border-radius:8px;border:2px solid var(–border);
display:flex;align-items:center;justify-content:center;
font-size:14px;background:transparent;transition:all .15s;
}
.chk.on{background:var(–accent);border-color:var(–accent);color:#000;}

/* Suggestion row */
.sug-row{
padding:8px 14px 10px;
background:rgba(0,180,255,.05);
border-top:1px solid rgba(0,180,255,.1);
font-size:11px;color:var(–blue);
display:flex;align-items:center;gap:6px;
}
.sug-row span{font-weight:700;}

/* ══════════════════════════════════════
CALENDAR
══════════════════════════════════════ */
.cal-top{padding:20px 16px 14px;}
.cal-nav{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;}
.cal-month{font-family:‘Bebas Neue’,sans-serif;font-size:28px;letter-spacing:1px;}
.cn-btn{width:36px;height:36px;border-radius:8px;border:1px solid var(–border);color:var(–text);font-size:18px;display:flex;align-items:center;justify-content:center;}
.cal-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:3px;}
.cal-wd{text-align:center;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(–muted);padding:6px 0;}
.cal-d{
aspect-ratio:1;border-radius:7px;
display:flex;align-items:center;justify-content:center;
font-size:12px;font-weight:600;color:var(–muted2);
position:relative;
}
.cal-d.has{color:var(–text);}
.cal-d.has::after{
content:’’;position:absolute;bottom:3px;left:50%;transform:translateX(-50%);
width:4px;height:4px;border-radius:50%;
}
.cal-d.today{background:var(–s2);border:1px solid var(–border);color:var(–text);}
.cal-d.push.has::after{background:var(–push);}
.cal-d.pull.has::after{background:var(–pull);}
.cal-d.legs.has::after{background:var(–legs);}
.cal-d.upper.has::after{background:var(–upper);}
.cal-d.lower.has::after{background:var(–lower);}
.cal-legend{display:flex;flex-wrap:wrap;gap:8px;padding:10px 16px;}
.cl-item{display:flex;align-items:center;gap:5px;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:1px;color:var(–muted);}
.cl-dot{width:8px;height:8px;border-radius:50%;}
.month-list{padding:0 16px;}
.ml-item{
background:var(–s2);border:1px solid var(–border);border-radius:10px;
padding:12px 14px;display:flex;align-items:center;gap:12px;margin-bottom:8px;
}
.ml-d{font-family:‘Bebas Neue’,sans-serif;font-size:22px;color:var(–muted);width:28px;text-align:center;}
.ml-bar{width:4px;height:36px;border-radius:2px;flex-shrink:0;}
.ml-info h4{font-size:13px;font-weight:700;margin-bottom:2px;}
.ml-info p{font-size:11px;color:var(–muted);}
.ml-vol{margin-left:auto;text-align:right;}
.ml-vol .v{font-family:‘Bebas Neue’,sans-serif;font-size:18px;color:var(–gold);}
.ml-vol .u{font-size:9px;color:var(–muted);}

/* ══════════════════════════════════════
PROGRESS
══════════════════════════════════════ */
.prog-tabs{
display:flex;margin:16px 16px 0;
background:var(–s1);border:1px solid var(–border);border-radius:10px;overflow:hidden;
}
.pt-btn{flex:1;padding:10px 6px;font-size:10px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;color:var(–muted);text-align:center;transition:all .2s;}
.pt-btn.active{background:var(–s3);color:var(–text);}
.prog-content{padding:14px 16px 0;}
.prog-panel{display:none;}
.prog-panel.active{display:block;}
.ex-sel{
width:100%;background:var(–s2);border:1px solid var(–border);
border-radius:8px;padding:10px 14px;color:var(–text);
font-size:13px;margin-bottom:14px;
background-image:url(“data:image/svg+xml,%3Csvg xmlns=‘http://www.w3.org/2000/svg’ width=‘12’ height=‘8’ viewBox=‘0 0 12 8’%3E%3Cpath d=‘M1 1l5 5 5-5’ stroke=’%23666’ stroke-width=‘1.5’ stroke-linecap=‘round’ fill=‘none’/%3E%3C/svg%3E”);
background-repeat:no-repeat;background-position:right 14px center;
appearance:none;
}
.chart-box{background:var(–s2);border:1px solid var(–border);border-radius:var(–r);padding:14px;margin-bottom:12px;}
.chart-title{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:var(–muted);margin-bottom:12px;}
.mchart{height:90px;display:flex;align-items:flex-end;gap:3px;}
.mc-b{flex:1;border-radius:3px 3px 0 0;min-height:3px;position:relative;}
.mc-bl{position:absolute;bottom:-17px;left:50%;transform:translateX(-50%);font-size:8px;color:var(–muted);white-space:nowrap;}
.mc-bv{position:absolute;top:-16px;left:50%;transform:translateX(-50%);font-size:8px;color:var(–muted);white-space:nowrap;}
.chart-x{height:18px;}
.sug-card{
background:rgba(0,180,255,.06);border:1px solid rgba(0,180,255,.15);
border-radius:8px;padding:12px 14px;margin-bottom:12px;
font-size:12px;color:var(–blue);
}
.sug-card strong{font-weight:700;}

.pr-row{
background:rgba(255,183,0,.08);border:1px solid rgba(255,183,0,.2);
border-radius:8px;padding:12px 14px;margin-bottom:8px;
display:flex;align-items:center;justify-content:space-between;
}
.pr-row .pr-nm{font-size:13px;font-weight:700;margin-bottom:3px;}
.pr-row .pr-dt{font-size:10px;color:var(–muted);}
.pr-row .pr-kg{font-family:‘Bebas Neue’,sans-serif;font-size:28px;color:var(–gold);}

.body-fields{display:grid;grid-template-columns:1fr;gap:10px;margin-bottom:12px;}
.bf{background:var(–s2);border:1px solid var(–border);border-radius:8px;padding:12px;}
.bf-l{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(–muted);margin-bottom:6px;}
.bf-i{width:100%;background:transparent;border:none;color:var(–text);font-size:22px;font-weight:700;}
.bf-i:focus{outline:none;}
.save-btn{width:100%;padding:13px;background:var(–s3);border:1px solid var(–border);border-radius:8px;font-family:‘Barlow Condensed’,sans-serif;font-size:16px;font-weight:800;letter-spacing:.5px;text-transform:uppercase;color:var(–text);transition:background .15s;}
.save-btn:active{background:var(–accent);color:#000;}
.wh-row{display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(–border);}
.wh-row:last-child{border-bottom:none;}
.wh-dt{font-size:12px;color:var(–muted);}
.wh-kg{font-family:‘Bebas Neue’,sans-serif;font-size:22px;}
.wh-delta{font-size:11px;font-weight:700;}
.delta-dn{color:var(–green);}
.delta-up{color:var(–red);}

/* ══════════════════════════════════════
WORKOUT COMPLETE
══════════════════════════════════════ */
.wc-overlay{
position:fixed;inset:0;background:rgba(0,0,0,.96);z-index:10000;
display:none;flex-direction:column;align-items:center;justify-content:center;
padding:24px;text-align:center;
}
.wc-overlay.show{display:flex;}
.wc-emoji{font-size:80px;margin-bottom:16px;}
.wc-title{font-family:‘Bebas Neue’,sans-serif;font-size:56px;color:var(–accent);letter-spacing:2px;line-height:.9;margin-bottom:8px;}
.wc-sub{font-size:14px;color:var(–muted);margin-bottom:24px;}
.wc-stats{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;width:100%;margin-bottom:28px;}
.wcs{background:var(–s2);border:1px solid var(–border);border-radius:10px;padding:14px 10px;}
.wcs-v{font-family:‘Bebas Neue’,sans-serif;font-size:30px;color:var(–accent);}
.wcs-l{font-size:9px;color:var(–muted);font-weight:700;text-transform:uppercase;letter-spacing:1px;}
.wc-close{width:100%;padding:16px;background:var(–accent);color:#000;font-family:‘Barlow Condensed’,sans-serif;font-size:20px;font-weight:800;letter-spacing:1px;border-radius:12px;}
</style>

</head>
<body>

<!-- Floating timer -->

<div class="float-timer" id="floatTimer">
  <div class="ft-dot"></div>
  <div class="ft-time" id="ftTime">00:00</div>
</div>

<!-- Toast -->

<div class="toast" id="toast"></div>

<!-- Workout complete overlay -->

<div class="wc-overlay" id="wcOverlay">
  <div class="wc-emoji">🔥</div>
  <div class="wc-title">TREINO<br>CONCLUÍDO</div>
  <div class="wc-sub" id="wcSub"></div>
  <div class="wc-stats">
    <div class="wcs"><div class="wcs-v" id="wcDur">0</div><div class="wcs-l">Minutos</div></div>
    <div class="wcs"><div class="wcs-v" id="wcSets">0</div><div class="wcs-l">Séries</div></div>
    <div class="wcs"><div class="wcs-v" id="wcVol">0</div><div class="wcs-l">kg Volume</div></div>
  </div>
  <button class="wc-close" onclick="closeComplete()">VOLTAR AO INÍCIO</button>
</div>

<!-- ══════════════════════════════════════
     SCREEN: HOME
══════════════════════════════════════ -->

<div class="screen active" id="s-home">
  <div class="hero">
    <div class="hero-greeting" id="greeting">Bom dia,</div>
    <div class="hero-name">E aí,<br><span>HELLDER</span></div>
    <div class="stats-grid">
      <div class="sg"><div class="sg-v" id="hStreak">0</div><div class="sg-l">🔥 Streak</div></div>
      <div class="sg"><div class="sg-v" id="hTotal">0</div><div class="sg-l">Treinos</div></div>
      <div class="sg"><div class="sg-v" id="hWeek">0</div><div class="sg-l">Esta semana</div></div>
    </div>
  </div>

  <!-- Active workout banner -->

  <div class="active-banner" id="activeBanner" style="display:none" onclick="resumeActive()">
    <div class="ab-dot"></div>
    <div class="ab-text">
      <div class="ab-title" id="abTitle">Treino em andamento</div>
      <div class="ab-sub" id="abSub">Toque para continuar</div>
    </div>
    <div class="ab-arr">›</div>
  </div>

  <!-- Today card -->

  <div class="today-wrap">
    <div class="today-card">
      <div class="tc-top">
        <div class="tc-bar" id="tcBar"></div>
        <div class="tc-info">
          <div class="tc-name" id="tcName">—</div>
          <div class="tc-sub" id="tcSub">—</div>
        </div>
        <div class="tc-pill" id="tcPill"></div>
      </div>
      <button class="start-btn" id="startBtn" onclick="startTodayWorkout()">INICIAR TREINO</button>
    </div>
  </div>

  <!-- Streak -->

  <div class="streak-bar">
    <div class="sf">🔥</div>
    <div>
      <div class="si-v" id="streakV">0 dias</div>
      <div class="si-l">de sequência consecutiva</div>
    </div>
  </div>

  <!-- PRs -->

  <div style="padding:16px 16px 0;"><div class="sl">Recordes Pessoais</div></div>
  <div class="prs-scroll" id="prsScroll"></div>

  <!-- Recent -->

  <div style="padding:14px 16px 4px;"><div class="sl">Últimos Treinos</div></div>
  <div class="recent-list" id="recentList"></div>
</div>

<!-- ══════════════════════════════════════
     SCREEN: TREINOS (all workouts)
══════════════════════════════════════ -->

<div class="screen" id="s-treinos">
  <div class="ph"><div class="pt">Treinos</div></div>
  <div style="padding:8px 16px 14px;font-size:12px;color:var(--muted);">Selecione qualquer treino para iniciar. O treino de hoje fica destacado.</div>
  <div class="workouts-list" id="workoutsList"></div>
</div>

<!-- ══════════════════════════════════════
     SCREEN: ACTIVE WORKOUT
══════════════════════════════════════ -->

<div class="screen" id="s-workout">
  <div class="wk-header" id="wkHeader">
    <div class="wkh-top">
      <div class="wkh-color" id="wkhColor"></div>
      <div class="wkh-info">
        <div class="wkh-name" id="wkhName">PUSH</div>
        <div class="wkh-label" id="wkhLabel">Peito · Ombro · Tríceps</div>
      </div>
      <button class="finish-btn" onclick="finishWorkout()">FINALIZAR</button>
    </div>
  </div>
  <div class="rest-bar hidden" id="restBar">
    <div class="rb-ex" id="rbEx">Descanso</div>
    <div class="rb-count" id="rbCount">90</div>
    <div class="rb-prog"><div class="rb-fill" id="rbFill" style="width:100%"></div></div>
    <button class="rb-skip" onclick="skipRest()">PULAR</button>
  </div>
  <div id="wkExercises"></div>
</div>

<!-- ══════════════════════════════════════
     SCREEN: CALENDAR
══════════════════════════════════════ -->

<div class="screen" id="s-calendar">
  <div class="cal-top">
    <div class="cal-nav">
      <button class="cn-btn" onclick="calNav(-1)">‹</button>
      <div class="cal-month" id="calMonth">Abril 2026</div>
      <button class="cn-btn" onclick="calNav(1)">›</button>
    </div>
    <div class="cal-grid" id="calGrid"></div>
    <div class="cal-legend">
      <div class="cl-item"><div class="cl-dot" style="background:var(--push)"></div>Push</div>
      <div class="cl-item"><div class="cl-dot" style="background:var(--pull)"></div>Pull</div>
      <div class="cl-item"><div class="cl-dot" style="background:var(--legs)"></div>Legs</div>
      <div class="cl-item"><div class="cl-dot" style="background:var(--upper)"></div>Upper</div>
      <div class="cl-item"><div class="cl-dot" style="background:var(--lower)"></div>Lower</div>
    </div>
  </div>
  <div class="sl" style="padding:0 16px;margin-bottom:10px;">Treinos do Mês</div>
  <div class="month-list" id="monthList"></div>
</div>

<!-- ══════════════════════════════════════
     SCREEN: PROGRESS
══════════════════════════════════════ -->

<div class="screen" id="s-progress">
  <div class="ph"><div class="pt">Progresso</div></div>
  <div class="prog-tabs">
    <button class="pt-btn active" onclick="setProgTab('lift')">Cargas</button>
    <button class="pt-btn" onclick="setProgTab('volume')">Volume</button>
    <button class="pt-btn" onclick="setProgTab('body')">Corpo</button>
    <button class="pt-btn" onclick="setProgTab('prs')">PRs</button>
  </div>
  <div class="prog-content">
    <div class="prog-panel active" id="tp-lift">
      <select class="ex-sel" id="liftSel" onchange="renderLift()"></select>
      <div class="chart-box"><div class="chart-title">Progressão de Carga (kg)</div><div class="mchart" id="liftChart"></div><div class="chart-x" id="liftX"></div></div>
      <div id="liftSug"></div>
    </div>
    <div class="prog-panel" id="tp-volume">
      <div class="chart-box"><div class="chart-title">Volume Semanal (ton.)</div><div class="mchart" id="volChart"></div><div class="chart-x" id="volX"></div></div>
      <div class="chart-box"><div class="chart-title">Frequência Semanal</div><div class="mchart" id="freqChart"></div><div class="chart-x" id="freqX"></div></div>
    </div>
    <div class="prog-panel" id="tp-body">
      <div class="sl" style="margin-top:4px;">Registrar Peso Corporal</div>
      <div class="body-fields">
        <div class="bf"><div class="bf-l">Peso <span style="color:var(--muted);font-weight:400">kg</span></div><input class="bf-i" id="bodyW" type="number" placeholder="77.0" step="0.1"></div>
      </div>
      <button class="save-btn" onclick="saveBody()">SALVAR REGISTRO</button>
      <div id="bodyHist" style="margin-top:16px;"></div>
    </div>
    <div class="prog-panel" id="tp-prs">
      <div class="sl" style="margin-top:4px;">Recordes Pessoais</div>
      <div id="prList"></div>
    </div>
  </div>
</div>

<!-- BOTTOM NAV -->

<nav class="nav">
  <button class="nb active" id="nb-home" onclick="goTo('home')">
    <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
    Início
  </button>
  <button class="nb" id="nb-treinos" onclick="goTo('treinos')">
    <svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
    Treinos
  </button>
  <button class="nb" id="nb-workout" onclick="goTo('workout')">
    <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
    Ativo
    <div class="dot"></div>
  </button>
  <button class="nb" id="nb-calendar" onclick="goTo('calendar')">
    <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
    Calendário
  </button>
  <button class="nb" id="nb-progress" onclick="goTo('progress')">
    <svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
    Progresso
  </button>
</nav>

<script>
/* ══════════════════════════════════════════════════
   DATA DEFINITIONS
══════════════════════════════════════════════════ */
const DAYS = [
  {
    id:'push', name:'PUSH', label:'Peito · Ombro · Tríceps', color:'#FF4500', dow:1,
    muscles:[
      {name:'Peito', color:'#ff6b6b', exercises:[
        {id:'sup_maq',    name:'Supino Reto Máquina',    target:'Peitoral Esternal',           icon:'🏋️', rest:120, tag:'base', region:'Peitoral',  yt:'supino+reto+maquina+execucao+hipertrofia',          sets:4,reps:10},
        {id:'sup_inc',    name:'Supino Inclinado',        target:'Peitoral Superior',           icon:'📐', rest:90,  tag:'base', region:'Peitoral',  yt:'supino+inclinado+execucao+correto',                 sets:3,reps:10},
        {id:'peck_deck',  name:'Crucifixo Máquina',       target:'Peitoral — Isolamento Total', icon:'🦅', rest:60,  tag:'iso',  region:'Peitoral',  yt:'peck+deck+crucifixo+maquina+execucao',              sets:3,reps:12},
      ]},
      {name:'Ombro', color:'#ffa94d', exercises:[
        {id:'dev_maq',    name:'Máquina Desenvolvimento', target:'Deltóide Anterior e Medial',  icon:'💪', rest:90,  tag:'base', region:'Ombro',     yt:'desenvolvimento+ombro+maquina+execucao',            sets:4,reps:10},
        {id:'elev_lat',   name:'Elevação Lateral',        target:'Deltóide Medial',             icon:'✈️', rest:60,  tag:'iso',  region:'Ombro',     yt:'elevacao+lateral+execucao+correta+deltóide+medial', sets:4,reps:15},
        {id:'elev_front', name:'Elevação Frontal Cabo',   target:'Deltóide Anterior',           icon:'⬆️', rest:60,  tag:'iso',  region:'Ombro',     yt:'elevacao+frontal+cabo+execucao',                    sets:3,reps:12},
      ]},
      {name:'Tríceps', color:'#ff9f43', exercises:[
        {id:'tric_barra', name:'Tríceps Polia Barra Reta',target:'Cabeça Lateral e Medial',     icon:'〽️', rest:60,  tag:'comp', region:'Tríceps',   yt:'triceps+polia+barra+reta+execucao+correta',         sets:4,reps:12},
        {id:'tric_franc', name:'Tríceps Francês',         target:'Cabeça Longa',                icon:'🧠', rest:90,  tag:'comp', region:'Tríceps',   yt:'triceps+frances+execucao+perfeita+cabeca+longa',    sets:3,reps:10},
        {id:'tric_corda', name:'Tríceps Polia Corda',     target:'Cabeça Medial',               icon:'🔗', rest:60,  tag:'iso',  region:'Tríceps',   yt:'triceps+polia+corda+execucao+cabeca+medial',        sets:3,reps:12},
      ]},
    ]
  },
  {
    id:'pull', name:'PULL', label:'Costas · Bíceps · Posterior', color:'#00B4FF', dow:2,
    muscles:[
      {name:'Costas — Largura', color:'#74b9ff', exercises:[
        {id:'pux_anat',   name:'Puxada Pegada Anatômica', target:'Dorsal Inferior e Médio',     icon:'🔻', rest:120, tag:'base', region:'Costas',    yt:'puxada+supinada+anatomica+execucao+dorsal',         sets:4,reps:10},
        {id:'pux_uni',    name:'Puxada Unilateral Cabo',  target:'Dorsal Lateral',              icon:'1️⃣', rest:60,  tag:'uni',  region:'Costas',    yt:'puxada+unilateral+cabo+execucao+dorsal',            sets:3,reps:12},
        {id:'pux_ab',     name:'Puxada Aberta Máquina',   target:'Largura Dorsal',              icon:'↔️', rest:90,  tag:'base', region:'Costas',    yt:'puxada+aberta+costas+execucao+largura',             sets:3,reps:10},
      ]},
      {name:'Costas — Espessura', color:'#0984e3', exercises:[
        {id:'rem_cav',    name:'Remada Cavalinho',         target:'Trapézio Médio · Rombóide',  icon:'🐴', rest:120, tag:'base', region:'Costas',    yt:'remada+cavalinho+maquina+execucao+correta',         sets:4,reps:10},
        {id:'rem_tri',    name:'Remada Baixa Triângulo',   target:'Dorsal Baixo e Médio',        icon:'🔺', rest:90,  tag:'base', region:'Costas',    yt:'remada+baixa+triangulo+cabo+execucao',              sets:4,reps:10},
        {id:'rem_uni',    name:'Remada Unilateral Cabo',   target:'Romboide · Trapézio Inf.',   icon:'💪', rest:60,  tag:'uni',  region:'Costas',    yt:'remada+unilateral+cabo+execucao+costas',            sets:3,reps:12},
      ]},
      {name:'Posterior Ombro', color:'#636e72', exercises:[
        {id:'peck_inv',   name:'Peck Deck Invertido',      target:'Deltóide Posterior',         icon:'🔄', rest:60,  tag:'iso',  region:'Ombro Posterior', yt:'peck+deck+invertido+posterior+ombro+execucao', sets:4,reps:15},
      ]},
      {name:'Bíceps', color:'#00cec9', exercises:[
        {id:'rosca_bar',  name:'Rosca Direta Barra',       target:'Bíceps Cabeça Longa',        icon:'💪', rest:90,  tag:'base', region:'Bíceps',    yt:'rosca+direta+barra+execucao+biceps+hipertrofia',    sets:4,reps:10},
        {id:'drag_curl',  name:'Drag Curl',                 target:'Cabeça Longa · Barra Rente', icon:'🐉', rest:60,  tag:'comp', region:'Bíceps',    yt:'drag+curl+biceps+execucao+tecnica',                 sets:3,reps:10},
        {id:'martelo',    name:'Rosca Martelo',             target:'Braquial · Braquiorradial',  icon:'🔨', rest:60,  tag:'comp', region:'Bíceps',    yt:'rosca+martelo+execucao+perfeita+braquial',          sets:3,reps:12},
        {id:'conc',       name:'Rosca Concentrada Cabo',   target:'Cabeça Curta · Pico',        icon:'🎯', rest:60,  tag:'iso',  region:'Bíceps',    yt:'rosca+concentrada+cabo+execucao+pico+biceps',       sets:3,reps:12},
      ]},
    ]
  },
  {
    id:'legs', name:'LEGS', label:'Pernas Completo', color:'#00E676', dow:3,
    muscles:[
      {name:'Quadríceps', color:'#55efc4', exercises:[
        {id:'leg_press',  name:'Leg Press 45°',           target:'Quadríceps + Glúteo',        icon:'🦵', rest:120, tag:'base', region:'Quadríceps',yt:'leg+press+45+execucao+hipertrofia+quadriceps',      sets:4,reps:10},
        {id:'hack',       name:'Agachamento Hack',         target:'VMO · Vasto Medial',         icon:'⚙️', rest:120, tag:'base', region:'Quadríceps',yt:'agachamento+hack+execucao+quadriceps+vmo',          sets:4,reps:10},
        {id:'ext_cad',    name:'Cadeira Extensora',        target:'Isolamento Quadríceps',      icon:'🪑', rest:60,  tag:'iso',  region:'Quadríceps',yt:'cadeira+extensora+execucao+isolamento+quadriceps',  sets:3,reps:15},
      ]},
      {name:'Posterior + Glúteo', color:'#00b894', exercises:[
        {id:'flex_deit',  name:'Cadeira Flexora Deitado',  target:'Isquiotibiais',              icon:'🛋️', rest:90,  tag:'iso',  region:'Isquiotibiais',yt:'cadeira+flexora+deitada+execucao+isquiotibiais', sets:4,reps:12},
        {id:'stiff',      name:'Stiff',                    target:'Posterior + Glúteo',         icon:'🏗️', rest:90,  tag:'comp', region:'Posterior', yt:'stiff+levantamento+terra+romeno+execucao+posterior',sets:3,reps:10},
        {id:'abduc',      name:'Abdução Cabo/Máquina',     target:'Glúteo Médio',               icon:'⬅️', rest:60,  tag:'iso',  region:'Glúteo',    yt:'abducao+quadril+cabo+maquina+gluteo+medio',         sets:3,reps:15},
      ]},
      {name:'Panturrilha', color:'#6c5ce7', exercises:[
        {id:'pant_pe',    name:'Panturrilha em Pé',        target:'Gastrocnêmio',               icon:'🦶', rest:60,  tag:'iso',  region:'Panturrilha',yt:'panturrilha+em+pe+gastrocnemio+execucao',          sets:4,reps:15},
        {id:'pant_sent',  name:'Panturrilha Sentado',      target:'Sóleo',                      icon:'💺', rest:60,  tag:'iso',  region:'Panturrilha',yt:'panturrilha+sentado+soleo+execucao+perfeita',       sets:3,reps:15},
      ]},
    ]
  },
  {
    id:'upper', name:'UPPER', label:'Peito + Costas + Ombro + Abdômen', color:'#B388FF', dow:4,
    muscles:[
      {name:'Peito — Porção Inferior', color:'#fd79a8', exercises:[
        {id:'sup_dec',    name:'Supino Declinado/Cabo',    target:'Peitoral Esternocostal Inf.',icon:'📉', rest:90,  tag:'base', region:'Peitoral',  yt:'supino+declinado+cabo+execucao+peitoral+inferior',  sets:4,reps:10},
        {id:'crossover',  name:'Crossover Cabo',           target:'Peitoral Médio',             icon:'✂️', rest:60,  tag:'iso',  region:'Peitoral',  yt:'crossover+cabo+execucao+peitoral+adução',           sets:3,reps:15},
      ]},
      {name:'Costas — Espessura', color:'#a29bfe', exercises:[
        {id:'rem_ham',    name:'Remada Máquina Hammer',    target:'Trapézio + Rombóides',       icon:'🔨', rest:90,  tag:'base', region:'Costas',    yt:'remada+maquina+hammer+execucao+espessura+costas',   sets:4,reps:10},
        {id:'pullover',   name:'Pullover Máquina/Cabo',    target:'Dorsal + Serrátil',          icon:'🌊', rest:60,  tag:'comp', region:'Costas',    yt:'pullover+maquina+cabo+execucao+dorsal+serrátil',    sets:3,reps:12},
      ]},
      {name:'Ombro', color:'#fdcb6e', exercises:[
        {id:'elev_lat2',  name:'Elevação Lateral Cabo Uni',target:'Deltóide Medial',            icon:'✈️', rest:60,  tag:'iso',  region:'Ombro',     yt:'elevacao+lateral+cabo+unilateral+deltóide+medial',  sets:4,reps:15},
        {id:'face_pull',  name:'Face Pull Corda',          target:'Posterior + Rotadores Ext.', icon:'🎯', rest:60,  tag:'iso',  region:'Ombro Posterior',yt:'face+pull+corda+posterior+ombro+rotadores+externos',sets:4,reps:15},
      ]},
      {name:'Abdômen', color:'#e17055', exercises:[
        {id:'crunch_maq', name:'Crunch Máquina',           target:'Reto Abdominal Superior',    icon:'⚡', rest:60,  tag:'iso',  region:'Abdômen',   yt:'crunch+maquina+abdomen+execucao+perfeita',          sets:3,reps:15},
        {id:'elev_pernas',name:'Elevação de Pernas',        target:'Abdominal Inferior',         icon:'🦵', rest:60,  tag:'iso',  region:'Abdômen',   yt:'elevacao+de+pernas+abdomen+inferior+execucao',      sets:3,reps:15},
        {id:'prancha',    name:'Prancha Isométrica',        target:'Core Completo',              icon:'🛡️', rest:60,  tag:'dur',  region:'Core',      yt:'prancha+isometrica+core+abdomen+execucao',          sets:3,reps:0,isDur:true,dur:45},
        {id:'obliquo',    name:'Oblíquo Cabo/Rotação',     target:'Oblíquos',                   icon:'🌀', rest:60,  tag:'iso',  region:'Abdômen',   yt:'obliquo+cabo+rotacao+abdomen+execucao',             sets:3,reps:15},
      ]},
    ]
  },
  {
    id:'lower', name:'LOWER', label:'Pernas + Abdômen', color:'#FFB700', dow:5,
    muscles:[
      {name:'Quadríceps — Variação', color:'#f9ca24', exercises:[
        {id:'sq_smith',   name:'Agachamento Smith Sumo',   target:'Quadríceps + Adutores',      icon:'🏋️', rest:120, tag:'base', region:'Quadríceps',yt:'agachamento+smith+sumo+execucao+quadriceps+adutores',sets:4,reps:10},
        {id:'lunge',      name:'Avanço (Lunge) Halteres',  target:'Quadríceps + Glúteo',        icon:'👣', rest:60,  tag:'comp', region:'Quadríceps',yt:'avanco+lunge+halteres+quadriceps+gluteo+execucao',  sets:3,reps:12},
      ]},
      {name:'Posterior + Glúteo — Ênfase', color:'#e55039', exercises:[
        {id:'mesa_flex',  name:'Mesa Flexora Sentado',     target:'Isquiotibiais',              icon:'📐', rest:90,  tag:'iso',  region:'Isquiotibiais',yt:'mesa+flexora+sentado+isquiotibiais+execucao',    sets:4,reps:12},
        {id:'hip_thrust', name:'Hip Thrust Máquina/Barra', target:'Glúteo Máximo',              icon:'🚀', rest:90,  tag:'base', region:'Glúteo',    yt:'hip+thrust+execucao+gluteo+maximo+barra+maquina',   sets:4,reps:12},
        {id:'terra_rom',  name:'Terra Romeno Halteres',    target:'Cadeia Posterior Completa',  icon:'⚖️', rest:120, tag:'comp', region:'Posterior', yt:'levantamento+terra+romeno+halteres+execucao+perfeita',sets:3,reps:10},
      ]},
      {name:'Abdômen 2', color:'#e17055', exercises:[
        {id:'ab_cabo',    name:'Abdominal Cabo Ajoelhado', target:'Reto Abdominal com Carga',   icon:'🧗', rest:60,  tag:'iso',  region:'Abdômen',   yt:'abdominal+cabo+ajoelhado+execucao+reto+abdominal',  sets:4,reps:15},
        {id:'ab_inf',     name:'Abdominal Infra Banco Dec.',target:'Abdominal Inferior',        icon:'📉', rest:60,  tag:'iso',  region:'Abdômen',   yt:'abdominal+infra+banco+declinado+execucao+inferior', sets:3,reps:15},
        {id:'russian',    name:'Russian Twist Com Peso',   target:'Oblíquos e Core Rotacional', icon:'🔄', rest:60,  tag:'iso',  region:'Abdômen',   yt:'russian+twist+com+peso+obliquo+execucao',           sets:3,reps:20},
      ]},
    ]
  },
];

const DOW_TO_DAY = {1:'push',2:'pull',3:'legs',4:'upper',5:'lower'};
const MO_PT = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
const TAG_INFO = {base:{cls:'tag-base',lbl:'BASE'},iso:{cls:'tag-iso',lbl:'ISOLAMENTO'},comp:{cls:'tag-comp',lbl:'COMPOSTO'},uni:{cls:'tag-uni',lbl:'UNILATERAL'},dur:{cls:'tag-dur',lbl:'DURAÇÃO'}};

/* ══════════════════════════════════════════════════
   STATE
══════════════════════════════════════════════════ */
let S = {
  history:[], // {date,dayId,duration,sets,volume,exercises:{exId:[{w,r,done}]}}
  prs:{},     // {exId:{weight,reps,date}}
  body:[],    // {date,weight}
  active:null // {dayId,startTs,exercises:{},date_started_str}
};
function persist(){ try{localStorage.setItem('hg2',JSON.stringify(S));}catch(e){} }
function hydrate(){
  try{
    const d=localStorage.getItem('hg2');
    if(d) S=JSON.parse(d);
    S.history=S.history||[];S.prs=S.prs||{};S.body=S.body||[];
  }catch(e){S={history:[],prs:{},body:[],active:null};}
}
hydrate();

/* ══════════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════════ */
const todayStr=()=>{const n=new Date();return `${n.getFullYear()}-${p2(n.getMonth()+1)}-${p2(n.getDate())}`;};
const p2=n=>String(n).padStart(2,'0');
const fmtD=s=>{const[y,m,d]=s.split('-');return `${d}/${m}/${y}`;};
const fmtT=s=>{const m=Math.floor(s/60),sc=s%60;return `${p2(m)}:${p2(sc)}`;};
function todayDef(){const dow=new Date().getDay();const id=DOW_TO_DAY[dow];return id?DAYS.find(d=>d.id===id)||null:null;}
function getDef(id){return DAYS.find(d=>d.id===id)||null;}
function findEx(id){for(const day of DAYS)for(const m of day.muscles)for(const e of m.exercises)if(e.id===id)return e;return null;}
function calcStreak(){
  if(!S.history.length)return 0;
  const dates=[...new Set(S.history.map(w=>w.date))].sort().reverse();
  let streak=0,prev=null;
  for(const d of dates){
    if(!prev){prev=d;streak=1;continue;}
    const diff=(new Date(prev)-new Date(d))/(864e5);
    if(diff===1){streak++;prev=d;}
    else if(diff===0){prev=d;}
    else break;
  }
  return streak;
}
function weekCount(){
  const now=new Date();
  const start=new Date(now);start.setDate(now.getDate()-now.getDay());start.setHours(0,0,0,0);
  return S.history.filter(w=>new Date(w.date+'T00:00:00')>=start).length;
}
function lastSession(dayId){return S.history.filter(w=>w.dayId===dayId).slice(-1)[0]||null;}
function getSug(exId,lastW,lastR){
  if(!lastW||!lastR||isNaN(lastW)||isNaN(lastR))return null;
  if(lastR>=12)return `Aumente para ${(parseFloat(lastW)+2.5).toFixed(1)}kg × 8 reps`;
  if(lastR>=10)return `Tente ${lastW}kg × ${parseInt(lastR)+1} reps`;
  return `Mantenha ${lastW}kg × ${lastR} reps — foco na técnica`;
}
function toast(msg,cls=''){
  const t=document.getElementById('toast');
  t.textContent=msg;t.className='toast show '+(cls||'');
  setTimeout(()=>t.className='toast',2400);
}

/* ══════════════════════════════════════════════════
   NAVIGATION
══════════════════════════════════════════════════ */
let currentSc='home';
function goTo(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('.nb').forEach(b=>b.classList.remove('active'));
  document.getElementById('s-'+id).classList.add('active');
  document.getElementById('nb-'+id).classList.add('active');
  currentSc=id;
  if(id==='home')renderHome();
  if(id==='treinos')renderTreinos();
  if(id==='calendar')renderCal();
  if(id==='progress')renderProgress();
  if(id==='workout')restoreWorkoutUI();
  window.scrollTo(0,0);
}

/* ══════════════════════════════════════════════════
   HOME
══════════════════════════════════════════════════ */
function renderHome(){
  const h=new Date().getHours();
  document.getElementById('greeting').textContent=h<12?'Bom dia,':h<18?'Boa tarde,':'Boa noite,';
  document.getElementById('hStreak').textContent=calcStreak();
  document.getElementById('hTotal').textContent=S.history.length;
  document.getElementById('hWeek').textContent=weekCount();
  document.getElementById('streakV').textContent=calcStreak()+' dias';

  // Active banner
  const ab=document.getElementById('activeBanner');
  if(S.active){
    const d=getDef(S.active.dayId);
    document.getElementById('abTitle').textContent=(d?d.name+' em andamento':'Treino em andamento');
    const elapsed=Math.round((Date.now()-S.active.startTs)/60000);
    document.getElementById('abSub').textContent=`${elapsed} min · Toque para continuar`;
    ab.style.display='flex';
  } else { ab.style.display='none'; }

  // Today
  const td=todayDef();
  if(td){
    document.getElementById('tcBar').style.background=td.color;
    document.getElementById('tcName').textContent=td.name+' — '+td.label.split('·')[0].trim();
    document.getElementById('tcSub').textContent=td.label;
    document.getElementById('tcPill').innerHTML=`<div class="pill" style="background:${td.color}22;color:${td.color}">${td.name}</div>`;
    const btn=document.getElementById('startBtn');
    if(S.active && S.active.dayId===td.id){
      btn.textContent='CONTINUAR TREINO';btn.className='start-btn';
    } else {
      btn.textContent='INICIAR TREINO';btn.className='start-btn';
    }
    btn.style.background='';btn.style.color='';
  } else {
    document.getElementById('tcBar').style.background='#333';
    document.getElementById('tcName').textContent='Dia de Descanso';
    document.getElementById('tcSub').textContent='Sábado ou domingo — recuperação ativa';
    document.getElementById('tcPill').innerHTML='';
    const btn=document.getElementById('startBtn');
    btn.textContent='DIA DE DESCANSO';btn.className='start-btn rest';
  }

  // PRs
  const prs=Object.entries(S.prs);
  document.getElementById('prsScroll').innerHTML=prs.length
    ?prs.map(([id,pr])=>{const e=findEx(id);return `<div class="pr-chip"><div class="pce">${e?e.name:id}</div><div class="pcv">${pr.weight}kg</div><div class="pct">${pr.reps} reps · ${fmtD(pr.date)}</div></div>`;}).join('')
    :'<div class="pr-chip"><div class="pce">Nenhum PR</div><div class="pcv">—</div><div class="pct">Comece a treinar!</div></div>';

  // Recent
  const rec=S.history.slice(-5).reverse();
  document.getElementById('recentList').innerHTML=rec.length
    ?rec.map(w=>{const d=getDef(w.dayId);return `<div class="rl-item"><div class="rl-date">${w.date.split('-')[2]}</div><div class="rl-bar" style="background:${d?d.color:'#444'}"></div><div class="rl-info"><h4>${d?d.name:'Treino'}</h4><p>${d?d.label:''} · ${w.duration||0}min</p></div><div class="rl-vol"><div class="v">${Math.round((w.volume||0)/1000)}k</div><div class="u">kg vol</div></div></div>`;}).join('')
    :'<div style="color:var(--muted);font-size:13px;padding:12px 0;">Nenhum treino registrado ainda.</div>';
}
function startTodayWorkout(){const td=todayDef();if(td)beginSession(td.id);else toast('Hoje é dia de descanso!');}
function resumeActive(){if(S.active){beginSession(S.active.dayId,true);goTo('workout');}}

/* ══════════════════════════════════════════════════
   TREINOS LIST
══════════════════════════════════════════════════ */
function renderTreinos(){
  const todayId=todayDef()?.id;
  document.getElementById('workoutsList').innerHTML=DAYS.map(day=>{
    const isTd=day.id===todayId;
    const exCount=day.muscles.reduce((a,m)=>a+m.exercises.length,0);
    const allMuscles=[...new Set(day.muscles.map(m=>m.name))];
    return `<div class="wl-day${isTd?' today-highlight':''}" onclick="beginSession('${day.id}')">
      <div class="wld-top">
        <div class="wld-color" style="background:${day.color}"></div>
        <div class="wld-info">
          <div class="wld-name" style="color:${day.color}">${day.name}</div>
          <div class="wld-label">${day.label}</div>
        </div>
        <div class="wld-badge">
          ${isTd?'<div class="today-badge">HOJE</div>':''}
          <div class="wld-excount">${exCount} exercícios</div>
        </div>
      </div>
      <div class="wld-muscles">${allMuscles.map(m=>`<div class="wld-muscle-tag" style="background:${day.color}18;color:${day.color}">${m}</div>`).join('')}</div>
    </div>`;
  }).join('');
}

/* ══════════════════════════════════════════════════
   WORKOUT ENGINE
══════════════════════════════════════════════════ */
let wkTimer=null, restTimer=null, restMax=90, restRemain=0;

function beginSession(dayId, resume=false){
  const day=getDef(dayId);if(!day)return;

  // KEY FIX: session is locked to startTs, NOT to date string
  // This means a session started at 23:30 survives past midnight
  if(S.active && S.active.dayId===dayId){
    // Resume existing session for this day
    activeSession=S.active;
  } else {
    // Start fresh
    activeSession={
      dayId,
      startTs: Date.now(),
      date_started: todayStr(),
      exercises:{}
    };
    S.active=activeSession;
    persist();
  }

  buildWorkoutUI(day);
  goTo('workout');
  startWkTimer();
}

let activeSession={};

function buildWorkoutUI(day){
  document.getElementById('wkhColor').style.background=day.color;
  document.getElementById('wkhName').textContent=day.name;
  document.getElementById('wkhLabel').textContent=day.label;

  const cont=document.getElementById('wkExercises');
  cont.innerHTML='';

  for(const muscle of day.muscles){
    const ms=document.createElement('div');
    ms.className='ms';
    ms.innerHTML=`<div class="ms-hd"><div class="ms-dot" style="background:${muscle.color}"></div><div class="ms-nm">${muscle.name}</div><div class="ms-ln"></div></div>`;

    for(const ex of muscle.exercises){
      const prev=lastSession(day.id);
      const prevSets=prev?.exercises?.[ex.id]||[];
      if(!activeSession.exercises[ex.id]){
        activeSession.exercises[ex.id]=Array.from({length:ex.sets},(_,i)=>({
          w:prevSets[i]?.w||'',
          r:ex.isDur?ex.dur:(prevSets[i]?.r||''),
          done:false
        }));
      }
      const sets=activeSession.exercises[ex.id];
      persist();

      // Suggestion
      let sugHTML='';
      if(prevSets.length){
        const lw=prevSets[0]?.w,lr=prevSets[0]?.r;
        const sug=getSug(ex.id,parseFloat(lw),parseInt(lr));
        if(sug)sugHTML=`<div class="sug-row">💡 <span>${sug}</span></div>`;
      }

      // Tags
      const tagInfo=TAG_INFO[ex.tag]||{cls:'tag-reg',lbl:ex.tag?.toUpperCase()};
      const restSec=ex.rest||60;
      const restLabel=restSec>=120?'2min':restSec+'s';

      // YouTube deep link — opens YouTube app directly on mobile
      const ytQuery=encodeURIComponent(ex.yt);
      const ytLink=`youtube://results?search_query=${ytQuery}`;
      const ytFallback=`https://www.youtube.com/results?search_query=${ytQuery}`;

      // Sets rows
      let rows='';
      for(let i=0;i<ex.sets;i++){
        const s=sets[i];
        const prevTxt=prevSets[i]?(ex.isDur?`${prevSets[i].w||ex.dur}s`:`${prevSets[i].w||'—'}kg×${prevSets[i].r||'—'}`):'—';
        const dCls=s.done?'done-row':'';
        if(ex.isDur){
          rows+=`<tr class="${dCls}" id="r_${ex.id}_${i}">
            <td class="sn">${i+1}</td>
            <td class="sp">${prevTxt}</td>
            <td><input class="si" type="number" value="${s.w||ex.dur}" placeholder="${ex.dur}" min="10" max="300" oninput="upSet('${ex.id}',${i},'w',this.value)" style="width:60px"></td>
            <td style="font-size:10px;color:var(--muted)">seg</td>
            <td><button class="chk${s.done?' on':''}" onclick="ckSet('${ex.id}',${i},'${ex.id}',${restSec})" id="c_${ex.id}_${i}">${s.done?'✓':''}</button></td>
          </tr>`;
        } else {
          rows+=`<tr class="${dCls}" id="r_${ex.id}_${i}">
            <td class="sn">${i+1}</td>
            <td class="sp">${prevTxt}</td>
            <td><input class="si" type="number" value="${s.w}" placeholder="kg" min="0" max="500" step="0.5" oninput="upSet('${ex.id}',${i},'w',this.value)"></td>
            <td><input class="si" type="number" value="${s.r}" placeholder="${ex.reps}" min="0" max="100" oninput="upSet('${ex.id}',${i},'r',this.value)"></td>
            <td><button class="chk${s.done?' on':''}" onclick="ckSet('${ex.id}',${i},'${ex.name}',${restSec})" id="c_${ex.id}_${i}">${s.done?'✓':''}</button></td>
          </tr>`;
        }
      }

      const block=document.createElement('div');
      block.className='ex-block';
      block.innerHTML=`
        <div class="ex-hd">
          <div class="ex-icon">${ex.icon}</div>
          <div class="ex-ta">
            <div class="ex-nm">${ex.name}</div>
            <div class="ex-sub">${ex.target}</div>
            <div class="ex-tags">
              <span class="ex-tag ${tagInfo.cls}">${tagInfo.lbl}</span>
              <span class="ex-tag tag-reg">${ex.region}</span>
            </div>
          </div>
          <div class="rest-badge">⏱ ${restLabel}</div>
          <a class="yt-btn" href="${ytLink}" onclick="ytClick(event,'${ytFallback}')" title="Ver no YouTube">▶</a>
        </div>
        <div class="sets-wrap">
          <table class="sets">
            <thead><tr>
              <td>#</td>
              <td>Anterior</td>
              <td>${ex.isDur?'Seg':'Kg'}</td>
              ${ex.isDur?'<td></td>':'<td>Reps</td>'}
              <td>✓</td>
            </tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
        ${sugHTML}
      `;
      ms.appendChild(block);
    }
    cont.appendChild(ms);
  }
}

function restoreWorkoutUI(){
  if(S.active){
    activeSession=S.active;
    const day=getDef(S.active.dayId);
    if(day){ buildWorkoutUI(day); startWkTimer(); }
  }
}

function ytClick(e, fallback){
  // Try to open YouTube app; if it fails within 300ms open fallback
  const start=Date.now();
  setTimeout(()=>{
    if(Date.now()-start<400) window.open(fallback,'_blank');
  },300);
}

function upSet(exId,idx,field,val){
  if(!activeSession.exercises?.[exId])return;
  activeSession.exercises[exId][idx][field]=val;
  S.active=activeSession;persist();
}

function ckSet(exId,idx,exName,restSec){
  if(!activeSession.exercises?.[exId])return;
  const s=activeSession.exercises[exId][idx];
  s.done=!s.done;
  S.active=activeSession;persist();
  const btn=document.getElementById(`c_${exId}_${idx}`);
  const row=document.getElementById(`r_${exId}_${idx}`);
  if(s.done){
    btn.classList.add('on');btn.textContent='✓';
    row.classList.add('done-row');
    startRest(exName,restSec);
    tryPR(exId,parseFloat(s.w),parseInt(s.r));
  } else {
    btn.classList.remove('on');btn.textContent='';
    row.classList.remove('done-row');
  }
}

function tryPR(exId,w,r){
  if(!w||!r||isNaN(w)||isNaN(r))return;
  const cur=S.prs[exId];
  if(!cur||w>cur.weight||(w===cur.weight&&r>cur.reps)){
    S.prs[exId]={weight:w,reps:r,date:todayStr()};persist();
    const ex=findEx(exId);
    if(cur) toast(`🏆 Novo Record! ${ex?ex.name:exId}: ${w}kg × ${r}`,'pr');
  }
}

/* REST TIMER */
function startRest(label,sec){
  clearInterval(restTimer);
  restMax=sec;restRemain=sec;
  const bar=document.getElementById('restBar');
  bar.classList.remove('hidden');
  document.getElementById('rbEx').textContent='Descanso: '+label;
  document.getElementById('rbCount').textContent=restRemain;
  document.getElementById('rbFill').style.width='100%';
  restTimer=setInterval(()=>{
    restRemain--;
    document.getElementById('rbCount').textContent=restRemain;
    document.getElementById('rbFill').style.width=(restRemain/restMax*100)+'%';
    if(restRemain<=0){clearInterval(restTimer);bar.classList.add('hidden');}
  },1000);
}
function skipRest(){clearInterval(restTimer);document.getElementById('restBar').classList.add('hidden');}

/* WORKOUT TIMER */
function startWkTimer(){
  clearInterval(wkTimer);
  const ft=document.getElementById('floatTimer');
  ft.classList.add('show');
  wkTimer=setInterval(()=>{
    if(!activeSession.startTs)return;
    const elapsed=Math.floor((Date.now()-activeSession.startTs)/1000);
    document.getElementById('ftTime').textContent=fmtT(elapsed);
  },1000);
}

function stopWkTimer(){
  clearInterval(wkTimer);
  document.getElementById('floatTimer').classList.remove('show');
}

function finishWorkout(){
  if(!activeSession.dayId)return;
  clearInterval(restTimer);
  stopWkTimer();

  const duration=Math.round((Date.now()-activeSession.startTs)/60000);
  let totalSets=0,totalVol=0;
  for(const sets of Object.values(activeSession.exercises||{})){
    for(const s of sets){
      if(s.done){totalSets++;totalVol+=(parseFloat(s.w)||0)*(parseInt(s.r)||1);}
    }
  }

  S.history.push({
    date:activeSession.date_started||todayStr(),
    dayId:activeSession.dayId,duration,sets:totalSets,volume:totalVol,
    exercises:activeSession.exercises
  });
  S.active=null;activeSession={};persist();

  const day=getDef(S.history[S.history.length-1].dayId);
  document.getElementById('wcSub').textContent=(day?day.name+' — ':'')+fmtD(S.history[S.history.length-1].date);
  document.getElementById('wcDur').textContent=duration;
  document.getElementById('wcSets').textContent=totalSets;
  document.getElementById('wcVol').textContent=Math.round(totalVol);
  document.getElementById('wcOverlay').classList.add('show');
}
function closeComplete(){document.getElementById('wcOverlay').classList.remove('show');goTo('home');}

/* ══════════════════════════════════════════════════
   CALENDAR
══════════════════════════════════════════════════ */
let calY=new Date().getFullYear(),calM=new Date().getMonth();
function renderCal(){
  document.getElementById('calMonth').textContent=MO_PT[calM]+' '+calY;
  const grid=document.getElementById('calGrid');
  grid.innerHTML=['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'].map(d=>`<div class="cal-wd">${d}</div>`).join('');
  const firstDow=new Date(calY,calM,1).getDay();
  const days=new Date(calY,calM+1,0).getDate();
  const today=new Date();
  for(let i=0;i<firstDow;i++)grid.innerHTML+='<div></div>';
  for(let d=1;d<=days;d++){
    const ds=`${calY}-${p2(calM+1)}-${p2(d)}`;
    const ws=S.history.filter(w=>w.date===ds);
    const isTd=today.getFullYear()===calY&&today.getMonth()===calM&&today.getDate()===d;
    const dayId=ws[0]?.dayId||'';
    grid.innerHTML+=`<div class="cal-d${ws.length?' has':''} ${dayId}${isTd?' today':''}">${d}</div>`;
  }
  const monthWs=S.history.filter(w=>{const[y,m]=w.date.split('-');return +y===calY&&+m-1===calM;}).reverse();
  document.getElementById('monthList').innerHTML=monthWs.length
    ?monthWs.map(w=>{const d=getDef(w.dayId);return `<div class="ml-item"><div class="ml-d">${w.date.split('-')[2]}</div><div class="ml-bar" style="background:${d?d.color:'#444'}"></div><div class="ml-info"><h4>${d?d.name:'Treino'}</h4><p>${w.duration||0}min · ${w.sets||0} séries</p></div><div class="ml-vol"><div class="v">${Math.round((w.volume||0)/1000)}k</div><div class="u">kg vol</div></div></div>`;}).join('')
    :'<div style="color:var(--muted);font-size:13px;padding:0 0 16px;">Nenhum treino neste mês.</div>';
}
function calNav(d){calM+=d;if(calM>11){calM=0;calY++;}if(calM<0){calM=11;calY--;}renderCal();}

/* ══════════════════════════════════════════════════
   PROGRESS
══════════════════════════════════════════════════ */
let progTab='lift';
function setProgTab(t){
  progTab=t;
  document.querySelectorAll('.pt-btn').forEach((b,i)=>{b.classList.toggle('active',['lift','volume','body','prs'][i]===t);});
  document.querySelectorAll('.prog-panel').forEach(p=>p.classList.remove('active'));
  document.getElementById('tp-'+t).classList.add('active');
  if(t==='lift')renderLift();
  if(t==='volume')renderVolume();
  if(t==='body')renderBody();
  if(t==='prs')renderPRList();
}
function renderProgress(){
  const sel=document.getElementById('liftSel');
  sel.innerHTML='';
  for(const day of DAYS)for(const m of day.muscles)for(const e of m.exercises)
    sel.innerHTML+=`<option value="${e.id}">${e.name}</option>`;
  setProgTab(progTab);
}
function renderLift(){updateLiftChart();}
function renderLift(){
  const sel=document.getElementById('liftSel');
  if(!sel)return;
  updateLiftChart();
}
function updateLiftChart(){
  const id=document.getElementById('liftSel')?.value;if(!id)return;
  const pts=S.history.filter(w=>w.exercises?.[id]).map(w=>{
    const maxW=Math.max(...(w.exercises[id]||[]).filter(s=>s.done&&s.w).map(s=>parseFloat(s.w)||0));
    return maxW>0?{date:w.date,w:maxW}:null;
  }).filter(Boolean).slice(-8);
  renderBarChart('liftChart','liftX',pts.map(p=>p.w),pts.map(p=>p.date.slice(5)),'var(--accent)');
  const sug=document.getElementById('liftSug');
  if(pts.length){
    const last=pts[pts.length-1];
    const msg=getSug(id,last.w,10);
    sug.innerHTML=msg?`<div class="sug-card">💡 Próximo treino: <strong>${msg}</strong></div>`:'';
  } else sug.innerHTML='';
}
function renderVolume(){
  const wv={},wf={};
  for(const w of S.history){
    const wk=getWeekKey(w.date);
    wv[wk]=(wv[wk]||0)+(w.volume||0);wf[wk]=(wf[wk]||0)+1;
  }
  const wks=Object.keys(wv).sort().slice(-8);
  renderBarChart('volChart','volX',wks.map(k=>+(wv[k]/1000).toFixed(1)),wks.map(k=>k.slice(-2)+' sem'),'var(--red)');
  renderBarChart('freqChart','freqX',wks.map(k=>wf[k]),wks.map(k=>k.slice(-2)+' sem'),'var(--blue)',5);
}
function getWeekKey(dateStr){
  const d=new Date(dateStr+'T12:00:00');
  const y=d.getFullYear();
  const start=new Date(y,0,1);
  const w=Math.ceil(((d-start)/864e5+start.getDay()+1)/7);
  return `${y}-${p2(w)}`;
}
function renderBarChart(chartId,xId,vals,labels,color,maxOv){
  const ch=document.getElementById(chartId);
  const xEl=document.getElementById(xId);
  if(!vals.length){ch.innerHTML='<div style="color:var(--muted);font-size:12px;">Sem dados ainda.</div>';xEl&&(xEl.innerHTML='');return;}
  const maxV=maxOv||Math.max(...vals)||1;
  ch.innerHTML=vals.map((v,i)=>{
    const h=Math.round((v/maxV)*90);
    return `<div class="mc-b" style="height:${h}px;background:${color}"><div class="mc-bv">${typeof v==='number'&&v<10?v.toFixed(1):Math.round(v)}</div><div class="mc-bl">${labels[i]||''}</div></div>`;
  }).join('');
  if(xEl)xEl.innerHTML='';
}
function renderBody(){
  const sorted=S.body.slice().sort((a,b)=>b.date.localeCompare(a.date));
  document.getElementById('bodyHist').innerHTML=sorted.length
    ?`<div class="sl">Histórico</div>`+sorted.map((e,i)=>{
      const nx=sorted[i+1];let delta='',cls='';
      if(nx){const df=e.weight-nx.weight;if(df!==0){delta=(df>0?'+':'')+df.toFixed(1)+'kg';cls=df>0?'delta-up':'delta-dn';}}
      return `<div class="wh-row"><div class="wh-dt">${fmtD(e.date)}</div><div class="wh-kg">${e.weight}kg</div><div class="wh-delta ${cls}">${delta}</div></div>`;
    }).join('')
    :'<div style="color:var(--muted);font-size:13px;padding:12px 0;">Nenhum registro ainda.</div>';
}
function saveBody(){
  const w=parseFloat(document.getElementById('bodyW').value);
  if(!w||isNaN(w)){toast('Digite um peso válido');return;}
  S.body.push({date:todayStr(),weight:w});persist();
  document.getElementById('bodyW').value='';toast('Peso salvo! ✓','ok');renderBody();
}
function renderPRList(){
  const prs=Object.entries(S.prs);
  document.getElementById('prList').innerHTML=prs.length
    ?prs.map(([id,pr])=>{const e=findEx(id);return `<div class="pr-row"><div><div class="pr-nm">${e?e.name:id}</div><div class="pr-dt">${pr.reps} reps · ${fmtD(pr.date)}</div></div><div class="pr-kg">${pr.weight}kg</div></div>`;}).join('')
    :'<div style="color:var(--muted);font-size:13px;padding:12px 0;">Nenhum PR ainda. Vá treinar!</div>';
}

/* ══════════════════════════════════════════════════
   VISIBILITY — re-sync timer on screen wake
══════════════════════════════════════════════════ */
document.addEventListener('visibilitychange',()=>{
  if(document.visibilityState==='visible'){
    if(S.active && currentSc==='workout'){
      // Re-sync timer only — do NOT re-render exercises (would lose scroll and state)
      startWkTimer();
    }
    if(currentSc==='home')renderHome();
  }
});

/* ══════════════════════════════════════════════════
   INIT
══════════════════════════════════════════════════ */
setInterval(()=>{
  if(currentSc==='home')renderHome();
},60000);

// Populate lift selector on load
(function initSel(){
  const sel=document.getElementById('liftSel');
  for(const day of DAYS)for(const m of day.muscles)for(const e of m.exercises)
    sel.innerHTML+=`<option value="${e.id}">${e.name}</option>`;
})();

// If there's an active session, show floating timer
if(S.active){
  activeSession=S.active;
  startWkTimer();
}

renderHome();
</script>

</body>
</html>
