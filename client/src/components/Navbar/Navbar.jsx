import React from "react";
import styles from "./Navbar.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { loginWithRedirect, user, isAuthenticated, logout } = useAuth0();
  const [storedUser, setStoredUser] = useState(null);

  useEffect(() => {
    // Check if there's a user in localStorage
    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      // If there is, set the storedUser state to this user
      setStoredUser(JSON.parse(storedUserData));
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      // Store user information in localStorage
      localStorage.setItem("user", JSON.stringify(user));
      setStoredUser(user);
    } else {
      // Clear user information from localStorage
      localStorage.removeItem("user");
      setStoredUser(null);
    }
  }, [isAuthenticated, user]);

  const handleLoginClick = () => {
    if (isAuthenticated) {
      logout(); // If authenticated, log out
    } else {
      loginWithRedirect(); // If not authenticated, redirect to login
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img
          src="https://see.fontimg.com/api/renderfont4/WyDmO/eyJyIjoiZnMiLCJoIjo0OSwidyI6MTI1MCwiZnMiOjM5LCJmZ2MiOiIjRkZGRkZGIiwiYmdjIjoiI0ZGRkZGRiIsInQiOjF9/TG9maVBvbW8/evermore.png"
          alt="Modern fonts"
        ></img>
      </div>
      <div className={styles.user} onClick={handleLoginClick}>
        {/* <span className={styles.username}>
          {isAuthenticated ? user.name : ""}
        </span> */}
        {isAuthenticated ? <img className={styles.userPhoto} src={user.picture} alt="userimg"  /> : <i className="fa-regular fa-user fa-2x"></i>}
      </div>
    </div>
  );
};

export default Navbar;
