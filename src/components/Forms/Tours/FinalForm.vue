<template>
    <div class="form-container">
        <div class="form-content final-form">
            <h6>Let's set up your ticket</h6>
            <div class="label-description">
                We issue tickets for every booking so travelers have easy access to important information on the day of travel.
            </div>
            <div class="label-main-title">
                Select a ticket type
            </div>
            <div class="radio-buttons-block">
                <div v-for="(type,index) in ticketTypes" class="radio-item">
                    <input v-model="form.type" :value="index" type="radio">
                    <div class="label-block">
                        <div class="label-title">{{ type }}</div>
                        <div v-if="index == 1" class="label-tag">Recommended</div>
                    </div>
                </div>
            </div>

            <div v-if="form.type != 2" class="vaucher">
                <div class="vaucher-title">
                    Vaucher
                </div>
                <div class="vaucher-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat. Donec placerat nisl magna, et faucibus arcu condimentum sed.
                </div>
                <div class="upload-vaucher-block">
                    <label for="file-upload" class="custom-file-upload">
                        <div
                                class="upload-button-div"
                        >Upload Vaucher</div>
                    </label>
                    <input @change="uploadImage" id="file-upload" type="file" />
                    <div v-if="filename" class="vaucher-file-block">
                        <div class="vaucher-file-block-content">
                            <div class="writing">{{ filename }}</div>
                            <div @click="deleteFile" class="delete-icon">
                                <svg-icon name="trash"></svg-icon>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Temporary swapped because the base-button does not work  -->
        <button
                @click.prevent="next(2)"
                @keyup.enter="next(2)"
                class="button dark long"
                type="button"
        >Finish & Publish</button>
        <!--<base-button  @click.prevent="next(2)" long>Next</base-button>-->
    </div>
</template>

<script>
    import { mapActions, mapGetters } from "vuex";
    import SvgIcon from "../../../../node_modules/vue-cli-plugin-svg-sprite/template/src/components/SvgIcon";

    export default {
        components: {SvgIcon},
        data() {
            return {
                form: {
                    type: 1,
                    vaucherFile: null
                },
                filename: null,
                categories: [
                    'Cat1',
                    'Cat2',
                    'Cat3',
                    'Cat4',
                    'Cat5'
                ]
            };
        },
        computed: {
            ...mapGetters({
                stateTour: "tours/tour",
                ticketTypes: "tours/ticketTypes",
                productTicket: "tours/productTicket",
            })
        },
        watch: {
            productTicket: {
                handler(val) {
                    this.form.type = val.type;
                    this.filename = val.vaucher_filename;
                },
                deep: true
            },
            stateTour: {
                handler(val) {
                },
                deep: true
            }
        },
        beforeMount() {
        },
        methods: {
            ...mapActions("tours", ["fetchSetStep", "getTour","getTicketTypes","fetchTwentyStep","getProductTickets"]),

            next(val) {

                let formData = new FormData();
                formData.append('vaucherFile', this.form.vaucherFile);
                formData.append('type', this.form.type);

//                let body = this.form;

                this.fetchTwentyStep(formData);
//                const body = this.tour;
//                this.fetchSetStep({
//                    step: val
//                });
            },

            uploadImage(e) {

                const files = e.target.files;
                this.form.vaucherFile = files[0];
                this.filename = this.form.vaucherFile.name;

                console.log(this.form.vaucherFile);
            },

            deleteFile(){
                this.form.vaucherFile = null;
                this.filename = null;
            }
        },
        mounted() {
            this.getTour();
            this.getTicketTypes();
            this.getProductTickets();
//    this.tour = this.stateTour;
//            this.getLanguages();
//            this.getTour();
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