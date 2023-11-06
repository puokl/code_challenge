import "./App.css";
import ChallengeList from "./components/ChallengeList";
import Challenge from "./components/Challenge";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<ChallengeList />} />
        <Route path="/challenge/:id" element={<Challenge />} />
      </Route>
    </Routes>
  );
}

export default App;
