import "./App.css";
import Form from "./Form";
import DataPage from "./DataPage";

import { Routes, Route, Router } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
    <Route path="/" element={<Form />} />
    <Route path="/view" element={<DataPage/>}></Route>

      </Routes>
    </div>
  )
}

export default App;
