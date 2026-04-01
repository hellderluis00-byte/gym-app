"use client";
import { useState, useEffect } from "react";

const workouts = {
  Push: ["Supino Reto Máquina","Supino Inclinado Máquina","Peck Deck"],
  Pull: ["Puxada Frontal","Remada Máquina","Rosca Direta"],
  Legs: ["Agachamento","Leg Press","Cadeira Extensora"]
};

export default function Home() {
  const today = new Date().toISOString().split("T")[0];

  const [checkins, setCheckins] = useState([]);
  const [logs, setLogs] = useState({});
  const [tab, setTab] = useState("home");
  const [selectedDay, setSelectedDay] = useState("Push");

  useEffect(() => {
    const c = JSON.parse(localStorage.getItem("checkins")) || [];
    const l = JSON.parse(localStorage.getItem("logs")) || {};
    setCheckins(c);
    setLogs(l);
  }, []);

  useEffect(() => {
    localStorage.setItem("checkins", JSON.stringify(checkins));
    localStorage.setItem("logs", JSON.stringify(logs));
  }, [checkins, logs]);

  const checkin = () => {
    if (!checkins.includes(today)) {
      setCheckins([...checkins, today]);
    }
  };

  const save = (ex) => {
    const weight = document.getElementById(ex+"w").value;
    const reps = document.getElementById(ex+"r").value;

    const newLogs = {
      ...logs,
      [today]: [...(logs[today] || []), { ex, weight, reps }]
    };

    setLogs(newLogs);
  };

  return (
    <div style={{padding:20, color:"white", background:"#0f0f0f", minHeight:"100vh"}}>
      <h1>🔥 Gym App</h1>

      <div>
        <button onClick={()=>setTab("home")}>Home</button>
        <button onClick={()=>setTab("treino")}>Treino</button>
      </div>

      {tab==="home" && (
        <div>
          <button onClick={checkin}>Check-in</button>
          <p>Dias: {checkins.length}</p>

          <h3>Histórico</h3>
          {checkins.map((d,i)=>(
            <div key={i}>
              {d}
              {(logs[d]||[]).map((l,idx)=>(
                <div key={idx}>{l.ex} - {l.weight}kg x {l.reps}</div>
              ))}
            </div>
          ))}
        </div>
      )}

      {tab==="treino" && (
        <div>
          {Object.keys(workouts).map(day=>(
            <button key={day} onClick={()=>setSelectedDay(day)}>{day}</button>
          ))}

          {workouts[selectedDay].map(ex=>(
            <div key={ex} style={{border:"1px solid gray", padding:10, marginTop:10}}>
              <b>{ex}</b>

              <br/>

              <a href={`https://www.youtube.com/results?search_query=${ex}`} target="_blank">
                Ver execução
              </a>

              <br/>

              <input id={ex+"w"} placeholder="kg"/>
              <input id={ex+"r"} placeholder="reps"/>

              <button onClick={()=>save(ex)}>Salvar</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
