AsyncHttpClient client = new DefaultAsyncHttpClient();
client.preparePost("http://mockbin.com/har")
  .setHeader("content-type", "text/plain")
  .setBody("Hello World")
  .execute()
  .toCompletableFuture()
  .thenAccept(System.out::println)
  .join();

client.close();
