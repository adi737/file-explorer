function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl text-center text-gray-800 mb-6">
          404 - Page Not Found
        </h1>
        <p className="text-lg text-gray-600 text-center mb-6">
          Oops! The page you are looking for does not exist.
        </p>
        <p className="text-center">
          <a href="/" className="text-blue-500 hover:underline">
            Go back to home
          </a>
        </p>
      </div>
    </div>
  );
}

export default ErrorPage;
