import { Outlet } from 'react-router-dom';
import useTheme from '../../hooks/useTheme.js';
import AnnouncementBar from './AnnouncementBar.jsx';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import ScrollToHash from './ScrollToHash.jsx';

export default function Layout() {
  const { theme, toggle } = useTheme();
  return (
    <>
      <ScrollToHash />
      <AnnouncementBar />
      <Navbar theme={theme} onToggleTheme={toggle} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
