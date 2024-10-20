// Home.tsx
import React from "react";
import "../css/styles.css";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 p-10 smooth-entrance">
      <header className="bg-blue-600 text-white p-4 rounded-md shadow-md">
        <h1 className="text-3xl font-bold text-center">
          Welcome to My Website
        </h1>
      </header>
      <main className="flex-grow p-6">
        <section className="bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-300">
            About Us
          </h2>
          <p className="text-gray-400">
            We are a company that values excellence and innovation. Our mission
            is to provide top-notch services to our clients.
          </p>
        </section>
        <section className="mt-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-300">
            Services
          </h2>
          <ul className="list-disc list-inside text-gray-400">
            <li>Service One</li>
            <li>Service Two</li>
            <li>Service Three</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Home;
