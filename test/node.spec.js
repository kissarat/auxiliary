const { load } = require('../lib/node');
const { Readable, Writable } = require('stream');

describe('node', () => {
    // it('load', () => {
    //     const strings = [
    //         '06d90b1f-9d7b-41cd-91af-abe1bde8a928',
    //         '4a1341eb-0843-4932-9224-721648df036d',
    //         '69231a1d-f7f9-46a8-826e-474521053659'
    //     ];
    //     const expected = Buffer.from(strings.join(''), 'utf-8');
    //     const writable = new Writable();
    //     const readable = new Readable();
    //     writable.pipe(readable);
    //     load(readable)
    //         .then(actual => expect(actual.equals(expected)).toBeTrue());
    //     for(const string of strings) {
    //         writable.write(Buffer.from(string, 'utf-8'));
    //     }
    //     writable.end();
    // });
});
