import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.scss'

const Navbar = () => {
    const [active, setActive] = useState(false);
    const [open, setOpen] = useState(false);

    const {pathname} = useLocation()

    const isActive = () => {
        window.scrollY ? setActive(true) : setActive(false)
    }

    useEffect(()=>{
        window.addEventListener('scroll', isActive);

        return () => {
            window.addEventListener('scroll', isActive )
        }
    }, []);

    const currentUser = {
        id: 1,
        username: 'Abeer',
        isSeller: true,
    }

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
          <span>Sign in</span>
          {!currentUser?.isSeller && <span>Become a Seller </span>}
          {!currentUser && <button>Join</button>}
          {currentUser && (
            <div className="user" onClick={() => setOpen(!open)}>
              <img
                src="https://images.pexels.com/photos/867349/pexels-photo-867349.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
              />
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
                  <Link className="link" to="/">
                    Logout
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {(active || pathname !=='/') && (
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
        </>
      )}
    </div>
  );
}

export default Navbar