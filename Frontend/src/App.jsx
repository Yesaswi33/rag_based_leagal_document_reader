import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Document from "./Pages/Document";
import Chatbot from "./Pages/Chatbot";
import Generate from "./Pages/Generate";
function App() {
    return (
        <Routes>
            <Route paht="/" element={<Layout />}>
                <Route index element={<Home />}/>
                <Route path="/upload-legal-doc" element={<Document/>}/>
                <Route path="/chatbot" element={<Chatbot/>}/>
                <Route path="/generate-legal-doc" element={<Generate />}/>
            </Route>
        </Routes>
    );
}

export default App;
