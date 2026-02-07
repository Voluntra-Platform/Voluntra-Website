// This file will later talk to backend APIs
// For now, it uses localStorage (mock backend)

export function getEvents() {
  const storedEvents = localStorage.getItem("events")
  return storedEvents ? JSON.parse(storedEvents) : []
}

export function saveEvents(events) {
  localStorage.setItem("events", JSON.stringify(events))
}
