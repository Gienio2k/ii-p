<template>
  <v-dialog v-model="opened" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-toolbar dark color="blue darken-4">
      <v-btn icon dark @click="$emit('close')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>***REMOVED******REMOVED***timestampDate***REMOVED******REMOVED***</v-toolbar-title>
    </v-toolbar>
    <v-card class="dialogContent">***REMOVED******REMOVED***content***REMOVED******REMOVED***</v-card>
  </v-dialog>
</template>

<script>
export default ***REMOVED***
  name: "FeedbackDialog",
  props: ["opened", "timestampDate", "timestamp", "content"],
  data() ***REMOVED***
    return ***REMOVED******REMOVED***;
  ***REMOVED***,
***REMOVED***;
</script>

<style>
</style>