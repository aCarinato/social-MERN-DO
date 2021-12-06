import { useContext } from 'react';
import Link from 'next/link';
import { UserContext } from '../context';
import { useRouter } from 'next/router';

export default function Nav() {
  const [state, setState] = useContext(UserContext);

  const router = useRouter();

  const logout = () => {
    window.localStorage.removeItem('auth');
    setState(null);
    router.push('/login');
  };

  return (
    <nav
      className="nav d-flex justify-content-end"
      style={{ backgroundColor: 'blue' }}
    >
      <Link href="/">
        <a className="nav-link text-light">Home</a>
      </Link>

      <Link href="/login">
        <a className="nav-link text-light">Login</a>
      </Link>

      <Link href="/register">
        <a className="nav-link text-light">Register</a>
      </Link>

      <a onClick={logout} className="nav-link text-light">
        Logout
      </a>
    </nav>
  );
}
