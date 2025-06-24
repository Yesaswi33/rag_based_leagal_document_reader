import { useState } from "react";
import axios from "axios"; // ✅ Import axios

export default function LegalAssistant() {
    const [docContent, setDocContent] = useState("");
    const [docType, setDocType] = useState("Rental Agreement");
    const [previewContent, setPreviewContent] = useState(
        "Generated document will appear here..."
    );
    const [isDownloadVisible, setDownloadVisible] = useState(false);

    const generateDocument = async () => {
        if (docContent.trim() === "") {
            alert("Please enter the purpose of the document...");
            return;
        }

        try {
            const result = await axios.post(
                "http://127.0.0.1:8000/generate-legal-doc",
                {
                    template: docType,
                    clauses: docContent,
                }
            );

            console.log(result);

            // ✅ Fix: Access `result.data.legal_document` instead of `result.legal_document`
            const generatedText = result.data.legal_document
                .replace(/\n/g, "<br>")
                .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                .replace(/\*(.*?)\*/g, "<b>$1</b>");

            setPreviewContent(generatedText);
            setDownloadVisible(true);
        } catch (error) {
            console.error("Error generating document:", error);
            alert("Failed to generate the document. Please try again.");
        }
    };

    const downloadDocument = () => {
        const blob = new Blob([previewContent], { type: "text/html" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "Generated_Document.html";
        link.click();
    };

    return (
        <div className="min-h-screen">
            {/* Document Generator */}
            <div className="bg-white shadow-lg rounded-lg p-6 m-10 text-center">
                <h2 className="text-xl font-bold">Generate a Legal Document</h2>
                <textarea
                    className="w-4/5 p-2 border rounded mt-4"
                    rows="4"
                    placeholder="Enter the purpose of the document..."
                    value={docContent}
                    onChange={(e) => setDocContent(e.target.value)}
                />
                <br />
                <select
                    className="p-2 border rounded"
                    value={docType}
                    onChange={(e) => setDocType(e.target.value)}
                >
                    <option value="Rental Agreement">Rental Agreement</option>
                    <option value="Land Registration">Land Registration</option>
                    <option value="Building Registration">
                        Building Registration
                    </option>
                    <option value="Lease Agreement">Lease Agreement</option>
                </select>
                <button
                    className="bg-green-700 text-white p-2 rounded ml-2"
                    onClick={generateDocument}
                >
                    Generate Document
                </button>
            </div>

            {/* Preview Section */}
            <div className="flex flex-col items-center">
                <h3 className="text-lg font-semibold">Document Preview</h3>
                <div
                    className="w-[595px] h-[842px] border bg-white shadow-lg p-6 overflow-auto mt-2"
                    dangerouslySetInnerHTML={{ __html: previewContent }}
                />
                {isDownloadVisible && (
                    <button
                        className="mt-4 p-3 bg-green-600 text-white rounded"
                        onClick={downloadDocument}
                    >
                        Download Document
                    </button>
                )}
            </div>
        </div>
    );
}
