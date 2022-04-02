import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'

// import example from './module-example'
import actions from './module-chat'
import state from './module-chat'
import getters from './module-chat'
import mutations from './module-chat'


/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      // example
      actions,
      state,
      getters,
      mutations
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})
