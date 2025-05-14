public class TransactionFunctions {
    public static TransactionFunction getFunction(int index) {
        return switch (index) {
            case 0 -> (line, map) -> {
                // Function 0: Map Transaction ID -> Amount
                String[] parts = line.split(",");
                if (parts.length >= 3) {
                    String txnId = parts[0].trim();
                    String amount = parts[2].trim();
                    map.put(txnId, amount);
                }
            };

            case 1 -> (line, map) -> {
                // Function 1: Map Account ID -> Last Transaction Status
                String[] parts = line.split(",");
                if (parts.length >= 4) {
                    String accountId = parts[1].trim();
                    String status = parts[3].trim();
                    map.put(accountId, status);  // Last status will be retained
                }
            };

            default -> throw new IllegalArgumentException("Invalid function index");
        };
    }
}