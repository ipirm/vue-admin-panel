<template>
    <nav class="tour-sidebar-nav">
        <ul class="nav">
            <li class="nav-item" v-for="item in navItems" v-bind:key="item.title">
                {{ item.title }}
                <div v-for="subNav in item.subcategories" v-bind:key="subNav.stepNumber" class="navbar-dropdown">
                    <a v-if="subNav.isAvailable" :class="{'nav-item-active': subNav.isActive,'nav-item-completed': subNav.isCompleted, 'nav-item-not-required': subNav.notRequired}" class="dropdown-item" @click.stop="switchStep(subNav.stepNumber)">
                        <svg-icon v-if="subNav.isCompleted && !subNav.isActive" name="completed"></svg-icon>
                        <div v-if="subNav.isActive" class="square-orange"></div>
                        {{ subNav.title }}
                    </a>
                </div>
            </li>
        </ul>
    </nav>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex'
    import SvgIcon from "../../../../node_modules/vue-cli-plugin-svg-sprite/template/src/components/SvgIcon";
    export default {
        components: {SvgIcon},
        data() {
            return {
                navItems: [
                    {
                        title: 'Basics',
                        isActive: true,
                        subcategories:[
                            {
                                isActive: true,
                                isCompleted: false,
                                title: 'Input language and title',
                                stepNumber: 1,
                                isAvailable: true,
                            },
                            {
                                isActive: false,
                                isCompleted: false,
                                title: 'Tour Type',
                                stepNumber: 2,
                                isAvailable: false
                            },
                            {
                                isActive: false,
                                isCompleted: false,
                                title: 'Theme',
                                stepNumber: 3,
                                isAvailable: false
                            },
                            {
                                isActive: false,
                                isCompleted: false,
                                title: 'Photos',
                                stepNumber: 4,
                                isAvailable: false
                            }
                        ]
                    },
                    {
                        title: 'Content',
                        isActive: false,
                        subcategories: [
                            {
                                isActive: false,
                                isCompleted: false,
                                title: 'Meeting & Pickup',
                                stepNumber: 5,
                                isAvailable: false
                            },
                            {
                                isActive: false,
                                isCompleted: false,
                                title: 'Tour detailes',
                                stepNumber: 6,
                                isAvailable: false
                            },
                            {
                                isActive: false,
                                isCompleted: false,
                                title: 'Languages Offered',
                                stepNumber: 7,
                                isAvailable: false
                            },
                            {
                                isActive: false,
                                isCompleted: true,
                                title: 'Inclusions & exclusions',
                                stepNumber: 8,
                                notRequired: true,
                                isAvailable: false
                            },
                            {
                                isActive: false,
                                isCompleted: false,
                                title: 'What makes your product unique',
                                stepNumber: 9,
                                isAvailable: false
                            },
                            {
                                isActive: false,
                                isCompleted: true,
                                title: 'Audience',
                                stepNumber: 10,
                                isAvailable: false
                            },
                            {
                                isActive: false,
                                isCompleted: false,
                                title: 'Information travelers need from you',
                                stepNumber: 11,
                                isAvailable: false
                            },
                        ]
                    },
                    {
                        title: 'Schedules & pricing',
                        isActive: false,
                        subcategories: [
                            {
                                isActive: false,
                                isCompleted: false,
                                title: 'Travel detailes',
                                stepNumber: 12,
                                isAvailable: false
                            },
                            {
                                isActive: false,
                                isCompleted: false,
                                title: 'Pricing Schedule',
                                stepNumber: 15,
                                isAvailable: false
                            },
                            {
                                isActive: false,
                                isCompleted: true,
                                title: 'Extra Service',
                                stepNumber: 16,
                                notRequired: true
                            }
                        ]
                    },
                    {
                        title: 'Booking & tickets',
                        isActive: false,
                        subcategories: [
                            {
                                isActive: false,
                                isCompleted: false,
                                title: 'Booking process',
                                stepNumber: 17,
                                isAvailable: false
                            },
                            {
                                isActive: false,
                                isCompleted: false,
                                title: 'Cancellation policy',
                                stepNumber: 18,
                                isAvailable: false
                            },
                            {
                                isActive: false,
                                isCompleted: true,
                                title: 'Traveller required information',
                                stepNumber: 19,
                                notRequired: true,
                                isAvailable: false
                            },
                            {
                                isActive: false,
                                isCompleted: false,
                                title: 'Ticket builder',
                                stepNumber: 20,
                                isAvailable: false
                            }
                        ]
                    }
                ],
            }
        },

        computed: {
            ...mapGetters({
                currentStep: 'tours/currentStep',
                completedSteps: 'tours/completedSteps',
                tour: "tours/tour"
            }),
        },
        watch: {
            currentStep: {
                handler(val){
                    var compContext = this;
                    if(val == 1){
                        this.navItems.forEach(function(element,index) {
                            element.subcategories.forEach(function(el,i){
                                if(el.stepNumber == val){
                                    compContext.navItems[index].subcategories[i].isActive = true;
                                }else{
                                    compContext.navItems[index].subcategories[i].isActive = false;
                                }
                            })
                        });
                    }
                    if(val == 2){
                        this.navItems.forEach(function(element,index) {
                            element.subcategories.forEach(function(el,i){
                                if(el.stepNumber == val){
                                    compContext.navItems[index].subcategories[i].isActive = true;
                                }else{
                                    compContext.navItems[index].subcategories[i].isActive = false;
                                }
//                                if(el.stepNumber == 1){
//                                    compContext.navItems[index].subcategories[i].isCompleted = true;
//                                }
                            })
                        });
                    }
                    if(val == 3){
                        this.navItems.forEach(function(element,index) {
                            element.subcategories.forEach(function(el,i){
                                if(el.stepNumber == val){
                                    compContext.navItems[index].subcategories[i].isActive = true;
                                }else{
                                    compContext.navItems[index].subcategories[i].isActive = false;
                                }
//                                if(el.stepNumber == 2){
//                                    compContext.navItems[index].subcategories[i].isCompleted = true;
//                                }
                            })
                        });
                    }
                    if(val == 4){
                        this.navItems.forEach(function(element,index) {
                            element.subcategories.forEach(function(el,i){
                                if(el.stepNumber == val){
                                    compContext.navItems[index].subcategories[i].isActive = true;
                                }else{
                                    compContext.navItems[index].subcategories[i].isActive = false;
                                }
                                if(el.stepNumber == 3){
                                    compContext.navItems[index].subcategories[i].isCompleted = true;
                                }
                            })
                        });
                    }
                    if(val == 5){
                        this.navItems.forEach(function(element,index) {
                            element.subcategories.forEach(function(el,i){
                                if(el.stepNumber == val){
                                    compContext.navItems[index].subcategories[i].isActive = true;
                                }else{
                                    compContext.navItems[index].subcategories[i].isActive = false;
                                }
//                                if(el.stepNumber == 4){
//                                    compContext.navItems[index].subcategories[i].isCompleted = true;
//                                }
                            })
                        });
                    }
                    if(val == 6){
                        this.navItems.forEach(function(element,index) {
                            element.subcategories.forEach(function(el,i){
                                if(el.stepNumber == val){
                                    compContext.navItems[index].subcategories[i].isActive = true;
                                }else{
                                    compContext.navItems[index].subcategories[i].isActive = false;
                                }
//                                if(el.stepNumber == 5){
//                                    compContext.navItems[index].subcategories[i].isCompleted = true;
//                                }
                            })
                        });
                    }
                    if(val == 7){
                        this.navItems.forEach(function(element,index) {
                            element.subcategories.forEach(function(el,i){
                                if(el.stepNumber == val){
                                    compContext.navItems[index].subcategories[i].isActive = true;
                                }else{
                                    compContext.navItems[index].subcategories[i].isActive = false;
                                }
//                                if(el.stepNumber == 6){
//                                    compContext.navItems[index].subcategories[i].isCompleted = true;
//                                }
                            })
                        });
                    }
                    if(val == 8){
                        this.navItems.forEach(function(element,index) {
                            element.subcategories.forEach(function(el,i){
                                if(el.stepNumber == val){
                                    compContext.navItems[index].subcategories[i].isActive = true;
                                }else{
                                    compContext.navItems[index].subcategories[i].isActive = false;
                                }
//                                if(el.stepNumber == 7){
//                                    compContext.navItems[index].subcategories[i].isCompleted = true;
//                                }
                            })
                        });
                    }
                    if(val == 9){
                        this.navItems.forEach(function(element,index) {
                            element.subcategories.forEach(function(el,i){
                                if(el.stepNumber == val){
                                    compContext.navItems[index].subcategories[i].isActive = true;
                                }else{
                                    compContext.navItems[index].subcategories[i].isActive = false;
                                }
//                                if(el.stepNumber == 8){
//                                    compContext.navItems[index].subcategories[i].isCompleted = true;
//                                }
                            })
                        });
                    }
                    if(val == 10){
                        this.navItems.forEach(function(element,index) {
                            element.subcategories.forEach(function(el,i){
                                if(el.stepNumber == val){
                                    compContext.navItems[index].subcategories[i].isActive = true;
                                }else{
                                    compContext.navItems[index].subcategories[i].isActive = false;
                                }
//                                if(el.stepNumber == 9){
//                                    compContext.navItems[index].subcategories[i].isCompleted = true;
//                                }
                            })
                        });
                    }
                    if(val == 11){
                        this.navItems.forEach(function(element,index) {
                            element.subcategories.forEach(function(el,i){
                                if(el.stepNumber == val){
                                    compContext.navItems[index].subcategories[i].isActive = true;
                                }else{
                                    compContext.navItems[index].subcategories[i].isActive = false;
                                }
//                                if(el.stepNumber == 10){
//                                    compContext.navItems[index].subcategories[i].isCompleted = true;
//                                }
                            })
                        });
                    }
                    if(val == 12){
                        this.navItems.forEach(function(element,index) {
                            element.subcategories.forEach(function(el,i){
                                if(el.stepNumber == val){
                                    compContext.navItems[index].subcategories[i].isActive = true;
                                }else{
                                    compContext.navItems[index].subcategories[i].isActive = false;
                                }
//                                if(el.stepNumber == 11){
//                                    compContext.navItems[index].subcategories[i].isCompleted = true;
//                                }
                            })
                        });
                    }
                    if(val == 13){
                        this.navItems.forEach(function(element,index) {
                            element.subcategories.forEach(function(el,i){
                                if(el.stepNumber == val){
                                    compContext.navItems[index].subcategories[i].isActive = true;
                                }else{
                                    compContext.navItems[index].subcategories[i].isActive = false;
                                }
//                                if(el.stepNumber == 12){
//                                    compContext.navItems[index].subcategories[i].isCompleted = true;
//                                }
                            })
                        });
                    }
                    if(val == 14){
                        this.navItems.forEach(function(element,index) {
                            element.subcategories.forEach(function(el,i){
                                if(el.stepNumber == val){
                                    compContext.navItems[index].subcategories[i].isActive = true;
                                }else{
                                    compContext.navItems[index].subcategories[i].isActive = false;
                                }
                                if(el.stepNumber == 13){
                                    compContext.navItems[index].subcategories[i].isCompleted = true;
                                }
                            })
                        });
                    }
                    if(val == 15){
                        this.navItems.forEach(function(element,index) {
                            element.subcategories.forEach(function(el,i){
                                if(el.stepNumber == val){
                                    compContext.navItems[index].subcategories[i].isActive = true;
                                }else{
                                    compContext.navItems[index].subcategories[i].isActive = false;
                                }
//                                if(el.stepNumber == 14){
//                                    compContext.navItems[index].subcategories[i].isCompleted = true;
//                                }
                            })
                        });
                    }
                    if(val == 16){
                        this.navItems.forEach(function(element,index) {
                            element.subcategories.forEach(function(el,i){
                                if(el.stepNumber == val){
                                    compContext.navItems[index].subcategories[i].isActive = true;
                                }else{
                                    compContext.navItems[index].subcategories[i].isActive = false;
                                }
//                                if(el.stepNumber == 14){
//                                    compContext.navItems[index].subcategories[i].isCompleted = true;
//                                }
                            })
                        });
                    }
                    if(val == 17){
                        this.navItems.forEach(function(element,index) {
                            element.subcategories.forEach(function(el,i){
                                if(el.stepNumber == val){
                                    compContext.navItems[index].subcategories[i].isActive = true;
                                }else{
                                    compContext.navItems[index].subcategories[i].isActive = false;
                                }
//                                if(el.stepNumber == 14){
//                                    compContext.navItems[index].subcategories[i].isCompleted = true;
//                                }
                            })
                        });
                    }
                    if(val == 18){
                        this.navItems.forEach(function(element,index) {
                            element.subcategories.forEach(function(el,i){
                                if(el.stepNumber == val){
                                    compContext.navItems[index].subcategories[i].isActive = true;
                                }else{
                                    compContext.navItems[index].subcategories[i].isActive = false;
                                }
//                                if(el.stepNumber == 14){
//                                    compContext.navItems[index].subcategories[i].isCompleted = true;
//                                }
                            })
                        });
                    }
                    if(val == 19){
                        this.navItems.forEach(function(element,index) {
                            element.subcategories.forEach(function(el,i){
                                if(el.stepNumber == val){
                                    compContext.navItems[index].subcategories[i].isActive = true;
                                }else{
                                    compContext.navItems[index].subcategories[i].isActive = false;
                                }
//                                if(el.stepNumber == 14){
//                                    compContext.navItems[index].subcategories[i].isCompleted = true;
//                                }
                            })
                        });
                    }
                },
            },
//            completedSteps:{
//                handler(val){
//                    console.log(val, 'is there vals??');
//                }
//            },
            tour: {
                handler(val){
                    let compContext = this;

                    if(val.progress){
                        Object.keys(val.progress.steps).forEach(function(key) {
                            if(key == 'INPUT_LANGUAGE_AND_TITLE'){
                                if(val.progress.steps[key] == 1){
                                    compContext.navItems[0].subcategories[0].isCompleted = true;
                                    compContext.navItems[0].subcategories[1].isAvailable = true;
                                }else{
                                    compContext.navItems[0].subcategories[0].isCompleted = false;
                                }
                            }
                            if(key == 'TYPE_OF_PRODUCT'){
                                if(val.progress.steps[key] == 1){
                                    compContext.navItems[0].subcategories[1].isCompleted = true;
                                    compContext.navItems[0].subcategories[2].isAvailable = true;
                                }else{
                                    compContext.navItems[0].subcategories[1].isCompleted = false;
                                }
                            }
                            if(key == 'THEME'){
                                if(val.progress.steps[key] == 1){
                                    compContext.navItems[0].subcategories[2].isCompleted = true;
                                    compContext.navItems[0].subcategories[3].isAvailable = true;
                                }else{
                                    compContext.navItems[0].subcategories[2].isCompleted = false;
                                }
                            }
                            if(key == 'PHOTOS'){
                                if(val.progress.steps[key] == 1){
                                    compContext.navItems[0].subcategories[3].isCompleted = true;
                                    compContext.navItems[1].subcategories[0].isAvailable = true;
                                }else{
                                    compContext.navItems[0].subcategories[3].isCompleted = false;
                                }
                            }
                            if(key == 'PICK_UP_AND_DROP_OFF'){
                                if(val.progress.steps[key] == 1){
                                    compContext.navItems[1].subcategories[0].isCompleted = true;
                                    compContext.navItems[1].subcategories[1].isAvailable = true;
                                }else{
                                    compContext.navItems[1].subcategories[0].isCompleted = false;
                                }
                            }
                            if(key == 'PRODUCT_DAYS'){
                                if(val.progress.steps[key] == 1){
                                    compContext.navItems[1].subcategories[1].isCompleted = true;
                                    compContext.navItems[1].subcategories[2].isAvailable = true;
                                }else{
                                    compContext.navItems[1].subcategories[1].isCompleted = false;
                                }
                            }
                            if(key == 'GUIDES'){
                                if(val.progress.steps[key] == 1){
                                    compContext.navItems[1].subcategories[2].isCompleted = true;
                                    compContext.navItems[1].subcategories[3].isAvailable = true;
                                    compContext.navItems[1].subcategories[4].isAvailable = true;
                                }else{
                                    compContext.navItems[1].subcategories[2].isCompleted = false;
                                }
                            }
                            if(key == 'WHAT_MAKES_YOUR_PRODUCT_UNIQUE'){
                                if(val.progress.steps[key] == 1){
                                    compContext.navItems[1].subcategories[4].isCompleted = true;
                                    compContext.navItems[1].subcategories[5].isCompleted = true;
                                    compContext.navItems[1].subcategories[5].isAvailable = true;
                                    compContext.navItems[1].subcategories[6].isAvailable = true;
                                }else{
                                    compContext.navItems[1].subcategories[4].isCompleted = false;
                                }
                            }
                            if(key == 'YOUR_IDEAL_TRAVELER'){
                                if(val.progress.steps[key] == 1){
                                    compContext.navItems[1].subcategories[5].isCompleted = true;
                                    compContext.navItems[1].subcategories[6].isAvailable = true;
                                }else{
                                    //compContext.navItems[1].subcategories[5].isCompleted = false;
                                }
                            }
                            if(key == 'PHYSICAL_RESTRICTIONS'){
                                if(val.progress.steps[key] == 1){
                                    compContext.navItems[1].subcategories[6].isCompleted = true;
                                    compContext.navItems[2].subcategories[0].isAvailable = true;
                                }else{
                                    compContext.navItems[1].subcategories[6].isCompleted = false;
                                }
                            }
                            if(key == 'SCHEDULE_PRICING_PRICE_SETTINGS'){
                                if(val.progress.steps[key] == 1){
                                    compContext.navItems[2].subcategories[0].isCompleted = true;
                                    compContext.navItems[2].subcategories[1].isAvailable = true;
                                }else{
                                    compContext.navItems[2].subcategories[0].isCompleted = false;
                                }
                            }
                            if(key == 'SCHEDULE_PRICING_SCHEDULE_PRICE'){
                                if(val.progress.steps[key] == 1){
                                    compContext.navItems[2].subcategories[1].isCompleted = true;
                                    compContext.navItems[3].subcategories[0].isAvailable = true;
                                }else{
                                    compContext.navItems[2].subcategories[1].isCompleted = false;
                                }
                            }
                            if(key == 'CANCELLATION'){
                                if(val.progress.steps[key] == 1){
                                    compContext.navItems[3].subcategories[1].isCompleted = true;
                                    compContext.navItems[3].subcategories[2].isAvailable = true;
                                    compContext.navItems[3].subcategories[3].isAvailable = true;
                                }else{
                                    compContext.navItems[3].subcategories[1].isCompleted = false;
                                }
                            }
                            if(key == 'TICKET'){
                                if(val.progress.steps[key] == 1){
                                    compContext.navItems[3].subcategories[3].isCompleted = true;
                                    compContext.navItems[3].subcategories[3].isAvailable = true;
                                    //compContext.$router.push("/tours");
                                }else{
                                    compContext.navItems[3].subcategories[3].isCompleted = false;
                                }
                            }

                            if(key == 'BOOKING_PROCESS'){
                                if(val.progress.steps[key] == 1){
                                    compContext.navItems[3].subcategories[0].isCompleted = true;
                                    compContext.navItems[3].subcategories[1].isAvailable = true;
                                }else{
                                    compContext.navItems[3].subcategories[0].isCompleted = false;
                                }
                            }






//                            console.log(key, val.progress.steps[key]);

                        });
                    }
                }
            }
        },

        methods: {
            ...mapActions('tours', ['fetchSetStep']),

//            checkCompleted(step){
//                if(this.completedSteps){
//                    if(this.completedSteps.indexOf(step) !== -1){
//                        return true;
//                    }else{
//                        return false;
//                    }
//                }
//            },

            switchStep(val){

//                if(this.currentStep > val){
                this.fetchSetStep({
                    step: val
                })
//                }
            }
        }
    }
</script>
