<template>
  <div class="session">
    <metadata-upload></metadata-upload>
    <torrents-table></torrents-table>
  </div>
</template>

<script>
import TorrentsTable from './TorrentsTable.vue';
import MetadataUpload from './MetadataUpload.vue';

export default {
  name: 'Session',
  components: {
    TorrentsTable,
    MetadataUpload
  },
}
</script>

<style scoped>

</style>
