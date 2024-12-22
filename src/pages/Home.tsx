import { useEffect } from "react";
import "../css/styles.css";
import "../css/clock.css";

const Home: React.FC = () => {
  useEffect(() => {
    const deg = 6;
    const hr = document.querySelector<HTMLDivElement>("#hr");
    const mn = document.querySelector<HTMLDivElement>("#mn");
    const sec = document.querySelector<HTMLDivElement>("#sc");

    const updateClock = () => {
      const day = new Date();
      const hh = day.getHours() * 30;
      const mm = day.getMinutes() * deg;
      const ss = day.getSeconds() * deg;

      if (hr && mn && sec) {
        hr.style.transform = `rotateZ(${hh + mm / 12}deg)`;
        mn.style.transform = `rotateZ(${mm}deg)`;
        sec.style.transform = `rotateZ(${ss}deg)`;
      }
    };

    const interval = setInterval(updateClock, 1000);
    updateClock();

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 p-10 slide-in-left">
      <header className="bg-blue-600 text-white p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
        <h1 className="text-4xl font-bold text-center cursor-default">
          Welcome to My Website
        </h1>
      </header>

      <main className="flex-grow p-6">
        <section className="bg-gray-800 rounded-lg shadow-md p-6 mb-6 transition-transform duration-300 hover:shadow-xl">
          <h2 className="text-3xl font-semibold mb-4 text-gray-300">
            About Me
          </h2>
          <p className="text-gray-400">
            I am dedicated to crafting innovative solutions that enhance user
            experiences. My aim is to provide exceptional services tailored to
            the unique needs of each individual I engage with. Striving for
            excellence in every project, I remain committed to continuous
            improvement and learning. Each facet of this web application
            embodies my dedication to quality and meticulous attention to
            detail. I invite you to explore the diverse features designed to
            support your journey.
          </p>
          <ul className="list-disc list-inside text-gray-400 mt-2">
            <li>
              <strong>Home:</strong> Your gateway to the app, showcasing a
              real-time clock and an overview of the various offerings.
            </li>
            <li>
              <strong>TicTacToe:</strong> A fun, interactive game you can enjoy
              with friends or challenge the computer, highlighting your
              strategic skills.
            </li>
            <li>
              <strong>TodoList:</strong> A robust task management tool that aids
              in tracking daily activities and deadlines efficiently.
            </li>
            <li>
              <strong>Drag and Drop:</strong> A versatile note-taking feature
              that allows you to organize your thoughts effortlessly by dragging
              and dropping notes in your preferred order.
            </li>
          </ul>
          <p className="text-gray-400 mt-4">
            My mission is to ensure a seamless and enjoyable experience as you
            navigate through your tasks and ideas. I am continually evolving to
            meet your needs, ensuring that your time spent here is both
            productive and engaging.
          </p>
        </section>

        <section className="mt-6 flex justify-center items-center">
          <div className="clock">
            <div className="hour">
              <div className="hr" id="hr"></div>
            </div>
            <div className="min">
              <div className="mn" id="mn"></div>
            </div>
            <div className="sec">
              <div className="sc" id="sc"></div>
            </div>
          </div>
        </section>

        <section className="mt-4">
          <h2 className="text-3xl font-semibold mb-4 text-gray-300">
            Get in Touch
          </h2>
          <form className="bg-gray-800 p-6 rounded-lg shadow-md">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-2 mb-4 rounded-md border border-gray-600 bg-gray-700 text-gray-300 focus:outline-none focus:border-blue-500 transition-all duration-300"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-2 mb-4 rounded-md border border-gray-600 bg-gray-700 text-gray-300 focus:outline-none focus:border-blue-500 transition-all duration-300"
            />
            <textarea
              placeholder="Your Message"
              className="w-full p-2 mb-4 rounded-md border border-gray-600 bg-gray-700 text-gray-300 focus:outline-none focus:border-blue-500 transition-all duration-300"
              rows={4}
            />
            <button className="w-full bg-blue-600 text-white py-2 rounded-md transition duration-300 hover:bg-blue-500">
              Send Message
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Home;
