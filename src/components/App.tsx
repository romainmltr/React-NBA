import Filter from "./FilterComponent";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

function App() {

    const user = useContext(AuthContext);
    
    if (user.isLogged) {
        return (
            <div className="App">
                <Filter />
            </div>
        )
    }
    if (!user) return (
        <div className="App text-center">
            <h1 className="mb-10">Not logged</h1>

            <a href="/" className="text-white">
                <button>Go to login page</button>
            </a>
        </div>
    )
}

export default App
