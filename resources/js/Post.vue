<template>
    <div
        class="container mx-auto px-4 w-full md:w-3/4 lg:w-3/5 xl:w-1/2 mt-2 mb-0"
    >
        <Header></Header>
        <div>
            <div v-if="$apollo.loading">Loading...</div>
            <div v-else>
                <div class="text-lg text-gray-600">
                    By {{ post.author.name }} in
                    <router-link
                        :to="{
                            name: 'topic',
                            params: { slug: post.topic.slug },
                        }"
                        class="underline hover:text-orange-400"
                        >{{ post.topic.name }}</router-link
                    >
                    · {{ post.created_at | timeago }}
                </div>
                <h1 class="text-5xl mt-10 font-bold mb-12">{{ post.title }}</h1>
                <p class="text-gray-700 pb-3 mb-12 whitespace-pre-line">
                    <!--"whitespace-pre-line" preserve height space between paragraph form the original text-->
                    {{ post.content }}
                </p>
                <div class="mb-24 flex">
                    <div class="mr-6">
                        <img
                            :src="'/storage/faces/' + post.author.avatar"
                            alt="Author avatar"
                            class="w-16 h-16 rounded-full"
                        />
                    </div>
                    <div class="flex flex-col justify-center">
                        <div class="text-xl text-gray-600">
                            Written by
                            <router-link
                                :to="{
                                    name: 'author',
                                    params: { id: post.author.id },
                                }"
                                class="underline hover:text-orange-400"
                                >{{ post.author.name }}</router-link
                            >
                        </div>
                        <div class="text-gray-600">
                            Published in
                            <router-link
                                :to="{
                                    name: 'topic',
                                    params: { slug: post.topic.slug },
                                }"
                                class="underline hover:text-orange-400"
                                >{{ post.topic.name }}</router-link
                            >
                            on {{ post.created_at | longDate }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import gql from "graphql-tag"; //for compiling the graphql query, we use the template literal fn
import Header from "./components/Header.vue";
import Footer from "./components/Footer";

export default {
    components: {
        Header,
        Footer,
    },
    apollo: {
        post: {
            //the name of the query "post" become a property of a component and can be use in template tag
            query: gql`
                query ($id: ID!) {
                    post(id: $id) {
                        id
                        title
                        content
                        created_at
                        author {
                            id
                            name
                            avatar
                        }
                        topic {
                            name
                            slug
                        }
                    }
                }
            `,
            variables() {
                return {
                    id: this.$route.params.id,
                };
            },
            error() {
                this.$router.push({ name: "404" }); //we redirect on the 404 route
            },
        },
    },
};
</script>
