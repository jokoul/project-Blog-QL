import Vue from "vue";
import VueRouter from "vue-router";
import moment from "moment";

import "./bootstrap";

import PostList from "./PostList";
import Post from "./Post";
import ApolloClient from "apollo-boost";
import VueApollo from "vue-apollo";
import TopicPostList from "./TopicPostList";
import AuthorPostList from "./AuthorPostList";
import NotFound from "./NotFound";

window.Vue = Vue;
Vue.use(VueRouter); //we add vue router as a plugin to our Vue application

//Add apollo plugin into Vue
Vue.use(VueApollo);

//We create a constante with all our defined route.
const routes = [
    {
        path: "/",
        name: "index", //name of route allow to create redirection
        component: PostList, //component is called on each specific route
    },
    {
        path: "/post/:id",
        name: "post",
        component: Post,
    },
    {
        path: "/topics/:slug",
        name: "topic",
        component: TopicPostList,
    },
    {
        path: "/authors/:id",
        name: "author",
        component: AuthorPostList,
    },
    {
        path: "*",
        name: "404",
        component: NotFound,
    },
];

//Create an ApolloClient instance
const apolloClient = new ApolloClient({
    //You should use an absolute URL here
    uri: "http://127.0.0.1:8000/graphql",
});

//Create Apollo Provider
const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
});

//Create the router and pass as argument an object containing our routes constante.
const router = new VueRouter({
    mode: "history",
    routes,
});

//Creation of a vue filter
Vue.filter("timeago", (value) => moment(value).fromNow());
Vue.filter("longDate", (value) => moment(value).format("MMMM Do YYYY")); //Check moment node library doc to get more details

//We add the router to our application wich is a vue instance
const app = new Vue({
    el: "#app",
    apolloProvider,
    router,
});
