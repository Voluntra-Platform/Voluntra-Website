import { useState, useContext } from "react"
import { EventContext } from "../context/EventContext.jsx"

function SponsorModal({ eventId, onClose }) {
  const { requestSponsorship } = useContext(EventContext)

  const [amount, setAmount] = useState("")
  const [type, setType] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    requestSponsorship(eventId, {
      amount: Number(amount),
      type,
      message,
      date: new Date().toISOString().split("T")[0]
    })

    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-4">
          Sponsorship Details
        </h2>

        <input
          required
          type="number"
          className="w-full border p-2 mb-3"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          required
          className="w-full border p-2 mb-3"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">Select Type</option>
          <option value="Bronze">Bronze</option>
          <option value="Silver">Silver</option>
          <option value="Gold">Gold</option>
        </select>

        <textarea
          className="w-full border p-2 mb-3"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-secondary">
            Submit Request
          </button>
        </div>
      </form>
    </div>
  )
}

export default SponsorModal
