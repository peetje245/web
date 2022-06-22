
const routes = [
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            // { path: '', component: () => import('src/components/web/articles/Articles.vue') },
            { path: '', component: () => import('src/components/web/games/Games.vue') },
            // { path: 'games', component: () => import('src/components/web/games/Games.vue') },
            { path: 'calendar', component: () => import('src/components/web/calendar/Calendar.vue') },
            { path: 'login', component: () => import('src/pages/Login.vue') },
            { path: 'register', component: () => import('src/pages/Register.vue') },
        ]
    },

    {
        path: '/portal',
        component: () => import('layouts/PortalLayout.vue'),
        children: [
            { path: 'dashboard', component: () => import('src/components/portal/dashboard/Dashboard.vue') },
            { path: 'articles', component: () => import('src/components/portal/articles/Articles.vue') },
            { path: 'developers', component: () => import('src/components/portal/developers/Developers.vue') },
            { path: 'games', component: () => import('src/components/portal/games/Games.vue') },
            { path: 'genres', component: () => import('src/components/portal/genres/Genres.vue') },
            { path: 'platforms', component: () => import('src/components/portal/platforms/Platforms.vue') },
            { path: 'publishers', component: () => import('src/components/portal/publishers/Publishers.vue') },
            { path: 'series', component: () => import('src/components/portal/series/Series.vue') },
            { path: 'users', component: () => import('src/components/portal/users/Users.vue') },
            { path: 'franchises', component: () => import('src/components/portal/franchises/Franchise.vue') },
        ]
    },
  

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '*',
        component: () => import('pages/Error404.vue')
    }
]

export default routes
