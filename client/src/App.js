import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Player from "./components/Player/Player";
import Pomodoro from "./components/Pomodoro/Pomodoro";
import TodoList from "./components/TodoList/TodoList";
import { Auth0Provider } from "@auth0/auth0-react";

// ... (existing imports)

function App() {
  const url = `${process.env.PUBLIC_URL}/assets/gifs/desktop/1.gif`;
  const [backgroundImage, setBackgroundImage] = useState(url);

  const changeBackgroundImage = (image) => {
    setBackgroundImage(image);
  };

  return (
    <Auth0Provider
      domain="dev-qtcp208o1o3772dz.us.auth0.com"
      clientId="XuXbunQiGElb6XpTNLFY0Kz01WBrrvKL"
      authorizationParams={{ redirect_uri: window.location.origin }}
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      <div
        className="App"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
        }}
      >
        <Navbar />
        <div className="container">
          <TodoList />
          <Player changeBackgroundImage={changeBackgroundImage} />
          <Pomodoro />
        </div>
      </div>
    </Auth0Provider>
  );
}

export default App;
