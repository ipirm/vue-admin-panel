<template>
    <div class="container-select" :style="{width: width}">
        <label v-if="label" class="label" for="">{{ label }}</label>
        <div class="wrapper-input">
            <input
                    v-model="valueInput"
                    type="text"
                    :placeholder="placeholder"
                    class="input"
                    @focus="onFocus"
                    @blur="onBlur"
                    @change="setOption(valueInput)"
            >
            <div class="select-input" @click="clickArrow()">
                <svg-icon class="arrow-input" name="arrow_bottom" />
            </div>
        </div>
        <div v-if="activeOptions" class="options" :style="{'margin-top': label ? '72px' : '40px'}">
            <div v-if="!options.length || !autocompleteOptions.length" class="no-options">
                {{ emptyLabel }}
            </div>
            <div v-for="(option, key) in options" :key="key" class="option" @click="setOption(option)">
                {{ option }}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            placeholder: {
                type: String,
                default: 'Enter'
            },
            options: {
                type: Array,
                default: () => []
            },
            emptyLabel: {
                type: String,
                default: 'Is empty...'
            },
            value: {
                type: [String, Number],
                default: ''
            },
            width: {
                type: String,
                default: '100%'
            },
            label: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                selectedOption: null,
                activeOptions: false,
                focusInput: false,
                arrowClick: false,
                valueInput: this.value
            }
        },
        computed: {
            autocompleteOptions() {
                return this.options.filter((item) => {
                    if (typeof item === 'number') {
                        item = item.toString()
                    }

                    return item.toLowerCase().includes(this.valueInput.toLowerCase())
                })
            },
        },
        mounted() {
            document.addEventListener('click', () => {
                if (this.arrowClick) {
                    this.openOptionModal()
                    this.arrowClick = false
                    return
                }

                this.focusInput ? this.openOptionModal() : this.closeOptionModal()
            })
        },
        methods: {
            setOption(option) {
                this.valueInput = option
                this.selectedOption = option
                this.$emit('selected-option', option)
            },
            onFocus() {
                this.focusInput = true
            },
            onBlur() {
                this.focusInput = false
            },
            closeOptionModal() {
                this.activeOptions = false
            },
            openOptionModal() {
                this.activeOptions = true
            },
            clickArrow() {
                if (this.activeOptions) {
                    this.arrowClick = false
                    return
                }

                this.arrowClick = true
            }
        }
    }
</script>

<style lang="scss" scoped>
    .container-select {
        display: flex;
        flex-direction: column;
        font-size: 13px;
        justify-content: space-between;
        position: relative;
        margin-bottom: 16px;
    }

    .wrapper-input {
        display: flex;
        position: relative;
        align-items: center;
        height: 40px;
        border: 1px solid #b5c9d5;
        background-color: white;
        border-radius: 2px;
        justify-content: space-between;
    }

    .label {
        color: #052e46;
        font-size: 13px;
        margin-bottom: 9px;
        margin-top: 4px;
    }

    input[type="text"] {
        color: #01080c;
        border: none;
        outline: none;
        font-size: 13px;
        width: 100%;
        padding-right: 0px;
        padding-left: 8px;
    }

    .right-text {
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 700;
        padding-left: 5px;
    }

    .no-options {
        padding: 10px;
    }

    .options {
        position: absolute;
        margin-left: -1px;
        background-color: white;
        border: solid 1px #b5c9d5;
        width: 100%;
        z-index: 8;
        max-height: 200px;
        overflow: auto;
    }

    .option {
        padding: 10px;
        cursor: pointer;
        &:hover {
            background-color: #9db7c7;
            color: white;
        }
    }

    .select-input {
        width: 30px;
        cursor: pointer;
        margin-right: 5px;
        margin-top: 4px;
    }

    .arrow-input {
        color: #01080c;
        width: 20px;
        height: 20px;
    }
</style>
