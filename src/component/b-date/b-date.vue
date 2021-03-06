<template>
    <div
        v-b-click-outside="closeDatePicker"
        :class="{disabled: disabled, 'b-resettable': canBeReset}"
        class="b-date">
        <b-input
            :name="name"
            :value="displayTime"
            :disabled="disabled"
            :placeholder="placeholder"
            type="text"
            @focus="openDatePicker">
            <i
                slot="right"
                :class="{'b-date-icon-active': visible}"
                class="b-right-icon b-icon-arrow-bottom"
                @click="reset"></i>
        </b-input>

        <b-popper :visible="visible">
            <b-date-picker
                :time-stamp="timeStamp"
                @choose="choose"/>
        </b-popper>
    </div>
</template>

<script type="text/babel">

import {getDate, roundTimestamp} from '../../util/time';
import {isFunc} from '../../util/check';

import BInput from '../b-input';
import BPopover from '../b-popper';
import BDatePicker from './b-date-picker.vue';

const FORMAT_MAP = {
    ISO: timeStamp => new Date(timeStamp).toISOString()
};

export default {
    name: 'BDate',

    components: {
        BInput,
        BPopover,
        BDatePicker
    },

    model: {
        prop: 'value',
        event: 'change'
    },

    props: {
        value: {
            type: [Number, String],
            validator: value => isFinite(new Date(value)),
            default: null
        },
        name: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: ''
        },
        format: {
            type: [String, Function],
            default: null
        },
        enableReset: {
            type: Boolean,
            default: true
        },
        dayEnd: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            visible: false
        };
    },

    computed: {
        displayTime() {
            const vm = this;
            const {value} = vm;

            if (!value && typeof value !== typeof 0) return '';

            return getDate(value);
        },

        timeStamp() {
            const vm = this;
            const {value} = vm;

            return value ? new Date(value).getTime() : null;
        },

        canBeReset() {
            const vm = this;
            const {displayTime, disabled, enableReset} = vm;

            return enableReset && displayTime && !disabled;
        }
    },


    mounted() {
        const vm = this;
        const {timeStamp} = vm;

        if (timeStamp) {
            vm.choose(timeStamp);
        }
    },

    methods: {
        openDatePicker() {
            const vm = this;
            const {disabled} = vm;

            if (disabled) return;

            vm.visible = true;
        },

        closeDatePicker() {
            const vm = this;
            vm.visible = false;
        },

        choose(timeStamp) {
            const vm = this;
            let value = timeStamp;
            const {format, dayEnd} = vm;

            if (dayEnd) {
                value = roundTimestamp(value, 'dayEnd');
            } else {
                value = roundTimestamp(value, 'dayStart');
            }

            if (isFunc(format)) {
                value = format(value);
            } else if (isFunc(FORMAT_MAP[format])) {
                value = FORMAT_MAP[format](value);
            }

            vm.$emit('change', value);
            vm.closeDatePicker();
        },

        reset() {
            const vm = this;

            if (vm.canBeReset) {
                vm.$emit('change', null);
                vm.closeDatePicker();
            }
        }
    }
};

</script>
