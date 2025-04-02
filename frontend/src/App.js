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
import { ChoosePhase } from "./pages/ChoosePhase";
import { Voting } from "./pages/Voting";
import { Results } from "./pages/Results";
import { EditionInfo } from "./pages/EditionInfo";
import { Entries } from "./pages/Entries";
import { Countries } from "./pages/Countries";
import { RunningOrder } from "./pages/RunningOrder";
import { EditEdition } from "./pages/EditEdition";
import { SetCountriesInEdition } from "./pages/SetCountriesInEdition";
import { Applications } from "./pages/Applications";
import { SetRunningOrder } from "./pages/SetRunningOrder";

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
          <Route path='/konkursy/:id/:id2/glosowanie' element={<ChoosePhase/>}/>
          <Route path='/konkursy/:id/:id2/glosowanie/:id3' element={<Voting/>}/>
          <Route path='/konkursy/:id/:id2/wyniki/:id3' element={<Results/>}/>
          <Route path='/konkursy/:id/:id2/informacje' element={<EditionInfo/>}/>
          <Route path='/konkursy/:id/:id2/piosenki' element={<Entries/>}/>
          <Route path='/konkursy/:id/:id2/panstwa' element={<Countries/>}/>
          <Route path='/konkursy/:id/:id2/kolejnosc-wystepow' element={<RunningOrder/>}/>
          <Route path='/konkursy/:id/:id2/edytuj' element={<EditEdition/>}/>
          <Route path='/konkursy/:id/:id2/wybierz-panstwa' element={<SetCountriesInEdition/>}/>
          <Route path='/konkursy/:id/:id2/zgloszenia' element={<Applications/>}/>
          <Route path='/konkursy/:id/:id2/ustal-kolejnosc-wystepow' element={<SetRunningOrder/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
