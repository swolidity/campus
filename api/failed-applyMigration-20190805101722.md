# Failed applyMigration at 2019-08-05T14:17:22.992Z
## RPC Input One Line
```json
{"id":1,"jsonrpc":"2.0","method":"applyMigration","params":{"projectInfo":"","force":false,"migrationId":"20190805101709-init","steps":[{"stepType":"CreateModel","name":"User","embedded":false},{"stepType":"CreateField","model":"User","name":"id","type":{"Base":"String"},"arity":"required","isUnique":false,"id":{"strategy":"Auto","sequence":null},"default":{"Expression":["cuid","String",[]]}},{"stepType":"CreateField","model":"User","name":"name","type":{"Base":"String"},"arity":"required","isUnique":false},{"stepType":"CreateField","model":"User","name":"email","type":{"Base":"String"},"arity":"required","isUnique":true},{"stepType":"CreateField","model":"User","name":"createdAt","type":{"Base":"DateTime"},"arity":"required","isUnique":false,"default":{"Expression":["now","DateTime",[]]}},{"stepType":"CreateField","model":"User","name":"updatedAt","type":{"Base":"DateTime"},"arity":"required","isUnique":false}],"sourceConfig":"datasource db {\n  provider = \"mysql\"\n  url      = \"mysql://root:root@localhost:3306/better\"\n}\n\ngenerator photonjs {\n  provider = \"photonjs\"\n}\n\ngenerator nexus_prisma {\n  provider = \"nexus-prisma\"\n}\n\nmodel User {\n  id        String   @id @default(cuid())\n  name      String\n  email     String   @unique\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}"}}
```

## RPC Input Readable
```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "applyMigration",
  "params": {
    "projectInfo": "",
    "force": false,
    "migrationId": "20190805101709-init",
    "steps": [
      {
        "stepType": "CreateModel",
        "name": "User",
        "embedded": false
      },
      {
        "stepType": "CreateField",
        "model": "User",
        "name": "id",
        "type": {
          "Base": "String"
        },
        "arity": "required",
        "isUnique": false,
        "id": {
          "strategy": "Auto",
          "sequence": null
        },
        "default": {
          "Expression": [
            "cuid",
            "String",
            []
          ]
        }
      },
      {
        "stepType": "CreateField",
        "model": "User",
        "name": "name",
        "type": {
          "Base": "String"
        },
        "arity": "required",
        "isUnique": false
      },
      {
        "stepType": "CreateField",
        "model": "User",
        "name": "email",
        "type": {
          "Base": "String"
        },
        "arity": "required",
        "isUnique": true
      },
      {
        "stepType": "CreateField",
        "model": "User",
        "name": "createdAt",
        "type": {
          "Base": "DateTime"
        },
        "arity": "required",
        "isUnique": false,
        "default": {
          "Expression": [
            "now",
            "DateTime",
            []
          ]
        }
      },
      {
        "stepType": "CreateField",
        "model": "User",
        "name": "updatedAt",
        "type": {
          "Base": "DateTime"
        },
        "arity": "required",
        "isUnique": false
      }
    ],
    "sourceConfig": "datasource db {\n  provider = \"mysql\"\n  url      = \"mysql://root:root@localhost:3306/better\"\n}\n\ngenerator photonjs {\n  provider = \"photonjs\"\n}\n\ngenerator nexus_prisma {\n  provider = \"nexus-prisma\"\n}\n\nmodel User {\n  id        String   @id @default(cuid())\n  name      String\n  email     String   @unique\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}"
  }
}
```


## RPC Response
```
null
```

## Stack Trace
```bash
thread 'main' panicked at 'Could not acquire root connection to MySQL: QueryError(DriverError { Could not connect to address `localhost:3306': Connection refused (os error 61) }

