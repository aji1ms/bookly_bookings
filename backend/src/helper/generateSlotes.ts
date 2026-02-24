export const generateSlots = (
    startHour: number = 9,
    endHour: number = 21,
    interval: number = 45
): string[] => {
    const slots: string[] = [];
    
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