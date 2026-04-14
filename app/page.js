"use client";
import { useState, useEffect } from "react";

var SPLIT = ["Rest", "Push", "Pull", "Legs", "Upper", "Lower", "Rest"];

var WORKOUTS = {
  Push: [
    "Supino Reto Maquina",
    "Supino Inclinado Maquina",
    "Crucifixo Maquina Peck Deck",
    "Desenvolvimento Ombro Maquina",
    "Elevacao Lateral Cabo",
    "Elevacao Frontal Cabo",
    "Triceps Polia Barra Reta",
    "Triceps Frances Polia",
    "Triceps Polia Corda",
  ],
  Pull: [
    "Puxada Anatomica Supinada",
    "Puxada Unilateral Cabo",
    "Puxada Aberta Maquina",
    "Remada Cavalinho Maquina",
    "Remada Baixa Triangulo Cabo",
    "Remada Unilateral Cabo",
    "Peck Deck Invertido Posterior",
    "Rosca Direta Barra",
    "Rosca Scott Maquina",
    "Rosca Martelo Maquina",
    "Rosca Concentrada Cabo",
  ],
  Legs: [
    "Leg Press 45",
    "Agachamento Hack Maquina",
    "Cadeira Extensora",
    "Cadeira Flexora Deitado",
    "Stiff Maquina",
    "Abdutora Maquina",
    "Adutora Maquina",
    "Panturrilha em Pe Maquina",
    "Panturrilha Sentado Maquina",
  ],
  Upper: [
    "Supino Declinado Maquina",
    "Crossover Cabo Cruzamento",
    "Remada Maquina Hammer",
    "Pullover Maquina",
    "Elevacao Lateral Cabo Unilateral",
    "Face Pull Cabo Corda",
    "Abdominal Crunch Maquina",
    "Elevacao de Pernas",
    "Prancha Isometrica",
    "Obliquo Cabo Rotacao",
  ],
  Lower: [
    "Agachamento Smith",
    "Cadeira Flexora Sentado",
    "Hip Thrust Maquina",
    "Stiff Maquina",
    "Abdutora Maquina",
    "Adutora Maquina",
    "Abdominal Cabo Ajoelhado",
    "Abdominal Infra Banco",
    "Russian Twist com Peso",
  ],
};

var TIPS = {
  Push: "No supino maquina, pause 1 segundo no ponto de maior estiramento antes de empurrar. Isso recruta mais fibras do peitoral. Descanso: 90s a 2min nos compostos, 60s nos isolamentos.",
  Pull: "Costas: pense em cotovelo, nao em mao. Puxe sempre com o cotovelo para nao roubar com o biceps. No Drag Curl: mantenha a barra encostada no corpo, cotovelos vao para tras.",
  Legs: "Leg Press: pes no meio para carga maxima. Hack: pes mais proximos para atacar o vasto medial. Nos dois: desça ate 90 graus ou mais fundo se o joelho permitir.",
  Upper: "Face Pull e o exercicio mais subestimado da academia. Ele equilibra o ombro, melhora postura e protege o manguito rotador. Nunca pule esse exercicio.",
  Lower: "Hip Thrust e o exercicio numero 1 para gluteo. Se a academia nao tiver maquina, use a barra no banco com uma anilha. No abdomen: progrida carga e volume, nao faca infinitas repeticoes.",
};

var PROTOCOL = [
  "3 a 4 series de trabalho por exercicio",
  "8 a 15 reps conforme o exercicio",
  "Descanso compostos: 90s a 2 minutos",
  "Descanso isolamento: 60 segundos",
  "Velocidade excentrica: 2 a 3 segundos descendo",
  "RPE alvo: 8 a 9 de 10, deixa 1 a 2 reps na reserva",
  "Cardio opcional: 20 min LISS pos-treino",
];

var PROGRESSION = [
  "Completou todas as series com boa tecnica: aumente 2,5kg na proxima semana",
  "Nao completou todas as reps: mantenha o peso, foque na tecnica",
  "A cada 4 semanas: 1 semana de deload, reduza volume em 40% e mantenha a carga",
  "Priorize sobrecarga progressiva acima de qualquer outra variavel",
  "Dor muscular nao e indicador de progresso. Carga e volume sao.",
];

