<template>
  <q-layout view="lHh Lpr lFf" class="shadow-2 rounded-borders">
    <q-header elevated class="bg-grey-9">
      <q-toolbar>
        <q-toolbar-title>
          Community Driven Alternate Risk Coverage
        </q-toolbar-title>
        <div>MVP - Technical Feasibility</div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",
  components: {},
  data() {
    return {};
  },
};
</script>
