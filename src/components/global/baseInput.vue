<script setup>
    import {ref} from "vue";

    const props = defineProps({
        modelValue:{
            default:""
        },
        inputWidth:{},
        labelWidth:{},
        stacked:{}
    })

    const emit = defineEmits(['update:modelValue'])

    const id = ref("input-" + (Math.random()+"").replace(/\./g,"-"));
</script>

<template>
    <div class="input-wrapper" :class="{stacked: stacked}">
        <label :for="$attrs.id || id" v-if="$slots.default" :style="'width:' + labelWidth">
            <slot></slot>
        </label>

        <div class="input-parent" :style="'width:' + inputWidth">
            <textarea v-model="props.modelValue" @input="$emit('update:modelValue', $event.target.value)" :id="$attrs.id || id" type="text" v-bind="$attrs" v-if="$attrs.type == 'textarea'"></textarea>

            <input v-model="props.modelValue" @input="$emit('update:modelValue', $event.target.value)" :id="$attrs.id || id" type="text" v-bind="$attrs" v-else/>
            
            <div class="input-note" v-if="$slots.note">
                <slot name="note"></slot>
            </div>
        </div>
    </div>

</template>

<style>
    .input-wrapper:not(.stacked){
        margin:var(--default-gap);
        display:flex;
        overflow:hidden;
        flex-shrink:0;
    }
    .input-wrapper.stacked{
        margin:var(--default-gap);
    }
    .input-wrapper.stacked > label{
        padding:var(--default-gap) 0;
        display:block;
    }
    .input-wrapper:not(.stacked) > label{
        width:200px;
        flex-shrink:0;
        padding-right:var(--default-gap);
        padding-top:calc(var(--default-gap) / 2);
    }
    .input-wrapper > .input-parent{
        flex:1;
    }
    .input-wrapper textarea{
        width:100%;
        height:200px;
        font-size:inherit;
    }
    .input-wrapper input{
        width:100%;
        /*padding:calc(var(--default-gap) / 2);
        font-size:inherit;
        display:block;*/
    }
    .input-note{
        font-size:0.8em;
        margin-top:calc(var(--default-gap) / 2);
    }
    .smaller .input-wrapper{
        margin:calc(var(--default-gap) / 2);
    }
    .kids-no-margin > .input-wrapper{
        margin:0;
    }
</style>