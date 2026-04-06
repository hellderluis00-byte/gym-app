"use client";
import { useState, useEffect } from "react";

// ─── Dados ───────────────────────────────────────────────────────────────────

const SPLIT = ["Rest", "Push", "Pull", "Legs", "Upper", "Lower", "Rest"];

const WORKOUTS = {
  Push:  ["Supino Reto Máquina","Supino Inclinado Máquina","Peck Deck","Crossover Polia Alta","Crossover Polia Baixa","Desenvolvimento Ombro Máquina","Elevação Lateral Polia","Posterior Ombro Polia","Tríceps Testa Polia","Tríceps Corda","Tríceps Francês Polia"],
  Pull:  ["Puxada Frontal","Puxada Pegada Fechada","Remada Máquina","Remada Baixa Triângulo","Pulldown Braço Estendido","Face Pull","Rosca Direta Barra W","Rosca Scott","Rosca Martelo","Rosca Polia"],
  Legs:  ["Agachamento","Leg Press 45º","Cadeira Extensora","Mesa Flexora","Leg Curl em Pé","Elevação Pélvica","Abdutora","Adutora","Panturrilha"],
  Upper: ["Supino Inclinado Máquina","Crossover Polia Alta","Puxada Frontal","Remada Máquina","Elevação Lateral Polia","Posterior Ombro Polia","Tríceps Corda","Rosca Direta Barra W"],
  Lower: ["Agachamento","Leg Press 45º","Mesa Flexora","Stiff","Elevação Pélvica","Panturrilha","Abdutora"],
};

const ABS_LIST = ["Abdominal Máquina","Abdominal Supra","Abdominal Infra","Prancha"];

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

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatDate = (dateStr) => {
  const [y, m, d] = dateStr.split("-");
  return `${d}/${m}/${y}`;
};

const isCardio  = (ex) => ex.includes("min");
const isAbs     = (ex) => ex.includes("Abdominal");
const isPrancha = (ex) => ex === "Prancha";

// ─── Estilos ──────────────────────────────────────────────────────────────────

