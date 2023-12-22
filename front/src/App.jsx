import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import AuthContext from "./context/authContext";
import { useState, useCallback, useMemo } from "react";
import Transactions from "./pages/transactions";
import Register from './pages/register'
import Login from './pages/login'
import Home from './pages/home'
import './App.css'
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";

const routes = [
  {path : '/', element: <Home />},
  {path : '/register', element: <Register />},
  {path : '/login', element: <Login />},
  {path: '/transactions', element: <Transactions />},
]

const router = createBrowserRouter(routes,
    {basename: '/finance-flow/front'}
  )

const App = () => {

  const [responsive, setResponsive] = useState(false)
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem('user') ?
    JSON.parse(localStorage.getItem('user')) : null
  )
  const login = useCallback((user) => {
    localStorage.setItem('user', JSON.stringify(user))
    setCurrentUser(user)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('user')
    setCurrentUser(null)
  }, [])

  const userValue = useMemo(() => {
    return {currentUser, login, logout}
  }, [currentUser, login, logout])

  return (
    <AuthContext.Provider value={userValue}>  
      <Header/>
      <div className="App">
        <RouterProvider
          router={router}
        />
      </div>
      <Footer />
    </AuthContext.Provider>
  )
}

export default App
