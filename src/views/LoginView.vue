<template>
  <div class="login">
    <h1>This is the login page</h1>
  </div>
</template>

<script>
export default {
  name: 'LoginView',

  // Called right after the component instance is created.
  created() {
    console.log('Lifecycle: created');
    console.log('Component data at created:', this.$data);
    console.log('Route query parameters at created:', this.$route.query);
  },

  // Called when the component is about to be mounted (before rendering).
  beforeMount() {
    console.log('Lifecycle: beforeMount');
  },

  // Called right after the component has been mounted (rendered).
  mounted() {
    console.log('Lifecycle: mounted');
    console.log('Component data at mounted:', this.$data);
    console.log('Route query parameters at mounted:', this.$route.query);
  },

  // Called before the component updates (re-renders).
  beforeUpdate() {
    console.log('Lifecycle: beforeUpdate');
  },

  // Called after the component has been updated (re-rendered).
  updated() {
    console.log('Lifecycle: updated');
  },

  // Called when the component is about to be destroyed.
  beforeDestroy() {
    console.log('Lifecycle: beforeDestroy');
  },

  // Called after the component has been destroyed.
  destroyed() {
    console.log('Lifecycle: destroyed');
  }
}
</script>
