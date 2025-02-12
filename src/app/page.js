"use client";
import AllMeals from "@/MealsComponents/AllMeals";
import AllOtherWeeks from "@/MealsComponents/AllOtherWeeks";
import WeekSelectionModal from "@/MealsComponents/WeekSelectionModal";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function Home() {
  const weeks = ["All Meals", "Week 1", "Week 2", "Week 3", "Week 4"];
const [active,setActive]=useState(false);
const [selectedWeek, setSelectedWeek] = useState("All Meals");
const [meals,setMeals]=useState([])
const [selectedMealsByWeek, setSelectedMealsByWeek] = useState({});
const [showModal, setShowModal] = useState(false); 
const [selectedMeals, setSelectedMeals] = useState([]); 
const [mealToAdd, setMealToAdd] = useState(null); 
const [sidebarOpen, setSidebarOpen] = useState(false);
useEffect(() => {
  const storedData = localStorage.getItem("selectedMealsByWeek");
  if (storedData) {
    setSelectedMealsByWeek(JSON.parse(storedData));
  }
  const fetchMeals = async () => {
    try {
      const response = await fetch('https://dummyjson.com/recipes');
      const data = await response.json();
      setMeals(data.recipes);
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
  };
  fetchMeals();
}, []);

useEffect(() => {
  localStorage.setItem("selectedMealsByWeek", JSON.stringify(selectedMealsByWeek));
}, [selectedMealsByWeek]);
const handleMealSelection = (meal) => {
  setSelectedMeals((prevSelected) =>
    prevSelected.some((m) => m.id === meal.id)
      ? prevSelected.filter((m) => m.id !== meal.id) 
      : [...prevSelected, meal] 
  );
};
const handleSaveWeek = (week) => {
  setSelectedMealsByWeek((prev) => {
    const weekMeals = prev[week] || [];
    const newMeals = selectedMeals.filter(
      (meal) => !weekMeals.find((m) => m.id === meal.id)
    );

    return {
      ...prev,
      [week]: [...weekMeals, ...newMeals],
    };
  });

  setShowModal(false);
  setSelectedMeals([]); 
};


const handleDeleteMeal = (week, mealId) => {
  setSelectedMealsByWeek((prev) => ({
    ...prev,
    [week]: prev[week].filter((meal) => meal.id !== mealId),
  }));
};
console.log(meals)
console.log(selectedMeals,"selected meals")
console.log(selectedMealsByWeek,"selectedMealsByWeek")
  return (
    <>
<div className="singlepageheader" >
  <div className="headertext-wrap">
    <h1>
      Optimized Your Meal
    </h1>
    <p>Select Meal to Add in Week You will be able to edit.Modify and change the Meal Weeks</p>
  </div>
</div>
  <div className="container py-4">
<div className="row">
  <h3>Week Orders</h3>

</div>

  </div>

    <div className=" nav-bg-week-menu">
<div className="container">
  <div className=" row align-items-center link-items">
  {weeks.map((week, index) => (  
     <div className="col-2 d-flex justify-content-center" key={index}>  <Link className={`nav-link tabs ${selectedWeek === week ? "active" : ""}`}
     onClick={() => setSelectedWeek(week)} href="#">{week}</Link></div>
  ))}

<div className="col-2 "><Link className="nav-link" href="#">              <button className="work-btn" onClick={() => setShowModal(true)}  disabled={selectedMeals.length === 0}>
Add to work</button></Link></div>
  </div>


</div>

  </div>
  <div className="mobile-add-btn">
        <button className="work-btn" onClick={() => setShowModal(true)} disabled={selectedMeals.length === 0}>
          Add to Week
        </button>
      </div>

      {/* Mobile Sidebar Toggle */}
      <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>☰ Menu</button>
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <button className="close-sidebar" onClick={() => setSidebarOpen(false)}>✕</button>
        {weeks.map((week, index) => (
          <Link key={index} className={`nav-link ${selectedWeek === week ? "active" : ""}`} onClick={() => setSelectedWeek(week)} href="#">
            {week}
          </Link>
        ))}
      </div>
  <div className="container py-3">
        {selectedWeek === "All Meals" ? (
          <AllMeals mealsdata={meals} selectedMeals={selectedMeals} onSelectMeal={handleMealSelection} />
        ) : (
          <AllOtherWeeks week={selectedWeek} meals={selectedMealsByWeek[selectedWeek]  || [] }  onDeleteMeal={handleDeleteMeal} />
        )}

        {showModal && <WeekSelectionModal onSave={handleSaveWeek} />}
      </div>
  </>
  );
}
