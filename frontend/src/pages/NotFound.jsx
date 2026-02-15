import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-300">404</h1>
                <p className="text-2xl font-semibold text-gray-700 mt-4">Page Not Found</p>
                <p className="text-gray-500 mt-2">The page you're looking for doesn't exist.</p>
                <Link to="/" className="btn btn-primary mt-6">
                    Go Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