var WORKOUT_COLORS = {
  Push:  { bg: "#ff6b35", text: "#fff" },
  Pull:  { bg: "#4ecdc4", text: "#0a0a0a" },
  Legs:  { bg: "#00b894", text: "#0a0a0a" },
  Upper: { bg: "#a29bfe", text: "#0a0a0a" },
  Lower: { bg: "#fdcb6e", text: "#0a0a0a" },
  Rest:  { bg: "#2d3436", text: "#636e72" },
};

var WORKOUT_LABELS = {
  Push:  "Push",
  Pull:  "Pull",
  Legs:  "Legs",
  Upper: "Upper",
  Lower: "Lower",
  Rest:  "Descanso",
};

var MUSCLES = {
  Push:  "Peito + Ombro + Triceps",
  Pull:  "Costas + Biceps + Ombro Post.",
  Legs:  "Pernas + Gluteo + Panturrilha",
  Upper: "Peito + Costas + Ombro + Abdomen",
  Lower: "Pernas variacao + Gluteo + Abdomen",
};

function isCardio(ex)  { return ex.includes("min"); }
function isAbs(ex)     { return ex.includes("Abdominal") || ex.includes("Russian") || ex.includes("Obliquo"); }
function isPrancha(ex) { return ex.includes("Prancha"); }
function isElevacao(ex){ return ex === "Elevacao de Pernas"; }

function getFullWorkout(w) {
  return WORKOUTS[w] ? WORKOUTS[w].slice() : [];
}

function fmtDate(dateStr) {
  var p = dateStr.split("-");
  return p[2] + "/" + p[1] + "/" + p[0];
}

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

var BG      = "#0d0d0d";
var SURFACE = "#161616";
var SURF2   = "#1e1e1e";
var BORDER  = "#1e1e1e";
var BORD2   = "#2a2a2a";
var GREEN   = "#00ff88";
var TEXT    = "#f0f0f0";
var MUTED   = "#555";
var YELLOW  = "#fdcb6e";
var ORANGE  = "#ff6b35";

