import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const workouts = {
  Push: ["Supino Reto Máquina","Supino Inclinado Máquina","Peck Deck","Crossover Polia Alta","Crossover Polia Baixa","Desenvolvimento Ombro Máquina","Elevação Lateral Polia","Posterior Ombro Polia","Tríceps Testa Polia","Tríceps Corda","Tríceps Francês Polia"],
  Pull: ["Puxada Frontal","Puxada Pegada Fechada","Remada Máquina","Remada Baixa Triângulo","Pulldown Braço Estendido","Face Pull","Rosca Direta Barra W","Rosca Scott","Rosca Martelo","Rosca Polia"],
  Legs: ["Agachamento","Leg Press","Cadeira Extensora","Mesa Flexora","Leg Curl em Pé","Elevação Pélvica","Abdutora","Adutora","Panturrilha"]
};

const foodDB = {
  "arroz": { cal: 130, protein: 2 },
  "feijao": { cal: 120, protein: 8 },
  "frango": { cal: 165, protein: 31 },
  "ovo": { cal: 70, protein: 6 },
  "hamburguer": { cal: 250, protein: 20 }
};

export default function App() {
  const today = new Date().toISOString().split("T")[0];

  const [checkins, setCheckins] = useState(() => JSON.parse(localStorage.getItem("checkins")) || []);
  const [logs, setLogs] = useState(() => JSON.parse(localStorage.getItem("logs")) || {});
  const [dailyLogs, setDailyLogs] = useState(() => JSON.parse(localStorage.getItem("dailyLogs")) || {});
  const [foodLog, setFoodLog] = useState(() => JSON.parse(localStorage.getItem("food")) || []);
  const [tab, setTab] = useState("dashboard");
  const [selectedDay, setSelectedDay] = useState("Push");
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    localStorage.setItem("checkins", JSON.stringify(checkins));
    localStorage.setItem("logs", JSON.stringify(logs));
    localStorage.setItem("dailyLogs", JSON.stringify(dailyLogs));
    localStorage.setItem("food", JSON.stringify(foodLog));
  }, [checkins, logs, dailyLogs, foodLog]);

  const handleCheckin = () => {
    if (!checkins.includes(today)) setCheckins([...checkins, today]);
  };

  const handleLog = (exercise, weight, reps) => {
    const entry = { exercise, weight, reps };

    setDailyLogs({
      ...dailyLogs,
      [today]: [...(dailyLogs[today] || []), entry]
    });

    setLogs({
      ...logs,
      [exercise]: [...(logs[exercise] || []), { weight: Number(weight), date: today }]
    });
  };

  const addFood = (name) => {
    const food = foodDB[name.toLowerCase()];
    if (!food) return;
    setFoodLog([...foodLog, { name, ...food }]);
  };

  const totalCalories = foodLog.reduce((acc, f) => acc + f.cal, 0);
  const totalProtein = foodLog.reduce((acc, f) => acc + f.protein, 0);

  const streak = checkins.length;

  return (
    <div className="min-h-screen bg-black text-white p-4 space-y-4">
      <h1 className="text-3xl text-center font-bold">🔥 GOD MODE</h1>

      <div className="flex justify-around">
        <Button onClick={()=>setTab("dashboard")}>Home</Button>
        <Button onClick={()=>setTab("treino")}>Treino</Button>
        <Button onClick={()=>setTab("dieta")}>Dieta</Button>
      </div>

      {tab === "dashboard" && (
        <div className="space-y-4">
          <Card className="bg-gray-800">
            <CardContent className="p-4 text-center">
              <Button onClick={handleCheckin}>Check-in</Button>
              <p>Dias: {checkins.length}</p>
              <p>🔥 Streak: {streak}</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800">
            <CardContent className="p-4">
              <h2>📅 Calendário</h2>
              <div className="flex flex-wrap gap-2">
                {checkins.map((d,i)=>(
                  <span key={i} className="bg-green-500 px-2 py-1 rounded cursor-pointer" onClick={()=>setSelectedDate(d)}>{d}</span>
                ))}
              </div>

              {selectedDate && (
                <div className="mt-3">
                  <h3>Treino do dia:</h3>
                  {(dailyLogs[selectedDate]||[]).map((l,i)=>(
                    <p key={i}>{l.exercise} - {l.weight}kg x {l.reps}</p>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-gray-800">
            <CardContent className="p-4">
              <h2>🍽️ Hoje</h2>
              <p>{totalCalories} kcal</p>
              <p>{totalProtein}g proteína</p>
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "treino" && (
        <div className="space-y-3">
          {Object.keys(workouts).map(day=>(
            <Button key={day} onClick={()=>setSelectedDay(day)}>{day}</Button>
          ))}

          {workouts[selectedDay].map(ex=>(
            <Card key={ex} className="bg-gray-800">
              <CardContent className="p-3 space-y-2">
                <b>{ex}</b>

                <a href={`https://www.youtube.com/results?search_query=${ex}`} target="_blank">
                  <Button>Ver execução (YouTube)</Button>
                </a>

                <Input placeholder="kg" id={ex+"w"}/>
                <Input placeholder="reps" id={ex+"r"}/>

                <Button onClick={()=>handleLog(ex, document.getElementById(ex+"w").value, document.getElementById(ex+"r").value)}>Salvar</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "dieta" && (
        <Card className="bg-gray-800">
          <CardContent className="p-4 space-y-2">
            <h2>Dieta Inteligente</h2>
            <Input placeholder="Digite: arroz, feijao, frango..." id="food"/>
            <Button onClick={()=>addFood(document.getElementById("food").value)}>Adicionar</Button>

            <div>
              {foodLog.map((f,i)=>(
                <p key={i}>{f.name} - {f.cal} kcal - {f.protein}g proteína</p>
              ))}
            </div>

            <p>Total: {totalCalories} kcal</p>
            <p>Proteína: {totalProtein}g</p>

            <div className="mt-3">
              <h3>Sugestão:</h3>
              <p>Baseado no que você gosta: arroz + feijão + frango + ovo</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
