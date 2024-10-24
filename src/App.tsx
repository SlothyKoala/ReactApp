import { useState } from "react";
import NavBar from "./components/NavBar";
import imagePath from "./assets/reactLogo.png";
import Home from "./pages/Home";
import TicTacToe from "./pages/TicTacToe";
import TodoList from "./pages/TodoList";
import DragnDrop from "./pages/DragnDrop";

function App() {
  const items = ["Home", "TicTacToe", "TodoList", "DragnDrop"];
  const [currentPage, setCurrentPage] = useState<string>("Home");
  const [animationClass, setAnimationClass] = useState<string>("slide-in-left");

  const renderPage = () => {
    switch (currentPage) {
      case "Home":
        return <Home />;
      case "TicTacToe":
        return <TicTacToe />;
      case "TodoList":
        return <TodoList />;
      case "DragnDrop":
        return <DragnDrop />;
      default:
        return <Home />;
    }
  };

  const handleNavItemClick = (item: string) => {
    const newAnimationClass = item === currentPage ? "" : "slide-out-left";

    setAnimationClass(newAnimationClass);

    setTimeout(() => {
      setCurrentPage(item);
      setAnimationClass(item === "Home" ? "slide-in-left" : "slide-in-right");
    }, 800);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar
        brandName="React Project"
        imageUrl={imagePath}
        navItems={items}
        onNavItemClick={handleNavItemClick}
      />
      <div className={`flex-grow transition-all duration-500 ${animationClass}`}>
        {renderPage()}
      </div>
      <footer className="bg-blue-600 text-white p-4 text-center rounded-md shadow-md">
        <p>&copy; 2024 My Website. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
