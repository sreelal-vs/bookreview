export const truncateText = (text, max) => {
        if (text.length > max) {
            return text.slice(0, max) + "..."
        } else {
            return text
        }
    }