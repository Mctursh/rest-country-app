const ChunkCountries = (arr, sizePerChunk) => {
    const chunks = []
    for(let i = 0;i < arr.length;) {
        chunks.push(arr.slice(i, (sizePerChunk + i)))
        i += sizePerChunk
    }

    return chunks;
}

export const SearchAlgo = (arr, queryStr) => {
    let match = arr.filter(unit => unit.slice(0, queryStr.length).toLowerCase() == queryStr.toLowerCase())
    return match.sort()
}

export default ChunkCountries;