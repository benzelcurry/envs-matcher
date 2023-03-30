// Navbar component
import { useState, useEffect } from 'react';

import { AiFillHome } from 'react-icons/ai';
import { BsFillMoonStarsFill } from 'react-icons/bs';
import { RiSuitcaseLine } from 'react-icons/ri';
import { RxAvatar } from 'react-icons/rx';

interface ParentProps {
  toggle: Function;
}

type Props = React.HTMLAttributes<HTMLDivElement> & {
  icon: JSX.Element;
  text?: string;
  dark?: boolean;
  onClick?: () => void;
};

const Sidebar = ({ toggle }: ParentProps) => {
  const [view, setView] = useState('');

  useEffect(() => {
    const viewValue = localStorage.getItem('view');
    if (viewValue) {
      setView(viewValue);
    }
  }, [view]);

  return (
    <div
      className="sticky top-0 left-0 w-screen md:h-screen md:w-16 m-0 flex md:flex-col 
                  dark:bg-gray-900 text-white shadow-lg"
    >
      <SidebarIcon icon={<AiFillHome size="28" />} text="Home" />
      <SidebarIcon icon={<RiSuitcaseLine size="28" />} text="Careers" />
      <SidebarIcon icon={<RxAvatar size="28" />} text="Profile" />
      <SidebarIcon
        icon={<BsFillMoonStarsFill size="28" />}
        text="Dark Mode"
        dark={true}
        onClick={() => toggle()}
      />
    </div>
  );
};

const SidebarIcon = ({
  icon,
  text = 'tooltip',
  dark = false,
  onClick
}: Props) => {
  return (
    <div
      className={dark ? 'sidebar-icon group dark' : 'sidebar-icon group'}
      onClick={onClick}
    >
      {icon}
      <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
    </div>
  );
};

export default Sidebar;