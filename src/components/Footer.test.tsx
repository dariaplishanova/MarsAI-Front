import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; 
import { vi, describe, it, expect } from "vitest";
import { Footer } from "./Footer";

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key, 
    i18n: { language: 'en' },
  }),
}));

describe("Footer Component", () => {
  it("renders the footer layout successfully", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });
});