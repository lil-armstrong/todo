import { setupServer } from "msw/node";
import { handlers } from "./api.mock";

export const server = setupServer(...handlers);
