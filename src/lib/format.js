export default {
  bytes: function(bytes) {
    if (bytes < 2**10) { return bytes + " B"}
    else if (bytes < 2**20) { return (bytes / 2**10).toFixed(2) + " KiB" }
    else if (bytes < 2**30) { return (bytes / 2**20).toFixed(2) + " MiB" }
    else if (bytes < 2**40) { return (bytes / 2**30).toFixed(2) + " GiB" }
    else { return (bytes / 2**40).toFixed(2) + " TiB" }
  }
}
