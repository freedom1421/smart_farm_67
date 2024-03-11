<template>
  <v-card>
    <v-layout>
      <!-- Navigation Drawer -->
      <v-navigation-drawer expand-on-hover rail style="background-color: #0d3555; color: white; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <v-list dense nav>
          <v-list-item>
            <v-list-item>
              <v-list-item-title>Welcome</v-list-item-title>
              <v-list-item-subtitle>to smartfarm</v-list-item-subtitle>
            </v-list-item>
          </v-list-item>
          <hr>
          <v-list-item link to="/" prepend-icon="mdi-chart-donut-variant" title="Home" value="dashboard"></v-list-item>
          <v-list-item link to="/showcover" prepend-icon="mdi-chart-bar-stacked" title="Report" value="Report"></v-list-item>
          <v-list-item link to="/controller" prepend-icon="mdi-dip-switch" title="Control" value="Control"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <!-- Main Content -->
      <v-main style="min-height: 100vh;">
        <NuxtPage />
      </v-main>
    </v-layout>
  </v-card>
</template>

