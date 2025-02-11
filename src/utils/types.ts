export type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void
export type MethodDecorator = (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => void
