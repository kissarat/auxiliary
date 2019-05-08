function *compress(items) {
  let last;
  for (const item of items) {
    if (last) {
      const changes = {};
      for(const key in item) {
        if (item[key] !== last[key]) {
          changes[key] = item[key];
        }
      }
      for(const key in changes) {
        if (changes[key]) {
          yield changes;
          break;
        }
      }
    }
    else {
      last = item;
    }
  }
}
