import { useState, useContext, useEffect } from "react"
import { EventContext } from "../context/EventContext.jsx"

function CreateEvent({ editIndex, setEditIndex }) {
  const { events, addEvent, updateEvent } = useContext(EventContext)

  const [title, setTitle] = useState("")
  const [date, setDate] = useState("")
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    if (editIndex !== null) {
      const event = events[editIndex]
      setTitle(event.title)
      setDate(event.date)
      setLocation(event.location)
      setDescription(event.description)
    }
  }, [editIndex, events])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title || !date || !location || !description) {
      setError("All fields are required")
      return
    }

    const eventData = { title, date, location, description }

    if (editIndex !== null) {
      updateEvent(editIndex, eventData)
      setEditIndex(null)
    } else {
      addEvent(eventData)
    }

    setTitle("")
    setDate("")
    setLocation("")
    setDescription("")
    setError("")
  }

  return (
    <div className="max-w-md mx-auto mt-6 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center">
        {editIndex !== null ? "Edit Event" : "Create New Event"}
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          className="w-full border p-2 rounded mb-3 focus:ring-2 focus:ring-green-500"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="date"
          className="w-full border p-2 rounded mb-3 focus:ring-2 focus:ring-green-500"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded mb-3 focus:ring-2 focus:ring-green-500"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <textarea
          className="w-full border p-2 rounded mb-3 focus:ring-2 focus:ring-green-500"
          placeholder="Description"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {error && (
          <p className="text-red-600 text-sm mb-3">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {editIndex !== null ? "Update Event" : "Create Event"}
        </button>
      </form>
    </div>
  )
}

export default CreateEvent
