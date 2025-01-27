import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Contest } from "./pages/Contest";
import { CreateContest } from "./pages/CreateContest";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/:id' element={<Contest/>}/>
        <Route path='/dodaj-konkurs' element={<CreateContest/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
