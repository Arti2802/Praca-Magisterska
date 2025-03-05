import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Contest } from "./pages/Contest";
import { CreateContest } from "./pages/CreateContest";
import { ClaimingCountry } from "./pages/ClaimingCountry";
import { SendSong } from "./pages/SendSong";
import { Voting } from "./pages/Voting";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/:id' element={<Contest/>}/>
        <Route path='/dodaj-konkurs' element={<CreateContest/>}/>
        <Route path='/:id/rezerwacja-panstw' element={<ClaimingCountry/>}/>
        <Route path='/:id/zglaszanie-piosenki' element={<SendSong/>}/>
        <Route path='/:id/glosowanie' element={<Voting/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
