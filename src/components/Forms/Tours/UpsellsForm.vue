<template>
    <div class="form-container">
        <base-modal class="modal-upsells" :active="activeModal" @close="activeModal = false">
            <div class="title-main">Edit</div>
            <div class="form-blocks">
                <base-input
                        class="basic-input"
                        v-model="editTitle"
                        label="Title"
                        inputWidth="410px"
                />
                <base-select
                        :options="upsellTypes"
                        :default-value="defaultEdit"
                        @selected-option="setUpsellEditType"
                        width="316px"
                        max-width="316px"
                        inputWidth="316px"
                        label="PriceType"
                        class="basic-select"
                />
                <div class="number-block">
                    <div class="currency-block">USD</div>
                    <div class="input-block">
                        <input v-model="editPrice" type="number"/>
                    </div>
                </div>
            </div>
            <div class="buttons">
                <base-button type="light" @click.native="activeModal = false">Cancel</base-button>
                <base-button class="save-button" @click.native="updateService">Save</base-button>
            </div>
        </base-modal>
        <div class="form-content upsells-form">
            <h6>Extra Services</h6>
            <div class="add-title-block">
                <base-input
                        class="basic-input"
                        v-model="addTitle"
                        label="Title"
                        inputWidth="410px"
                />
                <base-select
                        :options="upsellTypes"
                        @selected-option="setUpsellType"
                        width="132px"
                        max-width="132px"
                        inputWidth="132px"
                        label="PriceType"
                        class="basic-select"
                />
                <div class="number-block">
                    <div class="currency-block">USD</div>
                    <div class="input-block">
                        <input v-model="addPrice" type="number"/>
                    </div>
                </div>
            </div>
            <div class="add-service-block">
                <div @click.prevent="addService" class="add-service">
                    <svg-icon name="plus" /><label>Add extra service</label>
                </div>
            </div>
            <div class="extra-items">
                <div v-for="upsell in productUpsells" class="extra-item">
                    <div class="titles-block">
                        <div class="title-block-title">{{ upsell.name }}</div>
                        <div class="title-block-type">{{ upsellTypes[ upsell.type ] }}</div>
                        <div class="title-block-price">${{ parseFloat(upsell.price).toFixed(0,2) }}</div>
                    </div>
                    <div class="title-right">
                        <div @click="editUpsell(upsell)" class="icon-block">
                            <svg-icon class="pencil-icon" name="pencil"></svg-icon>
                        </div>
                        <div @click="deleteUpsell(upsell.id)" class="icon-block">
                            <svg-icon class="trash-icon" name="trash"></svg-icon>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Temporary swapped because the base-button does not work  -->
        <button
                @click.prevent="next(17)"
                @keyup.enter="next(17)"
                class="button dark long"
                type="button"
        >Next</button>
        <!--<base-button  @click.prevent="next(2)" long>Next</base-button>-->
    </div>
</template>

<script>
    import { mapActions, mapGetters } from "vuex";
    import BaseModal from '@/components/UILibrary/Modals/BaseModal'

    export default {
        data() {
            return {
                addTitle: '',
                addType: null,
                addPrice: null,
                activeModal: false,
                editTitle: '',
                editType: null,
                editPrice: null,
                editId: null,
                defaultEdit: null,
            };
        },
        components:{
            BaseModal
        },
        computed: {
            ...mapGetters({
                stateTour: "tours/tour",
                upsellTypes: "tours/upsellTypes",
                productUpsells: "tours/productUpsells"
            })
        },
        watch: {
            stateTour: {
                handler(val) {

                },
                deep: true
            },
            bookingNeedInfo: {
                handler(val) {
                    this.newForm = val;
                },
                deep: true
            }
        },
        beforeMount() {
        },
        methods: {
            ...mapActions("tours", ["fetchSetStep","getTour", "getUpsellTypes", "getProductUpsells","createProductUpsell","updateProductUpsell","deleteProductUpsell","fetchSeventeenStepNew"]),

            next(val) {
                let body = this.newForm;
                this.fetchSeventeenStepNew(body);
            },

            setUpsellType(val){
                //let index = this.upsellTypes.findIndex(x => x === val)
                let compContext = this;
                Object.keys(this.upsellTypes).map(function(objectKey, index) {
                    if(val == compContext.upsellTypes[objectKey]){
                        compContext.addType = objectKey;
                    }
                });
            },

            setUpsellEditType(val){
                //let index = this.upsellTypes.findIndex(x => x === val)
                let compContext = this;
                Object.keys(this.upsellTypes).map(function(objectKey, index) {
                    if(val == compContext.upsellTypes[objectKey]){
                        compContext.editType = objectKey;
                    }
                });
            },

            addService(){
                let body = {};
                body.body = {
                    name: this.addTitle,
                    type: parseInt(this.addType),
                    price: this.addPrice
                }
                body.id = this.stateTour.id;

                this.createProductUpsell(body);
            },
            updateService(){
                this.activeModal = false;
                let body = {};
                body.body = {
                    name: this.editTitle,
                    type: parseInt(this.editType),
                    price: this.editPrice
                }
                body.id = this.stateTour.id;
                body.upsell_id = this.editId;

                this.updateProductUpsell(body);
            },
            deleteUpsell(id){
                let body = {
                    id: this.stateTour.id,
                    upsell_id: id
                }
                this.deleteProductUpsell(body);
            },
            editUpsell(item){
                this.activeModal = true;
                this.editTitle = item.name;
                this.defaultEdit = this.upsellTypes[item.type];
                this.editType = item.type;
                this.editPrice = parseFloat(item.price).toFixed(0,2);
                this.editId = item.id;
            }
        },
        mounted() {
            this.getTour();
            this.getUpsellTypes();
            this.getProductUpsells(this.stateTour.id);
        }
    };
</script>

<style lang="scss" scoped>
    .form-content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        max-width: 315px;
        margin-top: 20px;
        margin-bottom: 15px;
    }
</style>