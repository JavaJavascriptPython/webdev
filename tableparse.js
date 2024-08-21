function tableToJson(table) {
    let data = [];
    let headers = [];

    // Get table headers
    let headerCells = table.querySelectorAll('th');
    headerCells.forEach(header => headers.push(header.textContent.trim()));

    // Get table rows
    let rows = table.querySelectorAll('tr');
    rows.forEach((row, rowIndex) => {
        if (rowIndex === 0) return; // Skip the header row

        let rowData = {};
        let cells = row.querySelectorAll('td');
        
        cells.forEach((cell, cellIndex) => {
            rowData[headers[cellIndex]] = cell.textContent.trim();
        });

        data.push(rowData);
    });

    return data;
}