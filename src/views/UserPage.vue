<template>
  <div class="container">
    <div class="card elevation-2">
      <div class="card__left">
        <div>
          <h1>{{getUserInfo.name}} {{getUserInfo.surname}}</h1>
        </div>
        <div>
          Номер документа - {{getUserInfo.documentNumber}}
        </div>
        <div>
          Телефон - {{getUserInfo.phoneNumber}}
        </div>
      </div>
      <div class="card__right">
        <div>
          {{getUserInfo.autoNumber}}
        </div>
        <div>
          {{getUserInfo.gunType}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: "UserPage",
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters({
      getUserInfo: 'getUserInfo',
      getUserEntries: 'getUserEntries',
    })
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 800px;
  margin: auto;
}
.card {
  padding: 20px;
  width: 750px;
  margin: auto;
  display: flex;
  &__left {
    width: 70%;
  }
  &__right {
    width: 30%;
    background-color: #F7F8FA;
    & > div {
      padding: 16px;
      font-size: 14px;
      color: #38455d;
    }
  }

}
</style>
