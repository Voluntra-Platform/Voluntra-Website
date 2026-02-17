import { createContext, useState, useEffect } from "react"

export const EventContext = createContext()

export function EventProvider({ children }) {
  const [events, setEvents] = useState(() => {
    const stored = localStorage.getItem("events")
    return stored ? JSON.parse(stored) : []
  })

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events))
  }, [events])

  const addEvent = (event) => {
    setEvents([...events, { ...event, id: Date.now() }])
  }

  const registerForEvent = (id) => {
    setEvents(events.map(e =>
      e.id === id ? { ...e, registered: true } : e
    ))
  }

  const requestSponsorship = (id, sponsorship) => {
    setEvents(events.map(e =>
      e.id === id
        ? {
            ...e,
            sponsorship,
            sponsorshipStatus: "pending"
          }
        : e
    ))
  }

  const approveSponsorship = (id) => {
    setEvents(events.map(e =>
      e.id === id
        ? { ...e, sponsorshipStatus: "approved" }
        : e
    ))
  }

  return (
    <EventContext.Provider
      value={{
        events,
        addEvent,
        registerForEvent,
        requestSponsorship,
        approveSponsorship
      }}
    >
      {children}
    </EventContext.Provider>
  )
}
