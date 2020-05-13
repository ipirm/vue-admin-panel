import VueRouter from 'vue-router'
import Vue from 'vue'

// Layouts
import AuthLayout from '@/layouts/AuthLayout'
import DefaultLayout from '@/layouts/DefaultLayout'

// Random
import ErrorPage from '@/pages/ErrorPage'
import AccessDenied from '@/pages/AccessDenied'
import DashboardPage from '@/pages/DashboardPage'

// Auth
import LoginPage from '@/pages/auth/LoginPage'
import NewPassword from '@/pages/auth/NewPassword'
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage'

// Tours chunk group
const TourIndex = () => import(/* webpackChunkName: "tour" */ '@/pages/tours/TourIndex')
const TourCreate = () => import(/* webpackChunkName: "tour" */ '@/pages/tours/TourCreate')

// User chunk group
const UserIndex = () => import(/* webpackChunkName: "user" */ '@/pages/users/UserIndex')
const UserCreate = () => import(/* webpackChunkName: "user" */ '@/pages/users/UserCreate')
const UserUpdate = () => import(/* webpackChunkName: "user" */ '@/pages/users/UserUpdate')

// Category chunk group
const CategoryIndex = () => import(/* webpackChunkName: "user" */ '@/pages/categories/CategoriesIndex')
const CategoriesCreate = () => import(/* webpackChunkName: "user" */ '@/pages/categories/CategoriesCreate.vue')
const CategoriesUpdate = () => import(/* webpackChunkName: "user" */ '@/pages/categories/CategoriesUpdate.vue')

// Category child chunk group
const ChildsIndex = () => import(/* webpackChunkName: "user" */ '@/pages/childs/ChildsIndex')
const ChildsCreate = () => import(/* webpackChunkName: "user" */ '@/pages/childs/ChildsCreate.vue')
const ChildsUpdate = () => import(/* webpackChunkName: "user" */ '@/pages/childs/ChildsUpdate.vue')

// Groups child chunk group
const GroupsIndex = () => import(/* webpackChunkName: "user" */ '@/pages/groups/GroupsIndex')
const GroupsCreate = () => import(/* webpackChunkName: "user" */ '@/pages/groups/GroupsCreate.vue')
const GroupsUpdate = () => import(/* webpackChunkName: "user" */ '@/pages/groups/GroupsUpdate.vue')

// Countries child chunk group
const CountriesIndex = () => import(/* webpackChunkName: "user" */ '@/pages/countries/CountriesIndex')
const CountriesCreate = () => import(/* webpackChunkName: "user" */ '@/pages/countries/CountriesCreate.vue')
const CountriesUpdate = () => import(/* webpackChunkName: "user" */ '@/pages/countries/CountriesUpdate.vue')

// Cities child chunk group
const CitiesIndex = () => import(/* webpackChunkName: "user" */ '@/pages/cities/CitiesIndex')
const CitiesCreate = () => import(/* webpackChunkName: "user" */ '@/pages/cities/CitiesCreate.vue')
const CitiesUpdate = () => import(/* webpackChunkName: "user" */ '@/pages/cities/CitiesUpdate.vue')

// ProductTypes chunk group
const TypesIndex = () => import(/* webpackChunkName: "user" */ '@/pages/types/TypesIndex')
const TypesCreate = () => import(/* webpackChunkName: "user" */ '@/pages/types/TypesCreate.vue')
const TypesUpdate = () => import(/* webpackChunkName: "user" */ '@/pages/types/TypesUpdate.vue')
const TypesCategories = () => import(/* webpackChunkName: "user" */ '@/pages/types/TypesCategories.vue')


// SettingTypes chunk group
const SettingsIndex = () => import(/* webpackChunkName: "user" */ '@/pages/settings/SettingsIndex')
const SettingsCreate = () => import(/* webpackChunkName: "user" */ '@/pages/settings/SettingsCreate.vue')
const SettingsUpdate = () => import(/* webpackChunkName: "user" */ '@/pages/settings/SettingsUpdate.vue')
const SettingsCategories = () => import(/* webpackChunkName: "user" */ '@/pages/settings/SettingsCategories.vue')


