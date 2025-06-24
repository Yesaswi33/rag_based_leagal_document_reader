import { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineFileUpload } from "react-icons/md";

const FileDropzone = ({ files, setFiles, onSubmit }) => {
    const onDrop = (acceptedFiles) => {
        const newFiles = acceptedFiles.map((file) =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
        );
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };

    const handleRemove = (event, filename) => {
        event.stopPropagation(); // Prevent event bubbling
        setFiles((prevFiles) =>
            prevFiles.filter((file) => file.name !== filename)
        );
    };

    // Cleanup to revoke object URLs (Avoid memory leaks)
    useEffect(() => {
        return () => {
            files.forEach((file) => URL.revokeObjectURL(file.preview));
        };
    }, [files]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".png", ".jpg", ".jpeg", ".gif"],
            "application/pdf": [".pdf"],
        },
    });

    return (
        <div className="flex flex-col items-center gap-4">
            <div
                {...getRootProps()}
                className={`h-[250px] flex flex-col border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition w-[800px] ${
                    isDragActive
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 bg-gray-100"
                }`}
            >
                <input {...getInputProps()} />
                <p className="text-gray-700">
                    Drag & drop some files here, or click to select files
                </p>
                {files.length > 0 ? (
                    <div className="mt-4 flex items-center justify-center gap-4">
                        {files.map((file) => (
                            <div
                                key={file.name}
                                className="border-2 rounded-md p-2 flex items-center gap-2"
                            >
                                {file.type.startsWith("image") && (
                                    <img
                                        src={file.preview}
                                        alt={file.name}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                )}
                                <p className="text-gray-600">{file.name}</p>
                                <button
                                    onClick={(event) =>
                                        handleRemove(event, file.name)
                                    }
                                    className="ml-auto text-gray-700 px-2 py-1 rounded transition"
                                    aria-label="Remove file"
                                >
                                    <RxCross2 />
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex items-center justify-center mt-8 text-gray-300">
                        <MdOutlineFileUpload style={{ "fontSize": "100px" }} />
                    </div>
                )}
            </div>

            {/* Submit Button */}
            <button
                onClick={onSubmit}
                className={`mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition ${
                    files.length === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={files.length === 0} // Disable button if no files
            >
                Submit Files
            </button>
        </div>
    );
};

export default FileDropzone;
