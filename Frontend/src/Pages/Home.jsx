import React from "react";
import { Link } from "react-router-dom";
function Home() {
    return (
        <div className="w-4/5 mx-auto flex gap-6 justify-center items-center h-full">
            <div>
                <h1 className="text-3xl font-semibold tracking-wider place-items-center leading-relaxed">
                    Legal clarity at your fingertips <br />
                    —analyze, summarize.
                </h1>
                <p className="text-md mt-2 leading-relaxed text-justify">
                    Legal documents can be confusing with complex terms and long
                    clauses. Our AI-powered platform makes it easy to upload,
                    summarize, and analyze them, helping you understand key
                    points effortlessly.
                </p>
                <button className="mt-8">
                    <Link
                        to="/upload-legal-doc"
                        className="mt-4 hover:opacity-90 bg-custom-orange text-white px-4 py-2 rounded-md"
                    >
                        Upload Document
                    </Link>
                </button>
            </div>
            <img src="/freepik__upload__92833.png" className="h-[550px]" />
        </div>
    );
}

export default Home;
