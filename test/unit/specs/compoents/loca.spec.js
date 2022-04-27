import Vue from 'vue';
import {createAppDom} from '../../util/dom';

describe('AMap.Loca', function() {

  describe('#loca-point', function() {
    it('init loca point instance', (done) => {
      createAppDom();
      (new Vue({
        template: `
        <div :style="{height:'100px'}">
          <el-amap :center="center" :zoom="zoom">
            <el-amap-loca>
              <el-amap-loca-point  :source-url="sourceUrl" @init="init"></el-amap-loca-point>
            </el-amap-loca>
          </el-amap>
        </div>
        `,
        data() {
          return {
            center: [105.601, 35.32],
            zoom: 4.8,
            sourceUrl: 'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/gdp.json'
          };
        },
        methods: {
          init: (instance) => {
            expect(instance instanceof window.Loca.PointLayer).to.true;
            done();
          }
        }
      })).$mount('#app');
    });
  });

});
