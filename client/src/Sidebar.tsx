// Navbar component
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';

import { AiFillHome } from 'react-icons/ai';
import { BiUserPlus } from 'react-icons/bi';
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';
import { RiSuitcaseLine } from 'react-icons/ri';
import { RxAvatar } from 'react-icons/rx';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  icon: JSX.Element;
  text?: string;
  view?: boolean;
  onClick?: () => void;
};

// TODO:
//   1. Make currentUser send as props to links in navbar
//   2. Implement sign out button in navbar
//   3. Remove buttons from home screen and display new content
//      if active user is present 

const Sidebar = () => {
  const [view, setView] = useState('');

  // Gets and sets user's view (light/dark) preference
  useEffect(() => {
    const viewMode = localStorage.getItem('view');
    if (viewMode) {
      setView(viewMode);
    } else {
      document.documentElement.classList.add('dark');
    }
  }, [view]);

  // Toggles view (light/dark) mode
  const toggleView = () => {
    if (!view) {
      localStorage.setItem('view', 'light');
      setView('dark');
      document.documentElement.classList.remove('dark');
    } else {
      localStorage.removeItem('view');
      setView('');
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <div
      className="sticky top-0 left-0 w-screen md:h-screen md:w-16 m-0 flex md:flex-col 
                  dark:bg-gray-900 text-white shadow-lg"
    >
      <Link to="/" aria-label="Home page" className="sidebar-icon">
        <SidebarIcon icon={<AiFillHome size="28" />} text="Home" />
      </Link>
      <Link to={'/careers'} aria-label="Careers page" className="sidebar-icon">
        <SidebarIcon icon={<RiSuitcaseLine size="28" />} text="Careers" />
      </Link>
      {/* {currentUser.username ? (
        <Link
          to={`/profile/placeholder`}
          aria-label="Profile page"
          className="sidebar-icon"
        >
          <SidebarIcon icon={<RxAvatar size="28" />} text="Profile" />
        </Link>
      ) : (
        <Link
          to={'/log-in'}
          aria-label="Log in or sign up"
          className="sidebar-icon"
        >
          <SidebarIcon
            icon={<BiUserPlus size="28" />}
            text="Log In / Sign Up"
          />
        </Link>
      )} */}
      <SidebarIcon
        icon={
          document.documentElement.classList.contains('dark') ? (
            <BsFillSunFill size="28" />
          ) : (
            <BsFillMoonStarsFill size="28" />
          )
        }
        aria-label="Toggle light or dark mode"
        text={
          document.documentElement.classList.contains('dark')
            ? 'Light Mode'
            : 'Dark Mode'
        }
        view={true}
        onClick={() => toggleView()}
      />
    </div>
  );
};

const SidebarIcon = ({
  icon,
  text = 'tooltip',
  view = false,
  onClick
}: Props) => {
  return (
    <div
      className={view ? 'sidebar-icon group view' : 'sidebar-icon group'}
      onClick={onClick}
    >
      {icon}
      <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
    </div>
  );
};

export default Sidebar;
