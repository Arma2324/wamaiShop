import Home from "../views/home/Home.vue";
// import Search from "../views/search/Search.vue";
// import Order from "../views/order/Order.vue";
// import Profile from "../views/profile/Profile.vue";
// import Login from "../views/login/Login.vue";
// import Shop from "../views/shop/Shop.vue";
// 路由懒加载
//const Home = () => import("../views/home/Home.vue")
const Search = () => import("../views/search/Search.vue")
const Order = () => import("../views/order/Order.vue")
const Profile = () => import("../views/profile/Profile.vue")
const Login = () => import("../views/login/Login.vue")
const Shop = () => import("../views/shop/Shop.vue")

import Menu from "../views/shop/menu/Menu.vue";
import Comment from "../views/shop/comment/Comment.vue";
import ShopInfo from "../views/shop/shopInfo/ShopInfo.vue";

const routes = [
  {
    path: "/",
    redirect: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      navShow: false,
    },
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      navShow: true,
    },
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
    meta: {
      navShow: true,
    },
  },
  {
    path: "/order",
    name: "Order",
    component: Order,
    meta: {
      navShow: true,
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      navShow: true,
    },
  },
  {
    path: "/shop",
    name: "Shop",
    component: Shop,
    meta: {
      navShow: false,
    },
    children: [
      {
        path: "menu",
        name: "Menu",
        component: Menu,
      },
      {
        path: "comment",
        name: "Comment",
        component: Comment,
      },
      {
        path: "shopinfo",
        name: "ShopInfo",
        component: ShopInfo,
      },
    ],
  },
];

export default routes;
