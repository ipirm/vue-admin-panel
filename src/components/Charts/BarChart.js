import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins
import { mapActions, mapState } from 'vuex'

export default {
    extends: Bar,
    mixins: [reactiveProp],
    props: ['options'],
    computed: {
        ...mapState('reports', [ 'collection' ]),
    },
    watch: {
        collection: {
            handler: function(newValue) {
                //console.log(this._data._chart, "oves du arrraaaa??")

                // //this.renderChart(this.data, this.options);
                if(this._data._chart){
                    this._data._chart.destroy();
                }
                this.renderChart(this.chartData, this.options)
            },
            deep: true
        }
    },
    mounted () {
        // this.chartData is created in the mixin.
        // If you want to pass options please create a local options object


        this.renderChart(this.chartData, this.options)
    }
}