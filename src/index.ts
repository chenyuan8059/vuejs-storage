import { Vue, VueConstructor, VuexPlugin } from './interfaces'

import { install } from './install'
import { createVuexPlugin } from './vuexplugin'

interface vjs {
	(): VuexPlugin<Object>
	install: (Vue: VueConstructor) => any
}
const vuejsStorage = <vjs>function(option) {
	return createVuexPlugin(option)
}
vuejsStorage.install = install

export default vuejsStorage
