
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
 * Model PerfilUsuario
 * 
 */
export type PerfilUsuario = $Result.DefaultSelection<Prisma.$PerfilUsuarioPayload>
/**
 * Model SesionUsuario
 * 
 */
export type SesionUsuario = $Result.DefaultSelection<Prisma.$SesionUsuarioPayload>
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
  PROFECO: 'PROFECO',
  SUPER_ADMIN: 'SUPER_ADMIN'
};

export type TipoUsuario = (typeof TipoUsuario)[keyof typeof TipoUsuario]


export const EstadoMulta: {
  PENDIENTE: 'PENDIENTE',
  PAGADA: 'PAGADA',
  APELADA: 'APELADA',
  CANCELADA: 'CANCELADA'
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
   * `prisma.perfilUsuario`: Exposes CRUD operations for the **PerfilUsuario** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PerfilUsuarios
    * const perfilUsuarios = await prisma.perfilUsuario.findMany()
    * ```
    */
  get perfilUsuario(): Prisma.PerfilUsuarioDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sesionUsuario`: Exposes CRUD operations for the **SesionUsuario** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SesionUsuarios
    * const sesionUsuarios = await prisma.sesionUsuario.findMany()
    * ```
    */
  get sesionUsuario(): Prisma.SesionUsuarioDelegate<ExtArgs, ClientOptions>;

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
    PerfilUsuario: 'PerfilUsuario',
    SesionUsuario: 'SesionUsuario',
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
      modelProps: "usuario" | "perfilUsuario" | "sesionUsuario" | "tienda" | "multa"
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
      PerfilUsuario: {
        payload: Prisma.$PerfilUsuarioPayload<ExtArgs>
        fields: Prisma.PerfilUsuarioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PerfilUsuarioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PerfilUsuarioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PerfilUsuarioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PerfilUsuarioPayload>
          }
          findFirst: {
            args: Prisma.PerfilUsuarioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PerfilUsuarioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PerfilUsuarioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PerfilUsuarioPayload>
          }
          findMany: {
            args: Prisma.PerfilUsuarioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PerfilUsuarioPayload>[]
          }
          create: {
            args: Prisma.PerfilUsuarioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PerfilUsuarioPayload>
          }
          createMany: {
            args: Prisma.PerfilUsuarioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PerfilUsuarioCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PerfilUsuarioPayload>[]
          }
          delete: {
            args: Prisma.PerfilUsuarioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PerfilUsuarioPayload>
          }
          update: {
            args: Prisma.PerfilUsuarioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PerfilUsuarioPayload>
          }
          deleteMany: {
            args: Prisma.PerfilUsuarioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PerfilUsuarioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PerfilUsuarioUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PerfilUsuarioPayload>[]
          }
          upsert: {
            args: Prisma.PerfilUsuarioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PerfilUsuarioPayload>
          }
          aggregate: {
            args: Prisma.PerfilUsuarioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePerfilUsuario>
          }
          groupBy: {
            args: Prisma.PerfilUsuarioGroupByArgs<ExtArgs>
            result: $Utils.Optional<PerfilUsuarioGroupByOutputType>[]
          }
          count: {
            args: Prisma.PerfilUsuarioCountArgs<ExtArgs>
            result: $Utils.Optional<PerfilUsuarioCountAggregateOutputType> | number
          }
        }
      }
      SesionUsuario: {
        payload: Prisma.$SesionUsuarioPayload<ExtArgs>
        fields: Prisma.SesionUsuarioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SesionUsuarioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SesionUsuarioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SesionUsuarioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SesionUsuarioPayload>
          }
          findFirst: {
            args: Prisma.SesionUsuarioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SesionUsuarioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SesionUsuarioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SesionUsuarioPayload>
          }
          findMany: {
            args: Prisma.SesionUsuarioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SesionUsuarioPayload>[]
          }
          create: {
            args: Prisma.SesionUsuarioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SesionUsuarioPayload>
          }
          createMany: {
            args: Prisma.SesionUsuarioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SesionUsuarioCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SesionUsuarioPayload>[]
          }
          delete: {
            args: Prisma.SesionUsuarioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SesionUsuarioPayload>
          }
          update: {
            args: Prisma.SesionUsuarioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SesionUsuarioPayload>
          }
          deleteMany: {
            args: Prisma.SesionUsuarioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SesionUsuarioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SesionUsuarioUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SesionUsuarioPayload>[]
          }
          upsert: {
            args: Prisma.SesionUsuarioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SesionUsuarioPayload>
          }
          aggregate: {
            args: Prisma.SesionUsuarioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSesionUsuario>
          }
          groupBy: {
            args: Prisma.SesionUsuarioGroupByArgs<ExtArgs>
            result: $Utils.Optional<SesionUsuarioGroupByOutputType>[]
          }
          count: {
            args: Prisma.SesionUsuarioCountArgs<ExtArgs>
            result: $Utils.Optional<SesionUsuarioCountAggregateOutputType> | number
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
    perfilUsuario?: PerfilUsuarioOmit
    sesionUsuario?: SesionUsuarioOmit
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
    sesiones: number
  }

  export type UsuarioCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    multas?: boolean | UsuarioCountOutputTypeCountMultasArgs
    sesiones?: boolean | UsuarioCountOutputTypeCountSesionesArgs
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
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountSesionesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SesionUsuarioWhereInput
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
    is_verified: boolean | null
    is_active: boolean | null
    last_login: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UsuarioMaxAggregateOutputType = {
    usuario_id: string | null
    email: string | null
    password_hash: string | null
    nombre: string | null
    tipo_usuario: $Enums.TipoUsuario | null
    is_verified: boolean | null
    is_active: boolean | null
    last_login: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UsuarioCountAggregateOutputType = {
    usuario_id: number
    email: number
    password_hash: number
    nombre: number
    tipo_usuario: number
    is_verified: number
    is_active: number
    last_login: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type UsuarioMinAggregateInputType = {
    usuario_id?: true
    email?: true
    password_hash?: true
    nombre?: true
    tipo_usuario?: true
    is_verified?: true
    is_active?: true
    last_login?: true
    created_at?: true
    updated_at?: true
  }

  export type UsuarioMaxAggregateInputType = {
    usuario_id?: true
    email?: true
    password_hash?: true
    nombre?: true
    tipo_usuario?: true
    is_verified?: true
    is_active?: true
    last_login?: true
    created_at?: true
    updated_at?: true
  }

  export type UsuarioCountAggregateInputType = {
    usuario_id?: true
    email?: true
    password_hash?: true
    nombre?: true
    tipo_usuario?: true
    is_verified?: true
    is_active?: true
    last_login?: true
    created_at?: true
    updated_at?: true
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
    is_verified: boolean
    is_active: boolean
    last_login: Date | null
    created_at: Date
    updated_at: Date
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
    is_verified?: boolean
    is_active?: boolean
    last_login?: boolean
    created_at?: boolean
    updated_at?: boolean
    tienda?: boolean | Usuario$tiendaArgs<ExtArgs>
    multas?: boolean | Usuario$multasArgs<ExtArgs>
    perfil?: boolean | Usuario$perfilArgs<ExtArgs>
    sesiones?: boolean | Usuario$sesionesArgs<ExtArgs>
    _count?: boolean | UsuarioCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    usuario_id?: boolean
    email?: boolean
    password_hash?: boolean
    nombre?: boolean
    tipo_usuario?: boolean
    is_verified?: boolean
    is_active?: boolean
    last_login?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    usuario_id?: boolean
    email?: boolean
    password_hash?: boolean
    nombre?: boolean
    tipo_usuario?: boolean
    is_verified?: boolean
    is_active?: boolean
    last_login?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectScalar = {
    usuario_id?: boolean
    email?: boolean
    password_hash?: boolean
    nombre?: boolean
    tipo_usuario?: boolean
    is_verified?: boolean
    is_active?: boolean
    last_login?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type UsuarioOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"usuario_id" | "email" | "password_hash" | "nombre" | "tipo_usuario" | "is_verified" | "is_active" | "last_login" | "created_at" | "updated_at", ExtArgs["result"]["usuario"]>
  export type UsuarioInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tienda?: boolean | Usuario$tiendaArgs<ExtArgs>
    multas?: boolean | Usuario$multasArgs<ExtArgs>
    perfil?: boolean | Usuario$perfilArgs<ExtArgs>
    sesiones?: boolean | Usuario$sesionesArgs<ExtArgs>
    _count?: boolean | UsuarioCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UsuarioIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UsuarioIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UsuarioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Usuario"
    objects: {
      tienda: Prisma.$TiendaPayload<ExtArgs> | null
      multas: Prisma.$MultaPayload<ExtArgs>[]
      perfil: Prisma.$PerfilUsuarioPayload<ExtArgs> | null
      sesiones: Prisma.$SesionUsuarioPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      usuario_id: string
      email: string
      password_hash: string
      nombre: string
      tipo_usuario: $Enums.TipoUsuario
      is_verified: boolean
      is_active: boolean
      last_login: Date | null
      created_at: Date
      updated_at: Date
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
    perfil<T extends Usuario$perfilArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$perfilArgs<ExtArgs>>): Prisma__PerfilUsuarioClient<$Result.GetResult<Prisma.$PerfilUsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    sesiones<T extends Usuario$sesionesArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$sesionesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SesionUsuarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly is_verified: FieldRef<"Usuario", 'Boolean'>
    readonly is_active: FieldRef<"Usuario", 'Boolean'>
    readonly last_login: FieldRef<"Usuario", 'DateTime'>
    readonly created_at: FieldRef<"Usuario", 'DateTime'>
    readonly updated_at: FieldRef<"Usuario", 'DateTime'>
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
   * Usuario.perfil
   */
  export type Usuario$perfilArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PerfilUsuario
     */
    select?: PerfilUsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PerfilUsuario
     */
    omit?: PerfilUsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PerfilUsuarioInclude<ExtArgs> | null
    where?: PerfilUsuarioWhereInput
  }

  /**
   * Usuario.sesiones
   */
  export type Usuario$sesionesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SesionUsuario
     */
    select?: SesionUsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SesionUsuario
     */
    omit?: SesionUsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SesionUsuarioInclude<ExtArgs> | null
    where?: SesionUsuarioWhereInput
    orderBy?: SesionUsuarioOrderByWithRelationInput | SesionUsuarioOrderByWithRelationInput[]
    cursor?: SesionUsuarioWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SesionUsuarioScalarFieldEnum | SesionUsuarioScalarFieldEnum[]
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
   * Model PerfilUsuario
   */

  export type AggregatePerfilUsuario = {
    _count: PerfilUsuarioCountAggregateOutputType | null
    _min: PerfilUsuarioMinAggregateOutputType | null
    _max: PerfilUsuarioMaxAggregateOutputType | null
  }

  export type PerfilUsuarioMinAggregateOutputType = {
    perfil_id: string | null
    usuario_id: string | null
    telefono: string | null
    direccion: string | null
    fecha_nacimiento: Date | null
    avatar_url: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type PerfilUsuarioMaxAggregateOutputType = {
    perfil_id: string | null
    usuario_id: string | null
    telefono: string | null
    direccion: string | null
    fecha_nacimiento: Date | null
    avatar_url: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type PerfilUsuarioCountAggregateOutputType = {
    perfil_id: number
    usuario_id: number
    telefono: number
    direccion: number
    fecha_nacimiento: number
    avatar_url: number
    preferencias: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type PerfilUsuarioMinAggregateInputType = {
    perfil_id?: true
    usuario_id?: true
    telefono?: true
    direccion?: true
    fecha_nacimiento?: true
    avatar_url?: true
    created_at?: true
    updated_at?: true
  }

  export type PerfilUsuarioMaxAggregateInputType = {
    perfil_id?: true
    usuario_id?: true
    telefono?: true
    direccion?: true
    fecha_nacimiento?: true
    avatar_url?: true
    created_at?: true
    updated_at?: true
  }

  export type PerfilUsuarioCountAggregateInputType = {
    perfil_id?: true
    usuario_id?: true
    telefono?: true
    direccion?: true
    fecha_nacimiento?: true
    avatar_url?: true
    preferencias?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type PerfilUsuarioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PerfilUsuario to aggregate.
     */
    where?: PerfilUsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PerfilUsuarios to fetch.
     */
    orderBy?: PerfilUsuarioOrderByWithRelationInput | PerfilUsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PerfilUsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PerfilUsuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PerfilUsuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PerfilUsuarios
    **/
    _count?: true | PerfilUsuarioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PerfilUsuarioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PerfilUsuarioMaxAggregateInputType
  }

  export type GetPerfilUsuarioAggregateType<T extends PerfilUsuarioAggregateArgs> = {
        [P in keyof T & keyof AggregatePerfilUsuario]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePerfilUsuario[P]>
      : GetScalarType<T[P], AggregatePerfilUsuario[P]>
  }




  export type PerfilUsuarioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PerfilUsuarioWhereInput
    orderBy?: PerfilUsuarioOrderByWithAggregationInput | PerfilUsuarioOrderByWithAggregationInput[]
    by: PerfilUsuarioScalarFieldEnum[] | PerfilUsuarioScalarFieldEnum
    having?: PerfilUsuarioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PerfilUsuarioCountAggregateInputType | true
    _min?: PerfilUsuarioMinAggregateInputType
    _max?: PerfilUsuarioMaxAggregateInputType
  }

  export type PerfilUsuarioGroupByOutputType = {
    perfil_id: string
    usuario_id: string
    telefono: string | null
    direccion: string | null
    fecha_nacimiento: Date | null
    avatar_url: string | null
    preferencias: JsonValue | null
    created_at: Date
    updated_at: Date
    _count: PerfilUsuarioCountAggregateOutputType | null
    _min: PerfilUsuarioMinAggregateOutputType | null
    _max: PerfilUsuarioMaxAggregateOutputType | null
  }

  type GetPerfilUsuarioGroupByPayload<T extends PerfilUsuarioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PerfilUsuarioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PerfilUsuarioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PerfilUsuarioGroupByOutputType[P]>
            : GetScalarType<T[P], PerfilUsuarioGroupByOutputType[P]>
        }
      >
    >


  export type PerfilUsuarioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    perfil_id?: boolean
    usuario_id?: boolean
    telefono?: boolean
    direccion?: boolean
    fecha_nacimiento?: boolean
    avatar_url?: boolean
    preferencias?: boolean
    created_at?: boolean
    updated_at?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["perfilUsuario"]>

  export type PerfilUsuarioSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    perfil_id?: boolean
    usuario_id?: boolean
    telefono?: boolean
    direccion?: boolean
    fecha_nacimiento?: boolean
    avatar_url?: boolean
    preferencias?: boolean
    created_at?: boolean
    updated_at?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["perfilUsuario"]>

  export type PerfilUsuarioSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    perfil_id?: boolean
    usuario_id?: boolean
    telefono?: boolean
    direccion?: boolean
    fecha_nacimiento?: boolean
    avatar_url?: boolean
    preferencias?: boolean
    created_at?: boolean
    updated_at?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["perfilUsuario"]>

  export type PerfilUsuarioSelectScalar = {
    perfil_id?: boolean
    usuario_id?: boolean
    telefono?: boolean
    direccion?: boolean
    fecha_nacimiento?: boolean
    avatar_url?: boolean
    preferencias?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type PerfilUsuarioOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"perfil_id" | "usuario_id" | "telefono" | "direccion" | "fecha_nacimiento" | "avatar_url" | "preferencias" | "created_at" | "updated_at", ExtArgs["result"]["perfilUsuario"]>
  export type PerfilUsuarioInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }
  export type PerfilUsuarioIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }
  export type PerfilUsuarioIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }

  export type $PerfilUsuarioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PerfilUsuario"
    objects: {
      usuario: Prisma.$UsuarioPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      perfil_id: string
      usuario_id: string
      telefono: string | null
      direccion: string | null
      fecha_nacimiento: Date | null
      avatar_url: string | null
      preferencias: Prisma.JsonValue | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["perfilUsuario"]>
    composites: {}
  }

  type PerfilUsuarioGetPayload<S extends boolean | null | undefined | PerfilUsuarioDefaultArgs> = $Result.GetResult<Prisma.$PerfilUsuarioPayload, S>

  type PerfilUsuarioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PerfilUsuarioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PerfilUsuarioCountAggregateInputType | true
    }

  export interface PerfilUsuarioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PerfilUsuario'], meta: { name: 'PerfilUsuario' } }
    /**
     * Find zero or one PerfilUsuario that matches the filter.
     * @param {PerfilUsuarioFindUniqueArgs} args - Arguments to find a PerfilUsuario
     * @example
     * // Get one PerfilUsuario
     * const perfilUsuario = await prisma.perfilUsuario.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PerfilUsuarioFindUniqueArgs>(args: SelectSubset<T, PerfilUsuarioFindUniqueArgs<ExtArgs>>): Prisma__PerfilUsuarioClient<$Result.GetResult<Prisma.$PerfilUsuarioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PerfilUsuario that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PerfilUsuarioFindUniqueOrThrowArgs} args - Arguments to find a PerfilUsuario
     * @example
     * // Get one PerfilUsuario
     * const perfilUsuario = await prisma.perfilUsuario.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PerfilUsuarioFindUniqueOrThrowArgs>(args: SelectSubset<T, PerfilUsuarioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PerfilUsuarioClient<$Result.GetResult<Prisma.$PerfilUsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PerfilUsuario that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PerfilUsuarioFindFirstArgs} args - Arguments to find a PerfilUsuario
     * @example
     * // Get one PerfilUsuario
     * const perfilUsuario = await prisma.perfilUsuario.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PerfilUsuarioFindFirstArgs>(args?: SelectSubset<T, PerfilUsuarioFindFirstArgs<ExtArgs>>): Prisma__PerfilUsuarioClient<$Result.GetResult<Prisma.$PerfilUsuarioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PerfilUsuario that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PerfilUsuarioFindFirstOrThrowArgs} args - Arguments to find a PerfilUsuario
     * @example
     * // Get one PerfilUsuario
     * const perfilUsuario = await prisma.perfilUsuario.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PerfilUsuarioFindFirstOrThrowArgs>(args?: SelectSubset<T, PerfilUsuarioFindFirstOrThrowArgs<ExtArgs>>): Prisma__PerfilUsuarioClient<$Result.GetResult<Prisma.$PerfilUsuarioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PerfilUsuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PerfilUsuarioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PerfilUsuarios
     * const perfilUsuarios = await prisma.perfilUsuario.findMany()
     * 
     * // Get first 10 PerfilUsuarios
     * const perfilUsuarios = await prisma.perfilUsuario.findMany({ take: 10 })
     * 
     * // Only select the `perfil_id`
     * const perfilUsuarioWithPerfil_idOnly = await prisma.perfilUsuario.findMany({ select: { perfil_id: true } })
     * 
     */
    findMany<T extends PerfilUsuarioFindManyArgs>(args?: SelectSubset<T, PerfilUsuarioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PerfilUsuarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PerfilUsuario.
     * @param {PerfilUsuarioCreateArgs} args - Arguments to create a PerfilUsuario.
     * @example
     * // Create one PerfilUsuario
     * const PerfilUsuario = await prisma.perfilUsuario.create({
     *   data: {
     *     // ... data to create a PerfilUsuario
     *   }
     * })
     * 
     */
    create<T extends PerfilUsuarioCreateArgs>(args: SelectSubset<T, PerfilUsuarioCreateArgs<ExtArgs>>): Prisma__PerfilUsuarioClient<$Result.GetResult<Prisma.$PerfilUsuarioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PerfilUsuarios.
     * @param {PerfilUsuarioCreateManyArgs} args - Arguments to create many PerfilUsuarios.
     * @example
     * // Create many PerfilUsuarios
     * const perfilUsuario = await prisma.perfilUsuario.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PerfilUsuarioCreateManyArgs>(args?: SelectSubset<T, PerfilUsuarioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PerfilUsuarios and returns the data saved in the database.
     * @param {PerfilUsuarioCreateManyAndReturnArgs} args - Arguments to create many PerfilUsuarios.
     * @example
     * // Create many PerfilUsuarios
     * const perfilUsuario = await prisma.perfilUsuario.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PerfilUsuarios and only return the `perfil_id`
     * const perfilUsuarioWithPerfil_idOnly = await prisma.perfilUsuario.createManyAndReturn({
     *   select: { perfil_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PerfilUsuarioCreateManyAndReturnArgs>(args?: SelectSubset<T, PerfilUsuarioCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PerfilUsuarioPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PerfilUsuario.
     * @param {PerfilUsuarioDeleteArgs} args - Arguments to delete one PerfilUsuario.
     * @example
     * // Delete one PerfilUsuario
     * const PerfilUsuario = await prisma.perfilUsuario.delete({
     *   where: {
     *     // ... filter to delete one PerfilUsuario
     *   }
     * })
     * 
     */
    delete<T extends PerfilUsuarioDeleteArgs>(args: SelectSubset<T, PerfilUsuarioDeleteArgs<ExtArgs>>): Prisma__PerfilUsuarioClient<$Result.GetResult<Prisma.$PerfilUsuarioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PerfilUsuario.
     * @param {PerfilUsuarioUpdateArgs} args - Arguments to update one PerfilUsuario.
     * @example
     * // Update one PerfilUsuario
     * const perfilUsuario = await prisma.perfilUsuario.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PerfilUsuarioUpdateArgs>(args: SelectSubset<T, PerfilUsuarioUpdateArgs<ExtArgs>>): Prisma__PerfilUsuarioClient<$Result.GetResult<Prisma.$PerfilUsuarioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PerfilUsuarios.
     * @param {PerfilUsuarioDeleteManyArgs} args - Arguments to filter PerfilUsuarios to delete.
     * @example
     * // Delete a few PerfilUsuarios
     * const { count } = await prisma.perfilUsuario.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PerfilUsuarioDeleteManyArgs>(args?: SelectSubset<T, PerfilUsuarioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PerfilUsuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PerfilUsuarioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PerfilUsuarios
     * const perfilUsuario = await prisma.perfilUsuario.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PerfilUsuarioUpdateManyArgs>(args: SelectSubset<T, PerfilUsuarioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PerfilUsuarios and returns the data updated in the database.
     * @param {PerfilUsuarioUpdateManyAndReturnArgs} args - Arguments to update many PerfilUsuarios.
     * @example
     * // Update many PerfilUsuarios
     * const perfilUsuario = await prisma.perfilUsuario.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PerfilUsuarios and only return the `perfil_id`
     * const perfilUsuarioWithPerfil_idOnly = await prisma.perfilUsuario.updateManyAndReturn({
     *   select: { perfil_id: true },
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
    updateManyAndReturn<T extends PerfilUsuarioUpdateManyAndReturnArgs>(args: SelectSubset<T, PerfilUsuarioUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PerfilUsuarioPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PerfilUsuario.
     * @param {PerfilUsuarioUpsertArgs} args - Arguments to update or create a PerfilUsuario.
     * @example
     * // Update or create a PerfilUsuario
     * const perfilUsuario = await prisma.perfilUsuario.upsert({
     *   create: {
     *     // ... data to create a PerfilUsuario
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PerfilUsuario we want to update
     *   }
     * })
     */
    upsert<T extends PerfilUsuarioUpsertArgs>(args: SelectSubset<T, PerfilUsuarioUpsertArgs<ExtArgs>>): Prisma__PerfilUsuarioClient<$Result.GetResult<Prisma.$PerfilUsuarioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PerfilUsuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PerfilUsuarioCountArgs} args - Arguments to filter PerfilUsuarios to count.
     * @example
     * // Count the number of PerfilUsuarios
     * const count = await prisma.perfilUsuario.count({
     *   where: {
     *     // ... the filter for the PerfilUsuarios we want to count
     *   }
     * })
    **/
    count<T extends PerfilUsuarioCountArgs>(
      args?: Subset<T, PerfilUsuarioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PerfilUsuarioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PerfilUsuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PerfilUsuarioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PerfilUsuarioAggregateArgs>(args: Subset<T, PerfilUsuarioAggregateArgs>): Prisma.PrismaPromise<GetPerfilUsuarioAggregateType<T>>

    /**
     * Group by PerfilUsuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PerfilUsuarioGroupByArgs} args - Group by arguments.
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
      T extends PerfilUsuarioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PerfilUsuarioGroupByArgs['orderBy'] }
        : { orderBy?: PerfilUsuarioGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PerfilUsuarioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPerfilUsuarioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PerfilUsuario model
   */
  readonly fields: PerfilUsuarioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PerfilUsuario.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PerfilUsuarioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usuario<T extends UsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the PerfilUsuario model
   */
  interface PerfilUsuarioFieldRefs {
    readonly perfil_id: FieldRef<"PerfilUsuario", 'String'>
    readonly usuario_id: FieldRef<"PerfilUsuario", 'String'>
    readonly telefono: FieldRef<"PerfilUsuario", 'String'>
    readonly direccion: FieldRef<"PerfilUsuario", 'String'>
    readonly fecha_nacimiento: FieldRef<"PerfilUsuario", 'DateTime'>
    readonly avatar_url: FieldRef<"PerfilUsuario", 'String'>
    readonly preferencias: FieldRef<"PerfilUsuario", 'Json'>
    readonly created_at: FieldRef<"PerfilUsuario", 'DateTime'>
    readonly updated_at: FieldRef<"PerfilUsuario", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PerfilUsuario findUnique
   */
  export type PerfilUsuarioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PerfilUsuario
     */
    select?: PerfilUsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PerfilUsuario
     */
    omit?: PerfilUsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PerfilUsuarioInclude<ExtArgs> | null
    /**
     * Filter, which PerfilUsuario to fetch.
     */
    where: PerfilUsuarioWhereUniqueInput
  }

  /**
   * PerfilUsuario findUniqueOrThrow
   */
  export type PerfilUsuarioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PerfilUsuario
     */
    select?: PerfilUsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PerfilUsuario
     */
    omit?: PerfilUsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PerfilUsuarioInclude<ExtArgs> | null
    /**
     * Filter, which PerfilUsuario to fetch.
     */
    where: PerfilUsuarioWhereUniqueInput
  }

  /**
   * PerfilUsuario findFirst
   */
  export type PerfilUsuarioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PerfilUsuario
     */
    select?: PerfilUsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PerfilUsuario
     */
    omit?: PerfilUsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PerfilUsuarioInclude<ExtArgs> | null
    /**
     * Filter, which PerfilUsuario to fetch.
     */
    where?: PerfilUsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PerfilUsuarios to fetch.
     */
    orderBy?: PerfilUsuarioOrderByWithRelationInput | PerfilUsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PerfilUsuarios.
     */
    cursor?: PerfilUsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PerfilUsuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PerfilUsuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PerfilUsuarios.
     */
    distinct?: PerfilUsuarioScalarFieldEnum | PerfilUsuarioScalarFieldEnum[]
  }

  /**
   * PerfilUsuario findFirstOrThrow
   */
  export type PerfilUsuarioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PerfilUsuario
     */
    select?: PerfilUsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PerfilUsuario
     */
    omit?: PerfilUsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PerfilUsuarioInclude<ExtArgs> | null
    /**
     * Filter, which PerfilUsuario to fetch.
     */
    where?: PerfilUsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PerfilUsuarios to fetch.
     */
    orderBy?: PerfilUsuarioOrderByWithRelationInput | PerfilUsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PerfilUsuarios.
     */
    cursor?: PerfilUsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PerfilUsuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PerfilUsuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PerfilUsuarios.
     */
    distinct?: PerfilUsuarioScalarFieldEnum | PerfilUsuarioScalarFieldEnum[]
  }

  /**
   * PerfilUsuario findMany
   */
  export type PerfilUsuarioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PerfilUsuario
     */
    select?: PerfilUsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PerfilUsuario
     */
    omit?: PerfilUsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PerfilUsuarioInclude<ExtArgs> | null
    /**
     * Filter, which PerfilUsuarios to fetch.
     */
    where?: PerfilUsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PerfilUsuarios to fetch.
     */
    orderBy?: PerfilUsuarioOrderByWithRelationInput | PerfilUsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PerfilUsuarios.
     */
    cursor?: PerfilUsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PerfilUsuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PerfilUsuarios.
     */
    skip?: number
    distinct?: PerfilUsuarioScalarFieldEnum | PerfilUsuarioScalarFieldEnum[]
  }

  /**
   * PerfilUsuario create
   */
  export type PerfilUsuarioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PerfilUsuario
     */
    select?: PerfilUsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PerfilUsuario
     */
    omit?: PerfilUsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PerfilUsuarioInclude<ExtArgs> | null
    /**
     * The data needed to create a PerfilUsuario.
     */
    data: XOR<PerfilUsuarioCreateInput, PerfilUsuarioUncheckedCreateInput>
  }

  /**
   * PerfilUsuario createMany
   */
  export type PerfilUsuarioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PerfilUsuarios.
     */
    data: PerfilUsuarioCreateManyInput | PerfilUsuarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PerfilUsuario createManyAndReturn
   */
  export type PerfilUsuarioCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PerfilUsuario
     */
    select?: PerfilUsuarioSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PerfilUsuario
     */
    omit?: PerfilUsuarioOmit<ExtArgs> | null
    /**
     * The data used to create many PerfilUsuarios.
     */
    data: PerfilUsuarioCreateManyInput | PerfilUsuarioCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PerfilUsuarioIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PerfilUsuario update
   */
  export type PerfilUsuarioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PerfilUsuario
     */
    select?: PerfilUsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PerfilUsuario
     */
    omit?: PerfilUsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PerfilUsuarioInclude<ExtArgs> | null
    /**
     * The data needed to update a PerfilUsuario.
     */
    data: XOR<PerfilUsuarioUpdateInput, PerfilUsuarioUncheckedUpdateInput>
    /**
     * Choose, which PerfilUsuario to update.
     */
    where: PerfilUsuarioWhereUniqueInput
  }

  /**
   * PerfilUsuario updateMany
   */
  export type PerfilUsuarioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PerfilUsuarios.
     */
    data: XOR<PerfilUsuarioUpdateManyMutationInput, PerfilUsuarioUncheckedUpdateManyInput>
    /**
     * Filter which PerfilUsuarios to update
     */
    where?: PerfilUsuarioWhereInput
    /**
     * Limit how many PerfilUsuarios to update.
     */
    limit?: number
  }

  /**
   * PerfilUsuario updateManyAndReturn
   */
  export type PerfilUsuarioUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PerfilUsuario
     */
    select?: PerfilUsuarioSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PerfilUsuario
     */
    omit?: PerfilUsuarioOmit<ExtArgs> | null
    /**
     * The data used to update PerfilUsuarios.
     */
    data: XOR<PerfilUsuarioUpdateManyMutationInput, PerfilUsuarioUncheckedUpdateManyInput>
    /**
     * Filter which PerfilUsuarios to update
     */
    where?: PerfilUsuarioWhereInput
    /**
     * Limit how many PerfilUsuarios to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PerfilUsuarioIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PerfilUsuario upsert
   */
  export type PerfilUsuarioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PerfilUsuario
     */
    select?: PerfilUsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PerfilUsuario
     */
    omit?: PerfilUsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PerfilUsuarioInclude<ExtArgs> | null
    /**
     * The filter to search for the PerfilUsuario to update in case it exists.
     */
    where: PerfilUsuarioWhereUniqueInput
    /**
     * In case the PerfilUsuario found by the `where` argument doesn't exist, create a new PerfilUsuario with this data.
     */
    create: XOR<PerfilUsuarioCreateInput, PerfilUsuarioUncheckedCreateInput>
    /**
     * In case the PerfilUsuario was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PerfilUsuarioUpdateInput, PerfilUsuarioUncheckedUpdateInput>
  }

  /**
   * PerfilUsuario delete
   */
  export type PerfilUsuarioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PerfilUsuario
     */
    select?: PerfilUsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PerfilUsuario
     */
    omit?: PerfilUsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PerfilUsuarioInclude<ExtArgs> | null
    /**
     * Filter which PerfilUsuario to delete.
     */
    where: PerfilUsuarioWhereUniqueInput
  }

  /**
   * PerfilUsuario deleteMany
   */
  export type PerfilUsuarioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PerfilUsuarios to delete
     */
    where?: PerfilUsuarioWhereInput
    /**
     * Limit how many PerfilUsuarios to delete.
     */
    limit?: number
  }

  /**
   * PerfilUsuario without action
   */
  export type PerfilUsuarioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PerfilUsuario
     */
    select?: PerfilUsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PerfilUsuario
     */
    omit?: PerfilUsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PerfilUsuarioInclude<ExtArgs> | null
  }


  /**
   * Model SesionUsuario
   */

  export type AggregateSesionUsuario = {
    _count: SesionUsuarioCountAggregateOutputType | null
    _min: SesionUsuarioMinAggregateOutputType | null
    _max: SesionUsuarioMaxAggregateOutputType | null
  }

  export type SesionUsuarioMinAggregateOutputType = {
    sesion_id: string | null
    usuario_id: string | null
    token: string | null
    expires_at: Date | null
    is_active: boolean | null
    user_agent: string | null
    ip_address: string | null
    created_at: Date | null
  }

  export type SesionUsuarioMaxAggregateOutputType = {
    sesion_id: string | null
    usuario_id: string | null
    token: string | null
    expires_at: Date | null
    is_active: boolean | null
    user_agent: string | null
    ip_address: string | null
    created_at: Date | null
  }

  export type SesionUsuarioCountAggregateOutputType = {
    sesion_id: number
    usuario_id: number
    token: number
    expires_at: number
    is_active: number
    user_agent: number
    ip_address: number
    created_at: number
    _all: number
  }


  export type SesionUsuarioMinAggregateInputType = {
    sesion_id?: true
    usuario_id?: true
    token?: true
    expires_at?: true
    is_active?: true
    user_agent?: true
    ip_address?: true
    created_at?: true
  }

  export type SesionUsuarioMaxAggregateInputType = {
    sesion_id?: true
    usuario_id?: true
    token?: true
    expires_at?: true
    is_active?: true
    user_agent?: true
    ip_address?: true
    created_at?: true
  }

  export type SesionUsuarioCountAggregateInputType = {
    sesion_id?: true
    usuario_id?: true
    token?: true
    expires_at?: true
    is_active?: true
    user_agent?: true
    ip_address?: true
    created_at?: true
    _all?: true
  }

  export type SesionUsuarioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SesionUsuario to aggregate.
     */
    where?: SesionUsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SesionUsuarios to fetch.
     */
    orderBy?: SesionUsuarioOrderByWithRelationInput | SesionUsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SesionUsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SesionUsuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SesionUsuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SesionUsuarios
    **/
    _count?: true | SesionUsuarioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SesionUsuarioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SesionUsuarioMaxAggregateInputType
  }

  export type GetSesionUsuarioAggregateType<T extends SesionUsuarioAggregateArgs> = {
        [P in keyof T & keyof AggregateSesionUsuario]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSesionUsuario[P]>
      : GetScalarType<T[P], AggregateSesionUsuario[P]>
  }




  export type SesionUsuarioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SesionUsuarioWhereInput
    orderBy?: SesionUsuarioOrderByWithAggregationInput | SesionUsuarioOrderByWithAggregationInput[]
    by: SesionUsuarioScalarFieldEnum[] | SesionUsuarioScalarFieldEnum
    having?: SesionUsuarioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SesionUsuarioCountAggregateInputType | true
    _min?: SesionUsuarioMinAggregateInputType
    _max?: SesionUsuarioMaxAggregateInputType
  }

  export type SesionUsuarioGroupByOutputType = {
    sesion_id: string
    usuario_id: string
    token: string
    expires_at: Date
    is_active: boolean
    user_agent: string | null
    ip_address: string | null
    created_at: Date
    _count: SesionUsuarioCountAggregateOutputType | null
    _min: SesionUsuarioMinAggregateOutputType | null
    _max: SesionUsuarioMaxAggregateOutputType | null
  }

  type GetSesionUsuarioGroupByPayload<T extends SesionUsuarioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SesionUsuarioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SesionUsuarioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SesionUsuarioGroupByOutputType[P]>
            : GetScalarType<T[P], SesionUsuarioGroupByOutputType[P]>
        }
      >
    >


  export type SesionUsuarioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    sesion_id?: boolean
    usuario_id?: boolean
    token?: boolean
    expires_at?: boolean
    is_active?: boolean
    user_agent?: boolean
    ip_address?: boolean
    created_at?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sesionUsuario"]>

  export type SesionUsuarioSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    sesion_id?: boolean
    usuario_id?: boolean
    token?: boolean
    expires_at?: boolean
    is_active?: boolean
    user_agent?: boolean
    ip_address?: boolean
    created_at?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sesionUsuario"]>

  export type SesionUsuarioSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    sesion_id?: boolean
    usuario_id?: boolean
    token?: boolean
    expires_at?: boolean
    is_active?: boolean
    user_agent?: boolean
    ip_address?: boolean
    created_at?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sesionUsuario"]>

  export type SesionUsuarioSelectScalar = {
    sesion_id?: boolean
    usuario_id?: boolean
    token?: boolean
    expires_at?: boolean
    is_active?: boolean
    user_agent?: boolean
    ip_address?: boolean
    created_at?: boolean
  }

  export type SesionUsuarioOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"sesion_id" | "usuario_id" | "token" | "expires_at" | "is_active" | "user_agent" | "ip_address" | "created_at", ExtArgs["result"]["sesionUsuario"]>
  export type SesionUsuarioInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }
  export type SesionUsuarioIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }
  export type SesionUsuarioIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }

  export type $SesionUsuarioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SesionUsuario"
    objects: {
      usuario: Prisma.$UsuarioPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      sesion_id: string
      usuario_id: string
      token: string
      expires_at: Date
      is_active: boolean
      user_agent: string | null
      ip_address: string | null
      created_at: Date
    }, ExtArgs["result"]["sesionUsuario"]>
    composites: {}
  }

  type SesionUsuarioGetPayload<S extends boolean | null | undefined | SesionUsuarioDefaultArgs> = $Result.GetResult<Prisma.$SesionUsuarioPayload, S>

  type SesionUsuarioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SesionUsuarioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SesionUsuarioCountAggregateInputType | true
    }

  export interface SesionUsuarioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SesionUsuario'], meta: { name: 'SesionUsuario' } }
    /**
     * Find zero or one SesionUsuario that matches the filter.
     * @param {SesionUsuarioFindUniqueArgs} args - Arguments to find a SesionUsuario
     * @example
     * // Get one SesionUsuario
     * const sesionUsuario = await prisma.sesionUsuario.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SesionUsuarioFindUniqueArgs>(args: SelectSubset<T, SesionUsuarioFindUniqueArgs<ExtArgs>>): Prisma__SesionUsuarioClient<$Result.GetResult<Prisma.$SesionUsuarioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SesionUsuario that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SesionUsuarioFindUniqueOrThrowArgs} args - Arguments to find a SesionUsuario
     * @example
     * // Get one SesionUsuario
     * const sesionUsuario = await prisma.sesionUsuario.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SesionUsuarioFindUniqueOrThrowArgs>(args: SelectSubset<T, SesionUsuarioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SesionUsuarioClient<$Result.GetResult<Prisma.$SesionUsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SesionUsuario that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SesionUsuarioFindFirstArgs} args - Arguments to find a SesionUsuario
     * @example
     * // Get one SesionUsuario
     * const sesionUsuario = await prisma.sesionUsuario.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SesionUsuarioFindFirstArgs>(args?: SelectSubset<T, SesionUsuarioFindFirstArgs<ExtArgs>>): Prisma__SesionUsuarioClient<$Result.GetResult<Prisma.$SesionUsuarioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SesionUsuario that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SesionUsuarioFindFirstOrThrowArgs} args - Arguments to find a SesionUsuario
     * @example
     * // Get one SesionUsuario
     * const sesionUsuario = await prisma.sesionUsuario.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SesionUsuarioFindFirstOrThrowArgs>(args?: SelectSubset<T, SesionUsuarioFindFirstOrThrowArgs<ExtArgs>>): Prisma__SesionUsuarioClient<$Result.GetResult<Prisma.$SesionUsuarioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SesionUsuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SesionUsuarioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SesionUsuarios
     * const sesionUsuarios = await prisma.sesionUsuario.findMany()
     * 
     * // Get first 10 SesionUsuarios
     * const sesionUsuarios = await prisma.sesionUsuario.findMany({ take: 10 })
     * 
     * // Only select the `sesion_id`
     * const sesionUsuarioWithSesion_idOnly = await prisma.sesionUsuario.findMany({ select: { sesion_id: true } })
     * 
     */
    findMany<T extends SesionUsuarioFindManyArgs>(args?: SelectSubset<T, SesionUsuarioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SesionUsuarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SesionUsuario.
     * @param {SesionUsuarioCreateArgs} args - Arguments to create a SesionUsuario.
     * @example
     * // Create one SesionUsuario
     * const SesionUsuario = await prisma.sesionUsuario.create({
     *   data: {
     *     // ... data to create a SesionUsuario
     *   }
     * })
     * 
     */
    create<T extends SesionUsuarioCreateArgs>(args: SelectSubset<T, SesionUsuarioCreateArgs<ExtArgs>>): Prisma__SesionUsuarioClient<$Result.GetResult<Prisma.$SesionUsuarioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SesionUsuarios.
     * @param {SesionUsuarioCreateManyArgs} args - Arguments to create many SesionUsuarios.
     * @example
     * // Create many SesionUsuarios
     * const sesionUsuario = await prisma.sesionUsuario.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SesionUsuarioCreateManyArgs>(args?: SelectSubset<T, SesionUsuarioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SesionUsuarios and returns the data saved in the database.
     * @param {SesionUsuarioCreateManyAndReturnArgs} args - Arguments to create many SesionUsuarios.
     * @example
     * // Create many SesionUsuarios
     * const sesionUsuario = await prisma.sesionUsuario.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SesionUsuarios and only return the `sesion_id`
     * const sesionUsuarioWithSesion_idOnly = await prisma.sesionUsuario.createManyAndReturn({
     *   select: { sesion_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SesionUsuarioCreateManyAndReturnArgs>(args?: SelectSubset<T, SesionUsuarioCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SesionUsuarioPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SesionUsuario.
     * @param {SesionUsuarioDeleteArgs} args - Arguments to delete one SesionUsuario.
     * @example
     * // Delete one SesionUsuario
     * const SesionUsuario = await prisma.sesionUsuario.delete({
     *   where: {
     *     // ... filter to delete one SesionUsuario
     *   }
     * })
     * 
     */
    delete<T extends SesionUsuarioDeleteArgs>(args: SelectSubset<T, SesionUsuarioDeleteArgs<ExtArgs>>): Prisma__SesionUsuarioClient<$Result.GetResult<Prisma.$SesionUsuarioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SesionUsuario.
     * @param {SesionUsuarioUpdateArgs} args - Arguments to update one SesionUsuario.
     * @example
     * // Update one SesionUsuario
     * const sesionUsuario = await prisma.sesionUsuario.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SesionUsuarioUpdateArgs>(args: SelectSubset<T, SesionUsuarioUpdateArgs<ExtArgs>>): Prisma__SesionUsuarioClient<$Result.GetResult<Prisma.$SesionUsuarioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SesionUsuarios.
     * @param {SesionUsuarioDeleteManyArgs} args - Arguments to filter SesionUsuarios to delete.
     * @example
     * // Delete a few SesionUsuarios
     * const { count } = await prisma.sesionUsuario.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SesionUsuarioDeleteManyArgs>(args?: SelectSubset<T, SesionUsuarioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SesionUsuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SesionUsuarioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SesionUsuarios
     * const sesionUsuario = await prisma.sesionUsuario.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SesionUsuarioUpdateManyArgs>(args: SelectSubset<T, SesionUsuarioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SesionUsuarios and returns the data updated in the database.
     * @param {SesionUsuarioUpdateManyAndReturnArgs} args - Arguments to update many SesionUsuarios.
     * @example
     * // Update many SesionUsuarios
     * const sesionUsuario = await prisma.sesionUsuario.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SesionUsuarios and only return the `sesion_id`
     * const sesionUsuarioWithSesion_idOnly = await prisma.sesionUsuario.updateManyAndReturn({
     *   select: { sesion_id: true },
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
    updateManyAndReturn<T extends SesionUsuarioUpdateManyAndReturnArgs>(args: SelectSubset<T, SesionUsuarioUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SesionUsuarioPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SesionUsuario.
     * @param {SesionUsuarioUpsertArgs} args - Arguments to update or create a SesionUsuario.
     * @example
     * // Update or create a SesionUsuario
     * const sesionUsuario = await prisma.sesionUsuario.upsert({
     *   create: {
     *     // ... data to create a SesionUsuario
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SesionUsuario we want to update
     *   }
     * })
     */
    upsert<T extends SesionUsuarioUpsertArgs>(args: SelectSubset<T, SesionUsuarioUpsertArgs<ExtArgs>>): Prisma__SesionUsuarioClient<$Result.GetResult<Prisma.$SesionUsuarioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SesionUsuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SesionUsuarioCountArgs} args - Arguments to filter SesionUsuarios to count.
     * @example
     * // Count the number of SesionUsuarios
     * const count = await prisma.sesionUsuario.count({
     *   where: {
     *     // ... the filter for the SesionUsuarios we want to count
     *   }
     * })
    **/
    count<T extends SesionUsuarioCountArgs>(
      args?: Subset<T, SesionUsuarioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SesionUsuarioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SesionUsuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SesionUsuarioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SesionUsuarioAggregateArgs>(args: Subset<T, SesionUsuarioAggregateArgs>): Prisma.PrismaPromise<GetSesionUsuarioAggregateType<T>>

    /**
     * Group by SesionUsuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SesionUsuarioGroupByArgs} args - Group by arguments.
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
      T extends SesionUsuarioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SesionUsuarioGroupByArgs['orderBy'] }
        : { orderBy?: SesionUsuarioGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SesionUsuarioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSesionUsuarioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SesionUsuario model
   */
  readonly fields: SesionUsuarioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SesionUsuario.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SesionUsuarioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usuario<T extends UsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the SesionUsuario model
   */
  interface SesionUsuarioFieldRefs {
    readonly sesion_id: FieldRef<"SesionUsuario", 'String'>
    readonly usuario_id: FieldRef<"SesionUsuario", 'String'>
    readonly token: FieldRef<"SesionUsuario", 'String'>
    readonly expires_at: FieldRef<"SesionUsuario", 'DateTime'>
    readonly is_active: FieldRef<"SesionUsuario", 'Boolean'>
    readonly user_agent: FieldRef<"SesionUsuario", 'String'>
    readonly ip_address: FieldRef<"SesionUsuario", 'String'>
    readonly created_at: FieldRef<"SesionUsuario", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SesionUsuario findUnique
   */
  export type SesionUsuarioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SesionUsuario
     */
    select?: SesionUsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SesionUsuario
     */
    omit?: SesionUsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SesionUsuarioInclude<ExtArgs> | null
    /**
     * Filter, which SesionUsuario to fetch.
     */
    where: SesionUsuarioWhereUniqueInput
  }

  /**
   * SesionUsuario findUniqueOrThrow
   */
  export type SesionUsuarioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SesionUsuario
     */
    select?: SesionUsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SesionUsuario
     */
    omit?: SesionUsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SesionUsuarioInclude<ExtArgs> | null
    /**
     * Filter, which SesionUsuario to fetch.
     */
    where: SesionUsuarioWhereUniqueInput
  }

  /**
   * SesionUsuario findFirst
   */
  export type SesionUsuarioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SesionUsuario
     */
    select?: SesionUsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SesionUsuario
     */
    omit?: SesionUsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SesionUsuarioInclude<ExtArgs> | null
    /**
     * Filter, which SesionUsuario to fetch.
     */
    where?: SesionUsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SesionUsuarios to fetch.
     */
    orderBy?: SesionUsuarioOrderByWithRelationInput | SesionUsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SesionUsuarios.
     */
    cursor?: SesionUsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SesionUsuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SesionUsuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SesionUsuarios.
     */
    distinct?: SesionUsuarioScalarFieldEnum | SesionUsuarioScalarFieldEnum[]
  }

  /**
   * SesionUsuario findFirstOrThrow
   */
  export type SesionUsuarioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SesionUsuario
     */
    select?: SesionUsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SesionUsuario
     */
    omit?: SesionUsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SesionUsuarioInclude<ExtArgs> | null
    /**
     * Filter, which SesionUsuario to fetch.
     */
    where?: SesionUsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SesionUsuarios to fetch.
     */
    orderBy?: SesionUsuarioOrderByWithRelationInput | SesionUsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SesionUsuarios.
     */
    cursor?: SesionUsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SesionUsuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SesionUsuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SesionUsuarios.
     */
    distinct?: SesionUsuarioScalarFieldEnum | SesionUsuarioScalarFieldEnum[]
  }

  /**
   * SesionUsuario findMany
   */
  export type SesionUsuarioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SesionUsuario
     */
    select?: SesionUsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SesionUsuario
     */
    omit?: SesionUsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SesionUsuarioInclude<ExtArgs> | null
    /**
     * Filter, which SesionUsuarios to fetch.
     */
    where?: SesionUsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SesionUsuarios to fetch.
     */
    orderBy?: SesionUsuarioOrderByWithRelationInput | SesionUsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SesionUsuarios.
     */
    cursor?: SesionUsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SesionUsuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SesionUsuarios.
     */
    skip?: number
    distinct?: SesionUsuarioScalarFieldEnum | SesionUsuarioScalarFieldEnum[]
  }

  /**
   * SesionUsuario create
   */
  export type SesionUsuarioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SesionUsuario
     */
    select?: SesionUsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SesionUsuario
     */
    omit?: SesionUsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SesionUsuarioInclude<ExtArgs> | null
    /**
     * The data needed to create a SesionUsuario.
     */
    data: XOR<SesionUsuarioCreateInput, SesionUsuarioUncheckedCreateInput>
  }

  /**
   * SesionUsuario createMany
   */
  export type SesionUsuarioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SesionUsuarios.
     */
    data: SesionUsuarioCreateManyInput | SesionUsuarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SesionUsuario createManyAndReturn
   */
  export type SesionUsuarioCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SesionUsuario
     */
    select?: SesionUsuarioSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SesionUsuario
     */
    omit?: SesionUsuarioOmit<ExtArgs> | null
    /**
     * The data used to create many SesionUsuarios.
     */
    data: SesionUsuarioCreateManyInput | SesionUsuarioCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SesionUsuarioIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SesionUsuario update
   */
  export type SesionUsuarioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SesionUsuario
     */
    select?: SesionUsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SesionUsuario
     */
    omit?: SesionUsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SesionUsuarioInclude<ExtArgs> | null
    /**
     * The data needed to update a SesionUsuario.
     */
    data: XOR<SesionUsuarioUpdateInput, SesionUsuarioUncheckedUpdateInput>
    /**
     * Choose, which SesionUsuario to update.
     */
    where: SesionUsuarioWhereUniqueInput
  }

  /**
   * SesionUsuario updateMany
   */
  export type SesionUsuarioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SesionUsuarios.
     */
    data: XOR<SesionUsuarioUpdateManyMutationInput, SesionUsuarioUncheckedUpdateManyInput>
    /**
     * Filter which SesionUsuarios to update
     */
    where?: SesionUsuarioWhereInput
    /**
     * Limit how many SesionUsuarios to update.
     */
    limit?: number
  }

  /**
   * SesionUsuario updateManyAndReturn
   */
  export type SesionUsuarioUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SesionUsuario
     */
    select?: SesionUsuarioSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SesionUsuario
     */
    omit?: SesionUsuarioOmit<ExtArgs> | null
    /**
     * The data used to update SesionUsuarios.
     */
    data: XOR<SesionUsuarioUpdateManyMutationInput, SesionUsuarioUncheckedUpdateManyInput>
    /**
     * Filter which SesionUsuarios to update
     */
    where?: SesionUsuarioWhereInput
    /**
     * Limit how many SesionUsuarios to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SesionUsuarioIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SesionUsuario upsert
   */
  export type SesionUsuarioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SesionUsuario
     */
    select?: SesionUsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SesionUsuario
     */
    omit?: SesionUsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SesionUsuarioInclude<ExtArgs> | null
    /**
     * The filter to search for the SesionUsuario to update in case it exists.
     */
    where: SesionUsuarioWhereUniqueInput
    /**
     * In case the SesionUsuario found by the `where` argument doesn't exist, create a new SesionUsuario with this data.
     */
    create: XOR<SesionUsuarioCreateInput, SesionUsuarioUncheckedCreateInput>
    /**
     * In case the SesionUsuario was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SesionUsuarioUpdateInput, SesionUsuarioUncheckedUpdateInput>
  }

  /**
   * SesionUsuario delete
   */
  export type SesionUsuarioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SesionUsuario
     */
    select?: SesionUsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SesionUsuario
     */
    omit?: SesionUsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SesionUsuarioInclude<ExtArgs> | null
    /**
     * Filter which SesionUsuario to delete.
     */
    where: SesionUsuarioWhereUniqueInput
  }

  /**
   * SesionUsuario deleteMany
   */
  export type SesionUsuarioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SesionUsuarios to delete
     */
    where?: SesionUsuarioWhereInput
    /**
     * Limit how many SesionUsuarios to delete.
     */
    limit?: number
  }

  /**
   * SesionUsuario without action
   */
  export type SesionUsuarioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SesionUsuario
     */
    select?: SesionUsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SesionUsuario
     */
    omit?: SesionUsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SesionUsuarioInclude<ExtArgs> | null
  }


  /**
   * Model Tienda
   */

  export type AggregateTienda = {
    _count: TiendaCountAggregateOutputType | null
    _min: TiendaMinAggregateOutputType | null
    _max: TiendaMaxAggregateOutputType | null
  }

  export type TiendaMinAggregateOutputType = {
    tienda_id: string | null
    usuario_id: string | null
    nombre: string | null
    direccion: string | null
    logo_url: string | null
    is_activa: boolean | null
    horario: string | null
    telefono: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type TiendaMaxAggregateOutputType = {
    tienda_id: string | null
    usuario_id: string | null
    nombre: string | null
    direccion: string | null
    logo_url: string | null
    is_activa: boolean | null
    horario: string | null
    telefono: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type TiendaCountAggregateOutputType = {
    tienda_id: number
    usuario_id: number
    nombre: number
    direccion: number
    logo_url: number
    is_activa: number
    horario: number
    telefono: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type TiendaMinAggregateInputType = {
    tienda_id?: true
    usuario_id?: true
    nombre?: true
    direccion?: true
    logo_url?: true
    is_activa?: true
    horario?: true
    telefono?: true
    created_at?: true
    updated_at?: true
  }

  export type TiendaMaxAggregateInputType = {
    tienda_id?: true
    usuario_id?: true
    nombre?: true
    direccion?: true
    logo_url?: true
    is_activa?: true
    horario?: true
    telefono?: true
    created_at?: true
    updated_at?: true
  }

  export type TiendaCountAggregateInputType = {
    tienda_id?: true
    usuario_id?: true
    nombre?: true
    direccion?: true
    logo_url?: true
    is_activa?: true
    horario?: true
    telefono?: true
    created_at?: true
    updated_at?: true
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
    _min?: TiendaMinAggregateInputType
    _max?: TiendaMaxAggregateInputType
  }

  export type TiendaGroupByOutputType = {
    tienda_id: string
    usuario_id: string
    nombre: string
    direccion: string | null
    logo_url: string | null
    is_activa: boolean
    horario: string | null
    telefono: string | null
    created_at: Date
    updated_at: Date
    _count: TiendaCountAggregateOutputType | null
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
    logo_url?: boolean
    is_activa?: boolean
    horario?: boolean
    telefono?: boolean
    created_at?: boolean
    updated_at?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    multas?: boolean | Tienda$multasArgs<ExtArgs>
    _count?: boolean | TiendaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tienda"]>

  export type TiendaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    tienda_id?: boolean
    usuario_id?: boolean
    nombre?: boolean
    direccion?: boolean
    logo_url?: boolean
    is_activa?: boolean
    horario?: boolean
    telefono?: boolean
    created_at?: boolean
    updated_at?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tienda"]>

  export type TiendaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    tienda_id?: boolean
    usuario_id?: boolean
    nombre?: boolean
    direccion?: boolean
    logo_url?: boolean
    is_activa?: boolean
    horario?: boolean
    telefono?: boolean
    created_at?: boolean
    updated_at?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tienda"]>

  export type TiendaSelectScalar = {
    tienda_id?: boolean
    usuario_id?: boolean
    nombre?: boolean
    direccion?: boolean
    logo_url?: boolean
    is_activa?: boolean
    horario?: boolean
    telefono?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type TiendaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"tienda_id" | "usuario_id" | "nombre" | "direccion" | "logo_url" | "is_activa" | "horario" | "telefono" | "created_at" | "updated_at", ExtArgs["result"]["tienda"]>
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
      logo_url: string | null
      is_activa: boolean
      horario: string | null
      telefono: string | null
      created_at: Date
      updated_at: Date
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
    readonly logo_url: FieldRef<"Tienda", 'String'>
    readonly is_activa: FieldRef<"Tienda", 'Boolean'>
    readonly horario: FieldRef<"Tienda", 'String'>
    readonly telefono: FieldRef<"Tienda", 'String'>
    readonly created_at: FieldRef<"Tienda", 'DateTime'>
    readonly updated_at: FieldRef<"Tienda", 'DateTime'>
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
    usuario_id: string | null
    fecha_emision: Date | null
    motivo: string | null
    monto: Decimal | null
    estado: $Enums.EstadoMulta | null
    fecha_pago: Date | null
    evidencia_url: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type MultaMaxAggregateOutputType = {
    multa_id: string | null
    tienda_id: string | null
    usuario_id: string | null
    fecha_emision: Date | null
    motivo: string | null
    monto: Decimal | null
    estado: $Enums.EstadoMulta | null
    fecha_pago: Date | null
    evidencia_url: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type MultaCountAggregateOutputType = {
    multa_id: number
    tienda_id: number
    usuario_id: number
    fecha_emision: number
    motivo: number
    monto: number
    estado: number
    fecha_pago: number
    evidencia_url: number
    created_at: number
    updated_at: number
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
    usuario_id?: true
    fecha_emision?: true
    motivo?: true
    monto?: true
    estado?: true
    fecha_pago?: true
    evidencia_url?: true
    created_at?: true
    updated_at?: true
  }

  export type MultaMaxAggregateInputType = {
    multa_id?: true
    tienda_id?: true
    usuario_id?: true
    fecha_emision?: true
    motivo?: true
    monto?: true
    estado?: true
    fecha_pago?: true
    evidencia_url?: true
    created_at?: true
    updated_at?: true
  }

  export type MultaCountAggregateInputType = {
    multa_id?: true
    tienda_id?: true
    usuario_id?: true
    fecha_emision?: true
    motivo?: true
    monto?: true
    estado?: true
    fecha_pago?: true
    evidencia_url?: true
    created_at?: true
    updated_at?: true
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
    usuario_id: string | null
    fecha_emision: Date
    motivo: string
    monto: Decimal
    estado: $Enums.EstadoMulta
    fecha_pago: Date | null
    evidencia_url: string | null
    created_at: Date
    updated_at: Date
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
    usuario_id?: boolean
    fecha_emision?: boolean
    motivo?: boolean
    monto?: boolean
    estado?: boolean
    fecha_pago?: boolean
    evidencia_url?: boolean
    created_at?: boolean
    updated_at?: boolean
    tienda?: boolean | TiendaDefaultArgs<ExtArgs>
    usuario?: boolean | Multa$usuarioArgs<ExtArgs>
  }, ExtArgs["result"]["multa"]>

  export type MultaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    multa_id?: boolean
    tienda_id?: boolean
    usuario_id?: boolean
    fecha_emision?: boolean
    motivo?: boolean
    monto?: boolean
    estado?: boolean
    fecha_pago?: boolean
    evidencia_url?: boolean
    created_at?: boolean
    updated_at?: boolean
    tienda?: boolean | TiendaDefaultArgs<ExtArgs>
    usuario?: boolean | Multa$usuarioArgs<ExtArgs>
  }, ExtArgs["result"]["multa"]>

  export type MultaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    multa_id?: boolean
    tienda_id?: boolean
    usuario_id?: boolean
    fecha_emision?: boolean
    motivo?: boolean
    monto?: boolean
    estado?: boolean
    fecha_pago?: boolean
    evidencia_url?: boolean
    created_at?: boolean
    updated_at?: boolean
    tienda?: boolean | TiendaDefaultArgs<ExtArgs>
    usuario?: boolean | Multa$usuarioArgs<ExtArgs>
  }, ExtArgs["result"]["multa"]>

  export type MultaSelectScalar = {
    multa_id?: boolean
    tienda_id?: boolean
    usuario_id?: boolean
    fecha_emision?: boolean
    motivo?: boolean
    monto?: boolean
    estado?: boolean
    fecha_pago?: boolean
    evidencia_url?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type MultaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"multa_id" | "tienda_id" | "usuario_id" | "fecha_emision" | "motivo" | "monto" | "estado" | "fecha_pago" | "evidencia_url" | "created_at" | "updated_at", ExtArgs["result"]["multa"]>
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
      usuario_id: string | null
      fecha_emision: Date
      motivo: string
      monto: Prisma.Decimal
      estado: $Enums.EstadoMulta
      fecha_pago: Date | null
      evidencia_url: string | null
      created_at: Date
      updated_at: Date
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
    readonly usuario_id: FieldRef<"Multa", 'String'>
    readonly fecha_emision: FieldRef<"Multa", 'DateTime'>
    readonly motivo: FieldRef<"Multa", 'String'>
    readonly monto: FieldRef<"Multa", 'Decimal'>
    readonly estado: FieldRef<"Multa", 'EstadoMulta'>
    readonly fecha_pago: FieldRef<"Multa", 'DateTime'>
    readonly evidencia_url: FieldRef<"Multa", 'String'>
    readonly created_at: FieldRef<"Multa", 'DateTime'>
    readonly updated_at: FieldRef<"Multa", 'DateTime'>
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
    tipo_usuario: 'tipo_usuario',
    is_verified: 'is_verified',
    is_active: 'is_active',
    last_login: 'last_login',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type UsuarioScalarFieldEnum = (typeof UsuarioScalarFieldEnum)[keyof typeof UsuarioScalarFieldEnum]


  export const PerfilUsuarioScalarFieldEnum: {
    perfil_id: 'perfil_id',
    usuario_id: 'usuario_id',
    telefono: 'telefono',
    direccion: 'direccion',
    fecha_nacimiento: 'fecha_nacimiento',
    avatar_url: 'avatar_url',
    preferencias: 'preferencias',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type PerfilUsuarioScalarFieldEnum = (typeof PerfilUsuarioScalarFieldEnum)[keyof typeof PerfilUsuarioScalarFieldEnum]


  export const SesionUsuarioScalarFieldEnum: {
    sesion_id: 'sesion_id',
    usuario_id: 'usuario_id',
    token: 'token',
    expires_at: 'expires_at',
    is_active: 'is_active',
    user_agent: 'user_agent',
    ip_address: 'ip_address',
    created_at: 'created_at'
  };

  export type SesionUsuarioScalarFieldEnum = (typeof SesionUsuarioScalarFieldEnum)[keyof typeof SesionUsuarioScalarFieldEnum]


  export const TiendaScalarFieldEnum: {
    tienda_id: 'tienda_id',
    usuario_id: 'usuario_id',
    nombre: 'nombre',
    direccion: 'direccion',
    logo_url: 'logo_url',
    is_activa: 'is_activa',
    horario: 'horario',
    telefono: 'telefono',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type TiendaScalarFieldEnum = (typeof TiendaScalarFieldEnum)[keyof typeof TiendaScalarFieldEnum]


  export const MultaScalarFieldEnum: {
    multa_id: 'multa_id',
    tienda_id: 'tienda_id',
    usuario_id: 'usuario_id',
    fecha_emision: 'fecha_emision',
    motivo: 'motivo',
    monto: 'monto',
    estado: 'estado',
    fecha_pago: 'fecha_pago',
    evidencia_url: 'evidencia_url',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type MultaScalarFieldEnum = (typeof MultaScalarFieldEnum)[keyof typeof MultaScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


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


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


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
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


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
    is_verified?: BoolFilter<"Usuario"> | boolean
    is_active?: BoolFilter<"Usuario"> | boolean
    last_login?: DateTimeNullableFilter<"Usuario"> | Date | string | null
    created_at?: DateTimeFilter<"Usuario"> | Date | string
    updated_at?: DateTimeFilter<"Usuario"> | Date | string
    tienda?: XOR<TiendaNullableScalarRelationFilter, TiendaWhereInput> | null
    multas?: MultaListRelationFilter
    perfil?: XOR<PerfilUsuarioNullableScalarRelationFilter, PerfilUsuarioWhereInput> | null
    sesiones?: SesionUsuarioListRelationFilter
  }

  export type UsuarioOrderByWithRelationInput = {
    usuario_id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    nombre?: SortOrder
    tipo_usuario?: SortOrder
    is_verified?: SortOrder
    is_active?: SortOrder
    last_login?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    tienda?: TiendaOrderByWithRelationInput
    multas?: MultaOrderByRelationAggregateInput
    perfil?: PerfilUsuarioOrderByWithRelationInput
    sesiones?: SesionUsuarioOrderByRelationAggregateInput
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
    is_verified?: BoolFilter<"Usuario"> | boolean
    is_active?: BoolFilter<"Usuario"> | boolean
    last_login?: DateTimeNullableFilter<"Usuario"> | Date | string | null
    created_at?: DateTimeFilter<"Usuario"> | Date | string
    updated_at?: DateTimeFilter<"Usuario"> | Date | string
    tienda?: XOR<TiendaNullableScalarRelationFilter, TiendaWhereInput> | null
    multas?: MultaListRelationFilter
    perfil?: XOR<PerfilUsuarioNullableScalarRelationFilter, PerfilUsuarioWhereInput> | null
    sesiones?: SesionUsuarioListRelationFilter
  }, "usuario_id" | "email">

  export type UsuarioOrderByWithAggregationInput = {
    usuario_id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    nombre?: SortOrder
    tipo_usuario?: SortOrder
    is_verified?: SortOrder
    is_active?: SortOrder
    last_login?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
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
    is_verified?: BoolWithAggregatesFilter<"Usuario"> | boolean
    is_active?: BoolWithAggregatesFilter<"Usuario"> | boolean
    last_login?: DateTimeNullableWithAggregatesFilter<"Usuario"> | Date | string | null
    created_at?: DateTimeWithAggregatesFilter<"Usuario"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Usuario"> | Date | string
  }

  export type PerfilUsuarioWhereInput = {
    AND?: PerfilUsuarioWhereInput | PerfilUsuarioWhereInput[]
    OR?: PerfilUsuarioWhereInput[]
    NOT?: PerfilUsuarioWhereInput | PerfilUsuarioWhereInput[]
    perfil_id?: StringFilter<"PerfilUsuario"> | string
    usuario_id?: StringFilter<"PerfilUsuario"> | string
    telefono?: StringNullableFilter<"PerfilUsuario"> | string | null
    direccion?: StringNullableFilter<"PerfilUsuario"> | string | null
    fecha_nacimiento?: DateTimeNullableFilter<"PerfilUsuario"> | Date | string | null
    avatar_url?: StringNullableFilter<"PerfilUsuario"> | string | null
    preferencias?: JsonNullableFilter<"PerfilUsuario">
    created_at?: DateTimeFilter<"PerfilUsuario"> | Date | string
    updated_at?: DateTimeFilter<"PerfilUsuario"> | Date | string
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
  }

  export type PerfilUsuarioOrderByWithRelationInput = {
    perfil_id?: SortOrder
    usuario_id?: SortOrder
    telefono?: SortOrderInput | SortOrder
    direccion?: SortOrderInput | SortOrder
    fecha_nacimiento?: SortOrderInput | SortOrder
    avatar_url?: SortOrderInput | SortOrder
    preferencias?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    usuario?: UsuarioOrderByWithRelationInput
  }

  export type PerfilUsuarioWhereUniqueInput = Prisma.AtLeast<{
    perfil_id?: string
    usuario_id?: string
    AND?: PerfilUsuarioWhereInput | PerfilUsuarioWhereInput[]
    OR?: PerfilUsuarioWhereInput[]
    NOT?: PerfilUsuarioWhereInput | PerfilUsuarioWhereInput[]
    telefono?: StringNullableFilter<"PerfilUsuario"> | string | null
    direccion?: StringNullableFilter<"PerfilUsuario"> | string | null
    fecha_nacimiento?: DateTimeNullableFilter<"PerfilUsuario"> | Date | string | null
    avatar_url?: StringNullableFilter<"PerfilUsuario"> | string | null
    preferencias?: JsonNullableFilter<"PerfilUsuario">
    created_at?: DateTimeFilter<"PerfilUsuario"> | Date | string
    updated_at?: DateTimeFilter<"PerfilUsuario"> | Date | string
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
  }, "perfil_id" | "usuario_id">

  export type PerfilUsuarioOrderByWithAggregationInput = {
    perfil_id?: SortOrder
    usuario_id?: SortOrder
    telefono?: SortOrderInput | SortOrder
    direccion?: SortOrderInput | SortOrder
    fecha_nacimiento?: SortOrderInput | SortOrder
    avatar_url?: SortOrderInput | SortOrder
    preferencias?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: PerfilUsuarioCountOrderByAggregateInput
    _max?: PerfilUsuarioMaxOrderByAggregateInput
    _min?: PerfilUsuarioMinOrderByAggregateInput
  }

  export type PerfilUsuarioScalarWhereWithAggregatesInput = {
    AND?: PerfilUsuarioScalarWhereWithAggregatesInput | PerfilUsuarioScalarWhereWithAggregatesInput[]
    OR?: PerfilUsuarioScalarWhereWithAggregatesInput[]
    NOT?: PerfilUsuarioScalarWhereWithAggregatesInput | PerfilUsuarioScalarWhereWithAggregatesInput[]
    perfil_id?: StringWithAggregatesFilter<"PerfilUsuario"> | string
    usuario_id?: StringWithAggregatesFilter<"PerfilUsuario"> | string
    telefono?: StringNullableWithAggregatesFilter<"PerfilUsuario"> | string | null
    direccion?: StringNullableWithAggregatesFilter<"PerfilUsuario"> | string | null
    fecha_nacimiento?: DateTimeNullableWithAggregatesFilter<"PerfilUsuario"> | Date | string | null
    avatar_url?: StringNullableWithAggregatesFilter<"PerfilUsuario"> | string | null
    preferencias?: JsonNullableWithAggregatesFilter<"PerfilUsuario">
    created_at?: DateTimeWithAggregatesFilter<"PerfilUsuario"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"PerfilUsuario"> | Date | string
  }

  export type SesionUsuarioWhereInput = {
    AND?: SesionUsuarioWhereInput | SesionUsuarioWhereInput[]
    OR?: SesionUsuarioWhereInput[]
    NOT?: SesionUsuarioWhereInput | SesionUsuarioWhereInput[]
    sesion_id?: StringFilter<"SesionUsuario"> | string
    usuario_id?: StringFilter<"SesionUsuario"> | string
    token?: StringFilter<"SesionUsuario"> | string
    expires_at?: DateTimeFilter<"SesionUsuario"> | Date | string
    is_active?: BoolFilter<"SesionUsuario"> | boolean
    user_agent?: StringNullableFilter<"SesionUsuario"> | string | null
    ip_address?: StringNullableFilter<"SesionUsuario"> | string | null
    created_at?: DateTimeFilter<"SesionUsuario"> | Date | string
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
  }

  export type SesionUsuarioOrderByWithRelationInput = {
    sesion_id?: SortOrder
    usuario_id?: SortOrder
    token?: SortOrder
    expires_at?: SortOrder
    is_active?: SortOrder
    user_agent?: SortOrderInput | SortOrder
    ip_address?: SortOrderInput | SortOrder
    created_at?: SortOrder
    usuario?: UsuarioOrderByWithRelationInput
  }

  export type SesionUsuarioWhereUniqueInput = Prisma.AtLeast<{
    sesion_id?: string
    token?: string
    AND?: SesionUsuarioWhereInput | SesionUsuarioWhereInput[]
    OR?: SesionUsuarioWhereInput[]
    NOT?: SesionUsuarioWhereInput | SesionUsuarioWhereInput[]
    usuario_id?: StringFilter<"SesionUsuario"> | string
    expires_at?: DateTimeFilter<"SesionUsuario"> | Date | string
    is_active?: BoolFilter<"SesionUsuario"> | boolean
    user_agent?: StringNullableFilter<"SesionUsuario"> | string | null
    ip_address?: StringNullableFilter<"SesionUsuario"> | string | null
    created_at?: DateTimeFilter<"SesionUsuario"> | Date | string
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
  }, "sesion_id" | "token">

  export type SesionUsuarioOrderByWithAggregationInput = {
    sesion_id?: SortOrder
    usuario_id?: SortOrder
    token?: SortOrder
    expires_at?: SortOrder
    is_active?: SortOrder
    user_agent?: SortOrderInput | SortOrder
    ip_address?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: SesionUsuarioCountOrderByAggregateInput
    _max?: SesionUsuarioMaxOrderByAggregateInput
    _min?: SesionUsuarioMinOrderByAggregateInput
  }

  export type SesionUsuarioScalarWhereWithAggregatesInput = {
    AND?: SesionUsuarioScalarWhereWithAggregatesInput | SesionUsuarioScalarWhereWithAggregatesInput[]
    OR?: SesionUsuarioScalarWhereWithAggregatesInput[]
    NOT?: SesionUsuarioScalarWhereWithAggregatesInput | SesionUsuarioScalarWhereWithAggregatesInput[]
    sesion_id?: StringWithAggregatesFilter<"SesionUsuario"> | string
    usuario_id?: StringWithAggregatesFilter<"SesionUsuario"> | string
    token?: StringWithAggregatesFilter<"SesionUsuario"> | string
    expires_at?: DateTimeWithAggregatesFilter<"SesionUsuario"> | Date | string
    is_active?: BoolWithAggregatesFilter<"SesionUsuario"> | boolean
    user_agent?: StringNullableWithAggregatesFilter<"SesionUsuario"> | string | null
    ip_address?: StringNullableWithAggregatesFilter<"SesionUsuario"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"SesionUsuario"> | Date | string
  }

  export type TiendaWhereInput = {
    AND?: TiendaWhereInput | TiendaWhereInput[]
    OR?: TiendaWhereInput[]
    NOT?: TiendaWhereInput | TiendaWhereInput[]
    tienda_id?: StringFilter<"Tienda"> | string
    usuario_id?: StringFilter<"Tienda"> | string
    nombre?: StringFilter<"Tienda"> | string
    direccion?: StringNullableFilter<"Tienda"> | string | null
    logo_url?: StringNullableFilter<"Tienda"> | string | null
    is_activa?: BoolFilter<"Tienda"> | boolean
    horario?: StringNullableFilter<"Tienda"> | string | null
    telefono?: StringNullableFilter<"Tienda"> | string | null
    created_at?: DateTimeFilter<"Tienda"> | Date | string
    updated_at?: DateTimeFilter<"Tienda"> | Date | string
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
    multas?: MultaListRelationFilter
  }

  export type TiendaOrderByWithRelationInput = {
    tienda_id?: SortOrder
    usuario_id?: SortOrder
    nombre?: SortOrder
    direccion?: SortOrderInput | SortOrder
    logo_url?: SortOrderInput | SortOrder
    is_activa?: SortOrder
    horario?: SortOrderInput | SortOrder
    telefono?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
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
    logo_url?: StringNullableFilter<"Tienda"> | string | null
    is_activa?: BoolFilter<"Tienda"> | boolean
    horario?: StringNullableFilter<"Tienda"> | string | null
    telefono?: StringNullableFilter<"Tienda"> | string | null
    created_at?: DateTimeFilter<"Tienda"> | Date | string
    updated_at?: DateTimeFilter<"Tienda"> | Date | string
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
    multas?: MultaListRelationFilter
  }, "tienda_id" | "usuario_id">

  export type TiendaOrderByWithAggregationInput = {
    tienda_id?: SortOrder
    usuario_id?: SortOrder
    nombre?: SortOrder
    direccion?: SortOrderInput | SortOrder
    logo_url?: SortOrderInput | SortOrder
    is_activa?: SortOrder
    horario?: SortOrderInput | SortOrder
    telefono?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: TiendaCountOrderByAggregateInput
    _max?: TiendaMaxOrderByAggregateInput
    _min?: TiendaMinOrderByAggregateInput
  }

  export type TiendaScalarWhereWithAggregatesInput = {
    AND?: TiendaScalarWhereWithAggregatesInput | TiendaScalarWhereWithAggregatesInput[]
    OR?: TiendaScalarWhereWithAggregatesInput[]
    NOT?: TiendaScalarWhereWithAggregatesInput | TiendaScalarWhereWithAggregatesInput[]
    tienda_id?: StringWithAggregatesFilter<"Tienda"> | string
    usuario_id?: StringWithAggregatesFilter<"Tienda"> | string
    nombre?: StringWithAggregatesFilter<"Tienda"> | string
    direccion?: StringNullableWithAggregatesFilter<"Tienda"> | string | null
    logo_url?: StringNullableWithAggregatesFilter<"Tienda"> | string | null
    is_activa?: BoolWithAggregatesFilter<"Tienda"> | boolean
    horario?: StringNullableWithAggregatesFilter<"Tienda"> | string | null
    telefono?: StringNullableWithAggregatesFilter<"Tienda"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"Tienda"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Tienda"> | Date | string
  }

  export type MultaWhereInput = {
    AND?: MultaWhereInput | MultaWhereInput[]
    OR?: MultaWhereInput[]
    NOT?: MultaWhereInput | MultaWhereInput[]
    multa_id?: StringFilter<"Multa"> | string
    tienda_id?: StringFilter<"Multa"> | string
    usuario_id?: StringNullableFilter<"Multa"> | string | null
    fecha_emision?: DateTimeFilter<"Multa"> | Date | string
    motivo?: StringFilter<"Multa"> | string
    monto?: DecimalFilter<"Multa"> | Decimal | DecimalJsLike | number | string
    estado?: EnumEstadoMultaFilter<"Multa"> | $Enums.EstadoMulta
    fecha_pago?: DateTimeNullableFilter<"Multa"> | Date | string | null
    evidencia_url?: StringNullableFilter<"Multa"> | string | null
    created_at?: DateTimeFilter<"Multa"> | Date | string
    updated_at?: DateTimeFilter<"Multa"> | Date | string
    tienda?: XOR<TiendaScalarRelationFilter, TiendaWhereInput>
    usuario?: XOR<UsuarioNullableScalarRelationFilter, UsuarioWhereInput> | null
  }

  export type MultaOrderByWithRelationInput = {
    multa_id?: SortOrder
    tienda_id?: SortOrder
    usuario_id?: SortOrderInput | SortOrder
    fecha_emision?: SortOrder
    motivo?: SortOrder
    monto?: SortOrder
    estado?: SortOrder
    fecha_pago?: SortOrderInput | SortOrder
    evidencia_url?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    tienda?: TiendaOrderByWithRelationInput
    usuario?: UsuarioOrderByWithRelationInput
  }

  export type MultaWhereUniqueInput = Prisma.AtLeast<{
    multa_id?: string
    AND?: MultaWhereInput | MultaWhereInput[]
    OR?: MultaWhereInput[]
    NOT?: MultaWhereInput | MultaWhereInput[]
    tienda_id?: StringFilter<"Multa"> | string
    usuario_id?: StringNullableFilter<"Multa"> | string | null
    fecha_emision?: DateTimeFilter<"Multa"> | Date | string
    motivo?: StringFilter<"Multa"> | string
    monto?: DecimalFilter<"Multa"> | Decimal | DecimalJsLike | number | string
    estado?: EnumEstadoMultaFilter<"Multa"> | $Enums.EstadoMulta
    fecha_pago?: DateTimeNullableFilter<"Multa"> | Date | string | null
    evidencia_url?: StringNullableFilter<"Multa"> | string | null
    created_at?: DateTimeFilter<"Multa"> | Date | string
    updated_at?: DateTimeFilter<"Multa"> | Date | string
    tienda?: XOR<TiendaScalarRelationFilter, TiendaWhereInput>
    usuario?: XOR<UsuarioNullableScalarRelationFilter, UsuarioWhereInput> | null
  }, "multa_id">

  export type MultaOrderByWithAggregationInput = {
    multa_id?: SortOrder
    tienda_id?: SortOrder
    usuario_id?: SortOrderInput | SortOrder
    fecha_emision?: SortOrder
    motivo?: SortOrder
    monto?: SortOrder
    estado?: SortOrder
    fecha_pago?: SortOrderInput | SortOrder
    evidencia_url?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
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
    usuario_id?: StringNullableWithAggregatesFilter<"Multa"> | string | null
    fecha_emision?: DateTimeWithAggregatesFilter<"Multa"> | Date | string
    motivo?: StringWithAggregatesFilter<"Multa"> | string
    monto?: DecimalWithAggregatesFilter<"Multa"> | Decimal | DecimalJsLike | number | string
    estado?: EnumEstadoMultaWithAggregatesFilter<"Multa"> | $Enums.EstadoMulta
    fecha_pago?: DateTimeNullableWithAggregatesFilter<"Multa"> | Date | string | null
    evidencia_url?: StringNullableWithAggregatesFilter<"Multa"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"Multa"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Multa"> | Date | string
  }

  export type UsuarioCreateInput = {
    usuario_id?: string
    email: string
    password_hash: string
    nombre: string
    tipo_usuario: $Enums.TipoUsuario
    is_verified?: boolean
    is_active?: boolean
    last_login?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    tienda?: TiendaCreateNestedOneWithoutUsuarioInput
    multas?: MultaCreateNestedManyWithoutUsuarioInput
    perfil?: PerfilUsuarioCreateNestedOneWithoutUsuarioInput
    sesiones?: SesionUsuarioCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateInput = {
    usuario_id?: string
    email: string
    password_hash: string
    nombre: string
    tipo_usuario: $Enums.TipoUsuario
    is_verified?: boolean
    is_active?: boolean
    last_login?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    tienda?: TiendaUncheckedCreateNestedOneWithoutUsuarioInput
    multas?: MultaUncheckedCreateNestedManyWithoutUsuarioInput
    perfil?: PerfilUsuarioUncheckedCreateNestedOneWithoutUsuarioInput
    sesiones?: SesionUsuarioUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUpdateInput = {
    usuario_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    tipo_usuario?: EnumTipoUsuarioFieldUpdateOperationsInput | $Enums.TipoUsuario
    is_verified?: BoolFieldUpdateOperationsInput | boolean
    is_active?: BoolFieldUpdateOperationsInput | boolean
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tienda?: TiendaUpdateOneWithoutUsuarioNestedInput
    multas?: MultaUpdateManyWithoutUsuarioNestedInput
    perfil?: PerfilUsuarioUpdateOneWithoutUsuarioNestedInput
    sesiones?: SesionUsuarioUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateInput = {
    usuario_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    tipo_usuario?: EnumTipoUsuarioFieldUpdateOperationsInput | $Enums.TipoUsuario
    is_verified?: BoolFieldUpdateOperationsInput | boolean
    is_active?: BoolFieldUpdateOperationsInput | boolean
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tienda?: TiendaUncheckedUpdateOneWithoutUsuarioNestedInput
    multas?: MultaUncheckedUpdateManyWithoutUsuarioNestedInput
    perfil?: PerfilUsuarioUncheckedUpdateOneWithoutUsuarioNestedInput
    sesiones?: SesionUsuarioUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioCreateManyInput = {
    usuario_id?: string
    email: string
    password_hash: string
    nombre: string
    tipo_usuario: $Enums.TipoUsuario
    is_verified?: boolean
    is_active?: boolean
    last_login?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type UsuarioUpdateManyMutationInput = {
    usuario_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    tipo_usuario?: EnumTipoUsuarioFieldUpdateOperationsInput | $Enums.TipoUsuario
    is_verified?: BoolFieldUpdateOperationsInput | boolean
    is_active?: BoolFieldUpdateOperationsInput | boolean
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsuarioUncheckedUpdateManyInput = {
    usuario_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    tipo_usuario?: EnumTipoUsuarioFieldUpdateOperationsInput | $Enums.TipoUsuario
    is_verified?: BoolFieldUpdateOperationsInput | boolean
    is_active?: BoolFieldUpdateOperationsInput | boolean
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PerfilUsuarioCreateInput = {
    perfil_id?: string
    telefono?: string | null
    direccion?: string | null
    fecha_nacimiento?: Date | string | null
    avatar_url?: string | null
    preferencias?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    usuario: UsuarioCreateNestedOneWithoutPerfilInput
  }

  export type PerfilUsuarioUncheckedCreateInput = {
    perfil_id?: string
    usuario_id: string
    telefono?: string | null
    direccion?: string | null
    fecha_nacimiento?: Date | string | null
    avatar_url?: string | null
    preferencias?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type PerfilUsuarioUpdateInput = {
    perfil_id?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_nacimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
    preferencias?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneRequiredWithoutPerfilNestedInput
  }

  export type PerfilUsuarioUncheckedUpdateInput = {
    perfil_id?: StringFieldUpdateOperationsInput | string
    usuario_id?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_nacimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
    preferencias?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PerfilUsuarioCreateManyInput = {
    perfil_id?: string
    usuario_id: string
    telefono?: string | null
    direccion?: string | null
    fecha_nacimiento?: Date | string | null
    avatar_url?: string | null
    preferencias?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type PerfilUsuarioUpdateManyMutationInput = {
    perfil_id?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_nacimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
    preferencias?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PerfilUsuarioUncheckedUpdateManyInput = {
    perfil_id?: StringFieldUpdateOperationsInput | string
    usuario_id?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_nacimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
    preferencias?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SesionUsuarioCreateInput = {
    sesion_id?: string
    token: string
    expires_at: Date | string
    is_active?: boolean
    user_agent?: string | null
    ip_address?: string | null
    created_at?: Date | string
    usuario: UsuarioCreateNestedOneWithoutSesionesInput
  }

  export type SesionUsuarioUncheckedCreateInput = {
    sesion_id?: string
    usuario_id: string
    token: string
    expires_at: Date | string
    is_active?: boolean
    user_agent?: string | null
    ip_address?: string | null
    created_at?: Date | string
  }

  export type SesionUsuarioUpdateInput = {
    sesion_id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneRequiredWithoutSesionesNestedInput
  }

  export type SesionUsuarioUncheckedUpdateInput = {
    sesion_id?: StringFieldUpdateOperationsInput | string
    usuario_id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SesionUsuarioCreateManyInput = {
    sesion_id?: string
    usuario_id: string
    token: string
    expires_at: Date | string
    is_active?: boolean
    user_agent?: string | null
    ip_address?: string | null
    created_at?: Date | string
  }

  export type SesionUsuarioUpdateManyMutationInput = {
    sesion_id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SesionUsuarioUncheckedUpdateManyInput = {
    sesion_id?: StringFieldUpdateOperationsInput | string
    usuario_id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TiendaCreateInput = {
    tienda_id?: string
    nombre: string
    direccion?: string | null
    logo_url?: string | null
    is_activa?: boolean
    horario?: string | null
    telefono?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    usuario: UsuarioCreateNestedOneWithoutTiendaInput
    multas?: MultaCreateNestedManyWithoutTiendaInput
  }

  export type TiendaUncheckedCreateInput = {
    tienda_id?: string
    usuario_id: string
    nombre: string
    direccion?: string | null
    logo_url?: string | null
    is_activa?: boolean
    horario?: string | null
    telefono?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    multas?: MultaUncheckedCreateNestedManyWithoutTiendaInput
  }

  export type TiendaUpdateInput = {
    tienda_id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_activa?: BoolFieldUpdateOperationsInput | boolean
    horario?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneRequiredWithoutTiendaNestedInput
    multas?: MultaUpdateManyWithoutTiendaNestedInput
  }

  export type TiendaUncheckedUpdateInput = {
    tienda_id?: StringFieldUpdateOperationsInput | string
    usuario_id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_activa?: BoolFieldUpdateOperationsInput | boolean
    horario?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    multas?: MultaUncheckedUpdateManyWithoutTiendaNestedInput
  }

  export type TiendaCreateManyInput = {
    tienda_id?: string
    usuario_id: string
    nombre: string
    direccion?: string | null
    logo_url?: string | null
    is_activa?: boolean
    horario?: string | null
    telefono?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type TiendaUpdateManyMutationInput = {
    tienda_id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_activa?: BoolFieldUpdateOperationsInput | boolean
    horario?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TiendaUncheckedUpdateManyInput = {
    tienda_id?: StringFieldUpdateOperationsInput | string
    usuario_id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_activa?: BoolFieldUpdateOperationsInput | boolean
    horario?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MultaCreateInput = {
    multa_id?: string
    fecha_emision?: Date | string
    motivo: string
    monto: Decimal | DecimalJsLike | number | string
    estado?: $Enums.EstadoMulta
    fecha_pago?: Date | string | null
    evidencia_url?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    tienda: TiendaCreateNestedOneWithoutMultasInput
    usuario?: UsuarioCreateNestedOneWithoutMultasInput
  }

  export type MultaUncheckedCreateInput = {
    multa_id?: string
    tienda_id: string
    usuario_id?: string | null
    fecha_emision?: Date | string
    motivo: string
    monto: Decimal | DecimalJsLike | number | string
    estado?: $Enums.EstadoMulta
    fecha_pago?: Date | string | null
    evidencia_url?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type MultaUpdateInput = {
    multa_id?: StringFieldUpdateOperationsInput | string
    fecha_emision?: DateTimeFieldUpdateOperationsInput | Date | string
    motivo?: StringFieldUpdateOperationsInput | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    estado?: EnumEstadoMultaFieldUpdateOperationsInput | $Enums.EstadoMulta
    fecha_pago?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    evidencia_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tienda?: TiendaUpdateOneRequiredWithoutMultasNestedInput
    usuario?: UsuarioUpdateOneWithoutMultasNestedInput
  }

  export type MultaUncheckedUpdateInput = {
    multa_id?: StringFieldUpdateOperationsInput | string
    tienda_id?: StringFieldUpdateOperationsInput | string
    usuario_id?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_emision?: DateTimeFieldUpdateOperationsInput | Date | string
    motivo?: StringFieldUpdateOperationsInput | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    estado?: EnumEstadoMultaFieldUpdateOperationsInput | $Enums.EstadoMulta
    fecha_pago?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    evidencia_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MultaCreateManyInput = {
    multa_id?: string
    tienda_id: string
    usuario_id?: string | null
    fecha_emision?: Date | string
    motivo: string
    monto: Decimal | DecimalJsLike | number | string
    estado?: $Enums.EstadoMulta
    fecha_pago?: Date | string | null
    evidencia_url?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type MultaUpdateManyMutationInput = {
    multa_id?: StringFieldUpdateOperationsInput | string
    fecha_emision?: DateTimeFieldUpdateOperationsInput | Date | string
    motivo?: StringFieldUpdateOperationsInput | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    estado?: EnumEstadoMultaFieldUpdateOperationsInput | $Enums.EstadoMulta
    fecha_pago?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    evidencia_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MultaUncheckedUpdateManyInput = {
    multa_id?: StringFieldUpdateOperationsInput | string
    tienda_id?: StringFieldUpdateOperationsInput | string
    usuario_id?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_emision?: DateTimeFieldUpdateOperationsInput | Date | string
    motivo?: StringFieldUpdateOperationsInput | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    estado?: EnumEstadoMultaFieldUpdateOperationsInput | $Enums.EstadoMulta
    fecha_pago?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    evidencia_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
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

  export type TiendaNullableScalarRelationFilter = {
    is?: TiendaWhereInput | null
    isNot?: TiendaWhereInput | null
  }

  export type MultaListRelationFilter = {
    every?: MultaWhereInput
    some?: MultaWhereInput
    none?: MultaWhereInput
  }

  export type PerfilUsuarioNullableScalarRelationFilter = {
    is?: PerfilUsuarioWhereInput | null
    isNot?: PerfilUsuarioWhereInput | null
  }

  export type SesionUsuarioListRelationFilter = {
    every?: SesionUsuarioWhereInput
    some?: SesionUsuarioWhereInput
    none?: SesionUsuarioWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MultaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SesionUsuarioOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UsuarioCountOrderByAggregateInput = {
    usuario_id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    nombre?: SortOrder
    tipo_usuario?: SortOrder
    is_verified?: SortOrder
    is_active?: SortOrder
    last_login?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UsuarioMaxOrderByAggregateInput = {
    usuario_id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    nombre?: SortOrder
    tipo_usuario?: SortOrder
    is_verified?: SortOrder
    is_active?: SortOrder
    last_login?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UsuarioMinOrderByAggregateInput = {
    usuario_id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    nombre?: SortOrder
    tipo_usuario?: SortOrder
    is_verified?: SortOrder
    is_active?: SortOrder
    last_login?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
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
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type UsuarioScalarRelationFilter = {
    is?: UsuarioWhereInput
    isNot?: UsuarioWhereInput
  }

  export type PerfilUsuarioCountOrderByAggregateInput = {
    perfil_id?: SortOrder
    usuario_id?: SortOrder
    telefono?: SortOrder
    direccion?: SortOrder
    fecha_nacimiento?: SortOrder
    avatar_url?: SortOrder
    preferencias?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type PerfilUsuarioMaxOrderByAggregateInput = {
    perfil_id?: SortOrder
    usuario_id?: SortOrder
    telefono?: SortOrder
    direccion?: SortOrder
    fecha_nacimiento?: SortOrder
    avatar_url?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type PerfilUsuarioMinOrderByAggregateInput = {
    perfil_id?: SortOrder
    usuario_id?: SortOrder
    telefono?: SortOrder
    direccion?: SortOrder
    fecha_nacimiento?: SortOrder
    avatar_url?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
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
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type SesionUsuarioCountOrderByAggregateInput = {
    sesion_id?: SortOrder
    usuario_id?: SortOrder
    token?: SortOrder
    expires_at?: SortOrder
    is_active?: SortOrder
    user_agent?: SortOrder
    ip_address?: SortOrder
    created_at?: SortOrder
  }

  export type SesionUsuarioMaxOrderByAggregateInput = {
    sesion_id?: SortOrder
    usuario_id?: SortOrder
    token?: SortOrder
    expires_at?: SortOrder
    is_active?: SortOrder
    user_agent?: SortOrder
    ip_address?: SortOrder
    created_at?: SortOrder
  }

  export type SesionUsuarioMinOrderByAggregateInput = {
    sesion_id?: SortOrder
    usuario_id?: SortOrder
    token?: SortOrder
    expires_at?: SortOrder
    is_active?: SortOrder
    user_agent?: SortOrder
    ip_address?: SortOrder
    created_at?: SortOrder
  }

  export type TiendaCountOrderByAggregateInput = {
    tienda_id?: SortOrder
    usuario_id?: SortOrder
    nombre?: SortOrder
    direccion?: SortOrder
    logo_url?: SortOrder
    is_activa?: SortOrder
    horario?: SortOrder
    telefono?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type TiendaMaxOrderByAggregateInput = {
    tienda_id?: SortOrder
    usuario_id?: SortOrder
    nombre?: SortOrder
    direccion?: SortOrder
    logo_url?: SortOrder
    is_activa?: SortOrder
    horario?: SortOrder
    telefono?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type TiendaMinOrderByAggregateInput = {
    tienda_id?: SortOrder
    usuario_id?: SortOrder
    nombre?: SortOrder
    direccion?: SortOrder
    logo_url?: SortOrder
    is_activa?: SortOrder
    horario?: SortOrder
    telefono?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
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
    usuario_id?: SortOrder
    fecha_emision?: SortOrder
    motivo?: SortOrder
    monto?: SortOrder
    estado?: SortOrder
    fecha_pago?: SortOrder
    evidencia_url?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type MultaAvgOrderByAggregateInput = {
    monto?: SortOrder
  }

  export type MultaMaxOrderByAggregateInput = {
    multa_id?: SortOrder
    tienda_id?: SortOrder
    usuario_id?: SortOrder
    fecha_emision?: SortOrder
    motivo?: SortOrder
    monto?: SortOrder
    estado?: SortOrder
    fecha_pago?: SortOrder
    evidencia_url?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type MultaMinOrderByAggregateInput = {
    multa_id?: SortOrder
    tienda_id?: SortOrder
    usuario_id?: SortOrder
    fecha_emision?: SortOrder
    motivo?: SortOrder
    monto?: SortOrder
    estado?: SortOrder
    fecha_pago?: SortOrder
    evidencia_url?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type MultaSumOrderByAggregateInput = {
    monto?: SortOrder
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

  export type PerfilUsuarioCreateNestedOneWithoutUsuarioInput = {
    create?: XOR<PerfilUsuarioCreateWithoutUsuarioInput, PerfilUsuarioUncheckedCreateWithoutUsuarioInput>
    connectOrCreate?: PerfilUsuarioCreateOrConnectWithoutUsuarioInput
    connect?: PerfilUsuarioWhereUniqueInput
  }

  export type SesionUsuarioCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<SesionUsuarioCreateWithoutUsuarioInput, SesionUsuarioUncheckedCreateWithoutUsuarioInput> | SesionUsuarioCreateWithoutUsuarioInput[] | SesionUsuarioUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: SesionUsuarioCreateOrConnectWithoutUsuarioInput | SesionUsuarioCreateOrConnectWithoutUsuarioInput[]
    createMany?: SesionUsuarioCreateManyUsuarioInputEnvelope
    connect?: SesionUsuarioWhereUniqueInput | SesionUsuarioWhereUniqueInput[]
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

  export type PerfilUsuarioUncheckedCreateNestedOneWithoutUsuarioInput = {
    create?: XOR<PerfilUsuarioCreateWithoutUsuarioInput, PerfilUsuarioUncheckedCreateWithoutUsuarioInput>
    connectOrCreate?: PerfilUsuarioCreateOrConnectWithoutUsuarioInput
    connect?: PerfilUsuarioWhereUniqueInput
  }

  export type SesionUsuarioUncheckedCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<SesionUsuarioCreateWithoutUsuarioInput, SesionUsuarioUncheckedCreateWithoutUsuarioInput> | SesionUsuarioCreateWithoutUsuarioInput[] | SesionUsuarioUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: SesionUsuarioCreateOrConnectWithoutUsuarioInput | SesionUsuarioCreateOrConnectWithoutUsuarioInput[]
    createMany?: SesionUsuarioCreateManyUsuarioInputEnvelope
    connect?: SesionUsuarioWhereUniqueInput | SesionUsuarioWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumTipoUsuarioFieldUpdateOperationsInput = {
    set?: $Enums.TipoUsuario
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
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

  export type PerfilUsuarioUpdateOneWithoutUsuarioNestedInput = {
    create?: XOR<PerfilUsuarioCreateWithoutUsuarioInput, PerfilUsuarioUncheckedCreateWithoutUsuarioInput>
    connectOrCreate?: PerfilUsuarioCreateOrConnectWithoutUsuarioInput
    upsert?: PerfilUsuarioUpsertWithoutUsuarioInput
    disconnect?: PerfilUsuarioWhereInput | boolean
    delete?: PerfilUsuarioWhereInput | boolean
    connect?: PerfilUsuarioWhereUniqueInput
    update?: XOR<XOR<PerfilUsuarioUpdateToOneWithWhereWithoutUsuarioInput, PerfilUsuarioUpdateWithoutUsuarioInput>, PerfilUsuarioUncheckedUpdateWithoutUsuarioInput>
  }

  export type SesionUsuarioUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<SesionUsuarioCreateWithoutUsuarioInput, SesionUsuarioUncheckedCreateWithoutUsuarioInput> | SesionUsuarioCreateWithoutUsuarioInput[] | SesionUsuarioUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: SesionUsuarioCreateOrConnectWithoutUsuarioInput | SesionUsuarioCreateOrConnectWithoutUsuarioInput[]
    upsert?: SesionUsuarioUpsertWithWhereUniqueWithoutUsuarioInput | SesionUsuarioUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: SesionUsuarioCreateManyUsuarioInputEnvelope
    set?: SesionUsuarioWhereUniqueInput | SesionUsuarioWhereUniqueInput[]
    disconnect?: SesionUsuarioWhereUniqueInput | SesionUsuarioWhereUniqueInput[]
    delete?: SesionUsuarioWhereUniqueInput | SesionUsuarioWhereUniqueInput[]
    connect?: SesionUsuarioWhereUniqueInput | SesionUsuarioWhereUniqueInput[]
    update?: SesionUsuarioUpdateWithWhereUniqueWithoutUsuarioInput | SesionUsuarioUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: SesionUsuarioUpdateManyWithWhereWithoutUsuarioInput | SesionUsuarioUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: SesionUsuarioScalarWhereInput | SesionUsuarioScalarWhereInput[]
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

  export type PerfilUsuarioUncheckedUpdateOneWithoutUsuarioNestedInput = {
    create?: XOR<PerfilUsuarioCreateWithoutUsuarioInput, PerfilUsuarioUncheckedCreateWithoutUsuarioInput>
    connectOrCreate?: PerfilUsuarioCreateOrConnectWithoutUsuarioInput
    upsert?: PerfilUsuarioUpsertWithoutUsuarioInput
    disconnect?: PerfilUsuarioWhereInput | boolean
    delete?: PerfilUsuarioWhereInput | boolean
    connect?: PerfilUsuarioWhereUniqueInput
    update?: XOR<XOR<PerfilUsuarioUpdateToOneWithWhereWithoutUsuarioInput, PerfilUsuarioUpdateWithoutUsuarioInput>, PerfilUsuarioUncheckedUpdateWithoutUsuarioInput>
  }

  export type SesionUsuarioUncheckedUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<SesionUsuarioCreateWithoutUsuarioInput, SesionUsuarioUncheckedCreateWithoutUsuarioInput> | SesionUsuarioCreateWithoutUsuarioInput[] | SesionUsuarioUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: SesionUsuarioCreateOrConnectWithoutUsuarioInput | SesionUsuarioCreateOrConnectWithoutUsuarioInput[]
    upsert?: SesionUsuarioUpsertWithWhereUniqueWithoutUsuarioInput | SesionUsuarioUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: SesionUsuarioCreateManyUsuarioInputEnvelope
    set?: SesionUsuarioWhereUniqueInput | SesionUsuarioWhereUniqueInput[]
    disconnect?: SesionUsuarioWhereUniqueInput | SesionUsuarioWhereUniqueInput[]
    delete?: SesionUsuarioWhereUniqueInput | SesionUsuarioWhereUniqueInput[]
    connect?: SesionUsuarioWhereUniqueInput | SesionUsuarioWhereUniqueInput[]
    update?: SesionUsuarioUpdateWithWhereUniqueWithoutUsuarioInput | SesionUsuarioUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: SesionUsuarioUpdateManyWithWhereWithoutUsuarioInput | SesionUsuarioUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: SesionUsuarioScalarWhereInput | SesionUsuarioScalarWhereInput[]
  }

  export type UsuarioCreateNestedOneWithoutPerfilInput = {
    create?: XOR<UsuarioCreateWithoutPerfilInput, UsuarioUncheckedCreateWithoutPerfilInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutPerfilInput
    connect?: UsuarioWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type UsuarioUpdateOneRequiredWithoutPerfilNestedInput = {
    create?: XOR<UsuarioCreateWithoutPerfilInput, UsuarioUncheckedCreateWithoutPerfilInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutPerfilInput
    upsert?: UsuarioUpsertWithoutPerfilInput
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutPerfilInput, UsuarioUpdateWithoutPerfilInput>, UsuarioUncheckedUpdateWithoutPerfilInput>
  }

  export type UsuarioCreateNestedOneWithoutSesionesInput = {
    create?: XOR<UsuarioCreateWithoutSesionesInput, UsuarioUncheckedCreateWithoutSesionesInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutSesionesInput
    connect?: UsuarioWhereUniqueInput
  }

  export type UsuarioUpdateOneRequiredWithoutSesionesNestedInput = {
    create?: XOR<UsuarioCreateWithoutSesionesInput, UsuarioUncheckedCreateWithoutSesionesInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutSesionesInput
    upsert?: UsuarioUpsertWithoutSesionesInput
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutSesionesInput, UsuarioUpdateWithoutSesionesInput>, UsuarioUncheckedUpdateWithoutSesionesInput>
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
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
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
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
    logo_url?: string | null
    is_activa?: boolean
    horario?: string | null
    telefono?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    multas?: MultaCreateNestedManyWithoutTiendaInput
  }

  export type TiendaUncheckedCreateWithoutUsuarioInput = {
    tienda_id?: string
    nombre: string
    direccion?: string | null
    logo_url?: string | null
    is_activa?: boolean
    horario?: string | null
    telefono?: string | null
    created_at?: Date | string
    updated_at?: Date | string
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
    fecha_pago?: Date | string | null
    evidencia_url?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    tienda: TiendaCreateNestedOneWithoutMultasInput
  }

  export type MultaUncheckedCreateWithoutUsuarioInput = {
    multa_id?: string
    tienda_id: string
    fecha_emision?: Date | string
    motivo: string
    monto: Decimal | DecimalJsLike | number | string
    estado?: $Enums.EstadoMulta
    fecha_pago?: Date | string | null
    evidencia_url?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type MultaCreateOrConnectWithoutUsuarioInput = {
    where: MultaWhereUniqueInput
    create: XOR<MultaCreateWithoutUsuarioInput, MultaUncheckedCreateWithoutUsuarioInput>
  }

  export type MultaCreateManyUsuarioInputEnvelope = {
    data: MultaCreateManyUsuarioInput | MultaCreateManyUsuarioInput[]
    skipDuplicates?: boolean
  }

  export type PerfilUsuarioCreateWithoutUsuarioInput = {
    perfil_id?: string
    telefono?: string | null
    direccion?: string | null
    fecha_nacimiento?: Date | string | null
    avatar_url?: string | null
    preferencias?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type PerfilUsuarioUncheckedCreateWithoutUsuarioInput = {
    perfil_id?: string
    telefono?: string | null
    direccion?: string | null
    fecha_nacimiento?: Date | string | null
    avatar_url?: string | null
    preferencias?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type PerfilUsuarioCreateOrConnectWithoutUsuarioInput = {
    where: PerfilUsuarioWhereUniqueInput
    create: XOR<PerfilUsuarioCreateWithoutUsuarioInput, PerfilUsuarioUncheckedCreateWithoutUsuarioInput>
  }

  export type SesionUsuarioCreateWithoutUsuarioInput = {
    sesion_id?: string
    token: string
    expires_at: Date | string
    is_active?: boolean
    user_agent?: string | null
    ip_address?: string | null
    created_at?: Date | string
  }

  export type SesionUsuarioUncheckedCreateWithoutUsuarioInput = {
    sesion_id?: string
    token: string
    expires_at: Date | string
    is_active?: boolean
    user_agent?: string | null
    ip_address?: string | null
    created_at?: Date | string
  }

  export type SesionUsuarioCreateOrConnectWithoutUsuarioInput = {
    where: SesionUsuarioWhereUniqueInput
    create: XOR<SesionUsuarioCreateWithoutUsuarioInput, SesionUsuarioUncheckedCreateWithoutUsuarioInput>
  }

  export type SesionUsuarioCreateManyUsuarioInputEnvelope = {
    data: SesionUsuarioCreateManyUsuarioInput | SesionUsuarioCreateManyUsuarioInput[]
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
    logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_activa?: BoolFieldUpdateOperationsInput | boolean
    horario?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    multas?: MultaUpdateManyWithoutTiendaNestedInput
  }

  export type TiendaUncheckedUpdateWithoutUsuarioInput = {
    tienda_id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_activa?: BoolFieldUpdateOperationsInput | boolean
    horario?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
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
    usuario_id?: StringNullableFilter<"Multa"> | string | null
    fecha_emision?: DateTimeFilter<"Multa"> | Date | string
    motivo?: StringFilter<"Multa"> | string
    monto?: DecimalFilter<"Multa"> | Decimal | DecimalJsLike | number | string
    estado?: EnumEstadoMultaFilter<"Multa"> | $Enums.EstadoMulta
    fecha_pago?: DateTimeNullableFilter<"Multa"> | Date | string | null
    evidencia_url?: StringNullableFilter<"Multa"> | string | null
    created_at?: DateTimeFilter<"Multa"> | Date | string
    updated_at?: DateTimeFilter<"Multa"> | Date | string
  }

  export type PerfilUsuarioUpsertWithoutUsuarioInput = {
    update: XOR<PerfilUsuarioUpdateWithoutUsuarioInput, PerfilUsuarioUncheckedUpdateWithoutUsuarioInput>
    create: XOR<PerfilUsuarioCreateWithoutUsuarioInput, PerfilUsuarioUncheckedCreateWithoutUsuarioInput>
    where?: PerfilUsuarioWhereInput
  }

  export type PerfilUsuarioUpdateToOneWithWhereWithoutUsuarioInput = {
    where?: PerfilUsuarioWhereInput
    data: XOR<PerfilUsuarioUpdateWithoutUsuarioInput, PerfilUsuarioUncheckedUpdateWithoutUsuarioInput>
  }

  export type PerfilUsuarioUpdateWithoutUsuarioInput = {
    perfil_id?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_nacimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
    preferencias?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PerfilUsuarioUncheckedUpdateWithoutUsuarioInput = {
    perfil_id?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_nacimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
    preferencias?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SesionUsuarioUpsertWithWhereUniqueWithoutUsuarioInput = {
    where: SesionUsuarioWhereUniqueInput
    update: XOR<SesionUsuarioUpdateWithoutUsuarioInput, SesionUsuarioUncheckedUpdateWithoutUsuarioInput>
    create: XOR<SesionUsuarioCreateWithoutUsuarioInput, SesionUsuarioUncheckedCreateWithoutUsuarioInput>
  }

  export type SesionUsuarioUpdateWithWhereUniqueWithoutUsuarioInput = {
    where: SesionUsuarioWhereUniqueInput
    data: XOR<SesionUsuarioUpdateWithoutUsuarioInput, SesionUsuarioUncheckedUpdateWithoutUsuarioInput>
  }

  export type SesionUsuarioUpdateManyWithWhereWithoutUsuarioInput = {
    where: SesionUsuarioScalarWhereInput
    data: XOR<SesionUsuarioUpdateManyMutationInput, SesionUsuarioUncheckedUpdateManyWithoutUsuarioInput>
  }

  export type SesionUsuarioScalarWhereInput = {
    AND?: SesionUsuarioScalarWhereInput | SesionUsuarioScalarWhereInput[]
    OR?: SesionUsuarioScalarWhereInput[]
    NOT?: SesionUsuarioScalarWhereInput | SesionUsuarioScalarWhereInput[]
    sesion_id?: StringFilter<"SesionUsuario"> | string
    usuario_id?: StringFilter<"SesionUsuario"> | string
    token?: StringFilter<"SesionUsuario"> | string
    expires_at?: DateTimeFilter<"SesionUsuario"> | Date | string
    is_active?: BoolFilter<"SesionUsuario"> | boolean
    user_agent?: StringNullableFilter<"SesionUsuario"> | string | null
    ip_address?: StringNullableFilter<"SesionUsuario"> | string | null
    created_at?: DateTimeFilter<"SesionUsuario"> | Date | string
  }

  export type UsuarioCreateWithoutPerfilInput = {
    usuario_id?: string
    email: string
    password_hash: string
    nombre: string
    tipo_usuario: $Enums.TipoUsuario
    is_verified?: boolean
    is_active?: boolean
    last_login?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    tienda?: TiendaCreateNestedOneWithoutUsuarioInput
    multas?: MultaCreateNestedManyWithoutUsuarioInput
    sesiones?: SesionUsuarioCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateWithoutPerfilInput = {
    usuario_id?: string
    email: string
    password_hash: string
    nombre: string
    tipo_usuario: $Enums.TipoUsuario
    is_verified?: boolean
    is_active?: boolean
    last_login?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    tienda?: TiendaUncheckedCreateNestedOneWithoutUsuarioInput
    multas?: MultaUncheckedCreateNestedManyWithoutUsuarioInput
    sesiones?: SesionUsuarioUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioCreateOrConnectWithoutPerfilInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutPerfilInput, UsuarioUncheckedCreateWithoutPerfilInput>
  }

  export type UsuarioUpsertWithoutPerfilInput = {
    update: XOR<UsuarioUpdateWithoutPerfilInput, UsuarioUncheckedUpdateWithoutPerfilInput>
    create: XOR<UsuarioCreateWithoutPerfilInput, UsuarioUncheckedCreateWithoutPerfilInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutPerfilInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutPerfilInput, UsuarioUncheckedUpdateWithoutPerfilInput>
  }

  export type UsuarioUpdateWithoutPerfilInput = {
    usuario_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    tipo_usuario?: EnumTipoUsuarioFieldUpdateOperationsInput | $Enums.TipoUsuario
    is_verified?: BoolFieldUpdateOperationsInput | boolean
    is_active?: BoolFieldUpdateOperationsInput | boolean
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tienda?: TiendaUpdateOneWithoutUsuarioNestedInput
    multas?: MultaUpdateManyWithoutUsuarioNestedInput
    sesiones?: SesionUsuarioUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutPerfilInput = {
    usuario_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    tipo_usuario?: EnumTipoUsuarioFieldUpdateOperationsInput | $Enums.TipoUsuario
    is_verified?: BoolFieldUpdateOperationsInput | boolean
    is_active?: BoolFieldUpdateOperationsInput | boolean
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tienda?: TiendaUncheckedUpdateOneWithoutUsuarioNestedInput
    multas?: MultaUncheckedUpdateManyWithoutUsuarioNestedInput
    sesiones?: SesionUsuarioUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioCreateWithoutSesionesInput = {
    usuario_id?: string
    email: string
    password_hash: string
    nombre: string
    tipo_usuario: $Enums.TipoUsuario
    is_verified?: boolean
    is_active?: boolean
    last_login?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    tienda?: TiendaCreateNestedOneWithoutUsuarioInput
    multas?: MultaCreateNestedManyWithoutUsuarioInput
    perfil?: PerfilUsuarioCreateNestedOneWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateWithoutSesionesInput = {
    usuario_id?: string
    email: string
    password_hash: string
    nombre: string
    tipo_usuario: $Enums.TipoUsuario
    is_verified?: boolean
    is_active?: boolean
    last_login?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    tienda?: TiendaUncheckedCreateNestedOneWithoutUsuarioInput
    multas?: MultaUncheckedCreateNestedManyWithoutUsuarioInput
    perfil?: PerfilUsuarioUncheckedCreateNestedOneWithoutUsuarioInput
  }

  export type UsuarioCreateOrConnectWithoutSesionesInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutSesionesInput, UsuarioUncheckedCreateWithoutSesionesInput>
  }

  export type UsuarioUpsertWithoutSesionesInput = {
    update: XOR<UsuarioUpdateWithoutSesionesInput, UsuarioUncheckedUpdateWithoutSesionesInput>
    create: XOR<UsuarioCreateWithoutSesionesInput, UsuarioUncheckedCreateWithoutSesionesInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutSesionesInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutSesionesInput, UsuarioUncheckedUpdateWithoutSesionesInput>
  }

  export type UsuarioUpdateWithoutSesionesInput = {
    usuario_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    tipo_usuario?: EnumTipoUsuarioFieldUpdateOperationsInput | $Enums.TipoUsuario
    is_verified?: BoolFieldUpdateOperationsInput | boolean
    is_active?: BoolFieldUpdateOperationsInput | boolean
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tienda?: TiendaUpdateOneWithoutUsuarioNestedInput
    multas?: MultaUpdateManyWithoutUsuarioNestedInput
    perfil?: PerfilUsuarioUpdateOneWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutSesionesInput = {
    usuario_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    tipo_usuario?: EnumTipoUsuarioFieldUpdateOperationsInput | $Enums.TipoUsuario
    is_verified?: BoolFieldUpdateOperationsInput | boolean
    is_active?: BoolFieldUpdateOperationsInput | boolean
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tienda?: TiendaUncheckedUpdateOneWithoutUsuarioNestedInput
    multas?: MultaUncheckedUpdateManyWithoutUsuarioNestedInput
    perfil?: PerfilUsuarioUncheckedUpdateOneWithoutUsuarioNestedInput
  }

  export type UsuarioCreateWithoutTiendaInput = {
    usuario_id?: string
    email: string
    password_hash: string
    nombre: string
    tipo_usuario: $Enums.TipoUsuario
    is_verified?: boolean
    is_active?: boolean
    last_login?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    multas?: MultaCreateNestedManyWithoutUsuarioInput
    perfil?: PerfilUsuarioCreateNestedOneWithoutUsuarioInput
    sesiones?: SesionUsuarioCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateWithoutTiendaInput = {
    usuario_id?: string
    email: string
    password_hash: string
    nombre: string
    tipo_usuario: $Enums.TipoUsuario
    is_verified?: boolean
    is_active?: boolean
    last_login?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    multas?: MultaUncheckedCreateNestedManyWithoutUsuarioInput
    perfil?: PerfilUsuarioUncheckedCreateNestedOneWithoutUsuarioInput
    sesiones?: SesionUsuarioUncheckedCreateNestedManyWithoutUsuarioInput
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
    fecha_pago?: Date | string | null
    evidencia_url?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    usuario?: UsuarioCreateNestedOneWithoutMultasInput
  }

  export type MultaUncheckedCreateWithoutTiendaInput = {
    multa_id?: string
    usuario_id?: string | null
    fecha_emision?: Date | string
    motivo: string
    monto: Decimal | DecimalJsLike | number | string
    estado?: $Enums.EstadoMulta
    fecha_pago?: Date | string | null
    evidencia_url?: string | null
    created_at?: Date | string
    updated_at?: Date | string
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
    is_verified?: BoolFieldUpdateOperationsInput | boolean
    is_active?: BoolFieldUpdateOperationsInput | boolean
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    multas?: MultaUpdateManyWithoutUsuarioNestedInput
    perfil?: PerfilUsuarioUpdateOneWithoutUsuarioNestedInput
    sesiones?: SesionUsuarioUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutTiendaInput = {
    usuario_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    tipo_usuario?: EnumTipoUsuarioFieldUpdateOperationsInput | $Enums.TipoUsuario
    is_verified?: BoolFieldUpdateOperationsInput | boolean
    is_active?: BoolFieldUpdateOperationsInput | boolean
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    multas?: MultaUncheckedUpdateManyWithoutUsuarioNestedInput
    perfil?: PerfilUsuarioUncheckedUpdateOneWithoutUsuarioNestedInput
    sesiones?: SesionUsuarioUncheckedUpdateManyWithoutUsuarioNestedInput
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
    logo_url?: string | null
    is_activa?: boolean
    horario?: string | null
    telefono?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    usuario: UsuarioCreateNestedOneWithoutTiendaInput
  }

  export type TiendaUncheckedCreateWithoutMultasInput = {
    tienda_id?: string
    usuario_id: string
    nombre: string
    direccion?: string | null
    logo_url?: string | null
    is_activa?: boolean
    horario?: string | null
    telefono?: string | null
    created_at?: Date | string
    updated_at?: Date | string
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
    is_verified?: boolean
    is_active?: boolean
    last_login?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    tienda?: TiendaCreateNestedOneWithoutUsuarioInput
    perfil?: PerfilUsuarioCreateNestedOneWithoutUsuarioInput
    sesiones?: SesionUsuarioCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateWithoutMultasInput = {
    usuario_id?: string
    email: string
    password_hash: string
    nombre: string
    tipo_usuario: $Enums.TipoUsuario
    is_verified?: boolean
    is_active?: boolean
    last_login?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    tienda?: TiendaUncheckedCreateNestedOneWithoutUsuarioInput
    perfil?: PerfilUsuarioUncheckedCreateNestedOneWithoutUsuarioInput
    sesiones?: SesionUsuarioUncheckedCreateNestedManyWithoutUsuarioInput
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
    logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_activa?: BoolFieldUpdateOperationsInput | boolean
    horario?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneRequiredWithoutTiendaNestedInput
  }

  export type TiendaUncheckedUpdateWithoutMultasInput = {
    tienda_id?: StringFieldUpdateOperationsInput | string
    usuario_id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_activa?: BoolFieldUpdateOperationsInput | boolean
    horario?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
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
    is_verified?: BoolFieldUpdateOperationsInput | boolean
    is_active?: BoolFieldUpdateOperationsInput | boolean
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tienda?: TiendaUpdateOneWithoutUsuarioNestedInput
    perfil?: PerfilUsuarioUpdateOneWithoutUsuarioNestedInput
    sesiones?: SesionUsuarioUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutMultasInput = {
    usuario_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    tipo_usuario?: EnumTipoUsuarioFieldUpdateOperationsInput | $Enums.TipoUsuario
    is_verified?: BoolFieldUpdateOperationsInput | boolean
    is_active?: BoolFieldUpdateOperationsInput | boolean
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tienda?: TiendaUncheckedUpdateOneWithoutUsuarioNestedInput
    perfil?: PerfilUsuarioUncheckedUpdateOneWithoutUsuarioNestedInput
    sesiones?: SesionUsuarioUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type MultaCreateManyUsuarioInput = {
    multa_id?: string
    tienda_id: string
    fecha_emision?: Date | string
    motivo: string
    monto: Decimal | DecimalJsLike | number | string
    estado?: $Enums.EstadoMulta
    fecha_pago?: Date | string | null
    evidencia_url?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type SesionUsuarioCreateManyUsuarioInput = {
    sesion_id?: string
    token: string
    expires_at: Date | string
    is_active?: boolean
    user_agent?: string | null
    ip_address?: string | null
    created_at?: Date | string
  }

  export type MultaUpdateWithoutUsuarioInput = {
    multa_id?: StringFieldUpdateOperationsInput | string
    fecha_emision?: DateTimeFieldUpdateOperationsInput | Date | string
    motivo?: StringFieldUpdateOperationsInput | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    estado?: EnumEstadoMultaFieldUpdateOperationsInput | $Enums.EstadoMulta
    fecha_pago?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    evidencia_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tienda?: TiendaUpdateOneRequiredWithoutMultasNestedInput
  }

  export type MultaUncheckedUpdateWithoutUsuarioInput = {
    multa_id?: StringFieldUpdateOperationsInput | string
    tienda_id?: StringFieldUpdateOperationsInput | string
    fecha_emision?: DateTimeFieldUpdateOperationsInput | Date | string
    motivo?: StringFieldUpdateOperationsInput | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    estado?: EnumEstadoMultaFieldUpdateOperationsInput | $Enums.EstadoMulta
    fecha_pago?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    evidencia_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MultaUncheckedUpdateManyWithoutUsuarioInput = {
    multa_id?: StringFieldUpdateOperationsInput | string
    tienda_id?: StringFieldUpdateOperationsInput | string
    fecha_emision?: DateTimeFieldUpdateOperationsInput | Date | string
    motivo?: StringFieldUpdateOperationsInput | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    estado?: EnumEstadoMultaFieldUpdateOperationsInput | $Enums.EstadoMulta
    fecha_pago?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    evidencia_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SesionUsuarioUpdateWithoutUsuarioInput = {
    sesion_id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SesionUsuarioUncheckedUpdateWithoutUsuarioInput = {
    sesion_id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SesionUsuarioUncheckedUpdateManyWithoutUsuarioInput = {
    sesion_id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MultaCreateManyTiendaInput = {
    multa_id?: string
    usuario_id?: string | null
    fecha_emision?: Date | string
    motivo: string
    monto: Decimal | DecimalJsLike | number | string
    estado?: $Enums.EstadoMulta
    fecha_pago?: Date | string | null
    evidencia_url?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type MultaUpdateWithoutTiendaInput = {
    multa_id?: StringFieldUpdateOperationsInput | string
    fecha_emision?: DateTimeFieldUpdateOperationsInput | Date | string
    motivo?: StringFieldUpdateOperationsInput | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    estado?: EnumEstadoMultaFieldUpdateOperationsInput | $Enums.EstadoMulta
    fecha_pago?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    evidencia_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneWithoutMultasNestedInput
  }

  export type MultaUncheckedUpdateWithoutTiendaInput = {
    multa_id?: StringFieldUpdateOperationsInput | string
    usuario_id?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_emision?: DateTimeFieldUpdateOperationsInput | Date | string
    motivo?: StringFieldUpdateOperationsInput | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    estado?: EnumEstadoMultaFieldUpdateOperationsInput | $Enums.EstadoMulta
    fecha_pago?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    evidencia_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MultaUncheckedUpdateManyWithoutTiendaInput = {
    multa_id?: StringFieldUpdateOperationsInput | string
    usuario_id?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_emision?: DateTimeFieldUpdateOperationsInput | Date | string
    motivo?: StringFieldUpdateOperationsInput | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    estado?: EnumEstadoMultaFieldUpdateOperationsInput | $Enums.EstadoMulta
    fecha_pago?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    evidencia_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
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