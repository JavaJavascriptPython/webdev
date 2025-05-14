import gzip
from multiprocessing import Queue
from transaction_functions import get_function
from worker import TransactionWorker

NUM_FUNCTIONS = 12
queues = [Queue(maxsize=1000) for _ in range(NUM_FUNCTIONS)]
workers = []

# Start worker processes
for i in range(NUM_FUNCTIONS):
    func = get_function(i)
    w = TransactionWorker(i, queues[i], func)
    w.start()
    workers.append(w)

# Read the file once and distribute lines to all queues
with gzip.open("transactions.gz", "rt") as f:
    for line in f:
        for q in queues:
            q.put(line)

# Send EOF to stop each process
for q in queues:
    q.put("EOF")

# Wait for all processes to finish
for w in workers:
    w.join()

print("Multiprocessing finished.")