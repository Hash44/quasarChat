<template>
    <q-page class="flex column">
        <div class="q-pa-nd column col justify-end">
            <q-chat-message
                name="me"
                :text="['hey, how are you?']"
                sent
            />
            <q-chat-message
                name="Jane"
                :text="['doing fine, how r you?']"
            />
        </div>
        <q-footer elevated>
            <q-toolbar>
                <q-input
                    rounded
                    bg-color="white"
                    v-model="text"
                    label="newMessage"
                    maxlength="12"
                    :dense="dense">
        <template v-slot:before>
        </template>

        <template v-slot:append>
        <q-icon v-if="text !== ''" name="close" @click="text = ''" class="cursor-pointer" />
        <q-icon name="schedule" />
        </template>
        <template v-slot:after>
            <q-btn
                round
                dense
                flat
                icon="send"
            />
        </template>
    </q-input>
            </q-toolbar>
        </q-footer>
    </q-page>
</template>

<script>

export default({
    data() {
        return {
            newMessage: '',
            messages: [
                {
                    text: '',
                    from: 'me'
                }
            ]
        }
    }
})
</script>