Dsl.asyncHttpClient()
  .prepareGet("https://mockbin.com/har")
  .execute()
  .toCompletableFuture()
  .thenAccept(System.out::println)
  .join();
