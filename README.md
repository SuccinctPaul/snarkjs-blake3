
# A fork of snarkjs for BitVM experiments

This is a fork of [iden3/snarkjs](https://github.com/iden3/snarkjs), with the following changes.

- it uses Blake3 instead of Keccak for the transcript of fflonk.
- it allows fflonk to use dummy, fixed randomness given an environment variable `USE_FIXED_RANDOMNESS=1`, which is to facilitate testing.

Please refer to the original snarkjs for the detailed information. Credits should go to snarkjs, as our modifications are minor.

## License

Since snarkjs is part of the iden3 project, under copyright 2018 0KIMS association, and published with GPL-3 license.

This repository therefore conforms to the requirements of GPL-3. Please refer to the original repository for copyright information. 