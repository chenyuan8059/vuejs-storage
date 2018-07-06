import { get, set, copy, parsePath } from '../src/objpath'

describe('objpath', () => {
	const obj = { a: 1, b: { e: { f: 87 } }, c: [{ d: 1 }] }
	it('parsePath', () => {
		parsePath('a.b[123].casd.test').should.deep.equal(['a', 'b', '123', 'casd', 'test'])
	})
	it('get', () => {
		get(obj, 'b.e.f').should.equal(87)
	})
	it('set', () => {
		set(obj, 'q.r.s.t', 5)
		get(obj, 'q.r.s.t').should.equal(5)
	})
	it('get_array', () => {
		get(obj, 'c[0].d').should.equal(1)
	})
	it('set_array', () => {
		set(obj, 'c[0].d', 63)
		get(obj, 'c[0].d').should.equal(63)
	})
	it('final', () => {
		obj.should.deep.equal({ a: 1, b: { e: { f: 87 } }, c: [{ d: 63 }], q: { r: { s: { t: 5 } } } })
	})
	it('copy', () => {
		const o = { a: { b: { c: 5 } } }
		const p: any = {}
		copy(p, o, 'a.b.c')
		p.a.b.c.should.deep.equal(5)
	})
})
