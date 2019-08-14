<template>
  <div id="app">
    <Tree :tree="tree"/>
  </div>
</template>

<script>

import Tree from '@/components/tree'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'app',
  components: {
    Tree
  },
  computed: {
    ...mapGetters([
      'tree',
    ])
  },
  mounted() {
    //data fetch
    this.fetchList();
  },
  methods: {
    ...mapActions({fetchList: 'fetch'})
  },
}
</script>

<style>
</style>
