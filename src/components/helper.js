const ChunkCountries = (arr, sizePerChunk) => {
    const chunks = []
    for(let i = 0;i < arr.length;) {
        chunks.push(arr.slice(i, (sizePerChunk + i)))
        i += sizePerChunk
    }

    return chunks;
}

export default ChunkCountries;