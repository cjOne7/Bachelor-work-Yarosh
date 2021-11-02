<template>
  <div class="modal-alert" :class="{'modal-active': successAlert, 'modal-not-active': !successAlert}">
    <div class="modal-cont">
      <span class="close" @click="successAlert = false">&times;</span>
      <p><i class="fa fa-check"></i> Event successfully created!</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "AlertMessage",
  data() {
    return {
      successAlert: false
    }
  },
  methods: {
    showAlert(value) {
      this.successAlert = value;
    }
  },
  created() {
    this.$parent.$on('show-alert', this.showAlert);
  }
}
</script>

<style scoped lang="scss">
.modal-active {
  @include showAlertMessage(1, translateY(80%), 2s);
}

.modal-not-active {
  @include showAlertMessage(0, translateY(-80%), 2s);
}

$left  : 25%;
$width : 100% - $left * 2;

.modal-alert {
  display  : block;
  position : fixed;
  z-index  : 1;
  left     : $left;
  top      : 5%;
  width    : $width;
  overflow : auto;
}

.modal-cont {
  color            : #270;
  background-color : #DFF2BF;
  @include px($indent * 2);
  @include py($indent * 2);
  width            : 100%;
  border-radius    : 0.4em;
}

p {
  margin : 0;
}

.close {
  color       : #aaa;
  float       : right;
  font-size   : 28px;
  font-weight : bold;
  line-height : 0.75;

  &:hover, &:focus {
    color           : black;
    text-decoration : none;
    cursor          : pointer;
  }
}
</style>