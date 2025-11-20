
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Usuario
 * 
 */
export type Usuario = $Result.DefaultSelection<Prisma.$UsuarioPayload>
/**
 * Model Tienda
 * 
 */
export type Tienda = $Result.DefaultSelection<Prisma.$TiendaPayload>
/**
 * Model Multa
 * 
 */
export type Multa = $Result.DefaultSelection<Prisma.$MultaPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const TipoUsuario: {
  CONSUMIDOR: 'CONSUMIDOR',
  TIENDA: 'TIENDA',
  PROFECO: 'PROFECO'
};

export type TipoUsuario = (typeof TipoUsuario)[keyof typeof TipoUsuario]


export const EstadoMulta: {
  PENDIENTE: 'PENDIENTE',
  PAGADA: 'PAGADA',
  APELADA: 'APELADA'
};

export type EstadoMulta = (typeof EstadoMulta)[keyof typeof EstadoMulta]

}

export type TipoUsuario = $Enums.TipoUsuario

export const TipoUsuario: typeof $Enums.TipoUsuario

export type EstadoMulta = $Enums.EstadoMulta

export const EstadoMulta: typeof $Enums.EstadoMulta

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Usuarios
 * const usuarios = await prisma.usuario.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Usuarios
   * const usuarios = await prisma.usuario.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.usuario`: Exposes CRUD operations for the **Usuario** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Usuarios
    * const usuarios = await prisma.usuario.findMany()
    * ```
    */
  get usuario(): Prisma.UsuarioDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tienda`: Exposes CRUD operations for the **Tienda** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tiendas
    * const tiendas = await prisma.tienda.findMany()
    * ```
    */
  get tienda(): Prisma.TiendaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.multa`: Exposes CRUD operations for the **Multa** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Multas
    * const multas = await prisma.multa.findMany()
    * ```
    */
  get multa(): Prisma.MultaDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.0
   * Query Engine version: 2ba551f319ab1df4bc874a89965d8b3641056773
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Usuario: 'Usuario',
    Tienda: 'Tienda',
    Multa: 'Multa'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "usuario" | "tienda" | "multa"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Usuario: {
        payload: Prisma.$UsuarioPayload<ExtArgs>
        fields: Prisma.UsuarioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UsuarioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UsuarioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          findFirst: {
            args: Prisma.UsuarioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UsuarioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          findMany: {
            args: Prisma.UsuarioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          create: {
            args: Prisma.UsuarioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          createMany: {
            args: Prisma.UsuarioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UsuarioCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          delete: {
            args: Prisma.UsuarioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          update: {
            args: Prisma.UsuarioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          deleteMany: {
            args: Prisma.UsuarioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UsuarioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UsuarioUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          upsert: {
            args: Prisma.UsuarioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          aggregate: {
            args: Prisma.UsuarioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsuario>
          }
          groupBy: {
            args: Prisma.UsuarioGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsuarioGroupByOutputType>[]
          }
          count: {
            args: Prisma.UsuarioCountArgs<ExtArgs>
            result: $Utils.Optional<UsuarioCountAggregateOutputType> | number
          }
        }
      }
      Tienda: {
        payload: Prisma.$TiendaPayload<ExtArgs>
        fields: Prisma.TiendaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TiendaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TiendaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TiendaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TiendaPayload>
          }
          findFirst: {
            args: Prisma.TiendaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TiendaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TiendaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TiendaPayload>
          }
          findMany: {
            args: Prisma.TiendaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TiendaPayload>[]
          }
          create: {
            args: Prisma.TiendaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TiendaPayload>
          }
          createMany: {
            args: Prisma.TiendaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TiendaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TiendaPayload>[]
          }
          delete: {
            args: Prisma.TiendaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TiendaPayload>
          }
          update: {
            args: Prisma.TiendaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TiendaPayload>
          }
          deleteMany: {
            args: Prisma.TiendaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TiendaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TiendaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TiendaPayload>[]
          }
          upsert: {
            args: Prisma.TiendaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TiendaPayload>
          }
          aggregate: {
            args: Prisma.TiendaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTienda>
          }
          groupBy: {
            args: Prisma.TiendaGroupByArgs<ExtArgs>
            result: $Utils.Optional<TiendaGroupByOutputType>[]
          }
          count: {
            args: Prisma.TiendaCountArgs<ExtArgs>
            result: $Utils.Optional<TiendaCountAggregateOutputType> | number
          }
        }
      }
      Multa: {
        payload: Prisma.$MultaPayload<ExtArgs>
        fields: Prisma.MultaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MultaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MultaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MultaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MultaPayload>
          }
          findFirst: {
            args: Prisma.MultaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MultaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MultaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MultaPayload>
          }
          findMany: {
            args: Prisma.MultaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MultaPayload>[]
          }
          create: {
            args: Prisma.MultaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MultaPayload>
          }
          createMany: {
            args: Prisma.MultaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MultaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MultaPayload>[]
          }
          delete: {
            args: Prisma.MultaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MultaPayload>
          }
          update: {
            args: Prisma.MultaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MultaPayload>
          }
          deleteMany: {
            args: Prisma.MultaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MultaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MultaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MultaPayload>[]
          }
          upsert: {
            args: Prisma.MultaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MultaPayload>
          }
          aggregate: {
            args: Prisma.MultaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMulta>
          }
          groupBy: {
            args: Prisma.MultaGroupByArgs<ExtArgs>
            result: $Utils.Optional<MultaGroupByOutputType>[]
          }
          count: {
            args: Prisma.MultaCountArgs<ExtArgs>
            result: $Utils.Optional<MultaCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    usuario?: UsuarioOmit
    tienda?: TiendaOmit
    multa?: MultaOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UsuarioCountOutputType
   */

  export type UsuarioCountOutputType = {
    multas: number
  }

  export type UsuarioCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    multas?: boolean | UsuarioCountOutputTypeCountMultasArgs
  }

  // Custom InputTypes
  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsuarioCountOutputType
     */
    select?: UsuarioCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountMultasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MultaWhereInput
  }


  /**
   * Count Type TiendaCountOutputType
   */

  export type TiendaCountOutputType = {
    multas: number
  }

  export type TiendaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    multas?: boolean | TiendaCountOutputTypeCountMultasArgs
  }

  // Custom InputTypes
  /**
   * TiendaCountOutputType without action
   */
  export type TiendaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TiendaCountOutputType
     */
    select?: TiendaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TiendaCountOutputType without action
   */
  export type TiendaCountOutputTypeCountMultasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MultaWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Usuario
   */

  export type AggregateUsuario = {
    _count: UsuarioCountAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  export type UsuarioMinAggregateOutputType = {
    usuario_id: string | null
    email: string | null
    password_hash: string | null
    nombre: string | null
    tipo_usuario: $Enums.TipoUsuario | null
  }

  export type UsuarioMaxAggregateOutputType = {
    usuario_id: string | null
    email: string | null
    password_hash: string | null
    nombre: string | null
    tipo_usuario: $Enums.TipoUsuario | null
  }

  export type UsuarioCountAggregateOutputType = {
    usuario_id: number
    email: number
    password_hash: number
    nombre: number
    tipo_usuario: number
    _all: number
  }


  export type UsuarioMinAggregateInputType = {
    usuario_id?: true
    email?: true
    password_hash?: true
    nombre?: true
    tipo_usuario?: true
  }

  export type UsuarioMaxAggregateInputType = {
    usuario_id?: true
    email?: true
    password_hash?: true
    nombre?: true
    tipo_usuario?: true
  }

  export type UsuarioCountAggregateInputType = {
    usuario_id?: true
    email?: true
    password_hash?: true
    nombre?: true
    tipo_usuario?: true
    _all?: true
  }

  export type UsuarioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Usuario to aggregate.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Usuarios
    **/
    _count?: true | UsuarioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsuarioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsuarioMaxAggregateInputType
  }

  export type GetUsuarioAggregateType<T extends UsuarioAggregateArgs> = {
        [P in keyof T & keyof AggregateUsuario]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsuario[P]>
      : GetScalarType<T[P], AggregateUsuario[P]>
  }




  export type UsuarioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsuarioWhereInput
    orderBy?: UsuarioOrderByWithAggregationInput | UsuarioOrderByWithAggregationInput[]
    by: UsuarioScalarFieldEnum[] | UsuarioScalarFieldEnum
    having?: UsuarioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsuarioCountAggregateInputType | true
    _min?: UsuarioMinAggregateInputType
    _max?: UsuarioMaxAggregateInputType
  }

  export type UsuarioGroupByOutputType = {
    usuario_id: string
    email: string
    password_hash: string
    nombre: string
    tipo_usuario: $Enums.TipoUsuario
    _count: UsuarioCountAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  type GetUsuarioGroupByPayload<T extends UsuarioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsuarioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsuarioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
            : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
        }
      >
    >


  export type UsuarioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    usuario_id?: boolean
    email?: boolean
    password_hash?: boolean
    nombre?: boolean
    tipo_usuario?: boolean
    tienda?: boolean | Usuario$tiendaArgs<ExtArgs>
    multas?: boolean | Usuario$multasArgs<ExtArgs>
    _count?: boolean | UsuarioCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    usuario_id?: boolean
    email?: boolean
    password_hash?: boolean
    nombre?: boolean
    tipo_usuario?: boolean
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    usuario_id?: boolean
    email?: boolean
    password_hash?: boolean
    nombre?: boolean
    tipo_usuario?: boolean
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectScalar = {
    usuario_id?: boolean
    email?: boolean
    password_hash?: boolean
    nombre?: boolean
    tipo_usuario?: boolean
  }

  export type UsuarioOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"usuario_id" | "email" | "password_hash" | "nombre" | "tipo_usuario", ExtArgs["result"]["usuario"]>
  export type UsuarioInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tienda?: boolean | Usuario$tiendaArgs<ExtArgs>
    multas?: boolean | Usuario$multasArgs<ExtArgs>
    _count?: boolean | UsuarioCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UsuarioIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UsuarioIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UsuarioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Usuario"
    objects: {
      tienda: Prisma.$TiendaPayload<ExtArgs> | null
      multas: Prisma.$MultaPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      usuario_id: string
      email: string
      password_hash: string
      nombre: string
      tipo_usuario: $Enums.TipoUsuario
    }, ExtArgs["result"]["usuario"]>
    composites: {}
  }

  type UsuarioGetPayload<S extends boolean | null | undefined | UsuarioDefaultArgs> = $Result.GetResult<Prisma.$UsuarioPayload, S>

  type UsuarioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UsuarioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsuarioCountAggregateInputType | true
    }

  export interface UsuarioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Usuario'], meta: { name: 'Usuario' } }
    /**
     * Find zero or one Usuario that matches the filter.
     * @param {UsuarioFindUniqueArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UsuarioFindUniqueArgs>(args: SelectSubset<T, UsuarioFindUniqueArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Usuario that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UsuarioFindUniqueOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UsuarioFindUniqueOrThrowArgs>(args: SelectSubset<T, UsuarioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuario that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UsuarioFindFirstArgs>(args?: SelectSubset<T, UsuarioFindFirstArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuario that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UsuarioFindFirstOrThrowArgs>(args?: SelectSubset<T, UsuarioFindFirstOrThrowArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Usuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Usuarios
     * const usuarios = await prisma.usuario.findMany()
     * 
     * // Get first 10 Usuarios
     * const usuarios = await prisma.usuario.findMany({ take: 10 })
     * 
     * // Only select the `usuario_id`
     * const usuarioWithUsuario_idOnly = await prisma.usuario.findMany({ select: { usuario_id: true } })
     * 
     */
    findMany<T extends UsuarioFindManyArgs>(args?: SelectSubset<T, UsuarioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Usuario.
     * @param {UsuarioCreateArgs} args - Arguments to create a Usuario.
     * @example
     * // Create one Usuario
     * const Usuario = await prisma.usuario.create({
     *   data: {
     *     // ... data to create a Usuario
     *   }
     * })
     * 
     */
    create<T extends UsuarioCreateArgs>(args: SelectSubset<T, UsuarioCreateArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Usuarios.
     * @param {UsuarioCreateManyArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuario = await prisma.usuario.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UsuarioCreateManyArgs>(args?: SelectSubset<T, UsuarioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Usuarios and returns the data saved in the database.
     * @param {UsuarioCreateManyAndReturnArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuario = await prisma.usuario.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Usuarios and only return the `usuario_id`
     * const usuarioWithUsuario_idOnly = await prisma.usuario.createManyAndReturn({
     *   select: { usuario_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UsuarioCreateManyAndReturnArgs>(args?: SelectSubset<T, UsuarioCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Usuario.
     * @param {UsuarioDeleteArgs} args - Arguments to delete one Usuario.
     * @example
     * // Delete one Usuario
     * const Usuario = await prisma.usuario.delete({
     *   where: {
     *     // ... filter to delete one Usuario
     *   }
     * })
     * 
     */
    delete<T extends UsuarioDeleteArgs>(args: SelectSubset<T, UsuarioDeleteArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Usuario.
     * @param {UsuarioUpdateArgs} args - Arguments to update one Usuario.
     * @example
     * // Update one Usuario
     * const usuario = await prisma.usuario.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UsuarioUpdateArgs>(args: SelectSubset<T, UsuarioUpdateArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Usuarios.
     * @param {UsuarioDeleteManyArgs} args - Arguments to filter Usuarios to delete.
     * @example
     * // Delete a few Usuarios
     * const { count } = await prisma.usuario.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UsuarioDeleteManyArgs>(args?: SelectSubset<T, UsuarioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Usuarios
     * const usuario = await prisma.usuario.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UsuarioUpdateManyArgs>(args: SelectSubset<T, UsuarioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios and returns the data updated in the database.
     * @param {UsuarioUpdateManyAndReturnArgs} args - Arguments to update many Usuarios.
     * @example
     * // Update many Usuarios
     * const usuario = await prisma.usuario.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Usuarios and only return the `usuario_id`
     * const usuarioWithUsuario_idOnly = await prisma.usuario.updateManyAndReturn({
     *   select: { usuario_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UsuarioUpdateManyAndReturnArgs>(args: SelectSubset<T, UsuarioUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Usuario.
     * @param {UsuarioUpsertArgs} args - Arguments to update or create a Usuario.
     * @example
     * // Update or create a Usuario
     * const usuario = await prisma.usuario.upsert({
     *   create: {
     *     // ... data to create a Usuario
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Usuario we want to update
     *   }
     * })
     */
    upsert<T extends UsuarioUpsertArgs>(args: SelectSubset<T, UsuarioUpsertArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioCountArgs} args - Arguments to filter Usuarios to count.
     * @example
     * // Count the number of Usuarios
     * const count = await prisma.usuario.count({
     *   where: {
     *     // ... the filter for the Usuarios we want to count
     *   }
     * })
    **/
    count<T extends UsuarioCountArgs>(
      args?: Subset<T, UsuarioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsuarioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsuarioAggregateArgs>(args: Subset<T, UsuarioAggregateArgs>): Prisma.PrismaPromise<GetUsuarioAggregateType<T>>

    /**
     * Group by Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UsuarioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsuarioGroupByArgs['orderBy'] }
        : { orderBy?: UsuarioGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UsuarioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsuarioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Usuario model
   */
  readonly fields: UsuarioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Usuario.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UsuarioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tienda<T extends Usuario$tiendaArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$tiendaArgs<ExtArgs>>): Prisma__TiendaClient<$Result.GetResult<Prisma.$TiendaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    multas<T extends Usuario$multasArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$multasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MultaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Usuario model
   */
  interface UsuarioFieldRefs {
    readonly usuario_id: FieldRef<"Usuario", 'String'>
    readonly email: FieldRef<"Usuario", 'String'>
    readonly password_hash: FieldRef<"Usuario", 'String'>
    readonly nombre: FieldRef<"Usuario", 'String'>
    readonly tipo_usuario: FieldRef<"Usuario", 'TipoUsuario'>
  }
    

  // Custom InputTypes
  /**
   * Usuario findUnique
   */
  export type UsuarioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario findUniqueOrThrow
   */
  export type UsuarioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario findFirst
   */
  export type UsuarioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario findFirstOrThrow
   */
  export type UsuarioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario findMany
   */
  export type UsuarioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuarios to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario create
   */
  export type UsuarioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The data needed to create a Usuario.
     */
    data: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>
  }

  /**
   * Usuario createMany
   */
  export type UsuarioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Usuarios.
     */
    data: UsuarioCreateManyInput | UsuarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Usuario createManyAndReturn
   */
  export type UsuarioCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * The data used to create many Usuarios.
     */
    data: UsuarioCreateManyInput | UsuarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Usuario update
   */
  export type UsuarioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The data needed to update a Usuario.
     */
    data: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>
    /**
     * Choose, which Usuario to update.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario updateMany
   */
  export type UsuarioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Usuarios.
     */
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyInput>
    /**
     * Filter which Usuarios to update
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to update.
     */
    limit?: number
  }

  /**
   * Usuario updateManyAndReturn
   */
  export type UsuarioUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * The data used to update Usuarios.
     */
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyInput>
    /**
     * Filter which Usuarios to update
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to update.
     */
    limit?: number
  }

  /**
   * Usuario upsert
   */
  export type UsuarioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The filter to search for the Usuario to update in case it exists.
     */
    where: UsuarioWhereUniqueInput
    /**
     * In case the Usuario found by the `where` argument doesn't exist, create a new Usuario with this data.
     */
    create: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>
    /**
     * In case the Usuario was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>
  }

  /**
   * Usuario delete
   */
  export type UsuarioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter which Usuario to delete.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario deleteMany
   */
  export type UsuarioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Usuarios to delete
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to delete.
     */
    limit?: number
  }

  /**
   * Usuario.tienda
   */
  export type Usuario$tiendaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tienda
     */
    select?: TiendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tienda
     */
    omit?: TiendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TiendaInclude<ExtArgs> | null
    where?: TiendaWhereInput
  }

  /**
   * Usuario.multas
   */
  export type Usuario$multasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Multa
     */
    select?: MultaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Multa
     */
    omit?: MultaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MultaInclude<ExtArgs> | null
    where?: MultaWhereInput
    orderBy?: MultaOrderByWithRelationInput | MultaOrderByWithRelationInput[]
    cursor?: MultaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MultaScalarFieldEnum | MultaScalarFieldEnum[]
  }

  /**
   * Usuario without action
   */
  export type UsuarioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
  }


  /**
   * Model Tienda
   */

  export type AggregateTienda = {
    _count: TiendaCountAggregateOutputType | null
    _avg: TiendaAvgAggregateOutputType | null
    _sum: TiendaSumAggregateOutputType | null
    _min: TiendaMinAggregateOutputType | null
    _max: TiendaMaxAggregateOutputType | null
  }

  export type TiendaAvgAggregateOutputType = {
    latitud: Decimal | null
    longitud: Decimal | null
  }

  export type TiendaSumAggregateOutputType = {
    latitud: Decimal | null
    longitud: Decimal | null
  }

  export type TiendaMinAggregateOutputType = {
    tienda_id: string | null
    usuario_id: string | null
    nombre: string | null
    direccion: string | null
    latitud: Decimal | null
    longitud: Decimal | null
    logo_url: string | null
  }

  export type TiendaMaxAggregateOutputType = {
    tienda_id: string | null
    usuario_id: string | null
    nombre: string | null
    direccion: string | null
    latitud: Decimal | null
    longitud: Decimal | null
    logo_url: string | null
  }

  export type TiendaCountAggregateOutputType = {
    tienda_id: number
    usuario_id: number
    nombre: number
    direccion: number
    latitud: number
    longitud: number
    logo_url: number
    _all: number
  }


  export type TiendaAvgAggregateInputType = {
    latitud?: true
    longitud?: true
  }

  export type TiendaSumAggregateInputType = {
    latitud?: true
    longitud?: true
  }

  export type TiendaMinAggregateInputType = {
    tienda_id?: true
    usuario_id?: true
    nombre?: true
    direccion?: true
    latitud?: true
    longitud?: true
    logo_url?: true
  }

  export type TiendaMaxAggregateInputType = {
    tienda_id?: true
    usuario_id?: true
    nombre?: true
    direccion?: true
    latitud?: true
    longitud?: true
    logo_url?: true
  }

  export type TiendaCountAggregateInputType = {
    tienda_id?: true
    usuario_id?: true
    nombre?: true
    direccion?: true
    latitud?: true
    longitud?: true
    logo_url?: true
    _all?: true
  }

  export type TiendaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tienda to aggregate.
     */
    where?: TiendaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tiendas to fetch.
     */
    orderBy?: TiendaOrderByWithRelationInput | TiendaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TiendaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tiendas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tiendas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tiendas
    **/
    _count?: true | TiendaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TiendaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TiendaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TiendaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TiendaMaxAggregateInputType
  }

  export type GetTiendaAggregateType<T extends TiendaAggregateArgs> = {
        [P in keyof T & keyof AggregateTienda]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTienda[P]>
      : GetScalarType<T[P], AggregateTienda[P]>
  }




  export type TiendaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TiendaWhereInput
    orderBy?: TiendaOrderByWithAggregationInput | TiendaOrderByWithAggregationInput[]
    by: TiendaScalarFieldEnum[] | TiendaScalarFieldEnum
    having?: TiendaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TiendaCountAggregateInputType | true
    _avg?: TiendaAvgAggregateInputType
    _sum?: TiendaSumAggregateInputType
    _min?: TiendaMinAggregateInputType
    _max?: TiendaMaxAggregateInputType
  }

  export type TiendaGroupByOutputType = {
    tienda_id: string
    usuario_id: string
    nombre: string
    direccion: string | null
    latitud: Decimal | null
    longitud: Decimal | null
    logo_url: string | null
    _count: TiendaCountAggregateOutputType | null
    _avg: TiendaAvgAggregateOutputType | null
    _sum: TiendaSumAggregateOutputType | null
    _min: TiendaMinAggregateOutputType | null
    _max: TiendaMaxAggregateOutputType | null
  }

  type GetTiendaGroupByPayload<T extends TiendaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TiendaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TiendaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TiendaGroupByOutputType[P]>
            : GetScalarType<T[P], TiendaGroupByOutputType[P]>
        }
      >
    >


  export type TiendaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    tienda_id?: boolean
    usuario_id?: boolean
    nombre?: boolean
    direccion?: boolean
    latitud?: boolean
    longitud?: boolean
    logo_url?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    multas?: boolean | Tienda$multasArgs<ExtArgs>
    _count?: boolean | TiendaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tienda"]>

  export type TiendaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    tienda_id?: boolean
    usuario_id?: boolean
    nombre?: boolean
    direccion?: boolean
    latitud?: boolean
    longitud?: boolean
    logo_url?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tienda"]>

  export type TiendaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    tienda_id?: boolean
    usuario_id?: boolean
    nombre?: boolean
    direccion?: boolean
    latitud?: boolean
    longitud?: boolean
    logo_url?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tienda"]>

  export type TiendaSelectScalar = {
    tienda_id?: boolean
    usuario_id?: boolean
    nombre?: boolean
    direccion?: boolean
    latitud?: boolean
    longitud?: boolean
    logo_url?: boolean
  }

  export type TiendaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"tienda_id" | "usuario_id" | "nombre" | "direccion" | "latitud" | "longitud" | "logo_url", ExtArgs["result"]["tienda"]>
  export type TiendaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    multas?: boolean | Tienda$multasArgs<ExtArgs>
    _count?: boolean | TiendaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TiendaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }
  export type TiendaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }

  export type $TiendaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tienda"
    objects: {
      usuario: Prisma.$UsuarioPayload<ExtArgs>
      multas: Prisma.$MultaPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      tienda_id: string
      usuario_id: string
      nombre: string
      direccion: string | null
      latitud: Prisma.Decimal | null
      longitud: Prisma.Decimal | null
      logo_url: string | null
    }, ExtArgs["result"]["tienda"]>
    composites: {}
  }

  type TiendaGetPayload<S extends boolean | null | undefined | TiendaDefaultArgs> = $Result.GetResult<Prisma.$TiendaPayload, S>

  type TiendaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TiendaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TiendaCountAggregateInputType | true
    }

  export interface TiendaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tienda'], meta: { name: 'Tienda' } }
    /**
     * Find zero or one Tienda that matches the filter.
     * @param {TiendaFindUniqueArgs} args - Arguments to find a Tienda
     * @example
     * // Get one Tienda
     * const tienda = await prisma.tienda.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TiendaFindUniqueArgs>(args: SelectSubset<T, TiendaFindUniqueArgs<ExtArgs>>): Prisma__TiendaClient<$Result.GetResult<Prisma.$TiendaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tienda that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TiendaFindUniqueOrThrowArgs} args - Arguments to find a Tienda
     * @example
     * // Get one Tienda
     * const tienda = await prisma.tienda.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TiendaFindUniqueOrThrowArgs>(args: SelectSubset<T, TiendaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TiendaClient<$Result.GetResult<Prisma.$TiendaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tienda that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TiendaFindFirstArgs} args - Arguments to find a Tienda
     * @example
     * // Get one Tienda
     * const tienda = await prisma.tienda.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TiendaFindFirstArgs>(args?: SelectSubset<T, TiendaFindFirstArgs<ExtArgs>>): Prisma__TiendaClient<$Result.GetResult<Prisma.$TiendaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tienda that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TiendaFindFirstOrThrowArgs} args - Arguments to find a Tienda
     * @example
     * // Get one Tienda
     * const tienda = await prisma.tienda.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TiendaFindFirstOrThrowArgs>(args?: SelectSubset<T, TiendaFindFirstOrThrowArgs<ExtArgs>>): Prisma__TiendaClient<$Result.GetResult<Prisma.$TiendaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tiendas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TiendaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tiendas
     * const tiendas = await prisma.tienda.findMany()
     * 
     * // Get first 10 Tiendas
     * const tiendas = await prisma.tienda.findMany({ take: 10 })
     * 
     * // Only select the `tienda_id`
     * const tiendaWithTienda_idOnly = await prisma.tienda.findMany({ select: { tienda_id: true } })
     * 
     */
    findMany<T extends TiendaFindManyArgs>(args?: SelectSubset<T, TiendaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TiendaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tienda.
     * @param {TiendaCreateArgs} args - Arguments to create a Tienda.
     * @example
     * // Create one Tienda
     * const Tienda = await prisma.tienda.create({
     *   data: {
     *     // ... data to create a Tienda
     *   }
     * })
     * 
     */
    create<T extends TiendaCreateArgs>(args: SelectSubset<T, TiendaCreateArgs<ExtArgs>>): Prisma__TiendaClient<$Result.GetResult<Prisma.$TiendaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tiendas.
     * @param {TiendaCreateManyArgs} args - Arguments to create many Tiendas.
     * @example
     * // Create many Tiendas
     * const tienda = await prisma.tienda.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TiendaCreateManyArgs>(args?: SelectSubset<T, TiendaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tiendas and returns the data saved in the database.
     * @param {TiendaCreateManyAndReturnArgs} args - Arguments to create many Tiendas.
     * @example
     * // Create many Tiendas
     * const tienda = await prisma.tienda.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tiendas and only return the `tienda_id`
     * const tiendaWithTienda_idOnly = await prisma.tienda.createManyAndReturn({
     *   select: { tienda_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TiendaCreateManyAndReturnArgs>(args?: SelectSubset<T, TiendaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TiendaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Tienda.
     * @param {TiendaDeleteArgs} args - Arguments to delete one Tienda.
     * @example
     * // Delete one Tienda
     * const Tienda = await prisma.tienda.delete({
     *   where: {
     *     // ... filter to delete one Tienda
     *   }
     * })
     * 
     */
    delete<T extends TiendaDeleteArgs>(args: SelectSubset<T, TiendaDeleteArgs<ExtArgs>>): Prisma__TiendaClient<$Result.GetResult<Prisma.$TiendaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tienda.
     * @param {TiendaUpdateArgs} args - Arguments to update one Tienda.
     * @example
     * // Update one Tienda
     * const tienda = await prisma.tienda.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TiendaUpdateArgs>(args: SelectSubset<T, TiendaUpdateArgs<ExtArgs>>): Prisma__TiendaClient<$Result.GetResult<Prisma.$TiendaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tiendas.
     * @param {TiendaDeleteManyArgs} args - Arguments to filter Tiendas to delete.
     * @example
     * // Delete a few Tiendas
     * const { count } = await prisma.tienda.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TiendaDeleteManyArgs>(args?: SelectSubset<T, TiendaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tiendas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TiendaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tiendas
     * const tienda = await prisma.tienda.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TiendaUpdateManyArgs>(args: SelectSubset<T, TiendaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tiendas and returns the data updated in the database.
     * @param {TiendaUpdateManyAndReturnArgs} args - Arguments to update many Tiendas.
     * @example
     * // Update many Tiendas
     * const tienda = await prisma.tienda.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tiendas and only return the `tienda_id`
     * const tiendaWithTienda_idOnly = await prisma.tienda.updateManyAndReturn({
     *   select: { tienda_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TiendaUpdateManyAndReturnArgs>(args: SelectSubset<T, TiendaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TiendaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Tienda.
     * @param {TiendaUpsertArgs} args - Arguments to update or create a Tienda.
     * @example
     * // Update or create a Tienda
     * const tienda = await prisma.tienda.upsert({
     *   create: {
     *     // ... data to create a Tienda
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tienda we want to update
     *   }
     * })
     */
    upsert<T extends TiendaUpsertArgs>(args: SelectSubset<T, TiendaUpsertArgs<ExtArgs>>): Prisma__TiendaClient<$Result.GetResult<Prisma.$TiendaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tiendas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TiendaCountArgs} args - Arguments to filter Tiendas to count.
     * @example
     * // Count the number of Tiendas
     * const count = await prisma.tienda.count({
     *   where: {
     *     // ... the filter for the Tiendas we want to count
     *   }
     * })
    **/
    count<T extends TiendaCountArgs>(
      args?: Subset<T, TiendaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TiendaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tienda.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TiendaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TiendaAggregateArgs>(args: Subset<T, TiendaAggregateArgs>): Prisma.PrismaPromise<GetTiendaAggregateType<T>>

    /**
     * Group by Tienda.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TiendaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TiendaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TiendaGroupByArgs['orderBy'] }
        : { orderBy?: TiendaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TiendaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTiendaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tienda model
   */
  readonly fields: TiendaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tienda.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TiendaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usuario<T extends UsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    multas<T extends Tienda$multasArgs<ExtArgs> = {}>(args?: Subset<T, Tienda$multasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MultaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Tienda model
   */
  interface TiendaFieldRefs {
    readonly tienda_id: FieldRef<"Tienda", 'String'>
    readonly usuario_id: FieldRef<"Tienda", 'String'>
    readonly nombre: FieldRef<"Tienda", 'String'>
    readonly direccion: FieldRef<"Tienda", 'String'>
    readonly latitud: FieldRef<"Tienda", 'Decimal'>
    readonly longitud: FieldRef<"Tienda", 'Decimal'>
    readonly logo_url: FieldRef<"Tienda", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Tienda findUnique
   */
  export type TiendaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tienda
     */
    select?: TiendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tienda
     */
    omit?: TiendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TiendaInclude<ExtArgs> | null
    /**
     * Filter, which Tienda to fetch.
     */
    where: TiendaWhereUniqueInput
  }

  /**
   * Tienda findUniqueOrThrow
   */
  export type TiendaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tienda
     */
    select?: TiendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tienda
     */
    omit?: TiendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TiendaInclude<ExtArgs> | null
    /**
     * Filter, which Tienda to fetch.
     */
    where: TiendaWhereUniqueInput
  }

  /**
   * Tienda findFirst
   */
  export type TiendaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tienda
     */
    select?: TiendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tienda
     */
    omit?: TiendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TiendaInclude<ExtArgs> | null
    /**
     * Filter, which Tienda to fetch.
     */
    where?: TiendaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tiendas to fetch.
     */
    orderBy?: TiendaOrderByWithRelationInput | TiendaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tiendas.
     */
    cursor?: TiendaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tiendas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tiendas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tiendas.
     */
    distinct?: TiendaScalarFieldEnum | TiendaScalarFieldEnum[]
  }

  /**
   * Tienda findFirstOrThrow
   */
  export type TiendaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tienda
     */
    select?: TiendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tienda
     */
    omit?: TiendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TiendaInclude<ExtArgs> | null
    /**
     * Filter, which Tienda to fetch.
     */
    where?: TiendaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tiendas to fetch.
     */
    orderBy?: TiendaOrderByWithRelationInput | TiendaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tiendas.
     */
    cursor?: TiendaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tiendas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tiendas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tiendas.
     */
    distinct?: TiendaScalarFieldEnum | TiendaScalarFieldEnum[]
  }

  /**
   * Tienda findMany
   */
  export type TiendaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tienda
     */
    select?: TiendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tienda
     */
    omit?: TiendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TiendaInclude<ExtArgs> | null
    /**
     * Filter, which Tiendas to fetch.
     */
    where?: TiendaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tiendas to fetch.
     */
    orderBy?: TiendaOrderByWithRelationInput | TiendaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tiendas.
     */
    cursor?: TiendaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tiendas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tiendas.
     */
    skip?: number
    distinct?: TiendaScalarFieldEnum | TiendaScalarFieldEnum[]
  }

  /**
   * Tienda create
   */
  export type TiendaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tienda
     */
    select?: TiendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tienda
     */
    omit?: TiendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TiendaInclude<ExtArgs> | null
    /**
     * The data needed to create a Tienda.
     */
    data: XOR<TiendaCreateInput, TiendaUncheckedCreateInput>
  }

  /**
   * Tienda createMany
   */
  export type TiendaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tiendas.
     */
    data: TiendaCreateManyInput | TiendaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tienda createManyAndReturn
   */
  export type TiendaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tienda
     */
    select?: TiendaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tienda
     */
    omit?: TiendaOmit<ExtArgs> | null
    /**
     * The data used to create many Tiendas.
     */
    data: TiendaCreateManyInput | TiendaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TiendaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Tienda update
   */
  export type TiendaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tienda
     */
    select?: TiendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tienda
     */
    omit?: TiendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TiendaInclude<ExtArgs> | null
    /**
     * The data needed to update a Tienda.
     */
    data: XOR<TiendaUpdateInput, TiendaUncheckedUpdateInput>
    /**
     * Choose, which Tienda to update.
     */
    where: TiendaWhereUniqueInput
  }

  /**
   * Tienda updateMany
   */
  export type TiendaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tiendas.
     */
    data: XOR<TiendaUpdateManyMutationInput, TiendaUncheckedUpdateManyInput>
    /**
     * Filter which Tiendas to update
     */
    where?: TiendaWhereInput
    /**
     * Limit how many Tiendas to update.
     */
    limit?: number
  }

  /**
   * Tienda updateManyAndReturn
   */
  export type TiendaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tienda
     */
    select?: TiendaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tienda
     */
    omit?: TiendaOmit<ExtArgs> | null
    /**
     * The data used to update Tiendas.
     */
    data: XOR<TiendaUpdateManyMutationInput, TiendaUncheckedUpdateManyInput>
    /**
     * Filter which Tiendas to update
     */
    where?: TiendaWhereInput
    /**
     * Limit how many Tiendas to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TiendaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Tienda upsert
   */
  export type TiendaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tienda
     */
    select?: TiendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tienda
     */
    omit?: TiendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TiendaInclude<ExtArgs> | null
    /**
     * The filter to search for the Tienda to update in case it exists.
     */
    where: TiendaWhereUniqueInput
    /**
     * In case the Tienda found by the `where` argument doesn't exist, create a new Tienda with this data.
     */
    create: XOR<TiendaCreateInput, TiendaUncheckedCreateInput>
    /**
     * In case the Tienda was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TiendaUpdateInput, TiendaUncheckedUpdateInput>
  }

  /**
   * Tienda delete
   */
  export type TiendaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tienda
     */
    select?: TiendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tienda
     */
    omit?: TiendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TiendaInclude<ExtArgs> | null
    /**
     * Filter which Tienda to delete.
     */
    where: TiendaWhereUniqueInput
  }

  /**
   * Tienda deleteMany
   */
  export type TiendaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tiendas to delete
     */
    where?: TiendaWhereInput
    /**
     * Limit how many Tiendas to delete.
     */
    limit?: number
  }

  /**
   * Tienda.multas
   */
  export type Tienda$multasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Multa
     */
    select?: MultaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Multa
     */
    omit?: MultaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MultaInclude<ExtArgs> | null
    where?: MultaWhereInput
    orderBy?: MultaOrderByWithRelationInput | MultaOrderByWithRelationInput[]
    cursor?: MultaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MultaScalarFieldEnum | MultaScalarFieldEnum[]
  }

  /**
   * Tienda without action
   */
  export type TiendaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tienda
     */
    select?: TiendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tienda
     */
    omit?: TiendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TiendaInclude<ExtArgs> | null
  }


  /**
   * Model Multa
   */

  export type AggregateMulta = {
    _count: MultaCountAggregateOutputType | null
    _avg: MultaAvgAggregateOutputType | null
    _sum: MultaSumAggregateOutputType | null
    _min: MultaMinAggregateOutputType | null
    _max: MultaMaxAggregateOutputType | null
  }

  export type MultaAvgAggregateOutputType = {
    monto: Decimal | null
  }

  export type MultaSumAggregateOutputType = {
    monto: Decimal | null
  }

  export type MultaMinAggregateOutputType = {
    multa_id: string | null
    tienda_id: string | null
    fecha_emision: Date | null
    motivo: string | null
    monto: Decimal | null
    estado: $Enums.EstadoMulta | null
    usuario_id: string | null
  }

  export type MultaMaxAggregateOutputType = {
    multa_id: string | null
    tienda_id: string | null
    fecha_emision: Date | null
    motivo: string | null
    monto: Decimal | null
    estado: $Enums.EstadoMulta | null
    usuario_id: string | null
  }

  export type MultaCountAggregateOutputType = {
    multa_id: number
    tienda_id: number
    fecha_emision: number
    motivo: number
    monto: number
    estado: number
    usuario_id: number
    _all: number
  }


  export type MultaAvgAggregateInputType = {
    monto?: true
  }

  export type MultaSumAggregateInputType = {
    monto?: true
  }

  export type MultaMinAggregateInputType = {
    multa_id?: true
    tienda_id?: true
    fecha_emision?: true
    motivo?: true
    monto?: true
    estado?: true
    usuario_id?: true
  }

  export type MultaMaxAggregateInputType = {
    multa_id?: true
    tienda_id?: true
    fecha_emision?: true
    motivo?: true
    monto?: true
    estado?: true
    usuario_id?: true
  }

  export type MultaCountAggregateInputType = {
    multa_id?: true
    tienda_id?: true
    fecha_emision?: true
    motivo?: true
    monto?: true
    estado?: true
    usuario_id?: true
    _all?: true
  }

  export type MultaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Multa to aggregate.
     */
    where?: MultaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Multas to fetch.
     */
    orderBy?: MultaOrderByWithRelationInput | MultaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MultaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Multas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Multas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Multas
    **/
    _count?: true | MultaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MultaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MultaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MultaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MultaMaxAggregateInputType
  }

  export type GetMultaAggregateType<T extends MultaAggregateArgs> = {
        [P in keyof T & keyof AggregateMulta]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMulta[P]>
      : GetScalarType<T[P], AggregateMulta[P]>
  }




  export type MultaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MultaWhereInput
    orderBy?: MultaOrderByWithAggregationInput | MultaOrderByWithAggregationInput[]
    by: MultaScalarFieldEnum[] | MultaScalarFieldEnum
    having?: MultaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MultaCountAggregateInputType | true
    _avg?: MultaAvgAggregateInputType
    _sum?: MultaSumAggregateInputType
    _min?: MultaMinAggregateInputType
    _max?: MultaMaxAggregateInputType
  }

  export type MultaGroupByOutputType = {
    multa_id: string
    tienda_id: string
    fecha_emision: Date
    motivo: string
    monto: Decimal
    estado: $Enums.EstadoMulta
    usuario_id: string | null
    _count: MultaCountAggregateOutputType | null
    _avg: MultaAvgAggregateOutputType | null
    _sum: MultaSumAggregateOutputType | null
    _min: MultaMinAggregateOutputType | null
    _max: MultaMaxAggregateOutputType | null
  }

  type GetMultaGroupByPayload<T extends MultaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MultaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MultaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MultaGroupByOutputType[P]>
            : GetScalarType<T[P], MultaGroupByOutputType[P]>
        }
      >
    >


  export type MultaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    multa_id?: boolean
    tienda_id?: boolean
    fecha_emision?: boolean
    motivo?: boolean
    monto?: boolean
    estado?: boolean
    usuario_id?: boolean
    tienda?: boolean | TiendaDefaultArgs<ExtArgs>
    usuario?: boolean | Multa$usuarioArgs<ExtArgs>
  }, ExtArgs["result"]["multa"]>

  export type MultaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    multa_id?: boolean
    tienda_id?: boolean
    fecha_emision?: boolean
    motivo?: boolean
    monto?: boolean
    estado?: boolean
    usuario_id?: boolean
    tienda?: boolean | TiendaDefaultArgs<ExtArgs>
    usuario?: boolean | Multa$usuarioArgs<ExtArgs>
  }, ExtArgs["result"]["multa"]>

  export type MultaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    multa_id?: boolean
    tienda_id?: boolean
    fecha_emision?: boolean
    motivo?: boolean
    monto?: boolean
    estado?: boolean
    usuario_id?: boolean
    tienda?: boolean | TiendaDefaultArgs<ExtArgs>
    usuario?: boolean | Multa$usuarioArgs<ExtArgs>
  }, ExtArgs["result"]["multa"]>

  export type MultaSelectScalar = {
    multa_id?: boolean
    tienda_id?: boolean
    fecha_emision?: boolean
    motivo?: boolean
    monto?: boolean
    estado?: boolean
    usuario_id?: boolean
  }

  export type MultaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"multa_id" | "tienda_id" | "fecha_emision" | "motivo" | "monto" | "estado" | "usuario_id", ExtArgs["result"]["multa"]>
  export type MultaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tienda?: boolean | TiendaDefaultArgs<ExtArgs>
    usuario?: boolean | Multa$usuarioArgs<ExtArgs>
  }
  export type MultaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tienda?: boolean | TiendaDefaultArgs<ExtArgs>
    usuario?: boolean | Multa$usuarioArgs<ExtArgs>
  }
  export type MultaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tienda?: boolean | TiendaDefaultArgs<ExtArgs>
    usuario?: boolean | Multa$usuarioArgs<ExtArgs>
  }

  export type $MultaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Multa"
    objects: {
      tienda: Prisma.$TiendaPayload<ExtArgs>
      usuario: Prisma.$UsuarioPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      multa_id: string
      tienda_id: string
      fecha_emision: Date
      motivo: string
      monto: Prisma.Decimal
      estado: $Enums.EstadoMulta
      usuario_id: string | null
    }, ExtArgs["result"]["multa"]>
    composites: {}
  }

  type MultaGetPayload<S extends boolean | null | undefined | MultaDefaultArgs> = $Result.GetResult<Prisma.$MultaPayload, S>

  type MultaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MultaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MultaCountAggregateInputType | true
    }

  export interface MultaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Multa'], meta: { name: 'Multa' } }
    /**
     * Find zero or one Multa that matches the filter.
     * @param {MultaFindUniqueArgs} args - Arguments to find a Multa
     * @example
     * // Get one Multa
     * const multa = await prisma.multa.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MultaFindUniqueArgs>(args: SelectSubset<T, MultaFindUniqueArgs<ExtArgs>>): Prisma__MultaClient<$Result.GetResult<Prisma.$MultaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Multa that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MultaFindUniqueOrThrowArgs} args - Arguments to find a Multa
     * @example
     * // Get one Multa
     * const multa = await prisma.multa.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MultaFindUniqueOrThrowArgs>(args: SelectSubset<T, MultaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MultaClient<$Result.GetResult<Prisma.$MultaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Multa that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MultaFindFirstArgs} args - Arguments to find a Multa
     * @example
     * // Get one Multa
     * const multa = await prisma.multa.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MultaFindFirstArgs>(args?: SelectSubset<T, MultaFindFirstArgs<ExtArgs>>): Prisma__MultaClient<$Result.GetResult<Prisma.$MultaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Multa that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MultaFindFirstOrThrowArgs} args - Arguments to find a Multa
     * @example
     * // Get one Multa
     * const multa = await prisma.multa.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MultaFindFirstOrThrowArgs>(args?: SelectSubset<T, MultaFindFirstOrThrowArgs<ExtArgs>>): Prisma__MultaClient<$Result.GetResult<Prisma.$MultaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Multas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MultaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Multas
     * const multas = await prisma.multa.findMany()
     * 
     * // Get first 10 Multas
     * const multas = await prisma.multa.findMany({ take: 10 })
     * 
     * // Only select the `multa_id`
     * const multaWithMulta_idOnly = await prisma.multa.findMany({ select: { multa_id: true } })
     * 
     */
    findMany<T extends MultaFindManyArgs>(args?: SelectSubset<T, MultaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MultaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Multa.
     * @param {MultaCreateArgs} args - Arguments to create a Multa.
     * @example
     * // Create one Multa
     * const Multa = await prisma.multa.create({
     *   data: {
     *     // ... data to create a Multa
     *   }
     * })
     * 
     */
    create<T extends MultaCreateArgs>(args: SelectSubset<T, MultaCreateArgs<ExtArgs>>): Prisma__MultaClient<$Result.GetResult<Prisma.$MultaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Multas.
     * @param {MultaCreateManyArgs} args - Arguments to create many Multas.
     * @example
     * // Create many Multas
     * const multa = await prisma.multa.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MultaCreateManyArgs>(args?: SelectSubset<T, MultaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Multas and returns the data saved in the database.
     * @param {MultaCreateManyAndReturnArgs} args - Arguments to create many Multas.
     * @example
     * // Create many Multas
     * const multa = await prisma.multa.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Multas and only return the `multa_id`
     * const multaWithMulta_idOnly = await prisma.multa.createManyAndReturn({
     *   select: { multa_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MultaCreateManyAndReturnArgs>(args?: SelectSubset<T, MultaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MultaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Multa.
     * @param {MultaDeleteArgs} args - Arguments to delete one Multa.
     * @example
     * // Delete one Multa
     * const Multa = await prisma.multa.delete({
     *   where: {
     *     // ... filter to delete one Multa
     *   }
     * })
     * 
     */
    delete<T extends MultaDeleteArgs>(args: SelectSubset<T, MultaDeleteArgs<ExtArgs>>): Prisma__MultaClient<$Result.GetResult<Prisma.$MultaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Multa.
     * @param {MultaUpdateArgs} args - Arguments to update one Multa.
     * @example
     * // Update one Multa
     * const multa = await prisma.multa.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MultaUpdateArgs>(args: SelectSubset<T, MultaUpdateArgs<ExtArgs>>): Prisma__MultaClient<$Result.GetResult<Prisma.$MultaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Multas.
     * @param {MultaDeleteManyArgs} args - Arguments to filter Multas to delete.
     * @example
     * // Delete a few Multas
     * const { count } = await prisma.multa.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MultaDeleteManyArgs>(args?: SelectSubset<T, MultaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Multas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MultaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Multas
     * const multa = await prisma.multa.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MultaUpdateManyArgs>(args: SelectSubset<T, MultaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Multas and returns the data updated in the database.
     * @param {MultaUpdateManyAndReturnArgs} args - Arguments to update many Multas.
     * @example
     * // Update many Multas
     * const multa = await prisma.multa.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Multas and only return the `multa_id`
     * const multaWithMulta_idOnly = await prisma.multa.updateManyAndReturn({
     *   select: { multa_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MultaUpdateManyAndReturnArgs>(args: SelectSubset<T, MultaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MultaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Multa.
     * @param {MultaUpsertArgs} args - Arguments to update or create a Multa.
     * @example
     * // Update or create a Multa
     * const multa = await prisma.multa.upsert({
     *   create: {
     *     // ... data to create a Multa
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Multa we want to update
     *   }
     * })
     */
    upsert<T extends MultaUpsertArgs>(args: SelectSubset<T, MultaUpsertArgs<ExtArgs>>): Prisma__MultaClient<$Result.GetResult<Prisma.$MultaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Multas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MultaCountArgs} args - Arguments to filter Multas to count.
     * @example
     * // Count the number of Multas
     * const count = await prisma.multa.count({
     *   where: {
     *     // ... the filter for the Multas we want to count
     *   }
     * })
    **/
    count<T extends MultaCountArgs>(
      args?: Subset<T, MultaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MultaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Multa.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MultaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MultaAggregateArgs>(args: Subset<T, MultaAggregateArgs>): Prisma.PrismaPromise<GetMultaAggregateType<T>>

    /**
     * Group by Multa.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MultaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MultaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MultaGroupByArgs['orderBy'] }
        : { orderBy?: MultaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MultaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMultaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Multa model
   */
  readonly fields: MultaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Multa.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MultaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tienda<T extends TiendaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TiendaDefaultArgs<ExtArgs>>): Prisma__TiendaClient<$Result.GetResult<Prisma.$TiendaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    usuario<T extends Multa$usuarioArgs<ExtArgs> = {}>(args?: Subset<T, Multa$usuarioArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Multa model
   */
  interface MultaFieldRefs {
    readonly multa_id: FieldRef<"Multa", 'String'>
    readonly tienda_id: FieldRef<"Multa", 'String'>
    readonly fecha_emision: FieldRef<"Multa", 'DateTime'>
    readonly motivo: FieldRef<"Multa", 'String'>
    readonly monto: FieldRef<"Multa", 'Decimal'>
    readonly estado: FieldRef<"Multa", 'EstadoMulta'>
    readonly usuario_id: FieldRef<"Multa", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Multa findUnique
   */
  export type MultaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Multa
     */
    select?: MultaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Multa
     */
    omit?: MultaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MultaInclude<ExtArgs> | null
    /**
     * Filter, which Multa to fetch.
     */
    where: MultaWhereUniqueInput
  }

  /**
   * Multa findUniqueOrThrow
   */
  export type MultaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Multa
     */
    select?: MultaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Multa
     */
    omit?: MultaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MultaInclude<ExtArgs> | null
    /**
     * Filter, which Multa to fetch.
     */
    where: MultaWhereUniqueInput
  }

  /**
   * Multa findFirst
   */
  export type MultaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Multa
     */
    select?: MultaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Multa
     */
    omit?: MultaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MultaInclude<ExtArgs> | null
    /**
     * Filter, which Multa to fetch.
     */
    where?: MultaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Multas to fetch.
     */
    orderBy?: MultaOrderByWithRelationInput | MultaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Multas.
     */
    cursor?: MultaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Multas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Multas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Multas.
     */
    distinct?: MultaScalarFieldEnum | MultaScalarFieldEnum[]
  }

  /**
   * Multa findFirstOrThrow
   */
  export type MultaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Multa
     */
    select?: MultaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Multa
     */
    omit?: MultaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MultaInclude<ExtArgs> | null
    /**
     * Filter, which Multa to fetch.
     */
    where?: MultaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Multas to fetch.
     */
    orderBy?: MultaOrderByWithRelationInput | MultaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Multas.
     */
    cursor?: MultaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Multas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Multas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Multas.
     */
    distinct?: MultaScalarFieldEnum | MultaScalarFieldEnum[]
  }

  /**
   * Multa findMany
   */
  export type MultaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Multa
     */
    select?: MultaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Multa
     */
    omit?: MultaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MultaInclude<ExtArgs> | null
    /**
     * Filter, which Multas to fetch.
     */
    where?: MultaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Multas to fetch.
     */
    orderBy?: MultaOrderByWithRelationInput | MultaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Multas.
     */
    cursor?: MultaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Multas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Multas.
     */
    skip?: number
    distinct?: MultaScalarFieldEnum | MultaScalarFieldEnum[]
  }

  /**
   * Multa create
   */
  export type MultaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Multa
     */
    select?: MultaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Multa
     */
    omit?: MultaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MultaInclude<ExtArgs> | null
    /**
     * The data needed to create a Multa.
     */
    data: XOR<MultaCreateInput, MultaUncheckedCreateInput>
  }

  /**
   * Multa createMany
   */
  export type MultaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Multas.
     */
    data: MultaCreateManyInput | MultaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Multa createManyAndReturn
   */
  export type MultaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Multa
     */
    select?: MultaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Multa
     */
    omit?: MultaOmit<ExtArgs> | null
    /**
     * The data used to create many Multas.
     */
    data: MultaCreateManyInput | MultaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MultaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Multa update
   */
  export type MultaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Multa
     */
    select?: MultaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Multa
     */
    omit?: MultaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MultaInclude<ExtArgs> | null
    /**
     * The data needed to update a Multa.
     */
    data: XOR<MultaUpdateInput, MultaUncheckedUpdateInput>
    /**
     * Choose, which Multa to update.
     */
    where: MultaWhereUniqueInput
  }

  /**
   * Multa updateMany
   */
  export type MultaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Multas.
     */
    data: XOR<MultaUpdateManyMutationInput, MultaUncheckedUpdateManyInput>
    /**
     * Filter which Multas to update
     */
    where?: MultaWhereInput
    /**
     * Limit how many Multas to update.
     */
    limit?: number
  }

  /**
   * Multa updateManyAndReturn
   */
  export type MultaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Multa
     */
    select?: MultaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Multa
     */
    omit?: MultaOmit<ExtArgs> | null
    /**
     * The data used to update Multas.
     */
    data: XOR<MultaUpdateManyMutationInput, MultaUncheckedUpdateManyInput>
    /**
     * Filter which Multas to update
     */
    where?: MultaWhereInput
    /**
     * Limit how many Multas to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MultaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Multa upsert
   */
  export type MultaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Multa
     */
    select?: MultaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Multa
     */
    omit?: MultaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MultaInclude<ExtArgs> | null
    /**
     * The filter to search for the Multa to update in case it exists.
     */
    where: MultaWhereUniqueInput
    /**
     * In case the Multa found by the `where` argument doesn't exist, create a new Multa with this data.
     */
    create: XOR<MultaCreateInput, MultaUncheckedCreateInput>
    /**
     * In case the Multa was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MultaUpdateInput, MultaUncheckedUpdateInput>
  }

  /**
   * Multa delete
   */
  export type MultaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Multa
     */
    select?: MultaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Multa
     */
    omit?: MultaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MultaInclude<ExtArgs> | null
    /**
     * Filter which Multa to delete.
     */
    where: MultaWhereUniqueInput
  }

  /**
   * Multa deleteMany
   */
  export type MultaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Multas to delete
     */
    where?: MultaWhereInput
    /**
     * Limit how many Multas to delete.
     */
    limit?: number
  }

  /**
   * Multa.usuario
   */
  export type Multa$usuarioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    where?: UsuarioWhereInput
  }

  /**
   * Multa without action
   */
  export type MultaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Multa
     */
    select?: MultaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Multa
     */
    omit?: MultaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MultaInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UsuarioScalarFieldEnum: {
    usuario_id: 'usuario_id',
    email: 'email',
    password_hash: 'password_hash',
    nombre: 'nombre',
    tipo_usuario: 'tipo_usuario'
  };

  export type UsuarioScalarFieldEnum = (typeof UsuarioScalarFieldEnum)[keyof typeof UsuarioScalarFieldEnum]


  export const TiendaScalarFieldEnum: {
    tienda_id: 'tienda_id',
    usuario_id: 'usuario_id',
    nombre: 'nombre',
    direccion: 'direccion',
    latitud: 'latitud',
    longitud: 'longitud',
    logo_url: 'logo_url'
  };

  export type TiendaScalarFieldEnum = (typeof TiendaScalarFieldEnum)[keyof typeof TiendaScalarFieldEnum]


  export const MultaScalarFieldEnum: {
    multa_id: 'multa_id',
    tienda_id: 'tienda_id',
    fecha_emision: 'fecha_emision',
    motivo: 'motivo',
    monto: 'monto',
    estado: 'estado',
    usuario_id: 'usuario_id'
  };

  export type MultaScalarFieldEnum = (typeof MultaScalarFieldEnum)[keyof typeof MultaScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'TipoUsuario'
   */
  export type EnumTipoUsuarioFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TipoUsuario'>
    


  /**
   * Reference to a field of type 'TipoUsuario[]'
   */
  export type ListEnumTipoUsuarioFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TipoUsuario[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'EstadoMulta'
   */
  export type EnumEstadoMultaFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EstadoMulta'>
    


  /**
   * Reference to a field of type 'EstadoMulta[]'
   */
  export type ListEnumEstadoMultaFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EstadoMulta[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type UsuarioWhereInput = {
    AND?: UsuarioWhereInput | UsuarioWhereInput[]
    OR?: UsuarioWhereInput[]
    NOT?: UsuarioWhereInput | UsuarioWhereInput[]
    usuario_id?: StringFilter<"Usuario"> | string
    email?: StringFilter<"Usuario"> | string
    password_hash?: StringFilter<"Usuario"> | string
    nombre?: StringFilter<"Usuario"> | string
    tipo_usuario?: EnumTipoUsuarioFilter<"Usuario"> | $Enums.TipoUsuario
    tienda?: XOR<TiendaNullableScalarRelationFilter, TiendaWhereInput> | null
    multas?: MultaListRelationFilter
  }

  export type UsuarioOrderByWithRelationInput = {
    usuario_id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    nombre?: SortOrder
    tipo_usuario?: SortOrder
    tienda?: TiendaOrderByWithRelationInput
    multas?: MultaOrderByRelationAggregateInput
  }

  export type UsuarioWhereUniqueInput = Prisma.AtLeast<{
    usuario_id?: string
    email?: string
    AND?: UsuarioWhereInput | UsuarioWhereInput[]
    OR?: UsuarioWhereInput[]
    NOT?: UsuarioWhereInput | UsuarioWhereInput[]
    password_hash?: StringFilter<"Usuario"> | string
    nombre?: StringFilter<"Usuario"> | string
    tipo_usuario?: EnumTipoUsuarioFilter<"Usuario"> | $Enums.TipoUsuario
    tienda?: XOR<TiendaNullableScalarRelationFilter, TiendaWhereInput> | null
    multas?: MultaListRelationFilter
  }, "usuario_id" | "email">

  export type UsuarioOrderByWithAggregationInput = {
    usuario_id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    nombre?: SortOrder
    tipo_usuario?: SortOrder
    _count?: UsuarioCountOrderByAggregateInput
    _max?: UsuarioMaxOrderByAggregateInput
    _min?: UsuarioMinOrderByAggregateInput
  }

  export type UsuarioScalarWhereWithAggregatesInput = {
    AND?: UsuarioScalarWhereWithAggregatesInput | UsuarioScalarWhereWithAggregatesInput[]
    OR?: UsuarioScalarWhereWithAggregatesInput[]
    NOT?: UsuarioScalarWhereWithAggregatesInput | UsuarioScalarWhereWithAggregatesInput[]
    usuario_id?: StringWithAggregatesFilter<"Usuario"> | string
    email?: StringWithAggregatesFilter<"Usuario"> | string
    password_hash?: StringWithAggregatesFilter<"Usuario"> | string
    nombre?: StringWithAggregatesFilter<"Usuario"> | string
    tipo_usuario?: EnumTipoUsuarioWithAggregatesFilter<"Usuario"> | $Enums.TipoUsuario
  }

  export type TiendaWhereInput = {
    AND?: TiendaWhereInput | TiendaWhereInput[]
    OR?: TiendaWhereInput[]
    NOT?: TiendaWhereInput | TiendaWhereInput[]
    tienda_id?: StringFilter<"Tienda"> | string
    usuario_id?: StringFilter<"Tienda"> | string
    nombre?: StringFilter<"Tienda"> | string
    direccion?: StringNullableFilter<"Tienda"> | string | null
    latitud?: DecimalNullableFilter<"Tienda"> | Decimal | DecimalJsLike | number | string | null
    longitud?: DecimalNullableFilter<"Tienda"> | Decimal | DecimalJsLike | number | string | null
    logo_url?: StringNullableFilter<"Tienda"> | string | null
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
    multas?: MultaListRelationFilter
  }

  export type TiendaOrderByWithRelationInput = {
    tienda_id?: SortOrder
    usuario_id?: SortOrder
    nombre?: SortOrder
    direccion?: SortOrderInput | SortOrder
    latitud?: SortOrderInput | SortOrder
    longitud?: SortOrderInput | SortOrder
    logo_url?: SortOrderInput | SortOrder
    usuario?: UsuarioOrderByWithRelationInput
    multas?: MultaOrderByRelationAggregateInput
  }

  export type TiendaWhereUniqueInput = Prisma.AtLeast<{
    tienda_id?: string
    usuario_id?: string
    AND?: TiendaWhereInput | TiendaWhereInput[]
    OR?: TiendaWhereInput[]
    NOT?: TiendaWhereInput | TiendaWhereInput[]
    nombre?: StringFilter<"Tienda"> | string
    direccion?: StringNullableFilter<"Tienda"> | string | null
    latitud?: DecimalNullableFilter<"Tienda"> | Decimal | DecimalJsLike | number | string | null
    longitud?: DecimalNullableFilter<"Tienda"> | Decimal | DecimalJsLike | number | string | null
    logo_url?: StringNullableFilter<"Tienda"> | string | null
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
    multas?: MultaListRelationFilter
  }, "tienda_id" | "usuario_id">

  export type TiendaOrderByWithAggregationInput = {
    tienda_id?: SortOrder
    usuario_id?: SortOrder
    nombre?: SortOrder
    direccion?: SortOrderInput | SortOrder
    latitud?: SortOrderInput | SortOrder
    longitud?: SortOrderInput | SortOrder
    logo_url?: SortOrderInput | SortOrder
    _count?: TiendaCountOrderByAggregateInput
    _avg?: TiendaAvgOrderByAggregateInput
    _max?: TiendaMaxOrderByAggregateInput
    _min?: TiendaMinOrderByAggregateInput
    _sum?: TiendaSumOrderByAggregateInput
  }

  export type TiendaScalarWhereWithAggregatesInput = {
    AND?: TiendaScalarWhereWithAggregatesInput | TiendaScalarWhereWithAggregatesInput[]
    OR?: TiendaScalarWhereWithAggregatesInput[]
    NOT?: TiendaScalarWhereWithAggregatesInput | TiendaScalarWhereWithAggregatesInput[]
    tienda_id?: StringWithAggregatesFilter<"Tienda"> | string
    usuario_id?: StringWithAggregatesFilter<"Tienda"> | string
    nombre?: StringWithAggregatesFilter<"Tienda"> | string
    direccion?: StringNullableWithAggregatesFilter<"Tienda"> | string | null
    latitud?: DecimalNullableWithAggregatesFilter<"Tienda"> | Decimal | DecimalJsLike | number | string | null
    longitud?: DecimalNullableWithAggregatesFilter<"Tienda"> | Decimal | DecimalJsLike | number | string | null
    logo_url?: StringNullableWithAggregatesFilter<"Tienda"> | string | null
  }

  export type MultaWhereInput = {
    AND?: MultaWhereInput | MultaWhereInput[]
    OR?: MultaWhereInput[]
    NOT?: MultaWhereInput | MultaWhereInput[]
    multa_id?: StringFilter<"Multa"> | string
    tienda_id?: StringFilter<"Multa"> | string
    fecha_emision?: DateTimeFilter<"Multa"> | Date | string
    motivo?: StringFilter<"Multa"> | string
    monto?: DecimalFilter<"Multa"> | Decimal | DecimalJsLike | number | string
    estado?: EnumEstadoMultaFilter<"Multa"> | $Enums.EstadoMulta
    usuario_id?: StringNullableFilter<"Multa"> | string | null
    tienda?: XOR<TiendaScalarRelationFilter, TiendaWhereInput>
    usuario?: XOR<UsuarioNullableScalarRelationFilter, UsuarioWhereInput> | null
  }

  export type MultaOrderByWithRelationInput = {
    multa_id?: SortOrder
    tienda_id?: SortOrder
    fecha_emision?: SortOrder
    motivo?: SortOrder
    monto?: SortOrder
    estado?: SortOrder
    usuario_id?: SortOrderInput | SortOrder
    tienda?: TiendaOrderByWithRelationInput
    usuario?: UsuarioOrderByWithRelationInput
  }

  export type MultaWhereUniqueInput = Prisma.AtLeast<{
    multa_id?: string
    AND?: MultaWhereInput | MultaWhereInput[]
    OR?: MultaWhereInput[]
    NOT?: MultaWhereInput | MultaWhereInput[]
    tienda_id?: StringFilter<"Multa"> | string
    fecha_emision?: DateTimeFilter<"Multa"> | Date | string
    motivo?: StringFilter<"Multa"> | string
    monto?: DecimalFilter<"Multa"> | Decimal | DecimalJsLike | number | string
    estado?: EnumEstadoMultaFilter<"Multa"> | $Enums.EstadoMulta
    usuario_id?: StringNullableFilter<"Multa"> | string | null
    tienda?: XOR<TiendaScalarRelationFilter, TiendaWhereInput>
    usuario?: XOR<UsuarioNullableScalarRelationFilter, UsuarioWhereInput> | null
  }, "multa_id">

  export type MultaOrderByWithAggregationInput = {
    multa_id?: SortOrder
    tienda_id?: SortOrder
    fecha_emision?: SortOrder
    motivo?: SortOrder
    monto?: SortOrder
    estado?: SortOrder
    usuario_id?: SortOrderInput | SortOrder
    _count?: MultaCountOrderByAggregateInput
    _avg?: MultaAvgOrderByAggregateInput
    _max?: MultaMaxOrderByAggregateInput
    _min?: MultaMinOrderByAggregateInput
    _sum?: MultaSumOrderByAggregateInput
  }

  export type MultaScalarWhereWithAggregatesInput = {
    AND?: MultaScalarWhereWithAggregatesInput | MultaScalarWhereWithAggregatesInput[]
    OR?: MultaScalarWhereWithAggregatesInput[]
    NOT?: MultaScalarWhereWithAggregatesInput | MultaScalarWhereWithAggregatesInput[]
    multa_id?: StringWithAggregatesFilter<"Multa"> | string
    tienda_id?: StringWithAggregatesFilter<"Multa"> | string
    fecha_emision?: DateTimeWithAggregatesFilter<"Multa"> | Date | string
    motivo?: StringWithAggregatesFilter<"Multa"> | string
    monto?: DecimalWithAggregatesFilter<"Multa"> | Decimal | DecimalJsLike | number | string
    estado?: EnumEstadoMultaWithAggregatesFilter<"Multa"> | $Enums.EstadoMulta
    usuario_id?: StringNullableWithAggregatesFilter<"Multa"> | string | null
  }

  export type UsuarioCreateInput = {
    usuario_id?: string
    email: string
    password_hash: string
    nombre: string
    tipo_usuario: $Enums.TipoUsuario
    tienda?: TiendaCreateNestedOneWithoutUsuarioInput
    multas?: MultaCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateInput = {
    usuario_id?: string
    email: string
    password_hash: string
    nombre: string
    tipo_usuario: $Enums.TipoUsuario
    tienda?: TiendaUncheckedCreateNestedOneWithoutUsuarioInput
    multas?: MultaUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUpdateInput = {
    usuario_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    tipo_usuario?: EnumTipoUsuarioFieldUpdateOperationsInput | $Enums.TipoUsuario
    tienda?: TiendaUpdateOneWithoutUsuarioNestedInput
    multas?: MultaUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateInput = {
    usuario_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    tipo_usuario?: EnumTipoUsuarioFieldUpdateOperationsInput | $Enums.TipoUsuario
    tienda?: TiendaUncheckedUpdateOneWithoutUsuarioNestedInput
    multas?: MultaUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioCreateManyInput = {
    usuario_id?: string
    email: string
    password_hash: string
    nombre: string
    tipo_usuario: $Enums.TipoUsuario
  }

  export type UsuarioUpdateManyMutationInput = {
    usuario_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    tipo_usuario?: EnumTipoUsuarioFieldUpdateOperationsInput | $Enums.TipoUsuario
  }

  export type UsuarioUncheckedUpdateManyInput = {
    usuario_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    tipo_usuario?: EnumTipoUsuarioFieldUpdateOperationsInput | $Enums.TipoUsuario
  }

  export type TiendaCreateInput = {
    tienda_id?: string
    nombre: string
    direccion?: string | null
    latitud?: Decimal | DecimalJsLike | number | string | null
    longitud?: Decimal | DecimalJsLike | number | string | null
    logo_url?: string | null
    usuario: UsuarioCreateNestedOneWithoutTiendaInput
    multas?: MultaCreateNestedManyWithoutTiendaInput
  }

  export type TiendaUncheckedCreateInput = {
    tienda_id?: string
    usuario_id: string
    nombre: string
    direccion?: string | null
    latitud?: Decimal | DecimalJsLike | number | string | null
    longitud?: Decimal | DecimalJsLike | number | string | null
    logo_url?: string | null
    multas?: MultaUncheckedCreateNestedManyWithoutTiendaInput
  }

  export type TiendaUpdateInput = {
    tienda_id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    latitud?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    longitud?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    usuario?: UsuarioUpdateOneRequiredWithoutTiendaNestedInput
    multas?: MultaUpdateManyWithoutTiendaNestedInput
  }

  export type TiendaUncheckedUpdateInput = {
    tienda_id?: StringFieldUpdateOperationsInput | string
    usuario_id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    latitud?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    longitud?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    multas?: MultaUncheckedUpdateManyWithoutTiendaNestedInput
  }

  export type TiendaCreateManyInput = {
    tienda_id?: string
    usuario_id: string
    nombre: string
    direccion?: string | null
    latitud?: Decimal | DecimalJsLike | number | string | null
    longitud?: Decimal | DecimalJsLike | number | string | null
    logo_url?: string | null
  }

  export type TiendaUpdateManyMutationInput = {
    tienda_id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    latitud?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    longitud?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    logo_url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TiendaUncheckedUpdateManyInput = {
    tienda_id?: StringFieldUpdateOperationsInput | string
    usuario_id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    latitud?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    longitud?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    logo_url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MultaCreateInput = {
    multa_id?: string
    fecha_emision?: Date | string
    motivo: string
    monto: Decimal | DecimalJsLike | number | string
    estado?: $Enums.EstadoMulta
    tienda: TiendaCreateNestedOneWithoutMultasInput
    usuario?: UsuarioCreateNestedOneWithoutMultasInput
  }

  export type MultaUncheckedCreateInput = {
    multa_id?: string
    tienda_id: string
    fecha_emision?: Date | string
    motivo: string
    monto: Decimal | DecimalJsLike | number | string
    estado?: $Enums.EstadoMulta
    usuario_id?: string | null
  }

  export type MultaUpdateInput = {
    multa_id?: StringFieldUpdateOperationsInput | string
    fecha_emision?: DateTimeFieldUpdateOperationsInput | Date | string
    motivo?: StringFieldUpdateOperationsInput | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    estado?: EnumEstadoMultaFieldUpdateOperationsInput | $Enums.EstadoMulta
    tienda?: TiendaUpdateOneRequiredWithoutMultasNestedInput
    usuario?: UsuarioUpdateOneWithoutMultasNestedInput
  }

  export type MultaUncheckedUpdateInput = {
    multa_id?: StringFieldUpdateOperationsInput | string
    tienda_id?: StringFieldUpdateOperationsInput | string
    fecha_emision?: DateTimeFieldUpdateOperationsInput | Date | string
    motivo?: StringFieldUpdateOperationsInput | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    estado?: EnumEstadoMultaFieldUpdateOperationsInput | $Enums.EstadoMulta
    usuario_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MultaCreateManyInput = {
    multa_id?: string
    tienda_id: string
    fecha_emision?: Date | string
    motivo: string
    monto: Decimal | DecimalJsLike | number | string
    estado?: $Enums.EstadoMulta
    usuario_id?: string | null
  }

  export type MultaUpdateManyMutationInput = {
    multa_id?: StringFieldUpdateOperationsInput | string
    fecha_emision?: DateTimeFieldUpdateOperationsInput | Date | string
    motivo?: StringFieldUpdateOperationsInput | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    estado?: EnumEstadoMultaFieldUpdateOperationsInput | $Enums.EstadoMulta
  }

  export type MultaUncheckedUpdateManyInput = {
    multa_id?: StringFieldUpdateOperationsInput | string
    tienda_id?: StringFieldUpdateOperationsInput | string
    fecha_emision?: DateTimeFieldUpdateOperationsInput | Date | string
    motivo?: StringFieldUpdateOperationsInput | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    estado?: EnumEstadoMultaFieldUpdateOperationsInput | $Enums.EstadoMulta
    usuario_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumTipoUsuarioFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoUsuario | EnumTipoUsuarioFieldRefInput<$PrismaModel>
    in?: $Enums.TipoUsuario[] | ListEnumTipoUsuarioFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoUsuario[] | ListEnumTipoUsuarioFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoUsuarioFilter<$PrismaModel> | $Enums.TipoUsuario
  }

  export type TiendaNullableScalarRelationFilter = {
    is?: TiendaWhereInput | null
    isNot?: TiendaWhereInput | null
  }

  export type MultaListRelationFilter = {
    every?: MultaWhereInput
    some?: MultaWhereInput
    none?: MultaWhereInput
  }

  export type MultaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UsuarioCountOrderByAggregateInput = {
    usuario_id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    nombre?: SortOrder
    tipo_usuario?: SortOrder
  }

  export type UsuarioMaxOrderByAggregateInput = {
    usuario_id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    nombre?: SortOrder
    tipo_usuario?: SortOrder
  }

  export type UsuarioMinOrderByAggregateInput = {
    usuario_id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    nombre?: SortOrder
    tipo_usuario?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumTipoUsuarioWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoUsuario | EnumTipoUsuarioFieldRefInput<$PrismaModel>
    in?: $Enums.TipoUsuario[] | ListEnumTipoUsuarioFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoUsuario[] | ListEnumTipoUsuarioFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoUsuarioWithAggregatesFilter<$PrismaModel> | $Enums.TipoUsuario
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTipoUsuarioFilter<$PrismaModel>
    _max?: NestedEnumTipoUsuarioFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type UsuarioScalarRelationFilter = {
    is?: UsuarioWhereInput
    isNot?: UsuarioWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type TiendaCountOrderByAggregateInput = {
    tienda_id?: SortOrder
    usuario_id?: SortOrder
    nombre?: SortOrder
    direccion?: SortOrder
    latitud?: SortOrder
    longitud?: SortOrder
    logo_url?: SortOrder
  }

  export type TiendaAvgOrderByAggregateInput = {
    latitud?: SortOrder
    longitud?: SortOrder
  }

  export type TiendaMaxOrderByAggregateInput = {
    tienda_id?: SortOrder
    usuario_id?: SortOrder
    nombre?: SortOrder
    direccion?: SortOrder
    latitud?: SortOrder
    longitud?: SortOrder
    logo_url?: SortOrder
  }

  export type TiendaMinOrderByAggregateInput = {
    tienda_id?: SortOrder
    usuario_id?: SortOrder
    nombre?: SortOrder
    direccion?: SortOrder
    latitud?: SortOrder
    longitud?: SortOrder
    logo_url?: SortOrder
  }

  export type TiendaSumOrderByAggregateInput = {
    latitud?: SortOrder
    longitud?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type EnumEstadoMultaFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoMulta | EnumEstadoMultaFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoMulta[] | ListEnumEstadoMultaFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoMulta[] | ListEnumEstadoMultaFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoMultaFilter<$PrismaModel> | $Enums.EstadoMulta
  }

  export type TiendaScalarRelationFilter = {
    is?: TiendaWhereInput
    isNot?: TiendaWhereInput
  }

  export type UsuarioNullableScalarRelationFilter = {
    is?: UsuarioWhereInput | null
    isNot?: UsuarioWhereInput | null
  }

  export type MultaCountOrderByAggregateInput = {
    multa_id?: SortOrder
    tienda_id?: SortOrder
    fecha_emision?: SortOrder
    motivo?: SortOrder
    monto?: SortOrder
    estado?: SortOrder
    usuario_id?: SortOrder
  }

  export type MultaAvgOrderByAggregateInput = {
    monto?: SortOrder
  }

  export type MultaMaxOrderByAggregateInput = {
    multa_id?: SortOrder
    tienda_id?: SortOrder
    fecha_emision?: SortOrder
    motivo?: SortOrder
    monto?: SortOrder
    estado?: SortOrder
    usuario_id?: SortOrder
  }

  export type MultaMinOrderByAggregateInput = {
    multa_id?: SortOrder
    tienda_id?: SortOrder
    fecha_emision?: SortOrder
    motivo?: SortOrder
    monto?: SortOrder
    estado?: SortOrder
    usuario_id?: SortOrder
  }

  export type MultaSumOrderByAggregateInput = {
    monto?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type EnumEstadoMultaWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoMulta | EnumEstadoMultaFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoMulta[] | ListEnumEstadoMultaFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoMulta[] | ListEnumEstadoMultaFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoMultaWithAggregatesFilter<$PrismaModel> | $Enums.EstadoMulta
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEstadoMultaFilter<$PrismaModel>
    _max?: NestedEnumEstadoMultaFilter<$PrismaModel>
  }

  export type TiendaCreateNestedOneWithoutUsuarioInput = {
    create?: XOR<TiendaCreateWithoutUsuarioInput, TiendaUncheckedCreateWithoutUsuarioInput>
    connectOrCreate?: TiendaCreateOrConnectWithoutUsuarioInput
    connect?: TiendaWhereUniqueInput
  }

  export type MultaCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<MultaCreateWithoutUsuarioInput, MultaUncheckedCreateWithoutUsuarioInput> | MultaCreateWithoutUsuarioInput[] | MultaUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: MultaCreateOrConnectWithoutUsuarioInput | MultaCreateOrConnectWithoutUsuarioInput[]
    createMany?: MultaCreateManyUsuarioInputEnvelope
    connect?: MultaWhereUniqueInput | MultaWhereUniqueInput[]
  }

  export type TiendaUncheckedCreateNestedOneWithoutUsuarioInput = {
    create?: XOR<TiendaCreateWithoutUsuarioInput, TiendaUncheckedCreateWithoutUsuarioInput>
    connectOrCreate?: TiendaCreateOrConnectWithoutUsuarioInput
    connect?: TiendaWhereUniqueInput
  }

  export type MultaUncheckedCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<MultaCreateWithoutUsuarioInput, MultaUncheckedCreateWithoutUsuarioInput> | MultaCreateWithoutUsuarioInput[] | MultaUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: MultaCreateOrConnectWithoutUsuarioInput | MultaCreateOrConnectWithoutUsuarioInput[]
    createMany?: MultaCreateManyUsuarioInputEnvelope
    connect?: MultaWhereUniqueInput | MultaWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumTipoUsuarioFieldUpdateOperationsInput = {
    set?: $Enums.TipoUsuario
  }

  export type TiendaUpdateOneWithoutUsuarioNestedInput = {
    create?: XOR<TiendaCreateWithoutUsuarioInput, TiendaUncheckedCreateWithoutUsuarioInput>
    connectOrCreate?: TiendaCreateOrConnectWithoutUsuarioInput
    upsert?: TiendaUpsertWithoutUsuarioInput
    disconnect?: TiendaWhereInput | boolean
    delete?: TiendaWhereInput | boolean
    connect?: TiendaWhereUniqueInput
    update?: XOR<XOR<TiendaUpdateToOneWithWhereWithoutUsuarioInput, TiendaUpdateWithoutUsuarioInput>, TiendaUncheckedUpdateWithoutUsuarioInput>
  }

  export type MultaUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<MultaCreateWithoutUsuarioInput, MultaUncheckedCreateWithoutUsuarioInput> | MultaCreateWithoutUsuarioInput[] | MultaUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: MultaCreateOrConnectWithoutUsuarioInput | MultaCreateOrConnectWithoutUsuarioInput[]
    upsert?: MultaUpsertWithWhereUniqueWithoutUsuarioInput | MultaUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: MultaCreateManyUsuarioInputEnvelope
    set?: MultaWhereUniqueInput | MultaWhereUniqueInput[]
    disconnect?: MultaWhereUniqueInput | MultaWhereUniqueInput[]
    delete?: MultaWhereUniqueInput | MultaWhereUniqueInput[]
    connect?: MultaWhereUniqueInput | MultaWhereUniqueInput[]
    update?: MultaUpdateWithWhereUniqueWithoutUsuarioInput | MultaUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: MultaUpdateManyWithWhereWithoutUsuarioInput | MultaUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: MultaScalarWhereInput | MultaScalarWhereInput[]
  }

  export type TiendaUncheckedUpdateOneWithoutUsuarioNestedInput = {
    create?: XOR<TiendaCreateWithoutUsuarioInput, TiendaUncheckedCreateWithoutUsuarioInput>
    connectOrCreate?: TiendaCreateOrConnectWithoutUsuarioInput
    upsert?: TiendaUpsertWithoutUsuarioInput
    disconnect?: TiendaWhereInput | boolean
    delete?: TiendaWhereInput | boolean
    connect?: TiendaWhereUniqueInput
    update?: XOR<XOR<TiendaUpdateToOneWithWhereWithoutUsuarioInput, TiendaUpdateWithoutUsuarioInput>, TiendaUncheckedUpdateWithoutUsuarioInput>
  }

  export type MultaUncheckedUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<MultaCreateWithoutUsuarioInput, MultaUncheckedCreateWithoutUsuarioInput> | MultaCreateWithoutUsuarioInput[] | MultaUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: MultaCreateOrConnectWithoutUsuarioInput | MultaCreateOrConnectWithoutUsuarioInput[]
    upsert?: MultaUpsertWithWhereUniqueWithoutUsuarioInput | MultaUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: MultaCreateManyUsuarioInputEnvelope
    set?: MultaWhereUniqueInput | MultaWhereUniqueInput[]
    disconnect?: MultaWhereUniqueInput | MultaWhereUniqueInput[]
    delete?: MultaWhereUniqueInput | MultaWhereUniqueInput[]
    connect?: MultaWhereUniqueInput | MultaWhereUniqueInput[]
    update?: MultaUpdateWithWhereUniqueWithoutUsuarioInput | MultaUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: MultaUpdateManyWithWhereWithoutUsuarioInput | MultaUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: MultaScalarWhereInput | MultaScalarWhereInput[]
  }

  export type UsuarioCreateNestedOneWithoutTiendaInput = {
    create?: XOR<UsuarioCreateWithoutTiendaInput, UsuarioUncheckedCreateWithoutTiendaInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutTiendaInput
    connect?: UsuarioWhereUniqueInput
  }

  export type MultaCreateNestedManyWithoutTiendaInput = {
    create?: XOR<MultaCreateWithoutTiendaInput, MultaUncheckedCreateWithoutTiendaInput> | MultaCreateWithoutTiendaInput[] | MultaUncheckedCreateWithoutTiendaInput[]
    connectOrCreate?: MultaCreateOrConnectWithoutTiendaInput | MultaCreateOrConnectWithoutTiendaInput[]
    createMany?: MultaCreateManyTiendaInputEnvelope
    connect?: MultaWhereUniqueInput | MultaWhereUniqueInput[]
  }

  export type MultaUncheckedCreateNestedManyWithoutTiendaInput = {
    create?: XOR<MultaCreateWithoutTiendaInput, MultaUncheckedCreateWithoutTiendaInput> | MultaCreateWithoutTiendaInput[] | MultaUncheckedCreateWithoutTiendaInput[]
    connectOrCreate?: MultaCreateOrConnectWithoutTiendaInput | MultaCreateOrConnectWithoutTiendaInput[]
    createMany?: MultaCreateManyTiendaInputEnvelope
    connect?: MultaWhereUniqueInput | MultaWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type UsuarioUpdateOneRequiredWithoutTiendaNestedInput = {
    create?: XOR<UsuarioCreateWithoutTiendaInput, UsuarioUncheckedCreateWithoutTiendaInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutTiendaInput
    upsert?: UsuarioUpsertWithoutTiendaInput
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutTiendaInput, UsuarioUpdateWithoutTiendaInput>, UsuarioUncheckedUpdateWithoutTiendaInput>
  }

  export type MultaUpdateManyWithoutTiendaNestedInput = {
    create?: XOR<MultaCreateWithoutTiendaInput, MultaUncheckedCreateWithoutTiendaInput> | MultaCreateWithoutTiendaInput[] | MultaUncheckedCreateWithoutTiendaInput[]
    connectOrCreate?: MultaCreateOrConnectWithoutTiendaInput | MultaCreateOrConnectWithoutTiendaInput[]
    upsert?: MultaUpsertWithWhereUniqueWithoutTiendaInput | MultaUpsertWithWhereUniqueWithoutTiendaInput[]
    createMany?: MultaCreateManyTiendaInputEnvelope
    set?: MultaWhereUniqueInput | MultaWhereUniqueInput[]
    disconnect?: MultaWhereUniqueInput | MultaWhereUniqueInput[]
    delete?: MultaWhereUniqueInput | MultaWhereUniqueInput[]
    connect?: MultaWhereUniqueInput | MultaWhereUniqueInput[]
    update?: MultaUpdateWithWhereUniqueWithoutTiendaInput | MultaUpdateWithWhereUniqueWithoutTiendaInput[]
    updateMany?: MultaUpdateManyWithWhereWithoutTiendaInput | MultaUpdateManyWithWhereWithoutTiendaInput[]
    deleteMany?: MultaScalarWhereInput | MultaScalarWhereInput[]
  }

  export type MultaUncheckedUpdateManyWithoutTiendaNestedInput = {
    create?: XOR<MultaCreateWithoutTiendaInput, MultaUncheckedCreateWithoutTiendaInput> | MultaCreateWithoutTiendaInput[] | MultaUncheckedCreateWithoutTiendaInput[]
    connectOrCreate?: MultaCreateOrConnectWithoutTiendaInput | MultaCreateOrConnectWithoutTiendaInput[]
    upsert?: MultaUpsertWithWhereUniqueWithoutTiendaInput | MultaUpsertWithWhereUniqueWithoutTiendaInput[]
    createMany?: MultaCreateManyTiendaInputEnvelope
    set?: MultaWhereUniqueInput | MultaWhereUniqueInput[]
    disconnect?: MultaWhereUniqueInput | MultaWhereUniqueInput[]
    delete?: MultaWhereUniqueInput | MultaWhereUniqueInput[]
    connect?: MultaWhereUniqueInput | MultaWhereUniqueInput[]
    update?: MultaUpdateWithWhereUniqueWithoutTiendaInput | MultaUpdateWithWhereUniqueWithoutTiendaInput[]
    updateMany?: MultaUpdateManyWithWhereWithoutTiendaInput | MultaUpdateManyWithWhereWithoutTiendaInput[]
    deleteMany?: MultaScalarWhereInput | MultaScalarWhereInput[]
  }

  export type TiendaCreateNestedOneWithoutMultasInput = {
    create?: XOR<TiendaCreateWithoutMultasInput, TiendaUncheckedCreateWithoutMultasInput>
    connectOrCreate?: TiendaCreateOrConnectWithoutMultasInput
    connect?: TiendaWhereUniqueInput
  }

  export type UsuarioCreateNestedOneWithoutMultasInput = {
    create?: XOR<UsuarioCreateWithoutMultasInput, UsuarioUncheckedCreateWithoutMultasInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutMultasInput
    connect?: UsuarioWhereUniqueInput
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type EnumEstadoMultaFieldUpdateOperationsInput = {
    set?: $Enums.EstadoMulta
  }

  export type TiendaUpdateOneRequiredWithoutMultasNestedInput = {
    create?: XOR<TiendaCreateWithoutMultasInput, TiendaUncheckedCreateWithoutMultasInput>
    connectOrCreate?: TiendaCreateOrConnectWithoutMultasInput
    upsert?: TiendaUpsertWithoutMultasInput
    connect?: TiendaWhereUniqueInput
    update?: XOR<XOR<TiendaUpdateToOneWithWhereWithoutMultasInput, TiendaUpdateWithoutMultasInput>, TiendaUncheckedUpdateWithoutMultasInput>
  }

  export type UsuarioUpdateOneWithoutMultasNestedInput = {
    create?: XOR<UsuarioCreateWithoutMultasInput, UsuarioUncheckedCreateWithoutMultasInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutMultasInput
    upsert?: UsuarioUpsertWithoutMultasInput
    disconnect?: UsuarioWhereInput | boolean
    delete?: UsuarioWhereInput | boolean
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutMultasInput, UsuarioUpdateWithoutMultasInput>, UsuarioUncheckedUpdateWithoutMultasInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumTipoUsuarioFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoUsuario | EnumTipoUsuarioFieldRefInput<$PrismaModel>
    in?: $Enums.TipoUsuario[] | ListEnumTipoUsuarioFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoUsuario[] | ListEnumTipoUsuarioFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoUsuarioFilter<$PrismaModel> | $Enums.TipoUsuario
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumTipoUsuarioWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoUsuario | EnumTipoUsuarioFieldRefInput<$PrismaModel>
    in?: $Enums.TipoUsuario[] | ListEnumTipoUsuarioFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoUsuario[] | ListEnumTipoUsuarioFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoUsuarioWithAggregatesFilter<$PrismaModel> | $Enums.TipoUsuario
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTipoUsuarioFilter<$PrismaModel>
    _max?: NestedEnumTipoUsuarioFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedEnumEstadoMultaFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoMulta | EnumEstadoMultaFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoMulta[] | ListEnumEstadoMultaFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoMulta[] | ListEnumEstadoMultaFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoMultaFilter<$PrismaModel> | $Enums.EstadoMulta
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedEnumEstadoMultaWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoMulta | EnumEstadoMultaFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoMulta[] | ListEnumEstadoMultaFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoMulta[] | ListEnumEstadoMultaFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoMultaWithAggregatesFilter<$PrismaModel> | $Enums.EstadoMulta
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEstadoMultaFilter<$PrismaModel>
    _max?: NestedEnumEstadoMultaFilter<$PrismaModel>
  }

  export type TiendaCreateWithoutUsuarioInput = {
    tienda_id?: string
    nombre: string
    direccion?: string | null
    latitud?: Decimal | DecimalJsLike | number | string | null
    longitud?: Decimal | DecimalJsLike | number | string | null
    logo_url?: string | null
    multas?: MultaCreateNestedManyWithoutTiendaInput
  }

  export type TiendaUncheckedCreateWithoutUsuarioInput = {
    tienda_id?: string
    nombre: string
    direccion?: string | null
    latitud?: Decimal | DecimalJsLike | number | string | null
    longitud?: Decimal | DecimalJsLike | number | string | null
    logo_url?: string | null
    multas?: MultaUncheckedCreateNestedManyWithoutTiendaInput
  }

  export type TiendaCreateOrConnectWithoutUsuarioInput = {
    where: TiendaWhereUniqueInput
    create: XOR<TiendaCreateWithoutUsuarioInput, TiendaUncheckedCreateWithoutUsuarioInput>
  }

  export type MultaCreateWithoutUsuarioInput = {
    multa_id?: string
    fecha_emision?: Date | string
    motivo: string
    monto: Decimal | DecimalJsLike | number | string
    estado?: $Enums.EstadoMulta
    tienda: TiendaCreateNestedOneWithoutMultasInput
  }

  export type MultaUncheckedCreateWithoutUsuarioInput = {
    multa_id?: string
    tienda_id: string
    fecha_emision?: Date | string
    motivo: string
    monto: Decimal | DecimalJsLike | number | string
    estado?: $Enums.EstadoMulta
  }

  export type MultaCreateOrConnectWithoutUsuarioInput = {
    where: MultaWhereUniqueInput
    create: XOR<MultaCreateWithoutUsuarioInput, MultaUncheckedCreateWithoutUsuarioInput>
  }

  export type MultaCreateManyUsuarioInputEnvelope = {
    data: MultaCreateManyUsuarioInput | MultaCreateManyUsuarioInput[]
    skipDuplicates?: boolean
  }

  export type TiendaUpsertWithoutUsuarioInput = {
    update: XOR<TiendaUpdateWithoutUsuarioInput, TiendaUncheckedUpdateWithoutUsuarioInput>
    create: XOR<TiendaCreateWithoutUsuarioInput, TiendaUncheckedCreateWithoutUsuarioInput>
    where?: TiendaWhereInput
  }

  export type TiendaUpdateToOneWithWhereWithoutUsuarioInput = {
    where?: TiendaWhereInput
    data: XOR<TiendaUpdateWithoutUsuarioInput, TiendaUncheckedUpdateWithoutUsuarioInput>
  }

  export type TiendaUpdateWithoutUsuarioInput = {
    tienda_id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    latitud?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    longitud?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    multas?: MultaUpdateManyWithoutTiendaNestedInput
  }

  export type TiendaUncheckedUpdateWithoutUsuarioInput = {
    tienda_id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    latitud?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    longitud?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    multas?: MultaUncheckedUpdateManyWithoutTiendaNestedInput
  }

  export type MultaUpsertWithWhereUniqueWithoutUsuarioInput = {
    where: MultaWhereUniqueInput
    update: XOR<MultaUpdateWithoutUsuarioInput, MultaUncheckedUpdateWithoutUsuarioInput>
    create: XOR<MultaCreateWithoutUsuarioInput, MultaUncheckedCreateWithoutUsuarioInput>
  }

  export type MultaUpdateWithWhereUniqueWithoutUsuarioInput = {
    where: MultaWhereUniqueInput
    data: XOR<MultaUpdateWithoutUsuarioInput, MultaUncheckedUpdateWithoutUsuarioInput>
  }

  export type MultaUpdateManyWithWhereWithoutUsuarioInput = {
    where: MultaScalarWhereInput
    data: XOR<MultaUpdateManyMutationInput, MultaUncheckedUpdateManyWithoutUsuarioInput>
  }

  export type MultaScalarWhereInput = {
    AND?: MultaScalarWhereInput | MultaScalarWhereInput[]
    OR?: MultaScalarWhereInput[]
    NOT?: MultaScalarWhereInput | MultaScalarWhereInput[]
    multa_id?: StringFilter<"Multa"> | string
    tienda_id?: StringFilter<"Multa"> | string
    fecha_emision?: DateTimeFilter<"Multa"> | Date | string
    motivo?: StringFilter<"Multa"> | string
    monto?: DecimalFilter<"Multa"> | Decimal | DecimalJsLike | number | string
    estado?: EnumEstadoMultaFilter<"Multa"> | $Enums.EstadoMulta
    usuario_id?: StringNullableFilter<"Multa"> | string | null
  }

  export type UsuarioCreateWithoutTiendaInput = {
    usuario_id?: string
    email: string
    password_hash: string
    nombre: string
    tipo_usuario: $Enums.TipoUsuario
    multas?: MultaCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateWithoutTiendaInput = {
    usuario_id?: string
    email: string
    password_hash: string
    nombre: string
    tipo_usuario: $Enums.TipoUsuario
    multas?: MultaUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioCreateOrConnectWithoutTiendaInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutTiendaInput, UsuarioUncheckedCreateWithoutTiendaInput>
  }

  export type MultaCreateWithoutTiendaInput = {
    multa_id?: string
    fecha_emision?: Date | string
    motivo: string
    monto: Decimal | DecimalJsLike | number | string
    estado?: $Enums.EstadoMulta
    usuario?: UsuarioCreateNestedOneWithoutMultasInput
  }

  export type MultaUncheckedCreateWithoutTiendaInput = {
    multa_id?: string
    fecha_emision?: Date | string
    motivo: string
    monto: Decimal | DecimalJsLike | number | string
    estado?: $Enums.EstadoMulta
    usuario_id?: string | null
  }

  export type MultaCreateOrConnectWithoutTiendaInput = {
    where: MultaWhereUniqueInput
    create: XOR<MultaCreateWithoutTiendaInput, MultaUncheckedCreateWithoutTiendaInput>
  }

  export type MultaCreateManyTiendaInputEnvelope = {
    data: MultaCreateManyTiendaInput | MultaCreateManyTiendaInput[]
    skipDuplicates?: boolean
  }

  export type UsuarioUpsertWithoutTiendaInput = {
    update: XOR<UsuarioUpdateWithoutTiendaInput, UsuarioUncheckedUpdateWithoutTiendaInput>
    create: XOR<UsuarioCreateWithoutTiendaInput, UsuarioUncheckedCreateWithoutTiendaInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutTiendaInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutTiendaInput, UsuarioUncheckedUpdateWithoutTiendaInput>
  }

  export type UsuarioUpdateWithoutTiendaInput = {
    usuario_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    tipo_usuario?: EnumTipoUsuarioFieldUpdateOperationsInput | $Enums.TipoUsuario
    multas?: MultaUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutTiendaInput = {
    usuario_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    tipo_usuario?: EnumTipoUsuarioFieldUpdateOperationsInput | $Enums.TipoUsuario
    multas?: MultaUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type MultaUpsertWithWhereUniqueWithoutTiendaInput = {
    where: MultaWhereUniqueInput
    update: XOR<MultaUpdateWithoutTiendaInput, MultaUncheckedUpdateWithoutTiendaInput>
    create: XOR<MultaCreateWithoutTiendaInput, MultaUncheckedCreateWithoutTiendaInput>
  }

  export type MultaUpdateWithWhereUniqueWithoutTiendaInput = {
    where: MultaWhereUniqueInput
    data: XOR<MultaUpdateWithoutTiendaInput, MultaUncheckedUpdateWithoutTiendaInput>
  }

  export type MultaUpdateManyWithWhereWithoutTiendaInput = {
    where: MultaScalarWhereInput
    data: XOR<MultaUpdateManyMutationInput, MultaUncheckedUpdateManyWithoutTiendaInput>
  }

  export type TiendaCreateWithoutMultasInput = {
    tienda_id?: string
    nombre: string
    direccion?: string | null
    latitud?: Decimal | DecimalJsLike | number | string | null
    longitud?: Decimal | DecimalJsLike | number | string | null
    logo_url?: string | null
    usuario: UsuarioCreateNestedOneWithoutTiendaInput
  }

  export type TiendaUncheckedCreateWithoutMultasInput = {
    tienda_id?: string
    usuario_id: string
    nombre: string
    direccion?: string | null
    latitud?: Decimal | DecimalJsLike | number | string | null
    longitud?: Decimal | DecimalJsLike | number | string | null
    logo_url?: string | null
  }

  export type TiendaCreateOrConnectWithoutMultasInput = {
    where: TiendaWhereUniqueInput
    create: XOR<TiendaCreateWithoutMultasInput, TiendaUncheckedCreateWithoutMultasInput>
  }

  export type UsuarioCreateWithoutMultasInput = {
    usuario_id?: string
    email: string
    password_hash: string
    nombre: string
    tipo_usuario: $Enums.TipoUsuario
    tienda?: TiendaCreateNestedOneWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateWithoutMultasInput = {
    usuario_id?: string
    email: string
    password_hash: string
    nombre: string
    tipo_usuario: $Enums.TipoUsuario
    tienda?: TiendaUncheckedCreateNestedOneWithoutUsuarioInput
  }

  export type UsuarioCreateOrConnectWithoutMultasInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutMultasInput, UsuarioUncheckedCreateWithoutMultasInput>
  }

  export type TiendaUpsertWithoutMultasInput = {
    update: XOR<TiendaUpdateWithoutMultasInput, TiendaUncheckedUpdateWithoutMultasInput>
    create: XOR<TiendaCreateWithoutMultasInput, TiendaUncheckedCreateWithoutMultasInput>
    where?: TiendaWhereInput
  }

  export type TiendaUpdateToOneWithWhereWithoutMultasInput = {
    where?: TiendaWhereInput
    data: XOR<TiendaUpdateWithoutMultasInput, TiendaUncheckedUpdateWithoutMultasInput>
  }

  export type TiendaUpdateWithoutMultasInput = {
    tienda_id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    latitud?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    longitud?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    usuario?: UsuarioUpdateOneRequiredWithoutTiendaNestedInput
  }

  export type TiendaUncheckedUpdateWithoutMultasInput = {
    tienda_id?: StringFieldUpdateOperationsInput | string
    usuario_id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    latitud?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    longitud?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    logo_url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UsuarioUpsertWithoutMultasInput = {
    update: XOR<UsuarioUpdateWithoutMultasInput, UsuarioUncheckedUpdateWithoutMultasInput>
    create: XOR<UsuarioCreateWithoutMultasInput, UsuarioUncheckedCreateWithoutMultasInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutMultasInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutMultasInput, UsuarioUncheckedUpdateWithoutMultasInput>
  }

  export type UsuarioUpdateWithoutMultasInput = {
    usuario_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    tipo_usuario?: EnumTipoUsuarioFieldUpdateOperationsInput | $Enums.TipoUsuario
    tienda?: TiendaUpdateOneWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutMultasInput = {
    usuario_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    tipo_usuario?: EnumTipoUsuarioFieldUpdateOperationsInput | $Enums.TipoUsuario
    tienda?: TiendaUncheckedUpdateOneWithoutUsuarioNestedInput
  }

  export type MultaCreateManyUsuarioInput = {
    multa_id?: string
    tienda_id: string
    fecha_emision?: Date | string
    motivo: string
    monto: Decimal | DecimalJsLike | number | string
    estado?: $Enums.EstadoMulta
  }

  export type MultaUpdateWithoutUsuarioInput = {
    multa_id?: StringFieldUpdateOperationsInput | string
    fecha_emision?: DateTimeFieldUpdateOperationsInput | Date | string
    motivo?: StringFieldUpdateOperationsInput | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    estado?: EnumEstadoMultaFieldUpdateOperationsInput | $Enums.EstadoMulta
    tienda?: TiendaUpdateOneRequiredWithoutMultasNestedInput
  }

  export type MultaUncheckedUpdateWithoutUsuarioInput = {
    multa_id?: StringFieldUpdateOperationsInput | string
    tienda_id?: StringFieldUpdateOperationsInput | string
    fecha_emision?: DateTimeFieldUpdateOperationsInput | Date | string
    motivo?: StringFieldUpdateOperationsInput | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    estado?: EnumEstadoMultaFieldUpdateOperationsInput | $Enums.EstadoMulta
  }

  export type MultaUncheckedUpdateManyWithoutUsuarioInput = {
    multa_id?: StringFieldUpdateOperationsInput | string
    tienda_id?: StringFieldUpdateOperationsInput | string
    fecha_emision?: DateTimeFieldUpdateOperationsInput | Date | string
    motivo?: StringFieldUpdateOperationsInput | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    estado?: EnumEstadoMultaFieldUpdateOperationsInput | $Enums.EstadoMulta
  }

  export type MultaCreateManyTiendaInput = {
    multa_id?: string
    fecha_emision?: Date | string
    motivo: string
    monto: Decimal | DecimalJsLike | number | string
    estado?: $Enums.EstadoMulta
    usuario_id?: string | null
  }

  export type MultaUpdateWithoutTiendaInput = {
    multa_id?: StringFieldUpdateOperationsInput | string
    fecha_emision?: DateTimeFieldUpdateOperationsInput | Date | string
    motivo?: StringFieldUpdateOperationsInput | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    estado?: EnumEstadoMultaFieldUpdateOperationsInput | $Enums.EstadoMulta
    usuario?: UsuarioUpdateOneWithoutMultasNestedInput
  }

  export type MultaUncheckedUpdateWithoutTiendaInput = {
    multa_id?: StringFieldUpdateOperationsInput | string
    fecha_emision?: DateTimeFieldUpdateOperationsInput | Date | string
    motivo?: StringFieldUpdateOperationsInput | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    estado?: EnumEstadoMultaFieldUpdateOperationsInput | $Enums.EstadoMulta
    usuario_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MultaUncheckedUpdateManyWithoutTiendaInput = {
    multa_id?: StringFieldUpdateOperationsInput | string
    fecha_emision?: DateTimeFieldUpdateOperationsInput | Date | string
    motivo?: StringFieldUpdateOperationsInput | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    estado?: EnumEstadoMultaFieldUpdateOperationsInput | $Enums.EstadoMulta
    usuario_id?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}