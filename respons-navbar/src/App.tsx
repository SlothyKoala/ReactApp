import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import imagePath from "./assets/reactLogo.png";

function App() {
  const items = ["Home", "TicTacToe"];
  return (
    <div>
      <NavBar 
        brandName="NavBar Project" 
        imageUrl={imagePath} 
        navItems={items}/>
    </div>
  );
}

export default App;
