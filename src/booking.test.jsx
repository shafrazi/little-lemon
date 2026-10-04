import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import {
  today,
  fetchAPI,
  initializeTimes,
  updateTimes,
  validateBooking,
  submitAPI,
} from "./booking";
import { BookingPage } from "./main";
const valid = () => ({
  date: today(),
  time: fetchAPI(today())[0],
  guests: "2",
  name: "Sam Smith",
  email: "sam@example.com",
  occasion: "Birthday",
  requests: "",
});
describe("booking availability and validation", () => {
  it("initializes available times and updates them for the selected date", () => {
    expect(initializeTimes("2030-01-05")).toEqual(fetchAPI("2030-01-05"));
    expect(updateTimes([], { type: "date", date: "2030-01-07" })).toEqual(
      fetchAPI("2030-01-07"),
    );
    expect(fetchAPI("2030-01-05")).not.toEqual(fetchAPI("2030-01-07"));
  });
  it("rejects past dates, invalid guest counts, missing names and malformed emails", () => {
    expect(
      validateBooking({
        ...valid(),
        date: "2020-01-01",
        guests: "11",
        name: " ",
        email: "invalid",
      }),
    ).toMatchObject({
      date: expect.any(String),
      guests: expect.any(String),
      name: expect.any(String),
      email: expect.any(String),
    });
    expect(
      validateBooking({ ...valid(), guests: "1.5", time: "03:00" }),
    ).toHaveProperty("time");
    expect(validateBooking(valid())).toEqual({});
  });
  it("persists valid reservations with a unique confirmation reference", () => {
    const result = submitAPI(valid());
    expect(result.reference).toMatch(/^LL-/);
    expect(
      JSON.parse(window.localStorage.getItem("little-lemon-reservation")),
    ).toEqual(result);
    expect(submitAPI({ ...valid(), email: "" })).toBe(false);
  });
});
function booking() {
  return render(
    <MemoryRouter initialEntries={["/reservations"]}>
      <Routes>
        <Route path="/reservations" element={<BookingPage />} />
        <Route path="/confirmed" element={<h1>Booking complete</h1>} />
      </Routes>
    </MemoryRouter>,
  );
}
describe("reservation form", () => {
  it("shows accessible validation errors on empty submission", async () => {
    booking();
    await userEvent.click(
      screen.getByRole("button", { name: /Review reservation/i }),
    );
    expect(screen.getByLabelText("Full name")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(screen.getByText("Choose an available time.")).toBeInTheDocument();
    expect(screen.getByLabelText("Available time")).toHaveFocus();
  });
  it("clears the selected time when the date changes", async () => {
    booking();
    await userEvent.selectOptions(
      screen.getByLabelText("Available time"),
      fetchAPI(today())[0],
    );
    fireEvent.change(screen.getByLabelText("Date"), {
      target: { value: "2030-01-05" },
    });
    expect(screen.getByLabelText("Available time")).toHaveValue("");
  });
  it("supports reviewing, editing, and confirming a reservation", async () => {
    booking();
    const user = userEvent.setup();
    await user.selectOptions(
      screen.getByLabelText("Available time"),
      fetchAPI(today())[0],
    );
    await user.type(screen.getByLabelText("Full name"), "Sam Smith");
    await user.type(screen.getByLabelText("Email address"), "sam@example.com");
    await user.click(
      screen.getByRole("button", { name: /Review reservation/i }),
    );
    expect(
      screen.getByRole("heading", { name: "Looking good, Sam." }),
    ).toHaveFocus();
    await user.click(screen.getByRole("button", { name: /Edit details/i }));
    expect(screen.getByLabelText("Full name")).toHaveValue("Sam Smith");
    await user.click(
      screen.getByRole("button", { name: /Review reservation/i }),
    );
    await user.click(
      screen.getByRole("button", { name: /Confirm reservation/i }),
    );
    expect(
      screen.getByRole("heading", { name: "Booking complete" }),
    ).toBeInTheDocument();
  });
  it("shows a retry message when browser storage is unavailable", async () => {
    booking();
    const user = userEvent.setup();
    await user.selectOptions(
      screen.getByLabelText("Available time"),
      fetchAPI(today())[0],
    );
    await user.type(screen.getByLabelText("Full name"), "Sam");
    await user.type(screen.getByLabelText("Email address"), "sam@example.com");
    await user.click(
      screen.getByRole("button", { name: /Review reservation/i }),
    );
    const spy = vi
      .spyOn(Object.getPrototypeOf(window.localStorage), "setItem")
      .mockImplementation(() => {
        throw new Error("blocked");
      });
    await user.click(
      screen.getByRole("button", { name: /Confirm reservation/i }),
    );
    expect(screen.getByRole("alert")).toHaveTextContent("We couldn’t save");
    spy.mockRestore();
  });
});
