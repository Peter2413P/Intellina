import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Members from "./pages/members/Members";
import Contact from "./pages/Contact";

import Events from "./pages/events/Events";
import Technical from "./pages/events/Technical";
import NonTech from "./pages/events/NonTech";
import Flagship from "./pages/events/Flagship";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="events" element={<Events />} />
        <Route path="events/technical" element={<Technical />} />
        <Route path="events/non-tech" element={<NonTech />} />
        <Route path="events/flagship" element={<Flagship />} />

        <Route path="about" element={<About />} />
        <Route path="members" element={<Members />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}

export default App;
