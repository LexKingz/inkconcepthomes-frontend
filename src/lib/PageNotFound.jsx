import { useLocation, Link } from 'react-router-dom';

export default function PageNotFound() {
  const location = useLocation();
  const pageName = location.pathname;

  return (
    <div className="min-h-screen flex items-center justify-center bg-obsidian px-6">
      <div className="text-center max-w-xl">
        <h1 className="text-7xl font-display text-gold mb-6">404</h1>

        <h2 className="text-3xl font-display text-alabaster mb-4">
          Page Not Found
        </h2>

        <p className="text-alabaster/60 mb-8">
          The page <span className="text-gold">{pageName}</span> does not exist.
        </p>

        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 border border-gold/30 text-gold hover:bg-gold hover:text-obsidian transition-all duration-300"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}