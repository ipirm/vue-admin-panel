<template>
  <div class="form-container">
    <div class="form-content">
      <h6>Choose the themes that best describe this product</h6>

      <div v-for="(theme, index) in themes" :key="index">
        <div>
          <div >
            <base-select
                    width="718px"
                    max-width="718px"
                    inputWidth="718px"
                    :options="themeCatList"
                    label="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem."
                    @selected-option="setSettingType"
                    withIndex
                    :custIndex="index"
                    :custValue="theme.setting_type_id ? String(theme.setting_type_id) : ''"
                    custom
                    itemName="name"
                    valueName="id"
            ></base-select>
          </div>
          <div class="checkbox-block">
            <div v-bind:key="subcategory.id" v-for="(subcategory,index1) in theme.allCategories" class="checkbox">
              <input :value="subcategory.id" v-model="selectedThemes" :id="subcategory.id" type="checkbox" />
              <label :for="subcategory.id">{{ subcategory.name }}</label>
            </div>
          </div>

        </div>
      </div>

    </div>

    <div class="add-category-block">
      <div @click.prevent="addAnotherTheme" class="add-category">
        <svg-icon name="plus" />
        <label>Add another theme</label>
      </div>
    </div>
    <!-- Temporary swapped because the base-button does not work  -->
    <button
      @click.prevent="next(4)"
      @keyup.enter="next(4)"
      class="button dark long"
      type="button"
    >Next</button>
    <!--<base-button  @click.prevent="next(2)" long>Next</base-button>-->
  </div>
</template>
<script>
    import { mapActions,mapGetters } from 'vuex'

    export default {
        data() {
            return {
                categories: [],
                subCategories: ['Category1', 'Category2', 'Category3', 'Category4', 'Category1', 'Category2', 'Category3', 'Category4', 'Category3', 'Category4'],
                currentStep: 1,
                themes: [
                ],
                settingTypes: [],
                selectedCats: [],
                selectedThemes: [],
                childsArray: [],
                showedChilds: []
            }
        },
        computed: {
            ...mapGetters({
                productSettingTypes: 'tours/productSettingTypes',
                productSettingTypesCategories: 'tours/productSettingTypesCategories',
                themeCats: 'tours/themeCategories',
                themeCatList: 'tours/themeCategoriesList',
                stateTour: 'tours/tour',
            }),
        },
        methods: {
            ...mapActions('tours', ['fetchSetStep', 'getProductSettingTypes','getProductSettingTypesCategories','getThemes','fetchThirdStep','getTour']),

            switchTab(id){
                var compCont = this;
                this.items.forEach(function (element, index) {
                    if (element.id == id) {
                        compCont.items[index].isActive = true;
                    } else {
                        compCont.items[index].isActive = false;
                    }
                });
            },
            next(val){
                let body = {
                    themeCategories: this.selectedThemes
                }

                console.log(this.selectedThemes);
                this.fetchThirdStep(body)

//                console.log(this.themes);
//                let themeCategories = [];
//                let themeCategoriesList = [];
//
//                let compContext = this;
//                this.selectedCats.forEach(function (element, index) {
//                    if(element){
//                        themeCategoriesList.push(compContext.themeCatList[index])
//                    }
//                });

//                this.themes.forEach(function (element, index) {
//                    themeCategories.push(element.setting_type_id)
//                    element.selectedCats.forEach(function (el,ind){
//                        if(el){
//                            themeCategoriesList.push({id: element.allCategories[ind]})
//                        }
//                    });
//                });

//                const body = {
//                    themeCategories: this.settingTypes,
//                    themeCategoriesList: themeCategoriesList
//                }
//
//                console.log(body);
//
//                this.fetchThirdStep(body)
//                console.log(themeCategories, 'cats');
//                console.log(themeCategoriesList, 'lists');


//                this.fetchSetStep({
//                    step: val
//                })
            },
            addAnotherTheme(){
                let newTheme = {
                    setting_type_id: null,
                    setting_type_category: [],
                    allCategories: [],
                    selectedCats: []
                };
                this.themes.push(newTheme);
            },

            getIndexVal(index){
                return this.themeCatList[index].childs ? this.themeCatList[index].childs : [];
            },

            setSettingType(val){
//                this.themes[val.index].setting_type_id = val.value;

                let index = this.themeCatList.findIndex(x => x.id == val.value);
                if(index > -1){
                    this.themes[val.index].allCategories = this.themeCatList[index].childs;
                }


                var elementPos = this.selectedThemes.indexOf(val.value);
                if(elementPos == -1){
                    this.selectedThemes.push(val.value)
                }

                //this.getProductSettingTypesCategories(val);

//                console.log(val, 'the value is here');
//                this.themes[index].setting_type_id = value;
//                this.fetchSettingTypesCategories(value);
            }
        },
        watch: {
            productTypeCategories: {
                handler(val){
                    this.categories = val;
                },
                deep: true
            },
            productSettingTypesCategories: {
                handler(val){
                    var compContext = this;
                    val.forEach(function(element) {

                        var elementPos = compContext.themes.map(function(x) {return x.setting_type_id; }).indexOf(element.id);
                        if(elementPos != -1){
                            compContext.themes[elementPos].allCategories = element.category;
                        }
                    });
                },
                deep: true
            },
            stateTour: {
                handler(val){
                    this.selectedThemes = val.themeCategories

//                    this.themes = [];
//                    let compContext = this;
//                    val.themeCategories.forEach(function(element) {
//                        let obj = {
//                                setting_type_id: element,
//                            };
//                        compContext.themes.push(obj)
//                    });
//                    let arr = [];
//                    val.themeCategoriesList.forEach(function(element) {
//                        arr.push(element.id);
//                    });
//
//                    this.themeCatList.forEach(function(element,index) {
//                        var elementPos = arr.indexOf(element.id);
//                        if(elementPos != -1){
//                            compContext.selectedCats[index] = true;
//                        }else{
//                            compContext.selectedCats[index] = false;
//                        }
//                    });

                },
                deep: true
            },
        },
        beforeMount(){
            let compContext = this;
            this.themeCategories = this.stateTour.themeCategories;

            console.log(this.themeCategories, "THEME");
            console.log(this.themeCatList, "CAT LIST")

            this.themeCategories.forEach(function(element) {

                let index = compContext.themeCatList.findIndex(x => x.id == element);
                console.log(index, element, compContext.themeCatList);
                if(index > -1){
                    let newTheme = {
                        setting_type_id: compContext.themeCatList[index].id,
                        setting_type_category: [],
                        allCategories: compContext.themeCatList[index].childs,
                        selectedCats: []
                    };
                    compContext.themes.push(newTheme);
                }
            });
        },
        mounted(){
            this.getProductSettingTypes();
            this.getTour();
            this.getThemes();
        }
    }


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

