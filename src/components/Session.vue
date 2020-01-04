<template>
  <div class="session">
    <div class="add-file">
      <input type="file" ref="metadataFile" @change="selectedFile">
      <button @click="uploadMetadata">Download</button>
    </div>
    <table class="torrents">
      <th>Name</th>
      <th>Progress</th>
      <tr v-for="(torrent, index) in torrents" v-bind:key="torrent.id">
        <td>{{torrent.name}}</td>
        <td><progress v-bind:value="torrent.downloaded" v-bind:max="torrent.downloaded + torrent.left"></progress></td>
      </tr>
    </table>

  </div>
</template>

<script>
import gql from 'graphql-tag';

export default {
  name: 'Session',
  data: () => {
    return {
      metadata: '',
      torrents: []
    }
  },
  apollo: {
    torrents: gql`query {
      torrents {
        downloaded,
        id,
        name
      }
    }`,
    pollInterval: 300
  },
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
    }
  }
}
</script>

<style scoped>
.torrents {
  text-align: left;
}
</style>
