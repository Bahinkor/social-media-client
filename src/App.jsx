import {useRoutes} from "react-router-dom";
import routes from "./routes.jsx";
import "./App.css";

function App() {
    const router = useRoutes(routes);

    return (
        <>
            {router}
        </>
    )
}

export default App;