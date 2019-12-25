module.exports = {
    load(readable) {
        return new Promise(function(resolve, reject) {
            const chuncks = [];
            readable.on('data', function(chunk) {
                chuncks.push(chunk);
            })
            readable.on('error', reject) 
            readable.on('end', function() {
                resolve(chuncks.length == 1 ? chuncks[0] : Buffer.from(chuncks));
            })
        })
    },

    async loadJSON(readable) {
        const data = await load(readable);
        if (data.length > 0) {
            return JSON.parse(data.toString('utf-8'));
        }
        return null;
    }
}
