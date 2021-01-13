<template>
  <v-app>
    <v-app-bar
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>Title</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
        <router-link to="/">Home</router-link>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              <router-link to="/">Home</router-link>
            </v-list-item-title>
          </v-list-item>

          <v-list-item @click="toAbout">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main style="min-height:700px">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {

  },
  data: () => ({
    drawer: false,
    group: null,
  }),
  methods:{
    toAbout(){
      alert('hello')
    }
  },
};
</script>

<style lang="less" scoped>

</style>