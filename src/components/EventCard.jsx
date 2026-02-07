import { useContext } from "react"
import { EventContext } from "../context/EventContext.jsx"
import AuthContext from "../context/AuthContext.jsx"

function EventCard({ event, index }) {
  const { registerForEvent, sponsorEvent } = useContext(EventContext)
  const { user } = useContext(AuthContext)

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-5 relative">
      {/* Status badges */}
      <div className="absolute top-3 right-3 flex gap-2">
        {event.registered && (
          <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
            Registered
          </span>
        )}
        {event.sponsored && (
          <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
            Sponsored
          </span>
        )}
      </div>

      <h3 className="text-lg font-semibold mb-1">
        {event.title}
      </h3>

      <p className="text-sm text-gray-500">
        {event.date} • {event.location}
      </p>

      <p className="text-gray-700 mt-3 mb-4">
        {event.description}
      </p>

      {/* Volunteer */}
      {user?.role === "volunteer" && (
        event.registered ? (
          <button className="btn btn-disabled" disabled>
            Registered
          </button>
        ) : (
          <button
            onClick={() => registerForEvent(index)}
            className="btn btn-primary"
          >
            Register
          </button>
        )
      )}

      {/* Corporate */}
      {user?.role === "corporate" && (
        event.sponsored ? (
          <button className="btn btn-disabled" disabled>
            Sponsored
          </button>
        ) : (
          <button
            onClick={() => sponsorEvent(index)}
            className="btn btn-secondary"
          >
            Sponsor
          </button>
        )
      )}
    </div>
  )
}

export default EventCard
