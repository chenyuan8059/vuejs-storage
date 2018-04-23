/* main.js */
import Vue from 'vue'
import Vuex from 'vuex'
import { Plugin as VuexPlugin } from 'vuex/types/index'
interface Option {
	storage?: Storage
	stringify?(obj: any): string
	parse?(str: String): any
	merge?(...obj: object[]): object
	namespace: string
	keys?: string[]
}

/* entry.js */
export = vuejsStorage

declare function vuejsStorage(option: Option): VuexPlugin
declare namespace vuejsStorage {
	function install(Vue: Vue): void
}

/* override vue option */
declare module 'vue/types/options' {
	interface ComponentOptions<V extends Vue> {
		storage?: Option | Option[]
	}
}
