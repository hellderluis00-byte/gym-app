"use client";
import { useState, useEffect } from "react";

// Segunda = Push
const split = ["Rest","Push","Pull","Legs","Upper","Lower","Rest"];

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
  ],
  Upper: [
    "Supino Inclinado Máquina","Crossover Polia Alta","Puxada Frontal","Remada Máquina",
    "Elevação Lateral Polia","Posterior Ombro Polia","Tríceps Corda","Rosca Direta Barra W"
  ],
  Lower: [
    "Agachamento","Leg Press","Cadeira Extensora","Mesa Flexora",
    "Elevação Pélvica","Panturrilha","Abdutora","Adutora"
  ]
};

const absList = [
  "Abdominal Máquina","Abdominal Supra","Abdominal Infra","Prancha"
];

const cardioMap = {
  Push: "Esteira 20min",
  Pull: "Bike 20min",
  Upper: "Esteira 20min",
  Lower: "Bike 20min"
};

export default function App() {
  const today = new Date();
  const dateStr = today.toISOString().split("T")[0];
  const dayIndex = today.getDay();
  const todayWorkout = split[dayIndex];

  const [tab,setTab]=useState("home");
  const [checkins,setCheckins]=useState([]);
  const [logs,setLogs]=useState({});
  const [exerciseState,setExerciseState]=useState({});
  const [timer,setTimer]=useState(0);
  const [focus,setFocus]=useState(false);
  const [selectedDate,setSelectedDate]=useState(null);

  useEffect(()=>{
    setCheckins(JSON.parse(localStorage.getItem("checkins"))||[]);
    setLogs(JSON.parse(localStorage.getItem("logs"))||{});
  },[]);

  useEffect(()=>{
    localStorage.setItem("checkins",JSON.stringify(checkins));
    localStorage.setItem("logs",JSON.stringify(logs));
  },[checkins,logs]);

  useEffect(()=>{
    if(timer>0){
      const t=setTimeout(()=>setTimer(timer-1),1000);
      return ()=>clearTimeout(t);
    }
  },[timer]);

  const checkin=()=>{
    if(todayWorkout==="Rest") return alert("Hoje é descanso");
    if(!checkins.includes(dateStr)) setCheckins([...checkins,dateStr]);
    setTab("treino");
  };

  const saveWorkout=()=>{
    setLogs({...logs,[dateStr]:exerciseState});
    setExerciseState({});
    setTab("home");
  };

  const handleChange=(ex,field,val)=>{
    setExerciseState(prev=>({
      ...prev,
      [ex]:{...prev[ex],[field]:val}
    }));
  };

  const getStats=(ex)=>{
    const entries=Object.values(logs);
    let last=null;
    let best=null;

    for(let i=0;i<entries.length;i++){
      if(entries[i][ex]){
        const data = entries[i][ex];

        // último
        last = data;

        // melhor (PR) baseado em peso
        if(!best || (data.weight && Number(data.weight) > Number(best.weight||0))){
          best = data;
        }
      }
    }

    return { last, best };
  };

  const fullWorkout = () => {
    let base = workouts[todayWorkout] || [];

    // adicionar abdomen nos dias certos
    if(["Push","Pull","Upper","Lower"].includes(todayWorkout)){
      base = [...base, ...absList];
    }

    // adicionar cardio como item do treino
    if(cardioMap[todayWorkout]){
      base = [...base, cardioMap[todayWorkout]];
    }

    return base;
  };

  const weeklyGoal=5;
  const thisWeek=checkins.length;

  return(
    <div style={{padding:20,background:"#0a0a0a",color:"white",minHeight:"100vh"}}>

      <h1 style={{textAlign:"center",color:"#00ff88"}}>🔥 GOD FITNESS PRO</h1>

      <div style={{display:"flex",justifyContent:"space-around"}}>
        <button onClick={()=>setTab("home")}>Home</button>
        <button onClick={()=>setTab("treino")}>Treino</button>
        <button onClick={()=>setTab("todos")}>Todos</button>
      </div>

      {tab==="home" && (
        <div>
          <h2>Hoje: {todayWorkout}</h2>

          {cardioMap[todayWorkout] && (
            <p>🚴 Cardio: {cardioMap[todayWorkout]}</p>
          )}

          { ["Push","Pull","Upper","Lower"].includes(todayWorkout) && (
            <p>🔥 Abdômen incluso</p>
          )}

          <button onClick={checkin} style={{padding:15,background:"#00ff88",border:"none"}}>Check-in</button>

          <p>🔥 Semana: {thisWeek}/{weeklyGoal}</p>
          <div style={{background:"gray",height:10}}>
            <div style={{width:`${(thisWeek/weeklyGoal)*100}%`,background:"#00ff88",height:10}}></div>
          </div>

          <h3>📅 Histórico</h3>
          {checkins.map((d,i)=>(
            <div key={i} onClick={()=>setSelectedDate(d)} style={{cursor:"pointer"}}>{d}</div>
          ))}

          {selectedDate && (
            <div>
              <h4>Treino:</h4>
              {Object.entries(logs[selectedDate]||{}).map(([ex,val],i)=>(
                <div key={i}>
                  {ex} - {val.weight||""} {val.reps?`x ${val.reps}`:""} {val.time?`(${val.time}s)`:""}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab==="treino" && todayWorkout!=="Rest" && (
        <div>
          <h2>{todayWorkout}</h2>

          <button onClick={()=>setFocus(!focus)}>Modo Foco</button>

          {(focus
            ? [fullWorkout().find(ex=>!exerciseState[ex]?.done)]
            : fullWorkout()
          ).map(ex => (
            ex ? (
              <div key={ex} style={{border:"1px solid #333",padding:10,margin:10}}>
                <b>{ex}</b>

                {/* mostrar carga anterior só pra musculação */}
                {!ex.includes("Abdominal") && ex !== "Prancha" && !ex.includes("min") && (
                  <p style={{fontSize:12}}>{(()=>{
                  const {last, best} = getStats(ex);
                  return (
                    <>
                      <p style={{fontSize:12}}>
                        Último: {last ? `${last.weight||"-"}kg ${last.reps?`x ${last.reps}`:""}` : "-"}
                      </p>
                      {best && last && last.weight && Number(last.weight) >= Number(best.weight) && (
                        <p style={{color:"#00ff88", fontSize:12}}>🔥 PR!</p>
                      )}
                    </>
                  );
                })()}</p>
                )}

                <a href={`https://www.youtube.com/results?search_query=${ex}`} target="_blank" style={{color:"#00ff88",fontSize:12}}>
                  ▶ Ver execução
                </a>

                {/* musculação normal */}
                {!ex.includes("Abdominal") && ex !== "Prancha" && !ex.includes("min") && (
                  <>
                    <input placeholder="kg" onChange={e=>handleChange(ex,"weight",e.target.value)}/>
                    <input placeholder="reps" onChange={e=>handleChange(ex,"reps",e.target.value)}/>
                  </>
                )}

                {/* prancha com tempo */}
                {ex === "Prancha" && (
                  <input placeholder="tempo (segundos)" onChange={e=>handleChange(ex,"time",e.target.value)}/>
                )}

                <button onClick={()=>setTimer(90)}>⏱️ Descanso</button>
                <p>{timer>0?`Descanso: ${timer}s`:""}</p>

                <button onClick={()=>handleChange(ex,"done",true)}>✔️ Concluir</button>
              </div>
            ) : null
          ))}

          <button onClick={saveWorkout} style={{padding:15,background:"#00ff88"}}>Finalizar</button>
        </div>
      )}

      {tab==="todos" && (
        <div>
          <h2 style={{textAlign:"center", marginBottom:20}}>📚 Todos os Treinos</h2>

          {[...Object.keys(workouts), "Abdomen"].map(day => (
            <div key={day} style={{marginBottom:25}}>
              <h3 style={{color:"#00ff88", marginBottom:10}}>{day}</h3>

              <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10}}>
                {(day === "Abdomen" ? absList : workouts[day]).map(ex => (
                  <div key={ex} style={{
                    background:"#111",
                    border:"1px solid #333",
                    borderRadius:12,
                    padding:10,
                    display:"flex",
                    justifyContent:"space-between",
                    alignItems:"center"
                  }}>
                    <span style={{fontSize:13}}>{ex}</span>

                    <a href={`https://www.youtube.com/results?search_query=${ex}`} target="_blank" style={{background:"#00ff88",color:"black",padding:"5px 8px",borderRadius:8,fontSize:12,textDecoration:"none"}}>
                      ▶
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
