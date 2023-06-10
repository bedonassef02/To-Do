import LoginPage from "./login-page/LoginPage";
import Navbar from "./navbar/Navbar";
import {Outlet} from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Navbar/>
            <Outlet/>
        </div>
    );
}

export default App;