// Firm chunk group
const FirmCreate = () => import(/* webpackChunkName: "firm" */ '@/pages/firms/FirmCreate')
const FirmIndex = () => import(/* webpackChunkName: "firm" */ '@/pages/firms/FirmIndex')
const FirmUpdate = () => import(/* webpackChunkName: "firm" */ '@/pages/firms/FirmUpdate')
// Firm childrens
const FirmPrimaryUpdate = () => import(/* webpackChunkName: "firm" */ '@/pages/firms/update/FirmPrimaryUpdate')
const FirmContactsUpdate = () => import(/* webpackChunkName: "firm" */ '@/pages/firms/update/FirmContactsUpdate')
const FirmSecondaryUpdate = () => import(/* webpackChunkName: "firm" */ '@/pages/firms/update/FirmSecondaryUpdate')
const FirmNotificationsUpdate = () => import(/* webpackChunkName: "firm" */ '@/pages/firms/update/FirmNotificationsUpdate')
const FirmBookingUpdate = () => import(/* webpackChunkName: "firm" */ '@/pages/firms/update/FirmBookingUpdate')
const FirmContractUpdate = () => import(/* webpackChunkName: "firm" */ '@/pages/firms/update/FirmContractUpdate')

// booking chunk group
const BookingIndex = () => import(/* webpackChunkName: "booking" */ '@/pages/booking/BookingIndex')

// reviews chunk group
const ReviewsIndex = () => import(/* webpackChunkName: "reviews" */ '@/pages/reviews/ReviewsIndex')

// reports chunk group
const ReportsIndex = () => import(/* webpackChunkName: "reviews" */ '@/pages/reports/ReportsIndex')
const SalesReport = () => import(/* webpackChunkName: "reviews" */ '@/pages/reports/SalesReport')
const ManageReport = () => import(/* webpackChunkName: "reviews" */ '@/pages/reports/ManageReport')

// reviews chunk group
const PromotionsIndex = () => import(/* webpackChunkName: "reviews" */ '@/pages/promotions/PromotionsIndex')

// Category child chunk group
const TextsIndex = () => import(/* webpackChunkName: "user" */ '@/pages/texts/TextsIndex')
const TextsCreate = () => import(/* webpackChunkName: "user" */ '@/pages/texts/TextsCreate.vue')
const TextsUpdate = () => import(/* webpackChunkName: "user" */ '@/pages/texts/TextsUpdate.vue')

