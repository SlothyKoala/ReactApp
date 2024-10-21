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
            About Us
          </h2>
          <p className="text-gray-400">
            We are a company that values excellence and innovation. Our mission
            is to provide top-notch services to our clients. Our dedicated team
            is here to ensure your experience is nothing short of exceptional.
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
