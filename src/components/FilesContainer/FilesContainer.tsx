import { FC, useContext, useEffect } from "react";
import { Icon } from "./Icon";
import { FilesContext, IFileSystemItem } from "../../context/FilesContext";
import { useLocation, useNavigate } from "react-router-dom";
import { findFolderItems } from "../../actions/filesActions";

export const FilesContainer: FC = () => {
  const { filesData } = useContext(FilesContext)!;
  const navigate = useNavigate();
  const location = useLocation();

  const pathNameArr = location.pathname.split("/");

  const goToFolder = (name: string, type: string) => {
    if (type === "folder") {
      navigate(
        location.pathname === "/"
          ? `folders${location.pathname}${name}`
          : `${location.pathname}${
              pathNameArr[pathNameArr.length - 1] === "" ? "" : "/"
            }${name}`
      );
    }
  };

  const folderItems = findFolderItems(filesData, 2, pathNameArr) as
    | IFileSystemItem[]
    | null;

  useEffect(() => {
    if (!folderItems) return navigate("/not-found", { replace: true });
  }, [folderItems, navigate]);

  if (!folderItems) return null;

  return folderItems.length === 0 ? (
    <p className="text-center text-gray-500 p-4">No icons to display</p>
  ) : (
    <section className="p-4">
      <div className="container mx-auto grid gap-4 grid-cols-2  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
        {folderItems.map((item) => (
          <Icon
            key={item.id}
            id={item.id}
            name={item.name}
            type={item.type}
            onClick={goToFolder}
          />
        ))}
      </div>
    </section>
  );
};
