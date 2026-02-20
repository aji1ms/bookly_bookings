export const generateSlots = (startHour = 9, endHour = 21, interval = 45) => {
    const slots = [];
    let current = new Date();
    current.setHours(startHour, 0, 0, 0);

    const end = new Date();
    end.setHours(endHour, 0, 0, 0);

    while (current < end) {
        const hours = current.getHours().toString().padStart(2, "0");
        const minutes = current.getMinutes().toString().padStart(2, "0");
        slots.push(`${hours}:${minutes}`);

        current.setMinutes(current.getMinutes() + interval);
    }

    return slots;
};