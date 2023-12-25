export function getEventBackgroundClass() {
    const currentMonth = new Date().getMonth() + 1;
    const monthEventBackgroundClassMap = {
        "12": "event-background-christmas",
        "1": "event-background-christmas",
    };
    return monthEventBackgroundClassMap[currentMonth];
}