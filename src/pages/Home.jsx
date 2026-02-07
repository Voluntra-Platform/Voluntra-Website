function Home() {
  return (
    <div className="bg-white rounded-lg shadow p-12 text-center">
      <h1 className="text-5xl font-bold text-green-700 mb-4">
        Voluntra
      </h1>

      <p className="text-xl text-gray-600 mb-8">
        A platform connecting NGOs, Volunteers, and Corporates
        to create real-world social impact.
      </p>

      {/* Single Auth Button */}
      <div className="flex justify-center mb-10">
        <a
          href="/auth"
          className="btn btn-primary"
        >
          Get Started
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        <div className="p-4 border rounded">
          <h3 className="font-bold mb-2 text-green-700">
            NGOs
          </h3>
          <p className="text-sm text-gray-600">
            Create events, manage participation, and track support.
          </p>
        </div>

        <div className="p-4 border rounded">
          <h3 className="font-bold mb-2 text-green-700">
            Volunteers
          </h3>
          <p className="text-sm text-gray-600">
            Discover events and contribute to meaningful causes.
          </p>
        </div>

        <div className="p-4 border rounded">
          <h3 className="font-bold mb-2 text-green-700">
            Corporates
          </h3>
          <p className="text-sm text-gray-600">
            Sponsor initiatives and support social responsibility.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home
