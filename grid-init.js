// grid-init.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('grid-init.js: DOMContentLoaded fired.');

    // --- Theme Toggle functionality (PRIORITIZED AND ISOLATED) ---
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    if (themeToggle) {
        console.log('grid-init.js: Theme toggle button found.');

        // Function to apply/remove light mode class and update grid theme
        // This function needs to be defined BEFORE it's called in applyTheme
        function updateThemeStyles(isLight) {
            if (isLight) {
                body.classList.add('light-mode');
                localStorage.setItem('theme', 'light');
                console.log('grid-init.js: Applied light mode.');
            } else {
                body.classList.remove('light-mode');
                localStorage.setItem('theme', 'dark');
                console.log('grid-init.js: Applied dark mode.');
            }
        }

        // Event listener for the toggle button
        themeToggle.addEventListener('click', () => {
            console.log('grid-init.js: Theme toggle clicked.');
            const currentTheme = localStorage.getItem('theme');
            if (currentTheme === 'dark') {
                updateThemeStyles(true); // Switch to light
            } else {
                updateThemeStyles(false); // Switch to dark
            }
            // After changing the body class, also update the grid theme if it exists
            if (window.myTabulatorGridInstance) { // Use a globally accessible instance if grid exists
                 const isLight = body.classList.contains('light-mode');
                 window.myTabulatorGridInstance.setTheme(isLight ? "default" : "midnight");
                 console.log('grid-init.js: Grid theme updated.');
            }
        });

        // Initial theme application on load
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            updateThemeStyles(true);
        } else {
            updateThemeStyles(false); // Default to dark mode if no preference or 'dark' saved
        }
        console.log('grid-init.js: Initial theme applied based on localStorage.');

    } else {
        console.error('grid-init.js: Theme toggle button not found (ID: themeToggle).');
    }


    // --- Tabulator Grid Initialization (only if element exists, now after theme toggle) ---
    const exampleTable = document.getElementById('example-table');
    
    if (exampleTable) {
        console.log('grid-init.js: Tabulator grid element found.');
        const tableData = [
            {id:1, name:"Oli Bob", age:"12", col:"red", dob:""},
            {id:2, name:"Mary May", age:"1", col:"blue", dob:"14/05/1982"},
            {id:3, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
            {id:4, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
            {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
            {id:6, name:"Frank Harbours", age:"2", col:"purple", dob:"12/03/1966"},
            {id:7, name:"Jamie Newman", age:"5", col:"green", dob:"20/07/1987"},
            {id:8, name:"Callie North", age:"9", col:"red", dob:"14/08/2017"},
            {id:9, name:"Natasha McCormick", age:"19", col:"red", dob:"03/04/2000"},
            {id:10, name:"Laura Smith", age:"32", col:"blue", dob:"09/01/1991"},
        ];

        try {
            // Assign the Tabulator instance to a global window property
            // This allows the theme toggle to access it reliably
            window.myTabulatorGridInstance = new Tabulator("#example-table", {
                height:"310px", 
                data:tableData, 
                layout:"fitColumns",
                tooltips:true,
                addRowPos:"top",
                history:true,
                pagination:"local",
                paginationSize:7, 
                paginationSizeSelector:[5, 7, 10, 15],
                movableColumns:true,
                resizableRows:true,
                initialSort:[ 
                    {column:"name", dir:"asc"},
                ],
                columns:[ 
                    {title:"Name", field:"name", editor:"input", headerFilter:"input"},
                    {title:"Age", field:"age", hozAlign:"left", formatter:"progress", editor:true, headerFilter:"input"},
                    {title:"Favourite Color", field:"col", editor:"input", headerFilter:"input"},
                    {title:"Date Of Birth", field:"dob", hozAlign:"center", sorter:"date", editor:"input", headerFilter:"input"},
                ],
                // Set initial theme based on current body class
                theme: body.classList.contains('light-mode') ? "default" : "midnight" 
            });
            console.log('grid-init.js: Tabulator grid initialized successfully.');

        } catch (e) {
            console.error("grid-init.js: Error initializing Tabulator grid:", e);
            window.myTabulatorGridInstance = null; // Ensure it's null if init fails
        }
    } else {
        console.log('grid-init.js: Tabulator grid element not found on this page (ID: example-table).');
    }
});