function navBtnSt(active) {
  return { flex: 1, padding: "12px 0 8px", background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, color: active ? GREEN : MUTED, fontSize: 10, fontWeight: active ? 700 : 400 };
}
function dotSt(active) {
  return { width: 4, height: 4, borderRadius: "50%", background: active ? GREEN : "transparent" };
}
function chipSt(w) {
  var wc = WORKOUT_COLORS[w] || { bg: SURF2, text: TEXT };
  return { display: "inline-flex", alignItems: "center", padding: "8px 14px", borderRadius: 50, background: wc.bg, color: wc.text, fontWeight: 700, fontSize: 12, cursor: "pointer", border: "none" };
}
function badgeSt(w) {
  var wc = WORKOUT_COLORS[w] || { bg: SURF2, text: TEXT };
  return { padding: "3px 10px", borderRadius: 50, background: wc.bg, color: wc.text, fontSize: 10, fontWeight: 700, whiteSpace: "nowrap" };
}
function exCardSt(done) {
  return { background: done ? "#0d1f18" : SURFACE, borderRadius: 12, border: "1px solid " + (done ? "#1a3a28" : BORDER), marginBottom: 8, overflow: "hidden" };
}
function timerSt(active) {
  return { padding: "6px 12px", background: active ? "#001a0d" : SURF2, border: "1px solid " + (active ? "#00ff8840" : BORD2), borderRadius: 50, color: active ? GREEN : MUTED, fontSize: 12, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" };
}
function checkSt(done) {
  return { width: 32, height: 32, borderRadius: 8, border: "2px solid " + (done ? GREEN : BORD2), background: done ? "#00ff8815" : "transparent", cursor: "pointer", color: GREEN, fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 };
}
var inputSt  = { width: "100%", padding: "8px 10px", background: BG, border: "1px solid " + BORD2, borderRadius: 8, color: TEXT, fontSize: 13, fontWeight: 600, textAlign: "center", outline: "none", boxSizing: "border-box" };
var ytSt     = { fontSize: 10, color: MUTED, textDecoration: "none", padding: "3px 8px", borderRadius: 6, background: SURF2 };
var secTitle = { fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", color: MUTED, textTransform: "uppercase", display: "block", marginBottom: 10 };
var pageSt   = { padding: "16px 14px" };

export default function App() {
  var today   = new Date();
  var dateStr = today.toISOString().split("T")[0];
  var todayW  = SPLIT[today.getDay()];

  var s0 = useState("home");                      var tab = s0[0];      var setTab = s0[1];
  var s1 = useState({});                          var logs = s1[0];     var setLogs = s1[1];
  var s2 = useState({ workout: null, data: {} }); var draft = s2[0];    var setDraft = s2[1];
  var s3 = useState({});                          var timers = s3[0];   var setTimers = s3[1];
  var s4 = useState(false);                       var hydrated = s4[0]; var setHydrated = s4[1];

  useEffect(function() {
    var l = JSON.parse(localStorage.getItem("logs_v2")) || {};
    var d = JSON.parse(localStorage.getItem("draft_v2"));
    setLogs(l);
    if (d && d.date === dateStr) {
      setDraft({ workout: d.workout || null, data: d.data || {} });
    }
    setHydrated(true);
  }, []);

  useEffect(function() {
    if (!hydrated) return;
    localStorage.setItem("logs_v2", JSON.stringify(logs));
  }, [logs, hydrated]);

  useEffect(function() {
    if (!hydrated) return;
    if (draft.workout || Object.keys(draft.data).length > 0) {
      localStorage.setItem("draft_v2", JSON.stringify({ date: dateStr, workout: draft.workout, data: draft.data }));
    }
  }, [draft, hydrated]);

  useEffect(function() {
    var iv = setInterval(function() {
      setTimers(function(prev) {
        var u = Object.assign({}, prev);
        Object.keys(u).forEach(function(k) { if (u[k] > 0) u[k]--; });
        return u;
      });
    }, 1000);
    return function() { clearInterval(iv); };
  }, []);

  function startWorkout(type) {
    setDraft({ workout: type, data: draft.workout === type ? draft.data : {} });
    setTab("treino");
  }

  function handleChange(ex, field, val) {
    setDraft(function(prev) {
      var d2 = Object.assign({}, prev.data);
      d2[ex] = Object.assign({}, d2[ex], { [field]: val });
      return { workout: prev.workout, data: d2 };
    });
  }

  function toggleCheck(ex) {
    setDraft(function(prev) {
      var d2 = Object.assign({}, prev.data);
      var wasDone = d2[ex] && d2[ex].done;
      d2[ex] = Object.assign({}, d2[ex], { done: !wasDone });
      return { workout: prev.workout, data: d2 };
    });
  }

  function saveWorkout() {
    var w = draft.workout || todayW;
    setLogs(function(prev) {
      var next = Object.assign({}, prev);
      next[dateStr] = { workout: w, data: draft.data, ts: Date.now() };
      return next;
    });
    localStorage.removeItem("draft_v2");
    setDraft({ workout: null, data: {} });
    alert("Treino salvo!");
    setTab("home");
  }

  function getLast(ex) {
    var entries = Object.entries(logs).sort(function(a, b) { return a[0] > b[0] ? 1 : -1; });
    for (var i = entries.length - 1; i >= 0; i--) {
      var d = entries[i][1].data;
      if (d && d[ex] && (d[ex].weight || d[ex].reps || d[ex].time)) return d[ex];
    }
    return null;
  }

  function getRecord(ex) {
    var best = null;
    Object.values(logs).forEach(function(log) {
      var d = log.data && log.data[ex];
      if (d && d.weight) {
        var w = parseFloat(d.weight);
        if (best === null || w > best) best = w;
      }
    });
    return best;
  }

  var workoutToUse = draft.workout || todayW;
  var exercises    = getFullWorkout(workoutToUse);
  var doneCount    = exercises.filter(function(ex) { return draft.data[ex] && draft.data[ex].done; }).length;
  var pct          = exercises.length > 0 ? Math.round((doneCount / exercises.length) * 100) : 0;

  return (
    <div style={{ minHeight: "100vh", background: BG, color: TEXT, fontFamily: "system-ui, sans-serif", paddingBottom: 70 }}>

      <div style={{ padding: "20px 14px 12px", borderBottom: "1px solid " + BORDER, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 800, color: GREEN, letterSpacing: "-0.5px" }}>GOD FITNESS</div>
          <div style={{ fontSize: 11, color: MUTED, marginTop: 1 }}>
            {today.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "short" })}
          </div>
        </div>
        {draft.workout && tab !== "treino" && (
          <button onClick={function() { setTab("treino"); }} style={{ padding: "6px 12px", background: "#00ff8820", border: "1px solid #00ff8840", borderRadius: 50, color: GREEN, fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
            Em andamento
          </button>
        )}
      </div>

      {tab === "home"     && <HomeTab    today={today} todayW={todayW} logs={logs} draft={draft} onStart={startWorkout} />}
      {tab === "treino"   && <TreinoTab  workoutToUse={workoutToUse} data={draft.data} timers={timers} doneCount={doneCount} pct={pct} exercises={exercises} getLast={getLast} getRecord={getRecord} handleChange={handleChange} toggleCheck={toggleCheck} onSave={saveWorkout} onTimer={function(ex) { setTimers(function(p) { var n = Object.assign({}, p); n[ex] = 90; return n; }); }} />}
      {tab === "agenda"   && <AgendaTab  logs={logs} today={today} />}
      {tab === "records"  && <RecordsTab logs={logs} />}

      <nav style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#0f0f0f", borderTop: "1px solid " + BORDER, display: "flex", zIndex: 100 }}>
        {["home", "treino", "agenda", "records"].map(function(id) {
          var labels = { home: "Inicio", treino: "Treino", agenda: "Agenda", records: "Records" };
          return (
            <button key={id} style={navBtnSt(tab === id)} onClick={function() { setTab(id); }}>
              <span style={{ fontSize: 11 }}>{labels[id]}</span>
              <div style={dotSt(tab === id)} />
            </button>
          );
        })}
      </nav>
    </div>
  );
}

function HomeTab(props) {
  var today   = props.today;
  var todayW  = props.todayW;
  var logs    = props.logs;
  var draft   = props.draft;
  var onStart = props.onStart;
  var isRest  = todayW === "Rest";

  var streak = 0;
  var d = new Date(today);
  for (var i = 0; i < 30; i++) {
    var ds = d.toISOString().split("T")[0];
    if (logs[ds]) { streak++; } else if (i > 0) { break; }
    d.setDate(d.getDate() - 1);
  }

  var thisWeek = Object.keys(logs).filter(function(dl) {
    var ld  = new Date(dl + "T12:00:00");
    var now = new Date();
    var sow = new Date(now);
    sow.setDate(now.getDate() - now.getDay());
    sow.setHours(0, 0, 0, 0);
    return ld >= sow;
  }).length;

  var recent = Object.entries(logs).sort(function(a, b) { return a[0] > b[0] ? -1 : 1; }).slice(0, 4);
  var wc = WORKOUT_COLORS[todayW] || WORKOUT_COLORS.Rest;

  return (
    <div style={pageSt}>
      <div style={{ background: "#0d2818", borderRadius: 18, border: "1px solid #1a3a28", padding: "20px 18px", marginBottom: 14 }}>
        <div style={{ fontSize: 10, color: "#2d9e60", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase" }}>Treino de hoje</div>
        <div style={{ fontSize: 30, fontWeight: 800, color: isRest ? MUTED : wc.bg, lineHeight: 1.1, marginTop: 4 }}>
          {isRest ? "Descanso" : (WORKOUT_LABELS[todayW] || todayW)}
        </div>
        {!isRest && MUSCLES[todayW] && (
          <div style={{ fontSize: 12, color: "#2d9e60", marginTop: 4 }}>{MUSCLES[todayW]}</div>
        )}
        {!isRest && (
          <div style={{ fontSize: 11, color: "#1a6e40", marginTop: 2 }}>
            {(WORKOUTS[todayW] ? WORKOUTS[todayW].length : 0) + " exercicios - 60 a 75 min"}
          </div>
        )}
        {!isRest && (
          <button style={{ width: "100%", padding: "14px", background: GREEN, border: "none", borderRadius: 12, color: "#0a0a0a", fontWeight: 800, fontSize: 15, cursor: "pointer", marginTop: 14 }} onClick={function() { onStart(todayW); }}>
            {draft.workout === todayW ? "Continuar treino" : "Comecar treino do dia"}
          </button>
        )}
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <div style={{ flex: 1, background: SURFACE, borderRadius: 12, border: "1px solid " + BORDER, padding: "12px 14px" }}>
          <div style={{ fontSize: 9, color: MUTED, textTransform: "uppercase", letterSpacing: "1px" }}>Sequencia</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: GREEN, marginTop: 2 }}>{streak}</div>
          <div style={{ fontSize: 9, color: MUTED }}>dias seguidos</div>
        </div>
        <div style={{ flex: 1, background: SURFACE, borderRadius: 12, border: "1px solid " + BORDER, padding: "12px 14px" }}>
          <div style={{ fontSize: 9, color: MUTED, textTransform: "uppercase", letterSpacing: "1px" }}>Total</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: "#fd79a8", marginTop: 2 }}>{Object.keys(logs).length}</div>
          <div style={{ fontSize: 9, color: MUTED }}>treinos feitos</div>
        </div>
        <div style={{ flex: 1, background: SURFACE, borderRadius: 12, border: "1px solid " + BORDER, padding: "12px 14px" }}>
          <div style={{ fontSize: 9, color: MUTED, textTransform: "uppercase", letterSpacing: "1px" }}>Semana</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: "#4ecdc4", marginTop: 2 }}>{thisWeek}</div>
          <div style={{ fontSize: 9, color: MUTED }}>esta semana</div>
        </div>
      </div>

      <span style={secTitle}>Escolher treino</span>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
        {Object.keys(WORKOUTS).map(function(w) {
          return (
            <button key={w} style={chipSt(w)} onClick={function() { onStart(w); }}>
              {WORKOUT_LABELS[w] || w}
            </button>
          );
        })}
      </div>

      <div style={{ background: "#1a1200", borderRadius: 12, border: "1px solid #3a2e00", padding: "14px 16px", marginBottom: 18 }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: YELLOW, marginBottom: 8, letterSpacing: "1px", textTransform: "uppercase" }}>Regra de progressao</div>
        {PROGRESSION.map(function(p, i) {
          return (
            <div key={i} style={{ fontSize: 12, color: "#ccc", marginBottom: 5, paddingLeft: 8, borderLeft: "2px solid " + ORANGE }}>
              {p}
            </div>
          );
        })}
      </div>

      {recent.length > 0 && (
        <div>
          <span style={secTitle}>Historico recente</span>
          {recent.map(function(entry) {
            var date = entry[0];
            var val  = entry[1];
            var done = Object.values(val.data || {}).filter(function(x) { return x.done; }).length;
            return (
              <div key={date} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: SURFACE, borderRadius: 10, border: "1px solid " + BORDER, marginBottom: 6 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{fmtDate(date)}</div>
                  <div style={{ fontSize: 11, color: MUTED, marginTop: 1 }}>{done} exercicios concluidos</div>
                </div>
                <span style={badgeSt(val.workout)}>{WORKOUT_LABELS[val.workout] || val.workout}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function TreinoTab(props) {
  var workoutToUse = props.workoutToUse;
  var data         = props.data;
  var timers       = props.timers;
  var doneCount    = props.doneCount;
  var pct          = props.pct;
  var exercises    = props.exercises;
  var getLast      = props.getLast;
  var getRecord    = props.getRecord;
  var handleChange = props.handleChange;
  var toggleCheck  = props.toggleCheck;
  var onSave       = props.onSave;
  var onTimer      = props.onTimer;
  var tip          = TIPS[workoutToUse];
  var wc           = WORKOUT_COLORS[workoutToUse] || { bg: GREEN, text: "#000" };

  return (
    <div style={pageSt}>
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 6 }}>
          <div>
            <span style={secTitle}>Em andamento</span>
            <div style={{ fontSize: 24, fontWeight: 800, lineHeight: 1, color: wc.bg }}>{WORKOUT_LABELS[workoutToUse] || workoutToUse}</div>
            {MUSCLES[workoutToUse] && (
              <div style={{ fontSize: 11, color: MUTED, marginTop: 2 }}>{MUSCLES[workoutToUse]}</div>
            )}
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 26, fontWeight: 800, color: GREEN }}>{pct}%</div>
            <div style={{ fontSize: 11, color: MUTED }}>{doneCount}/{exercises.length}</div>
          </div>
        </div>
        <div style={{ height: 3, background: SURF2, borderRadius: 99, overflow: "hidden" }}>
          <div style={{ height: "100%", width: pct + "%", background: GREEN, borderRadius: 99, transition: "width 0.4s" }} />
        </div>
      </div>

      {tip && (
        <div style={{ background: "#1a1a00", borderRadius: 10, border: "1px solid #3a3800", padding: "12px 14px", marginBottom: 14, display: "flex", gap: 10, alignItems: "flex-start" }}>
          <span style={{ fontSize: 16, flexShrink: 0 }}>!</span>
          <div style={{ fontSize: 12, color: "#e0d080", lineHeight: 1.5 }}>{tip}</div>
        </div>
      )}

      {exercises.map(function(ex) {
        var last    = getLast(ex);
        var rec     = getRecord(ex);
        var done    = !!(data[ex] && data[ex].done);
        var timer   = timers[ex] || 0;
        var abs     = isAbs(ex);
        var prancha = isPrancha(ex);
        var elev    = isElevacao(ex);
        var ytUrl   = "https://www.youtube.com/results?search_query=" + encodeURIComponent(ex + " como fazer");
        var curW    = data[ex] && data[ex].weight ? parseFloat(data[ex].weight) : null;
        var newRec  = curW && rec && curW > rec;
        var isBodyweight = abs || prancha || elev;

        return (
          <div key={ex} style={exCardSt(done)}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "12px 14px 8px" }}>
              <div style={{ flex: 1, marginRight: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                  <span style={{ fontWeight: 700, fontSize: 13, color: TEXT }}>{ex}</span>
                  {newRec && (
                    <span style={{ fontSize: 9, fontWeight: 800, color: YELLOW, background: "#2a2000", padding: "2px 6px", borderRadius: 50 }}>RECORD</span>
                  )}
                </div>
                {last && (
                  <div style={{ fontSize: 10, color: MUTED, marginTop: 2 }}>
                    {"Ultimo: " + (last.weight ? last.weight + "kg" : "") + (last.reps ? " x " + last.reps + " reps" : "") + (last.time ? " " + last.time + "s" : "")}
                  </div>
                )}
                {rec && (
                  <div style={{ fontSize: 10, color: YELLOW, marginTop: 1 }}>{"Record: " + rec + "kg"}</div>
                )}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <a href={ytUrl} target="_blank" rel="noreferrer" style={ytSt}>Ver</a>
                <button style={checkSt(done)} onClick={function() { toggleCheck(ex); }}>
                  {done ? "OK" : ""}
                </button>
              </div>
            </div>

            <div style={{ padding: "0 14px 12px", display: "flex", gap: 8, alignItems: "flex-end", flexWrap: "wrap" }}>
              {!isBodyweight && (
                <div style={{ display: "flex", gap: 6, flex: 1 }}>
                  <div style={{ flex: 1 }}>
                    <input style={inputSt} type="number" placeholder="0" defaultValue={(data[ex] && data[ex].weight) || ""} onChange={function(e) { handleChange(ex, "weight", e.target.value); }} />
                    <div style={{ fontSize: 9, color: MUTED, textAlign: "center", marginTop: 2 }}>kg</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <input style={inputSt} type="number" placeholder="0" defaultValue={(data[ex] && data[ex].reps) || ""} onChange={function(e) { handleChange(ex, "reps", e.target.value); }} />
                    <div style={{ fontSize: 9, color: MUTED, textAlign: "center", marginTop: 2 }}>reps</div>
                  </div>
                </div>
              )}
              {(abs || elev) && (
                <div style={{ flex: 1 }}>
                  <input style={inputSt} type="number" placeholder="0" defaultValue={(data[ex] && data[ex].reps) || ""} onChange={function(e) { handleChange(ex, "reps", e.target.value); }} />
                  <div style={{ fontSize: 9, color: MUTED, textAlign: "center", marginTop: 2 }}>reps</div>
                </div>
              )}
              {prancha && (
                <div style={{ flex: 1 }}>
                  <input style={inputSt} type="number" placeholder="0" defaultValue={(data[ex] && data[ex].time) || ""} onChange={function(e) { handleChange(ex, "time", e.target.value); }} />
                  <div style={{ fontSize: 9, color: MUTED, textAlign: "center", marginTop: 2 }}>segundos</div>
                </div>
              )}
              <button style={timerSt(timer > 0)} onClick={function() { onTimer(ex); }}>
                {timer > 0 ? timer + "s" : "90s"}
              </button>
            </div>
          </div>
        );
      })}

      <div style={{ background: "#0d1a10", borderRadius: 10, border: "1px solid #1a3a20", padding: "12px 14px", marginBottom: 14 }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: GREEN, marginBottom: 8, letterSpacing: "1px", textTransform: "uppercase" }}>Protocolo do treino</div>
        {PROTOCOL.map(function(p, i) {
          return (
            <div key={i} style={{ fontSize: 11, color: "#aaa", marginBottom: 4, paddingLeft: 8, borderLeft: "2px solid " + GREEN }}>
              {p}
            </div>
          );
        })}
      </div>

      <button style={{ width: "100%", padding: "16px", background: GREEN, border: "none", borderRadius: 14, color: "#0a0a0a", fontWeight: 800, fontSize: 16, cursor: "pointer", marginTop: 4 }} onClick={onSave}>
        Finalizar e salvar treino
      </button>
    </div>
  );
}

function AgendaTab(props) {
  var logs  = props.logs;
  var today = props.today;

  var sy = useState(today.getFullYear()); var year = sy[0]; var setYear = sy[1];
  var sm = useState(today.getMonth());    var month = sm[0]; var setMonth = sm[1];
  var ss = useState(null);               var selected = ss[0]; var setSelected = ss[1];

  var monthNames = ["Janeiro","Fevereiro","Marco","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
  var days     = getDaysInMonth(year, month);
  var firstDay = getFirstDayOfMonth(year, month);
  var cells    = [];
  for (var i = 0; i < firstDay; i++) cells.push(null);
  for (var d = 1; d <= days; d++) cells.push(d);

  function getDateStr(day) {
    var m  = (month + 1).toString().padStart(2, "0");
    var dd = day.toString().padStart(2, "0");
    return year + "-" + m + "-" + dd;
  }

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear(year - 1); } else { setMonth(month - 1); }
    setSelected(null);
  }

  function nextMonth() {
    if (month === 11) { setMonth(0); setYear(year + 1); } else { setMonth(month + 1); }
    setSelected(null);
  }

  var todayStr    = today.toISOString().split("T")[0];
  var selectedLog = selected ? logs[getDateStr(selected)] : null;

  return (
    <div style={pageSt}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <button onClick={prevMonth} style={{ background: SURFACE, border: "1px solid " + BORDER, color: TEXT, borderRadius: 8, padding: "6px 14px", cursor: "pointer", fontSize: 14, fontWeight: 700 }}>{"<"}</button>
        <div style={{ fontWeight: 700, fontSize: 15 }}>{monthNames[month] + " " + year}</div>
        <button onClick={nextMonth} style={{ background: SURFACE, border: "1px solid " + BORDER, color: TEXT, borderRadius: 8, padding: "6px 14px", cursor: "pointer", fontSize: 14, fontWeight: 700 }}>{">"}</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2, marginBottom: 2 }}>
        {["D","S","T","Q","Q","S","S"].map(function(dl, idx) {
          return <div key={idx} style={{ textAlign: "center", fontSize: 10, color: MUTED, padding: "4px 0", fontWeight: 700 }}>{dl}</div>;
        })}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 3, marginBottom: 16 }}>
        {cells.map(function(day, idx) {
          if (!day) return <div key={idx} />;
          var ds      = getDateStr(day);
          var log     = logs[ds];
          var wc      = log ? (WORKOUT_COLORS[log.workout] || { bg: GREEN, text: "#000" }) : null;
          var isToday = ds === todayStr;
          var isSel   = selected === day;
          return (
            <div key={idx} onClick={function() { setSelected(day); }} style={{
              aspectRatio: "1",
              borderRadius: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              background: isSel ? GREEN : (log ? wc.bg + "25" : "transparent"),
              border: "1px solid " + (isToday ? GREEN : (log ? wc.bg + "55" : "transparent")),
            }}>
              <span style={{ fontSize: 12, fontWeight: isToday ? 800 : 400, color: isSel ? "#000" : (isToday ? GREEN : TEXT) }}>{day}</span>
              {log && (
                <div style={{ width: 4, height: 4, borderRadius: "50%", background: isSel ? "#000" : wc.bg, marginTop: 1 }} />
              )}
            </div>
          );
        })}
      </div>

      {selected && (
        <div style={{ background: SURFACE, borderRadius: 14, border: "1px solid " + BORDER, padding: "14px 16px" }}>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8 }}>{fmtDate(getDateStr(selected))}</div>
          {selectedLog ? (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <span style={badgeSt(selectedLog.workout)}>{WORKOUT_LABELS[selectedLog.workout] || selectedLog.workout}</span>
                <span style={{ fontSize: 11, color: MUTED }}>
                  {Object.values(selectedLog.data || {}).filter(function(x) { return x.done; }).length} exercicios
                </span>
              </div>
              {Object.entries(selectedLog.data || {}).map(function(entry) {
                var ex  = entry[0];
                var val = entry[1];
                if (!val || (!val.weight && !val.reps && !val.time)) return null;
                return (
                  <div key={ex} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid " + BORDER }}>
                    <span style={{ fontSize: 12, color: val.done ? TEXT : MUTED }}>{ex}</span>
                    <span style={{ fontSize: 12, color: GREEN, fontWeight: 700 }}>
                      {(val.weight ? val.weight + "kg" : "") + (val.reps ? " x " + val.reps : "") + (val.time ? " " + val.time + "s" : "")}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ fontSize: 12, color: MUTED }}>Nenhum treino registrado.</div>
          )}
        </div>
      )}
    </div>
  );
}

