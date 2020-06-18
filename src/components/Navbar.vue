<template>
  <b-navbar wrapper-class="container main-navbar" type="is-primary">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="'home'">
        <img src="@/assets/logo.png" alt="Placeholder image" />
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="'home'">
        <span class="has-text-weight-bold is-capitalized is-size-4"
          >HACKFORALL</span
        >
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item href="/dash">
        Home
      </b-navbar-item>
      <b-navbar-item href="#">
        Documentation
      </b-navbar-item>
      <b-navbar-dropdown label="Info" :hoverable="true">
        <b-navbar-item href="#">
          About
        </b-navbar-item>
        <b-navbar-item href="#">
          Contact
        </b-navbar-item>
      </b-navbar-dropdown>
    </template>
    <template slot="end">
      <b-navbar-dropdown label="Info" :hoverable="true">
        <b-navbar-item href="#">
          About
        </b-navbar-item>
        <b-navbar-item href="#">
          Contact
        </b-navbar-item>
      </b-navbar-dropdown>
    </template>
  </b-navbar>
</template>
