import Vue from 'vue';
import {createAppDom} from '../../util/dom';

describe('AMap.Map', function() {

  describe('#init-instance', function() {
    it('should init amap instance', (done) => {
      createAppDom();
      (new Vue({
        template: `
        <div :style="{height:'100px'}">
          <el-amap @init="init">
          </el-amap>
        </div>
        `,
        data() {
          let center = [116.397428, 39.90923];
          return {
            center,
            zoom: 12
          };
        },
        methods: {
          init: (instance) => {
            expect(instance instanceof window.AMap.Map).to.true;
            console.log(instance.getCenter());
            done();
          }
        }
      })).$mount('#app');
    });
  });

});
