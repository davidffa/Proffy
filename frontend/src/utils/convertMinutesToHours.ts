export default function convertMinutesToHours(minutes: string) {
    const mins = parseInt(minutes);

    let hour = Math.floor((mins/60)).toString();
    if (hour.length === 1)
        hour = `0${hour}`;
    
    let min = Math.floor((mins%60)).toString();
    if (min.length === 1)
        min = `0${min}`;

    return `${hour}:${min}`;
}