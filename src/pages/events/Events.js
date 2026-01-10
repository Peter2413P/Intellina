import { Link } from "react-router-dom";
import "./events.css";

export default function Events() {

  const tilt = (e, card) => {
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;

    const rx = -(y - r.height / 2) / 12;
    const ry = (x - r.width / 2) / 12;

    card.querySelector(".event-inner").style.transform =
      `rotateX(${rx}deg) rotateY(${ry}deg)`;
  };

  const reset = (card) => {
    card.querySelector(".event-inner").style.transform =
      "rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div className="min-h-screen bg-[#0a0203] text-white px-10 py-20">

      <h1 className="text-6xl text-center mb-20 text-red-600 drop-shadow-[0_0_20px_red]">
        Select Your Portal
      </h1>

      <div className="event-grid">

        <Link
          to="/events/technical"
          className="event-card tech"
          onMouseMove={(e) => tilt(e, e.currentTarget)}
          onMouseLeave={(e) => reset(e.currentTarget)}
        >
          <div className="event-inner">
            <h2>Technical</h2>
            <p>Hackathons • AI Battles • Coding</p>
          </div>
        </Link>

        <Link
          to="/events/flagship"
          className="event-card flagship"
          onMouseMove={(e) => tilt(e, e.currentTarget)}
          onMouseLeave={(e) => reset(e.currentTarget)}
        >
          <div className="event-inner">
            <h2>Flagship</h2>
            <p>Biggest Battles • Ultimate Glory</p>
          </div>
        </Link>

        <Link
          to="/events/non-tech"
          className="event-card nontech"
          onMouseMove={(e) => tilt(e, e.currentTarget)}
          onMouseLeave={(e) => reset(e.currentTarget)}
        >
          <div className="event-inner">
            <h2>Non-Technical</h2>
            <p>Treasure Hunt • Games • Fun</p>
          </div>
        </Link>

      </div>

    </div>
  );
}
