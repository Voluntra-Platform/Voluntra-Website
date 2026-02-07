import { useContext, useState } from "react"
import { EventContext } from "../context/EventContext.jsx"
import CreateEvent from "./CreateEvent"

function NgoDashboard() {
  const { events, deleteEvent } = useContext(EventContext)
  const [editIndex, setEditIndex] = useState(null)

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">NGO Dashboard</h1>
        <p className="text-gray-600">
          Create and manage events. Track registrations and sponsorships.
        </p>
      </div>

      {/* Create / Edit */}
      <CreateEvent editIndex={editIndex} setEditIndex={setEditIndex} />

      {/* Events List */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Your Events</h2>

        {events.length === 0 ? (
          <div className="bg-white p-6 rounded shadow text-center">
            <p className="text-gray-600 mb-2">
              You haven’t created any events yet.
            </p>
            <p className="text-sm text-gray-500">
              Use the form above to get started.
            </p>
          </div>
        ) : (
          <ul className="space-y-4">
            {events.map((event, index) => (
              <li
                key={index}
                className="bg-white p-4 rounded shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">{event.title}</h3>
                    <p className="text-sm text-gray-600">
                      {event.date} — {event.location}
                    </p>
                  </div>

                  <div className="flex gap-2">
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
                </div>

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => setEditIndex(index)}
                    className="btn btn-secondary"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteEvent(index)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default NgoDashboard
