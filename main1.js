// main.js

document.addEventListener('DOMContentLoaded', function () {
    const productListElement = document.getElementById('productList');
    const loadMoreButton = document.getElementById('loadMoreButton');
    let startIndex = 0;
    const recordsPerPage = 100;

    // Function to fetch JSON data from a URL
    async function fetchJsonData(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error fetching JSON data:", error.message);
            return null;
        }
    }

    // Function to display data based on requirements
    function displayData(jsonData, start, end) {
        // Check if jsonData.products is an object
        if (!jsonData.products || typeof jsonData.products !== 'object') {
            console.error("Invalid data format. Expected 'products' property as an object.");
            return;
        }

        // Convert the products object into an array
        const productsArray = Object.entries(jsonData.products).map(([productId, productData]) => ({
            ...productData,
            productId, // Include the productId in the product data
        }));

        // Sort the data based on descending popularity
        const sortedData = productsArray.sort((a, b) => b.popularity - a.popularity);

        // Display Sr No, Title, Price, and Popularity in separate columns
        for (let i = start; i < end && i < sortedData.length; i++) {
            const product = sortedData[i];
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${i + 1}</td>
                <td>${product.title}</td>
                <td>${product.price}</td>
                <td>${product.popularity}</td>
            `;
            productListElement.appendChild(row);
        }

        // Show or hide the "Read More" button based on the remaining records
        loadMoreButton.style.display = end < sortedData.length ? 'block' : 'none';
    }

    // URL of the JSON file
    const jsonUrl = "https://s3.amazonaws.com/open-to-cors/assignment.json"; // Replace with the actual URL

    // Fetch JSON data
    fetchJsonData(jsonUrl)
        .then(productsData => {
            // Check if data was successfully fetched
            if (productsData) {
                // Display the initial 100 records
                displayData(productsData, startIndex, startIndex + recordsPerPage);

                // Add event listener for "Read More" button
                loadMoreButton.addEventListener('click', function () {
                    startIndex += recordsPerPage;
                    // Display the next 100 records
                    displayData(productsData, startIndex, startIndex + recordsPerPage);
                });
            }
        })
        .catch(error => console.error("Error:", error));
});