Dsl.asyncHttpClient()
  .preparePost("http://mockbin.com/har")
  .setHeader("content-type", "application/x-www-form-urlencoded")
  .setBody("foo=bar&hello=world")
  .execute()
  .toCompletableFuture()
  .thenAccept(System.out::println)
  .join();
