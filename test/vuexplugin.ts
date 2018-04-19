import { createVuexPlugin } from '../src/vuexplugin'
import Vue from 'vue/dist/vue.min.js'
import Vuex from 'vuex'

Vue.config.productionTip = false
Vue.config.devtools = false
Vue.use(Vuex)
const div = document.createElement('div')
div.id = 'appvuexplugin'
let vm
describe('vuexplugin', () => {
	it('first', done => {
		const store = new Vuex.Store({
			state: {
				count: 1
			},
			mutations: {
				inc: (state: any) => state.count++
			},
			plugins: [
				createVuexPlugin({
					namespace: 'vuextest1',
					keys: ['count']
				})
			]
		})
		vm = new Vue({
			computed: {
				count() {
					return this.$store.state.count
				}
			},
			template: `<span ref="count">{{count}}</span>`,
			mounted() {
				this.$refs.count.innerHTML.should.equal('1')
				this.$store.commit('inc')
				done()
			},
			store
		}).$mount(div)
	})
	it('second', done => {
		vm.$destroy()
		const store = new Vuex.Store({
			state: {
				count: 1
			},
			mutations: {
				inc: (state: any) => state.count++
			},
			plugins: [
				createVuexPlugin({
					namespace: 'vuextest1',
					keys: ['count']
				})
			]
		})
		vm = new Vue({
			computed: {
				count() {
					return this.$store.state.count
				}
			},
			template: `<span ref="count">{{count}}</span>`,
			mounted() {
				this.$refs.count.innerHTML.should.equal('2')
				done()
			},
			store
		}).$mount(div)
	})
	it('can handle nested key', done => {
		const store = new Vuex.Store({
			state: {
				a: { b: { c: 5 } },
				d: 123
			},
			plugins: [
				createVuexPlugin({
					namespace: 'vuextest2',
					keys: ['a.b.c']
				})
			]
		})
		setTimeout(() => {
			JSON.parse(localStorage.vuextest2).should.deep.equal({ a: { b: { c: 5 } } })
			done()
		}, 0)
	})
	it('merge fn works', () => {
		const store = new Vuex.Store({
			state: {
				a: { b: { c: 5 } },
				d: 123
			},
			plugins: [
				createVuexPlugin({
					namespace: 'vuextest2',
					keys: ['a.b.c'],
					merge: () => ({ a: 3 })
				})
			]
		})
		store.state.should.deep.equal({ a: 3 })
	})
	it('modules', () => {
		const store = new Vuex.Store({
			state: {
				a: 1
			},
			modules: {
				moduleA: {
					state: {
						a: 7
					}
				}
			},
			plugins: [
				createVuexPlugin({
					namespace: 'vuextest3',
					keys: ['a']
				})
			]
		})
		store.state.should.deep.equal({ a: 1, moduleA: { a: 7 } })
	})
})
