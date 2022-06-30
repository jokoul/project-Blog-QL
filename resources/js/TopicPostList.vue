<template>
    <div class="container mx-auto px-4 w-full md:w-3/4 lg:w-3/5 xl:w-1/2 my-20">
        <h2 class="text-4xl">
            <router-link
                :to="{ name: 'index' }"
                class="text-gray-600 hover:underline"
                >All Posts</router-link
            >
            <span class="text-gray-600">/</span>
            {{ topic.name }}
        </h2>
        <!-- <div>Loading: {{ $apollo.loading }}</div>
        <div>Is posts loading: {{ $apollo.queries.posts.loading }}</div>
        <div>{{ posts }}</div> -->
        <div v-if="$apollo.loading"></div>
        <div v-else>
            <PostListItem
                v-for="post in topic.posts"
                :key="post.id"
                :post="post"
                class="mt-10"
            >
                {{ post.id }} is titled: {{ post.title }}
            </PostListItem>
        </div>
    </div>
</template>

<script>
import gql from "graphql-tag";
import PostListItem from "./components/PostListItem.vue";

export default {
    components: {
        PostListItem,
    },
    apollo: {
        //Here gql fn is used before graphql query to compile it first and convert it to an AST (Abstract Syntax Tree)
        //the name of the query 'posts' have to MATCH the name of the graphql query 'posts' to allow data retrieving works
        topic: {
            query: gql`
                query ($slug: String!) {
                    topic(slug: $slug) {
                        id
                        name
                        posts {
                            id
                            title
                            lead
                            created_at
                            author {
                                id
                                name
                            }
                            topic {
                                name
                                slug
                            }
                        }
                    }
                }
            `,
            variables() {
                return {
                    slug: this.$route.params.slug,
                };
            },
        },
    },
};
</script>
