<template>
  <span class="add-file">
    <span>Add a file: </span>
    <input type="file" ref="metadataFile" @change="selectedFile">
    <button @click="uploadMetadata">Download</button>
  </span>
</template>

<script>
import gql from 'graphql-tag';
import format from '../lib/format';

export default {
  name: 'MetadataUpload',
  data: () => {
    return {
      metadata: '',
    }
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
    },
    formatBytes: format.bytes,
  }
}
</script>

<style scoped>

</style>
