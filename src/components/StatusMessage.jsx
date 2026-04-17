import { CheckCircle, XCircle } from "lucide-react";

// Accepts two status shapes:
// 1. Object: { type: 'success'|'error', message: string }  (used by event forms)
// 2. String: 'success' | error_string  (used by contact/donation forms)
const StatusMessage = ({ status, successMessage = "", errorPrefix = "" }) => {
    if (!status) return null;

    let isSuccess, message;
    if (typeof status === "object") {
        isSuccess = status.type === "success";
        message = status.message;
    } else {
        isSuccess = status === "success";
        message = isSuccess ? successMessage : `${errorPrefix}${status}`;
    }

    const colorClass = isSuccess ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700";
    const Icon = isSuccess ? CheckCircle : XCircle;

    return (
        <div className={`p-3 rounded-lg mb-4 flex items-center ${isSuccess ? "font-semibold" : ""} ${colorClass}`}>
            <Icon size={20} className="mr-3 shrink-0" />
            <span>{message}</span>
        </div>
    );
};

export default StatusMessage;
