import { fireEvent, render, screen } from "@testing-library/react";
import { ProviderWrapper } from "../../tests/ProviderWrapper";
import {
  FolderPlusIcon,
  DocumentPlusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { Menu } from "./Menu";

const testData = [
  {
    id: 1,
    text: "Create folder",
    icon: <FolderPlusIcon className="w-6 h-6" />,
  },
  {
    id: 2,
    text: "Upload file",
    icon: <DocumentPlusIcon className="w-6 h-6" />,
  },
];

describe("Menu", () => {
  test("Menu is not visible on first render", () => {
    render(
      <ProviderWrapper>
        <Menu
          menuData={testData}
          icon={
            <PlusIcon className="text-white w-6 h-6 group-hover/menu:scale-125 duration-300" />
          }
        />
      </ProviderWrapper>
    );

    const navigation = screen.getByRole("navigation");
    expect(navigation.className).toContain("invisible");
  });

  test("Menu is visible after clicking button", () => {
    render(
      <ProviderWrapper>
        <Menu
          menuData={testData}
          icon={
            <PlusIcon className="text-white w-6 h-6 group-hover/menu:scale-125 duration-300" />
          }
        />
      </ProviderWrapper>
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    const navigation = screen.getByRole("navigation");
    expect(navigation.className).not.toContain("invisible");
  });
});
