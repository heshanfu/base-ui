<template>
    <div class="comp-date">
        <h4 class="heading">Date</h4>

        <div class="card">
            <form class="form-inline">
                <b-form-group label="Basic">
                    <b-date v-model="editing.basic"/>
                </b-form-group>

                <b-form-group label="With Default Value">
                    <b-date v-model="editing.default"/>
                </b-form-group>

                <b-form-group label="Disabled">
                    <b-date v-model="editing.disabled" :disabled="true"/>
                </b-form-group>

                <b-form-group label="format round to dayEnd">
                    <b-date v-model="editing.dayEnd" :day-end="true" format="ISO"/>
                </b-form-group>
            </form>
        </div>

        <pre class="json-preview">{{ $j(editing) }}</pre>
    </div>
</template>

<script type="text/babel">

    export default {
        name: 'CompDate',

        data() {
            return {
                editing: {
                    basic: null,
                    default: 1325347208888, // default time will be round to dayStart
                    disabled: 1516284344350,
                    dayEnd: null
                }
            };
        }
    };

</script>
