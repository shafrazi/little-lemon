import React, { useState, useReducer, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  Menu as MenuIcon,
  X,
  MapPin,
  Clock,
  Check,
  CalendarDays,
  Users,
  ChevronLeft,
  Leaf,
} from "lucide-react";
import {
  today,
  initializeTimes,
  updateTimes,
  validateBooking,
  submitAPI,
  displayDate,
  displayTime,
} from "./booking";
import "./styles.css";
const photos = {
  hero: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=85",
  salad:
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=85",
  bruschetta:
    "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=800&q=85",
  dessert:
    "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=85",
  story:
    "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1000&q=85",
};
const dishes = [
  {
    name: "Greek salad",
    price: "12.99",
    type: "Fresh & vibrant",
    image: photos.salad,
    description:
      "Crisp greens, juicy tomatoes, cucumber, olives and creamy feta. Finished with our house lemon dressing.",
    tag: "Vegetarian",
  },
  {
    name: "Bruschetta",
    price: "5.99",
    type: "A little classic",
    image: photos.bruschetta,
    description:
      "Toasted artisan bread, sun-ripened tomatoes, fresh basil and a generous drizzle of extra virgin olive oil.",
    tag: "Guest favorite",
  },
  {
    name: "Lemon dessert",
    price: "5.00",
    type: "Something sweet",
    image: photos.dessert,
    description:
      "A sweet finish inspired by our grandmother’s recipe, with bright citrus and a light, creamy texture.",
    tag: "Made in-house",
  },
];
function Logo() {
  return (
    <Link className="logo" to="/" aria-label="Little Lemon home">
      <img src="/lemon.svg" alt="" />
      <span>
        LITTLE LEMON<small>CHICAGO</small>
      </span>
    </Link>
  );
}
function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setOpen(false), [location]);
  return (
    <header>
      <div className="container header-inner">
        <Logo />
        <button
          className="mobile-toggle"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="navigation"
          aria-label="Toggle navigation"
        >
          {open ? <X /> : <MenuIcon />}
        </button>
        <nav
          id="navigation"
          className={open ? "open" : ""}
          aria-label="Main navigation"
        >
          <NavLink to="/" end>
            Home
          </NavLink>
          <a href="/#about" onClick={() => setOpen(false)}>
            Our story
          </a>
          <NavLink to="/menu">Menu</NavLink>
          <NavLink to="/reservations">Reservations</NavLink>
        </nav>
        <Link to="/reservations" className="button header-book">
          Book a table <ArrowUpRight size={17} />
        </Link>
      </div>
    </header>
  );
}
function Footer() {
  return (
    <footer>
      <div className="container footer-main">
        <Logo />
        <p>
          Mediterranean roots.
          <br />
          Chicago heart.
        </p>
        <div>
          <strong>Come on over</strong>
          <span>Chicago, Illinois</span>
          <span>Open daily · 5–10 pm</span>
        </div>
        <div>
          <strong>A seat at our table</strong>
          <Link to="/menu">Explore the menu ↗</Link>
          <Link to="/reservations">Make a reservation ↗</Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Little Lemon</span>
        <span>Meta Front-End Developer Capstone · Demo restaurant</span>
      </div>
    </footer>
  );
}
function DishCards() {
  return (
    <div className="dish-grid">
      {dishes.map((d) => (
        <article className="dish" key={d.name}>
          <div className="dish-photo">
            <img src={d.image} alt={d.name} loading="lazy" />
            <span>{d.tag}</span>
          </div>
          <div className="dish-body">
            <p className="eyebrow">{d.type}</p>
            <div className="dish-title">
              <h3>{d.name}</h3>
              <span>${d.price}</span>
            </div>
            <p>{d.description}</p>
            <Link to="/reservations">
              Enjoy at our table <ArrowUpRight size={18} />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="tiny-line" /> YOUR LITTLE MEDITERRANEAN ESCAPE
            </p>
            <h1>
              Good food.
              <br />
              Great company.
              <br />
              <em>Little Lemon.</em>
            </h1>
            <p className="hero-description">
              A family-owned corner of Chicago, bringing you fresh Mediterranean
              flavors and a warm welcome. There’s always a place for you here.
            </p>
            <Link className="button yellow" to="/reservations">
              Reserve a table <ArrowUpRight size={20} />
            </Link>
            <div className="hero-note">
              <span className="stars">★★★★★</span>
              <span>A little place. A lot to love.</span>
            </div>
          </div>
          <div className="hero-visual">
            <img
              src={photos.hero}
              alt="A beautifully prepared dinner in a warmly lit restaurant"
            />
            <div className="image-caption">
              <span>FRESH INGREDIENTS. FAMILIAR FACES.</span>
              <span>Est. 1995</span>
            </div>
            <div className="round-stamp">
              MADE WITH LOVE
              <Leaf size={27} />
              SERVED WITH JOY
            </div>
          </div>
        </div>
      </section>
      <div className="values-strip">
        <div className="container">
          <span>
            <Leaf size={18} /> Fresh, seasonal ingredients
          </span>
          <span>✧ Inspired by the Mediterranean</span>
          <span>♡ Family-owned, always</span>
        </div>
      </div>
      <section className="section container" id="specials">
        <div className="section-heading">
          <div>
            <p className="eyebrow">FROM OUR KITCHEN</p>
            <h2>
              This week’s <em>favorites.</em>
            </h2>
          </div>
          <Link to="/menu" className="text-link">
            Explore the menu <ArrowUpRight size={20} />
          </Link>
        </div>
        <DishCards />
      </section>
      <section className="story section" id="about">
        <div className="container story-grid">
          <div className="story-image">
            <img
              src={photos.story}
              loading="lazy"
              alt="The inviting dining room of a neighborhood restaurant"
            />
            <span>A little slice of home.</span>
          </div>
          <div>
            <p className="eyebrow">TWO BROTHERS. ONE SHARED TABLE.</p>
            <h2>
              Rooted in tradition.
              <br />
              <em>Made for today.</em>
            </h2>
            <p>
              We’re Mario and Adrian, two brothers with a love for good food and
              the way it brings people together.
            </p>
            <p>
              Little Lemon is our love letter to the Mediterranean. We take the
              recipes we grew up with, add fresh local ingredients, and make
              them our own. Simple, generous, and always made with care.
            </p>
            <Link className="text-link" to="/reservations">
              Come make yourself at home <ArrowUpRight size={19} />
            </Link>
          </div>
        </div>
      </section>
      <section className="section container testimonials">
        <p className="eyebrow">HAPPY PEOPLE, FULL HEARTS</p>
        <h2>
          A few kind <em>words.</em>
        </h2>
        <div className="quote-grid">
          {[
            [
              "“The kind of place you want to keep coming back to. The Greek salad is a must!”",
              "Sarah M.",
              "Neighborhood regular",
            ],
            [
              "“Warm, welcoming, and absolutely delicious. Our new favorite date-night spot.”",
              "James L.",
              "A table for two",
            ],
            [
              "“You can taste the love in every dish. Don’t leave without something sweet.”",
              "Maria K.",
              "Here for the dessert",
            ],
          ].map(([quote, name, detail]) => (
            <article key={name}>
              <span className="stars">★★★★★</span>
              <blockquote>{quote}</blockquote>
              <div className="reviewer">
                <span>{name[0]}</span>
                <p>
                  <strong>{name}</strong>
                  <small>{detail}</small>
                </p>
              </div>
            </article>
          ))}
        </div>
        <p className="sample-note">
          Illustrative reviews for this capstone demo.
        </p>
      </section>
      <section className="cta container">
        <div>
          <p className="eyebrow">PULL UP A CHAIR</p>
          <h2>
            We’ll save you <em>a seat.</em>
          </h2>
          <p>A catch-up, a celebration, or just a really good dinner.</p>
        </div>
        <Link className="button yellow" to="/reservations">
          Let’s make a reservation <ArrowUpRight size={20} />
        </Link>
      </section>
    </>
  );
}
function MenuPage() {
  return (
    <section className="container section menu-page">
      <p className="eyebrow">FRESH. SIMPLE. FULL OF FLAVOR.</p>
      <h1>
        A little taste of <em>the Mediterranean.</em>
      </h1>
      <p className="intro">
        Our signature favorites, made with care. All prices in USD.
      </p>
      <DishCards />
      <p className="menu-note">
        Have an allergy or dietary requirement? Add a note to your reservation
        and speak with your server before ordering.
      </p>
    </section>
  );
}
function Field({ label, name, error, children }) {
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      {children}
      {error && (
        <span className="field-error" id={`${name}-error`}>
          {error}
        </span>
      )}
    </div>
  );
}
export function BookingPage() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    date: today(),
    time: "",
    guests: "2",
    occasion: "Just because",
    name: "",
    email: "",
    requests: "",
  });
  const [times, dispatch] = useReducer(updateTimes, undefined, initializeTimes);
  const [errors, setErrors] = useState({});
  const [review, setReview] = useState(false);
  const [busy, setBusy] = useState(false);
  const [failure, setFailure] = useState("");
  const reviewHeading = useRef(null);
  useEffect(() => {
    if (review) reviewHeading.current?.focus();
  }, [review]);
  function change(e) {
    const { name, value } = e.target;
    setValues((v) => ({
      ...v,
      [name]: value,
      ...(name === "date" ? { time: "" } : {}),
    }));
    setErrors((e) => ({ ...e, [name]: undefined }));
    if (name === "date") dispatch({ type: "date", date: value });
  }
  function props(name) {
    return {
      id: name,
      name,
      value: values[name],
      onChange: change,
      "aria-invalid": !!errors[name],
      "aria-describedby": errors[name] ? `${name}-error` : undefined,
    };
  }
  function proceed(e) {
    e.preventDefault();
    const next = validateBooking(values);
    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById(Object.keys(next)[0])?.focus();
      return;
    }
    setReview(true);
  }
  async function confirm() {
    setBusy(true);
    setFailure("");
    try {
      const result = submitAPI(values);
      if (!result) throw new Error();
      navigate("/confirmed", { state: { reservation: result } });
    } catch {
      setFailure(
        "We couldn’t save your reservation. Please allow browser storage and try again.",
      );
      setBusy(false);
    }
  }
  return (
    <section className="container booking-layout section">
      <aside>
        <Link className="back-link" to="/">
          <ChevronLeft size={16} /> Back to home
        </Link>
        <p className="eyebrow">THERE’S A PLACE FOR YOU HERE</p>
        <h1>
          A good evening
          <br />
          starts with
          <br />
          <em>a table.</em>
        </h1>
        <p>Bring your favorite people. We’ll take care of the rest.</p>
        <img
          className="booking-photo"
          src={photos.hero}
          alt="An intimate restaurant table ready for dinner"
        />
        <div className="detail-line">
          <MapPin size={18} /> Chicago, Illinois
        </div>
        <div className="detail-line">
          <Clock size={18} /> Dinner reservations · 5–9 pm
        </div>
        <p className="demo-note">
          This is a capstone demo. Reservations are saved only in this browser;
          no real booking or email is sent.
        </p>
      </aside>
      <div className="booking-card">
        <div className="steps">
          <span className={!review ? "selected" : ""}>
            01 &nbsp; Your details
          </span>
          <span className={review ? "selected" : ""}>02 &nbsp; Review</span>
        </div>
        {!review ? (
          <>
            <h2>Reserve your table</h2>
            <p className="muted">A few details, and you’re one step closer.</p>
            <form noValidate onSubmit={proceed}>
              <div className="form-grid">
                <Field name="date" label="Date" error={errors.date}>
                  <input
                    {...props("date")}
                    type="date"
                    min={today()}
                    required
                  />
                </Field>
                <Field
                  name="guests"
                  label="Number of guests"
                  error={errors.guests}
                >
                  <select {...props("guests")}>
                    {Array.from({ length: 10 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} {i ? "guests" : "guest"}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field name="time" label="Available time" error={errors.time}>
                  <select {...props("time")} required>
                    <option value="">Select a time</option>
                    {times.map((t) => (
                      <option key={t} value={t}>
                        {displayTime(t)}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field name="occasion" label="Occasion (optional)">
                  <select {...props("occasion")}>
                    {[
                      "Just because",
                      "Birthday",
                      "Anniversary",
                      "Date night",
                      "Celebration",
                    ].map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </Field>
              </div>
              <div className="form-divider" />
              <Field name="name" label="Full name" error={errors.name}>
                <input
                  {...props("name")}
                  autoComplete="name"
                  placeholder="Your name"
                  maxLength={100}
                  required
                />
              </Field>
              <Field name="email" label="Email address" error={errors.email}>
                <input
                  {...props("email")}
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                />
              </Field>
              <Field
                name="requests"
                label="Anything we should know? (optional)"
              >
                <textarea
                  {...props("requests")}
                  rows="3"
                  maxLength={500}
                  placeholder="Dietary requirements, accessibility needs, or a special occasion…"
                />
              </Field>
              <button className="button yellow full" type="submit">
                Review reservation <ArrowRight size={18} />
              </button>
              <p className="form-footnote">
                For groups larger than 10, please arrange your visit with the
                restaurant.
              </p>
            </form>
          </>
        ) : (
          <>
            <h2 ref={reviewHeading} tabIndex={-1}>
              Looking good, {values.name.trim().split(" ")[0]}.
            </h2>
            <p className="muted">Check your details before confirming.</p>
            <ReservationDetails reservation={values} />
            <button
              className="text-link edit-button"
              onClick={() => setReview(false)}
            >
              <ChevronLeft size={16} /> Edit details
            </button>
            {failure && (
              <p role="alert" className="field-error">
                {failure}
              </p>
            )}
            <button
              className="button yellow full"
              onClick={confirm}
              disabled={busy}
            >
              {busy ? "Saving…" : "Confirm reservation"}
              <Check size={18} />
            </button>
          </>
        )}
      </div>
    </section>
  );
}
function ReservationDetails({ reservation: r }) {
  return (
    <dl className="reservation-details">
      <div>
        <dt>
          <CalendarDays size={18} /> Date
        </dt>
        <dd>{displayDate(r.date)}</dd>
      </div>
      <div>
        <dt>
          <Clock size={18} /> Time
        </dt>
        <dd>{displayTime(r.time)}</dd>
      </div>
      <div>
        <dt>
          <Users size={18} /> Guests
        </dt>
        <dd>
          {r.guests} {Number(r.guests) === 1 ? "guest" : "guests"}
        </dd>
      </div>
      <div>
        <dt>Name</dt>
        <dd>{r.name}</dd>
      </div>
      <div>
        <dt>Email</dt>
        <dd>{r.email}</dd>
      </div>
      <div>
        <dt>Occasion</dt>
        <dd>{r.occasion}</dd>
      </div>
      {r.requests && (
        <div>
          <dt>Special requests</dt>
          <dd>{r.requests}</dd>
        </div>
      )}
    </dl>
  );
}
function Confirmation() {
  const location = useLocation();
  let saved;
  try {
    const value = JSON.parse(
      window.localStorage.getItem("little-lemon-reservation"),
    );
    if (value && !Object.keys(validateBooking(value)).length) saved = value;
  } catch {}
  const r = location.state?.reservation || saved;
  return (
    <section className="confirmation container section">
      {r ? (
        <>
          <div className="success-icon">
            <Check size={32} />
          </div>
          <p className="eyebrow">A LITTLE SOMETHING TO LOOK FORWARD TO</p>
          <h1>
            Your table is <em>reserved.</em>
          </h1>
          <p>We can’t wait to welcome you, {r.name.split(" ")[0]}.</p>
          <div className="confirmation-card">
            <p className="reference">RESERVATION {r.reference}</p>
            <ReservationDetails reservation={r} />
          </div>
          <p className="demo-note">
            Demo booking saved in this browser. No email has been sent.
          </p>
          <Link to="/" className="button">
            Back to home <ArrowUpRight size={18} />
          </Link>
        </>
      ) : (
        <>
          <h1>
            Let’s find you <em>a table.</em>
          </h1>
          <p>You don’t have a current reservation in this browser.</p>
          <Link to="/reservations" className="button yellow">
            Reserve a table
          </Link>
        </>
      )}
    </section>
  );
}
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() =>
        document.getElementById(hash.slice(1))?.scrollIntoView(),
      );
    } else {
      window.scrollTo(0, 0);
      document.getElementById("main")?.focus();
    }
  }, [pathname, hash]);
  return null;
}
function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/reservations" element={<BookingPage />} />
          <Route path="/confirmed" element={<Confirmation />} />
          <Route
            path="*"
            element={
              <section className="container section">
                <h1>This table isn’t here.</h1>
                <Link to="/" className="button">
                  Back to home
                </Link>
              </section>
            }
          />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
if (document.getElementById("root"))
  createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
