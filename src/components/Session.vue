<template>
  <div class="session">
    <metadata-upload></metadata-upload>
    <torrents-table></torrents-table>
    DL: {{formatBytes(session.downloadBytesPerSecond)}}/s
    UL: {{formatBytes(session.uploadBytesPerSecond)}}/s
  </div>
</template>

<script>
import gql from 'graphql-tag';
import TorrentsTable from './TorrentsTable.vue';
import MetadataUpload from './MetadataUpload.vue';
import format from '../lib/format';

export default {
  name: 'Session',
  components: {
    TorrentsTable,
    MetadataUpload
  },
  data: () => {
    return {
      session: {
        downloadBytesPerSecond: 0,
        uploadBytesPerSecond: 0
      },
    }
  },
  apollo: {
    session: {
      query: gql`query {
        session {
          downloadBytesPerSecond,
          uploadBytesPerSecond,
        }
      }`,
      pollInterval: 300
    }
  },
  methods: {
    formatBytes: format.bytes,
  }
}
</script>

<style scoped>

</style>