function RecordsTab(props) {
  var logs = props.logs;
  var sf = useState("todos"); var filter = sf[0]; var setFilter = sf[1];

  var allExercises = [];
  Object.values(WORKOUTS).forEach(function(list) {
    list.forEach(function(ex) {
      if (allExercises.indexOf(ex) === -1) allExercises.push(ex);
    });
  });

  var records = {};
  var history = {};
  Object.entries(logs).sort(function(a, b) { return a[0] > b[0] ? 1 : -1; }).forEach(function(entry) {
    var date = entry[0];
    var log  = entry[1];
    Object.entries(log.data || {}).forEach(function(e2) {
      var ex  = e2[0];
      var val = e2[1];
      if (!val) return;
      if (!history[ex]) history[ex] = [];
      if (val.weight || val.reps || val.time) {
        history[ex].push({ date: date, weight: val.weight, reps: val.reps, time: val.time });
      }
      if (val.weight) {
        var w = parseFloat(val.weight);
        if (!records[ex] || w > records[ex].weight) {
          records[ex] = { weight: w, date: date, reps: val.reps };
        }
      }
    });
  });

  var filterOptions = ["todos"].concat(Object.keys(WORKOUTS));

  var filtered = allExercises.filter(function(ex) {
    if (filter === "todos") return true;
    return WORKOUTS[filter] && WORKOUTS[filter].indexOf(ex) !== -1;
  }).filter(function(ex) {
    return history[ex] && history[ex].length > 0;
  });

  return (
    <div style={pageSt}>
      <span style={secTitle}>Records pessoais</span>

      <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 8, marginBottom: 14 }}>
        {filterOptions.map(function(w) {
          var active = filter === w;
          return (
            <button key={w} onClick={function() { setFilter(w); }} style={{
              flexShrink: 0,
              padding: "6px 12px",
              borderRadius: 50,
              background: active ? GREEN : SURFACE,
              color: active ? "#000" : MUTED,
              border: "1px solid " + (active ? GREEN : BORDER),
              fontSize: 11,
              fontWeight: active ? 700 : 400,
              cursor: "pointer",
            }}>
              {w === "todos" ? "Todos" : (WORKOUT_LABELS[w] || w)}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", color: MUTED, fontSize: 13, marginTop: 40, lineHeight: 1.8 }}>
          Nenhum registro ainda. Complete alguns treinos para ver seus records aqui!
        </div>
      )}

      {filtered.map(function(ex) {
        var rec      = records[ex];
        var hist     = history[ex] || [];
        var last     = hist[hist.length - 1];
        var prev     = hist.length >= 2 ? hist[hist.length - 2] : null;
        var improved = prev && last && last.weight && prev.weight && parseFloat(last.weight) > parseFloat(prev.weight);

        return (
          <div key={ex} style={{ background: SURFACE, borderRadius: 12, border: "1px solid " + BORDER, padding: "12px 14px", marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 700 }}>{ex}</span>
                  {improved && (
                    <span style={{ fontSize: 9, color: GREEN, fontWeight: 800, background: "#00ff8815", padding: "1px 6px", borderRadius: 50 }}>subiu</span>
                  )}
                </div>
                {last && (
                  <div style={{ fontSize: 10, color: MUTED, marginTop: 2 }}>
                    {"Ultimo: " + (last.weight ? last.weight + "kg" : "") + (last.reps ? " x " + last.reps + " reps" : "") + (last.time ? last.time + "s" : "") + " em " + fmtDate(last.date)}
                  </div>
                )}
              </div>
              {rec && (
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: YELLOW }}>{rec.weight + "kg"}</div>
                  <div style={{ fontSize: 9, color: MUTED }}>{(rec.reps ? "x " + rec.reps + " - " : "") + fmtDate(rec.date)}</div>
                </div>
              )}
            </div>
            {hist.length > 1 && (
              <div style={{ marginTop: 8, display: "flex", gap: 4, overflowX: "auto" }}>
                {hist.slice(-6).map(function(h, idx) {
                  return (
                    <div key={idx} style={{ flexShrink: 0, textAlign: "center", background: BG, borderRadius: 6, padding: "4px 8px", border: "1px solid " + BORD2 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: GREEN }}>
                        {h.weight ? h.weight + "kg" : (h.reps ? h.reps : (h.time ? h.time + "s" : "-"))}
                      </div>
                      <div style={{ fontSize: 9, color: MUTED }}>{h.date.slice(5).replace("-", "/")}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
