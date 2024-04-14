import { FC, useRef, useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";

interface IMenuProps {
  menuData: {
    id: number;
    text: string;
    icon?: JSX.Element;
  }[];
  icon: JSX.Element;
}

export const Menu: FC<IMenuProps> = ({ menuData, icon }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLElement>(null);

  useOutsideClick(menuRef, () => {
    setShowMenu(false);
  });

  return (
    <div className="relative w-fit">
      <button
        className="p-2 focus:outline-none flex items-center group/menu rounded-full hover:bg-blue-600 hover:bg-opacity-15 duration-300"
        onClick={(e) => {
          e.stopPropagation();
          setShowMenu(true);
        }}
      >
        {icon}
      </button>
      <nav
        className={`absolute top-0 right-0 z-10 duration-300 bg-gray-100 ${
          showMenu ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        ref={menuRef}
      >
        <ul>
          {menuData.map((menuItem) => (
            <li
              key={menuItem.id}
              className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-300 duration-300 text-gray-700"
            >
              {menuItem.icon}
              <span className="text-nowrap">{menuItem.text}</span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
