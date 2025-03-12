import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Page404 } from "./pages/Page404";
import { Contest } from "./pages/Contest";
import { CreateContest } from "./pages/CreateContest";
import { ClaimingCountry } from "./pages/ClaimingCountry";
import { SendSong } from "./pages/SendSong";
import { Voting } from "./pages/Voting";
import { Results } from "./pages/Results";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='*' element={<Page404/>}/>
        <Route path='/:id' element={<Contest/>}/>
        <Route path='/dodaj-konkurs' element={<CreateContest/>}/>
        <Route path='/:id/:id2/rezerwacja-panstw' element={<ClaimingCountry/>}/>
        <Route path='/:id/:id2/zglaszanie-piosenki' element={<SendSong/>}/>
        <Route path='/:id/:id2/glosowanie' element={<Voting/>}/>
        <Route path='/:id/:id2/wyniki/:id3' element={<Results/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
