Dsl.asyncHttpClient()
  .preparePost("http://mockbin.com/har")
  .setHeader("content-type", "application/json")
  .setBody("{\n  \"foo\": \"bar\"\n}")
  .execute()
  .toCompletableFuture()
  .thenAccept(System.out::println)
  .join();
