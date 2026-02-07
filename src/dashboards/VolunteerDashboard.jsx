import { useContext, useState } from "react"
import { EventContext } from "../context/EventContext.jsx"
import EventCard from "../components/EventCard"

function VolunteerDashboard() {
  const { events } = useContext(EventContext)
  const [search, setSearch] = useState("")
  const [location, setLocation] = useState("")

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(search.toLowerCase()) &&
      event.location.toLowerCase().includes(location.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">
          Volunteer Dashboard
        </h1>
        <p className="text-gray-600">
          Discover events and register to make an impact.
        </p>
      </div>

      <div className="flex gap-4">
        <input
          className="border p-2 w-1/2 rounded"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          className="border p-2 w-1/2 rounded"
          placeholder="Filter by location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      {filteredEvents.length === 0 ? (
        <div className="bg-white p-6 rounded shadow text-center">
          <p className="text-gray-600 mb-1">
            No events match your search.
          </p>
          <p className="text-sm text-gray-500">
            Try adjusting filters or check back later.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredEvents.map((event, index) => (
            <EventCard key={index} event={event} index={index} />
          ))}
        </div>
      )}
    </div>
  )
}

export default VolunteerDashboard