// Menu child chunk group
const MenusIndex = () => import(/* webpackChunkName: "user" */ '@/pages/menus/MenusIndex')
const MenusCreate = () => import(/* webpackChunkName: "user" */ '@/pages/menus/MenusCreate.vue')
const MenusUpdate = () => import(/* webpackChunkName: "user" */ '@/pages/menus/MenusUpdate.vue')
const QuestionPage = () => import( '@/pages/questions/Question.vue')
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/auth',
      component: AuthLayout,
      children: [
        { path: '', redirect:  { name: 'login' }},
        { path: 'login', name: 'login', component: LoginPage },
        { path: 'forgot-password', name: 'forgot-password', component: ForgotPasswordPage },
        { path: 'new_password*', name: 'new_password', component: NewPassword }
      ]
    },
    {
      path: '/access-denied',
      component: AccessDenied,
      meta: { requiresAuth: true }
    },
    {
      path: '/',
      component: DefaultLayout,
      meta: { requiresAuth: true },
      children: [
        { path: '', redirect:  { name: 'dashboard' }},
        { path: '/dashboard',    name: 'dashboard',   component: DashboardPage },
        { path: 'operators/new', name: 'firm-create', component: FirmCreate },
        { path: '/tours',        name: 'tour-index',  component: TourIndex },
        { path: '/question',        name: 'question-index',  component: QuestionPage },
        { path: '/tours/new',    name: 'tour-create', component: TourCreate },
        { path: '/tours/update/:id',    name: 'tour-update', component: TourCreate },
        { path: 'users',         name: 'user-index',  component: UserIndex },
        { path: 'users/new',     name: 'user-create', component: UserCreate },
        { path: 'users/:id',     name: 'user-update', component: UserUpdate, props: true },

        { path: 'categories',         name: 'category-index',  component: CategoryIndex },
        { path: 'categories/new',     name: 'category-create', component: CategoriesCreate },
        { path: 'categories/:id',     name: 'category-update', component: CategoriesUpdate, props: true },

        { path: 'group-of-countries',         name: 'group-index',  component: GroupsIndex },
        { path: 'group-of-countries/new',     name: 'group-create', component: GroupsCreate },
        { path: 'group-of-countries/:id',     name: 'group-update', component: GroupsUpdate, props: true },

        { path: 'countries',         name: 'country-index',  component: CountriesIndex },
        { path: 'countries/new',     name: 'country-create', component: CountriesCreate },
        { path: 'countries/:id',     name: 'country-update', component: CountriesUpdate, props: true },

        { path: 'cities',         name: 'city-index',  component: CitiesIndex },
        { path: 'cities/new',     name: 'city-create', component: CitiesCreate },
        { path: 'cities/:id',     name: 'city-update', component: CitiesUpdate, props: true },

        { path: 'categories-childs/:id',     name: 'child-index', component: ChildsIndex, props: true },
        { path: 'categories-childs/:id/new',     name: 'child-create', component: ChildsCreate, props: true },
        { path: 'categories-childs/:id/:catId',     name: 'child-update', component: ChildsUpdate, props: true },

        { path: 'product-types',         name: 'type-index',  component: TypesIndex },
        { path: 'product-types/new',     name: 'type-create', component: TypesCreate },
        { path: 'product-types/:id',     name: 'type-update', component: TypesUpdate, props: true },
        { path: 'product-types-categories/:id',     name: 'type-categories', component: TypesCategories, props: true },

        { path: 'product-setting-types',         name: 'setting-index',  component: SettingsIndex },
        { path: 'product-setting-types/new',     name: 'setting-create', component: SettingsCreate },
        { path: 'product-setting-types/:id',     name: 'setting-update', component: SettingsUpdate, props: true },
        { path: 'product-setting-types-categories/:id',     name: 'setting-categories', component: SettingsCategories, props: true },

        { path: 'text-pages',         name: 'text-index',  component: TextsIndex },
        { path: 'text-pages/new',     name: 'text-create', component: TextsCreate },
        { path: 'text-pages/:id',     name: 'text-update', component: TextsUpdate, props: true },

        { path: 'menus',         name: 'menu-index',  component: MenusIndex },
        { path: 'menus/new',     name: 'menu-create', component: MenusCreate },
        { path: 'menus/:id',     name: 'menu-update', component: MenusUpdate, props: true },

        { path: '/bookings',        name: 'booking-index',  component: BookingIndex },
        { path: '/reviews',        name: 'review-index',  component: ReviewsIndex },
        {
          path: '/reports',
          name: 'report-index',
          component: ReportsIndex,
          children: [
              { path: '',              redirect: { name: 'sales-report' } },
              { path: 'sales-report',       name: 'sales-report',       component: SalesReport, props: true },
              { path: 'manage-report',      name: 'manage-report',      component: ManageReport, props: true },
          ]
        },
        { path: '/promotions',        name: 'promotion-index',  component: PromotionsIndex },
        {
          path: 'operators',
          name: 'firm-index',
          component: FirmIndex,
          meta: { admin: true }
        },
        {
          path: 'operators/:id/settings',
          component: FirmUpdate,
          props: true,
          meta: { admin: true },
          children: [
            { path: '',              redirect: { name: 'firm-primary-update' } },
            { path: 'primary',       name: 'firm-primary-update',       component: FirmPrimaryUpdate, props: true },
            { path: 'contacts',      name: 'firm-contacts-update',      component: FirmContactsUpdate, props: true },
            { path: 'secondary',     name: 'firm-secondary-update',     component: FirmSecondaryUpdate, props: true },
            { path: 'notifications', name: 'firm-notifications-update', component: FirmNotificationsUpdate, props: true },
            { path: 'booking',       name: 'firm-booking-update',       component: FirmBookingUpdate, props: true },
            { path: 'contract',      name: 'firm-contract-update',      component: FirmContractUpdate, props: true }
          ]
        }
      ]
    },
    {
      path: '*',
      component: DefaultLayout,
      meta: { requiresAuth: true },
      children: [
        { path: '', name: '404',   component: ErrorPage},
      ]
    }
  ]
});

function removeTokensAndRole() {
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('accessToken')
  localStorage.removeItem('expiresIn')
  localStorage.removeItem('userRole')
}

router.beforeEach((to, from, next) => {
  const userRole = localStorage.getItem('userRole')
  const domain = document.domain.split('.')[0]

  if (userRole == 'customer') {
    removeTokensAndRole()
    next('/access-denied')
  }

  if (userRole == 'manager' && domain == 'admin') {
    removeTokensAndRole()
    next('/access-denied')
  }

  if (to.matched.some(record => record.meta.admin)) {
    if (userRole !== 'admin') next('/')
    else next()
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('accessToken' == null)) {
      next({
        path: '/auth/login',
        params: { nextUrl: to.fullPath }
      })
    } else next()
  } else next()
});

export default router
