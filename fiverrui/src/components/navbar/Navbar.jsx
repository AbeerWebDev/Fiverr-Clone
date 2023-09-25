import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.scss'
import newRequest from '../../utils/newRequest';
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const [active, setActive] = useState(false);
    const [open, setOpen] = useState(false);

    const {pathname} = useLocation()
    const navigate = useNavigate()

    const isActive = () => {
        window.scrollY ? setActive(true) : setActive(false)
    }

    useEffect(()=>{
        window.addEventListener('scroll', isActive);

        return () => {
            window.addEventListener('scroll', isActive )
        }
    }, []);

    const handleLogout = async () => {
      try {
        newRequest.post('/auth/logout')
        localStorage.setItem('currentUser', null)
        navigate('/')
      } catch (err) {
        console.log(err)
      }
    }

    const currentUser = JSON.parse(localStorage.getItem('currentUser'))

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link className="link" to="/">
            <span className="text">fiverr</span>
          </Link>
          <span className="dot">. </span>
        </div>
        <div className="links">
          <span>Fiverr Business</span>
          <span>Explore</span>
          <span>English</span>
          {!currentUser && (
            <Link className="link" to="/login">
              <span>Sign in</span>
            </Link>
            )} 
            {currentUser && (
              <Link className='link' onClick={handleLogout}>
                <span>Sign out</span>
              </Link>
            )}

          {!currentUser?.isSeller && <span>Become a Seller </span>}
          {!currentUser && (
            <Link to="/register">
              <button>Join</button>
            </Link>
          )}
          {currentUser && (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src={currentUser.img || "/img/no-avatar.png"} alt="" />
              <span>{currentUser?.username}</span>
              {open && (
                <div className="options">
                  {currentUser?.isSeller && (
                    <>
                      <Link className="link" to="/mygigs">
                        Gigs
                      </Link>
                      <Link className="link" to="/add">
                        Add New Gig
                      </Link>
                    </>
                  )}
                  <Link className="link" to="/orders">
                    Orders
                  </Link>
                  <Link className="link" to="/messages">
                    Messages
                  </Link>
                  <Link className="link" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <Link className="link" to="/">
              <span>Graphics & Design</span>
            </Link>
            <Link className="link" to="/">
              <span>Video & Animation</span>
            </Link>
            <Link className="link" to="/">
              <span>Writing & Translation</span>
            </Link>
            <Link className="link" to="/">
              <span>AI Services</span>
            </Link>
            <Link className="link" to="/">
              <span>Digital Marketing</span>
            </Link>
            <Link className="link" to="/">
              <span>Music & Audio</span>
            </Link>
            <Link className="link" to="/">
              <span>Programming & Tech</span>
            </Link>
            <Link className="link" to="/">
              <span>Business</span>
            </Link>
            <Link className="link" to="/">
              <span>Lifestyle</span>
            </Link>
          </div>
          <hr />
        </>
      )}
    </div>
  );
}

export default Navbar