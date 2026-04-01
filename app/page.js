"use client";
import { useState, useEffect } from "react";

const workouts = {
  Push: [
    "Supino Reto Máquina","Supino Inclinado Máquina","Peck Deck","Crossover Polia Alta","Crossover Polia Baixa",
    "Desenvolvimento Ombro Máquina","Elevação Lateral Polia","Posterior Ombro Polia",
    "Tríceps Testa Polia","Tríceps Corda","Tríceps Francês Polia"
  ],
  Pull: [
    "Puxada Frontal","Puxada Pegada Fechada","Remada Máquina","Remada Baixa Triângulo",
    "Pulldown Braço Estendido","Face Pull","Rosca Direta Barra W","Rosca Scott","Rosca Martelo","Rosca Polia"
  ],
  Legs: [
    "Agachamento","Leg Press","Cadeira Extensora","Mesa Flexora","Leg Curl em Pé",
    "Elevação Pélvica","Abdutora","Adutora","Panturrilha"
  ]
};

export default function App() {
  const today = new Date().toISOString().split("T")[0];

  const [tab, setTab] = useState("home");
  const [checkins, setCheckins] = useState([]);
  const [dailyLogs, setDailyLogs] = useState({});
  const [selectedDay, setSelectedDay] = useState("Push");
  const [exerciseState, setExerciseState] = useState({});

  useEffect(() => {
    setCheckins(JSON.parse(localStorage.getItem("checkins")) || []);
    setDailyLogs(JSON.parse(localStorage.getItem("dailyLogs")) || {});
  }, []);

  useEffect(() => {
    localStorage.setItem("checkins", JSON.stringify(checkins));
    localStorage.setItem("dailyLogs", JSON.stringify(dailyLogs));
  }, [checkins, dailyLogs]);

  const handleCheckin = () => {
    if (!checkins.includes(today)) setCheckins([...checkins, today]);
    setTab("treino");
  };

  const handleChange = (ex, field, value) => {
    setExerciseState({
      ...exerciseState,
      [ex]: {
        ...exerciseState[ex],
        [field]: value
      }
    });
  };

  const toggleDone = (ex) => {
    setExerciseState({
      ...exerciseState,
      [ex]: {
        ...exerciseState[ex],
        done: !exerciseState[ex]?.done
      }
    });
  };

  const finishWorkout = () => {
    const entries = Object.keys(exerciseState).map(ex => ({
      ex,
      weight: exerciseState[ex]?.weight || "",
      reps: exerciseState[ex]?.reps || ""
    }));

    setDailyLogs({
      ...dailyLogs,
      [today]: entries
    });

    setExerciseState({});
    setTab("home");
  };

  const streak = checkins.length;

  return (
    <div style={{padding:20, background:"#0a0a0a", color:"#f1f1f1", minHeight:"100vh", fontFamily:"Arial"}}>

      <h1 style={{textAlign:"center", color:"#00ff88"}}>🔥 GOD FITNESS</h1>

      <div style={{display:"flex", justifyContent:"space-around", marginBottom:20}}>
        <button onClick={()=>setTab("home")} style={btn}>Home</button>
        <button onClick={()=>setTab("treino")} style={btn}>Treino</button>
      </div>

      {tab === "home" && (
        <div>
          <button onClick={handleCheckin} style={checkBtn}>🚀 Check-in Academia</button>
          <p style={{marginTop:10}}>🔥 Streak: {streak}</p>

          <h3>📅 Histórico</h3>
          {checkins.map((d,i)=>(
            <div key={i} style={{marginBottom:5}}>
              {d}
              {(dailyLogs[d]||[]).map((l,idx)=>(
                <div key={idx} style={{fontSize:12, color:"#ccc"}}>
                  {l.ex} - {l.weight}kg x {l.reps}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {tab === "treino" && (
        <div>
          <div style={{marginBottom:10}}>
            {Object.keys(workouts).map(day=>(
              <button key={day} onClick={()=>setSelectedDay(day)} style={btn}>{day}</button>
            ))}
          </div>

          {workouts[selectedDay].map(ex => (
            <div key={ex} style={card}>
              <div style={{display:"flex", justifyContent:"space-between"}}>
                <b>{ex}</b>
                <input type="checkbox" checked={exerciseState[ex]?.done || false} onChange={()=>toggleDone(ex)}/>
              </div>

              <a href={`https://www.youtube.com/results?search_query=${ex}`} target="_blank" style={{fontSize:12, color:"#00ff88"}}>
                ▶ Ver execução
              </a>

              <div style={{marginTop:5}}>
                <input placeholder="kg" style={input} onChange={(e)=>handleChange(ex,"weight",e.target.value)}/>
                <input placeholder="reps" style={input} onChange={(e)=>handleChange(ex,"reps",e.target.value)}/>
              </div>
            </div>
          ))}

          <button onClick={finishWorkout} style={finishBtn}>✅ Concluir Treino</button>
        </div>
      )}
    </div>
  );
}

const btn = {
  padding:10,
  borderRadius:10,
  border:"none",
  background:"#1f1f1f",
  color:"white",
  margin:5
};

const checkBtn = {
  width:"100%",
  padding:15,
  borderRadius:12,
  border:"none",
  background:"linear-gradient(90deg,#00ff88,#00cc66)",
  color:"black",
  fontWeight:"bold",
  fontSize:16
};

const finishBtn = {
  width:"100%",
  padding:15,
  borderRadius:12,
  border:"none",
  background:"#00ff88",
  color:"black",
  fontWeight:"bold",
  marginTop:20
};

const input = {
  width:"45%",
  marginRight:"5%",
  padding:8,
  borderRadius:8,
  border:"none",
  marginTop:5
};

const card = {
  border:"1px solid #333",
  borderRadius:12,
  padding:10,
  marginBottom:10,
  background:"#111"
};
