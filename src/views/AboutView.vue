<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script setup>
import * as resApi from "../service/RequestApi";

const getdata = function () {
  resApi.test();
};

getdata();
</script>

<style>

</style>
