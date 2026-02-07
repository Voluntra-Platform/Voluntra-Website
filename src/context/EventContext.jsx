import { createContext, useState, useEffect } from "react"
import { getEvents, saveEvents } from "../services/eventService"

export const EventContext = createContext()

export function EventProvider({ children }) {
  const [events, setEvents] = useState(() => getEvents())

  useEffect(() => {
    saveEvents(events)
  }, [events])

  const addEvent = (event) => {
    setEvents((prev) => [
      ...prev,
      { ...event, registered: false, sponsored: false }
    ])
  }

  const updateEvent = (index, updatedEvent) => {
    setEvents((prev) =>
      prev.map((event, i) =>
        i === index ? { ...event, ...updatedEvent } : event
      )
    )
  }

  const deleteEvent = (index) => {
    setEvents((prev) => prev.filter((_, i) => i !== index))
  }

  const registerForEvent = (index) => {
    setEvents((prev) =>
      prev.map((event, i) =>
        i === index ? { ...event, registered: true } : event
      )
    )
  }

  const sponsorEvent = (index) => {
    setEvents((prev) =>
      prev.map((event, i) =>
        i === index ? { ...event, sponsored: true } : event
      )
    )
  }

  return (
    <EventContext.Provider
      value={{
        events,
        addEvent,
        updateEvent,
        deleteEvent,
        registerForEvent,
        sponsorEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  )
}
