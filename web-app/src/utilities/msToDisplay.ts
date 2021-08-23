export const msToDisplay  = (time: number) => {
    return new Date(time).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"});
}