stack backtrace:
   0: backtrace::backtrace::trace::h33eb18a9548cdf19 (0x10aeb33be)
   1: backtrace::capture::Backtrace::new_unresolved::hbe15ca481078b281 (0x10aeb15e8)
   2: failure::backtrace::internal::InternalBacktrace::new::h677d3f07444347de (0x10aeb0f89)
   3: <failure::backtrace::Backtrace as core::default::Default>::default::hcac8ae7a11909b53 (0x10aeb1175)
   4: prisma_query::connector::mysql::error::<impl core::convert::From<mysql::error::Error> for prisma_query::error::Error>::from::h4a98863bb78237aa (0x10a9f8a7e)
   5: prisma_query::connector::mysql::Mysql::new::h879da2362c716fdf (0x10a9c9de4)
   6: sql_migration_connector::migration_database::Mysql::new::hb67f640d2db3c811 (0x10a938bed)
   7: sql_migration_connector::PrismaMysqlConfig::root_connection::h7c93452caf4cb02c (0x10a8f59a4)
   8: sql_migration_connector::SqlMigrationConnector::mysql_helper::hc87012de252fcdd6 (0x10a8f4b3e)
   9: sql_migration_connector::SqlMigrationConnector::new::hd2da02b872ee4ffd (0x10a8f3ac6)
  10: migration_core::connector_loader::load_connector::hc7e110cf6c938678 (0x10a83a56c)
  11: migration_core::migration_engine::MigrationEngine::init::hc1741e842ac3d246 (0x10a8384e8)
  12: <F as jsonrpc_core::calls::RpcMethodSimple>::call::h7ba2d58a6db0262a (0x10a8787b9)
  13: <F as jsonrpc_core::calls::RpcMethod<T>>::call::h566c3f9dc22a273f (0x10a8243cc)
  14: <futures::future::lazy::Lazy<F,R> as futures::future::Future>::poll::h1013e7386624a6ff (0x10a8374f2)
  15: <futures::future::then::Then<A,B,F> as futures::future::Future>::poll::h7a5eb15e13aeeeb7 (0x10a824bb0)
  16: <futures::future::map::Map<A,F> as futures::future::Future>::poll::hcafae113f65ef0e3 (0x10a840e1f)
  17: <futures::future::either::Either<A,B> as futures::future::Future>::poll::hf2314b19ebcad874 (0x10a837800)
  18: futures::task_impl::std::set::h770978995f72d15c (0x10a86fadf)
  19: std::thread::local::LocalKey<T>::with::h6be23f390bb8a5eb (0x10a8736e6)
  20: futures::future::Future::wait::h3f1c0c2a77f18093 (0x10a840b2f)
  21: jsonrpc_core::io::IoHandler<M>::handle_request_sync::h4d3d723b6feb431a (0x10a81eecf)
  22: migration_core::rpc_api::RpcApi::handle::hf9fe4cc8e4df6876 (0x10a87fc5b)
  23: migration_engine::main::h984fc72fc0975d50 (0x10a7fb56d)
  24: std::rt::lang_start::{{closure}}::h75401f289bc77adf (0x10a7fb4a6)
  25: std::panicking::try::do_call::h1252fc9a2ff235eb (0x10aed78c8)
  26: __rust_maybe_catch_panic (0x10aedbcaf)
  27: std::rt::lang_start_internal::h4c054360e442146c (0x10aed83ae)
  28: main (0x10a7fb5c9))', src/libcore/result.rs:997:5
stack backtrace:
   0: std::sys::unix::backtrace::tracing::imp::unwind_backtrace
   1: std::sys_common::backtrace::_print
   2: std::panicking::default_hook::{{closure}}
   3: std::panicking::default_hook
   4: std::panicking::rust_panic_with_hook
   5: std::panicking::continue_panic_fmt
   6: rust_begin_unwind
   7: core::panicking::panic_fmt
   8: core::result::unwrap_failed
   9: sql_migration_connector::SqlMigrationConnector::mysql_helper
  10: sql_migration_connector::SqlMigrationConnector::new
  11: migration_core::connector_loader::load_connector
  12: migration_core::migration_engine::MigrationEngine::init
  13: <F as jsonrpc_core::calls::RpcMethodSimple>::call
  14: <F as jsonrpc_core::calls::RpcMethod<T>>::call
  15: <futures::future::lazy::Lazy<F,R> as futures::future::Future>::poll
  16: <futures::future::then::Then<A,B,F> as futures::future::Future>::poll
  17: <futures::future::map::Map<A,F> as futures::future::Future>::poll
  18: <futures::future::either::Either<A,B> as futures::future::Future>::poll
  19: futures::task_impl::std::set
  20: std::thread::local::LocalKey<T>::with
  21: futures::future::Future::wait
  22: jsonrpc_core::io::IoHandler<M>::handle_request_sync
  23: migration_core::rpc_api::RpcApi::handle
  24: migration_engine::main
  25: std::rt::lang_start::{{closure}}
  26: std::panicking::try::do_call
  27: __rust_maybe_catch_panic
  28: std::rt::lang_start_internal
  29: main

```
