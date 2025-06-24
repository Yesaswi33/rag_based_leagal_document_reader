import React from "react";

function FormInput({type="text",value,labelName,name,handleChanges}) {
    return (
        <div className="mb-3">
            <label
                htmlFor={name}
                className="block mb-2 text-sm font-medium text-gray-900"
            >
                {labelName}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-gray-500 outline-none block w-full p-2.5"
                onChange={handleChanges}
            />
        </div>
    );
}

export default FormInput;
