<template>
    <div class="table-container">
        <div class="table">
            <div class="header-table">
                <div class="checkbox-container" style="margin-bottom: 10px">
                    <input id="lh" v-model="checkAll" type="checkbox" class="checkbox" />
                    <label for="lh" class="label-checkbox">&nbsp;</label>
                </div>
                <div v-for="(item, key) in tableHead" :key="key" @click="sortBy(item.class, key)" :class="item.class" class="header-item-container">
                    <div class="name-column">{{ item.name }}</div>
                    <div v-if="item.class !== 'actions'" class="arrows">
                        <svg-icon v-show="!item.active" class="icon-arrow" name="arrow_bottom" />
                        <svg-icon class="icon-arrow" name="arrow_bottom" />
                    </div>
                </div>
            </div>

            <div class="table-items">
                <transition-group name="fade" tag="div">
                    <div v-for="(item, key) in filterGroups" :key="key + 0" class="table-item">
                        <div class="checkbox-container">
                            <input :id="item.id" v-model="checkedItemIds" :value="item.id" type="checkbox" class="checkbox" />
                            <label :for="item.id" class="label-checkbox">&nbsp;</label>
                        </div>
                        <div class="field id-user"> {{ item.id }} </div>
                        <div class="field slug"> {{ item.slug }} </div>
                        <div class="field name">
                            {{ item.i18n.name }}
                        </div>
                        <div class="field actions">
                            <router-link :to="'group-of-countries/' + item.id">
                                <div class="action">
                                    <svg-icon class="icon-action" name="act_edit" />
                                </div>
                            </router-link>

                            <div class="action" @click="$emit('delete-group', item)">
                                <svg-icon class="icon-action" name="trash" />
                            </div>
                        </div>
                    </div>
                </transition-group>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        data() {
            return {
                headerTable: [],
                checkAll: false,
                tableHead: [
                    { class: 'id', name: 'Id', active: false },
                    { class: 'slug', name: 'Slug', active: false },
                    { class: 'name', name: 'Name', active: false },
                    { class: 'actions', name: 'Actions', active: false },
                ],
                checkedItemIds: [],
                activeArrowKey: ''
            }
        },
        computed: {
            ...mapState('groups', ['filterGroups'])
        },

        watch: {
            checkAll() {
                this.checkedItemIds = this.checkAll ? this.filterGroups.map(item => item.id) : []
            }
        },

        methods: {
            sortBy(className, key) {
                if (className === 'actions') return
                if (key === this.activeArrowKey) {
                    this.$set(this.tableHead[key], 'active', !this.tableHead[key].active)
                    this.$emit('click-arrow', className)
                    return
                }

                this.tableHead.forEach((element, key) => {
                    if (element.active) {
                        this.$set(this.tableHead[key], 'active', false)
                    }
                })

                this.$set(this.tableHead[key], 'active', !this.tableHead[key].active)
                this.$emit('click-arrow', className)
                this.activeArrowKey = key
            }
        }
    }
</script>

<style lang="scss" scoped>
    .table-container {
        margin-top: 1rem;
    }

    .table, .header-table {
        width: 100%;
    }

    .header-table {
        border-color: #f7f9fa;
        background-color: #f7f9fa;
        border-bottom: 2px solid #edeef0;
        border-top: 1px solid #edeef0;
        height: 38px;
        display: flex;
        align-items: center;
        font-weight: 700;
        font-size: 13px;
        color: #495057;
        cursor: pointer;
    }

    .header-item-container {
        display: flex;
        align-items: center;
    }

    .arrows {
        display: flex;
        flex-direction: column;
        margin-left: 7px;
    }

    .icon-arrow {
        height: 16px;
        width: 16px;
    }

    .icon-arrow:nth-child(1) {
        transform: rotate(180deg);
        margin-bottom: -6px;
        margin-top: 3px;
    }

    .actions {
        width: 10%;
        display: flex;
    }

    .action {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 100%;
        width: 30px;
        height: 30px;
        color: #b5c9d5;
        transition: all 0.3s ease;
        cursor: pointer;

        &:hover {
            color: white;
            background-color: #2980b9;
        }

        &:active {
            color: #212529;
            background-color: #b5c9d5;
        }
    }

    .checkbox-container {
        padding-top: 5px;
        width: 5%;
    }

    .icon-action {
        width: 16px;
        height: 16px;
    }

    .table-item {
        display: flex;
        width: 100%;
        font-size: 12px;
        padding: 5px 0;
        border-bottom: 1px solid #edeef0;

        &:hover {
            background-color: #f7f9fa;
        }
    }

    input[type=checkbox] {
        position: absolute;
        z-index: -1;
        opacity: 0;

        & + label {
            position: relative;
            left: 0;
            padding: 0 0 0 28px;
            cursor: pointer;
            user-select: none;

            &:before {
                content: '';
                position: absolute;
                left: 0;
                width: 18px;
                height: 18px;
                border-radius: 2px;
                border: 1px solid #cedbe3;
            }
        }

        &:checked + label:before {
            background: url("./tick.svg") 3px 3px no-repeat;
        }
    }

    .field {
        display: flex;
        align-items: center;
    }

    .fade-item, .fade-move {
        transition: all 1s;
    }

    .id-user { width: 7%; }
    .company-name { width: 35%; }
    .domain { width: 35%; }

    .id { width: 25% }
    .slug { width: 25% }
    .name {
        width: 50%;
    }
    .name a {
        color: #2980b9;
    }
    .parent_category_id { width: 25% }
</style>