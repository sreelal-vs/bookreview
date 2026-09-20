

export const truncateText = (text, max) => {
        if (text.length > max) {
            return text.slice(0, max) + "..."
        } else {
            return text
        }
    }

    
    const reportReasons = [
        { id: "harassment", label: "Harassment or bullying" },
        { id: "hate_speech", label: "Hate speech" },
        { id: "spam", label: "Spam or misleading" },
        { id: "violence", label: "Violence or dangerous content" },
        { id: "false_info", label: "False information" }
    ]


export const reasonsLabel = (id) => {
    return reportReasons.find(i=>i.id == id)?.label ?? "unknown";
}

