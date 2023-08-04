export const getTimeDifferenceString = (startTimestamp: number, endTimestamp: number) => {
    const timeDifferenceInSeconds = Math.abs((endTimestamp - startTimestamp) / 1000);

    const days = Math.floor(timeDifferenceInSeconds / (60 * 60 * 24));
    const hours = Math.floor((timeDifferenceInSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((timeDifferenceInSeconds % (60 * 60)) / 60);
    const seconds = Math.floor(timeDifferenceInSeconds % 60);

    let result = "";
    let count = 0;

    if (days > 0 && count < 2) {
        result += `${days} days, `;
        count++;
    }
    if (hours > 0 && count < 2) {
        result += `${hours} hours, `;
        count++;
    }
    if (minutes > 0 && count < 2) {
        result += `${minutes} min, `;
        count++;
    }
    if (seconds > 0 && count < 2) {
        result += `${seconds} sec`;
    }

    // Remove trailing comma and space
    result = result.replace(/, $/, "");

    return result;
};
