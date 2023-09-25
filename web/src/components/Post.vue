<!-- Path: web/src/components/Post.vue -->
<script setup lang="ts">
import { defineProps, computed, ref, onMounted } from "vue";

const props = defineProps({
    id: {
        type: [Number, String],
        required: true,
    },
});

const post = ref({});

const getPost = async ({ id }) => {
    try {
        const response = await fetch("/api/posts/" + id);
        if (response.status !== 200) {
            throw new Error(`Failed with status ${response.status}`);
        }
        const data = await response.json();
        post.value = data;
        return data;
    } catch (error) {
        console.error('web/src/components/Post.vue', error);
        post.value = {};
        return [];
    }
};

const savePost = async () => {
    try {
        const response = await fetch("/api/posts/" + post.value.id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(post.value),
        });
        if (response.status !== 200) {
            throw new Error(`Failed with status ${response.status}`);
        }
        const data = await response.json();
        post.value = data;
        return data;
    } catch (error) {
        console.error('web/src/components/Post.vue -> savePost', error);
        return {};
    }
};

onMounted(() => {
    getPost({ id: props.id });
});
</script>

<template>
    <div>
        <h1>Post</h1>
        <div :style="{
            display: 'flex',
            'flex-direction': 'column',
        }">
            <div v-if="post.id">
                <h2>{{ post.title }}</h2>
                <p>{{ post.body }}</p>
            </div>
            <div :style="{
                display: 'flex',
                'justify-content': 'flex-end',
            }">
                <button class="btn btn-primary" @click="savePost">Click me</button>
            </div>
        </div>
    </div>
</template>