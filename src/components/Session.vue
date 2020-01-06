<template>
  <div class="session">
    <span class="add-file">
      <span>Add a file: </span>
      <input type="file" ref="metadataFile" @change="selectedFile">
      <button @click="uploadMetadata">Download</button>
    </span>

    <table class="torrents">
      <caption>Downloads</caption>
      <th class="name">Name</th>
      <th class="size">Size</th>
      <th class="percent">%</th>
      <th class="progress">Progress</th>
      <th class="downloaded">Downloaded</th>
      <th class="startedAt">Started at</th>
      <tr class="torrent" v-for="(torrent, index) in torrents" v-bind:key="torrent.id">
        <td class="name">{{torrent.name}}</td>
        <td class="size">{{formatBytes(torrent.size)}}</td>
        <td class="percent">
          {{Number(torrent.downloaded / torrent.size * 100).toFixed(2)}}%
        </td>
        <td class="progress">
          <progress v-bind:value="torrent.downloaded / torrent.size"></progress>
        </td>
        <td class="downloaded">{{formatBytes(torrent.downloaded)}}</td>
        <td class="startedAt">

          <time v-if="torrent.startedAt" v-bind:datetime="torrent.startedAt">{{new Date(torrent.startedAt).toLocaleString()}}</time>
          <span v-else>never</span>
        </td>
      </tr>
    </table>

  </div>
</template>

<script>
import gql from 'graphql-tag';
import format from '../lib/format';

export default {
  name: 'Session',
  data: () => {
    return {
      metadata: '',
      torrents: [{
        "downloaded": 181239808,
        "id": "3fe9aafd0bb6a90d79a4440d634fe79b3253e6a3",
        "name": "linuxmint-19.2-cinnamon-64bit.iso",
        "__typename": "Torrent",
        "size": 2009333760,
        "startedAt": "2019-07-29T16:48:42Z"
      },{
        "downloaded": 2345635,
        "id": "4fe9aafd0bb6a90d79a4440d634fe79b3253e6a3",
        "name": "hello world!",
        "__typename": "Torrent",
        "size": 2345635,
        "startedAt": "2019-07-29T16:48:42Z"
      }]
    }
  },
  // apollo: {
  //   torrents: gql`query {
  //     torrents {
  //       downloaded,
  //       id,
  //       name,
  //       size,
  //       downloaded,
  //       startedAt
  //     }
  //   }`,
  //   pollInterval: 300
  // },
  methods: {
    uploadMetadata: async function() {
      const result = await this.$apollo.mutate({
        mutation: gql`mutation ($meta: Binary!) {
          addTorrent(meta:$meta) {
            id,
            name,
            downloaded
          }
        }`,
        variables: {
          meta: this.metadata,
        },
      })
    },
    selectedFile: function() {

      let file = this.$refs.metadataFile.files[0];
      if(!file || file.type !== 'application/x-bittorrent') return;

      let reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = evt => {
        this.metadata = btoa(evt.target.result);
      }
      reader.onerror = () => {}
    },
    formatBytes: format.bytes,
  }
}
</script>

<style scoped>
table {
  text-align: left;
  border-collapse: collapse;
  margin: auto;
  width: 100%
}
td,
th {
  padding: 0.1rem 0.2rem;
}
.size,
.downloaded,
.percent {
  text-align: right;
}

.progress progress {
  width: 100%;
}
th {
  background-color: lightgray;
}
tr:nth-child(even) {
  background-color: cyan;
}
</style>
