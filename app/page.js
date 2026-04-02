"use client";
import { useState, useEffect } from "react";

const split = ["Rest","Push","Pull","Legs","Upper","Lower","Rest"];

const workouts = {
  Push: ["Supino Reto Máquina","Supino Inclinado Máquina","Peck Deck","Crossover Polia Alta","Crossover Polia Baixa","Desenvolvimento Ombro Máquina","Elevação Lateral Polia","Posterior Ombro Polia","Tríceps Testa Polia","Tríceps Corda","Tríceps Francês Polia"],
  Pull: ["Puxada Frontal","Puxada Pegada Fechada","Remada Máquina","Remada Baixa Triângulo","Pulldown Braço Estendido","Face Pull","Rosca Direta Barra W","Rosca Scott","Rosca Martelo","Rosca Polia"],
  Legs: ["Agachamento","Leg Press 45º","Cadeira Extensora","Mesa Flexora","Leg Curl em Pé","Elevação Pélvica","Abdutora","Adutora","Panturrilha"],
  Upper: ["Supino Inclinado Máquina","Crossover Polia Alta","Puxada Frontal","Remada Máquina","Elevação Lateral Polia","Posterior Ombro Polia","Tríceps Corda","Rosca Direta Barra W"],
  Lower: ["Agachamento","Leg Press 45º","Mesa Flexora","Stiff","Elevação Pélvica","Panturrilha","Abdutora"]
};

const absList = ["Abdominal Máquina","Abdominal Supra","Abdominal Infra","Prancha"];

const cardioMap = {
  Push: "Esteira 20min",
  Pull: "Bike 20min",
  Upper: "Esteira 20min",
  Lower: "Bike 20min"
};

export default function App(){
  const today = new Date();
  const dateStr = today.toISOString().split("T")[0];
  const todayWorkout = split[today.getDay()];

  const [tab,setTab]=useState("home");
  const [checkins,setCheckins]=useState([]);
  const [logs,setLogs]=useState({});
  const [exerciseState,setExerciseState]=useState({});
  const [activeWorkout,setActiveWorkout]=useState(null);
  const [timers,setTimers]=useState({});

  useEffect(()=>{
    setCheckins(JSON.parse(localStorage.getItem("checkins"))||[]);
    setLogs(JSON.parse(localStorage.getItem("logs"))||{});
  },[]);

  useEffect(()=>{
    localStorage.setItem("checkins",JSON.stringify(checkins));
    localStorage.setItem("logs",JSON.stringify(logs));
  },[checkins,logs]);

  useEffect(()=>{
    const interval = setInterval(()=>{
      setTimers(prev=>{
        const updated={...prev};
        Object.keys(updated).forEach(k=>{
          if(updated[k]>0) updated[k]--;
        });
        return updated;
      });
    },1000);
    return ()=>clearInterval(interval);
  },[]);

  const startWorkout=(type)=>{
    setActiveWorkout(type);
    if(!checkins.includes(dateStr)) setCheckins([...checkins,dateStr]);
    setTab("treino");
  };

  const workoutToUse = activeWorkout || todayWorkout;

  const handleChange=(ex,field,val)=>{
    setExerciseState(prev=>({
      ...prev,
      [ex]:{...prev[ex],[field]:val}
    }));
  };

  const toggleCheck=(ex)=>{
    setExerciseState(prev=>({
      ...prev,
      [ex]:{...prev[ex], done: !prev[ex]?.done}
    }));
  };

  const saveWorkout=()=>{
    setLogs(prev=>({
      ...prev,
      [dateStr]:{
        workout: workoutToUse,
        data: exerciseState
      }
    }));
    setExerciseState({});
    setActiveWorkout(null);
    setTab("home");
  };

  const getLast=(ex)=>{
    const entries=Object.values(logs);
    for(let i=entries.length-1;i>=0;i--){
      if(entries[i].data?.[ex]) return entries[i].data[ex];
    }
    return null;
  };

  const fullWorkout = () => {
    let base = workouts[workoutToUse] || [];
    if(["Push","Pull","Upper","Lower"].includes(workoutToUse)){
      base=[...base,...absList];
    }
    if(cardioMap[workoutToUse]) base=[...base,cardioMap[workoutToUse]];
    return base;
  };

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

          <button onClick={()=>startWorkout(todayWorkout)} style={{padding:15,background:"#00ff88"}}>
            Começar treino do dia
          </button>

          <h3 style={{marginTop:20}}>Escolher outro treino:</h3>
          {Object.keys(workouts).map(w=>(
            <button key={w} onClick={()=>startWorkout(w)} style={{display:"block",margin:5,width:"100%"}}>{w}</button>
          ))}

          <h3>📅 Histórico</h3>
          {Object.entries(logs).map(([date,val])=>(
            <div key={date}>
              <b>{date}</b> - {val.workout}
            </div>
          ))}
        </div>
      )}

      {tab==="treino" && (
        <div>
          <h2>{workoutToUse}</h2>

          {fullWorkout().map(ex=>{
            const last=getLast(ex);
            return (
              <div key={ex} style={{border:"1px solid #333",margin:10,padding:10,borderRadius:10}}>
                <b>{ex}</b>

                {last && <p>Último: {last.weight||"-"}kg {last.reps?`x ${last.reps}`:""}</p>}

                <a href={`https://www.youtube.com/results?search_query=${ex}`} target="_blank" style={{color:"#00ff88"}}>
                  ▶ Ver execução
                </a>

                {!ex.includes("Abdominal") && ex!=="Prancha" && !ex.includes("min") && (
                  <>
                    <input placeholder="kg" onChange={e=>handleChange(ex,"weight",e.target.value)} />
                    <input placeholder="reps" onChange={e=>handleChange(ex,"reps",e.target.value)} />
                  </>
                )}

                {ex==="Prancha" && (
                  <input placeholder="tempo (s)" onChange={e=>handleChange(ex,"time",e.target.value)} />
                )}

                <button onClick={()=>setTimers(prev=>({...prev,[ex]:90}))}>⏱️</button>
                <span>{timers[ex]||0}s</span>

                <button onClick={()=>toggleCheck(ex)}>
                  {exerciseState[ex]?.done ? "✅" : "⬜"}
                </button>
              </div>
            );
          })}

          <button onClick={saveWorkout} style={{padding:15,background:"#00ff88"}}>Finalizar treino</button>
        </div>
      )}

      {tab==="todos" && (
        <div>
          <h2 style={{textAlign:"center"}}>📚 Todos os Treinos</h2>

          {[...Object.keys(workouts),"Abdomen"].map(day=> (
            <div key={day} style={{marginBottom:20}}>
              <h3 style={{color:"#00ff88"}}>{day}</h3>

              {(day==="Abdomen"?absList:workouts[day]).map(ex=> (
                <div key={ex} style={{display:"flex",justifyContent:"space-between",padding:8,borderBottom:"1px solid #222"}}>
                  <span>{ex}</span>
                  <a href={`https://www.youtube.com/results?search_query=${ex}`} target="_blank">▶</a>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
