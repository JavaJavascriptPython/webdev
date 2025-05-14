public class TransactionWorker implements Runnable {
    private final int id;
    private final BlockingQueue<String> queue;
    private final TransactionFunction function;
    private final Map<String, String> resultMap = new ConcurrentHashMap<>();

    public TransactionWorker(int id, BlockingQueue<String> queue, TransactionFunction function) {
        this.id = id;
        this.queue = queue;
        this.function = function;
    }

    public void run() {
        try {
            while (true) {
                String line = queue.take();
                if (line.equals("EOF")) break;  // Signal to stop
                function.process(line, resultMap);
            }
            writeOutput();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void writeOutput() throws Exception {
        try (PrintWriter out = new PrintWriter(new FileWriter("output_" + id + ".txt"))) {
            for (Map.Entry<String, String> entry : resultMap.entrySet()) {
                out.println(entry.getKey() + "," + entry.getValue());
            }
        }
    }
}