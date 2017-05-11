# mas 是一个简单的 event-driven 架构, 由至少三个微服务组成
分为 rest-server, ed-server, query-server

- rest-server 主要为 REST api, UI input -> authorzi & data validate -> output command

- ed-server 主要为事件溯源， listen command input -> bunssiness logic process -> output denormalizer

- query-server 主要为视图查询

