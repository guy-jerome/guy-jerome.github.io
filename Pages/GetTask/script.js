$(document).ready(function() {
    const task = $("#task")
    const getTask = $("#get-task")
  
    // Function to fetch a random quote from an API
    function retreveTask() {
      $.ajax({
        
        url: 'https://www.boredapi.com/api/activity',
        success: function(data) {
          task.text(data.activity)

        },
        error: function() {
            task.text("Failed to get task")

        },
      });
    }
    // Handle fetching a random quote when the 'Get Quote' button is clicked
    getTask.click(retreveTask)
    // Fetch an initial quote when the page loads
  });
  