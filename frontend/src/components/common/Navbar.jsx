import { Navbar as BSNavbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BarChart2, CalendarDays, User, Shield, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/images/routina-logo.svg';

const NAV_LINKS = [
  { to: '/dashboard', Icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/stats',     Icon: BarChart2,       label: 'Stats'     },
  { to: '/calendar',  Icon: CalendarDays,    label: 'Calendar'  },
  { to: '/profile',   Icon: User,            label: 'Profile'   },
];

const navLinkStyle = ({ isActive }) => ({
  color: isActive ? '#FF3381' : '#6b7280',
  fontWeight: isActive ? 600 : 400,
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  padding: '8px 16px',
  borderRadius: '8px',
  fontSize: '0.92rem',
  whiteSpace: 'nowrap',
  transition: 'color 0.15s',
});

function Navbar() {
  const { isAdmin, logout } = useAuth();

  return (
    <BSNavbar
      bg="white"
      expand="md"
      sticky="top"
      style={{ borderBottom: '1px solid #f0f0f0', zIndex: 100 }}
    >
      <Container>
        <BSNavbar.Brand style={{ padding: 0, marginRight: '16px' }}>
          <img src={logo} alt="Routina" style={{ height: '36px' }} />
        </BSNavbar.Brand>

        <BSNavbar.Toggle aria-controls="main-navbar" />

        <BSNavbar.Collapse id="main-navbar">
          <Nav className="mx-auto align-items-center">
            {NAV_LINKS.map(({ to, Icon, label }) => (
              <NavLink key={to} to={to} style={navLinkStyle}>
                <Icon size={17} />
                {label}
              </NavLink>
            ))}
          </Nav>

          <Nav className="align-items-center gap-2">
            {isAdmin && (
              <NavLink
                to="/admin"
                style={{
                  color: '#FF7D00',
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 12px',
                  fontSize: '0.92rem',
                }}
              >
                <Shield size={17} />
                Admin
              </NavLink>
            )}
            <button
              className="btn-outline-brand"
              style={{ padding: '6px 14px', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '6px' }}
              onClick={logout}
            >
              <LogOut size={15} />
              Logout
            </button>
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
}

export default Navbar;