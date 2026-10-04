export function today() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
export function fetchAPI(date) {
  const day = new Date(`${date}T12:00:00`).getDay();
  if (Number.isNaN(day)) return [];
  return day === 0 || day === 6
    ? ["17:00", "17:30", "18:00", "19:00", "20:00", "20:30"]
    : ["17:00", "17:30", "18:30", "19:00", "19:30", "20:30", "21:00"];
}
export function initializeTimes(date = today()) {
  return fetchAPI(date);
}
export function updateTimes(state, action) {
  return action.type === "date" ? fetchAPI(action.date) : state;
}
export function validateBooking(values) {
  const errors = {};
  if (!values.date || values.date < today())
    errors.date = "Choose today or a future date.";
  if (!fetchAPI(values.date).includes(values.time))
    errors.time = "Choose an available time.";
  if (
    !Number.isInteger(Number(values.guests)) ||
    Number(values.guests) < 1 ||
    Number(values.guests) > 10
  )
    errors.guests = "Choose between 1 and 10 guests.";
  if (!values.name.trim()) errors.name = "Enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    errors.email = "Enter a valid email address.";
  return errors;
}
export function submitAPI(values) {
  if (Object.keys(validateBooking(values)).length) return false;
  const reservation = {
    ...values,
    reference: `LL-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
  };
  window.localStorage.setItem(
    "little-lemon-reservation",
    JSON.stringify(reservation),
  );
  return reservation;
}
export function displayDate(date) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
export function displayTime(time) {
  const [h, m] = time.split(":");
  return `${Number(h) % 12 || 12}:${m} ${Number(h) >= 12 ? "PM" : "AM"}`;
}
