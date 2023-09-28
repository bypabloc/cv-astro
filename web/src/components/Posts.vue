<!-- Path: web/src/components/Items.vue -->
<script setup lang="ts">
import { defineProps, computed, ref, onMounted } from "vue";

const posts = ref([]);

const getPosts = async () => {
    try {
        const response = await fetch("/api/posts");
        if (response.status !== 200) {
            throw new Error(`Failed with status ${response.status}`);
        }
        const data = await response.json();
        posts.value = data;
        return data;
    } catch (error) {
        console.error('web/src/components/Items.vue', error);
        posts.value = [];
        return [];
    }
};

const redirect = ({ id }) => {
  window.location.href = "/posts/" + id;
};

onMounted(() => {
    getPosts();
});
</script>

<template>
    <div>
        <h1>Posts</h1>
        <ul>
            <li
                v-for="(item) in posts"
                :key="`item-${item.id}`"
                @click="redirect(item)"
            >
                {{ item.title }}
                <br />
                {{ item.body }}
            </li>
        </ul>
    </div>
</template>