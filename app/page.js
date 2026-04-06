"use client";
import { useState, useEffect } from "react";

const SPLIT = ["Rest", "Push", "Pull", "Legs", "Upper", "Lower", "Rest"];

const WORKOUTS = {
  Push:  ["Supino Reto Maquina","Supino Inclinado Maquina","Peck Deck","Crossover Polia Alta","Crossover Polia Baixa","Desenvolvimento Ombro Maquina","Elevacao Lateral Polia","Posterior Ombro Polia","Triceps Testa Polia","Triceps Corda","Triceps Frances Polia"],
  Pull:  ["Puxada Frontal","Puxada Pegada Fechada","Remada Maquina","Remada Baixa Triangulo","Pulldown Braco Estendido","Face Pull","Rosca Direta Barra W","Rosca Scott","Rosca Martelo","Rosca Polia"],
  Legs:  ["Agachamento","Leg Press 45","Cadeira Extensora","Mesa Flexora","Leg Curl em Pe","Elevacao Pelvica","Abdutora","Adutora","Panturrilha"],
  Upper: ["Supino Inclinado Maquina","Crossover Polia Alta","Puxada Frontal","Remada Maquina","Elevacao Lateral Polia","Posterior Ombro Polia","Triceps Corda","Rosca Direta Barra W"],
  Lower: ["Agachamento","Leg Press 45","Mesa Flexora","Stiff","Elevacao Pelvica","Panturrilha","Abdutora"],
};

const ABS_LIST = ["Abdominal Maquina","Abdominal Supra","Abdominal Infra","Prancha"];

const CARDIO_MAP = {
  Push:  "Esteira 20min",
  Pull:  "Bike 20min",
  Upper: "Esteira 20min",
  Lower: "Bike 20min",
};

const WORKOUT_COLORS = {
  Push:  { bg: "#ff6b35", text: "#fff" },
  Pull:  { bg: "#4ecdc4", text: "#0a0a0a" },
  Legs:  { bg: "#a29bfe", text: "#0a0a0a" },
  Upper: { bg: "#fd79a8", text: "#0a0a0a" },
  Lower: { bg: "#fdcb6e", text: "#0a0a0a" },
  Rest:  { bg: "#2d3436", text: "#636e72" },
};

function formatDate(dateStr) {
  var parts = dateStr.split("-");
  return parts[2] + "/" + parts[1] + "/" + parts[0];
}

function isCardio(ex)  { return ex.includes("min"); }
function isAbs(ex)     { return ex.includes("Abdominal"); }
function isPrancha(ex) { return ex === "Prancha"; }

