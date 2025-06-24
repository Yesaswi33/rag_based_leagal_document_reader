import React, { useState, useRef, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { setFilename } from "../redux/slices/fileSlice";

function Chatbot() {
    const dispatch = useDispatch();
    const filename = useSelector((state) => state.filename.value);
    const [chatHistory, setChatHistory] = useState([]); // Stores requests and responses
    const [message, setMessage] = useState("");
    const textareaRef = useRef(null);
    const chatContainerRef = useRef(null); // Ref for the chat container

    // Auto-grow the textarea
    const handleInput = (event) => {
        const textarea = textareaRef.current;
        textarea.style.height = "auto"; // Reset height
        textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`; // Max height: 200px
        setMessage(event.target.value);
    };

    // Scroll to the latest message whenever chatHistory updates
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]); // Runs every time chatHistory changes

    // Handle the remove uploaded document action
    const handleRemove = () => {
        dispatch(setFilename("")); // Reset the filename in Redux store
    };

    // Handle the submit action
    const handleSubmit = async () => {
        if (!message.trim()) {
            alert("Please enter a question.");
            return;
        }

        // Store the user's request first
        const newChatHistory = [
            ...chatHistory,
            { text: message, type: "user" },
        ];
        setChatHistory(newChatHistory);
        setMessage("");

        try {
            // Send POST request to backend
            const result = await axios.post("http://127.0.0.1:8000/chatbot/", {
                question: message,
            });

            if (result.status === 200) {
                // Append AI response to chat history
                setChatHistory([
                    ...newChatHistory,
                    { text: result.data.answer, type: "bot" },
                ]);
            } else {
                alert("Failed to get an answer from the server.");
            }
        } catch (error) {
            console.error("Error submitting question:", error);
            alert("Error submitting question.");
        }
    };

    return (
        <div className="w-4/5 mx-auto gap-2 flex justify-center h-full p-2">
            {/* Left Section: Uploaded Documents */}
            <div className="w-1/3 bg-gray-50 h-full border-2 rounded-xl p-4">
                <h3 className="text-lg font-medium text-center text-gray-700">
                    Documents Uploaded
                </h3>
                {filename ? (
                    <div className="bg-gray-100 border-2 mt-4 flex justify-between items-center gap-2 py-4 px-4 rounded-xl max-h-48 overflow-y-auto">
                        <div>{filename}</div>
                        <button onClick={handleRemove}>
                            <RxCross2 />
                        </button>
                    </div>
                ) : (
                    <p className="text-center text-gray-500 mt-2">
                        No files uploaded.
                    </p>
                )}
            </div>

            {/* Right Section: Chat Interface */}
            <div className="flex flex-col flex-1 bg-gray-50 h-[650px] border-2 rounded-xl p-4">
                <div 
                    ref={chatContainerRef} // Reference to the chat container
                    className="flex flex-col flex-1 overflow-y-auto p-2"
                >
                    {/* Render chat history alternately */}
                    {chatHistory.map((chat, index) => (
                        <div
                            key={index}
                            className={`max-w-[70%] p-3 rounded-xl my-1 ${
                                chat.type === "user"
                                    ? "self-end bg-blue-100 text-blue-900" // User messages on the right
                                    : "self-start bg-gray-100 text-gray-700" // AI responses on the left
                            }`}
                        >
                            {chat.text}
                        </div>
                    ))}
                </div>

                {/* Textarea and Send Button */}
                <div className="relative w-full mt-auto">
                    <textarea
                        ref={textareaRef}
                        name="question"
                        id="question"
                        placeholder="Enter your queries regarding the legal document"
                        className="w-full min-h-24 max-h-[200px] p-2 pr-12 border-2 bg-gray-100 rounded-xl resize-none overflow-y-auto"
                        onInput={handleInput}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault(); // Prevents new line
                                handleSubmit(); // Call the submit function
                            }
                        }}
                        value={message}
                    ></textarea>
                    <button
                        onClick={handleSubmit}
                        className="hover:opacity-90 absolute bottom-4 right-2 bg-custom-orange p-2 rounded-full text-white"
                    >
                        <FaArrowRight />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Chatbot;
