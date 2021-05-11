import './App.css'
import React, { useState, useEffect } from "react"
import Team from "./components/Team"

const App = () => {

  const [isLoadingTeams, setIsLoadingTeams] = useState(false);
  const [teams, setTeams] = useState([]);
  const [search, setSearch] = useState("");


  useEffect(() => {
    let mounted = true;
    setIsLoadingTeams(true);

    fetch('api/teams')
      .then(response => response.json())
      .then(data => { if (mounted) setTeams(data); })
      .catch(err => setTeams(null))
      .finally(() => setIsLoadingTeams(false))
    return () => mounted = false;
  }, []);

  return (
    <div className="App">
      <h1>NBA teams - all star voting</h1>
      <input type="text" onChange={(ev) => setSearch(ev.target.value)} />
      {teams && teams.map((team) => <Team key={team.name} team={team} />)}
    </div>
  )
}

export default App
