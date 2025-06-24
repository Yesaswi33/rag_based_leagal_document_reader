import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="sticky z-10 bg-white top-0 py-4 flex justify-between items-center border-b">
            <div className="flex w-4/5 mx-auto justify-between items-center">
                <Link to="/">
                    <h1 className="font-bold text-2xl tracking-wide ">
                        <span className="text-custom-orange">Legal</span>{" "}
                        Assistant
                    </h1>
                </Link>

                <div className="text-slate-800 flex gap-x-12 ">
                    <Link to="/" className="hover:underline">
                        Home
                    </Link>
                    <Link to="/upload-legal-doc" className="hover:underline">
                        Document Upload
                    </Link>
                    <Link to="/chatbot" className="hover:underline">
                        Chatbot
                    </Link>
                    <Link to="/generate-legal-doc" className="hover:underline">
                        Generate Document
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
