/**
 * @param {String|number} input
 * @return Number|NaN
 */
function customParseInt(input) {
    if (input instanceof Number || (typeof input === "number")) {
        return Math.floor(input);
    }

    if (input instanceof String || (typeof input === "string")) {
        let parts = input.match(/^\d+/);
        return parts ? +parts[0] : NaN;
    }

    return NaN;
}


console.assert(customParseInt("1") === 1, "check simple int");
console.assert(customParseInt("1a") === 1, "check int from beginning");
console.assert(customParseInt(1) === 1, "check int as input");

console.assert(Number.isNaN(customParseInt("a")), "check string without int");
console.assert(Number.isNaN(customParseInt("a1")), "check str from beginning");
console.assert(Number.isNaN(customParseInt("")), "check empty str");
console.assert(Number.isNaN(customParseInt([])), "check not str");