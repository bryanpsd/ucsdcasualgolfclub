export type Maybe<T> = T | undefined

/**
 *
 * Remaps interface {T}, prefixing each key with what ever is passed as {Pre}
 *
 * All keys will persist optional status
 */
export type Remapper<T, Pre extends string> = {
	[P in keyof T as `${Pre}${string & P}`]: T[P]
}

/**
 *
 * Remaps interface {T}, prefixing each key with what ever is passed as {Pre}
 *
 * All keys will be optional
 */
export type OptionalRemapper<T, Pre extends string> = {
	[P in keyof T as `${Pre}${string & P}`]?: T[P]
}

/**
 * Removes type `R` from `T`
 * This is useful for narrowing a union type T
 *
 * @example
 * type Foo = string | number | boolean
 * type Bar = Remover<Foo, string | boolean> // Bar === number
 */
export type Narrower<T, R> = T extends R ? never : T

/**
 * Extract the final object shape from nested generics
 */
export type Flatten<T> = {
	[K in keyof T]: T[K]
} & {}

/**
 * Remove readonly identifiers from T
 */
export type Mutable<T> = {
	-readonly [K in keyof T]: Mutable<T[K]>
}

/**
 * Composed type to apply Flatten and Mutable helper types
 */

export type FlatMut<T> = Flatten<Mutable<T>> & {}

/**
 * Object.keys() with better TS support
 * @param obj any object
 * @returns the correctly typed keys array from an object
 */
export const objectKeys = <Obj extends Record<PropertyKey, unknown>>(
	obj: Obj
) => {
	return Object.keys(obj) as (keyof Obj)[]
}

/**
 * Type system implementation of Array.join()
 */
export type Join<T extends unknown[], U extends string | number> = T extends [
	infer F,
	...infer R,
]
	? R['length'] extends 0
		? `${F & string}`
		: `${F & string}${U}${Join<R, U>}`
	: never
