import { FC } from "react";
import { DocumentIcon } from "@heroicons/react/24/outline";

interface IFileProps {
  name: string;
}

export const File: FC<IFileProps> = ({ name }) => {
  return (
    <div className="w-full cursor-pointer group text-center border border-gray-300 rounded-lg p-2">
      <DocumentIcon className="text-blue-500 duration-300 group-hover:scale-110" />
      <p className="text-xs mt-1 truncate">{name}</p>
    </div>
  );
};
