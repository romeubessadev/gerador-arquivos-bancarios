export class DateUtil {
    static formatDate(date) {
        let parts = date.split("/");
        return new Date(parts[2], parts[1] - 1, parts[0]);
    }
}