var styles = {
  root: {
    minHeight: "100vh",
    background: "#0d0d0d",
    color: "#f0f0f0",
    fontFamily: "sans-serif",
    paddingBottom: 80,
  },
  header: {
    padding: "28px 20px 16px",
    borderBottom: "1px solid #1e1e1e",
  },
  logoWrap: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 4,
  },
  logoText: {
    fontSize: 22,
    fontWeight: 800,
    color: "#00ff88",
  },
  subtitle: { fontSize: 13, color: "#555", marginTop: 2 },
  nav: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    background: "#111",
    borderTop: "1px solid #1e1e1e",
    display: "flex",
    zIndex: 100,
  },
  page: { padding: "20px 16px" },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "1.5px",
    color: "#444",
    textTransform: "uppercase",
    marginBottom: 12,
    display: "block",
  },
  todayCard: {
    background: "#0d2818",
    borderRadius: 20,
    border: "1px solid #1a3a28",
    padding: "24px 20px",
    marginBottom: 20,
  },
  todayLabel: {
    fontSize: 11,
    color: "#2d9e60",
    fontWeight: 700,
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    display: "block",
  },
  todayName: {
    fontSize: 36,
    fontWeight: 800,
    color: "#fff",
    lineHeight: 1.1,
    marginTop: 4,
    display: "block",
  },
  primaryBtn: {
    width: "100%",
    padding: "16px",
    background: "#00ff88",
    border: "none",
    borderRadius: 14,
    color: "#0a0a0a",
    fontWeight: 800,
    fontSize: 16,
    cursor: "pointer",
    marginTop: 14,
    display: "block",
  },
  weekRow: {
    display: "flex",
    gap: 6,
    overflowX: "auto",
    paddingBottom: 4,
    marginBottom: 24,
  },
  chipWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 24,
  },
  histItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 18px",
    background: "#161616",
    borderRadius: 12,
    border: "1px solid #1e1e1e",
    marginBottom: 8,
  },
  progressWrap: {
    height: 4,
    background: "#1e1e1e",
    borderRadius: 99,
    overflow: "hidden",
    marginBottom: 20,
  },
  exBody: {
    padding: "0 16px 14px",
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    alignItems: "center",
  },
  inputWrap: { flex: 1, minWidth: 70 },
  inputEl: {
    width: "100%",
    padding: "9px 12px",
    background: "#0d0d0d",
    border: "1px solid #2a2a2a",
    borderRadius: 10,
    color: "#f0f0f0",
    fontSize: 14,
    fontWeight: 600,
    textAlign: "center",
    outline: "none",
    boxSizing: "border-box",
  },
  inputLabel: { fontSize: 10, color: "#444", textAlign: "center", marginTop: 2 },
  finishBtn: {
    width: "100%",
    padding: "18px",
    background: "#00ff88",
    border: "none",
    borderRadius: 16,
    color: "#0a0a0a",
    fontWeight: 800,
    fontSize: 17,
    cursor: "pointer",
    marginTop: 20,
  },
  todosExRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 16px",
  },
};

function navBtnStyle(active) {
  return {
    flex: 1,
    padding: "14px 0 10px",
    background: "none",
    border: "none",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 3,
    color: active ? "#00ff88" : "#444",
    fontSize: 12,
    fontWeight: active ? 700 : 400,
  };
}

function navDotStyle(active) {
  return {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: active ? "#00ff88" : "transparent",
    marginTop: 2,
  };
}

function chipStyle(w) {
  return {
    display: "inline-flex",
    alignItems: "center",
    padding: "10px 16px",
    borderRadius: 50,
    background: WORKOUT_COLORS[w] ? WORKOUT_COLORS[w].bg : "#1e1e1e",
    color: WORKOUT_COLORS[w] ? WORKOUT_COLORS[w].text : "#fff",
    fontWeight: 700,
    fontSize: 13,
    cursor: "pointer",
    border: "none",
  };
}

function badgeStyle(w) {
  return {
    padding: "4px 10px",
    borderRadius: 50,
    background: WORKOUT_COLORS[w] ? WORKOUT_COLORS[w].bg : "#2a2a2a",
    color: WORKOUT_COLORS[w] ? WORKOUT_COLORS[w].text : "#fff",
    fontSize: 11,
    fontWeight: 700,
  };
}

function exCardStyle(done) {
  return {
    background: done ? "#0d1f18" : "#161616",
    borderRadius: 14,
    border: "1px solid " + (done ? "#1a3a28" : "#1e1e1e"),
    marginBottom: 10,
    overflow: "hidden",
  };
}

function timerPillStyle(active) {
  return {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "7px 12px",
    background: active ? "#001a0d" : "#1a1a1a",
    border: "1px solid " + (active ? "#00ff8840" : "#2a2a2a"),
    borderRadius: 50,
    color: active ? "#00ff88" : "#555",
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
    whiteSpace: "nowrap",
  };
}

function checkBtnStyle(done) {
  return {
    width: 34,
    height: 34,
    borderRadius: 10,
    border: "2px solid " + (done ? "#00ff88" : "#2a2a2a"),
    background: done ? "#00ff8820" : "transparent",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 13,
    flexShrink: 0,
    color: "#00ff88",
  };
}

