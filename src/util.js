
export default function arrayForEach(array, cb, target) {
    let i;
    for (i = 0; i < array.length; i += 1) {
        if (target) {
            cb.apply(target, [array[i], i, array]);
        } else {
            cb(array[i], i, array);
        }
    }
}