const styles = {
  root: {
    minHeight: "100vh",
    background: "#0d0d0d",
    color: "#f0f0f0",
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    paddingBottom: 80,
  },
  header: {
    padding: "28px 20px 16px",
    borderBottom: "1px solid #1e1e1e",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 4,
  },
  logoText: {
    fontSize: 22,
    fontWeight: 800,
    letterSpacing: "-0.5px",
    background: "linear-gradient(90deg, #00ff88, #00c8ff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
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
  navBtn: (active) => ({
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
    fontSize: 10,
    fontWeight: active ? 700 : 400,
    transition: "color 0.2s",
  }),
  navDot: (active) => ({
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: active ? "#00ff88" : "transparent",
    marginTop: 2,
  }),
  page: { padding: "20px 16px" },
  section: { marginBottom: 28 },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "1.5px",
    color: "#444",
    textTransform: "uppercase",
    marginBottom: 12,
  },
  card: {
    background: "#161616",
    borderRadius: 16,
    border: "1px solid #1e1e1e",
    padding: "16px 18px",
    marginBottom: 10,
  },
  todayCard: {
    background: "linear-gradient(135deg, #0d2818 0%, #0d1f1a 100%)",
    borderRadius: 20,
    border: "1px solid #1a3a28",
    padding: "24px 20px",
    marginBottom: 20,
  },
  todayLabel: { fontSize: 11, color: "#2d9e60", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase" },
  todayName: { fontSize: 36, fontWeight: 800, color: "#fff", lineHeight: 1.1, marginTop: 4 },
  primaryBtn: {
    width: "100%",
    padding: "16px",
    background: "linear-gradient(135deg, #00ff88, #00c8a0)",
    border: "none",
    borderRadius: 14,
    color: "#0a0a0a",
    fontWeight: 800,
    fontSize: 16,
    cursor: "pointer",
    marginTop: 14,
    letterSpacing: "0.3px",
  },
  workoutChip: (w) => ({
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "10px 16px",
    borderRadius: 50,
    background: WORKOUT_COLORS[w]?.bg || "#1e1e1e",
    color: WORKOUT_COLORS[w]?.text || "#fff",
    fontWeight: 700,
    fontSize: 13,
    cursor: "pointer",
    border: "none",
  }),
  exCard: (done) => ({
    background: done ? "#0d1f18" : "#161616",
    borderRadius: 14,
    border: `1px solid ${done ? "#1a3a28" : "#1e1e1e"}`,
    marginBottom: 10,
    overflow: "hidden",
    transition: "border-color 0.3s",
  }),
  exHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "14px 16px 10px",
  },
  exName: { fontWeight: 700, fontSize: 14, color: "#f0f0f0", flex: 1 },
  lastSet: { fontSize: 11, color: "#555", marginTop: 2 },
  exBody: { padding: "0 16px 14px", display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" },
  input: {
    flex: 1,
    minWidth: 70,
    padding: "9px 12px",
    background: "#0d0d0d",
    border: "1px solid #2a2a2a",
    borderRadius: 10,
    color: "#f0f0f0",
    fontSize: 14,
    fontWeight: 600,
    textAlign: "center",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  },
  inputLabel: { fontSize: 10, color: "#444", textAlign: "center", marginTop: 2 },
  timerPill: (active) => ({
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "7px 12px",
    background: active ? "#001a0d" : "#1a1a1a",
    border: `1px solid ${active ? "#00ff8840" : "#2a2a2a"}`,
    borderRadius: 50,
    color: active ? "#00ff88" : "#555",
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
    whiteSpace: "nowrap",
  }),
  checkBtn: (done) => ({
    width: 34,
    height: 34,
    borderRadius: 10,
    border: `2px solid ${done ? "#00ff88" : "#2a2a2a"}`,
    background: done ? "#00ff8820" : "transparent",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
    flexShrink: 0,
    color: "#00ff88",
  }),
  ytLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    fontSize: 11,
    color: "#555",
    textDecoration: "none",
    padding: "4px 8px",
    borderRadius: 6,
    background: "#1e1e1e",
  },
  finishBtn: {
    width: "100%",
    padding: "18px",
    background: "linear-gradient(135deg, #00ff88, #00c8a0)",
    border: "none",
    borderRadius: 16,
    color: "#0a0a0a",
    fontWeight: 800,
    fontSize: 17,
    cursor: "pointer",
    marginTop: 20,
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
  badge: (w) => ({
    padding: "4px 10px",
    borderRadius: 50,
    background: WORKOUT_COLORS[w]?.bg || "#2a2a2a",
    color: WORKOUT_COLORS[w]?.text || "#fff",
    fontSize: 11,
    fontWeight: 700,
  }),
  todosExRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 16px",
    borderBottom: "1px solid #1a1a1a",
  },
  weekRow: {
    display: "flex",
    gap: 6,
    overflowX: "auto",
    paddingBottom: 4,
  },
  weekDay: (active) => ({
    flexShrink: 0,
    width: 44,
    textAlign: "center",
    padding: "8px 0",
    borderRadius: 12,
    background: active ? "#1e1e1e" : "transparent",
    border: `1px solid ${active ? "#2a2a2a" : "transparent"}`,
  }),
};

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const today   = new Date();
  const dateStr = today.toISOString().split("T")[0];
  const todayDay = SPLIT[today.getDay()];

  const [tab,           setTab]           = useState("home");
  const [checkins,      setCheckins]      = useState([]);
  const [logs,          setLogs]          = useState({});
  const [exerciseState, setExerciseState] = useState({});
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [timers,        setTimers]        = useState({});
  const [hydrated,      setHydrated]      = useState(false); // ← flag para evitar race condition

  // ── Carrega dados do localStorage uma única vez ───────────────────────────
  useEffect(() => {
    const savedCheckins = JSON.parse(localStorage.getItem("checkins")) || [];
    const savedLogs     = JSON.parse(localStorage.getItem("logs"))     || {};
    const draft         = JSON.parse(localStorage.getItem("draftWorkout"));

    setCheckins(savedCheckins);
    setLogs(savedLogs);

    if (draft && draft.date === dateStr) {
      setExerciseState(draft.data    || {});
      setActiveWorkout(draft.workout || null);
    }

    setHydrated(true); // sinaliza que o estado inicial foi carregado
  }, []);

  // ── Persiste checkins e logs (só após hydration para não sobrescrever) ────
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("checkins", JSON.stringify(checkins));
    localStorage.setItem("logs",     JSON.stringify(logs));
  }, [checkins, logs, hydrated]);

  // ── Autosave do rascunho em tempo real ────────────────────────────────────
  useEffect(() => {
    if (!hydrated) return;
    if (Object.keys(exerciseState).length > 0 || activeWorkout) {
      localStorage.setItem("draftWorkout", JSON.stringify({
        date:    dateStr,
        workout: activeWorkout,   // ← corrigido: estava faltando activeWorkout nas deps
        data:    exerciseState,
      }));
    }
  }, [exerciseState, activeWorkout, hydrated]); // ← activeWorkout incluído

  // ── Timer ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prev) => {
        const updated = { ...prev };
        Object.keys(updated).forEach((k) => {
          if (updated[k] > 0) updated[k]--;
        });
        return updated;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // ── Ações ─────────────────────────────────────────────────────────────────
  const startWorkout = (type) => {
    setActiveWorkout(type);
    if (!checkins.includes(dateStr)) setCheckins([...checkins, dateStr]);
    setTab("treino");
  };

  const handleChange = (ex, field, val) => {
    setExerciseState((prev) => ({
      ...prev,
      [ex]: { ...prev[ex], [field]: val },
    }));
  };

  const toggleCheck = (ex) => {
    setExerciseState((prev) => ({
      ...prev,
      [ex]: { ...prev[ex], done: !prev[ex]?.done },
    }));
  };

  const saveWorkout = () => {
    setLogs((prev) => ({
      ...prev,
      [dateStr]: { workout: workoutToUse, data: exerciseState },
    }));
    localStorage.removeItem("draftWorkout");
    alert("🔥 Parabéns! Treino finalizado com sucesso!");
    setExerciseState({});
    setActiveWorkout(null);
    setTab("home");
  };

  const getLast = (ex) => {
    const entries = Object.values(logs);
    for (let i = entries.length - 1; i >= 0; i--) {
      if (entries[i].data?.[ex]) return entries[i].data[ex];
    }
    return null;
  };

  const workoutToUse = activeWorkout || todayDay;

  const fullWorkout = () => {
    let base = WORKOUTS[workoutToUse] || [];
    if (["Push", "Pull", "Upper", "Lower"].includes(workoutToUse)) {
      base = [...base, ...ABS_LIST];
    }
    if (CARDIO_MAP[workoutToUse]) base = [...base, CARDIO_MAP[workoutToUse]];
    return base;
  };

  const doneCount   = fullWorkout().filter((ex) => exerciseState[ex]?.done).length;
  const totalCount  = fullWorkout().length;
  const progressPct = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

  return (
    <div style={styles.root}>

      {/* ── Header ── */}
      <div style={styles.header}>
        <div style={styles.logo}>
          <span style={{ fontSize: 22 }}>🔥</span>
          <span style={styles.logoText}>GOD FITNESS PRO</span>
        </div>
        <div style={styles.subtitle}>
          {today.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })}
        </div>
      </div>

      {/* ── Páginas ── */}
      {tab === "home" && (
        <HomeTab
          todayDay={todayDay}
          workouts={WORKOUTS}
          logs={logs}
          today={today}
          onStart={startWorkout}
          formatDate={formatDate}
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
          fullWorkout={fullWorkout}
          getLast={getLast}
          handleChange={handleChange}
          toggleCheck={toggleCheck}
          onSave={saveWorkout}
          onTimer={(ex) => setTimers((prev) => ({ ...prev, [ex]: 90 }))}
        />
      )}
      {tab === "todos" && (
        <TodosTab workouts={WORKOUTS} absList={ABS_LIST} />
      )}

      {/* ── Nav ── */}
      <nav style={styles.nav}>
        {[
          { id: "home",   icon: "⌂", label: "Início"     },
          { id: "treino", icon: "◈", label: "Treino"     },
          { id: "todos",  icon: "≡", label: "Exercícios" },
        ].map(({ id, icon, label }) => (
          <button key={id} style={styles.navBtn(tab === id)} onClick={() => setTab(id)}>
            <span style={{ fontSize: 18 }}>{icon}</span>
            <span>{label}</span>
            <div style={styles.navDot(tab === id)} />
          </button>
        ))}
      </nav>
    </div>
  );
}

