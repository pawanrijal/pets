
export function encryptAES(plainText, key) {
    // Convert key and plaintext to byte arrays
    let keyBytes = stringToByteArray(key);
    let plainBytes = stringToByteArray(plainText);

    // Create 4x4 state array and copy plaintext bytes to it
    let state = [[]];
    for (let i = 0; i < 16; i++) {
        state[i % 4][Math.floor(i / 4)] = plainBytes[i];
    }

    // Expand key using key schedule
    let expandedKey = expandKey(keyBytes);

    // Add round key for round 0
    addRoundKey(state, expandedKey.slice(0, 16));

    // Perform 9 rounds of encryption
    for (let round = 1; round < 10; round++) {
        subBytes(state);
        shiftRows(state);
        mixColumns(state);
        addRoundKey(state, expandedKey.slice(round * 16, (round + 1) * 16));
    }

    // Perform final round of encryption
    subBytes(state);
    shiftRows(state);
    addRoundKey(state, expandedKey.slice(160, 176));

    // Convert state array to byte array
    let encryptedBytes = new Uint8Array(16);
    for (let i = 0; i < 16; i++) {
        encryptedBytes[i] = state[i % 4][Math.floor(i / 4)];
    }

    // Convert the encrypted bytes to a hexadecimal string
    let encryptedHex = bytesToHexString(encryptedBytes);

    return encryptedHex;
}


