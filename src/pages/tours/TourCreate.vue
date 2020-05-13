<template>
  <div class="card-page tours">
    <bread-crumbs :items="breadcrumbs" />
    <h1>{{ this.$route.params.id ? 'Update' : 'New' }} Product</h1>
    <tabs-tours v-if="this.$route.params.id && showComponent"></tabs-tours>
    <tabs-tours-create v-if="!this.$route.params.id"></tabs-tours-create>
    <transition name="fade" mode="out-in" appear>
      <component v-if="this.$route.params.id && showComponent" :is="tabComponent" />
      <component v-if="!this.$route.params.id" :is="tabComponent" />
    </transition>

  </div>
</template>

<script>
    import TabsTours from '@/components/UILibrary/Tabs/TabsTours'
    import TabsToursCreate from '@/components/UILibrary/Tabs/TabsToursCreate'
    import AddTour from '@/components/Forms/Tours/AddTour'
    import TypeForm from '@/components/Forms/Tours/TypeForm'
    import ThemeForm from '@/components/Forms/Tours/ThemeForm'
    import PhotoForm from '@/components/Forms/Tours/PhotoForm'
    import MeetingForm from '@/components/Forms/Tours/MeetingForm'
    import TourDetails from '@/components/Forms/Tours/TourDetails'
    import LanguageForm from '@/components/Forms/Tours/LanguageForm'
    import InclusionForm from '@/components/Forms/Tours/InclusionForm'
    import UniqueForm from '@/components/Forms/Tours/UniqueForm'
    import AudienceForm from '@/components/Forms/Tours/AudienceForm'
    import InformationForm from '@/components/Forms/Tours/InformationForm'
    import TourForm from '@/components/Forms/Tours/TourForm'
    import PricingForm from '@/components/Forms/Tours/PricingForm'
    import DefineForm from '@/components/Forms/Tours/DefineForm'
    import PricingFormNew from '@/components/Forms/Tours/PricingFormNew'
    import BookingForm from '@/components/Forms/Tours/BookingForm'
    import CancelationForm from '@/components/Forms/Tours/CancelationForm'
    import ExtraForm from '@/components/Forms/Tours/ExtraForm'
    import FinalForm from '@/components/Forms/Tours/FinalForm'
    import UpsellsForm from '@/components/Forms/Tours/UpsellsForm'

    import { mapGetters,mapActions } from 'vuex'

    import TabsBlocks from '@/components/UILibrary/Tabs/TabsBlocks'

    export default {
        components: { TabsBlocks, TabsTours, TabsToursCreate, AddTour, TypeForm, ThemeForm, PhotoForm, MeetingForm, TourDetails, LanguageForm, InclusionForm, UniqueForm, AudienceForm, InformationForm, TourForm, PricingForm, DefineForm, PricingFormNew, BookingForm, CancelationForm, ExtraForm, FinalForm, UpsellsForm },
        data: () => ({
            breadcrumbs: [
                { pathname: "dashboard", title: 'Home' },
                { pathname: "tour-index", title: 'Tours' },
                { pathname: "tour-create", title: 'Create New Product' }
            ],
            roles: [
                { name: 'Administrator', active: true },
                { name: 'Manager', active: false },
                { name: 'Traveller', active: false }
            ],
            tabComponent: 'AddTour',
            showComponent: false
        }),
        computed: {
            ...mapGetters({
                currentStep: 'tours/currentStep',
                stateTour: 'tours/tour'
            }),
        },
        watch: {
            currentStep: {
                handler(val){
                    if(val == 1) this.tabComponent = 'AddTour'
                    if(val == 2) this.tabComponent = 'TypeForm'
                    if(val == 3) this.tabComponent = 'ThemeForm'
                    if(val == 4) this.tabComponent = 'PhotoForm'
                    if(val == 5) this.tabComponent = 'MeetingForm'
                    if(val == 6) this.tabComponent = 'TourDetails'
                    if(val == 7) this.tabComponent = 'LanguageForm'
                    if(val == 8) this.tabComponent = 'InclusionForm'
                    if(val == 9) this.tabComponent = 'UniqueForm'
                    if(val == 10) this.tabComponent = 'AudienceForm'
                    if(val == 11) this.tabComponent = 'InformationForm'
                    if(val == 12) this.tabComponent = 'TourForm'
                    if(val == 13) this.tabComponent = 'PricingForm'
                    if(val == 14) this.tabComponent = 'DefineForm'
                    if(val == 15) this.tabComponent = 'PricingFormNew'
                    if(val == 16) this.tabComponent = 'UpsellsForm'
                    if(val == 17) this.tabComponent = 'BookingForm'
                    if(val == 18) this.tabComponent = 'CancelationForm'
                    if(val == 19) this.tabComponent = 'ExtraForm'
                    if(val == 20) this.tabComponent = 'FinalForm'
                },
            },
            stateTour: {
                handler(val){
                    if(val.id){
                        this.showComponent = true;
                    }
                },
                deep: true
            }
        },
        methods: {
            ...mapActions("countries", ["getTourCountries"]),
            ...mapActions('tours', ['getTour','getProductSettingTypes','getThemes','getTourById','fetchUnsetTourId','getCutOffCategories','getConfirmationMethods','getAccesibilities','getHealth']),
        },
        async beforeMount() {
            if(this.$route.params.id){
                await this.getTourById(this.$route.params.id)
            }
        },
        created(){
            if(!this.$route.params.id){
                this.fetchUnsetTourId();
            }
            this.getCutOffCategories();
            this.getConfirmationMethods();
            this.getAccesibilities();
            this.getHealth();
            this.getTourCountries();
        }
    }
</script>