// ─── Home Tab ─────────────────────────────────────────────────────────────────

function HomeTab({ todayDay, workouts, logs, today, onStart, formatDate }) {
  const logEntries = Object.entries(logs).reverse().slice(0, 5);
  const isRest = todayDay === "Rest";

  return (
    <div style={styles.page}>

      {/* Cartão do dia */}
      <div style={styles.todayCard}>
        <div style={styles.todayLabel}>Treino de hoje</div>
        <div style={styles.todayName}>{isRest ? "Descanso 😴" : todayDay}</div>
        {!isRest && (
          <div style={{ marginTop: 8, fontSize: 13, color: "#2d9e60" }}>
            {workouts[todayDay]?.length} exercícios
            {["Push","Pull","Upper","Lower"].includes(todayDay) ? " · Abs incluído" : ""}
          </div>
        )}
        {!isRest && (
          <button style={styles.primaryBtn} onClick={() => onStart(todayDay)}>
            Começar treino do dia →
          </button>
        )}
      </div>

      {/* Mini semana */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>Semana</div>
        <div style={styles.weekRow}>
          {["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"].map((d, i) => {
            const isToday    = today.getDay() === i;
            const dayWorkout = SPLIT[i];
            const color      = WORKOUT_COLORS[dayWorkout];
            return (
              <div key={d} style={styles.weekDay(isToday)}>
                <div style={{ fontSize: 10, color: isToday ? "#00ff88" : "#444", fontWeight: isToday ? 700 : 400 }}>
                  {d}
                </div>
                <div style={{
                  width: 28, height: 28, borderRadius: 8, margin: "6px auto 0",
                  background: color?.bg || "#1a1a1a",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 9, fontWeight: 800,
                  color: color?.text || "#555",
                }}>
                  {dayWorkout === "Rest" ? "—" : dayWorkout.slice(0,2).toUpperCase()}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Outros treinos */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>Outros treinos</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {Object.keys(workouts).map((w) => (
            <button key={w} style={styles.workoutChip(w)} onClick={() => onStart(w)}>
              {w}
            </button>
          ))}
        </div>
      </div>

      {/* Histórico */}
      {logEntries.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Histórico recente</div>
          {logEntries.map(([date, val]) => (
            <div key={date} style={styles.histItem}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{formatDate(date)}</div>
                <div style={{ fontSize: 12, color: "#555", marginTop: 2 }}>
                  {Object.values(val.data || {}).filter((d) => d.done).length} exercícios concluídos
                </div>
              </div>
              <span style={styles.badge(val.workout)}>{val.workout}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Treino Tab ───────────────────────────────────────────────────────────────

function TreinoTab({
  workoutToUse, exerciseState, timers, doneCount, totalCount, progressPct,
  fullWorkout, getLast, handleChange, toggleCheck, onSave, onTimer,
}) {
  return (
    <div style={styles.page}>

      {/* Cabeçalho com progresso */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 8 }}>
          <div>
            <div style={styles.sectionTitle}>Em andamento</div>
            <div style={{ fontSize: 28, fontWeight: 800, lineHeight: 1, marginTop: 2 }}>{workoutToUse}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#00ff88" }}>{progressPct}%</div>
            <div style={{ fontSize: 12, color: "#444" }}>{doneCount}/{totalCount}</div>
          </div>
        </div>
        <div style={{ height: 4, background: "#1e1e1e", borderRadius: 99, overflow: "hidden" }}>
          <div style={{
            height: "100%",
            width: `${progressPct}%`,
            background: "linear-gradient(90deg, #00ff88, #00c8a0)",
            borderRadius: 99,
            transition: "width 0.4s ease",
          }} />
        </div>
      </div>

      {/* Exercícios */}
      {fullWorkout().map((ex) => {
        const last    = getLast(ex);
        const done    = !!exerciseState[ex]?.done;
        const timer   = timers[ex] || 0;
        const cardio  = isCardio(ex);
        const abs     = isAbs(ex);
        const prancha = isPrancha(ex);

        return (
          <div key={ex} style={styles.exCard(done)}>
            <div style={styles.exHeader}>
              <div style={{ flex: 1 }}>
                <div style={styles.exName}>{ex}</div>
                {last && (
                  <div style={styles.lastSet}>
                    Último:{" "}
                    {last.weight ? `${last.weight}kg` : ""}
                    {last.reps   ? ` × ${last.reps}`  : ""}
                    {last.time   ? ` ${last.time}s`   : ""}
                  </div>
                )}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                
                  href={`https://www.youtube.com/results?search_query=${ex}`}
                  target="_blank"
                  rel="noreferrer"
                  style={styles.ytLink}
                >
                  ▶
                </a>
                <button style={styles.checkBtn(done)} onClick={() => toggleCheck(ex)}>
                  {done ? "✓" : ""}
                </button>
              </div>
            </div>

            {!cardio && (
              <div style={styles.exBody}>
                {!abs && !prancha && (
                  <>
                    <div style={{ flex: 1, minWidth: 70 }}>
                      <input
                        style={styles.input}
                        placeholder="0"
                        defaultValue={exerciseState[ex]?.weight || ""}
                        onChange={(e) => handleChange(ex, "weight", e.target.value)}
                      />
                      <div style={styles.inputLabel}>kg</div>
                    </div>
                    <div style={{ flex: 1, minWidth: 70 }}>
                      <input
                        style={styles.input}
                        placeholder="0"
                        defaultValue={exerciseState[ex]?.reps || ""}
                        onChange={(e) => handleChange(ex, "reps", e.target.value)}
                      />
                      <div style={styles.inputLabel}>reps</div>
                    </div>
                  </>
                )}

                {prancha && (
                  <div style={{ flex: 1, minWidth: 70 }}>
                    <input
                      style={styles.input}
                      placeholder="0"
                      defaultValue={exerciseState[ex]?.time || ""}
                      onChange={(e) => handleChange(ex, "time", e.target.value)}
                    />
                    <div style={styles.inputLabel}>segundos</div>
                  </div>
                )}

                <button style={styles.timerPill(timer > 0)} onClick={() => onTimer(ex)}>
                  ⏱ {timer > 0 ? `${timer}s` : "90s"}
                </button>
              </div>
            )}
          </div>
        );
      })}

      <button style={styles.finishBtn} onClick={onSave}>
        🔥 Finalizar treino
      </button>
    </div>
  );
}

// ─── Todos Tab ────────────────────────────────────────────────────────────────

function TodosTab({ workouts, absList }) {
  const [open, setOpen] = useState(null);
  const groups = [...Object.keys(workouts), "Abdômen"];

  return (
    <div style={styles.page}>
      <div style={{ marginBottom: 20 }}>
        <div style={styles.sectionTitle}>Todos os exercícios</div>
        <div style={{ fontSize: 13, color: "#444" }}>Toque em um grupo para expandir</div>
      </div>

      {groups.map((day) => {
        const exercises = day === "Abdômen" ? absList : workouts[day];
        const isOpen    = open === day;
        const color     = WORKOUT_COLORS[day];

        return (
          <div key={day} style={{ marginBottom: 8 }}>
            <button
              onClick={() => setOpen(isOpen ? null : day)}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 18px",
                background: "#161616",
                border: "1px solid #1e1e1e",
                borderRadius: isOpen ? "14px 14px 0 0" : 14,
                cursor: "pointer",
                color: "#f0f0f0",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 10,
                  background: color?.bg || "#2a2a2a",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 800,
                  color: color?.text || "#fff",
                }}>
                  {day === "Abdômen" ? "AB" : day.slice(0,2).toUpperCase()}
                </div>
                <span style={{ fontWeight: 700, fontSize: 15 }}>{day}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 12, color: "#444" }}>{exercises.length} ex.</span>
                <span style={{
                  color: "#444", fontSize: 18,
                  display: "inline-block",
                  transform: isOpen ? "rotate(90deg)" : "none",
                  transition: "transform 0.2s",
                }}>›</span>
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
                {exercises.map((ex, i) => (
                  <div key={ex} style={{
                    ...styles.todosExRow,
                    borderBottom: i < exercises.length - 1 ? "1px solid #1a1a1a" : "none",
                  }}>
                    <span style={{ fontSize: 13, color: "#ccc" }}>{ex}</span>
                    
                      href={`https://www.youtube.com/results?search_query=${ex}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{ ...styles.ytLink, fontSize: 12 }}
                    >
                      ▶ Ver
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
