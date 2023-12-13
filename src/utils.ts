import { crc8 } from "./crc8";

export function checksum(num: string): string {
    return crc8(Buffer.from(num, 'hex')).toString(16).padStart(2, "0");
}

export const toLabel = (num: number): string => {
    if (num < 0 || num > 65535) {
        throw new Error(
            `Label ${num} out of range: min label 1 - max label 65535.`,
        );
    }
    const numHex = num.toString(16).padStart(4, "0");
    return "0" + numHex + checksum(numHex) + "0";
}