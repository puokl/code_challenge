import "./App.css";
import ChallengeList from "./components/ChallengeList";
import Challenge from "./components/Challenge";
// import SolutionSubmission from "./components/SolutionSubmission";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<ChallengeList />} />
        <Route path="/challenge/:id" element={<Challenge />} />
        <Route path="/home" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
