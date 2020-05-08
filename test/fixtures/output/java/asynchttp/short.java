Dsl.asyncHttpClient()
  .prepareGet("http://mockbin.com/har")
  .execute()
  .toCompletableFuture()
  .thenAccept(System.out::println)
  .join();
