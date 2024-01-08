document.addEventListener('DOMContentLoaded', function () {
    // Function to move selected fields between lists
    function moveSelectedFields(direction) {
        const availableFields = document.getElementById('availableFields1');
        const selectedFields = document.getElementById('displayedFields1');

        if (direction === 'right') {
            moveFields(availableFields1, selectedFields);
        } else if (direction === 'left') {
            moveFields(selectedFields, availableFields);
        }
    }

    // Function to move fields between lists
    function moveFields(sourceList, destinationList) {
        const selectedOptions = Array.from(sourceList.selectedOptions);
        selectedOptions.forEach(option => {
            sourceList.remove(option);
            destinationList.add(option);
        });
    }

    // Event listener for the move buttons
    document.getElementById('moveRight').addEventListener('click', function () {
        moveSelectedFields('right');
    });

    document.getElementById('moveLeft').addEventListener('click', function () {
        moveSelectedFields('left');
    });
});
