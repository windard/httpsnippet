Dsl.asyncHttpClient()
  .prepareGet("http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value")
  .execute()
  .toCompletableFuture()
  .thenAccept(System.out::println)
  .join();
