<template>
  <el-drawer
    title="Terms"
    :visible.sync="visible"
    direction="rtl"
    custom-class="terms"
    size=""
  >
    <el-container>
      <el-main>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Adipiscing enim eu
        turpis egestas. At tellus at urna condimentum mattis pellentesque id.
        Quam adipiscing vitae proin sagittis nisl rhoncus mattis. Sollicitudin
        nibh sit amet commodo. Dignissim enim sit amet venenatis urna. Lacus
        vestibulum sed arcu non odio euismod lacinia. Commodo nulla facilisi
        nullam vehicula ipsum a. Vulputate dignissim suspendisse in est ante.
        Cursus in hac habitasse platea. Nisl suscipit adipiscing bibendum est
        ultricies integer. Leo in vitae turpis massa sed elementum tempus
        egestas sed. Id cursus metus aliquam eleifend. Cursus vitae congue
        mauris rhoncus aenean vel elit scelerisque mauris. Eget dolor morbi non
        arcu. Cursus in hac habitasse platea dictumst quisque sagittis.
        Malesuada fames ac turpis egestas integer eget aliquet nibh praesent.
        Dolor sed viverra ipsum nunc aliquet bibendum enim facilisis. Sed arcu
        non odio euismod. Cursus mattis molestie a iaculis at erat pellentesque
        adipiscing commodo. Eget egestas purus viverra accumsan in nisl.
        Pellentesque habitant morbi tristique senectus et netus. Viverra tellus
        in hac habitasse platea dictumst. Sit amet nisl suscipit adipiscing
        bibendum est ultricies integer quis. Quis vel eros donec ac odio tempor
        orci dapibus. Donec adipiscing tristique risus nec feugiat in fermentum.
        Diam phasellus vestibulum lorem sed risus. Aliquet eget sit amet tellus
        cras adipiscing. Scelerisque varius morbi enim nunc faucibus a. Mattis
        ullamcorper velit sed ullamcorper morbi. Sollicitudin aliquam ultrices
        sagittis orci a scelerisque. Quis varius quam quisque id diam. In
        fermentum et sollicitudin ac orci phasellus. Duis at consectetur lorem
        donec massa sapien. Non sodales neque sodales ut etiam sit. Elit
        pellentesque habitant morbi tristique senectus. Amet est placerat in
        egestas erat imperdiet sed euismod nisi. Commodo viverra maecenas
        accumsan lacus. Eleifend quam adipiscing vitae proin sagittis. Volutpat
        lacus laoreet non curabitur gravida arcu. Dui accumsan sit amet nulla
        facilisi morbi tempus iaculis. Eu mi bibendum neque egestas. Cum sociis
        natoque penatibus et magnis dis parturient montes nascetur. Vulputate
        sapien nec sagittis aliquam. Euismod quis viverra nibh cras pulvinar.
        Consectetur purus ut faucibus pulvinar. Phasellus faucibus scelerisque
        eleifend donec pretium vulputate sapien. Tellus integer feugiat
        scelerisque varius morbi enim nunc faucibus. Lobortis mattis aliquam
        faucibus purus in massa tempor nec feugiat. Adipiscing diam donec
        adipiscing tristique risus nec feugiat in fermentum. Aliquet porttitor
        lacus luctus accumsan tortor. Nulla porttitor massa id neque aliquam. Ac
        tortor vitae purus faucibus ornare suspendisse sed nisi. Eu mi bibendum
        neque egestas congue quisque egestas diam in. Arcu dui vivamus arcu
        felis bibendum. Facilisis leo vel fringilla est ullamcorper eget nulla
        facilisi. Mauris in aliquam sem fringilla. Tincidunt tortor aliquam
        nulla facilisi cras fermentum odio eu. In pellentesque massa placerat
        duis ultricies. Feugiat in ante metus dictum. Aenean sed adipiscing diam
        donec adipiscing tristique risus nec feugiat. Amet aliquam id diam
        maecenas ultricies mi. Gravida arcu ac tortor dignissim convallis aenean
        et tortor. Tincidunt nunc pulvinar sapien et. Vitae semper quis lectus
        nulla. Sed blandit libero volutpat sed cras ornare arcu dui vivamus.
        Lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit amet.
        Nunc sed blandit libero volutpat. Lectus nulla at volutpat diam ut
        venenatis tellus. Massa id neque aliquam vestibulum.
      </el-main>
    </el-container>
  </el-drawer>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    visible: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      }
    }
  }
};
</script>

<style>
.terms {
  width: 360px;
  max-width: 100%;
  max-height: 100vh;
}

.terms > .el-drawer__body {
  overflow: auto;
}

.terms > .el-drawer__body .el-main {
  padding-top: 0;
}
</style>
