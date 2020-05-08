Dsl.asyncHttpClient()
  .preparePost("http://mockbin.com/har")
  .setHeader("content-type", "application/json")
  .setBody("{\"foo\":null}")
  .execute()
  .toCompletableFuture()
  .thenAccept(System.out::println)
  .join();
