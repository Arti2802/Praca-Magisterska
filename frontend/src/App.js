import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Page404 } from "./pages/Page404";
import { ContestInvitation } from "./pages/ContestInvitation";
import { ProtectedPage } from "./pages/ProtectedPage";
import { LoginPage } from "./pages/LoginPage";
import { Rejestration } from "./pages/Rejestration";
import { Contests } from "./pages/Contests";
import { Contest } from "./pages/Contest";
import { NewEdition } from "./pages/NewEdition";
import { ContestSettings } from "./pages/ContestSettings";
import { Invitation } from "./pages/Invitation";
import { Users } from "./pages/Users";
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
import { Phases } from "./pages/Phases";
import { NewSemifinal } from "./pages/NewSemifinal";
import { SetCountriesInEdition } from "./pages/SetCountriesInEdition";
import { Applications } from "./pages/Applications";
import { SetSemifinals } from "./pages/SetSemifinals";
import { SetRunningOrder } from "./pages/SetRunningOrder";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
    <div><Toaster/></div>
      <Routes>
        <Route path='/logowanie' element={<LoginPage/>}/>
        <Route path='/rejestracja' element={<Rejestration/>}/>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path='*' element={<Page404/>}/>
          <Route path='/zaproszenie/:key' element={<ProtectedPage><ContestInvitation/></ProtectedPage>}/>
          <Route path='/konkursy' element={<ProtectedPage><Contests/></ProtectedPage>}/>
          <Route path='/konkursy/:id' element={<ProtectedPage><Contest/></ProtectedPage>}/>
          <Route path='/konkursy/:id/nowa-edycja' element={<ProtectedPage><NewEdition/></ProtectedPage>}/>
          <Route path='/konkursy/:id/ustawienia' element={<ProtectedPage><ContestSettings/></ProtectedPage>}/>
          <Route path='/konkursy/:id/zaproszenie' element={<ProtectedPage><Invitation/></ProtectedPage>}/>
          <Route path='/konkursy/:id/czlonkowie' element={<ProtectedPage><Users/></ProtectedPage>}/>
          <Route path='/dodaj-konkurs' element={<ProtectedPage><CreateContest/></ProtectedPage>}/>
          <Route path='/konkursy/:id/:id2/rezerwacja-panstw' element={<ProtectedPage><ClaimingCountry/></ProtectedPage>}/>
          <Route path='/konkursy/:id/:id2/zglaszanie-piosenki' element={<ProtectedPage><SendSong/></ProtectedPage>}/>
          <Route path='/konkursy/:id/:id2/glosowanie' element={<ProtectedPage><ChoosePhase/></ProtectedPage>}/>
          <Route path='/konkursy/:id/:id2/glosowanie/:id3' element={<ProtectedPage><Voting/></ProtectedPage>}/>
          <Route path='/konkursy/:id/:id2/wyniki/:id3' element={<ProtectedPage><Results/></ProtectedPage>}/>
          <Route path='/konkursy/:id/:id2/informacje' element={<ProtectedPage><EditionInfo/></ProtectedPage>}/>
          <Route path='/konkursy/:id/:id2/piosenki' element={<ProtectedPage><Entries/></ProtectedPage>}/>
          <Route path='/konkursy/:id/:id2/panstwa' element={<ProtectedPage><Countries/></ProtectedPage>}/>
          <Route path='/konkursy/:id/:id2/kolejnosc-wystepow' element={<ProtectedPage><RunningOrder/></ProtectedPage>}/>
          <Route path='/konkursy/:id/:id2/edytuj' element={<ProtectedPage><EditEdition/></ProtectedPage>}/>
          <Route path='/konkursy/:id/:id2/etapy' element={<ProtectedPage><Phases/></ProtectedPage>}/>
          <Route path='/konkursy/:id/:id2/nowy-polfinal' element={<ProtectedPage><NewSemifinal/></ProtectedPage>}/>
          <Route path='/konkursy/:id/:id2/wybierz-panstwa' element={<ProtectedPage><SetCountriesInEdition/></ProtectedPage>}/>
          <Route path='/konkursy/:id/:id2/zgloszenia' element={<ProtectedPage><Applications/></ProtectedPage>}/>
          <Route path='/konkursy/:id/:id2/ustal-polfinaly' element={<ProtectedPage><SetSemifinals/></ProtectedPage>}/>
          <Route path='/konkursy/:id/:id2/ustal-kolejnosc-wystepow' element={<ProtectedPage><SetRunningOrder/></ProtectedPage>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
