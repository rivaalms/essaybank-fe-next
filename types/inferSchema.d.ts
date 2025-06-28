/**
 * Infer the type of the object that the given Yup schema would validate.
 */
declare type InferSchema<
   Fn extends (...args: any[]) => Record<string, import("yup").Schema>,
   Key extends keyof ReturnType<Fn>,
> = import("yup").InferType<ReturnType<Fn>[Key]>