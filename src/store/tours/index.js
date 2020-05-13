import apiRequest from '@/utils/apiRequest'
import $router from '@/router'

export default {
    namespaced: true,

    state: {
        currentStep: 1,
        tour:{
            language_id: null,
            name: '',
            reference_code: '',
            created_by: '',
            duration_type: null,
            product_type_id: null,
            typeCategoriesList: []
        },
        tours: [],
        languages: [],
        productTypes: [],
        completedSteps: [],
        productTypeCategories: [],
        productSettingTypes: [],
        productSettingTypesCategories: [],
        photos: [],
        pickUpTypes: [],
        productGuides: [],
        themeCategories: [],
        themeCategoriesList: [],
        durationTypes: [],
        pickupCategories: [],
        mealCategories: [],
        priceTypes: [],
        includedCategories: [],
        excludedCategories: [],
        groupEnjoyCategories: [],
        travelerEnjoyCategories: [],
        accessibilityCategories: [],
        physCategories: [],
        priceGroups: [],
        ageCategories: [],
        productPriceSettings: [],
        schedule: {},
        schedules: [],
        cancellationTypes: [],
        productCancellationPolicy: [],
        personalCategories: [],
        flightCategories: [],
        shipCategories: [],
        trainCategories: [],
        ticketTypes: [],
        productTicket: [],
        langCategories: [],
        cutOffCategories: [],
        confirmationMethods: [],
        bookingNeedInfo: [],
        bookingProcess: [],
        healthCategories: [],
        priceAgeCategories: [],
        drafts: [],
        reviewTours: [],
        upsellTypes: [],
        productUpsells: []
    },

    getters: {
        currentStep: state => state.currentStep,
        tour: state => state.tour,
        tours: state => state.tours,
        drafts: state => state.drafts,
        languages: state => state.languages,
        completedSteps: state => state.completedSteps.length > 1 ? state.completedSteps : localStorage.getItem("completedSteps"),
        productTypes: state => state.productTypes,
        productTypeCategories: state => state.productTypeCategories,
        productSettingTypes: state => state.productSettingTypes,
        productSettingTypesCategories: state => state.productSettingTypesCategories,
        photos: state => state.photos ? state.photos : JSON.parse(localStorage.getItem("photos")),
        pickupTypes: state => state.pickUpTypes,
        productGuides: state => state.productGuides,
        themeCategories: state => state.themeCategories,
        themeCategoriesList: state => state.themeCategoriesList,
        durationTypes: state => state.durationTypes,
        pickupCategories: state => state.pickupCategories,
        mealCategories: state => state.mealCategories,
        includedCategories: state => state.includedCategories,
        excludedCategories: state => state.excludedCategories,
        groupEnjoyCategories: state => state.groupEnjoyCategories,
        travelerEnjoyCategories: state => state.travelerEnjoyCategories,
        accessibilityCategories: state => state.accessibilityCategories,
        healthCategories: state => state.healthCategories,
        physCategories: state => state.physCategories,
        priceTypes: state => state.priceTypes,
        priceGroups: state => state.priceGroups,
        ageCategories: state => state.ageCategories,
        productPriceSettings: state => state.productPriceSettings,
        schedule: state => state.schedule,
        schedules: state => state.schedules,
        cancellationTypes: state => state.cancellationTypes,
        productCancellationPolicy: state => state.productCancellationPolicy,
        personalCategories: state => state.personalCategories,
        flightCategories: state => state.flightCategories,
        shipCategories: state => state.shipCategories,
        trainCategories: state => state.trainCategories,
        ticketTypes: state => state.ticketTypes,
        productTicket: state => state.productTicket,
        langCategories: state => state.langCategories,
        cutOffCategories: state => state.cutOffCategories,
        confirmationMethods: state => state.confirmationMethods,
        bookingProcess: state => state.bookingProcess,
        bookingNeedInfo: state => state.bookingNeedInfo,
        priceAgeCategories: state => state.priceAgeCategories,
        upsellTypes: state => state.upsellTypes,
        productUpsells: state => state.productUpsells,
    },

    mutations: {
        SET_STEP(state, { step }) {
            state.currentStep = step;
        },
        SET_TOUR(state, product) {
            localStorage.setItem("tourId", product.id);
            state.tour = product;
        },
        SET_TOURS(state, tours) {
            state.tours = tours;
        },
        SET_REVIEW_TOURS(state, tours) {
            state.reviewTours = tours;
        },
        SET_DRAFTS(state, drafts) {
            state.drafts = drafts;
        },
        SET_PATCH_TOUR(state, product){
            state.tour = product;
        },
        SET_LANGUAGES(state, { languages }) {
            state.languages = languages;
        },
        SET_PRODUCT_TYPES(state, { productTypes }) {
            state.productTypes = productTypes;
        },
        SET_UPSELL_TYPES(state, { upsellTypes }) {
            if(upsellTypes){
                let object = {};
                let compContext = this;
                Object.keys(upsellTypes).map(function(objectKey, index) {
                    object[objectKey] = upsellTypes[objectKey] == "PER_BOOKING" ? 'Per booking' : 'Per traveller';
                });
                state.upsellTypes = object;
            }else{
                state.upsellTypes = {}
            }

        },
        SET_PRODUCT_UPSELLS(state, { productUpsells }) {
            state.productUpsells = productUpsells;
        },
        SET_PRODUCT_GUIDES(state, { productGuides }) {
            state.productGuides = productGuides;
        },
        SET_PRODUCT_TYPE_CATEGORIES(state, { productTypeCategories }) {
            state.productTypeCategories = productTypeCategories;
        },
        SET_STEP_COMPLETED(state, { step }) {
            if (state.completedSteps.indexOf(step) == -1){
                state.completedSteps.push(step);
                localStorage.setItem("completedSteps", state.completedSteps)
            }
        },
        SET_PRODUCT_SETTING_TYPES(state, { productSettingTypes }) {
            state.productSettingTypes = productSettingTypes;
        },
        APPEND_PRODUCT_PHOTO(state, { productPhotoUpload }) {
            let photos = localStorage.getItem("photos");

            if(!photos){

                photos = [];
                photos[0] = productPhotoUpload;
                localStorage.setItem("photos",JSON.stringify(photos));
            }else{
                photos = JSON.parse(photos);
                photos.push(productPhotoUpload);
                localStorage.setItem("photos",JSON.stringify(photos));
            }

            state.photos = photos;
        },
        DELETE_PRODUCT_PHOTO(state, { id }) {
            let photos = localStorage.getItem("photos");
            photos = JSON.parse(photos);
            photos.push(productPhotoUpload);
            let index = photos.findIndex(x => x.id === id);
            photos.splice(index, 1);
            localStorage.setItem("photos",JSON.stringify(photos));
            state.photos = photos;
        },
        SET_PRODUCT_SETTING_TYPES_CATEGORIES(state, { productSettingTypesCategories, id }) {
            const obj = {
                id: id,
                category: productSettingTypesCategories
            }

            let check = state.productSettingTypesCategories.some( vendor => vendor['id'] === id )
            if(!check){
                state.productSettingTypesCategories.push(obj);
            }
        },
        SET_PICKUP_TYPES(state, { pickUpTypes }) {

            state.pickUpTypes = pickUpTypes;
        },
        SET_THEME_CATEGORIES(state, { themeCategories }) {
            state.themeCategories = themeCategories;
        },
        SET_THEME_CATEGORIES_LIST(state, { themeCategoriesList }) {
            console.log(themeCategoriesList);
            state.themeCategoriesList = themeCategoriesList;
        },
        SET_DURATION_TYPES(state, { durationTypes }) {
            state.durationTypes = durationTypes;
        },
        SET_PICKUP_CATEGORIES(state, { pickupCategories }) {
            state.pickupCategories = pickupCategories;
        },
        SET_MEAL_CATEGORIES(state, { mealCategories }) {
            state.mealCategories = mealCategories;
        },
        SET_PRODUCT_PRICE_TYPES(state, { productPriceTypes }) {
            state.priceTypes = productPriceTypes;
        },
        SET_INCLUDED_CATEGORIES(state, { includedCategories }) {
            state.includedCategories = includedCategories;
        },
        SET_EXCLUDED_CATEGORIES(state, { excludedCategories }) {
            state.excludedCategories = excludedCategories;
        },
        SET_GROUP_ENJOY_CATEGORIES(state, { groupEnjoyCategories }) {
            state.groupEnjoyCategories = groupEnjoyCategories;
        },
        SET_TRAVELER_ENJOY_CATEGORIES(state, { travelerEnjoyCategories }) {
            state.travelerEnjoyCategories = travelerEnjoyCategories;
        },
        SET_ACCESSIBILITY_CATEGORIES(state, { accessibilityCategories }) {
            state.accessibilityCategories = accessibilityCategories;
        },
        SET_HEALTH_CATEGORIES(state, { healthCategories }) {
            state.healthCategories = healthCategories;
        },
        SET_PHYS_CATEGORIES(state, { physCategories }) {
            console.log(physCategories, "Phys Cats")
            state.physCategories = physCategories;
        },
        SET_PRICE_GROUPS(state, { priceGroups }) {
            state.priceGroups = priceGroups;
        },
        SET_AGE_CATEGORIES(state, { ageCategories }) {
            state.ageCategories = ageCategories;
        },
        SET_PRICE_AGE_CATEGORIES(state, { priceAgeCategories }) {
            state.priceAgeCategories = priceAgeCategories;
        },
        SET_PRODUCT_PRICE_SETTINGS(state, { productPriceSettings }) {
            state.productPriceSettings = productPriceSettings;
        },
        SET_SCHEDULE(state, { schedule }) {
            state.schedule = schedule;
        },
        SET_SCHEDULES(state, { schedules }) {
            state.schedules = schedules;
        },
        SET_CANCELLATION_TYPES(state, { cancellationTypes }) {
            state.cancellationTypes = cancellationTypes;
        },
        SET_PRODUCT_CANCELLATION(state, { productCancellationPolicy }) {
            state.productCancellationPolicy = productCancellationPolicy;
        },
        SET_PERSONAL_CATEGORIES(state, { personalCategories }) {
            state.personalCategories = personalCategories;
        },
        SET_FLIGHT_CATEGORIES(state, { flightCategories }) {
            state.flightCategories = flightCategories;
        },
        SET_SHIP_CATEGORIES(state, { shipCategories }) {
            state.shipCategories = shipCategories;
        },
        SET_TRAIN_CATEGORIES(state, { trainCategories }) {
            state.trainCategories = trainCategories;
        },
        SET_PRODUCT_TICKET_TYPES(state, { ticketTypes }) {
            state.ticketTypes = ticketTypes;
        },
        SET_PRODUCT_TICKET(state, { productTicket }) {
            state.productTicket = productTicket;
        },
        SET_LANG_CATEGORIES(state, { langCategories }) {
            state.langCategories = langCategories;
        },
        SET_CUT_OFF_CATEGORIES(state, { cutOffCategories }) {
            state.cutOffCategories = cutOffCategories;
        },
        SET_CONFIRMATION_METHODS(state, { confirmationMethods }) {
            state.confirmationMethods = confirmationMethods;
        },
        SET_BOOKING_PROCESS(state, { bookingProcess }) {
            console.log(state.bookingProcess)
            state.bookingProcess = bookingProcess;
        },
        SET_BOOKING_NEED_INFO(state, { bookingNeedInfo }) {
            state.bookingNeedInfo = bookingNeedInfo;
        },





    },

    actions: {
        fetchSetStep({ commit }, step) {
            commit('SET_STEP', step)
        },

        fetchUnsetTourId({ commit }) {
            localStorage.setItem('tourId', false);
            localStorage.removeItem('tourId');
            commit('SET_TOUR', {})
        },

        // Step no 1
        async fetchFirstStep({ commit, dispatch }, body) {
            try {
                const id = localStorage.getItem("tourId");
                if(id && id !== 'undefined'){
                    const product = await apiRequest.patch('products/' + id, body)
                    await dispatch('getTour')
                    commit('SET_STEP', { step: 2})
                    commit('ui/PUSH_NOTIFY', {
                        type: 'success',
                        group: 'alert',
                        title: 'Success!',
                        text: `Step completed!`
                    }, { root: true })
                }else{
                    const product = await apiRequest.post('products', body)

                    // const newBody = { operator_id: body.operator_id}
                    //
                    // const operator = await apiRequest.patch('products/' + product.data.id + '/set-operator', newBody )
                    await commit('SET_TOUR', product.data)
                    await dispatch('getTour')
                    commit('SET_STEP', { step: 2})
                    commit('ui/PUSH_NOTIFY', {
                        type: 'success',
                        group: 'alert',
                        title: 'Success!',
                        text: `Step completed!`
                    }, { root: true })
                }
            } catch (e) {
                for (let key in e) {
                    if (e.hasOwnProperty(key)) {
                        e[key].forEach(function (element, index) {

                            commit('ui/PUSH_NOTIFY', {
                                type: 'error',
                                group: 'alert',
                                title: 'Tours',
                                text: element
                            }, { root: true })

                        });
                    }
                }
            }
        },

        // Step no 2
        async fetchSecondStep({ commit, dispatch }, body) {
            try {
                const id = localStorage.getItem("tourId");
                if(id && id !== 'undefined'){
                    if(body.typeCategories.length < 1 || !body.product_type_id){
                        if(!body.product_type_id){
                            commit('ui/PUSH_NOTIFY', {
                                type: 'error',
                                group: 'alert',
                                title: 'Tours',
                                text: "product_type_id cannot be blank"
                            }, { root: true })
                        }else{
                            if(body.typeCategories.length < 1){
                                commit('ui/PUSH_NOTIFY', {
                                    type: 'error',
                                    group: 'alert',
                                    title: 'Tours',
                                    text: "Type categories length should be more than 1"
                                }, { root: true })
                            }
                        }
                    }else{
                        const product = await apiRequest.patch('products/' + id, body)
                        await dispatch('getTour')
                        commit('SET_STEP', { step: 3})
                        commit('ui/PUSH_NOTIFY', {
                            type: 'success',
                            group: 'alert',
                            title: 'Success!',
                            text: `Step completed!`
                        }, { root: true })
                    }
                }
            } catch (e) {
                for (let key in e) {
                    if (e.hasOwnProperty(key)) {
                        e[key].forEach(function (element, index) {

                            commit('ui/PUSH_NOTIFY', {
                                type: 'error',
                                group: 'alert',
                                title: 'Tours',
                                text: element
                            }, { root: true })

                        });
                    }
                }
            }
        },

        // Step no 3
        async fetchThirdStep({ commit, dispatch }, body) {
            try {
                const id = localStorage.getItem("tourId");
                if(id && id !== 'undefined'){
                    if(body.themeCategories.length < 1){
                        commit('ui/PUSH_NOTIFY', {
                            type: 'error',
                            group: 'alert',
                            title: 'Tours',
                            text: "You should select at least one theme category"
                        }, { root: true })
                    }else{
                        const product = await apiRequest.patch('products/' + id, body)
                        await dispatch('getTour')
                        commit('SET_STEP', { step: 4})
                        commit('ui/PUSH_NOTIFY', {
                            type: 'success',
                            group: 'alert',
                            title: 'Success!',
                            text: `Step completed!`
                        }, { root: true })
                    }
                }
            } catch (e) {
                for (let key in e) {
                    if (e.hasOwnProperty(key)) {
                        e[key].forEach(function (element, index) {

                            commit('ui/PUSH_NOTIFY', {
                                type: 'error',
                                group: 'alert',
                                title: 'Tours',
                                text: element
                            }, { root: true })

                        });
                    }
                }
            }
        },

        async fetchPromoData({ commit, dispatch }, body) {
            try {
                const id = localStorage.getItem("tourId");
                if(id && id !== 'undefined'){
                    await apiRequest.post('products/' + id + '/promo', body)
                }
            } catch (e) {
                for (let key in e) {
                    if (e.hasOwnProperty(key)) {
                        e[key].forEach(function (element, index) {

                            commit('ui/PUSH_NOTIFY', {
                                type: 'error',
                                group: 'alert',
                                title: 'Tours',
                                text: element
                            }, { root: true })

                        });
                    }
                }
            }
        },

        async fetchFourthStep({ commit, dispatch }, body) {
            try {

                const id = localStorage.getItem("tourId");
                if(id && id !== 'undefined'){
                    const product = await apiRequest.get('products/' + id +'?expand=progress,productPhotos')

                    if(product.data.productPhotos.length < 1){

                        commit('ui/PUSH_NOTIFY', {
                            type: 'error',
                            group: 'alert',
                            title: 'Tours',
                            text: 'You should upload at least one photo'
                        }, { root: true })
                    }else{
                        await dispatch('getTour')
                        const product = await apiRequest.patch('products/' + id, body)
                        commit('SET_STEP', { step: 5})
                        commit('ui/PUSH_NOTIFY', {
                            type: 'success',
                            group: 'alert',
                            title: 'Success!',
                            text: `Step completed!`
                        }, { root: true })
                    }
                    // console.log(product, "Product is here");
                    // commit('SET_STEP', { step: 6})
                    // commit('ui/PUSH_NOTIFY', {
                    //     type: 'success',
                    //     group: 'alert',
                    //     title: 'Success!',
                    //     text: `Step completed!`
                    // }, { root: true })
                }
            } catch (e) {
                for (let key in e) {
                    if (e.hasOwnProperty(key)) {
                        e[key].forEach(function (element, index) {

                            commit('ui/PUSH_NOTIFY', {
                                type: 'error',
                                group: 'alert',
                                title: 'Tours',
                                text: element
                            }, { root: true })

                        });
                    }
                }
                // commit('SET_FIRST_STEP', [])
            }
        },

        // Step no 3
        async fetchFifthStep({ commit, dispatch }, body) {
            try {
                const id = localStorage.getItem("tourId");
                if(id && id !== 'undefined'){
                    const product = await apiRequest.patch('products/' + id + '/pick-up-drop-off', body)
                    await dispatch('getTour')
                    commit('SET_STEP', { step: 6})
                    commit('ui/PUSH_NOTIFY', {
                        type: 'success',
                        group: 'alert',
                        title: 'Success!',
                        text: `Step completed!`
                    }, { root: true })
                }
            } catch (e) {
                for (let key in e) {
                    if (e.hasOwnProperty(key)) {
                        e[key].forEach(function (element, index) {

                            commit('ui/PUSH_NOTIFY', {
                                type: 'error',
                                group: 'alert',
                                title: 'Tours',
                                text: element
                            }, { root: true })

                        });
                    }
                }
                // commit('SET_FIRST_STEP', [])
            }
        },
        // Step no 3
        async fetchSixthStep({ commit, dispatch }, body) {
            try {
                const id = localStorage.getItem("tourId");
                if(id && id !== 'undefined'){
                    const product = await apiRequest.patch('products/' + id + '/days', body)
                    await dispatch('getTour')
                    commit('SET_STEP', { step: 7})
                    commit('ui/PUSH_NOTIFY', {
                        type: 'success',
                        group: 'alert',
                        title: 'Success!',
                        text: `Step completed!`
                    }, { root: true })
                }
            } catch (e) {
                for (let key in e) {
                    if (e.hasOwnProperty(key)) {
                        e[key].forEach(function (element, index) {

                            commit('ui/PUSH_NOTIFY', {
                                type: 'error',
                                group: 'alert',
                                title: 'Tours',
                                text: element
                            }, { root: true })

                        });
                    }
                }
            }
        },

        // Step no 3
        async fetchSeventhStep({ commit, dispatch }, body) {
            try {
                const id = localStorage.getItem("tourId");
                if(id && id !== 'undefined'){
                    const product = await apiRequest.patch('products/' + id +'/guides', body)
                    const productGuides = await apiRequest.get('products/'+ id +'/guides')
                    commit('SET_PRODUCT_GUIDES', { productGuides: productGuides.data })
                    await dispatch('getTour')
                    commit('SET_STEP', { step: 8})
                    commit('ui/PUSH_NOTIFY', {
                        type: 'success',
                        group: 'alert',
                        title: 'Success!',
                        text: `Step completed!`
                    }, { root: true })
                }
            } catch (e) {
                for (let key in e) {
                    if (e.hasOwnProperty(key)) {
                        e[key].forEach(function (element, index) {

                            commit('ui/PUSH_NOTIFY', {
                                type: 'error',
                                group: 'alert',
                                title: 'Tours',
                                text: element
                            }, { root: true })

                        });
                    }
                }
                // commit('SET_FIRST_STEP', [])
            }
        },

        async fetchEightStep({ commit, dispatch }, body) {
            try {
                const id = localStorage.getItem("tourId");
                if(id && id !== 'undefined'){
                    const product = await apiRequest.patch('products/' + id, body)
                    await dispatch('getTour')
                    commit('SET_STEP', { step: 9})
                    commit('ui/PUSH_NOTIFY', {
                        type: 'success',
                        group: 'alert',
                        title: 'Success!',
                        text: `Step completed!`
                    }, { root: true })
                }
            } catch (e) {
                for (let key in e) {
                    if (e.hasOwnProperty(key)) {
                        e[key].forEach(function (element, index) {

                            commit('ui/PUSH_NOTIFY', {
                                type: 'error',
                                group: 'alert',
                                title: 'Tours',
                                text: element
                            }, { root: true })

                        });
                    }
                }
                // commit('SET_FIRST_STEP', [])
            }
        },

        // Step no 3
        async fetchNinghtStep({ commit, dispatch }, body) {
            try {
                const id = localStorage.getItem("tourId");
                if(id && id !== 'undefined'){
                    if(!body.description_why_unique){
                        commit('ui/PUSH_NOTIFY', {
                            type: 'error',
                            group: 'alert',
                            title: 'Tours',
                            text: "description_why_unique is required"
                        }, { root: true })
                    }else{
                        const product = await apiRequest.patch('products/' + id, body)
                        await dispatch('getTour')
                        commit('SET_STEP', { step: 10})
                        commit('ui/PUSH_NOTIFY', {
                            type: 'success',
                            group: 'alert',
                            title: 'Success!',
                            text: `Step completed!`
                        }, { root: true })
                    }
                }
            } catch (e) {
                for (let key in e) {
                    if (e.hasOwnProperty(key)) {
                        e[key].forEach(function (element, index) {

                            commit('ui/PUSH_NOTIFY', {
                                type: 'error',
                                group: 'alert',
                                title: 'Tours',
                                text: element
                            }, { root: true })

                        });
                    }
                }
            }
        },

        async fetchElevenStep({ commit, dispatch }, body) {
            try {
                const id = localStorage.getItem("tourId");
                if(id && id !== 'undefined'){
                    const product = await apiRequest.patch('products/' + id, body)
                    await dispatch('getTour')
                    commit('SET_STEP', { step: 11})
                    commit('ui/PUSH_NOTIFY', {
                        type: 'success',
                        group: 'alert',
                        title: 'Success!',
                        text: `Step completed!`
                    }, { root: true })
                }
            } catch (e) {
                for (let key in e) {
                    if (e.hasOwnProperty(key)) {
                        e[key].forEach(function (element, index) {

                            commit('ui/PUSH_NOTIFY', {
                                type: 'error',
                                group: 'alert',
                                title: 'Tours',
                                text: element
                            }, { root: true })

                        });
                    }
                }
            }
        },

        async fetchTenthStep({ commit, dispatch }, body) {
            try {
                const id = localStorage.getItem("tourId");
                if(id && id !== 'undefined'){
                    if(!body.tour.phone_number){
                        commit('ui/PUSH_NOTIFY', {
                            type: 'error',
                            group: 'alert',
                            title: 'Tours',
                            text: "Phone number is required"
                        }, { root: true })
                    }else{
                        const product = await apiRequest.patch('products/' + id, body.tour)
                        const products = await apiRequest.get('products/' + id)
                        const rest = await apiRequest.patch('products/' + id + '/physical-restrictions', body.rest)
                        await dispatch('getTour')
                        commit('SET_STEP', { step: 12})
                        commit('ui/PUSH_NOTIFY', {
                            type: 'success',
                            group: 'alert',
                            title: 'Success!',
                            text: `Step completed!`
                        }, { root: true })
                    }
                }
            } catch (e) {
                for (let key in e) {
                    if (e.hasOwnProperty(key)) {
                        e[key].forEach(function (element, index) {

                            commit('ui/PUSH_NOTIFY', {
                                type: 'error',
                                group: 'alert',
                                title: 'Tours',
                                text: element
                            }, { root: true })

                        });
                    }
                }
            }
        },

        async fetchTwelveStep({ commit, dispatch }, body) {
            try {

                const id = localStorage.getItem("tourId");

                if(id && id !== 'undefined'){
                    const rest = await apiRequest.patch('products/' + id + '/price-settings', body)
                    const productPriceSettings = await apiRequest.get('products/' + id +'/price-settings')
                    commit('SET_PRODUCT_PRICE_SETTINGS', { productPriceSettings: productPriceSettings.data})
                    commit('SET_STEP', { step: 15})
                    await dispatch('getTour')
                    await dispatch('getBookingProcess')
                    await dispatch('getCutOffCategories')
                    await dispatch('getConfirmationMethods')
                    await dispatch('getBookingInfo')

                    commit('ui/PUSH_NOTIFY', {
                        type: 'success',
                        group: 'alert',
                        title: 'Success!',
                        text: `Step completed!`
                    }, { root: true })
                }
            } catch (e) {
                for (let key in e) {
                    if (e.hasOwnProperty(key)) {
                        e[key].forEach(function (element, index) {

                            commit('ui/PUSH_NOTIFY', {
                                type: 'error',
                                group: 'alert',
                                title: 'Tours',
                                text: element
                            }, { root: true })

                        });
                    }
                }
            }
        },
        async fetchThirteenStep({ commit, dispatch }, body) {
            try {

                const id = localStorage.getItem("tourId");

                if(id && id !== 'undefined'){
                    commit('SET_STEP', { step: 16})
                    await dispatch('getTour')
                    await dispatch('getBookingProcess')
                    await dispatch('getCutOffCategories')
                    await dispatch('getConfirmationMethods')
                    await dispatch('getBookingInfo')

                    commit('ui/PUSH_NOTIFY', {
                        type: 'success',
                        group: 'alert',
                        title: 'Success!',
                        text: `Step completed!`
                    }, { root: true })
                }
            } catch (e) {
                for (let key in e) {
                    if (e.hasOwnProperty(key)) {
                        e[key].forEach(function (element, index) {

                            commit('ui/PUSH_NOTIFY', {
                                type: 'error',
                                group: 'alert',
                                title: 'Tours',
                                text: element
                            }, { root: true })

                        });
                    }
                }
            }
        },
        fetchSeventeenStepNew({ commit, dispatch }){
            commit('SET_STEP', { step: 17})
        },

        async fetchSeventeenStep({ commit, dispatch }, body) {
            try {

                const id = localStorage.getItem("tourId");
                const rest = await apiRequest.patch('products/' + id + '/booking-process', body)

                const bookingProcess = await apiRequest.get('products/' + id +'/booking-process')
                commit('SET_BOOKING_PROCESS', { bookingProcess: bookingProcess.data})

                commit('SET_STEP', { step: 18})
                await dispatch('getTour')
                await dispatch('getBookingProcess')
                await dispatch('getCutOffCategories')
                await dispatch('getConfirmationMethods')
                await dispatch('getBookingInfo')

                commit('ui/PUSH_NOTIFY', {
                    type: 'success',
                    group: 'alert',
                    title: 'Success!',
                    text: `Step completed!`
                }, { root: true })

            } catch (e) {
                for (let key in e) {
                    if (e.hasOwnProperty(key)) {
                        e[key].forEach(function (element, index) {

                            commit('ui/PUSH_NOTIFY', {
                                type: 'error',
                                group: 'alert',
                                title: 'Tours',
                                text: element
                            }, { root: true })

                        });
                    }
                }
            }
        },

        async fetchEightTeenStep({ commit, dispatch }, body) {
            try {

                const id = localStorage.getItem("tourId");
                const rest = await apiRequest.patch('products/' + id + '/cancellation-policy', body)
                const productCancellationPolicy = await apiRequest.get('products/' + id +'/cancellation-policy')
                commit('SET_PRODUCT_CANCELLATION', { productCancellationPolicy: productCancellationPolicy.data})

                commit('SET_STEP', { step: 19})
                await dispatch('getTour')
                await dispatch('getBookingProcess')
                await dispatch('getCutOffCategories')
                await dispatch('getConfirmationMethods')
                await dispatch('getBookingInfo')

                commit('ui/PUSH_NOTIFY', {
                    type: 'success',
                    group: 'alert',
                    title: 'Success!',
                    text: `Step completed!`
                }, { root: true })

            } catch (e) {
                for (let key in e) {
                    if (e.hasOwnProperty(key)) {
                        e[key].forEach(function (element, index) {

                            commit('ui/PUSH_NOTIFY', {
                                type: 'error',
                                group: 'alert',
                                title: 'Tours',
                                text: element
                            }, { root: true })

                        });
                    }
                }
            }
        },


        async fetchNineteenStep({ commit, dispatch }, body) {
            try {

                const id = localStorage.getItem("tourId");
                if(id && id !== 'undefined'){
                    await apiRequest.patch('products/' + id, body)
                    commit('SET_STEP', { step: 20})
                    await dispatch('getTour')
                    await dispatch('getBookingProcess')
                    await dispatch('getCutOffCategories')
                    await dispatch('getConfirmationMethods')
                    await dispatch('getBookingInfo')



                    commit('ui/PUSH_NOTIFY', {
                        type: 'success',
                        group: 'alert',
                        title: 'Success!',
                        text: `Step completed!`
                    }, { root: true })
                }
            } catch (e) {
                for (let key in e) {
                    if (e.hasOwnProperty(key)) {
                        e[key].forEach(function (element, index) {

                            commit('ui/PUSH_NOTIFY', {
                                type: 'error',
                                group: 'alert',
                                title: 'Tours',
                                text: element
                            }, { root: true })

                        });
                    }
                }
            }
        },

        async fetchNineteenStepNew({ commit, dispatch }, body) {
            try {

                const id = localStorage.getItem("tourId");
                if(id && id !== 'undefined'){
                    const bookingNeedInfo = await apiRequest.patch('products/' + id +'/booking-needed-information-from-traveler', body)
                    commit('SET_BOOKING_NEED_INFO', { bookingNeedInfo: bookingNeedInfo.data})

                    commit('SET_STEP', { step: 20})
                    await dispatch('getTour')
                    await dispatch('getBookingProcess')
                    await dispatch('getCutOffCategories')
                    await dispatch('getConfirmationMethods')




                    commit('ui/PUSH_NOTIFY', {
                        type: 'success',
                        group: 'alert',
                        title: 'Success!',
                        text: `Step completed!`
                    }, { root: true })
                }
            } catch (e) {
                for (let key in e) {
                    if (e.hasOwnProperty(key)) {
                        e[key].forEach(function (element, index) {

                            commit('ui/PUSH_NOTIFY', {
                                type: 'error',
                                group: 'alert',
                                title: 'Tours',
                                text: element
                            }, { root: true })

                        });
                    }
                }
            }
        },

        async getBookingInfo({ commit }){
            try {
                const id = localStorage.getItem("tourId");
                if(id && id !== 'undefined'){
                    const bookingNeedInfo = await apiRequest.get('products/' + id +'/booking-needed-information-from-traveler')
                    commit('SET_BOOKING_NEED_INFO', { bookingNeedInfo: bookingNeedInfo.data})
                }
            } catch (e) {
                commit('SET_TOUR', {})
            }
        },

        async fetchTwentyStep({ commit, dispatch }, body) {
            try {

                const id = localStorage.getItem("tourId");
                if(id && id !== 'undefined'){
                    await apiRequest.post('products/' + id +'/ticket', body)
                    await apiRequest.post('products/' + id +'/publish')
                    await dispatch('getTour')
                    await dispatch('getBookingProcess')
                    await dispatch('getCutOffCategories')
                    await dispatch('getConfirmationMethods')
                    await dispatch('getBookingInfo')
                    await dispatch('getTours')

                    commit('ui/PUSH_NOTIFY', {
                        type: 'success',
                        group: 'alert',
                        title: 'Success!',
                        text: `The product has been published!`
                    }, { root: true })

                    $router.push('/tours')
                }
            } catch (e) {
                for (let key in e) {
                    if (e.hasOwnProperty(key)) {
                        e[key].forEach(function (element, index) {

                            commit('ui/PUSH_NOTIFY', {
                                type: 'error',
                                group: 'alert',
                                title: 'Tours',
                                text: element
                            }, { root: true })

                        });
                    }
                }
            }
        },

        async getProductTickets({ commit }){
            try {
                const id = localStorage.getItem("tourId");
                if(id && id !== 'undefined'){
                    const productTicket = await apiRequest.get('products/' + id +'/ticket')
                    commit('SET_PRODUCT_TICKET', { productTicket: productTicket.data})
                }
            } catch (e) {
                commit('SET_TOUR', {})
            }
        },


        async getTour({ commit }){
            try {
                const id = localStorage.getItem("tourId");
                if(id && id !== 'undefined'){
                    const product = await apiRequest.get('products/' + id +'?expand=progress,typeCategories,themeCategories,themeCategoriesList,productPhotos,productPickUpDropOff,productDays,whatsIncludedCategories,whatsExcludedCategories,groupEnjoyCategories,travelerEnjoyCategories,productPhysicalRestrictions,personalInformationYouNeedCategories,flightInformationYouNeedCategories,shipInformationYouNeedCategories,trainInformationYouNeedCategories,city,promo')
                    commit('SET_TOUR', product.data)
                }else{
                    commit('SET_TOUR', {})
                }
            } catch (e) {
                commit('SET_TOUR', {})
            }
        },

        async getProductPriceSettings({ commit }){
            try {
                const id = localStorage.getItem("tourId");
                if(id && id !== 'undefined'){
                    const productPriceSettings = await apiRequest.get('products/' + id +'/price-settings')
                    commit('SET_PRODUCT_PRICE_SETTINGS', { productPriceSettings: productPriceSettings.data})
                }
            } catch (e) {
                commit('SET_TOUR', {})
            }
        },

        async getTourById({ commit }, id){
            const tourId = localStorage.setItem("tourId", id);
            const product = await apiRequest.get('products/' + id +'?expand=progress,themeCategories,themeCategoriesList,productPhotos,productPickUpDropOff,productDays,whatsIncludedCategories,whatsExcludedCategories,groupEnjoyCategories,travelerEnjoyCategories,productPhysicalRestrictions,personalInformationYouNeedCategories,flightInformationYouNeedCategories,shipInformationYouNeedCategories,trainInformationYouNeedCategories,city,promo')
            commit('SET_TOUR', product.data)
        },

        async getTours({ commit }, query = false){
            try {
                let q = '';
                if (query) q = '&query=' + query

                const product = await apiRequest.get('products' +'?expand=progress,productPhotos&sort=-id&status[]=active&status[]=inactive' + q)
                commit('SET_TOURS', product.data)
                const drafts = await apiRequest.get('products' +'?expand=progress,productPhotos&sort=-id&status[]=draft' + q)
                commit('SET_DRAFTS', drafts.data)
            } catch (e) {
                commit('SET_FIRST_STEP', [])
            }
        },

        async getReviewTours({ commit }, query = false){
            try {
                let q = '';
                if (query) q = '&query=' + query

                const product = await apiRequest.get('products' +'?isReviewsExists=1&expand=rating,reviewsCount,totalBookedCount,ratingStats&sort=-id&status[]=active&status[]=inactive' + q)
                commit('SET_REVIEW_TOURS', product.data)
            } catch (e) {
                commit('SET_FIRST_STEP', [])
            }
        },

        async fetchCopyProduct({ commit, dispatch }, id){
            try {
                await apiRequest.post('products/' + id + '/copy')
                dispatch('getTours');
                commit('ui/PUSH_NOTIFY', {
                    type: 'success',
                    group: 'alert',
                    title: 'Success!',
                    text: `Product has been copied successfully!`
                }, { root: true })
            } catch (e) {
                commit('ui/PUSH_NOTIFY', {
                    type: 'error',
                    group: 'alert',
                    title: 'Success!',
                    text: `Product has not been copied!`
                }, { root: true })
            }
        },

        async getLanguages({ commit }) {
            try {
                const languages = await apiRequest.get('languages')
                commit('SET_LANGUAGES', { languages: languages.data })
            } catch (e) {
                commit('SET_LANGUAGES', [])
            }
        },

        async getProductTypes({ commit }) {
            try {
                const productTypes = await apiRequest.get('product-types')
                commit('SET_PRODUCT_TYPES', { productTypes: productTypes.data })
            } catch (e) {
                commit('SET_PRODUCT_TYPES', [])
            }
        },

        async getProductTypeCategories({ commit }, id) {
            try {
                const productTypeCategories = await apiRequest.get('product-types/' + id + '/categories-list')
                commit('SET_PRODUCT_TYPE_CATEGORIES', { productTypeCategories: productTypeCategories.data })
            } catch (e) {
                commit('SET_PRODUCT_TYPE_CATEGORIES', [])
            }
        },

        async getProductSettingTypes({ commit }) {
            try {
                const productSettingTypes = await apiRequest.get('product-setting-types')
                commit('SET_PRODUCT_SETTING_TYPES', { productSettingTypes: productSettingTypes.data })
            } catch (e) {
                commit('SET_PRODUCT_SETTING_TYPES', [])
            }
        },

        async getThemes({ commit }) {
            try {
                const productSettingTypes = await apiRequest.get('product-setting-types')
                commit('SET_PRODUCT_SETTING_TYPES', { productSettingTypes: productSettingTypes.data })
                let id = null
                productSettingTypes.data.forEach(function (element, index) {

                    if(element.typeName == 'THEME'){
                        id = element.id;
                    }
                });
                const themeCategories = await apiRequest.get('product-setting-types/' + id + '/categories')
                const themeCategoriesList = await apiRequest.get('product-setting-types/' + id + '/categories-list')
                const themeCategoriesTree = await apiRequest.get('product-setting-types/' + id + '/categories-tree')
                commit('SET_THEME_CATEGORIES', { themeCategories: themeCategories.data })
                commit('SET_THEME_CATEGORIES_LIST', { themeCategoriesList: themeCategoriesTree.data })

            } catch (e) {
                commit('SET_PRODUCT_SETTING_TYPES', [])
            }
        },

        async getProductSettingTypesCategories({ commit }, id) {
            try {
                const productSettingTypesCategories = await apiRequest.get('product-setting-types/' + id + '/categories')
                commit('SET_PRODUCT_SETTING_TYPES_CATEGORIES', { productSettingTypesCategories: productSettingTypesCategories.data, id: id })
            } catch (e) {
                commit('SET_PRODUCT_SETTING_TYPES_CATEGORIES', [])
            }
        },

        async uploadPhoto({ commit, state }, body) {
            try {
                if(state.tour.id){
                    const productPhotoUpload = await apiRequest.post('products/' + state.tour.id + '/photo', body)
                    const tourId = localStorage.getItem("tourId");
                    const product = await apiRequest.get('products/' + tourId +'?expand=progress,themeCategories,themeCategoriesList,productPhotos,productPickUpDropOff,productDays,whatsIncludedCategories,whatsExcludedCategories,groupEnjoyCategories,travelerEnjoyCategories,productPhysicalRestrictions')
                    commit('ui/PUSH_NOTIFY', {
                        type: 'success',
                        group: 'alert',
                        title: 'Success!',
                        text: `Photo uploaded!`
                    }, { root: true })

                    commit('SET_TOUR', product.data)
                }
            } catch (e) {
                for (let key in e) {
                    if (e.hasOwnProperty(key)) {
                        e[key].forEach(function (element, index) {

                            commit('ui/PUSH_NOTIFY', {
                                type: 'error',
                                group: 'alert',
                                title: 'Tours',
                                text: element
                            }, { root: true })

                        });
                    }
                }
            }
        },

        async deletePhoto({commit, state}, id) {
            try {
                if(state.tour.id){
                    const productPhotoUpload = await apiRequest.delete('products/' + state.tour.id + '/photo/' + id)
                    const tourId = localStorage.getItem("tourId");
                    const product = await apiRequest.get('products/' + tourId +'?expand=progress,themeCategories,themeCategoriesList,productPhotos,productPickUpDropOff,productDays,whatsIncludedCategories,whatsExcludedCategories,groupEnjoyCategories,travelerEnjoyCategories,productPhysicalRestrictions')
                    commit('ui/PUSH_NOTIFY', {
                        type: 'success',
                        group: 'alert',
                        title: 'Success!',
                        text: `Photo successfully deleted!`
                    }, { root: true })
                    commit('SET_TOUR', product.data)
                }
            } catch (e) {
            }
        },

        async getPickUpTypes({ commit }) {
            try {
                const pickUpTypes = await apiRequest.get('products/pick-up-types')
                commit('SET_PICKUP_TYPES', { pickUpTypes: pickUpTypes.data })
            } catch (e) {
                commit('SET_PICKUP_TYPES', [])
            }
        },

        async getProductGuides({ commit }) {
            try {
                const id = localStorage.getItem("tourId");
                const productGuides = await apiRequest.get('products/'+ id +'/guides')
                commit('SET_PRODUCT_GUIDES', { productGuides: productGuides.data })
            } catch (e) {
                commit('SET_PRODUCT_GUIDES', [])
            }
        },

        async getDurationTypes({ commit }) {
            try {
                const durationTypes = await apiRequest.get('products/duration-types')
                commit('SET_DURATION_TYPES', { durationTypes: durationTypes.data })
            } catch (e) {
                commit('SET_DURATION_TYPES', [])
            }
        },

        async getPickups({ commit }) {
            try {
                const productSettingTypes = await apiRequest.get('product-setting-types')
                commit('SET_PRODUCT_SETTING_TYPES', { productSettingTypes: productSettingTypes.data })
                let id = null
                productSettingTypes.data.forEach(function (element, index) {

                    if(element.typeName == 'PICKUP'){
                        id = element.id;
                    }
                });
                const pickupCategories = await apiRequest.get('product-setting-types/' + id + '/categories')
                commit('SET_PICKUP_CATEGORIES', { pickupCategories: pickupCategories.data })

            } catch (e) {
                commit('SET_PRODUCT_SETTING_TYPES', [])
            }
        },

        async getMeals({ commit }) {
            try {
                const productSettingTypes = await apiRequest.get('product-setting-types')
                commit('SET_PRODUCT_SETTING_TYPES', { productSettingTypes: productSettingTypes.data })
                let id = null
                productSettingTypes.data.forEach(function (element, index) {

                    if(element.typeName == 'MEAL'){
                        id = element.id;
                    }
                });
                const mealCategories = await apiRequest.get('product-setting-types/' + id + '/categories-list')
                commit('SET_MEAL_CATEGORIES', { mealCategories: mealCategories.data })

            } catch (e) {
                commit('SET_PRODUCT_SETTING_TYPES', [])
            }
        },

        async getIncluded({ commit }) {
            try {
                const productSettingTypes = await apiRequest.get('product-setting-types')
                commit('SET_PRODUCT_SETTING_TYPES', { productSettingTypes: productSettingTypes.data })
                let id = null
                productSettingTypes.data.forEach(function (element, index) {

                    if(element.typeName == 'WHATS_INCLUDED'){
                        id = element.id;
                    }
                });
                const includedCategories = await apiRequest.get('product-setting-types/' + id + '/categories-list')
                commit('SET_INCLUDED_CATEGORIES', { includedCategories: includedCategories.data })

            } catch (e) {
                commit('SET_PRODUCT_SETTING_TYPES', [])
            }
        },

        async getGroupEnjoy({ commit }) {
            try {
                const productSettingTypes = await apiRequest.get('product-setting-types')
                commit('SET_PRODUCT_SETTING_TYPES', { productSettingTypes: productSettingTypes.data })
                let id = null
                productSettingTypes.data.forEach(function (element, index) {

                    if(element.typeName == 'GROUP_ENJOY'){
                        id = element.id;
                    }
                });
                const groupEnjoyCategories = await apiRequest.get('product-setting-types/' + id + '/categories-list')
                commit('SET_GROUP_ENJOY_CATEGORIES', { groupEnjoyCategories: groupEnjoyCategories.data })

            } catch (e) {
                commit('SET_PRODUCT_SETTING_TYPES', [])
            }
        },

        async getTravelerEnjoy({ commit }) {
            try {
                const productSettingTypes = await apiRequest.get('product-setting-types')
                commit('SET_PRODUCT_SETTING_TYPES', { productSettingTypes: productSettingTypes.data })
                let id = null
                productSettingTypes.data.forEach(function (element, index) {

                    if(element.typeName == 'TRAVELER_ENJOY'){
                        id = element.id;
                    }
                });
                const travelerEnjoyCategories = await apiRequest.get('product-setting-types/' + id + '/categories-list')
                commit('SET_TRAVELER_ENJOY_CATEGORIES', { travelerEnjoyCategories: travelerEnjoyCategories.data })

            } catch (e) {
                commit('SET_PRODUCT_SETTING_TYPES', [])
            }
        },

        async getLangCategories({ commit }) {
            try {
                const productSettingTypes = await apiRequest.get('product-setting-types')
                commit('SET_PRODUCT_SETTING_TYPES', { productSettingTypes: productSettingTypes.data })
                let id = null
                productSettingTypes.data.forEach(function (element, index) {

                    if(element.typeName == 'LANGUAGE'){
                        id = element.id;
                    }
                });
                const langCategories = await apiRequest.get('product-setting-types/' + id + '/categories-list')
                commit('SET_LANG_CATEGORIES', { langCategories: langCategories.data })

            } catch (e) {
                commit('SET_PRODUCT_SETTING_TYPES', [])
            }
        },

        async getExcluded({ commit }) {
            try {
                const productSettingTypes = await apiRequest.get('product-setting-types')
                commit('SET_PRODUCT_SETTING_TYPES', { productSettingTypes: productSettingTypes.data })
                let id = null
                productSettingTypes.data.forEach(function (element, index) {

                    if(element.typeName == 'WHATS_EXCLUDED'){
                        id = element.id;
                    }
                });
                const excludedCategories = await apiRequest.get('product-setting-types/' + id + '/categories-list')
                commit('SET_EXCLUDED_CATEGORIES', { excludedCategories: excludedCategories.data })

            } catch (e) {
                commit('SET_PRODUCT_SETTING_TYPES', [])
            }
        },

        async getAccesibilities({ commit }) {
            try {
                const productSettingTypes = await apiRequest.get('product-setting-types')
                commit('SET_PRODUCT_SETTING_TYPES', { productSettingTypes: productSettingTypes.data })
                let id = null
                productSettingTypes.data.forEach(function (element, index) {

                    if(element.typeName == 'ACCESSIBILITY'){
                        id = element.id;
                    }
                });
                const accessibilityCategories = await apiRequest.get('product-setting-types/' + id + '/categories-list')
                commit('SET_ACCESSIBILITY_CATEGORIES', { accessibilityCategories: accessibilityCategories.data })

            } catch (e) {
                commit('SET_PRODUCT_SETTING_TYPES', [])
            }
        },

        async getHealth({ commit }) {
            try {
                const productSettingTypes = await apiRequest.get('product-setting-types')
                commit('SET_PRODUCT_SETTING_TYPES', { productSettingTypes: productSettingTypes.data })
                let id = null
                productSettingTypes.data.forEach(function (element, index) {

                    if(element.typeName == 'HEALTH_RESTRICTION'){
                        id = element.id;
                    }
                });
                const healthCategories = await apiRequest.get('product-setting-types/' + id + '/categories-list')
                commit('SET_HEALTH_CATEGORIES', { healthCategories: healthCategories.data })

            } catch (e) {
                commit('SET_PRODUCT_SETTING_TYPES', [])
            }
        },


        async getPhysicalDifficulty({ commit }) {
            try {
                const productSettingTypes = await apiRequest.get('product-setting-types')
                commit('SET_PRODUCT_SETTING_TYPES', { productSettingTypes: productSettingTypes.data })
                let id = null
                productSettingTypes.data.forEach(function (element, index) {

                    if(element.typeName == 'PHYSICAL_DIFFICULTY_LEVEL'){
                        id = element.id;
                    }
                });

                const physCategories = await apiRequest.get('product-setting-types/' + id + '/categories-list')
                commit('SET_PHYS_CATEGORIES', { physCategories: physCategories.data })

            } catch (e) {
                commit('SET_PRODUCT_SETTING_TYPES', [])
            }
        },

        async getPriceGroups({ commit }) {
            try {
                const productSettingTypes = await apiRequest.get('product-setting-types')
                commit('SET_PRODUCT_SETTING_TYPES', { productSettingTypes: productSettingTypes.data })
                let id = null

                console.log(productSettingTypes, "SETTING TYPES");

                productSettingTypes.data.forEach(function (element, index) {
                    if(element.typeName == 'PRICE_GROUP'){
                        id = element.id;
                    }
                });
                const priceGroups = await apiRequest.get('product-setting-types/' + id + '/categories-list')
                commit('SET_PRICE_GROUPS', { priceGroups: priceGroups.data })

            } catch (e) {
                commit('SET_PRICE_GROUPS', [])
            }
        },

        async getAges({ commit }) {
            try {
                const productSettingTypes = await apiRequest.get('product-setting-types')
                commit('SET_PRODUCT_SETTING_TYPES', { productSettingTypes: productSettingTypes.data })
                let id = null
                productSettingTypes.data.forEach(function (element, index) {

                    if(element.typeName == 'AGE'){
                        id = element.id;
                    }
                });
                const ageCategories = await apiRequest.get('product-setting-types/' + id + '/categories-list')
                commit('SET_AGE_CATEGORIES', { ageCategories: ageCategories.data })
                const priceTypes = await apiRequest.get('products/product-price-types')
                commit('SET_PRODUCT_PRICE_TYPES', { productPriceTypes: priceTypes.data })

            } catch (e) {
                commit('SET_PRICE_GROUPS', [])
            }
        },

        async getPriceAges({ commit }) {
            try {
                // const productSettingTypes = await apiRequest.get('product-setting-types')
                // commit('SET_PRODUCT_SETTING_TYPES', { productSettingTypes: productSettingTypes.data })
                // let id = null
                // productSettingTypes.data.forEach(function (element, index) {
                //
                //     if(element.id == 40){
                //         id = element.id;
                //     }
                // });
                const priceAgeCategories = await apiRequest.get('categories-tree/' + 40)
                commit('SET_PRICE_AGE_CATEGORIES', { priceAgeCategories: priceAgeCategories.data })

            } catch (e) {
                commit('SET_PRICE_GROUPS', [])
            }
        },

        async getPriceTypes({ commit }) {
            try {
                const priceTypes = await apiRequest.get('products/product-price-types')
                commit('SET_PRODUCT_PRICE_TYPES', { productPriceTypes: priceTypes.data })

            } catch (e) {
                commit('SET_PRODUCT_PRICE_TYPES', [])
            }
        },

        async getTicketTypes({ commit }) {
            try {
                const ticketTypes = await apiRequest.get('products/ticket-types')
                commit('SET_PRODUCT_TICKET_TYPES', { ticketTypes: ticketTypes.data })

            } catch (e) {
                commit('SET_PRODUCT_TICKET_TYPES', [])
            }
        },

        async publishProduct({ commit, dispatch }, body){
            try {
                const product = await apiRequest.post('products/' + body.id + '/publish', body)
                commit('ui/PUSH_NOTIFY', {
                    type: 'success',
                    group: 'alert',
                    title: 'Success!',
                    text: `The product has been published!`
                }, { root: true })
                dispatch('getTours')
            } catch (e) {
                for (let key in e) {
                    if (e.hasOwnProperty(key)) {
                        e[key].forEach(function (element, index) {

                            commit('ui/PUSH_NOTIFY', {
                                type: 'error',
                                group: 'alert',
                                title: 'Tours',
                                text: element
                            }, { root: true })

                        });
                    }
                }
            }
        },
        async unPublishProduct({ commit, dispatch }, body){
            try {
                const product = await apiRequest.post('products/' + body.id + '/un-publish', body)
                commit('ui/PUSH_NOTIFY', {
                    type: 'success',
                    group: 'alert',
                    title: 'Success!',
                    text: `The product has been unpublished!`
                }, { root: true })
                dispatch('getTours')
            } catch (e) {
                for (let key in e) {
                    if (e.hasOwnProperty(key)) {
                        e[key].forEach(function (element, index) {

                            commit('ui/PUSH_NOTIFY', {
                                type: 'error',
                                group: 'alert',
                                title: 'Tours',
                                text: element
                            }, { root: true })

                        });
                    }
                }
            }
        },


        async deleteProduct({ commit, dispatch }, id){
            try {
                const product = await apiRequest.delete('products/' + id);
                commit('ui/PUSH_NOTIFY', {
                    type: 'success',
                    group: 'alert',
                    title: 'Success!',
                    text: `The product has been deleted!`
                }, { root: true })
                dispatch('getTours')
            } catch (e) {
                for (let key in e) {
                    if (e.hasOwnProperty(key)) {
                        e[key].forEach(function (element, index) {

                            commit('ui/PUSH_NOTIFY', {
                                type: 'error',
                                group: 'alert',
                                title: 'Tours',
                                text: element
                            }, { root: true })

                        });
                    }
                }
            }
        },

        async createSchedule({ commit, dispatch }, body){
            try {
                const id = localStorage.getItem("tourId");
                const schedule = await apiRequest.post('products/' + id + '/scheldules', body);

                await dispatch('getSchedules')
                commit('ui/PUSH_NOTIFY', {
                    type: 'success',
                    group: 'alert',
                    title: 'Tours',
                    text: "Schedule successfully created"
                }, { root: true })

            } catch (e) {
                for (let key in e) {
                    if (e.hasOwnProperty(key)) {
                        e[key].forEach(function (element, index) {

                            commit('ui/PUSH_NOTIFY', {
                                type: 'error',
                                group: 'alert',
                                title: 'Tours',
                                text: element
                            }, { root: true })

                        });
                    }
                }
            }
        },

        async deleteSchedule({ commit }, schId){
            try {
                const id = localStorage.getItem("tourId");
                const deleted = await apiRequest.delete('products/' + id + '/scheldules/' + schId);

                commit('ui/PUSH_NOTIFY', {
                    type: 'success',
                    group: 'alert',
                    title: 'Tours',
                    text: "Schedule successfully deleted"
                }, { root: true })

                const schedules = await apiRequest.get('products/' + id + '/scheldules');
                commit('SET_SCHEDULES', { schedules: schedules.data })

            } catch (e) {
                for (let key in e) {
                    if (e.hasOwnProperty(key)) {
                        e[key].forEach(function (element, index) {

                            commit('ui/PUSH_NOTIFY', {
                                type: 'error',
                                group: 'alert',
                                title: 'Tours',
                                text: element
                            }, { root: true })

                        });
                    }
                }
            }
        },

        async updateSchedule({ commit, dispatch }, body){
            try {
                const id = localStorage.getItem("tourId");
                const schedule = await apiRequest.patch('products/' + id + '/scheldules/' + body.id, body.body);
                commit('SET_SCHEDULE', schedule.data)

                commit('ui/PUSH_NOTIFY', {
                    type: 'success',
                    group: 'alert',
                    title: 'Tours',
                    text: "Schedule successfully updated"
                }, { root: true })
                await dispatch('getSchedules');

            } catch (e) {
                for (let key in e) {
                    if (e.hasOwnProperty(key)) {
                        e[key].forEach(function (element, index) {

                            commit('ui/PUSH_NOTIFY', {
                                type: 'error',
                                group: 'alert',
                                title: 'Tours',
                                text: element
                            }, { root: true })

                        });
                    }
                }
            }
        },

        async getSchedules({ commit }){
            try {
                const id = localStorage.getItem("tourId");
                const schedules = await apiRequest.get('products/' + id + '/scheldules?expand=prices');
                commit('SET_SCHEDULES', { schedules: schedules.data })

            } catch (e) {
                // commit('SET_PRODUCT_PRICE_TYPES', [])
            }
        },

        async createSchedulePrice({ commit, dispatch }, body){
            try {
                const id = localStorage.getItem("tourId");
                const schedule = await apiRequest.post('product-scheldule/' + body.productSchelduleId + '/prices', body);

                await dispatch('getSchedules')
                commit('ui/PUSH_NOTIFY', {
                    type: 'success',
                    group: 'alert',
                    title: 'Tours',
                    text: "Schedule price successfully created"
                }, { root: true })

            } catch (e) {
                for (let key in e) {
                    if (e.hasOwnProperty(key)) {
                        e[key].forEach(function (element, index) {

                            commit('ui/PUSH_NOTIFY', {
                                type: 'error',
                                group: 'alert',
                                title: 'Tours',
                                text: element
                            }, { root: true })

                        });
                    }
                }
            }
        },

        async updateSchedulePrice({ commit, dispatch }, body){
            try {
                const id = localStorage.getItem("tourId");
                const schedule = await apiRequest.patch('product-scheldule/' + body.productSchelduleId + '/prices/'+ body.productScheldulePriceId, body);

                await dispatch('getSchedules')
                commit('ui/PUSH_NOTIFY', {
                    type: 'success',
                    group: 'alert',
                    title: 'Tours',
                    text: "Schedule price successfully updated"
                }, { root: true })

            } catch (e) {
                for (let key in e) {
                    if (e.hasOwnProperty(key)) {
                        e[key].forEach(function (element, index) {

                            commit('ui/PUSH_NOTIFY', {
                                type: 'error',
                                group: 'alert',
                                title: 'Tours',
                                text: element
                            }, { root: true })

                        });
                    }
                }
            }
        },

        async deleteSchedulePrice({ commit, dispatch }, body){
            try {
                const id = localStorage.getItem("tourId");
                const schedule = await apiRequest.delete('product-scheldule/' + body.schId + '/prices/'+ body.priceId);

                await dispatch('getSchedules')
                commit('ui/PUSH_NOTIFY', {
                    type: 'success',
                    group: 'alert',
                    title: 'Tours',
                    text: "Schedule price successfully deleted"
                }, { root: true })

            } catch (e) {
                for (let key in e) {
                    if (e.hasOwnProperty(key)) {
                        e[key].forEach(function (element, index) {

                            commit('ui/PUSH_NOTIFY', {
                                type: 'error',
                                group: 'alert',
                                title: 'Tours',
                                text: element
                            }, { root: true })

                        });
                    }
                }
            }
        },



        async getCancellationTypes({ commit }){
            try {
                const cancellationTypes = await apiRequest.get('products/cancellation-policy-types');
                commit('SET_CANCELLATION_TYPES', { cancellationTypes: cancellationTypes.data })

            } catch (e) {
                commit('SET_CANCELLATION_TYPES', [])
            }
        },

        async getCancellationPolicy({ commit }){
            try {
                const id = localStorage.getItem("tourId");
                const productCancellationPolicy = await apiRequest.get('products/' + id +'/cancellation-policy')
                commit('SET_PRODUCT_CANCELLATION', { productCancellationPolicy: productCancellationPolicy.data})
                commit('SET_STEP_COMPLETED', { step: 18} )

            } catch (e) {
                commit('SET_CANCELLATION_TYPES', [])
            }
        },

        async getBookingProcess({ commit }){
            try {
                const id = localStorage.getItem("tourId");
                const bookingProcess = await apiRequest.get('products/' + id +'/booking-process')
                commit('SET_BOOKING_PROCESS', { bookingProcess: bookingProcess.data})

            } catch (e) {
                commit('SET_CANCELLATION_TYPES', [])
            }
        },

        async getPersonalInformationCategories({ commit }) {
            try {
                const productSettingTypes = await apiRequest.get('product-setting-types')
                commit('SET_PRODUCT_SETTING_TYPES', { productSettingTypes: productSettingTypes.data })
                let id = null
                productSettingTypes.data.forEach(function (element, index) {
                    console.log(element)
                    if(element.typeName == 'PERSONAL_INFORMATION_YOU_NEED'){
                        id = element.id;
                    }
                });
                const personalCategories = await apiRequest.get('product-setting-types/' + id + '/categories-list')
                commit('SET_PERSONAL_CATEGORIES', { personalCategories: personalCategories.data })

            } catch (e) {
                commit('SET_PRICE_GROUPS', [])
            }
        },

        async getFlightCategories({ commit }) {
            try {
                const productSettingTypes = await apiRequest.get('product-setting-types')
                commit('SET_PRODUCT_SETTING_TYPES', { productSettingTypes: productSettingTypes.data })
                let id = null
                productSettingTypes.data.forEach(function (element, index) {

                    if(element.typeName == 'FLIGHT_INFORMATION_YOU_NEED'){
                        id = element.id;
                    }
                });
                const flightCategories = await apiRequest.get('product-setting-types/' + id + '/categories-list')
                commit('SET_FLIGHT_CATEGORIES', { flightCategories: flightCategories.data })

            } catch (e) {
                commit('SET_PRICE_GROUPS', [])
            }
        },

        async getShipCategories({ commit }) {
            try {
                const productSettingTypes = await apiRequest.get('product-setting-types')
                commit('SET_PRODUCT_SETTING_TYPES', { productSettingTypes: productSettingTypes.data })
                let id = null
                productSettingTypes.data.forEach(function (element, index) {

                    if(element.typeName == 'SHIP_INFORMATION_YOU_NEED'){
                        id = element.id;
                    }
                });
                const shipCategories = await apiRequest.get('product-setting-types/' + id + '/categories-list')
                commit('SET_SHIP_CATEGORIES', { shipCategories: shipCategories.data })

            } catch (e) {
                commit('SET_PRICE_GROUPS', [])
            }
        },

        async getTrainCategories({ commit }) {
            try {
                const productSettingTypes = await apiRequest.get('product-setting-types')
                commit('SET_PRODUCT_SETTING_TYPES', { productSettingTypes: productSettingTypes.data })
                let id = null
                productSettingTypes.data.forEach(function (element, index) {

                    if(element.typeName == 'TRAIN_INFORMATION_YOU_NEED'){
                        id = element.id;
                    }
                });
                const trainCategories = await apiRequest.get('product-setting-types/' + id + '/categories-list')
                commit('SET_TRAIN_CATEGORIES', { trainCategories: trainCategories.data })

            } catch (e) {
                commit('SET_PRICE_GROUPS', [])
            }
        },

        async getCutOffCategories({ commit }) {
            try {
                const cutOffCategories = await apiRequest.get('products/booking-cut-off-time-types')
                commit('SET_CUT_OFF_CATEGORIES', { cutOffCategories: cutOffCategories.data })

            } catch (e) {
                commit('SET_CUT_OFF_CATEGORIES', [])
            }
        },

        async getConfirmationMethods({ commit }) {
            try {
                const confirmationMethods = await apiRequest.get('products/booking-confirmation-method-types')

                commit('SET_CONFIRMATION_METHODS', { confirmationMethods: confirmationMethods.data })

            } catch (e) {
                commit('SET_CONFIRMATION_METHODS', [])
            }
        },

        async getUpsellTypes({ commit }) {
            try {
                const upsellTypes = await apiRequest.get('product-upsells/types')

                commit('SET_UPSELL_TYPES', { upsellTypes: upsellTypes.data })

            } catch (e) {
                commit('SET_UPSELL_TYPES', [])
            }
        },

        async getProductUpsells({ commit }, id) {
            try {
                const productUpsells = await apiRequest.get('products/' + id + '/upsells')

                commit('SET_PRODUCT_UPSELLS', { productUpsells: productUpsells.data })

            } catch (e) {
                commit('SET_PRODUCT_UPSELLS', [])
            }
        },

        async createProductUpsell({ commit, dispatch }, body) {
            try {
                await apiRequest.post('products/' + body.id + '/upsells', body.body)
                commit('ui/PUSH_NOTIFY', {
                    type: 'success',
                    group: 'alert',
                    title: 'Tours',
                    text: "Upsell has been created succesfully"
                }, { root: true })
                dispatch('getProductUpsells', body.id)

            } catch (e) {
                for (let key in e) {
                    if (e.hasOwnProperty(key)) {
                        e[key].forEach(function (element, index) {

                            commit('ui/PUSH_NOTIFY', {
                                type: 'error',
                                group: 'alert',
                                title: 'Tours',
                                text: element
                            }, { root: true })

                        });
                    }
                }
            }
        },

        async updateProductUpsell({ commit, dispatch }, body) {
            try {
                await apiRequest.patch('products/' + body.id + '/upsells/' + body.upsell_id, body.body)
                commit('ui/PUSH_NOTIFY', {
                    type: 'success',
                    group: 'alert',
                    title: 'Tours',
                    text: "Upsell has been updated succesfully"
                }, { root: true })
                dispatch('getProductUpsells', body.id)

            } catch (e) {
                for (let key in e) {
                    if (e.hasOwnProperty(key)) {
                        e[key].forEach(function (element, index) {

                            commit('ui/PUSH_NOTIFY', {
                                type: 'error',
                                group: 'alert',
                                title: 'Tours',
                                text: element
                            }, { root: true })

                        });
                    }
                }
            }
        },

        async deleteProductUpsell({ commit, dispatch }, body) {
            try {
                await apiRequest.delete('products/' + body.id + '/upsells/' + body.upsell_id)
                commit('ui/PUSH_NOTIFY', {
                    type: 'success',
                    group: 'alert',
                    title: 'Tours',
                    text: "Upsell has been deleted succesfully"
                }, { root: true })
                dispatch('getProductUpsells', body.id)

            } catch (e) {
                for (let key in e) {
                    if (e.hasOwnProperty(key)) {
                        e[key].forEach(function (element, index) {

                            commit('ui/PUSH_NOTIFY', {
                                type: 'error',
                                group: 'alert',
                                title: 'Tours',
                                text: element
                            }, { root: true })

                        });
                    }
                }
            }
        },






    }
}
