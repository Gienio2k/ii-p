<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <br />
        <br />
        <router-link to="/">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-home</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Główna</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link to="feedback">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-comment-quote</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Feedback</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <div id="theme_change_btn">
          <v-list-item>
            <v-list-item-action>
              <v-switch @click="theme_change" icon v-model="$vuetify.theme.dark"></v-switch>
              <v-icon>mdi-brightness-4</v-icon>
            </v-list-item-action>
          </v-list-item>
        </div>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app clipped-left color="dark">
      <v-app-bar-nav-icon large @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <h1 :class="[$vuetify.theme.dark ? 'dark_logo' : 'light_logo', 'logo']">IIP</h1>
    </v-app-bar>

    <v-main>
      <br />
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default ***REMOVED***
  name: "App",

  components: ***REMOVED******REMOVED***,

  data() ***REMOVED***
    return ***REMOVED***
      drawer: null,
    ***REMOVED***;
  ***REMOVED***,

  methods: ***REMOVED***
    theme_change() ***REMOVED***
      if (localStorage.getItem("dark")) ***REMOVED***
        localStorage.setItem(
          "dark",
          localStorage.getItem("dark") == "true" ? "false" : "true"
        );
      ***REMOVED*** else ***REMOVED***
        localStorage.setItem("dark", "false");
      ***REMOVED***
    ***REMOVED***,
  ***REMOVED***,
  created() ***REMOVED***
    if (localStorage.getItem("dark")) ***REMOVED***
      this.$vuetify.theme.dark =
        localStorage.getItem("dark") == "true" ? true : false;
    ***REMOVED***
  ***REMOVED***,
***REMOVED***;
</script>

<style lang="scss">
@font-face ***REMOVED***
  font-family: RobotoSlab;
  src: url(./assets/RobotoSlab-Regular.ttf);
***REMOVED***

/// Stroke font-character
/// @param  ***REMOVED***Integer***REMOVED*** $stroke - Stroke width
/// @param  ***REMOVED***Color***REMOVED***   $color  - Stroke color
/// @return ***REMOVED***List***REMOVED***            - text-shadow list
@function stroke($stroke, $color) ***REMOVED***
  $shadow: ();
  $from: $stroke * -1;
  @for $i from $from through $stroke ***REMOVED***
    @for $j from $from through $stroke ***REMOVED***
      $shadow: append($shadow, $i * 1px $j * 1px 0 $color, comma);
    ***REMOVED***
  ***REMOVED***
  @return $shadow;
***REMOVED***
/// Stroke font-character
/// @param  ***REMOVED***Integer***REMOVED*** $stroke - Stroke width
/// @param  ***REMOVED***Color***REMOVED***   $color  - Stroke color
/// @return ***REMOVED***Style***REMOVED***           - text-shadow
@mixin stroke($stroke, $color) ***REMOVED***
  text-shadow: stroke($stroke, $color);
***REMOVED***

.logo ***REMOVED***
  font-size: 72px;
  font-family: RobotoSlab;
  margin-top: 45px;
  margin-left: 15px;
  user-select: none;
***REMOVED***

.light_logo ***REMOVED***
  @include stroke(5px, #ffffff);
  color: #272727;
***REMOVED***

.dark_logo ***REMOVED***
  @include stroke(5px, #272727);
  color: #ffffff;
***REMOVED***

#theme_change_btn ***REMOVED***
  float: right;
  align-self: flex-end;
***REMOVED***

a ***REMOVED***
  text-decoration: unset;
***REMOVED***
</style>
