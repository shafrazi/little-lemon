import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";
import { JSDOM } from "jsdom";
// Isolate browser storage from Node's experimental global localStorage.
const storageWindow = new JSDOM("", { url: "http://localhost" }).window;
Object.defineProperty(window, "localStorage", {
  configurable: true,
  value: storageWindow.localStorage,
});
afterEach(() => {
  cleanup();
  window.localStorage.clear();
});
