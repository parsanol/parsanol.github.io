import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './styles/main.css'

// Static views
import Home from './views/Home.vue'
import Introduction from './views/Introduction.vue'
import Installation from './views/Installation.vue'
import FirstParser from './views/FirstParser.vue'
import Parsers from './views/Parsers.vue'
import Transforms from './views/Transforms.vue'
import Errors from './views/Errors.vue'
import Examples from './views/Examples.vue'
import Api from './views/Api.vue'
import RubyBindings from './views/RubyBindings.vue'
import About from './views/About.vue'
import Tutorial from './views/Tutorial.vue'
import Backends from './views/Backends.vue'
import Comparison from './views/docs/Comparison.vue'
import Migration from './views/docs/Migration.vue'
import Architecture from './views/Architecture.vue'
import RustGuide from './views/docs/RustGuide.vue'
import RustComparison from './views/docs/RustComparison.vue'
import RustMigration from './views/docs/RustMigration.vue'
import RubyComparison from './views/docs/RubyComparison.vue'
import CapturesGuide from './views/CapturesGuide.vue'
import FeatureComparison from './views/FeatureComparison.vue'
import News from './views/News.vue'

// Import manifest for dynamic route generation
import examplesManifest from './data/examples-manifest.json'

// Static routes
const staticRoutes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/introduction', name: 'Introduction', component: Introduction },
  { path: '/installation', name: 'Installation', component: Installation },
  { path: '/first-parser', name: 'FirstParser', component: FirstParser },
  { path: '/tutorial', name: 'Tutorial', component: Tutorial },
  { path: '/getting-started', redirect: '/introduction' },
  { path: '/parsers', name: 'Parsers', component: Parsers },
  { path: '/transforms', name: 'Transforms', component: Transforms },
  { path: '/errors', name: 'Errors', component: Errors },
  { path: '/examples', name: 'Examples', component: Examples },
  { path: '/api', name: 'Api', component: Api },
  { path: '/ruby', name: 'RubyBindings', component: RubyBindings },
  { path: '/backends', name: 'Backends', component: Backends },
  { path: '/comparison', redirect: '/rust-comparison' },
  { path: '/migration', name: 'Migration', component: Migration },
  { path: '/architecture', name: 'Architecture', component: Architecture },
  // Rust-specific pages
  { path: '/rust', name: 'RustGuide', component: RustGuide },
  { path: '/rust-comparison', name: 'RustComparison', component: RustComparison },
  { path: '/rust-migration', name: 'RustMigration', component: RustMigration },
  // Ruby-specific pages
  { path: '/ruby-comparison', name: 'RubyComparison', component: RubyComparison },
  // Guides
  { path: '/guides/captures', name: 'CapturesGuide', component: CapturesGuide },
  { path: '/guides/feature-comparison', name: 'FeatureComparison', component: FeatureComparison },
  // News
  { path: '/news', name: 'News', component: News },
]

// AUTO-GENERATED routes from manifest - NO HARD CODED PATHS!
const exampleRoutes = examplesManifest.map((example: any) => ({
  path: example.path,
  name: example.name,
  component: () => import(`./views/examples/${example.name}.vue`)
}))

const routes = [...staticRoutes, ...exampleRoutes]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    } else {
      return { top: 0 }
    }
  },
})

const app = createApp(App)
app.use(router)
app.mount('#app')
