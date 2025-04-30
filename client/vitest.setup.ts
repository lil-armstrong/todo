import "@testing-library/jest-dom/vitest";
import { server } from "@/__mock__/server.mock";
import { InterFontMock, FiraCodeFontMock } from "@/__mock__/font.mock";
import { vi } from "vitest";

// Establish API mocking before all tests.
beforeAll(() => {
  server.listen({
    onUnhandledRequest: "warn",
  });
});

afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const { getComputedStyle } = window;
window.getComputedStyle = (elt) => getComputedStyle(elt);
window.HTMLElement.prototype.scrollIntoView = () => {};

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserver;

vi.mock("next/font/google", () => ({
  __esModule: true,
  default: () => {
    return {
      className: "font-class",
      style: {},
    };
  },
  Inter: InterFontMock,
  Fira_Code: FiraCodeFontMock,
}));
