import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import FileDropzone from "../components/FileDropzone";
import { useNavigate } from "react-router-dom";
import { setFilename } from "../redux/slices/fileSlice";
function Document() {
    const [files, setFiles] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const filename = useSelector((state) => state.filename.value);
    const handleSubmit = async () => {
        if (files.length === 0) {
            alert("No files to upload!");
            return;
        }

        const formData = new FormData();
        files.forEach((file) => {
            formData.append("file", file);
        });

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/upload-legal-doc",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data", // Important for file upload
                    },
                }
            );

            if (response.status === 200) {
                console.log("legal document : ", response.data);
                dispatch(setFilename(response.data.filename));
                navigate("/chatbot");
                setFiles([]); // Clear files after upload
            } else {
                alert("Upload failed!");
            }
        } catch (error) {
            console.error("Error uploading files:", error);
            alert("Error uploading files!");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-semibold mb-6">
                Upload Your Documents
            </h1>
            <FileDropzone
                files={files}
                setFiles={setFiles}
                onSubmit={handleSubmit}
            />
        </div>
    );
}

export default Document;
