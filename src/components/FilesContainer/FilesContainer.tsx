import { FC, useContext } from "react";
import { Icon } from "./Icon";
import { FilesContext } from "../../context/FilesContext";
import { useLocation, useNavigate } from "react-router-dom";

export const FilesContainer: FC = () => {
  const { filesData } = useContext(FilesContext)!;
  const navigate = useNavigate();
  const location = useLocation();

  const goToFolder = (name: string, type: string) => {
    if (type === "folder") {
      navigate(
        location.pathname === "/"
          ? `folders${location.pathname}${name}`
          : `${location.pathname}/${name}`
      );
    }
  };

  return filesData.length === 0 ? (
    <p className="text-center text-gray-500 p-4">No icons to display</p>
  ) : (
    <section className="p-4">
      <div className="container mx-auto grid gap-4 grid-cols-2  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
        {filesData.map((fileData) => (
          <Icon
            key={fileData.id}
            name={fileData.name}
            type={fileData.type}
            onClick={goToFolder}
          />
        ))}
      </div>
    </section>
  );
};
