<template>
  <div class="card-page tours tours-list">
    <bread-crumbs :items="breadcrumbs" />
    <h1>Tours & Activities</h1>
    <div class="content">
        <div class="search-create-block">
            <base-input v-model="query" @input-change="onQuery" width="210px" max-width="210px" inputWidth="210px" search></base-input>
            <button
                    @click="addTour"
                    class="button dark long"
                    type="button">
              Create a product
            </button>
        </div>
        <div class="items">
           <div v-for="item in tours" class="item">
             <div class="image-block">
               <img v-if="item.productPhotos[0]" :src="item.productPhotos[0].thumbnails['307']">
               <svg-icon v-if="!item.productPhotos[0]" name="pictures"></svg-icon>
             </div>
             <div class="info-block">
               <div class="title">
                 <!--<svg-icon name="warning"></svg-icon>-->
                 {{ item.name }}
               </div>
               <div class="code">Product code: {{ item.reference_code }}</div>
               <div class="checkbox-block">
                  <div class="writing">Active:</div>
                   <div class="checkbox-item">
                     <base-checkbox :id="item.id" @on-active="getTourActive" :active="item.is_published"></base-checkbox>
                   </div>
               </div>
               <!--<div class="percents-main-block">-->
                 <!--<div class="percents-block">-->
                   <!--<span class="percents">{{ getProgress(item) }}%</span> Complete-->
                 <!--</div>-->
               <!--</div>-->
               <!--<div class="progress-block">-->
                 <!--<div class="progress">-->
                   <!--<div :style="{ width: getProgressWidth(item) + 'px' }" class="active-progress"></div>-->
                 <!--</div>-->
               <!--</div>-->
               <div class="button-block">
                 <button
                         @click="manageProduct(item.id)"
                         class="button outline"
                         type="button">
                   Manage
                 </button>
               </div>
             </div>
             <div class="icons-block">
               <div @click="copyProduct(item.id)" class="icons-block-icon first">
                 <svg-icon name="copy"></svg-icon>
               </div>
               <div @click="deleteItem(item.id)" class="icons-block-icon second">
                 <svg-icon name="trash"></svg-icon>
               </div>
             </div>
           </div>
        </div>
        <div class="drafts">
          <div class="title">Drafts</div>
          <div class="items">
            <div v-for="item in drafts" class="item">
              <div class="image-block">
                <img v-if="item.productPhotos[0]" :src="item.productPhotos[0].thumbnails['307']">
                <svg-icon v-if="!item.productPhotos[0]" name="pictures"></svg-icon>
              </div>
              <div class="info-block">
                <div class="title">
                  <!--<svg-icon name="warning"></svg-icon>-->
                  {{ item.name }}
                </div>
                <div class="code">Product code: {{ item.reference_code }}</div>
                <!--<div class="checkbox-block">-->
                  <!--<div class="writing">Active:</div>-->
                  <!--<div class="checkbox-item">-->
                    <!--<base-checkbox :id="item.id" @on-active="getTourActive" :active="item.is_published"></base-checkbox>-->
                  <!--</div>-->
                <!--</div>-->
                <div class="percents-main-block">
                  <div class="percents-block">
                    <span class="percents">{{ getProgress(item) }}%</span> Complete
                  </div>
                </div>
                <div class="progress-block">
                  <div class="progress">
                    <div :style="{ width: getProgressWidth(item) + 'px' }" class="active-progress"></div>
                  </div>
                </div>
                <div class="button-block">
                  <button
                          @click="manageProduct(item.id)"
                          class="button outline"
                          type="button">
                    Manage
                  </button>
                </div>
              </div>
              <div class="icons-block">
                <div class="icons-block-icon first">
                  <!--<svg-icon name="copy"></svg-icon>-->
                </div>
                <div @click="deleteItem(item.id)" class="icons-block-icon second">
                  <svg-icon name="trash"></svg-icon>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
    import { mapGetters,mapActions } from 'vuex'
    import SvgIcon from "../../../node_modules/vue-cli-plugin-svg-sprite/template/src/components/SvgIcon";

    export default {
        components: {SvgIcon},
        data: () => ({
            breadcrumbs: [
                { pathname: "dashboard", title: 'Home' },
                { pathname: "tour-index", title: 'Question and answers' }
            ],
            search: '',
            items: [
                {
                    title: '1-Day Cairo Tour from Eilat',
                    isDanger: false
                },
                {
                    title: '12-Day Israel, Jordan, and Egypt Tour with Nile Cruise',
                    isDanger: true
                },
                {
                    title: '12-Day Israel, Jordan, and Egypt Tour with Nile Cruise',
                    isDanger: false
                }
            ],
            query: ''
        }),
        computed: {
            ...mapGetters({
                tours: 'tours/tours',
                drafts: 'tours/drafts',
            }),
        },
        methods: {
            ...mapActions('tours', ['getTours','publishProduct','unPublishProduct','deleteProduct','fetchUnsetTourId', 'fetchCopyProduct']),
            getTourActive(val){
                if(val.active){
                    let body = {
                        id: val.id,
                        is_published: val.active
                    }
                    this.publishProduct(body)
                }else{
                    let body = {
                        id: val.id,
                        is_published: val.active
                    }
                    this.unPublishProduct(body)
                }
            },
            deleteItem(id){
                this.deleteProduct(id)
                //this.deleteProduct(id);
            },
            manageProduct(id){
                this.$router.push("tours/update/" + id);
            },
            addTour(){
                this.fetchUnsetTourId();
                this.$router.push("tours/new");
            },
            getProgress(item){
                if(item.progress){
                    return item.progress.progress;
                }
                return 0;
            },
            getProgressWidth(item){
                if(item.progress){
                    return item.progress.progress/100*150;
                }
                return 0;
            },
            onQuery(){
                this.getTours(this.query);
            },
            copyProduct(id){
                this.fetchCopyProduct(id);
            }
        },
        mounted(){
            this.getTours();
        }
    }
</script>
