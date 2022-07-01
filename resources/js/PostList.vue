<template>
    <div
        class="container mx-auto px-4 w-full md:w-3/4 lg:w-3/5 xl:w-1/2 mt-2 mb-0"
    >
        <Header></Header>
        <h2 class="text-4xl">All Posts</h2>
        <!-- <div>Loading: {{ $apollo.loading }}</div>
        <div>Is posts loading: {{ $apollo.queries.posts.loading }}</div>
        <div>{{ posts }}</div> -->
        <div v-if="$apollo.loading"></div>
        <div v-else>
            <PostListItem
                v-for="post in posts"
                :key="post.id"
                :post="post"
                class="mt-10"
            >
                {{ post.id }} is titled: {{ post.title }}
            </PostListItem>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import gql from "graphql-tag";
import PostListItem from "./components/PostListItem.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
    components: {
        PostListItem,
        Header,
        Footer,
    },
    apollo: {
        //Here gql fn is used before graphql query to compile it first and convert it to an AST (Abstract Syntax Tree)
        //the name of the query 'posts' have to MATCH the name of the graphql query 'posts' to allow data retrieving works
        posts: gql`
            {
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
        `, //gql + backticks is called tagged templates and used to convert a string to something else.
    },
};
</script>
