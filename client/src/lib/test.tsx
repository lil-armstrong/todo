// ./test-utils/render.tsx
import {
  RenderOptions,
  render as testingLibraryRender,
} from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import userEvent from "@testing-library/user-event";

function renderWithMantine(
  ui: React.ReactNode,
  options?: RenderOptions
) {
  return testingLibraryRender(ui, {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <MantineProvider theme={theme}>
        {children}
      </MantineProvider>
    ),
    ...options,
  });
}

export * from "@testing-library/react";
export { renderWithMantine as render };
export { userEvent };
