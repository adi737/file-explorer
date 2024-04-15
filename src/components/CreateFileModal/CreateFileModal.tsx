import { FC, useContext, useRef } from "react";
import { FilesContext } from "../../context/FilesContext";
import { addItemToFolder, renameItem } from "../../actions/filesActions";
import { useLocation } from "react-router-dom";

export const CreateFileModal: FC = () => {
  const {
    showModal,
    setShowModal,
    modalType,
    filesData,
    setFilesData,
    renamedItem,
  } = useContext(FilesContext)!;
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();

  const pathNameArr = location.pathname.split("/");

  const containsSpecialCharacters = (inputString: string) => {
    const specialCharactersRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

    return specialCharactersRegex.test(inputString);
  };

  const handleClose = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (e.target === e.currentTarget) setShowModal(false);
  };

  const createFileOrFolder = () => {
    if (!inputRef.current) return;
    if (!inputRef.current.files?.[0] && !inputRef.current.value)
      return alert("Provide some value.");

    if (modalType === "rename") {
      const inputValue = inputRef.current.value;
      if (containsSpecialCharacters(inputValue))
        return alert("Special characters are not allowed!");

      const newFilesData = renameItem(
        filesData,
        renamedItem,
        pathNameArr,
        inputValue
      );
      if (!newFilesData) return;

      setFilesData(newFilesData);
      setShowModal(false);
      inputRef.current.value = "";

      return;
    }

    if (inputRef.current.files?.[0]) {
      const file = inputRef.current.files[0];

      const newItem = {
        id: Date.now(),
        name: file.name,
        type: file.type,
      };

      const newFilesData = addItemToFolder(filesData, newItem, pathNameArr);

      if (!newFilesData) return;

      setFilesData(newFilesData);
      setShowModal(false);
      inputRef.current.value = "";

      return;
    }

    if (inputRef.current.value) {
      const inputValue = inputRef.current.value;

      if (containsSpecialCharacters(inputValue))
        return alert("Special characters are not allowed!");

      const folderName = inputValue.replace(/ /g, "-");

      const newItem = {
        id: Date.now(),
        name: folderName,
        type: "folder",
        children: [],
      };

      const newFilesData = addItemToFolder(filesData, newItem, pathNameArr);

      if (!newFilesData) return;

      setFilesData(newFilesData);
      setShowModal(false);
      inputRef.current.value = "";

      return;
    }
  };

  return (
    <div
      data-testid="StepModal"
      className={`fixed inset-0 z-10 bg-black bg-opacity-50 p-4 duration-300 ${
        showModal ? "visible opacity-100" : "invisible opacity-0"
      }`}
      onMouseDown={handleClose}
      role="presentation"
    >
      <div className="w-full max-w-xl relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[90vh] overflow-y-auto rounded-md bg-white p-10 shadow-lg">
        <p className="text-lg mb-8">
          {modalType === "rename" ? "Rename item" : `Create ${modalType}`}
        </p>
        {modalType === "file" ? (
          <>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="file_input"
            >
              Upload file
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 focus:outline-none"
              id="file_input"
              type="file"
              ref={inputRef}
            />
          </>
        ) : (
          <div className="relative">
            <input
              placeholder=""
              className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
              ref={inputRef}
            />
            <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Name
            </label>
          </div>
        )}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          >
            Cancel
          </button>
          <button
            onClick={createFileOrFolder}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
