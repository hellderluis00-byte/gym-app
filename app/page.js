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

const foodDB = {
  "arroz": { cal: 130, protein: 2 },
  "feijao": { cal: 120, protein: 8 },
  "frango": { cal: 200, protein: 30 },
  "ovo": { cal: 70, protein: 6 },
  "hamburguer": { cal: 250, protein: 20 },
  "macarrao": { cal: 200, protein: 6 },
  "doce": { cal: 150, protein: 2 }
};

export default function App() {
  const today = new Date().toISOString().split("T")[0];

  const [tab, setTab] = useState("home");
  const [checkins, setCheckins] = useState([]);
  const [logs, setLogs] = useState({});
  const [dailyLogs, setDailyLogs] = useState({});
  const [foodLog, setFoodLog] = useState([]);
  const [selectedDay, setSelectedDay] = useState("Push");
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    setCheckins(JSON.parse(localStorage.getItem("checkins")) || []);
    setLogs(JSON.parse(localStorage.getItem("logs")) || {});
    setDailyLogs(JSON.parse(localStorage.getItem("dailyLogs")) || {});
    setFoodLog(JSON.parse(localStorage.getItem("food")) || []);
  }, []);

  useEffect(() => {
    localStorage.setItem("checkins", JSON.stringify(checkins));
    localStorage.setItem("logs", JSON.stringify(logs));
    localStorage.setItem("dailyLogs", JSON.stringify(dailyLogs));
    localStorage.setItem("food", JSON.stringify(foodLog));
  }, [checkins, logs, dailyLogs, foodLog]);

  const checkin = () => {
    if (!checkins.includes(today)) setCheckins([...checkins, today]);
  };

  const saveWorkout = (ex) => {
    const weight = document.getElementById(ex+"w").value;
    const reps = document.getElementById(ex+"r").value;

    setDailyLogs({
      ...dailyLogs,
      [today]: [...(dailyLogs[today] || []), { ex, weight, reps }]
    });

    setLogs({
      ...logs,
      [ex]: [...(logs[ex] || []), { weight, date: today }]
    });
  };

  const addFood = () => {
    const name = document.getElementById("food").value.toLowerCase();
    const food = foodDB[name];
    if (!food) return;
    setFoodLog([...foodLog, { name, ...food }]);
  };

  const totalCalories = foodLog.reduce((a,b)=>a+b.cal,0);
  const totalProtein = foodLog.reduce((a,b)=>a+b.protein,0);

  const proteinGoal = 160;
  const calorieGoal = 2200;

  const streak = checkins.length;

  return (
    <div style={{padding:20, background:"#0f0f0f", color:"white", minHeight:"100vh"}}>

      <h1 style={{textAlign:"center"}}>🔥 GOD FITNESS APP</h1>

      <div style={{display:"flex", justifyContent:"space-around"}}>
        <button onClick={()=>setTab("home")}>Home</button>
        <button onClick={()=>setTab("treino")}>Treino</button>
        <button onClick={()=>setTab("dieta")}>Dieta</button>
      </div>

      {tab==="home" && (
        <div>
          <button onClick={checkin}>Check-in</button>
          <p>🔥 Streak: {streak}</p>

          <h3>📅 Calendário</h3>
          {checkins.map((d,i)=>(
            <div key={i} onClick={()=>setSelectedDate(d)} style={{cursor:"pointer"}}>{d}</div>
          ))}

          {selectedDate && (
            <div>
              <h4>Treino do dia:</h4>
              {(dailyLogs[selectedDate]||[]).map((l,i)=>(
                <div key={i}>{l.ex} - {l.weight}kg x {l.reps}</div>
              ))}
            </div>
          )}

          <h3>📊 Progresso</h3>
          <div>Proteína: {totalProtein}/{proteinGoal}</div>
          <div style={{background:"gray", height:10}}>
            <div style={{width:`${(totalProtein/proteinGoal)*100}%`, background:"green", height:10}}></div>
          </div>

          <div>Calorias: {totalCalories}/{calorieGoal}</div>
          <div style={{background:"gray", height:10}}>
            <div style={{width:`${(totalCalories/calorieGoal)*100}%`, background:"orange", height:10}}></div>
          </div>
        </div>
      )}

      {tab==="treino" && (
        <div>
          {Object.keys(workouts).map(day=>(
            <button key={day} onClick={()=>setSelectedDay(day)}>{day}</button>
          ))}

          {workouts[selectedDay].map(ex=>(
            <div key={ex} style={{border:"1px solid gray", margin:10, padding:10}}>
              <b>{ex}</b>
              <br/>
              <a href={`https://www.youtube.com/results?search_query=${ex}`} target="_blank">Ver execução</a>
              <br/>
              <input id={ex+"w"} placeholder="kg"/>
              <input id={ex+"r"} placeholder="reps"/>
              <button onClick={()=>saveWorkout(ex)}>Salvar</button>
            </div>
          ))}
        </div>
      )}

      {tab==="dieta" && (
        <div>
          <h3>Dieta Inteligente</h3>
          <input id="food" placeholder="arroz, feijao, frango..."/>
          <button onClick={addFood}>Adicionar</button>

          {foodLog.map((f,i)=>(
            <div key={i}>{f.name} - {f.cal} kcal - {f.protein}g proteína</div>
          ))}

          <h4>Total: {totalCalories} kcal</h4>
          <h4>Proteína: {totalProtein}g</h4>

          <h3>Sugestão</h3>
          <p>Baseado no seu gosto: arroz + feijão + frango + ovo + macarrão controlado</p>
        </div>
      )}

    </div>
  );
}