var ytLinkStyle = {
  display: "inline-flex",
  alignItems: "center",
  fontSize: 11,
  color: "#555",
  textDecoration: "none",
  padding: "4px 8px",
  borderRadius: 6,
  background: "#1e1e1e",
};

export default function App() {
  var today    = new Date();
  var dateStr  = today.toISOString().split("T")[0];
  var todayDay = SPLIT[today.getDay()];

  var [tab,           setTab]           = useState("home");
  var [checkins,      setCheckins]      = useState([]);
  var [logs,          setLogs]          = useState({});
  var [exerciseState, setExerciseState] = useState({});
  var [activeWorkout, setActiveWorkout] = useState(null);
  var [timers,        setTimers]        = useState({});
  var [hydrated,      setHydrated]      = useState(false);

  useEffect(function() {
    var savedCheckins = JSON.parse(localStorage.getItem("checkins")) || [];
    var savedLogs     = JSON.parse(localStorage.getItem("logs"))     || {};
    var draft         = JSON.parse(localStorage.getItem("draftWorkout"));
    setCheckins(savedCheckins);
    setLogs(savedLogs);
    if (draft && draft.date === dateStr) {
      setExerciseState(draft.data    || {});
      setActiveWorkout(draft.workout || null);
    }
    setHydrated(true);
  }, []);

  useEffect(function() {
    if (!hydrated) return;
    localStorage.setItem("checkins", JSON.stringify(checkins));
    localStorage.setItem("logs",     JSON.stringify(logs));
  }, [checkins, logs, hydrated]);

  useEffect(function() {
    if (!hydrated) return;
    if (Object.keys(exerciseState).length > 0 || activeWorkout) {
      localStorage.setItem("draftWorkout", JSON.stringify({
        date:    dateStr,
        workout: activeWorkout,
        data:    exerciseState,
      }));
    }
  }, [exerciseState, activeWorkout, hydrated]);

  useEffect(function() {
    var interval = setInterval(function() {
      setTimers(function(prev) {
        var updated = Object.assign({}, prev);
        Object.keys(updated).forEach(function(k) {
          if (updated[k] > 0) updated[k]--;
        });
        return updated;
      });
    }, 1000);
    return function() { clearInterval(interval); };
  }, []);

  function startWorkout(type) {
    setActiveWorkout(type);
    if (!checkins.includes(dateStr)) setCheckins(checkins.concat([dateStr]));
    setTab("treino");
  }

  function handleChange(ex, field, val) {
    setExerciseState(function(prev) {
      var next = Object.assign({}, prev);
      next[ex] = Object.assign({}, prev[ex], { [field]: val });
      return next;
    });
  }

  function toggleCheck(ex) {
    setExerciseState(function(prev) {
      var next = Object.assign({}, prev);
      next[ex] = Object.assign({}, prev[ex], { done: !prev[ex]?.done });
      return next;
    });
  }

  function saveWorkout() {
    var workoutToUse = activeWorkout || todayDay;
    setLogs(function(prev) {
      var next = Object.assign({}, prev);
      next[dateStr] = { workout: workoutToUse, data: exerciseState };
      return next;
    });
    localStorage.removeItem("draftWorkout");
    alert("Parabens! Treino finalizado!");
    setExerciseState({});
    setActiveWorkout(null);
    setTab("home");
  }

  function getLast(ex) {
    var entries = Object.values(logs);
    for (var i = entries.length - 1; i >= 0; i--) {
      if (entries[i].data && entries[i].data[ex]) return entries[i].data[ex];
    }
    return null;
  }

  function getFullWorkout(workoutToUse) {
    var base = WORKOUTS[workoutToUse] || [];
    if (["Push", "Pull", "Upper", "Lower"].includes(workoutToUse)) {
      base = base.concat(ABS_LIST);
    }
    if (CARDIO_MAP[workoutToUse]) base = base.concat([CARDIO_MAP[workoutToUse]]);
    return base;
  }

  var workoutToUse = activeWorkout || todayDay;
  var exercises    = getFullWorkout(workoutToUse);
  var doneCount    = exercises.filter(function(ex) { return exerciseState[ex] && exerciseState[ex].done; }).length;
  var totalCount   = exercises.length;
  var progressPct  = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

  return (
    <div style={styles.root}>
      <div style={styles.header}>
        <div style={styles.logoWrap}>
          <span style={styles.logoText}>GOD FITNESS PRO</span>
        </div>
        <div style={styles.subtitle}>
          {today.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })}
        </div>
      </div>

      {tab === "home" && (
        <HomeTab
          todayDay={todayDay}
          workouts={WORKOUTS}
          logs={logs}
          today={today}
          onStart={startWorkout}
        />
      )}
      {tab === "treino" && (
        <TreinoTab
          workoutToUse={workoutToUse}
          exerciseState={exerciseState}
          timers={timers}
          doneCount={doneCount}
          totalCount={totalCount}
          progressPct={progressPct}
          exercises={exercises}
          getLast={getLast}
          handleChange={handleChange}
          toggleCheck={toggleCheck}
          onSave={saveWorkout}
          onTimer={function(ex) {
            setTimers(function(prev) {
              var next = Object.assign({}, prev);
              next[ex] = 90;
              return next;
            });
          }}
        />
      )}
      {tab === "todos" && (
        <TodosTab workouts={WORKOUTS} absList={ABS_LIST} />
      )}

      <nav style={styles.nav}>
        <button style={navBtnStyle(tab === "home")} onClick={function() { setTab("home"); }}>
          <span>Inicio</span>
          <div style={navDotStyle(tab === "home")} />
        </button>
        <button style={navBtnStyle(tab === "treino")} onClick={function() { setTab("treino"); }}>
          <span>Treino</span>
          <div style={navDotStyle(tab === "treino")} />
        </button>
        <button style={navBtnStyle(tab === "todos")} onClick={function() { setTab("todos"); }}>
          <span>Exercicios</span>
          <div style={navDotStyle(tab === "todos")} />
        </button>
      </nav>
    </div>
  );
}

