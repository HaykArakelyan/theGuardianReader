export class Utils {
    public static formatDate(rawDate: string) {
        const date = new Date(rawDate);

        const day = date.getDay();
        const month = date.getMonth() + 1;
        const year = date.getFullYear().toString().slice(-2)

        return `${day}/${month}/${year}`
    }
}