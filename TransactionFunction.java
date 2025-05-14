public interface TransactionFunction {
    void process(String line, Map<String, String> outputMap);
}