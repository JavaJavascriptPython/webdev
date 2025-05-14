public class TransactionProcessor {
    public static void main(String[] args) throws Exception {
        final int NUM_FUNCTIONS = 12;
        ExecutorService executor = Executors.newFixedThreadPool(NUM_FUNCTIONS);
        BlockingQueue<String>[] queues = new LinkedBlockingQueue[NUM_FUNCTIONS];

        // Setup 12 queues and 12 threads
        for (int i = 0; i < NUM_FUNCTIONS; i++) {
            queues[i] = new LinkedBlockingQueue<>(1000);
            TransactionFunction function = TransactionFunctions.getFunction(i);
            executor.submit(new TransactionWorker(i, queues[i], function));
        }

        // Read file once and distribute lines to each queue
        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(new GZIPInputStream(new FileInputStream("transactions.gz"))))) {
            String line;
            while ((line = reader.readLine()) != null) {
                for (BlockingQueue<String> queue : queues) {
                    queue.put(line);
                }
            }
        }

        // Send EOF to tell workers to stop
        for (BlockingQueue<String> queue : queues) {
            queue.put("EOF");
        }

        executor.shutdown();
        executor.awaitTermination(1, TimeUnit.HOURS);
        System.out.println("Processing complete.");
    }
}