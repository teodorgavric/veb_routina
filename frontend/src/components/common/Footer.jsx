import logo from '../../assets/images/routina-logo.svg';

function Footer() {
  return (
    <footer style={{ background: '#fff', borderTop: '1px solid #f0f0f0', padding: '32px 0' }}>
      <div className="container text-center">
        <img src={logo} alt="Routina" style={{ height: '28px', marginBottom: '12px' }} />
        <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: 0 }}>
          © 2026 Routina. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;