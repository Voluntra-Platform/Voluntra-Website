import { useContext, useState } from "react"
import { EventContext } from "../context/EventContext.jsx"
import AuthContext from "../context/AuthContext.jsx"
import SponsorModal from "./SponsorModal.jsx"

function EventCard({ event }) {
  const { registerForEvent } = useContext(EventContext)
  const { user } = useContext(AuthContext)
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="bg-white rounded-lg shadow p-5">

      <h3 className="text-lg font-semibold">
        {event.title}
      </h3>

      <p className="text-sm text-gray-500">
        {event.date} • {event.location}
      </p>

      <p className="mt-3 text-gray-700">
        {event.description}
      </p>

      {/* CORPORATE VIEW */}
      {user?.role === "corporate" && (
        <>
          {!event.sponsorshipStatus && (
            <>
              <button
                onClick={() => setShowModal(true)}
                className="btn btn-secondary"
              >
                Sponsor
              </button>

              {showModal && (
                <SponsorModal
                  eventId={event.id}
                  onClose={() => setShowModal(false)}
                />
              )}
            </>
          )}

          {event.sponsorshipStatus === "pending" && (
            <span className="text-yellow-600 font-semibold">
              Sponsorship Pending Approval
            </span>
          )}

          {event.sponsorshipStatus === "approved" && (
            <div className="mt-3 bg-blue-50 p-3 rounded">
              <p className="font-semibold text-blue-700">
                Sponsored (Approved)
              </p>
              <p>Amount: ₹{event.sponsorship.amount}</p>
              <p>Type: {event.sponsorship.type}</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default EventCard
