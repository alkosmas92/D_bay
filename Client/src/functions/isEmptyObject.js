export default function isEmptyObject(obj) {
    return JSON.stringify(obj) === "{}";
}
