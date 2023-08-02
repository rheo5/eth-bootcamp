// verify.js
function verifyProof(proof, node, root, concat) {
    let result = node;

    for (const step of proof) {
        if (step.left) {
            result = concat(step.data, result);
        } else {
            result = concat(result, step.data);
        }
    }

    return result === root;
}

module.exports = verifyProof;