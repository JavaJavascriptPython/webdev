import java.util.Map;

public class TransactionFunctions {
    public static TransactionFunction getFunction(int index) {
        return switch (index) {
            case 0 -> (line, map) -> {
                String[] parts = line.split(",");
                String txnId = parts[0];
                String amount = parts[2]; // Let's say 3rd field is amount
                map.put(txnId, amount);
            };
            case 1 -> (line, map) -> {
                String[] parts = line.split(",");
                String account = parts[1];
                String status = parts[3];
                map.put(account, status);
            };
            default -> throw new IllegalArgumentException("Invalid function index");
        };
    }
}