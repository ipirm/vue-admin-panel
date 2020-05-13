<template>
    <div class="container-select multiple-select-base" :style="{width: width, maxWidth: width}">
        <label v-if="label" class="label" for="">{{ label }}</label>
        <p class="description" v-if="description">{{description}}</p>

        <div @click="openOptions"  class="select" :style="{width: inputWidth, maxWidth: width}">
            <div class="value">
                <div v-bind:key="index" v-for="(item,index) in options" v-if="checkSelectedId(item.id)" class="value-item">
                    <div @click.stop="removeOption(index)">
                        {{ item.name }}<svg-icon class="close-icon" name="close" />
                    </div>
                </div>
            </div>
            <svg-icon class="arrow-bottom" name="arrow_bottom" />
        </div>

        <div v-show="activeOptions" class="options" :style="{'margin-top': label ? '70px' : '40px'}">
            <div v-if="false" class="search-block">
                <base-input search placeholder="Search"></base-input>
            </div>
            <div
                    v-for="(item, key) in options"
                    :key="key"
                    class="option"
                    @click.stop="selectOption(item.id)"
            >
                <input @click.stop="selectOption(item.id)" :id="item.id" :checked="checkSelected(item.id)" class="checkbox-input" type="checkbox">
                <label :for="item.id">{{ item.name }}</label>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            label: {
                type: String,
                default: ''
            },
            description: {
                type: String,
                default: null
            },
            options: {
                type: Array,
                required: true
            },
            defaultValue: {
                type: [String, Number],
                default: ''
            },
            width: {
                type: String,
                default: '100px'
            },
            inputWidth: {
                type: String,
                default: '100px'
            },
            custValue:{
                type: Array,
                default: []
            },
            disabled: {
                type: Boolean,
                default: false
            },
            theme: {
                type: String,
                validator: (value) => {
                    return ['outline', 'light'].indexOf(value) !== -1
                },
                default: 'outline'
            }
        },
        data: () => ({
            activeOptions: false,
            stopEventClick: false,
            selectedItems: [],
            value: null
        }),
        computed: {
            getValue() {
                return this.value || this.defaultValue
            },
            autocompleteOptions() {
                return this.options.filter((item) => {
                    if (typeof item === 'number') {
                        item = item.toString()
                    }
                    return item.toLowerCase().includes(this.value.toLowerCase())
                })
            },
        },
        created(){

        },
        mounted() {
            this.selectedItems = this.custValue;
            document.addEventListener('click', () => this.closeOptionModal())
        },
        methods: {
            selectOption(id) {
                if (this.selectedItems.indexOf(id) > -1) {
                    this.selectedItems.splice(this.selectedItems.indexOf(id), 1);
                } else {
                    this.selectedItems.push(id);
                }
//
//                this.value = id
                this.$emit('selected-option', this.selectedItems)
            },
            checkSelectedId(id){
                if(this.selectedItems.indexOf(id) > -1 || this.selectedItems.indexOf(String(id)) > -1) {
                    return true;
                } else {
                    return false;
                }
            },
            removeOption(index){
                this.selectedItems.splice(index, 1);
            },
            closeOptionModal() {
                if (!this.stopEventClick) {
                    this.activeOptions = false
                } else {
                    this.stopEventClick = false
                }
            },
            openOptions() {
                this.stopEventClick = true
                this.activeOptions = !this.activeOptions
            },
            checkSelected(item){
                if(this.selectedItems.indexOf(item) !== -1 || this.selectedItems.indexOf(String(item)) !== -1){
                    return true;
                }else{
                    return false;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .container-select {
        position: relative;
        display: flex;
        flex-direction: column;
        color: #01080c;
        font-weight: 400;
        font-size: 13px;
        margin-bottom: 16px;
    }

    .value {
        padding-left: 0px;
        margin-left: 7px;
        padding-top: 4px;
        .close-icon{
            width: 12px;
            height: 12px;
            fill: #052e46;
            margin-left: 5px;
        }
    }

    .arrow-bottom {
        cursor: pointer;
        width: 17px;
        height: 17px;
        padding-left: 10px;
        margin-right: 7px;
    }

    .select {
        display: flex;
        justify-content: space-between;
        min-height: 40px;
        align-items: center;
        cursor: pointer;
        width: 100%;
        border: 1px solid #b5c9d5;
    }

    .options {
        width: 100%;
        max-width: 413px;
        background-color: #fff;
        border: 1px solid #b5c9d5;
        position: absolute;
        margin-top: 62px;
        max-height: 200px;
        overflow: auto;
        cursor: pointer;
        padding-bottom: 5px;
        padding-top: 5px;
        z-index: 5;
    }

    .option {
        height: 28px;
        border-top-width: 1px;
        border-bottom-width: 1px;
        border-left-width: 0px;
        border-right-width: 0px;
        border-style: solid;
        border-color: #edeef0;
        background-color: #ffffff;
        background-size: cover;
        padding: 5px 8px;
        transition: all 0.3s ease;
        font-size: 13px;
        color: #052e46;
        font-weight: 500;
        &:hover {
            background-color: #f8f9fa;
        }
        span{
            vertical-align: middle;
        }
    }

    .checkbox-input{
        width: 18px;
        height: 18px;
        border: 1px solid #b5c9d5;
        border-radius: 2px;
        background-color: #fafafa;
        vertical-align: middle;
        margin-right: 10px;
        margin-top: 6px;
        font-weight: 500;
    }

    .search-block{
        padding: 10px;
        padding-bottom: 0px;
    }
    
    .value-item{
        float: left;
        padding: 0px 7px;
        border: 1px solid #76bcf5;
        border-radius: 2px;
        background-color: #e3f2ff;
        font-size: 13px;
        color: #052e46;
        font-weight: 500;
        padding-top: 5px;
        padding-bottom: 5px;
        margin-right: 4px;
        margin-bottom: 4px;
    }
</style>

