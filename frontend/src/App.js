import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import UserRegister from './Components/UserRegister/UserRegister';
import UserLogin from './Components/UserLogin/UserLogin';
import AdminPage from './Pages/AdminPage';
import ClientPage from './Pages/ClientPage';
import CreateRestorant from "./Components/RestorantMaster/CreateRestorant"
import ShowRestorant from './Components/RestorantMaster/ShowRestorant';
import UpdateRestorant from './Components/RestorantMaster/UpdateRestorant';
import ShowOutlate from './Components/OutlateMaster/ShowOutlate';
import CreateOutlate from './Components/OutlateMaster/CreateOutlate';
import UpdateOutlate from './Components/OutlateMaster/UpdateOutlate';
import HardWareCall from './Components/ClientDashbord/Client/HardWareCall';
import ShowCalls from './Components/CallsMaster/ShowCalls';
import SystemengineerPage from './Pages/SystemengineerPage';
import CreateNewCall from './Components/CreateNewCall/CreateNewCall';
import ShowNewCall from './Components/CreateNewCall/ShowNewCall';
import UpdateNewCall from './Components/CreateNewCall/UpdateNewCall';
import UpdateSubCategery from './Components/CreateNewCall/UpdateSubCategery';
import UpdateSubSubCategery from './Components/CreateNewCall/UpdateSubSubCategery';
import CreateUserWiseRestOutlet from './Components/UserWiseRestAndOutlet/CreateUserWiseRestOutlet';
import CallShareSupportEngg from './Components/CallsMaster/CallShareSupportEngg';
import CallsShow from './Components/SystemEngineerDashbord/CallsShow/CallsShow';
import SupportEnggMessage from './Components/AdminDashbord/SupportEnggMessage/SupportEnggMessage';
import Client from './Components/ClientDashbord/Client/Client';
import CallStatus from './Components/ClientDashbord/CallStatus/CallStatus';
import CallAcceptfile from './Components/SystemEngineerDashbord/CallAcceptfile/CallAcceptfile';
import CallClose from './Components/ClientDashbord/CallClose/CallClose';
import AdminCallCloseStatus from './Components/AdminDashbord/AdminCallCloseStatus/AdminCallCloseStatus';
import SupportEnggCallStatus from './Components/SystemEngineerDashbord/SupportEnggCallStatus/SupportEnggCallStatus';
import AdminCallClose from './Components/AdminDashbord/AdminCallClose/AdminCallClose';
import ClientCallCloseStatus from './Components/ClientDashbord/ClientCallCloseStatus/ClientCallCloseStatus';
import ClientNavbar from './Components/ClientDashbord/ClientNavbar/ClientNavbar';
import SupportEnggNavbar from "./Components/SystemEngineerDashbord/SupportEnggNavbar/SupportEnggNavbar"
import AllCallsShow from './Components/AdminDashbord/AllCallsShow/AllCallsShow';
import ClientHelpPage from './Components/ClientDashbord/ClientHelpPage/ClientHelpPage';
import HelpButtonShowData from './Components/AdminDashbord/HelpVideo/HelpButtonShowData';
import CreateVideoLink from './Components/AdminDashbord/HelpVideo/CreateVideoLink';
import UpdateVideoData from './Components/AdminDashbord/HelpVideo/UpdateVideoData';
import SuppEngcallhistory from './Components/SystemEngineerDashbord/SuppEngAllCalls/SuppEngAllCalls';
import SuppEngAllCalls from './Components/SystemEngineerDashbord/SuppEngAllCalls/SuppEngAllCalls';




function App() {
  return (
   <>
   
   <BrowserRouter>
   
   <Routes>
    <Route path='/UserRegister' element={<UserRegister/>}/>
    <Route path='/CommanNavbar' element={<Navbar/>}/>
    <Route path='/' element={<UserLogin/>}/>
    <Route path='/AdminPage' element={<AdminPage/>}/>
    <Route path='/ClientPage' element={<ClientPage/>}/>
    <Route path='/SysEnggDashbord' element={<SystemengineerPage/>}/>

    <Route path='/CreateRestorant' element={<CreateRestorant/>}/>
    <Route path='/ShowRestorant' element={<ShowRestorant/>}/>
    <Route path='/UpdateRestorant/:id' element={<UpdateRestorant/>}/>


    <Route path='/ShowOutlate' element={<ShowOutlate/>}/>
    <Route path='/CreateOutlate/:id' element={<CreateOutlate/>}/>
    <Route path='/UpdateOutlate/:id' element={<UpdateOutlate/>}/>
    

    {/* client */}

    <Route path='/HardWareCall' element={<HardWareCall/>}/>
    {/* <Route path='/ClientDashbordHome' element={<ClientDashbordHome/>}/> */}
    <Route path='/Client' element={<Client/>}/>
    <Route path='/CallStatus' element={<CallStatus/>}/>
    <Route path='/CallAccept/:id' element={<CallAcceptfile/>}/>
    <Route path='/CallClose/:id' element={<CallClose/>}/>
    <Route path='/ClinetCallCloseStatus' element={<ClientCallCloseStatus/>}/>
    <Route path='/ClientNavbar' element={<ClientNavbar/>}/>
    <Route path='/ClientHelp' element={<ClientHelpPage/>}/>
    
  


    {/* Admin */}
    <Route path='/ShowCalls' element={<ShowCalls/>}/>
    <Route path='/SupportEnggMessage' element={<SupportEnggMessage/>}/>
    <Route path='/AdminCallClose/:id' element={<AdminCallClose/>}/>
    <Route path='/CallsHistory' element={<AllCallsShow/>}/>
    <Route path='/HelpButtonDataShow' element={<HelpButtonShowData/>}/>
    <Route path='/CreateHelpVideo' element={<CreateVideoLink/>}/>
    <Route path='/UpdateVideoData/:id' element={<UpdateVideoData/>}/>

    


    <Route path='/AdminCallCloseStatus' element={<AdminCallCloseStatus/>}/>



    <Route path='/CreateNewCall' element={<CreateNewCall/>}/>
    <Route path='/ShowNewCall' element={<ShowNewCall/>}/>
    <Route path='/UpdateNewCall/:id' element={<UpdateNewCall/>}/>
    <Route path='/UpdateSubCategery/:id' element={<UpdateSubCategery/>}/>
    <Route path='/UpdateSubSubCategery/:id' element={<UpdateSubSubCategery/>}/>
    <Route path='/CallShareSupportEngg/:id' element={<CallShareSupportEngg/>}/>



    <Route path='/CreateUserWiseRestOutlet' element={<CreateUserWiseRestOutlet/>}/>

{/* Support Eng */}
<Route path='/SuppEngCallsShow' element={<CallsShow/>}/>
<Route path='/SupportEnggCallStatus' element={<SupportEnggCallStatus/>}/>
<Route path='/SupportEnggNavbar' element={<SupportEnggNavbar/>}/>
<Route path='/SuppEnggAllCalls' element={<SuppEngAllCalls/>}/>
    
   </Routes>
   </BrowserRouter>
  
   </>
  );
}

export default App;
