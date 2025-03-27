import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Page404 } from "./pages/Page404";
import { LoginPage } from "./pages/LoginPage";
import { Rejestration } from "./pages/Rejestration";
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
        <Route path='/logowanie' element={<LoginPage/>}/>
        <Route path='/rejestracja' element={<Rejestration/>}/>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path='*' element={<Page404/>}/>
          <Route path='/konkursy/:id' element={<Contest/>}/>
          <Route path='/dodaj-konkurs' element={<CreateContest/>}/>
          <Route path='/konkursy/:id/:id2/rezerwacja-panstw' element={<ClaimingCountry/>}/>
          <Route path='/konkursy/:id/:id2/zglaszanie-piosenki' element={<SendSong/>}/>
          <Route path='/konkursy/:id/:id2/glosowanie' element={<Voting/>}/>
          <Route path='/konkursy/:id/:id2/wyniki/:id3' element={<Results/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
