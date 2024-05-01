import Router, { route } from "preact-router";
import { Login } from "./pages/LoginUp";
import { SignUp } from "./pages/SignUp";
import { TablesView } from "./pages/TablesView";
import { UserPage } from "./pages/UserPage";
import { useEffect, useState } from "preact/hooks";
import { apiClient } from "./api/client";
import { ApiUser } from "./api";


export function App() {
  
  if (location.pathname === '/' || location.pathname === '') route('/tables')

  
  // local storage/variable
  const [user, setUser] = useState<ApiUser>()


  useEffect(() => {
    apiClient.getUser().then(res => {

      if (res.meta.status === 401) {
        route('/login', true)
      } else if (res.meta.status === 200) {
        setUser(res.data)
      } else {
        route('/login', true)
      }
    })
  }, []) 

  return (
    <Router>
      <SignUp path="/signup" />
      <Login path="/login" />

      <UserPage path="/user" user={user} />

      <TablesView path="/tables/:tabel?" user={user}  />
    </Router>
  )
}