function HomeTab(props) {
  var todayDay  = props.todayDay;
  var workouts  = props.workouts;
  var logs      = props.logs;
  var today     = props.today;
  var onStart   = props.onStart;
  var isRest    = todayDay === "Rest";
  var logEntries = Object.entries(logs).reverse().slice(0, 5);

  return (
    <div style={styles.page}>
      <div style={styles.todayCard}>
        <span style={styles.todayLabel}>Treino de hoje</span>
        <span style={styles.todayName}>{isRest ? "Descanso" : todayDay}</span>
        {!isRest && (
          <div style={{ marginTop: 8, fontSize: 13, color: "#2d9e60" }}>
            {workouts[todayDay] ? workouts[todayDay].length : 0} exercicios
            {["Push","Pull","Upper","Lower"].includes(todayDay) ? " + Abs" : ""}
          </div>
        )}
        {!isRest && (
          <button style={styles.primaryBtn} onClick={function() { onStart(todayDay); }}>
            Comecar treino do dia
          </button>
        )}
      </div>

      <span style={styles.sectionTitle}>Semana</span>
      <div style={styles.weekRow}>
        {["Dom","Seg","Ter","Qua","Qui","Sex","Sab"].map(function(d, i) {
          var isToday    = today.getDay() === i;
          var dayWorkout = SPLIT[i];
          var color      = WORKOUT_COLORS[dayWorkout];
          return (
            <div key={d} style={{
              flexShrink: 0,
              width: 44,
              textAlign: "center",
              padding: "8px 0",
              borderRadius: 12,
              background: isToday ? "#1e1e1e" : "transparent",
              border: "1px solid " + (isToday ? "#2a2a2a" : "transparent"),
            }}>
              <div style={{ fontSize: 10, color: isToday ? "#00ff88" : "#444", fontWeight: isToday ? 700 : 400 }}>
                {d}
              </div>
              <div style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                margin: "6px auto 0",
                background: color ? color.bg : "#1a1a1a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 9,
                fontWeight: 800,
                color: color ? color.text : "#555",
              }}>
                {dayWorkout === "Rest" ? "-" : dayWorkout.slice(0, 2).toUpperCase()}
              </div>
            </div>
          );
        })}
      </div>

      <span style={styles.sectionTitle}>Outros treinos</span>
      <div style={styles.chipWrap}>
        {Object.keys(workouts).map(function(w) {
          return (
            <button key={w} style={chipStyle(w)} onClick={function() { onStart(w); }}>
              {w}
            </button>
          );
        })}
      </div>

      {logEntries.length > 0 && (
        <div>
          <span style={styles.sectionTitle}>Historico recente</span>
          {logEntries.map(function(entry) {
            var date = entry[0];
            var val  = entry[1];
            var done = Object.values(val.data || {}).filter(function(d) { return d.done; }).length;
            var parts = date.split("-");
            var dateFormatted = parts[2] + "/" + parts[1] + "/" + parts[0];
            return (
              <div key={date} style={styles.histItem}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{dateFormatted}</div>
                  <div style={{ fontSize: 12, color: "#555", marginTop: 2 }}>
                    {done} exercicios concluidos
                  </div>
                </div>
                <span style={badgeStyle(val.workout)}>{val.workout}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function TreinoTab(props) {
  var workoutToUse  = props.workoutToUse;
  var exerciseState = props.exerciseState;
  var timers        = props.timers;
  var doneCount     = props.doneCount;
  var totalCount    = props.totalCount;
  var progressPct   = props.progressPct;
  var exercises     = props.exercises;
  var getLast       = props.getLast;
  var handleChange  = props.handleChange;
  var toggleCheck   = props.toggleCheck;
  var onSave        = props.onSave;
  var onTimer       = props.onTimer;

  return (
    <div style={styles.page}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 8 }}>
          <div>
            <span style={styles.sectionTitle}>Em andamento</span>
            <div style={{ fontSize: 28, fontWeight: 800, lineHeight: 1, marginTop: 2 }}>{workoutToUse}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#00ff88" }}>{progressPct}%</div>
            <div style={{ fontSize: 12, color: "#444" }}>{doneCount}/{totalCount}</div>
          </div>
        </div>
        <div style={styles.progressWrap}>
          <div style={{
            height: "100%",
            width: progressPct + "%",
            background: "#00ff88",
            borderRadius: 99,
            transition: "width 0.4s ease",
          }} />
        </div>
      </div>

      {exercises.map(function(ex) {
        var last    = getLast(ex);
        var done    = !!(exerciseState[ex] && exerciseState[ex].done);
        var timer   = timers[ex] || 0;
        var cardio  = isCardio(ex);
        var abs     = isAbs(ex);
        var prancha = isPrancha(ex);
        var ytUrl   = "https://www.youtube.com/results?search_query=" + encodeURIComponent(ex);

        return (
          <div key={ex} style={exCardStyle(done)}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "14px 16px 10px" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#f0f0f0" }}>{ex}</div>
                {last && (
                  <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>
                    {"Ultimo: " + (last.weight ? last.weight + "kg" : "") + (last.reps ? " x " + last.reps : "") + (last.time ? " " + last.time + "s" : "")}
                  </div>
                )}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <a href={ytUrl} target="_blank" rel="noreferrer" style={ytLinkStyle}>Ver</a>
                <button style={checkBtnStyle(done)} onClick={function() { toggleCheck(ex); }}>
                  {done ? "OK" : ""}
                </button>
              </div>
            </div>

            {!cardio && (
              <div style={styles.exBody}>
                {!abs && !prancha && (
                  <div style={{ display: "flex", gap: 8, flex: 1 }}>
                    <div style={styles.inputWrap}>
                      <input
                        style={styles.inputEl}
                        placeholder="0"
                        defaultValue={(exerciseState[ex] && exerciseState[ex].weight) || ""}
                        onChange={function(e) { handleChange(ex, "weight", e.target.value); }}
                      />
                      <div style={styles.inputLabel}>kg</div>
                    </div>
                    <div style={styles.inputWrap}>
                      <input
                        style={styles.inputEl}
                        placeholder="0"
                        defaultValue={(exerciseState[ex] && exerciseState[ex].reps) || ""}
                        onChange={function(e) { handleChange(ex, "reps", e.target.value); }}
                      />
                      <div style={styles.inputLabel}>reps</div>
                    </div>
                  </div>
                )}
                {prancha && (
                  <div style={styles.inputWrap}>
                    <input
                      style={styles.inputEl}
                      placeholder="0"
                      defaultValue={(exerciseState[ex] && exerciseState[ex].time) || ""}
                      onChange={function(e) { handleChange(ex, "time", e.target.value); }}
                    />
                    <div style={styles.inputLabel}>segundos</div>
                  </div>
                )}
                <button style={timerPillStyle(timer > 0)} onClick={function() { onTimer(ex); }}>
                  {timer > 0 ? timer + "s" : "90s"}
                </button>
              </div>
            )}
          </div>
        );
      })}

      <button style={styles.finishBtn} onClick={onSave}>
        Finalizar treino
      </button>
    </div>
  );
}

function TodosTab(props) {
  var workouts = props.workouts;
  var absList  = props.absList;
  var [open, setOpen] = useState(null);
  var groups = Object.keys(workouts).concat(["Abdomen"]);

  return (
    <div style={styles.page}>
      <div style={{ marginBottom: 20 }}>
        <span style={styles.sectionTitle}>Todos os exercicios</span>
        <div style={{ fontSize: 13, color: "#444" }}>Toque em um grupo para expandir</div>
      </div>

      {groups.map(function(day) {
        var exercises = day === "Abdomen" ? absList : workouts[day];
        var isOpen    = open === day;
        var color     = WORKOUT_COLORS[day];

        return (
          <div key={day} style={{ marginBottom: 8 }}>
            <button
              onClick={function() { setOpen(isOpen ? null : day); }}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 18px",
                background: "#161616",
                border: "1px solid #1e1e1e",
                borderRadius: isOpen ? "14px 14px 0 0" : "14px",
                cursor: "pointer",
                color: "#f0f0f0",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: 10,
                  background: color ? color.bg : "#2a2a2a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  fontWeight: 800,
                  color: color ? color.text : "#fff",
                }}>
                  {day === "Abdomen" ? "AB" : day.slice(0, 2).toUpperCase()}
                </div>
                <span style={{ fontWeight: 700, fontSize: 15 }}>{day}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 12, color: "#444" }}>{exercises.length} ex.</span>
                <span style={{ color: "#444", fontSize: 16 }}>{isOpen ? "v" : "+"}</span>
              </div>
            </button>

            {isOpen && (
              <div style={{
                background: "#121212",
                border: "1px solid #1e1e1e",
                borderTop: "none",
                borderRadius: "0 0 14px 14px",
                overflow: "hidden",
              }}>
                {exercises.map(function(ex, i) {
                  var ytUrl = "https://www.youtube.com/results?search_query=" + encodeURIComponent(ex);
                  return (
                    <div key={ex} style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "10px 16px",
                      borderBottom: i < exercises.length - 1 ? "1px solid #1a1a1a" : "none",
                    }}>
                      <span style={{ fontSize: 13, color: "#ccc" }}>{ex}</span>
                      <a href={ytUrl} target="_blank" rel="noreferrer" style={ytLinkStyle}>Ver</a>
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
