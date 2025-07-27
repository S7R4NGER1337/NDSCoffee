import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin({loginSubmit}) {
  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  return (
    <>
      <h1>Login to see admin panel</h1>
      <form>
        <label>Username</label>
        <input
          type="text"
          name="username"
          autoComplete="off"
          value={userData.username}
          onChange={(e) =>
            setUserData({ ...userData, username: e.target.value })
          }
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          autoComplete="off"
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
        />

        <button
          type="button"
          onClick={async () => {
            setUserData({
              username: "",
              password: "",
            });
            
            if(await loginSubmit(userData)){
              navigate('/admin')
            }
          }}
        >
          Login
        </button>
      </form>
    </>
  );
}
