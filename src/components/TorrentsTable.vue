<template>
  <table class="torrents">
    <caption>Downloads</caption>
    <th class="name">Name</th>
    <th class="size">Size</th>
    <th class="percent">%</th>
    <th class="progress">Progress</th>
    <th class="state">State</th>
    <th class="downloaded">Downloaded</th>
    <th class="started">Started</th>
    <tr class="torrent" v-for="(torrent, index) in torrents" v-bind:key="torrent.id">
      <td class="name">{{torrent.name}}</td>
      <td class="size">{{formatBytes(torrent.size)}}</td>
      <td class="percent">
        {{Number(torrent.downloaded / torrent.size * 100).toFixed(2)}}%
      </td>
      <td class="progress">
        <progress v-bind:value="torrent.downloaded / torrent.size"></progress>
      </td>
      <td class="state">{{torrent.state.toLowerCase()}}</td>
      <td class="downloaded">{{formatBytes(torrent.downloaded)}}</td>
      <td class="started">

        <time v-if="torrent.started" v-bind:datetime="torrent.started">{{new Date(torrent.started).toLocaleString()}}</time>
        <span v-else>never</span>
      </td>
    </tr>
  </table>
</template>

<script>
import gql from 'graphql-tag';
import format from '../lib/format';

export default {
  name: 'TorrentsTable',
  data: () => {
    return {
      metadata: '',
      torrents: []
    }
  },
  apollo: {
    torrents: {
      query: gql`query {
        torrents {
          downloaded,
          id,
          name,
          size,
          downloaded,
          state,
          started
        }
      }`,
      pollInterval: 200
    }
  },
  methods: {
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
td.state {
  text-transform: capitalize;
}
th {
  background-color: lightgray;
}
tr:nth-child(even) {
  background-color: cyan;
}
</style>
