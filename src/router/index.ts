import { useStore } from "@/store";
import CreateTopic from "@/views/CreateTopic.vue";
import DashboardVue from "@/views/Dashboard.vue";
import Email from "@/views/Dashboard/Email.vue";
import Topics from "@/views/Dashboard/Topics.vue";
import SignUp from "@/views/SignUp.vue";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";


const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/home",
			name: "Home",
			component: HomeView,
		},
		{
			path: "/signup",
			name: "SignUp",
			component: SignUp,
		},
		{
			path: "/signin",
			name: "SignIn",
			component: () => import("@/views/SignIn.vue"),
		},
		{
			path: "/dashboard",
			name: "Dashboard",
			meta: {
				requiresAuth: true,
			},
			component: DashboardVue,
			children: [
				{
					path: "topics",
					name: "Topics",
					component: Topics,
				},
        {
          path: "dashboard/createTopic",
          name: "CreateTopic",
          component: CreateTopic,
        },
        {
          path: "compose",
          name: "Compose",
          component: () => import("@/views/Dashboard/Compose.vue"),
        },
        {
          path: "emails/:topicId?",
          name: "Emails",
          component: () => import("@/views/Dashboard/Emails.vue"),
          props:(record) => {
            return {
              topicId:record.params['topicId'] || null
            }
          },
        },
        {
          path: "email",
          name: "Email",
          component: Email,
          props:(record) => {
            return {
              body:record.query['body'],
              subject:record.query['subject'],
              date:record.query['date']
            }
          },
        }
        
			],	
		},
		{
			path: "/",
			redirect: "/home",
		},
		{
			path: "/about",
			name: "About",
			component: () => import("@/views/About.vue"),
		},
    {
			path: "/ids",
			name: "IDs",
			component: () => import("@/views/IDs.vue"),
		},
	],
});

router.beforeEach(async (to, from, next) => {
	const store = useStore();
	const requiresAuth = to.matched.some((route) => route.meta.requiresAuth || false)
  let path:string
	//console.log(to.path);
	
	if (!requiresAuth) {
    //console.log('no auth');
		path = to.path;
		next();
	} else {
		await store.checkAuth()
		if (store.accountId) {
      //console.log('auth with account id');
			path = to.path;
			next();
		} else {
      //console.log('auth and no account id');
			path = "/home";
			next({ name: "Home" });
		}
	}
  store.currentPath = path
	window.scroll({ top: 0 });
});
export default router;
