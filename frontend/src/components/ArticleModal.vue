<template>
    <q-dialog v-model="isVisible" persistent>
        <q-card :style="dialogStyle">
            <q-card-section align="center">
                <div class="text-h6">
                    {{ title }}
                </div>
            </q-card-section>
            <q-card-section>
                <slot></slot>
            </q-card-section>
            <q-card-actions align="right">
                <q-btn @click="handleAction" :label="actionLabel" :color="actionColor" />
                <q-btn @click="handleCancel" label="Cancel" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue';

const props = defineProps({
    title: {
        type: String,
        default: '',
    },
    visible: {
        type: Boolean,
        required: true,
    },
    dialogStyle: {
        type: String,
        default: 'width: 500px;',
    },
    actionLabel: {
        type: String,
        default: 'Confirm',
    },
    actionColor: {
        type: String,
        default: 'primary',
    },
    onAction: {
        type: Function,
        required: true,
    },
    onCancel: {
        type: Function,
        required: true,
    },
});

const emit = defineEmits(['update:visible'])
const isVisible = computed({
    get() {
        return props.visible
    },
    set(newValue) {
        emit('update:visible', newValue)
    }
})
const handleAction = () => {
    props.onAction();
}
const handleCancel = () => {
    props.onCancel(0);
}
</script>