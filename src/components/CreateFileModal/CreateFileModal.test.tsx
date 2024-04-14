import { render, screen } from "@testing-library/react";
import { ProviderWrapper } from "../../tests/ProviderWrapper";
import { CreateFileModal } from "./CreateFileModal";

describe("CreateFileModal", () => {
  test("Modal is not visible on first render", () => {
    render(
      <ProviderWrapper value={{ showModal: false }}>
        <CreateFileModal />
      </ProviderWrapper>
    );

    const modal = screen.getByRole("presentation");
    expect(modal.className).toContain("invisible");
  });

  test('Modal is visible when "showmodal" prop is set to "true"', () => {
    render(
      <ProviderWrapper value={{ showModal: true }}>
        <CreateFileModal />
      </ProviderWrapper>
    );

    const modal = screen.getByRole("presentation");
    expect(modal.className).not.toContain("invisible");
  });
});
