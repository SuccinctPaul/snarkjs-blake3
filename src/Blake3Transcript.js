import {Scalar} from "ffjavascript";
import {hash} from "blake3";

const POLYNOMIAL = 0;
const SCALAR = 1;

export class Blake3Transcript {
    constructor(curve) {
        this.G1 = curve.G1;
        this.Fr = curve.Fr;

        this.reset();
    }

    reset() {
        this.data = [];
    }

    addPolCommitment(polynomialCommitment) {
        this.data.push({type: POLYNOMIAL, data: polynomialCommitment});
    }

    addScalar(scalar) {
        this.data.push({type: SCALAR, data: scalar});
    }

    getChallenge() {
        if(0 === this.data.length) {
            throw new Error("Blake3Transcript: No data to generate a transcript");
        }

        let nPolynomials = 0;
        let nScalars = 0;

        this.data.forEach(element => POLYNOMIAL === element.type ? nPolynomials++ : nScalars++);

        // modification: use the compressed representation
        let buffer = new Uint8Array(nScalars * this.Fr.n8 + nPolynomials * this.G1.F.n8);
        let offset = 0;

        for (let i = 0; i < this.data.length; i++) {
            if (POLYNOMIAL === this.data[i].type) {
                this.G1.toRprCompressed(buffer, offset, this.data[i].data);
                offset += this.G1.F.n8;
            } else {
                this.Fr.toRprBE(buffer, offset, this.data[i].data);
                offset += this.Fr.n8;
            }
        }

        console.log("Blake3 input: " + Buffer.from(buffer).toString("hex"));
        console.log("Blake3 output: " +hash(buffer).toString("hex"));

        const value = Scalar.fromRprBE(hash(buffer));
        return this.Fr.e(value);
    }
}